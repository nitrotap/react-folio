import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import SkillsTabs from "../components/SkillsTabs";
import { skillGroups } from "@/data/site";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Verification, AI engineering, symbolic knowledge representation, languages, web, data, infrastructure, and statistics.",
};

export default function SkillsPage() {
  return (
    <div className="w-full">
      <PageHeader
        eyebrow="§ Capabilities"
        title="Skills"
        lede="Grouped by what they are for rather than listed alphabetically — the grouping is the point."
      />

      <div className="max-w-4xl mx-auto pb-16">
        <SkillsTabs groups={skillGroups} />
      </div>
    </div>
  );
}
