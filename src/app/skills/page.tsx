import PageHeader from "../components/PageHeader";
import JsonLd from "../components/JsonLd";
import SkillsAccordion from "../components/SkillsAccordion";
import { skillGroups } from "@/data/site";
import { pageMetadata, breadcrumbSchema, collectionPageSchema } from "@/lib/seo";

const SKILLS_DESCRIPTION =
  "Verification, AI engineering, symbolic knowledge representation, languages, web, data, infrastructure, and statistics — grouped by what they are for.";

export const metadata = pageMetadata({
  title: "Skills",
  description: SKILLS_DESCRIPTION,
  path: "/skills",
  keywords: [
    ...skillGroups.map((g) => g.name),
    ...skillGroups.flatMap((g) => g.items),
  ],
});

export default function SkillsPage() {
  return (
    <div className="w-full">
      <JsonLd
        data={[
          collectionPageSchema({
            name: "Skills",
            description: SKILLS_DESCRIPTION,
            path: "/skills",
            items: skillGroups.map((g) => ({
              name: g.name,
              path: `/skills/${g.slug}`,
            })),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Skills", path: "/skills" },
          ]),
        ]}
      />
      <PageHeader
        eyebrow="§ Capabilities"
        title="Skills"
        lede="Grouped by what they are for rather than listed alphabetically — the grouping is the point. Open as many as you want to compare."
      />

      <div className="max-w-4xl mx-auto pb-16">
        <SkillsAccordion groups={skillGroups} />
      </div>
    </div>
  );
}
