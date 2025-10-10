# Implementing Auth0 with Payload CMS Custom Strategies: A Complete Guide

This comprehensive guide walks you through integrating Auth0 authentication with Payload CMS using custom authentication strategies, providing a secure, scalable authentication solution for your headless CMS.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Understanding Payload CMS Authentication](#payload-auth)
4. [Auth0 Setup and Configuration](#auth0-setup)
5. [Custom Strategy Implementation](#custom-strategy)
6. [Frontend Integration](#frontend-integration)
7. [Advanced Configuration](#advanced-config)
8. [Security Best Practices](#security)
9. [Troubleshooting](#troubleshooting)
10. [Complete Working Example](#complete-example)

## 1. Introduction {#introduction}

### What is Payload CMS?

Payload CMS is a modern, open-source headless CMS built with TypeScript, Node.js, and React. It provides a powerful admin panel and flexible content management capabilities while maintaining developer-friendly APIs.

### Why Auth0?

Auth0 is an industry-leading identity platform that provides:
- **Social Login**: Google, GitHub, LinkedIn, etc.
- **Multi-Factor Authentication (MFA)**: Enhanced security
- **Single Sign-On (SSO)**: Unified authentication across apps
- **Passwordless Authentication**: Email/SMS verification
- **Enterprise Connections**: SAML, LDAP, Active Directory

### Benefits of Integration

Combining Auth0 with Payload CMS offers:
- Enterprise-grade authentication without reinventing the wheel
- Reduced development time on auth infrastructure
- Advanced security features out of the box
- Scalable authentication for growing applications
- Compliance with industry standards (OAuth 2.0, OpenID Connect)

## 2. Prerequisites {#prerequisites}

### Required Tools and Accounts

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Payload CMS** (v2.0 or higher)
- **Auth0 Account** (free tier available)
- **MongoDB** or **PostgreSQL** database

### Dependencies

```json
{
  "dependencies": {
    "payload": "^2.0.0",
    "express": "^4.18.0",
    "dotenv": "^16.0.0",
    "jsonwebtoken": "^9.0.0",
    "jwks-rsa": "^3.0.0",
    "express-jwt": "^8.0.0",
    "axios": "^1.4.0"
  }
}
```

### Knowledge Requirements

- Basic understanding of Node.js and Express
- Familiarity with JWT (JSON Web Tokens)
- Knowledge of REST APIs
- Understanding of OAuth 2.0 flow (helpful but not required)

## 3. Understanding Payload CMS Authentication {#payload-auth}

### Default Authentication Strategy

Payload CMS comes with a built-in local authentication strategy that uses email/password combinations stored in your database:

```typescript
// Default Payload authentication
const Users = {
  slug: 'users',
  auth: true, // Enable authentication
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
  ],
};
```

### Custom Strategy Architecture

Custom strategies allow you to override the default authentication flow:

```typescript
// Custom strategy structure
const Users = {
  slug: 'users',
  auth: {
    strategies: [
      {
        name: 'auth0',
        authenticate: async (ctx) => {
          // Your custom authentication logic
        },
      },
    ],
  },
};
```

### Authentication Flow Overview

```
┌─────────────┐     ┌──────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│  Auth0   │────▶│  Your API   │────▶│ Payload CMS │
│ Application │     │  Login   │     │  Validates  │     │  Access     │
└─────────────┘     └──────────┘     └─────────────┘     └─────────────┘
      │                    │                 │                    │
      │  1. Redirect       │                 │                    │
      │◄───────────────────┘                 │                    │
      │                                      │                    │
      │  2. Auth Code                        │                    │
      │─────────────────────────────────────▶│                    │
      │                                      │                    │
      │                    3. Verify Token   │                    │
      │                    ◀─────────────────│                    │
      │                                      │                    │
      │                                      │  4. Create/Auth    │
      │                                      │───────────────────▶│
      │                                      │                    │
      │  5. JWT Token                        │                    │
      │◄─────────────────────────────────────│                    │
```

## 4. Auth0 Setup and Configuration {#auth0-setup}

### Step 1: Create an Auth0 Application

1. Log in to your [Auth0 Dashboard](https://manage.auth0.com/)
2. Navigate to **Applications** → **Applications**
3. Click **Create Application**
4. Choose **Single Page Application** or **Regular Web Application**
5. Select **Node.js** as the technology

### Step 2: Configure Application Settings

```javascript
// Auth0 Application Settings
{
  "name": "Payload CMS Integration",
  "application_type": "spa", // or "regular_web"
  "allowed_callback_urls": [
    "http://localhost:3000/api/auth/callback",
    "https://yourdomain.com/api/auth/callback"
  ],
  "allowed_logout_urls": [
    "http://localhost:3000",
    "https://yourdomain.com"
  ],
  "allowed_web_origins": [
    "http://localhost:3000",
    "https://yourdomain.com"
  ],
  "allowed_origins": [
    "http://localhost:3000",
    "https://yourdomain.com"
  ]
}
```

### Step 3: Get Your Credentials

Save these credentials in your `.env` file:

```bash
# Auth0 Configuration
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
AUTH0_AUDIENCE=https://your-tenant.auth0.com/api/v2/
AUTH0_CALLBACK_URL=http://localhost:3000/api/auth/callback

# Payload Configuration
PAYLOAD_SECRET=your_payload_secret
DATABASE_URI=mongodb://localhost/payload-auth0
```

### Step 4: Enable Social Connections (Optional)

1. Go to **Authentication** → **Social**
2. Enable desired providers (Google, GitHub, LinkedIn)
3. Configure each provider with your OAuth credentials

Example for Google:
```javascript
{
  "client_id": "your-google-client-id.apps.googleusercontent.com",
  "client_secret": "your-google-client-secret",
  "allowed_audiences": []
}
```

## 5. Custom Strategy Implementation {#custom-strategy}

### Step 1: Install Required Packages

```bash
npm install jsonwebtoken jwks-rsa express-jwt axios
```

### Step 2: Create JWT Verification Utility

Create `src/auth/verifyAuth0Token.ts`:

```typescript
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
      return;
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

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
        if (err) {
          reject(err);
          return;
        }
        resolve(decoded);
      }
    );
  });
}
```

### Step 3: Create Auth0 Strategy

Create `src/auth/auth0Strategy.ts`:

```typescript
import { Strategy } from 'payload/dist/auth/types';
import { verifyAuth0Token } from './verifyAuth0Token';
import axios from 'axios';

export const auth0Strategy: Strategy = {
  name: 'auth0',
  authenticate: async ({ payload, headers }) => {
    try {
      // Extract token from Authorization header
      const authHeader = headers.get('authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return {
          user: null,
          responseHeaders: new Headers(),
        };
      }

      const token = authHeader.substring(7);
      
      // Verify the JWT token with Auth0
      const decoded = await verifyAuth0Token(token);
      
      if (!decoded || !decoded.sub) {
        return {
          user: null,
          responseHeaders: new Headers(),
        };
      }

      // Get or create user in Payload
      const auth0UserId = decoded.sub; // Auth0 user ID (e.g., "auth0|123456")
      const email = decoded.email;
      
      // Try to find existing user
      let user = await payload.find({
        collection: 'users',
        where: {
          auth0Id: {
            equals: auth0UserId,
          },
        },
      });

      // If user doesn't exist, create them
      if (user.docs.length === 0) {
        // Get additional user info from Auth0
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

        return {
          user: user,
          responseHeaders: new Headers(),
        };
      }

      return {
        user: user.docs[0],
        responseHeaders: new Headers(),
      };
    } catch (error) {
      console.error('Auth0 strategy error:', error);
      return {
        user: null,
        responseHeaders: new Headers(),
      };
    }
  },
};

async function getUserInfoFromAuth0(accessToken: string) {
  try {
    const response = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user info from Auth0:', error);
    throw error;
  }
}
```

### Step 4: Update Users Collection

Update your `src/collections/Users.ts`:

```typescript
import { CollectionConfig } from 'payload/types';
import { auth0Strategy } from '../auth/auth0Strategy';

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    strategies: [
      auth0Strategy,
      // You can keep the default strategy for admin access
      {
        name: 'local',
      },
    ],
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'auth0Id',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'picture',
      type: 'text',
      admin: {
        description: 'Profile picture URL from Auth0',
      },
    },
    {
      name: 'emailVerified',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
    },
  ],
};

export default Users;
```

### Step 5: Create Authentication Endpoints

Create `src/routes/auth.ts`:

```typescript
import express from 'express';
import axios from 'axios';

const router = express.Router();

// Auth0 authorization URL
router.get('/auth/auth0', (req, res) => {
  const authUrl = `https://${process.env.AUTH0_DOMAIN}/authorize?` +
    `response_type=code&` +
    `client_id=${process.env.AUTH0_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.AUTH0_CALLBACK_URL!)}&` +
    `scope=openid profile email&` +
    `audience=${process.env.AUTH0_AUDIENCE}`;
  
  res.redirect(authUrl);
});

// Auth0 callback endpoint
router.get('/auth/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        grant_type: 'authorization_code',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code,
        redirect_uri: process.env.AUTH0_CALLBACK_URL,
      }
    );

    const { access_token, id_token, refresh_token } = tokenResponse.data;

    // Redirect to frontend with tokens
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/success?` +
      `access_token=${access_token}&` +
      `id_token=${id_token}` +
      (refresh_token ? `&refresh_token=${refresh_token}` : '');
    
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Token exchange error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Logout endpoint
router.get('/auth/logout', (req, res) => {
  const logoutUrl = `https://${process.env.AUTH0_DOMAIN}/v2/logout?` +
    `client_id=${process.env.AUTH0_CLIENT_ID}&` +
    `returnTo=${encodeURIComponent(process.env.FRONTEND_URL!)}`;
  
  res.redirect(logoutUrl);
});

// Token refresh endpoint
router.post('/auth/refresh', async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: 'No refresh token provided' });
  }

  try {
    const response = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        grant_type: 'refresh_token',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        refresh_token,
      }
    );

    res.json({
      access_token: response.data.access_token,
      id_token: response.data.id_token,
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({ error: 'Token refresh failed' });
  }
});

