Your task is to create s static nextjs site with app router. The site should be a portfolio website for Kartik Jevaji - @nitrotap.

The site should use:

1. Footer.tsx for footer
2. Nav.tsx for navigation with content from nav.ts
3. siteData.ts for all text content
4. Section.tsx for all website sections, with content from siteData.ts
5. All sections should be react components, accepting props for all text fields
6. All sections should be incorporated into a single page, with types within types.ts, and all data from siteData.t
7. The entire site should be rolled up into a single pagebuilder, that takes and displays all pages
8. All pages and sections should have generateStaticParams and metadata and should include all appropriate SEO
9. All pages and sections should be reusable components

Technical Implementation:

1. NextJS 15+ with App Router with all parts statically generated. Avoid all client side rendering.
2. Static exports with only client-side components
3. Tailwind CSS
4. Simple animations (like hover effects, and any animation that can be rendered via SSG)
5. Color palette -- Tailwind

{ 'coyote': { DEFAULT: '#7a542e', 100: '#181109', 200: '#312213', 300: '#49321c', 400: '#624325', 500: '#7a542e', 600: '#ac7641', 700: '#c7986a', 800: '#d9bb9c', 900: '#ecddcd' }, 'rich_black': { DEFAULT: '#031926', 100: '#010508', 200: '#010a0f', 300: '#020f17', 400: '#02141e', 500: '#031926', 600: '#0a537d', 700: '#118cd3', 800: '#51b6f1', 900: '#a8dbf8' }, 'wheat': { DEFAULT: '#ead2ac', 100: '#412f10', 200: '#835d21', 300: '#c48c31', 400: '#dab06c', 500: '#ead2ac', 600: '#efdcbe', 700: '#f3e5ce', 800: '#f7edde', 900: '#fbf6ef' }, 'cadet_gray': { DEFAULT: '#9cafb7', 100: '#1c2427', 200: '#39484e', 300: '#556b75', 400: '#738e9a', 500: '#9cafb7', 600: '#afbec5', 700: '#c3ced3', 800: '#d7dfe2', 900: '#ebeff0' }, 'cerulean': { DEFAULT: '#4281a4', 100: '#0d1a21', 200: '#1a3442', 300: '#274e62', 400: '#346883', 500: '#4281a4', 600: '#5f9dbf', 700: '#87b6cf', 800: '#afcedf', 900: '#d7e7ef' } }

- CSV

7a542e,031926,ead2ac,9cafb7,4281a4

- With #

#7a542e, #031926, #ead2ac, #9cafb7, #4281a4

- Array

["7a542e","031926","ead2ac","9cafb7","4281a4"]

- Object

{"Coyote":"7a542e","Rich black":"031926","Wheat":"ead2ac","Cadet gray":"9cafb7","Cerulean":"4281a4"}

- Extended Array

[{"name":"Coyote","hex":"7a542e","rgb":[122,84,46],"cmyk":[0,31,62,52],"hsb":[30,62,48],"hsl":[30,45,33],"lab":[39,11,28]},{"name":"Rich black","hex":"031926","rgb":[3,25,38],"cmyk":[92,34,0,85],"hsb":[202,92,15],"hsl":[202,85,8],"lab":[8,-3,-12]},{"name":"Wheat","hex":"ead2ac","rgb":[234,210,172],"cmyk":[0,10,26,8],"hsb":[37,26,92],"hsl":[37,60,80],"lab":[85,3,22]},{"name":"Cadet gray","hex":"9cafb7","rgb":[156,175,183],"cmyk":[15,4,0,28],"hsb":[198,15,72],"hsl":[198,16,66],"lab":[70,-5,-6]},{"name":"Cerulean","hex":"4281a4","rgb":[66,129,164],"cmyk":[60,21,0,36],"hsb":[201,60,64],"hsl":[201,43,45],"lab":[51,-10,-25]}]

- XML

<palette>
  <color name="Coyote" hex="7a542e" r="122" g="84" b="46" />
  <color name="Rich black" hex="031926" r="3" g="25" b="38" />
  <color name="Wheat" hex="ead2ac" r="234" g="210" b="172" />
  <color name="Cadet gray" hex="9cafb7" r="156" g="175" b="183" />
  <color name="Cerulean" hex="4281a4" r="66" g="129" b="164" />
</palette>

## Other Requirements

1. Include all sections and parts from me.md
2. Projects should include placeholders for screenshots
3. Tasteful tailwind transitions
4. SEO metadata should be unique per section
5. Navigations should be page based, within [slug], statically generated from data in siteData.ts

For example,
the pages array in siteData.ts contains a page array with a single type, and all possible objects within it are also typed. different pages may extend the page interface. the pages array is provided to [slug]/page.tsx and page.tsx statically generates all pages, with all data. All sections should have its own interface extending a base section type, but can be dynamically added to. each page can have a different order of sections. each section should have its own metadata, as well as for top level data. all applicable seo fields are required. navigation should be generated for all sections and pages. screenshot placeholders should be ai generated art. use at least 1 stunning, modern, and clean animation for the hero section for the website. create a single 404 page for errors. and there are no testing requirements.
