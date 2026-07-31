---
title: "When the user table becomes a cache"
date: "2026-03-24"
description: "Putting Auth0 in front of Payload CMS is about forty lines of code. The decision underneath it is which system owns the user — and whether you're willing to answer that once."
tags: ["auth0", "payload", "jwt", "authentication"]
draft: false
---

Payload CMS ships with authentication. You put `auth: true` on a collection and you get email and password, sessions, and an admin panel that knows who is looking at it. It works, and for a lot of projects that is the end of the conversation.

Then somebody wants Google login. Or SSO against a corporate directory. Or MFA. So you reach for Auth0, and now two systems have an opinion about who a user is.

Everything hard about this integration follows from that sentence. The code does not.

## The small part

Payload lets you replace the default strategy with your own. The whole contract is a `name` and an `authenticate` function that returns a user or null.

The security boundary is upstream of it, in token verification:

```typescript
export async function verifyAuth0Token(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256'],
      },
      (err, decoded) => {
        if (err) { reject(err); return; }
        resolve(decoded);
      }
    );
  });
}
```

`getKey` pulls the signing key from `https://${AUTH0_DOMAIN}/.well-known/jwks.json` via `jwks-rsa`, with caching and a rate limit of five JWKS requests per minute.

Three arguments there are load-bearing and all three are easy to get wrong quietly. Pinning `algorithms: ['RS256']` is what stops a token from telling you how to verify it. Pinning `issuer` is what stops a valid token from a different tenant. Pinning `audience` is what stops a token minted for some other API from being accepted by yours. Omit any one and verification still succeeds on the happy path, which is the problem.

That is the part I would not improvise. It is also about twenty lines, and it is the same twenty lines in every project.

## The seam

The interesting question is what happens on the line after `verifyAuth0Token` returns.

The token is valid. It carries a `sub` — an Auth0 user id like `auth0|123456`. Payload has never heard of it. What now?

```typescript
let user = await payload.find({
  collection: 'users',
  where: { auth0Id: { equals: auth0UserId } },
});

if (user.docs.length === 0) {
  const userInfo = await getUserInfoFromAuth0(token);
  user = await payload.create({
    collection: 'users',
    data: {
      email: email || userInfo.email,
      auth0Id: auth0UserId,
      name: userInfo.name,
      picture: userInfo.picture,
      emailVerified: userInfo.email_verified,
    },
  });
  return { user, responseHeaders: new Headers() };
}
```

Find or create, inside `authenticate`. It is the obvious implementation and it is worth being clear-eyed about what it means: authentication is now a write path. Any request bearing a valid token for an identity you have never seen will insert a row, before any of your access-control rules have run. Provisioning policy — who is allowed to become a user here — has to live in the token, because there is nowhere else for it to live by then.

Note also the join key. `auth0Id`, declared `unique: true`, `index: true`, `readOnly` in the admin UI. Not email. Email is a claim about a person that changes; `sub` is an opaque identifier that does not. Every system I have seen key on email eventually meets someone who changed theirs.

Once you write that block, the Payload user document has stopped being the source of truth about identity. It is a local projection of an Auth0 identity, keyed on `sub`, populated on first sight. A cache.

## Two mechanisms for the same job

Which is fine — right up until you add the second way to fill it.

The guide also sets up an Auth0 webhook receiver that handles `user.created`, `user.updated`, and `user.deleted`, verifying an HMAC-SHA256 signature against `AUTH0_WEBHOOK_SECRET` and then doing `payload.create`, `payload.update`, and `payload.delete` against the same collection, matched on the same `auth0Id`.

Now the same three rows can be written by two independent mechanisms with different triggers and no ordering between them.

The `user.deleted` case is the one to sit with. The webhook deletes the Payload document. The strategy re-creates it on the next request that arrives with a still-valid access token, because from `authenticate`'s point of view that is simply an identity it has not seen before. Access tokens outlive the delete. So does the row.

I would pick one. Webhook sync gives you a directory that stays current for users who never log in, which matters if editors need to be listed before their first visit. Just-in-time provisioning gives you a table that only contains people who actually showed up. Both are defensible. Running both means the reconciliation logic exists whether or not anyone wrote it.

The same duplication shows up again with roles. There is a `roles` select field on the Payload collection with `defaultValue: ['user']`, and separately an Auth0 rule that stamps roles into the id token under a namespaced claim:

```javascript
context.idToken[namespace + '/roles'] = user.app_metadata?.roles || ['user'];
```

Payload's access functions then read `user?.roles`. If those roles came from the local document, Auth0's copy is decoration. If they came from the token, the Payload field is a stale mirror that an admin can edit to no effect. Deciding which is a five-minute conversation that is very unpleasant to have a year later.

## The one I would change before shipping

The callback route exchanges the authorization code and then hands the tokens back to the browser like this:

```typescript
const redirectUrl = `${process.env.FRONTEND_URL}/auth/success?` +
  `access_token=${access_token}&` +
  `id_token=${id_token}`;
res.redirect(redirectUrl);
```

The React client picks them out of `window.location.search` and puts them in `localStorage`.

Query-string tokens end up in browser history, in server access logs, and in the `Referer` header of whatever the page loads next. The correct version is in the same document, a few sections down under security best practices — set an HTTP-only, `secure`, `sameSite: 'strict'` cookie in the callback and redirect to a path with nothing in the URL. That section also says, in as many words, not to keep tokens in `localStorage` if you are worried about XSS.

Both halves are right there. The demo does the convenient thing and the guidance does the correct thing, which is how almost every auth integration I have read is written, including ones running in production.

## What this is really about

The strategy is forty lines. The token verification is twenty and they are the same twenty everywhere. There is no clever part.

What there is, is a set of small decisions about where a fact is allowed to live: identity keyed on `sub` and nowhere else, roles in exactly one store, provisioning through exactly one path, tokens in exactly one place that is not a URL. Each is cheap to make on day one and expensive to discover on day four hundred, because by then both copies exist and both have users behind them.

That is the same instinct as putting a taxonomy in one file and generating the rest. Not because the code is hard. Because the invariant is easy to state and expensive to lose.