export default router;
```

### Step 6: Update Server Configuration

Update your `src/server.ts`:

```typescript
import express from 'express';
import payload from 'payload';
import authRoutes from './routes/auth';

const app = express();

// Initialize Payload
const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET!,
    express: app,
  });

  // Add custom auth routes
  app.use('/api', authRoutes);

  app.listen(3000, async () => {
    console.log('Server is running on http://localhost:3000');
  });
};

start();
```

## 6. Frontend Integration {#frontend-integration}

### React Implementation

Create `src/contexts/AuthContext.tsx`:

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for tokens in URL (after Auth0 redirect)
    const params = new URLSearchParams(window.location.search);
    const token = params.get('access_token');
    
    if (token) {
      setAccessToken(token);
      localStorage.setItem('access_token', token);
      
      // Remove tokens from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Fetch user data
      fetchUserData(token);
    } else {
      // Check for stored token
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        setAccessToken(storedToken);
        fetchUserData(storedToken);
      }
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = () => {
    window.location.href = '/api/auth/auth0';
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('access_token');
    window.location.href = '/api/auth/logout';
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: !!accessToken,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### Login Component

Create `src/components/LoginButton.tsx`:

```typescript
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const LoginButton: React.FC = () => {
  const { isAuthenticated, login, logout, user } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="user-menu">
        <img src={user?.picture} alt={user?.name} className="avatar" />
        <span>{user?.name}</span>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <button onClick={login} className="login-button">
      Login with Auth0
    </button>
  );
};
```

### Protected Route Component

Create `src/components/ProtectedRoute.tsx`:

```typescript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
```

### Making API Requests with Authentication

Create `src/utils/api.ts`:

```typescript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('access_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired, try to refresh
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (refreshResponse.ok) {
          const { access_token } = await refreshResponse.json();
          localStorage.setItem('access_token', access_token);
          
          // Retry original request
          return fetchWithAuth(endpoint, options);
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        localStorage.clear();
        window.location.href = '/login';
      }
    }
  }

  return response;
}

