# Terminal Theme for Nanda Kumar Portfolio

A complete terminal-inspired UI/UX redesign for Nanda Kumar's portfolio website, featuring Stark Industries aesthetics with arc reactor blue/red color scheme and interactive terminal elements.

## Features Implemented

### 🎯 Core Design Changes

**1. Terminal-Style Hero Section**

- Interactive terminal interface with system check commands
- Typewriter effect for system initialization
- Animated arc reactor with rotating rings and glowing core
- CRT monitor effect with scan lines
- Terminal header with control buttons

**2. Navigation Overhaul**

- Terminal-style top navigation bar
- System status indicator with animated red pulse
- Mobile bottom navigation with floating terminal design
- Terminal commands integrated into navbar

**3. Section Styling**

- **About Section**: Terminal profile card with system stats and additional data modules
- **Skills Section**: Tech stack organized in terminal-style cards with animated progress bars
- **Projects Section**: Terminal project cards with tech stack tags and live/system links
- **All Sections**: Unified terminal design with consistent color scheme

### ⚡ Visual Effects

**1. Arc Reactor Background**

- Animated particle system with arc reactor attraction
- Blue/red glowing particles with connection lines
- Pulse effect centered on the arc reactor
- Mouse interaction with particle attraction

**2. Terminal Design Elements**

- CRT scan line effect
- Grid overlay background
- Terminal header with control buttons
- Font-mono typography for terminal feel
- Green/blue text colors from terminal aesthetics

**3. Animations**

- Typewriter effect for terminal text
- Particle movements and connections
- Arc reactor pulse animation
- Terminal cursor blinking
- Smooth scrolling between sections

### 🔧 Technical Improvements

**1. Component Architecture**

- `TerminalCard`: Reusable terminal-style card component
- `Terminal`: Interactive terminal interface with commands
- `ArcReactorBackground`: Dynamic particle background system
- Enhanced existing components with terminal styling

**2. Color Scheme**

- Primary: Arc reactor blue (#00F0FF)
- Secondary: Stark red (#FF0000)
- Accent: Stark gold (#FFD700)
- Background: Dark black (#050505)

**3. Typography**

- Font-mono for terminal text
- Bold uppercase headings
- Tracking-widest letter spacing
- Consistent text sizing and line heights

## Usage

The terminal theme is fully responsive and works on all devices. Key features include:

- **Terminal Commands**: Type `help` in the hero terminal for available commands
- **Navigation**: Use the top navbar or terminal commands to navigate
- **Interactivity**: Mouse movements affect particle behavior
- **Animations**: All animations are optimized for performance

## Files Modified

- `src/components/sections/Hero.tsx` - Terminal-style hero section
- `src/components/sections/About.tsx` - Terminal profile and stats
- `src/components/sections/Skills.tsx` - Tech stack with terminal cards
- `src/components/sections/Projects.tsx` - Project cards with terminal design
- `src/components/layout/Navbar.tsx` - Terminal navigation bar
- `src/app/page.tsx` - Main page with arc reactor background
- `src/app/globals.css` - Updated styles and animations
- `tailwind.config.ts` - Custom colors and animations

## New Files Created

- `src/components/ui/TerminalCard.tsx` - Reusable terminal card component
- `src/components/ui/Terminal.tsx` - Interactive terminal interface
- `src/components/ui/ArcReactorBackground.tsx` - Particle system background
- `TERMINAL-THEME.md` - This documentation file

## Browser Support

The terminal theme works on all modern browsers that support:

- CSS Grid and Flexbox
- CSS animations and transforms
- Canvas API (for particle system)
- React and Next.js framework

## Performance

All animations are optimized for performance:

- Particle count adjusts for mobile devices
- Canvas rendering is optimized
- Reduced motion support
- Efficient DOM updates

## License

MIT License - Feel free to use this terminal theme for your own projects.

---

**Nanda Kumar Portfolio - Terminal Theme**  
_A Stark Industries inspired terminal experience_
