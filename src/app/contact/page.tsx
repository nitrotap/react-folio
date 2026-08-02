import PageHeader from "../components/PageHeader";
import JsonLd from "../components/JsonLd";
import { profile } from "@/data/site";
import { pageMetadata, breadcrumbSchema, PERSON_ID, SITE_URL } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Ways to reach ${profile.name} — ${profile.links
    .map((l) => l.label)
    .join(", ")}. Based in ${profile.location}.`,
  path: "/contact",
  keywords: [
    profile.name,
    profile.handle,
    "contact",
    profile.location,
    ...profile.links.map((l) => l.label),
  ],
});

export default function ContactPage() {
  return (
    <div className="w-full">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": `${SITE_URL}/contact#contactpage`,
            url: `${SITE_URL}/contact`,
            name: `Contact ${profile.name}`,
            inLanguage: "en",
            mainEntity: { "@id": PERSON_ID },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <PageHeader
        eyebrow="§ Contact"
        title="Get in touch"
        lede={`${profile.role} · ${profile.location}. Open to conversations about ${profile.focus.toLowerCase()}.`}
      />

      <div className="max-w-4xl mx-auto pb-16">
        <ul className="grid gap-4 sm:grid-cols-2">
          {profile.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="surface-interactive p-6 block"
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                <p className="text-sm font-semibold mb-1">{l.label}</p>
                <p
                  className="text-sm break-all"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-code)" }}
                >
                  {l.href.replace(/^mailto:/, "").replace(/^https?:\/\//, "")}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