// Example usage functions
export const getUsers = () => fetchWithAuth('/api/users');
export const getUser = (id: string) => fetchWithAuth(`/api/users/${id}`);
export const createPost = (data: any) =>
  fetchWithAuth('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
```

## 7. Advanced Configuration {#advanced-config}

### Role-Based Access Control (RBAC)

Update your Users collection to support role-based permissions:

```typescript
import { CollectionConfig } from 'payload/types';
import { auth0Strategy } from '../auth/auth0Strategy';

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    strategies: [auth0Strategy],
  },
  access: {
    // Only admins can read all users
    read: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) {
        return true;
      }
      // Users can read their own data
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    // Only admins can create users
    create: ({ req: { user } }) => user?.roles?.includes('admin'),
    // Users can update their own data
    update: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) {
        return true;
      }
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    // Only admins can delete users
    delete: ({ req: { user } }) => user?.roles?.includes('admin'),
  },
  fields: [
    // ... existing fields
  ],
};
```

### Custom Auth0 Rules

Add custom rules in Auth0 to enhance security:

```javascript
// Auth0 Rule: Add user metadata to token
function addUserMetadata(user, context, callback) {
  const namespace = 'https://your-app.com';
  
  context.idToken[namespace + '/roles'] = user.app_metadata?.roles || ['user'];
  context.idToken[namespace + '/user_id'] = user.user_id;
  
  callback(null, user, context);
}

