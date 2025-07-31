# Style Guide: Modern, Elegant, and Professional

## 1. Typography

- **Font Family:**
  - Primary: `Inter`, `ui-sans-serif`, `system-ui`, `sans-serif`
  - Secondary (headings): `Montserrat`, `ui-sans-serif`, `system-ui`, `sans-serif`
- **Font Weights:**
  - Headings: 700 (bold)
  - Body: 400 (regular), 500 (medium)
- **Font Sizes:**
  - H1: 2.5rem (40px)
  - H2: 2rem (32px)
  - H3: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)
- **Line Height:**
  - Headings: 1.2
  - Body: 1.6

## 2. Color Palette

- **Primary:** #1A365D (Coyote Blue)
- **Secondary:** #2B6CB0 (Cerulean)
- **Accent:** #F6E05E (Wheat)
- **Background:** #F9FAFB (Light Gray)
- **Surface/Card:** #FFFFFF (White)
- **Text Primary:** #1A202C (Dark Gray)
- **Text Secondary:** #4A5568 (Cadet Gray)
- **Border:** #E2E8F0 (Light Border)
- **Success:** #38A169
- **Warning:** #D69E2E
- **Error:** #E53E3E

## 3. Spacing & Sizing

- **Spacing Scale:** 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px
- **Container Widths:**
  - Max width: 1200px (desktop)
  - Padding: 16px (mobile), 32px (desktop)

## 4. Buttons

- **Primary Button:**
  - Background: Primary (#1A365D)
  - Text: White
  - Border-radius: 0.5rem (8px)
  - Padding: 12px 24px
  - Font-weight: 600
  - Hover: Slightly darker primary, shadow
- **Secondary Button:**
  - Background: Accent (#F6E05E)
  - Text: Primary (#1A365D)
  - Border: none or subtle
  - Hover: Slightly darker accent

## 5. Card/Panel Styles

- **Background:** Surface (#FFFFFF) or Accent (#F6E05E) for highlights
- **Border:** 1px solid #E2E8F0
- **Border-radius:** 1rem (16px)
- **Shadow:** Subtle, e.g., `0 2px 8px rgba(26, 54, 93, 0.06)`
- **Padding:** 24px (desktop), 16px (mobile)

## 6. Layout & Grid

- **Grid System:** Responsive, 12-column grid for desktop, single column for mobile
- **Section Spacing:** 64px top/bottom (desktop), 32px (mobile)
- **Gaps:** 24px between cards/panels

## 7. Forms & Inputs

- **Input Background:** #F9FAFB
- **Border:** 1px solid #E2E8F0
- **Border-radius:** 0.5rem (8px)
- **Focus:** Border color changes to Primary (#1A365D)

## 8. Iconography

- Use simple, line-based icons (e.g., Heroicons, Lucide, or similar)
- Icon color: Primary or Secondary

## 9. Accessibility

- Ensure color contrast meets WCAG AA
- Use semantic HTML for structure
- Focus states for all interactive elements

## 10. Example Usage

- **Headings:**
  ```html
  <h1 class="font-montserrat font-bold text-4xl text-coyote-700">Heading</h1>
  <h2 class="font-montserrat font-bold text-3xl text-coyote-700">Subheading</h2>
  ```
- **Button:**
  ```html
  <button
    class="bg-coyote-700 text-white rounded-lg px-6 py-3 font-semibold hover:bg-coyote-800 shadow-md"
  >
    Primary
  </button>
  ```
- **Card:**
  ```html
  <div class="bg-white border border-gray-200 rounded-2xl shadow p-6">...</div>
  ```

---

## Tailwind Customization

- Add custom colors (coyote, cerulean, wheat, cadet_gray) to `tailwind.config.ts`
- Use `fontFamily` for Montserrat and Inter
- Extend border radius and shadow as needed

---

This style guide should be referenced for all new components and when refactoring existing ones for a cohesive, modern, and professional look.
