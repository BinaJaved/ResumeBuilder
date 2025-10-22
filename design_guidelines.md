# Design Guidelines: Resume Rewriter SaaS Application

## Design Approach

**Selected Approach**: Design System-Based (Utility-Focused SaaS)

**Rationale**: This is a productivity tool where efficiency, clarity, and trust are paramount. Drawing inspiration from modern SaaS applications like Grammarly, Notion, and Linear that prioritize clean interfaces and seamless workflows.

**Core Principles**:
- Clarity over decoration
- Trust through professional polish
- Immediate functionality without marketing friction
- Seamless input-to-output workflow

---

## Color Palette

**Light Mode**:
- Background: 0 0% 100% (pure white)
- Surface: 240 5% 96% (light gray panels)
- Border: 240 6% 90%
- Text Primary: 240 10% 4%
- Text Secondary: 240 5% 45%
- Primary Brand: 217 91% 60% (professional blue)
- Success: 142 76% 36%
- Muted: 240 5% 84%

**Dark Mode**:
- Background: 240 10% 4%
- Surface: 240 6% 10%
- Border: 240 5% 18%
- Text Primary: 0 0% 98%
- Text Secondary: 240 5% 65%
- Primary Brand: 217 91% 60%
- Success: 142 76% 45%
- Muted: 240 4% 16%

---

## Typography

**Font Stack**: 'Inter', system-ui, -apple-system, sans-serif (via Google Fonts CDN)

**Hierarchy**:
- App Title/Logo: text-xl font-semibold (20px, 600 weight)
- Section Headers: text-lg font-medium (18px, 500 weight)
- Form Labels: text-sm font-medium (14px, 500 weight)
- Body/Input Text: text-base font-normal (16px, 400 weight)
- Helper Text: text-sm text-secondary (14px)
- Button Text: text-sm font-medium (14px, 500 weight)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Micro spacing (gaps, padding): p-2, p-4
- Component spacing: p-6, gap-6
- Section spacing: p-8, gap-8
- Layout spacing: p-12, p-16, p-20

**Container Strategy**:
- Single centered container: max-w-5xl mx-auto
- Generous padding: px-6 on mobile, px-8 on desktop
- Vertical rhythm: py-12 minimum top/bottom spacing

**Grid System**: Single column layout optimized for workflow, no multi-column grids needed

---

## Component Library

### Header
- Minimal top bar with app logo/name on left
- Dark mode toggle on right
- Subtle border-bottom for separation
- Height: h-16, sticky positioning

### Form Container
- Card-style surface with rounded corners (rounded-lg)
- Subtle shadow in light mode, border in dark mode
- Padding: p-8
- Background on surface color, not pure background

### Input Fields (Textareas)
- Border style: border-2 on all inputs
- Focus state: Primary brand color ring (ring-2)
- Dark mode: Consistent surface background with proper contrast
- Height: Textarea min-h-32 for summary/job description, min-h-20 for headline
- Resize: resize-y enabled
- Font: monospace alternative for better text review (font-mono)

### Labels
- Position above inputs with mb-2
- Required indicators: Use asterisk in red/brand color
- Helper text below labels in muted color

### Submit Button
- Style: Solid primary brand background
- Size: px-6 py-3
- Full width on mobile, auto-width on desktop
- Loading state: Disabled with spinner icon (from Heroicons)
- Hover: Slight darkening of background

### Results Display
- Separate card below form with subtle top border/margin separation
- Copy buttons for each result (icon + text from Heroicons)
- Success message on copy action
- Monospace font option toggle for easier reading
- Background: Slightly different from main surface for visual separation

### Loading State
- Inline spinner during API call
- Disabled form inputs
- Semi-transparent overlay on form
- "Rewriting with AI..." text indicator

---

## Interaction Patterns

**Form Flow**:
1. User lands directly on form (no hero section)
2. Clear visual hierarchy: Summary → Headline → Job Description
3. Submit triggers loading state with all inputs disabled
4. Results appear below in expandable/collapsible sections
5. Copy buttons with visual feedback

**Feedback**:
- Copy success: Toast notification or inline checkmark
- Error states: Red border on problematic fields with error text below
- API errors: Alert banner above results area

---

## Accessibility

- All form inputs have proper labels with htmlFor attributes
- Focus visible indicators on all interactive elements
- Sufficient color contrast in both light and dark modes (WCAG AA minimum)
- Keyboard navigation fully supported
- Loading states announced to screen readers

---

## Layout Structure

```
┌─────────────────────────────────────┐
│ Header (Logo + Dark Mode Toggle)   │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Input Form Card             │   │
│  │  - Resume Summary           │   │
│  │  - Resume Headline          │   │
│  │  - Job Description          │   │
│  │  - Submit Button            │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Results Card (conditional)  │   │
│  │  - Rewritten Summary        │   │
│  │  - Rewritten Headline       │   │
│  │  - Copy Buttons             │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## Assets

**Icons**: Heroicons (via CDN) - use outline variant for consistency
- Copy icon for copy-to-clipboard functionality
- Check icon for success states
- Loading spinner for async operations
- Moon/Sun icons for dark mode toggle

**No Images Required**: This is a utility-focused app; no hero images or decorative graphics needed. Focus remains entirely on functionality.