// Auth0 Rule: Email verification required
function requireEmailVerification(user, context, callback) {
  if (!user.email_verified) {
    return callback(
      new UnauthorizedError('Please verify your email before logging in.')
    );
  }
  callback(null, user, context);
}

// Auth0 Rule: Force MFA for admins
function forceMFAForAdmins(user, context, callback) {
  const roles = user.app_metadata?.roles || [];
  
  if (roles.includes('admin') && context.authentication.methods.length === 1) {
    return callback(
      new UnauthorizedError('Multi-factor authentication required for admin users.')
    );
  }
  
  callback(null, user, context);
}
```

### Webhook Integration

Set up webhooks to sync Auth0 user changes with Payload:

Create `src/routes/webhooks.ts`:

```typescript
import express from 'express';
import crypto from 'crypto';
import payload from 'payload';

const router = express.Router();

// Verify Auth0 webhook signature
function verifyWebhookSignature(req: express.Request): boolean {
  const signature = req.headers['auth0-signature'] as string;
  const secret = process.env.AUTH0_WEBHOOK_SECRET!;
  
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');
  
  return signature === hash;
}

router.post('/webhooks/auth0', async (req, res) => {
  if (!verifyWebhookSignature(req)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const { event, data } = req.body;

  try {
    switch (event) {
      case 'user.created':
        // User created in Auth0, sync to Payload
        await payload.create({
          collection: 'users',
          data: {
            email: data.email,
            auth0Id: data.user_id,
            name: data.name,
            picture: data.picture,
            emailVerified: data.email_verified,
          },
        });
        break;

      case 'user.updated':
        // User updated in Auth0, sync to Payload
        const users = await payload.find({
          collection: 'users',
          where: {
            auth0Id: {
              equals: data.user_id,
            },
          },
        });

        if (users.docs.length > 0) {
          await payload.update({
            collection: 'users',
            id: users.docs[0].id,
            data: {
              email: data.email,
              name: data.name,
              picture: data.picture,
              emailVerified: data.email_verified,
            },
          });
        }
        break;

      case 'user.deleted':
        // User deleted in Auth0, handle in Payload
        const deletedUsers = await payload.find({
          collection: 'users',
          where: {
            auth0Id: {
              equals: data.user_id,
            },
          },
        });

        if (deletedUsers.docs.length > 0) {
          await payload.delete({
            collection: 'users',
            id: deletedUsers.docs[0].id,
          });
        }
        break;
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
```

### Multi-Tenant Support

Implement multi-tenant authentication:

```typescript
// src/auth/multiTenantAuth0Strategy.ts
import { Strategy } from 'payload/dist/auth/types';
import { verifyAuth0Token } from './verifyAuth0Token';

export const multiTenantAuth0Strategy: Strategy = {
  name: 'auth0-multitenant',
  authenticate: async ({ payload, headers }) => {
    try {
      const authHeader = headers.get('authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return { user: null, responseHeaders: new Headers() };
      }

      const token = authHeader.substring(7);
      const decoded = await verifyAuth0Token(token);

      // Extract tenant from token or header
      const tenantId = headers.get('x-tenant-id') || decoded['https://your-app.com/tenant_id'];
      
      if (!tenantId) {
        throw new Error('Tenant ID not provided');
      }

      // Find user within tenant
      const users = await payload.find({
        collection: 'users',
        where: {
          and: [
            {
              auth0Id: {
                equals: decoded.sub,
              },
            },
            {
              tenantId: {
                equals: tenantId,
              },
            },
          ],
        },
      });

      if (users.docs.length === 0) {
        // Create user in tenant
        const newUser = await payload.create({
          collection: 'users',
          data: {
            email: decoded.email,
            auth0Id: decoded.sub,
            tenantId,
            name: decoded.name,
          },
        });
        return { user: newUser, responseHeaders: new Headers() };
      }

      return { user: users.docs[0], responseHeaders: new Headers() };
    } catch (error) {
      console.error('Multi-tenant auth error:', error);
      return { user: null, responseHeaders: new Headers() };
    }
  },
};
```

## 8. Security Best Practices {#security}

### 1. Token Storage

**DO:**
- Store access tokens in memory or secure HTTP-only cookies
- Use refresh tokens for long-lived sessions
- Implement token rotation

**DON'T:**
- Store tokens in localStorage if you're concerned about XSS attacks
- Store tokens in plain text cookies
- Log tokens to console in production

```typescript
// Secure cookie implementation
import cookieParser from 'cookie-parser';

app.use(cookieParser());

router.get('/auth/callback', async (req, res) => {
  // ... token exchange logic
  
  // Set HTTP-only cookie
  res.cookie('access_token', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000, // 1 hour
  });
  
  res.redirect('/dashboard');
});
```

### 2. Environment Variables

Never commit sensitive credentials:

```bash
# .env.example
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
AUTH0_AUDIENCE=https://your-api.com
PAYLOAD_SECRET=generate_a_strong_secret
```

Use strong secrets:

```bash
# Generate a secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. CORS Configuration

Properly configure CORS for your API:

```typescript
import cors from 'cors';

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
```

### 4. Rate Limiting

Implement rate limiting to prevent abuse:

```typescript
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later',
});

app.use('/api/auth', authLimiter);
```

### 5. Validation and Sanitization

Always validate and sanitize user input:

```typescript
import { body, validationResult } from 'express-validator';

router.post(
  '/api/users',
  [
    body('email').isEmail().normalizeEmail(),
    body('name').trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process request
  }
);
```

### 6. Audit Logging

Implement comprehensive audit logging:

```typescript
// src/hooks/auditLog.ts
import { CollectionAfterChangeHook } from 'payload/types';

export const auditLog: CollectionAfterChangeHook = async ({
  doc,
  req,
  previousDoc,
  operation,
}) => {
  await req.payload.create({
    collection: 'audit-logs',
    data: {
      user: req.user?.id,
      operation,
      collection: 'users',
      documentId: doc.id,
      changes: {
        before: previousDoc,
        after: doc,
      },
      timestamp: new Date(),
      ipAddress: req.ip,
    },
  });
};
```

## 9. Troubleshooting {#troubleshooting}

### Common Issues and Solutions

#### Issue 1: "Invalid Token" Error

**Symptoms:**
- 401 Unauthorized responses
- JWT verification failures

**Solutions:**

```typescript
// Check token expiration
const decoded = jwt.decode(token);
console.log('Token expires at:', new Date(decoded.exp * 1000));

// Verify audience and issuer
console.log('Token audience:', decoded.aud);
console.log('Token issuer:', decoded.iss);

// Ensure environment variables match
console.log('Expected audience:', process.env.AUTH0_AUDIENCE);
console.log('Expected issuer:', `https://${process.env.AUTH0_DOMAIN}/`);
```

#### Issue 2: CORS Errors

**Symptoms:**
- Browser blocks requests
- "Access-Control-Allow-Origin" errors

**Solutions:**

```typescript
// Enable pre-flight requests
app.options('*', cors(corsOptions));

// Add explicit headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
```

#### Issue 3: User Not Created in Payload

**Symptoms:**
- Authentication succeeds but user data missing
- No user record in database

**Solutions:**

```typescript
// Add detailed logging
authenticate: async ({ payload, headers }) => {
  try {
    const token = extractToken(headers);
    console.log('Token extracted:', !!token);
    
    const decoded = await verifyAuth0Token(token);
    console.log('Token decoded:', decoded);
    
    const user = await findOrCreateUser(payload, decoded);
    console.log('User found/created:', user.id);
    
    return { user, responseHeaders: new Headers() };
  } catch (error) {
    console.error('Full error:', error);
    throw error;
  }
}
```

#### Issue 4: Infinite Redirect Loop

**Symptoms:**
- Browser keeps redirecting between pages
- Authentication flow never completes

**Solutions:**

```typescript
// Ensure proper redirect handling
router.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query;
  
  // Validate state parameter
  const storedState = req.session?.state;
  if (state !== storedState) {
    return res.status(400).json({ error: 'Invalid state parameter' });
  }
  
  // Clear state after validation
  delete req.session?.state;
  
  // Exchange code and redirect
  const tokens = await exchangeCode(code);
  res.redirect(`/dashboard?token=${tokens.access_token}`);
});
```

#### Issue 5: Token Refresh Failures

**Symptoms:**
- Users logged out unexpectedly
- Refresh token invalid errors

**Solutions:**

```typescript
// Implement robust token refresh
async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        grant_type: 'refresh_token',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        refresh_token: refreshToken,
      },
      {
        timeout: 5000, // 5 second timeout
      }
    );
    
    return response.data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Token refresh failed:', error.response?.data);
    }
    return null;
  }
}
```

### Debug Mode

Enable verbose logging for troubleshooting:

```typescript
// src/auth/auth0Strategy.ts
const DEBUG = process.env.AUTH0_DEBUG === 'true';

