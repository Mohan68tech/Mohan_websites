# Fine Touch Metal Card – Luxury Showcase & E-Commerce Website

A modern, responsive e-commerce showcase website built for **Fine Touch Metal Card**—a premier provider of custom metal business cards and VIP membership cards.

Designed with a sleek, luxury aesthetic inspired by premier metal card brands: crisp white background, charcoal gray body text (`#333333` / `#666666`), bold condensed uppercase typography (**Roboto Condensed**), clean body font (**Open Sans**), and warm metallic/orange (`#f58220`) and gold accents.

---

## 🚀 Quick Start

Open `index.html` in any modern web browser, or serve it using any local HTTP server:
```powershell
# In PowerShell:
python -m http.server 8000
# Then visit: http://localhost:8000
```

---

## 🌟 Key Upgrades & Features

1. **Locked Split-Layout Hero Section (No Slideshow)**:
   - **Left Column**: Locked high-impact content with gold highlight typography, subheadline, key NFC highlights (*Instant Contactless Tap, Marine-Grade 304 Solid Steel, Free Complimentary Digital Proof*), and primary **"Order via WhatsApp"** CTA.
   - **Right Column**: Locked commercial studio camera showcase of the metal NFC card with realistic metallic bevels, ambient rim lighting, and a gloss reflection sweep.
   - **Interactive Finish Switcher**: 5 sleek pills (*Matte Black NFC, 24K Gold, Brushed Steel, Rose Gold VIP, Cutout & NFC*) allowing visitors to instantly preview any card finish in place without shifting content or auto-sliding away!

2. **Professional Studio Camera Photography**:
   - Commercial studio macro photos with softbox lighting, shallow depth of field, sharp macro focus, and realistic metallic reflections:
     - `images/studio-card-matte-black.jpg` — Matte Black Stainless Steel NFC Card (Nirmal Capital) with tap icon on dark slate.
     - `images/studio-card-brass-gold.jpg` — 24K Brushed Brass Gold Card (Fine Touch Metal Card) with spiral cutouts on obsidian glass.
     - `images/studio-card-brushed-silver.jpg` — Brushed Stainless Steel Card on dark stone pedestal.
     - `images/studio-card-rose-gold.jpg` — The Chambers Noel Tata VIP Membership card with rounded bevels.
     - `images/studio-card-cutout-nfc.jpg` — Goyal Kitchen Equipments custom cut-through stencil metal card.

3. **VIP Sign Up & Member Sign In**:
   - Header **"VIP Sign Up"** button and mobile drawer access.
   - High-end modal dialog with tabs for **VIP Sign Up** and **Member Sign In**.
   - Persistent login state stored in `localStorage` that dynamically updates the header to `VIP: [First Name]` with a single-click Sign Out option.

4. **Product Showcase (Strictly 5 Cards)**:
   - Balanced 3-top, 2-bottom centered layout.
   - Hover zoom effect, luxury tag badges, specs list, and direct **"Order This Card on WhatsApp"** button adhering to:
     `https://wa.me/YOUR_PHONE_NUMBER?text=Hi%20Fine%20Touch%20Metal%20Card,%20I%20am%20interested%20in%20ordering%20the%20[Card%20Name].`

5. **Promo Banner**:
   - Full-width metallic orange accent banner (`#f58220`): *"Fast Turnaround & Worldwide Express Shipping"*.

6. **Contact Us Section**:
   - Direct email (`fineetching@gmail.com`), phone/WhatsApp (`+91 98198 84421`), business hours, and large green **"Chat Directly on WhatsApp"** button.
   - Interactive contact form with dropdown of the 5 cards and custom confirmation toast.

7. **Interactive Helping Assistant**:
   - Floating chat widget in bottom-right corner answering common questions with a one-click **"Transfer Order to WhatsApp"** button.

---

## ⚙️ How to Change Your WhatsApp Number & Settings in ONE Place

Open `js/config.js` to change the WhatsApp phone number and other contact details:

```javascript
const SITE_CONFIG = {
  // Replace with your international country code + phone number (numbers only, no '+' or '-'):
  whatsappNumber: "919819884421", 

  // Formatted display number shown on the contact page / header:
  whatsappDisplayNumber: "+91 98198 84421",

  email: "fineetching@gmail.com",
  businessHours: "Mon – Sat 9:00 AM – 6:00 PM",
  ...
};
```
Every WhatsApp button across the entire website will automatically update to use your number and format the pre-filled message according to the required specification!

---

## 📁 Directory Structure

```
Fine_Touch_Card/
├── index.html                  # Main responsive website
├── README.md                   # Documentation and guide
├── css/
│   └── styles.css              # Luxury responsive stylesheet
├── js/
│   ├── config.js               # Central WhatsApp number, email, and catalog settings
│   ├── main.js                 # Split hero finish switcher, auth modal, toast
│   └── assistant.js            # Interactive Card Assistant chat widget
└── images/
    ├── fine-touch-logo.jpg          # Official 3D Gold & Steel FT brand crest logo
    ├── studio-card-brass-gold.jpg   # Studio photo of 24K Brushed Brass Gold NFC Card
    ├── studio-card-matte-black.jpg  # Studio macro photo of Matte Black NFC Card
    ├── studio-card-brushed-silver.jpg # Studio macro photo of Brushed Steel Card
    ├── studio-card-rose-gold.jpg    # Studio photo of Rose Gold VIP Card
    └── studio-card-cutout-nfc.jpg   # Studio photo of Cut-Out NFC Metal Card
```
