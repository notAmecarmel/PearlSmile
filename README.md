# 🦷 PearlSmile Dental — Website

A premium, fully responsive dental clinic website built with HTML, CSS, and JavaScript.

---

## ✨ Features

- **Animated Loader** — Elegant SVG tooth animation on startup
- **Custom Cursor** — Gold ring cursor with smooth lag effect (desktop)
- **Sticky Navigation** — Transparent → frosted glass on scroll, with mobile hamburger
- **Hero Section** — Floating 3D tooth, animated blobs, parallax, live stat counters
- **Scrolling Trust Banner** — Infinite marquee animation
- **Services Grid** — 6 service cards with 3D tilt, hover effects, featured card
- **About Section** — Floating badges, awards, feature highlights
- **4-Step Process** — Clean visual flow diagram
- **Team Section** — Doctor profiles with specialty tags
- **Before/After Slider** — Interactive drag slider to reveal patient results
- **Testimonials Carousel** — Auto-sliding with dots and swipe support
- **Pricing Section** — 3 transparent pricing tiers
- **FAQ Accordion** — Smooth animated expand/collapse
- **Booking Form** — Full form with success state animation
- **Footer** — Full links, social, contact info
- **Back to Top Button**
- **Magnetic button effects**
- **Scroll-triggered reveal animations**
- **Fully responsive** (mobile, tablet, desktop)

---

## 🚀 How to Run

### Option 1 — Open Directly (Simplest)
1. Unzip the project folder
2. Double-click `index.html`
3. It opens in your browser — done!

> ⚠️ Note: Custom fonts load from Google Fonts. Make sure you have an internet connection for the first load.

---

### Option 2 — Local Server (Recommended for best performance)

#### Using Python (no install needed on Mac/Linux):
```bash
# Navigate to the project folder
cd dental-clinic

# Python 3
python3 -m http.server 3000

# Then open: http://localhost:3000
```

#### Using Node.js:
```bash
# Install serve globally (one-time)
npm install -g serve

# Navigate to the project folder
cd dental-clinic

# Start server
serve .

# Then open the URL shown in the terminal
```

#### Using VS Code:
1. Install the **Live Server** extension by Ritwick Dey
2. Right-click `index.html` → **"Open with Live Server"**
3. Browser opens automatically at `http://127.0.0.1:5500`

---

## 📁 Project Structure

```
dental-clinic/
├── index.html          ← Main HTML file
├── css/
│   └── style.css       ← All styles + animations
├── js/
│   └── main.js         ← All JavaScript interactions
└── README.md           ← This file
```

---

## 🎨 Customisation Guide

### Change Clinic Name
Search and replace `PearlSmile` in `index.html`

### Change Colours
Edit CSS variables at the top of `css/style.css`:
```css
:root {
  --gold: #c8a96e;       /* Primary accent */
  --navy: #0d1b2a;       /* Dark backgrounds */
  --teal: #2a7d8c;       /* Secondary accent */
  --cream: #faf7f2;      /* Light backgrounds */
}
```

### Change Contact Info
Find the **Contact section** in `index.html` and update:
- Address
- Phone numbers
- Email address
- Opening hours

### Add Real Photos
Replace the SVG placeholders in the **About**, **Team**, and **Hero** sections with `<img>` tags pointing to your photos.

---

## 📞 Sections Included

| Section | Description |
|--------|-------------|
| Hero | Main landing with CTA, stats, floating visual |
| Trust Band | Scrolling certifications / badges |
| Services | General, Cosmetic, Ortho, Implants, Pediatric, Emergency |
| About | Story, technology, patient-first values |
| Process | 4-step patient journey |
| Team | 3 doctor profiles |
| Before/After | Interactive drag-to-reveal slider |
| Testimonials | 6 patient reviews, auto-carousel |
| Pricing | 3 tiers with feature lists |
| FAQ | 6 common questions, accordion |
| Contact | Booking form + clinic info |
| Footer | Links, social, legal |

---

## 🌐 Browser Support

Tested and working in:
- ✅ Google Chrome (recommended)
- ✅ Safari
- ✅ Firefox
- ✅ Microsoft Edge
- ✅ Mobile Chrome & Safari

---

## 📝 License

This project was created for client use. All design and code is original.

---

Made with ✦ by PearlSmile Design Team