function debug(...args: any[]) {
  if (DEBUG) {
    console.log('[Auth0 Strategy]', ...args);
  }
}

export const auth0Strategy: Strategy = {
  name: 'auth0',
  authenticate: async ({ payload, headers }) => {
    debug('Starting authentication');
    debug('Headers:', Object.fromEntries(headers.entries()));
    
    try {
      const token = extractToken(headers);
      debug('Token extracted:', token?.substring(0, 20) + '...');
      
      const decoded = await verifyAuth0Token(token);
      debug('Token verified:', decoded.sub);
      
      // ... rest of authentication logic
    } catch (error) {
      debug('Authentication error:', error);
      throw error;
    }
  },
};
```

## 10. Complete Working Example {#complete-example}

Here's a complete, minimal working example to get you started:

### Project Structure

```
payload-auth0-example/
├── src/
│   ├── auth/
│   │   ├── auth0Strategy.ts
│   │   └── verifyAuth0Token.ts
│   ├── collections/
│   │   └── Users.ts
│   ├── routes/
│   │   └── auth.ts
│   ├── payload.config.ts
│   └── server.ts
├── .env
├── package.json
└── tsconfig.json
```

### Complete Configuration Files

#### package.json

```json
{
  "name": "payload-auth0-example",
  "version": "1.0.0",
  "scripts": {
    "dev": "ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "payload": "^2.0.0",
    "express": "^4.18.0",
    "dotenv": "^16.0.0",
    "jsonwebtoken": "^9.0.0",
    "jwks-rsa": "^3.0.0",
    "axios": "^1.4.0",
    "mongodb": "^5.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/jsonwebtoken": "^9.0.2",
    "@types/node": "^20.0.0",
    "ts-node": "^10.9.0",
    "typescript": "^5.0.0"
  }
}
```

#### payload.config.ts

```typescript
import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [Users],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: {
    type: 'mongodb',
    url: process.env.DATABASE_URI!,
  },
});
```

#### .env

```bash
# Server
PORT=3000
PAYLOAD_SECRET=your-payload-secret-key
DATABASE_URI=mongodb://localhost:27017/payload-auth0

