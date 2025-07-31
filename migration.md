Ran tool
Below is detailed documentation for each section of your React website, structured to support a migration to Next.js. At the end, you'll find a behavior-based checklist suitable for a TDD (Test-Driven Development) approach.

---

# Website Section Documentation (for Next.js Migration)

## 1. **Header & Navigation (`Header`, `Nav`)**

- **Purpose:**  
  Provides site-wide navigation and branding.
- **Components:**
  - `Header`: Wraps the navigation and (optionally) a site title.
  - `Nav`: Renders navigation links for the main sections: About, Portfolio, Resume, Contact. Highlights the current section.
- **Behavior:**
  - Clicking a nav link updates the current section (page).
  - The site title ("nitrotap") is always visible.
- **Next.js Migration Notes:**
  - Use Next.js `<Link>` for navigation.
  - Consider using a layout component to wrap all pages with the header/nav.
  - Use dynamic route highlighting based on Next.js router.

---

## 2. **About (`About`)**

- **Purpose:**  
  Introduces the site owner, their skills, and relevant experience.
- **Content:**
  - Profile image and name.
  - Short professional summary.
  - Technical skills (Languages, Technologies, Databases).
  - Highlighted projects/experience with badges for tech stack.
- **Behavior:**
  - Responsive layout with background images and parallax effects.
  - Animated text and section transitions.
- **Next.js Migration Notes:**
  - Use static assets via Next.js `/public` directory.
  - Use CSS modules or styled-jsx for scoped styles.
  - Consider splitting technical skills and experience into subcomponents.

---

## 3. **Portfolio (`Portfolio`, `Project`)**

- **Purpose:**  
  Showcases a list of projects with details and links.
- **Components:**
  - `Portfolio`: Maps over a list of project data and renders a `Project` component for each.
  - `Project`: Displays project name, screenshot, description, and links to GitHub and deployed app.
- **Behavior:**
  - Projects are displayed in a responsive grid.
  - Each project card includes an image, description, and action links.
- **Next.js Migration Notes:**
  - Consider using `getStaticProps` to load project data at build time.
  - Use Next.js `<Image>` for optimized images.
  - Use dynamic routing if you want individual project pages.

---

## 4. **Resume (`Resume`)**

- **Purpose:**  
  Provides access to the owner's resume and technical skills.
- **Content:**
  - Embedded Google Drive PDF preview.
  - Buttons to view the resume online or download as PDF.
  - List of technical skills and education.
- **Behavior:**
  - Responsive iframe for resume preview.
  - Buttons open external links in new tabs.
- **Next.js Migration Notes:**
  - Use Next.js `<Link>` for external navigation.
  - Consider storing resume data in markdown or JSON for easier updates.
  - Use environment variables for sensitive links if needed.

---

## 5. **Contact (`Contact`)**

- **Purpose:**  
  Allows users to contact the site owner via email, GitHub, LinkedIn, or a Google Form.
- **Content:**
  - Email address with mailto link.
  - GitHub profile with logo.
  - LinkedIn profile with icon.
  - Embedded Google Form for direct messaging.
- **Behavior:**
  - All contact methods open in new tabs.
  - Google Form is embedded and responsive.
- **Next.js Migration Notes:**
  - Use Next.js `<Image>` for logos/icons.
  - Consider using a custom contact form with API routes for direct messaging.
  - Ensure accessibility for all contact methods.

---

## 6. **Footer (`Footer`)**

- **Purpose:**  
  Provides site-wide footer with social/contact links and copyright.
- **Content:**
  - Social links (GitHub, LinkedIn, Email) with icons.
  - Copyright notice.
- **Behavior:**
  - Animated heart icon on hover.
  - Responsive layout.
- **Next.js Migration Notes:**
  - Use a layout component to include the footer on all pages.
  - Use Next.js `<Link>` and `<Image>` for navigation and icons.

---

# Behavior-Based TDD Checklist

Use this list as the basis for writing tests (unit, integration, and E2E) for your Next.js site.

### Navigation & Routing

- [ ] Navigation links render for all main sections.
- [ ] Clicking a nav link routes to the correct page and highlights the active link.
- [ ] The site title is always visible in the header.

### About Page

- [ ] Profile image and name are displayed.
- [ ] Technical skills are listed and categorized.
- [ ] Experience/projects are shown with correct tech badges.
- [ ] Responsive layout and background images render correctly.

### Portfolio Page

- [ ] All projects are listed with correct data (name, image, description, links).
- [ ] Project images are optimized and load correctly.
- [ ] GitHub and deployed links open in new tabs.
- [ ] Responsive grid layout for project cards.

### Resume Page

- [ ] Resume preview is embedded and visible.
- [ ] Buttons to view and download resume work as expected.
- [ ] Technical skills and education are listed.
- [ ] All links open in new tabs.

### Contact Page

- [ ] Email, GitHub, and LinkedIn links are present and functional.
- [ ] Google Form is embedded and responsive.
- [ ] All contact methods are accessible and open in new tabs.

### Footer

- [ ] Footer is visible on all pages.
- [ ] Social/contact links are present and functional.
- [ ] Copyright notice is correct.
- [ ] Heart icon animates on hover.

### General

- [ ] All pages are responsive and accessible.
- [ ] All images have alt text.
- [ ] No broken links or images.
- [ ] Animations and transitions work as intended.
- [ ] No console errors or warnings.

---

This documentation and checklist will help guide your migration to Next.js and ensure a robust, testable site using TDD principles. If you need code examples or further breakdowns for any section, let me know!
