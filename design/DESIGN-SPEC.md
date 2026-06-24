# 🎨 Design Specification — CV Builder Loker Majalengka

> **Version:** 1.0  
> **Last Updated:** 2026-06-24  
> **Author:** Pixie (Creative Designer)

---

## Table of Contents

1. [Color Palette](#1-color-palette)
2. [Typography System](#2-typography-system)
3. [Icon Set](#3-icon-set)
4. [Component Specifications](#4-component-specifications)
5. [Spacing System](#5-spacing-system)
6. [Responsive Breakpoints](#6-responsive-breakpoints)
7. [ATS Template Spec](#7-ats-template-spec)
8. [Creative Template Spec](#8-creative-template-spec)
9. [Export & Download](#9-export--download)

---

## 1. Color Palette

### 1.1 Creative Template — 3 Theme Options

#### Option 1: 🟦 Professional Blue

| Role       | Color Name | Hex       | Tailwind Class | Usage                        |
| ---------- | ---------- | --------- | -------------- | ---------------------------- |
| Primary    | Blue 600   | `#2563EB` | `blue-600`     | Headings, sidebar bg, links  |
| Secondary  | Blue 800   | `#1E40AF` | `blue-800`     | Sidebar text, dark accents   |
| Accent     | Blue 500   | `#3B82F6` | `blue-500`     | Icons, highlights, badges    |
| Background | Slate 50   | `#F8FAFC` | `slate-50`     | Page/main content bg         |
| Surface    | White      | `#FFFFFF` | `white`        | Card backgrounds             |
| Text       | Slate 900  | `#0F172A` | `slate-900`    | Primary body text            |
| Text Muted | Slate 500  | `#64748B` | `slate-500`    | Secondary/meta text          |

#### Option 2: 🟩 Modern Green

| Role       | Color Name | Hex       | Tailwind Class | Usage                        |
| ---------- | ---------- | --------- | -------------- | ---------------------------- |
| Primary    | Emerald 600| `#059669` | `emerald-600`  | Headings, sidebar bg, links  |
| Secondary  | Emerald 700| `#047857` | `emerald-700`  | Sidebar text, dark accents   |
| Accent     | Emerald 500| `#10B981` | `emerald-500`  | Icons, highlights, badges    |
| Background | Emerald 50 | `#ECFDF5` | `emerald-50`   | Page/main content bg         |
| Surface    | White      | `#FFFFFF` | `white`        | Card backgrounds             |
| Text       | Slate 900  | `#0F172A` | `slate-900`    | Primary body text            |
| Text Muted | Slate 500  | `#64748B` | `slate-500`    | Secondary/meta text          |

#### Option 3: 🟪 Elegant Purple

| Role       | Color Name | Hex       | Tailwind Class | Usage                        |
| ---------- | ---------- | --------- | -------------- | ---------------------------- |
| Primary    | Violet 600 | `#7C3AED` | `violet-600`   | Headings, sidebar bg, links  |
| Secondary  | Violet 700 | `#6D28D9` | `violet-700`   | Sidebar text, dark accents   |
| Accent     | Violet 500 | `#8B5CF6` | `violet-500`   | Icons, highlights, badges    |
| Background | Violet 50  | `#F5F3FF` | `violet-50`    | Page/main content bg         |
| Surface    | White      | `#FFFFFF` | `white`        | Card backgrounds             |
| Text       | Slate 900  | `#0F172A` | `slate-900`    | Primary body text            |
| Text Muted | Slate 500  | `#64748B` | `slate-500`    | Secondary/meta text          |

### 1.2 ATS Template — Monochrome

| Role       | Color  | Hex       | Usage                        |
| ---------- | ------ | --------- | ---------------------------- |
| Primary    | Black  | `#000000` | All text, headings           |
| Secondary  | Gray   | `#333333` | Body text alternative        |
| Background | White  | `#FFFFFF` | Page background              |
| Border     | Gray   | `#CCCCCC` | Section dividers (optional)  |

> ⚠️ **ATS Rule:** No colors except black. No background fills. No colored text.

### 1.3 Color Usage Guidelines

- **Primary** → Used for section headings, sidebar background, name
- **Secondary** → Used for sidebar text on primary bg, dark accents
- **Accent** → Used for icons, bullet points, skill bars, links
- **Background** → Used for main content area
- **Text** → Standard body text, always high contrast
- **Text Muted** → Date ranges, location, supplementary info

### 1.4 Contrast Ratios (WCAG AA)

| Combination         | Ratio  | Pass AA? |
| ------------------- | ------ | -------- |
| Text on White       | 16.1:1 | ✅ Yes   |
| Blue 600 on White   | 5.7:1  | ✅ Yes   |
| Emerald 600 on White| 3.8:1  | ✅ Yes (large text) |
| Violet 600 on White | 4.6:1  | ✅ Yes   |
| White on Blue 600   | 5.7:1  | ✅ Yes   |

---

## 2. Typography System

### 2.1 Font Families

| Font              | Source        | Weights        | Role                     |
| ----------------- | ------------- | -------------- | ------------------------ |
| Plus Jakarta Sans | Google Fonts  | 700, 800       | Display, Headings, Name  |
| Inter             | Google Fonts  | 400, 500, 600  | Body text, labels, UI    |
| Times New Roman   | System font   | 400, 700       | ATS template only        |

### 2.2 Type Scale — Creative Template

| Element              | Font              | Weight | Size   | Line Height | Letter Spacing |
| -------------------- | ----------------- | ------ | ------ | ----------- | -------------- |
| CV Name              | Plus Jakarta Sans | 800    | 28px   | 1.2         | -0.02em        |
| Section Heading      | Plus Jakarta Sans | 700    | 16px   | 1.3         | -0.01em        |
| Subsection Heading   | Plus Jakarta Sans | 700    | 14px   | 1.4         | 0             |
| Body Text            | Inter             | 400    | 12px   | 1.6         | 0             |
| Body Bold            | Inter             | 600    | 12px   | 1.6         | 0             |
| Small / Meta         | Inter             | 400    | 10px   | 1.5         | 0.01em        |
| Skill Tags           | Inter             | 500    | 10px   | 1.4         | 0.02em        |

### 2.3 Type Scale — ATS Template

| Element              | Font           | Weight | Size   | Line Height |
| -------------------- | -------------- | ------ | ------ | ----------- |
| CV Name              | Times New Roman| 700    | 18pt   | 1.2         |
| Section Heading (H2) | Times New Roman| 700    | 12pt   | 1.3         |
| Body Text            | Times New Roman| 400    | 11pt   | 1.5         |
| Date / Location      | Times New Roman| 400    | 11pt   | 1.5         |

### 2.4 CSS Font Loading

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500;600&display=swap');

/* Creative Template */
.cv-creative {
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
}

/* ATS Template */
.cv-ats {
  --font-heading: 'Times New Roman', serif;
  --font-body: 'Times New Roman', serif;
}
```

---

## 3. Icon Set

### 3.1 Lucide React Icons

| Context       | Icon Component | Unicode | Size      | Color Rule                |
| ------------- | -------------- | ------- | --------- | ------------------------- |
| Email         | `Mail`         | ✉       | 16×16     | Accent color              |
| Phone         | `Phone`        | 📞      | 16×16     | Accent color              |
| Location      | `MapPin`       | 📍      | 16×16     | Accent color              |
| LinkedIn      | `Linkedin`     | 💼      | 16×16     | Accent color              |
| Website       | `Globe`        | 🌐      | 16×16     | Accent color              |
| Education     | `GraduationCap`| 🎓      | 18×18     | Accent color              |
| Work          | `Briefcase`    | 💼      | 18×18     | Accent color              |
| Skills        | `Wrench`       | 🔧      | 18×18     | Accent color              |
| Languages     | `Languages`    | 🌍      | 18×18     | Accent color              |

### 3.2 Icon Usage Rules

1. **Size:** Contact icons → 16px, Section icons → 18px
2. **Color:** Always use the theme's **Accent** color
3. **ATS Template:** Do NOT use icons. Use text labels only (e.g., "Email:", "Phone:")
4. **Alignment:** Icons align to the left of their associated text
5. **Spacing:** 6px gap between icon and text

---

## 4. Component Specifications

### 4.1 Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--color-primary);
  color: white;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover {
  background: var(--color-secondary);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  padding: 9px 20px;
  border-radius: 8px;
  cursor: pointer;
}
```

#### Ghost Button (Download/Print)
```css
.btn-ghost {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid #E2E8F0;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 13px;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
```

### 4.2 Input Fields

```css
.input {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text);
  background: white;
  border: 1.5px solid #E2E8F0;
  border-radius: 8px;
  padding: 10px 14px;
  width: 100%;
  transition: border-color 0.2s;
}
.input:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.input-label {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 6px;
  display: block;
}
.input-helper {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 4px;
}
```

### 4.3 Cards (Section Containers)

```css
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #F1F5F9;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.card-title {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
}
```

### 4.4 Theme Selector (Color Picker)

```css
.theme-picker {
  display: flex;
  gap: 12px;
}
.theme-option {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.2s;
}
.theme-option:hover {
  transform: scale(1.1);
}
.theme-option.active {
  border-color: var(--color-text);
}
.theme-option.blue   { background: #2563EB; }
.theme-option.green  { background: #059669; }
.theme-option.purple { background: #7C3AED; }
```

### 4.5 Skill Tags

```css
.skill-tag {
  display: inline-block;
  background: rgba(var(--color-primary-rgb), 0.1);
  color: var(--color-primary);
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 999px;
  letter-spacing: 0.02em;
}
```

### 4.6 Photo Placeholder

```css
.photo-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--color-accent);
  overflow: hidden;
}
.photo-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## 5. Spacing System

### 5.1 Base Unit

**Base unit:** 4px  
All spacing values are multiples of 4px.

### 5.2 Spacing Scale

| Token       | Value | Usage                                  |
| ----------- | ----- | -------------------------------------- |
| `space-0`   | 0px   | Reset                                  |
| `space-1`   | 4px   | Tight spacing (icon-to-text gap)       |
| `space-2`   | 8px   | Small gap (between tags)               |
| `space-3`   | 12px  | Default item gap                       |
| `space-4`   | 16px  | Section inner padding                  |
| `space-5`   | 20px  | Medium padding                         |
| `space-6`   | 24px  | Card padding, section gap              |
| `space-8`   | 32px  | Large section spacing                  |
| `space-10`  | 40px  | Major section divider                  |
| `space-12`  | 48px  | Page margins                           |

### 5.3 CV Layout Spacing

| Area               | Padding | Gap Between Items |
| ------------------ | ------- | ----------------- |
| CV Page (overall)  | 32px    | —                 |
| Sidebar            | 24px    | 24px between sections |
| Main Content       | 32px    | 24px between sections |
| Section → Content  | —       | 12px              |
| Work Experience    | —       | 20px between jobs |
| Education          | —       | 16px between entries |
| Skills Grid        | —       | 6px between tags  |
| Contact Info       | —       | 10px between items |

---

## 6. Responsive Breakpoints

### 6.1 Breakpoint Scale

| Name       | Width     | Target                  |
| ---------- | --------- | ----------------------- |
| `sm`       | 640px   | Mobile phones           |
| `md`       | 768px   | Tablets (portrait)      |
| `lg`       | 1024px  | Tablets (landscape)     |
| `xl`       | 1280px  | Desktops                |
| `2xl`      | 1536px  | Large screens           |

### 6.2 Responsive Behavior

| Breakpoint | Editor Layout      | CV Preview                |
| ---------- | ------------------ | ------------------------- |
| < 768px    | Stacked (full width)| Scaled-down single column|
| 768-1024px | Side-by-side 50/50 | Scaled-down two-column   |
| > 1024px   | Side-by-side 40/60 | Full-size two-column     |

### 6.3 Print Sizing

| Format | Width  | Height | Margins |
| ------ | ------ | ------ | ------- |
| A4     | 210mm  | 297mm  | 15mm    |
| Letter | 216mm  | 279mm  | 15mm    |

> CV preview always renders at A4 proportions (1:√2 ratio ≈ 1:1.414)

---

## 7. ATS Template Spec

### 7.1 Design Principles

1. **Parseability > Aesthetics** — ATS software must extract every field
2. **Zero decorative elements** — No colors, images, icons, tables, columns
3. **Standard fonts** — Times New Roman only (universally supported)
4. **Linear flow** — Top-to-bottom, left-to-right reading order
5. **Plain text compatible** — Should look good as raw text extraction

### 7.2 Layout Structure

```
┌─────────────────────────────────────────────┐
│                                             │
│              FULL NAME (Bold, 18pt)         │
│                                             │
│  Email | Phone | Location | LinkedIn        │
│  (Text separated by pipe "|")               │
│                                             │
│─────────────────────────────────────────────│
│                                             │
│  PROFESSIONAL SUMMARY                       │
│  ─────────────────                          │
│  2-4 sentences about professional goals     │
│  and key qualifications.                    │
│                                             │
│─────────────────────────────────────────────│
│                                             │
│  WORK EXPERIENCE                            │
│  ─────────────────                          │
│                                             │
│  Job Title | Company Name                    │
│  Month YYYY — Month YYYY                    │
│  • Achievement/responsibility statement     │
│  • Achievement/responsibility statement     │
│                                             │
│─────────────────────────────────────────────│
│                                             │
│  EDUCATION                                  │
│  ─────────                                  │
│                                             │
│  Degree | Institution Name                  │
│  Month YYYY — Month YYYY                    │
│  Additional info (GPA, honors, etc.)       │
│                                             │
│─────────────────────────────────────────────│
│                                             │
│  SKILLS                                     │
│  ──────                                     │
│  Skill 1, Skill 2, Skill 3, Skill 4, etc.  │
│                                             │
└─────────────────────────────────────────────┘
```

### 7.3 ATS Formatting Rules

| Rule                     | Specification                          |
| ------------------------ | -------------------------------------- |
| Font Family              | `Times New Roman, serif`               |
| Font Size (Name)         | 18pt, Bold                             |
| Font Size (Section H2)   | 12pt, Bold, UPPERCASE                  |
| Font Size (Body)         | 11pt, Regular                          |
| Line Height              | 1.5                                    |
| Color                    | `#000000` (black) only                 |
| Background               | `#FFFFFF` (white) only                 |
| Borders                  | Thin horizontal lines between sections (`#CCCCCC`) |
| Columns                  | 1 column only                          |
| Tables                   | ❌ No tables                           |
| Images                   | ❌ No images/photos                    |
| Icons                    | ❌ No icons                            |
| Text Boxes               | ❌ No text boxes                       |
| Bold                     | ✅ Use for job titles, company names   |
| Bullet Points            | ✅ Use for achievements (• character)  |
| Hyperlinks               | ❌ No clickable links                  |

### 7.4 Section Order (Critical for ATS)

```
1. Name (H1)
2. Contact Information (single line)
3. Professional Summary
4. Work Experience (reverse chronological)
5. Education (reverse chronological)
6. Skills (comma-separated or bullet list)
```

> ⚠️ **Why this order?** Most ATS parsers expect this sequence. Rearranging may cause data to be placed in wrong fields.

### 7.5 Contact Line Format

```
email@domain.com | +62 812-xxxx-xxxx | Jakarta, Indonesia | linkedin.com/in/username
```

- Separated by ` | ` (space-pipe-space)
- No icons, no labels (ATS infers from format)
- Phone in international format: `+62 xxx-xxxx-xxxx`

### 7.6 ATS-Safe Keywords

Include these naturally in descriptions:
- Action verbs: Led, Managed, Developed, Implemented, Achieved, Increased
- Quantifiable results: percentages, revenue, team size
- Industry-specific terms from the job posting

---

## 8. Creative Template Spec

### 8.1 Design Principles

1. **Visual Impact** — First impression matters
2. **Clean Hierarchy** — Easy to scan in 6 seconds
3. **Professional Yet Modern** — Not flashy, but polished
4. **Color as Identity** — Theme color creates brand feel
5. **Photography** — Professional headshot adds personality

### 8.2 Layout Structure

```
┌──────────────────┬────────────────────────────────────┐
│                  │                                    │
│    ┌────────┐   │         FULL NAME                  │
│    │  PHOTO │   │         Professional Title          │
│    │ 100×100│   │                                    │
│    └────────┘   │  ═══════════════════════════════   │
│                  │                                    │
│  CONTACT         │  PROFESSIONAL SUMMARY              │
│  ─────────       │  ────────────────────────          │
│  ✉ email         │  2-3 paragraphs about yourself,   │
│  📞 phone        │  your goals, and key strengths.   │
│  📍 location     │                                    │
│  💼 linkedin     │  ═══════════════════════════════   │
│  🌐 website      │                                    │
│                  │  WORK EXPERIENCE                   │
│  ─────────────── │  ──────────────────                │
│                  │                                    │
│  SKILLS          │  Job Title                        │
│  ─────────       │  Company Name                     │
│  ▪ Skill 1       │  Month YYYY — Month YYYY          │
│  ▪ Skill 2       │  • Achievement or responsibility  │
│  ▪ Skill 3       │  • Achievement or responsibility  │
│  ▪ Skill 4       │                                    │
│  ▪ Skill 5       │  ═══════════════════════════════   │
│                  │                                    │
│  ─────────────── │  EDUCATION                        │
│                  │  ──────────                       │
│  LANGUAGES       │  Degree Title                     │
│  ─────────       │  Institution Name                 │
│  ▪ Language 1    │  Month YYYY — Month YYYY          │
│  ▪ Language 2    │                                    │
│  ▪ Language 3    │                                    │
│                  │                                    │
└──────────────────┴────────────────────────────────────┘
     35%                    65%
```

### 8.3 Column Specifications

| Column    | Width | Background          | Padding   | Content                        |
| --------- | ----- | ------------------- | --------- | ------------------------------ |
| Sidebar   | 35%   | Primary color       | 24px      | Photo, Contact, Skills, Lang   |
| Main      | 65%   | White / Background  | 32px      | Name, Summary, Experience, Edu |

### 8.4 Sidebar Details

| Section   | Icon            | Font Size | Font Weight | Color     |
| --------- | --------------- | --------- | ----------- | --------- |
| Photo     | —               | —         | —           | —         |
| Contact   | Per-item icon   | 12px      | 400 (Inter) | White     |
| Skills    | `Wrench` icon   | 10px      | 500 (Inter) | White     |
| Languages | `Languages` icon| 10px      | 500 (Inter) | White     |

**Sidebar Background:** Primary color with slight opacity variation
```css
.sidebar {
  background: var(--color-primary);
  color: white;
}
.sidebar-section-title {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 2px solid var(--color-accent);
}
```

### 8.5 Main Content Details

| Section           | Font                    | Size | Weight | Color        |
| ----------------- | ----------------------- | ---- | ------ | ------------ |
| Name              | Plus Jakarta Sans       | 28px | 800    | Primary      |
| Professional Title| Inter                   | 14px | 500    | Text Muted   |
| Section Heading   | Plus Jakarta Sans       | 16px | 700    | Primary      |
| Job Title         | Inter                   | 13px | 600    | Text         |
| Company Name      | Inter                   | 13px | 500    | Text         |
| Date Range        | Inter                   | 11px | 400    | Text Muted   |
| Description       | Inter                   | 12px | 400    | Text         |

### 8.6 Theme Switching Implementation

```typescript
// Theme configuration
type ThemeName = 'blue' | 'green' | 'purple';

const themes: Record<ThemeName, ThemeColors> = {
  blue: {
    primary:   '#2563EB',
    secondary: '#1E40AF',
    accent:    '#3B82F6',
    background:'#F8FAFC',
  },
  green: {
    primary:   '#059669',
    secondary: '#047857',
    accent:    '#10B981',
    background:'#ECFDF5',
  },
  purple: {
    primary:   '#7C3AED',
    secondary: '#6D28D9',
    accent:    '#8B5CF6',
    background:'#F5F3FF',
  },
};
```

### 8.7 Photo Guidelines

| Requirement   | Specification                          |
| ------------- | -------------------------------------- |
| Format        | JPG or PNG                             |
| Aspect Ratio  | 1:1 (square)                           |
| Minimum Size  | 200×200px                              |
| Recommended   | 400×400px                              |
| Display Size  | 100×100px (circular crop)              |
| Border        | 3px solid accent color                 |
| Background    | None (transparent or removed)          |

---

## 9. Export & Download

### 9.1 PDF Export Specifications

| Property       | Value                              |
| -------------- | ---------------------------------- |
| Format         | PDF/A-1b (for archival)            |
| Page Size      | A4 (210 × 297 mm)                  |
| Margins        | 15mm all sides                      |
| Resolution     | 300 DPI (for print quality)        |
| Font Embedding | ✅ All fonts must be embedded       |
| Compression    | Lossless for text, JPEG for images  |

### 9.2 PDF Generation Approach

1. **Creative Template** → Use `@react-pdf/renderer` or `html2pdf.js`
2. **ATS Template** → Use `@react-pdf/renderer` (simpler layout)
3. Both templates render at A4 dimensions
4. File naming: `{FirstName}_{LastName}_CV_{template}.pdf`

### 9.3 PDF Metadata

```
Title: {Name} - CV
Author: {Name}
Subject: Curriculum Vitae
Keywords: CV, Resume, {Job Title}
Creator: CV Builder Loker Majalengka
Producer: PDF.js / React-PDF
```

---

## Appendix A: Tailwind Color Reference

```javascript
// tailwind.config.js additions
module.exports = {
  theme: {
    extend: {
      colors: {
        'cv-blue': {
          50:  '#F8FAFC',
          500: '#3B82F6',
          600: '#2563EB',
          800: '#1E40AF',
        },
        'cv-green': {
          50:  '#ECFDF5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        'cv-purple': {
          50:  '#F5F3FF',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        ats:     ['"Times New Roman"', 'serif'],
      },
    },
  },
};
```

## Appendix B: File Structure

```
design/
├── DESIGN-SPEC.md          ← This document
├── color-palette.md        ← Color swatches reference
└── README.md               ← Design overview

src/
├── components/
│   ├── CVEditor/
│   │   ├── Sidebar.tsx
│   │   ├── MainContent.tsx
│   │   ├── ThemePicker.tsx
│   │   └── PhotoUpload.tsx
│   ├── CVPreview/
│   │   ├── CreativeTemplate.tsx
│   │   └── ATSTemplate.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Card.tsx
├── lib/
│   ├── themes.ts           ← Theme definitions
│   ├── fonts.ts            ← Font configuration
│   └── pdf-export.ts       ← PDF generation logic
└── styles/
    ├── cv-creative.css
    └── cv-ats.css
```

---

## Appendix C: Quick Reference — Design Tokens

```css
:root {
  /* Colors — default to Blue theme */
  --color-primary:    #2563EB;
  --color-secondary:  #1E40AF;
  --color-accent:     #3B82F6;
  --color-background: #F8FAFC;
  --color-surface:    #FFFFFF;
  --color-text:       #0F172A;
  --color-text-muted: #64748B;

  /* Typography */
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body:    'Inter', sans-serif;

  /* Spacing */
  --space-unit: 4px;

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

---

> 📝 **Note:** This design spec is the single source of truth for all visual decisions in the CV Builder. Any deviations from this spec must be documented here.