# Auth0
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
AUTH0_AUDIENCE=https://your-tenant.auth0.com/api/v2/
AUTH0_CALLBACK_URL=http://localhost:3000/api/auth/callback

# Frontend
FRONTEND_URL=http://localhost:3001

# Debug (optional)
AUTH0_DEBUG=true
```

### Running the Example

1. **Install dependencies:**
```bash
npm install
```

2. **Set up MongoDB:**
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install MongoDB locally
```

3. **Configure Auth0:**
- Create application in Auth0 dashboard
- Add callback URL: `http://localhost:3000/api/auth/callback`
- Copy credentials to `.env`

4. **Start the server:**
```bash
npm run dev
```

5. **Test authentication:**
```bash
# Open browser and navigate to:
http://localhost:3000/api/auth/auth0

# You'll be redirected to Auth0 login
# After login, you'll be redirected back to your app
```

### Testing with cURL

```bash
# 1. Get access token (manual flow)
# Visit http://localhost:3000/api/auth/auth0 in browser
# Copy the access_token from the redirect URL

# 2. Make authenticated request
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  http://localhost:3000/api/users/me

# 3. Create a post (example)
curl -X POST \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Post","content":"Hello World"}' \
  http://localhost:3000/api/posts
```

## Conclusion

You now have a complete implementation of Auth0 authentication with Payload CMS custom strategies. This setup provides:

- **Enterprise-grade authentication** with Auth0
- **Flexible user management** with Payload CMS
- **Secure token handling** and validation
- **Role-based access control** capabilities
- **Multi-tenant support** (optional)
- **Production-ready security** practices

### Next Steps

1. **Customize user fields** based on your application needs
2. **Implement fine-grained permissions** using Payload's access control
3. **Add social login providers** through Auth0
4. **Set up MFA** for enhanced security
5. **Configure Auth0 Rules** for custom business logic
6. **Implement audit logging** for compliance
7. **Add webhook integrations** for real-time sync

### Additional Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Auth0 Documentation](https://auth0.com/docs)
- [JWT.io](https://jwt.io/) - JWT debugger
- [Auth0 Community Forum](https://community.auth0.com/)
- [Payload CMS Discord](https://discord.com/invite/payload)

### Support

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Enable debug mode for detailed logging
3. Review Auth0 logs in the dashboard
4. Check Payload CMS server logs
5. Consult community forums

Happy coding! 🚀
