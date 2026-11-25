/**
 * =====================================================================
 * FINE TOUCH METAL CARD - CENTRAL CONFIGURATION & SETTINGS
 * =====================================================================
 * Change your WhatsApp phone number, email, and company details in one place!
 * All WhatsApp order and chat buttons across the entire website will
 * automatically update to use these values.
 */

const SITE_CONFIG = {
  // Brand Name
  brandName: "Fine Touch Metal Card",
  tagline: "Premier Provider of Custom Metal Business & VIP Cards",

  // WhatsApp Configuration:
  // Direct contact number (+91 98198 84421)
  whatsappNumber: "919819884421", 

  // Formatted display number shown across the website:
  whatsappDisplayNumber: "+91 98198 84421",

  // Email Address
  email: "fineetching@gmail.com",

  // Operating Hours
  businessHours: "Mon – Sat 9:00 AM – 6:00 PM",

  // Headquarters / Studio Location
  location: "Mumbai & Worldwide Express Courier Fulfillment",

  // Pre-filled WhatsApp message templates
  whatsappTemplates: {
    orderCard: (cardName) =>
      `Hi Fine Touch Metal Card, I am interested in ordering the ${cardName}.`,

    heroCTA: "Hi Fine Touch Metal Card, I would like to explore custom NFC metal business cards for my brand.",
    headerCTA: "Hi Fine Touch Metal Card, I am ready to place an order.",
    promoCTA: "Hi Fine Touch Metal Card, I saw your Fast Turnaround & Worldwide Express Shipping banner and would like to place an inquiry.",
    contactChatCTA: "Hi Fine Touch Metal Card, I would like to speak directly with a card specialist.",
    assistantTransferCTA: (inquiryTopic) =>
      `Hi Fine Touch Metal Card, I was speaking with your Card Assistant regarding ${inquiryTopic || "an order"} and would like to proceed with a specialist.`
  },

  // THE 5 EXCLUSIVE CARD STYLES ONLY - Professional Studio Camera Photography
  products: [
    {
      id: "matte-black",
      name: "Matte Black Stainless Steel Card",
      badge: "Signature Black",
      finish: "Matte Black & Laser Etch",
      description: "Sleek, non-glare black finish with precision laser etching.",
      details: [
        "Material: Grade 304 Stainless Steel",
        "Thickness: 0.5mm / 0.8mm Credit Card Standard",
        "Finish: Anti-fingerprint non-glare matte coating",
        "Etching: High-contrast silver laser engraving & contactless NFC"
      ],
      image: "images/studio-card-matte-black.jpg",
      tag: "Executive Favorite"
    },
    {
      id: "brushed-silver",
      name: "Brushed Stainless Steel Card",
      badge: "Classic Steel",
      finish: "Silver Brushed Metallic Texture",
      description: "Classic silver metallic texture with high durability.",
      details: [
        "Material: Pure 304 Stainless Steel",
        "Thickness: 0.3mm to 0.8mm options",
        "Finish: Directional horizontal brush texture with mirror bevel",
        "Etching: Deep laser engraving & precision geometric cut-outs"
      ],
      image: "images/studio-card-brushed-silver.jpg",
      tag: "Timeless Classic"
    },
    {
      id: "brushed-brass-gold",
      name: "Brushed Brass Gold Card",
      badge: "24K Luster",
      finish: "Luxurious Gold Finish",
      description: "Luxurious gold finish for executive and VIP branding.",
      details: [
        "Material: Solid Brass / Gold Plated Stainless Steel",
        "Thickness: 0.5mm / 0.8mm heavy prestige weight",
        "Finish: Warm brushed satin 24K gold luster",
        "Etching: Mirror polish engraving & precision spiral cut-outs"
      ],
      image: "images/studio-card-brass-gold.jpg",
      tag: "VIP & Luxury"
    },
    {
      id: "rose-gold-copper",
      name: "Rose Gold / Copper Card",
      badge: "Warm Metallic",
      finish: "Warm Distinctive Metallic Tone",
      description: "Warm, distinctive metallic tone that stands out immediately.",
      details: [
        "Material: Premium Copper Alloy / Rose Gold Finish",
        "Thickness: 0.5mm / 0.8mm options",
        "Finish: Warm brushed rose hue with anti-tarnish protective coat",
        "Etching: Intricate laser detailing & VIP member numbering"
      ],
      image: "images/studio-card-rose-gold.jpg",
      tag: "Distinguished Tone"
    },
    {
      id: "cutout-nfc",
      name: "Custom Cut-Out & NFC Metal Card",
      badge: "Smart NFC + Die-Cut",
      finish: "Die-Cut Stencil & Tap-to-Share",
      description: "Intricate die-cut designs with optional tap-to-share NFC technology.",
      details: [
        "Technology: Embedded High-Speed Contactless NFC Microchip",
        "Die-Cut: Laser cut-through stencil patterns & silhouettes",
        "Compatibility: Instant tap with all modern iPhones & Androids",
        "Digital Profile: Link to your website, vCard, social links, or catalog"
      ],
      image: "images/studio-card-cutout-nfc.jpg",
      tag: "Next-Gen Smart Metal"
    }
  ],

  // Assistant Chatbot Knowledge Base
  assistantQA: [
    {
      keywords: ["material", "materials", "finish", "finishes", "steel", "gold", "black", "copper", "brass"],
      title: "Card Materials & Finishes",
      answer: "We offer 5 bespoke luxury metal finishes: Matte Black Stainless Steel (non-glare laser etched), Brushed Stainless Steel (304 grade classic silver), 24K Brushed Brass Gold (executive VIP luster), Warm Rose Gold / Copper, and Custom Cut-Out & Smart NFC Metal Cards. Thicknesses range from 0.3mm to 0.8mm standard credit card thickness."
    },
    {
      keywords: ["moq", "minimum", "quantity", "quantities", "small order", "how many"],
      title: "Minimum Order Quantities",
      answer: "Our standard minimum order quantity starts at just 50 cards for custom metal finishes. For custom VIP membership batches, corporate suites, or executive card orders, we offer tiered volume pricing. You can also order sample prototypes prior to bulk runs."
    },
    {
      keywords: ["design", "artwork", "format", "file", "vector", "ai", "pdf", "logo", "proof"],
      title: "Design & Artwork File Formats",
      answer: "We accept vector files including Adobe Illustrator (.AI), Vector .EPS, and print-ready vector .PDF. High-resolution .PNG files (300 DPI+) are also accepted for initial review. Don't have a vector file? Simply send us what you have on WhatsApp and our in-house designers will prepare a complimentary digital proof before production!"
    },
    {
      keywords: ["time", "timing", "shipping", "production", "turnaround", "delivery", "fast", "express", "international"],
      title: "Production & Shipping Times",
      answer: "Standard precision production takes approximately 7–10 business days after digital proof sign-off. We ship globally via DHL Express & FedEx Priority with full door-to-door tracking."
    }
  ]
};

// Global helper to build WhatsApp URL with pre-filled text
function buildWhatsAppUrl(messageText) {
  const cleanNumber = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;
}

// Global helper for Card specific WhatsApp Order link
function getCardWhatsAppUrl(cardName) {
  const message = SITE_CONFIG.whatsappTemplates.orderCard(cardName);
  return buildWhatsAppUrl(message);
}
