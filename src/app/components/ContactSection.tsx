import React from "react";
import type { ContactSection, ContactMethod } from "@/data/types";

interface ContactSectionProps {
  section: ContactSection;
  variant?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ section }) => (
  <section className="py-16 md:py-24 flex justify-center">
    <div className="bg-white/80 backdrop-blur-md border border-cadet_gray-200 rounded-2xl shadow-xl p-10 max-w-2xl w-full flex flex-col items-center">
      <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-coyote-700 tracking-tight leading-tight text-center">{section.title}</h2>
      <img
        src="/images/image.jpeg"
        alt="Contact portrait"
        className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg object-cover mb-6 border-4 border-white"
        style={{ animationDelay: '0.5s' }}
      />
      {section.subtitle && (
        <p className="mb-6 text-lg text-cadet_gray-700 text-center max-w-xl">{section.subtitle}</p>
      )}
      <ul className="space-y-4 w-full">
        {section.contactMethods?.map((method: ContactMethod, i: number) => (
          <li key={i} className="flex items-center justify-center">
            {method.url ? (
              <a
                href={method.url}
                target="_blank"
                rel="noopener"
                className="text-cerulean-700 hover:underline text-lg md:text-xl font-semibold flex items-center gap-2"
              >
                {/* Icon could go here */}
                <span className="font-bold">{method.type}:</span> {method.value}
              </a>
            ) : (
              <span className="text-cadet_gray-700 text-lg md:text-xl flex items-center gap-2">
                <span className="font-bold">{method.type}:</span> {method.value}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ContactSection; 