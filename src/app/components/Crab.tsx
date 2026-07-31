import Image from "next/image";

/**
 * The crab.
 *
 * An ontomancer: wizard hat, runes down every limb, and the oversized claw the
 * `*-claw` project family is named for. Supplied as artwork rather than drawn
 * as geometry, so unlike the rest of the glyph set it does not re-theme — it
 * keeps its own purple and gold in all four themes. That is fine, and arguably
 * better: it is the one piece on the site that is a character rather than a
 * diagram, and it should look the same wherever you meet it.
 *
 * What *does* re-theme is the frame. The surface it sits on extrudes under
 * Neumorphism, goes hairline under Blueprint, squares off under Swiss, and
 * hard-offsets under 8-bit, so the artwork reads as deliberately mounted
 * rather than dropped on top of the page.
 *
 * Source is 2036x1398 and 4.6MB; what ships is a 900px WebP at 58KB with a
 * 1800px variant for dense displays. `next/image` runs unoptimized here — a
 * static export has no server to resize at request time — so the sizing has to
 * be right in the file, not deferred to the loader.
 */
export function Crab({ className = "" }: { className?: string }) {
  return (
    <div className={`kj-crab surface overflow-hidden ${className}`}>
      <Image
        src="/images/kartik-claw.webp"
        alt="A cartoon crab in a star-covered wizard hat, gold runes down its armoured limbs, one oversized claw raised, sitting at a desk of code."
        width={900}
        height={618}
        sizes="(min-width: 1024px) 320px, 100vw"
        priority
        className="w-full h-auto block"
      />
    </div>
  );
}
