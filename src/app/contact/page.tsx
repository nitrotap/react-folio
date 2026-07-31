import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import { profile } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} — ${profile.role} based in ${profile.location}.`,
};

export default function ContactPage() {
  return (
    <div className="w-full">
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
