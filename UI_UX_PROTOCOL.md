# UI/UX MASTER PROTOCOL: STARK-EDITION-V7

## 1. Visual Identity (The "Founder" Aesthetic)
- **Concept:** Professional Engineering Dashboard.
- **Theme:** "Shopify Winter '26" (Glassmorphism + Bento) + "Stark HUD" (Cyan Accents + Monospace).
- **Shift:** Move from Iron Man Fan-site to Stark Industries Enterprise UI.

## 2. Design Tokens
- **Background:** `#050505` (Deep Void) with a noise texture overlay (5% opacity).
- **Primary Accent:** `#00F0FF` (Arc Cyan).
- **Secondary Accent:** `rgba(255, 255, 255, 0.1)` (Holo White).
- **Border Radius:** `32px` (Oversized "Shopify" rounding).
- **Padding Rule:** Internal card padding MUST be `2.5rem` (40px) to prevent "crowding."
- **Typography:**
    - Headings: `Space Grotesk` (Bold, -0.05em tracking).
    - Data/Labels: `JetBrains Mono` (Text-xs, uppercase, 0.3em tracking).

## 3. Layout Architecture (The Bento Grid)
- **Constraint:** `max-w-7xl mx-auto` (Strict horizontal alignment).
- **Pattern:** 4-Column Grid.
    - Major Sections (About/Zeridex): `md:col-span-2`.
    - Data Points (Stats/Status): `md:col-span-1`.
- **Gap:** `1.5rem` (24px) consistent spacing.

## 4. UX Content Hierarchy
1. **Hero:** Identity & Core Mission.
2. **Main Bento:**
    - Slot 1: Founder Biography (High Priority).
    - Slot 2: Zeridex Startup (Business Focus).
    - Slot 3: Arsenal/Tech (Technical Proof).
    - Slot 4: Statistics (Numerical Proof).
3. **Footer:** MCU/Interests (Personal touch, kept low priority).

## 5. Micro-Interactions
- **Entrance:** All cards slide up 20px + fade in.
- **Hover:** Border-glow + Scale (1.02x) + Corner bracket reveal.