# Design Guidelines: Dead by Daylight Tournament Ban Veto System

## Design Approach

**Selected Approach**: Custom Gaming/Esports System with Dead by Daylight Theming

This is a specialized tournament tool requiring high visual clarity for streaming while maintaining the game's dark, horror aesthetic. The design draws inspiration from esports tournament overlays (like CS:GO major broadcasts) and Dead by Daylight's UI aesthetic - dark, atmospheric, with strategic use of the game's signature blood-red accents.

**Key Design Principles**:
- **Streaming Optimized**: High contrast, readable at various screen sizes and resolutions
- **Real-time Clarity**: Instant visual feedback for banned items
- **Dual-Purpose Design**: Clear distinction between controller and display modes
- **Horror Atmosphere**: Maintain Dead by Daylight's dark, tense aesthetic

## Core Design Elements

### A. Color Palette

**Dark Mode Primary** (Base Theme):
- Background: 12 8% 8% (deep charcoal, almost black)
- Surface: 12 10% 12% (slightly elevated dark gray)
- Surface Elevated: 12 12% 16% (cards, elevated elements)

**Brand Colors**:
- Primary Red (DBD Blood Red): 0 85% 45% (bold, horror-themed red)
- Primary Hover: 0 85% 55%
- Danger/Ban Indicator: 0 90% 35% (deeper red for banned state)

**Functional Colors**:
- Text Primary: 0 0% 95% (near white)
- Text Secondary: 0 0% 70% (muted gray)
- Border: 12 15% 22% (subtle borders)
- Success (if needed): 142 70% 45% (muted green)

**Controller-Specific Accent**: 280 60% 55% (purple accent for controller UI distinction)

### B. Typography

**Font Families**:
- Primary: 'Inter' (Google Fonts) - clean, highly readable for UI
- Display/Headers: 'Rajdhani' (Google Fonts) - bold, geometric, gaming feel

**Type Scale**:
- Hero/Page Title: text-4xl/text-5xl, font-bold (Rajdhani)
- Section Headers: text-2xl/text-3xl, font-semibold (Rajdhani)
- Card Titles: text-lg, font-medium (Inter)
- Body Text: text-base, font-normal (Inter)
- Small/Meta: text-sm, text-muted

### C. Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-4, p-6, p-8
- Section spacing: mb-8, mb-12, mb-16
- Grid gaps: gap-4, gap-6, gap-8

**Container Strategy**:
- Main containers: max-w-7xl mx-auto px-4
- Controller panels: max-w-6xl
- Display pages: full-width with inner max-w-7xl

### D. Component Library

**Navigation Menu** (Display Mode):
- Full-width header with centered navigation
- Large, clickable category buttons (Survivor Perks, Killer Perks, Maps, Killers)
- Active state: red underline indicator (border-b-4)
- Background: surface elevated with subtle border-bottom

**Ban Item Cards** (Both Modes):
- Grid layout: grid-cols-2 md:grid-cols-4 lg:grid-cols-6 for perks; grid-cols-2 md:grid-cols-3 lg:grid-cols-4 for maps/killers
- Card structure: Dark surface background, 1:1 aspect ratio for images
- Placeholder image: Grayscale with subtle red tint overlay
- Item name: Centered below image, truncate text-sm
- Banned state: Red border (border-4), red overlay (bg-red-900/50), strikethrough text

**Controller Interface**:
- Split layout: Sidebar (available items) + Main (banned preview)
- Available items grid: Same as display but with hover states
- Ban button per item: Purple accent, transforms to "Unbanned" when clicked
- Global reset button: Prominent, top-right, red with confirmation state

**Display Pages** (Streamer View):
- Clean, minimal header with category title
- Banned items grid: Centered, with smooth fade-in animations as items are banned
- Empty state: Subtle "No bans yet" message with ghost grid outline
- Real-time updates: Smooth transitions (transition-all duration-300)

**Reset Button**:
- Fixed position (controller): top-right corner
- Large, obvious: px-6 py-3, red background
- Icon + Text: "Reset All Bans"
- Confirmation state: Brief color change on click

### E. Interactive States & Feedback

**Hover States**:
- Controller item cards: Scale up slightly (scale-105), brightness increase
- Buttons: Brightness shift, subtle shadow

**Banned State Transitions**:
- Fade in red overlay (opacity transition)
- Border color change (instant)
- Text strikethrough animation

**Real-time Sync Indicators**:
- Subtle pulse animation on newly banned items (first 2 seconds)
- WebSocket connection status: Small indicator in corner (green dot = connected)

### F. Responsive Behavior

**Mobile (< 768px)**:
- Single column navigation (stacked buttons)
- Grid: 2 columns for all item types
- Smaller card sizes, reduce padding

**Tablet (768px - 1024px)**:
- Grid: 3-4 columns
- Maintain readability for streaming

**Desktop (> 1024px)**:
- Full grid layouts as specified
- Optimal viewing for both controller and display

## Visual Hierarchy

**Controller View**:
1. Category selection (top, prominent)
2. Available items grid (main focus, left/center)
3. Banned preview (right sidebar or bottom section)
4. Reset button (top-right, always visible)

**Display View**:
1. Category title (centered, large)
2. Banned items grid (main focus, centered)
3. Navigation menu (top, subtle when not in use)

## Images

**Placeholder Images**:
- Item placeholders: 300x300px dark gray rectangles with subtle red border
- Dead by Daylight logo silhouette or generic icon overlay
- Grayscale with red tint: filter: grayscale(80%) sepia(20%) hue-rotate(-10deg)

**No hero image needed** - This is a utility tool focused on functionality over marketing appeal.

## Animations

**Minimal, Purposeful Animations**:
- Banned state transition: 200ms ease-in-out
- Item appearance: Fade in 300ms when banned
- Hover scale: 150ms ease-out
- Reset confirmation: Brief flash 100ms

**Avoid**: Continuous loops, distracting movements during live streams