---
name: Regal Radiance
colors:
  surface: '#1c0d27'
  surface-dim: '#1c0d27'
  surface-bright: '#43334f'
  surface-container-lowest: '#160722'
  surface-container-low: '#241530'
  surface-container: '#281934'
  surface-container-high: '#33233f'
  surface-container-highest: '#3f2e4b'
  on-surface: '#f2daff'
  on-surface-variant: '#cfc3ce'
  inverse-surface: '#f2daff'
  inverse-on-surface: '#3a2a46'
  outline: '#988d98'
  outline-variant: '#4c444d'
  surface-tint: '#e6b5f6'
  primary: '#e6b5f6'
  on-primary: '#462056'
  primary-container: '#2e073f'
  on-primary-container: '#9f73af'
  inverse-primary: '#774f88'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#e7b4ff'
  on-tertiary: '#4f0076'
  tertiary-container: '#2f0048'
  on-tertiary-container: '#b35be5'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f8d8ff'
  primary-fixed-dim: '#e6b5f6'
  on-primary-fixed: '#2f0840'
  on-primary-fixed-variant: '#5e376e'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#f5d9ff'
  tertiary-fixed-dim: '#e7b4ff'
  on-tertiary-fixed: '#30004a'
  on-tertiary-fixed-variant: '#7008a2'
  background: '#1c0d27'
  on-background: '#f2daff'
  surface-variant: '#3f2e4b'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style
The design system embodies an uncompromising sense of luxury, catering to a discerning audience that values heritage blended with modern sophistication. The brand personality is regal yet accessible, evoking emotions of exclusivity, desire, and timeless elegance.

The design style is **High-Contrast Modern Luxury**. It leverages deep, immersive backgrounds to allow product photography to "glow." By mixing elements of Minimalism (generous whitespace and purposeful void) with glamorous, high-contrast accents, the UI functions as a digital velvet display case. Visual interest is maintained through delicate gold linework and smooth, fluid transitions that mimic the slow, deliberate movements of luxury retail.

## Colors
The palette is rooted in a deep, nocturnal "Imperial Purple" (#2E073F) which serves as the primary canvas, providing a high-contrast foundation for "Metallic Gold" (#D4AF37) accents. 

- **Primary & Canvas:** Use the deepest purples for backgrounds to create depth.
- **Secondary (Gold):** Reserved strictly for interactive elements, call-to-actions, and delicate decorative borders.
- **Tertiary (Plum):** Used for subtle depth in gradients and secondary buttons.
- **Soft Lavender:** Primarily used for text and iconography to ensure legibility against dark backgrounds without the harshness of pure white.

## Typography
The typographic scale relies on the tension between the expressive, high-contrast serifs of the headlines and the geometric precision of the body text. 

**Headlines** should utilize the italic styles of Playfair Display for emphasis or "Editorial" sections to heighten the sense of luxury. 
**Body text** uses Montserrat with increased line-height to ensure a breathable, premium feel. 
**Labels** and small navigational elements should always be uppercase with generous letter spacing to mimic the engraving found on fine jewelry.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to maintain a controlled, gallery-like composition. 

- **Whitespace:** Use aggressive vertical spacing (`section-gap`) to separate collections. Content should never feel crowded; if in doubt, add more padding.
- **Grid:** A 12-column grid with wide margins. Product cards often span 3 or 4 columns, while hero imagery should span the full container width.
- **Mobile:** Transition to a 2-column grid for product listings to maintain image detail. Margins shrink to 20px, but vertical rhythm remains spacious.

## Elevation & Depth
In this design system, depth is achieved through **Tonal Layering** and **Refined Shadows** rather than heavy skeuomorphism.

- **Surfaces:** Use slightly lighter shades of purple (#3D0A54) to pull elements forward.
- **Shadows:** Use "Ambient Glow" shadows—low-opacity, large-blur shadows with a subtle purple tint (`rgba(46, 7, 63, 0.6)`) to make cards appear as if they are floating over a plush surface.
- **Gold Borders:** Use ultra-thin (1px) gold borders to define high-priority containers or "Limited Edition" cards.
- **Glassmorphism:** Apply a 20px backdrop blur to navigation bars and overlays to maintain the immersive color palette while adding a modern crystalline effect.

## Shapes
The shape language is predominantly **Soft (Level 1)**. 

While the brand is premium, sharp corners are avoided to keep the aesthetic feminine and inviting. Small radius (4px to 8px) is applied to buttons and cards. Circles are used exclusively for secondary decorative elements or price badges to contrast against the structured rectangular grid of the product photography.

## Components
Consistent component styling reinforces the high-end boutique atmosphere:

- **Buttons:** Primary buttons are solid Gold (#D4AF37) with dark purple text. Secondary buttons use a "Ghost" style with a 1px gold outline. Hover states should include a subtle outer glow.
- **Input Fields:** Minimalist design with only a bottom border in Soft Lavender. Labels sit above the line in `label-caps`.
- **Product Cards:** No visible borders by default. On hover, a subtle gold inner-stroke appears and the image scales slightly (1.05x).
- **Chips/Tags:** Used for "New In" or "In Stock." These should be small, capitalized, and use a semi-transparent Lavender background with high letter spacing.
- **Lists:** Use custom gold diamond-shaped bullets instead of standard discs.
- **Transitions:** All interactive states (hover, click, page load) must use a `cubic-bezier(0.4, 0, 0.2, 1)` easing function for a "silky" feel.