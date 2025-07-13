import React from "react";
import type { ContactSection, ContactMethod } from "@/data/types";

interface ContactSectionProps {
  section: ContactSection;
  variant?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ section }) => (
  <section className="py-10 md:py-16 max-w-2xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-coyote-700 tracking-tight">{section.title}</h2>
    <ul className="space-y-3">
      {section.contactMethods?.map((method: ContactMethod, i: number) => (
        <li key={i}>
          {method.url ? (
            <a href={method.url} target="_blank" rel="noopener" className="text-cerulean-600 hover:underline text-lg md:text-xl">
              {method.type}: {method.value}
            </a>
          ) : (
            <span className="text-cadet_gray-700 text-lg md:text-xl">{method.type}: {method.value}</span>
          )}
        </li>
      ))}
    </ul>
  </section>
);

export default ContactSection; 