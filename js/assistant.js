/**
 * =====================================================================
 * FINE TOUCH METAL CARD - INTERACTIVE CARD ASSISTANT WIDGET
 * =====================================================================
 * Provides interactive instant answers, quick-reply chips, and a
 * one-click transfer to WhatsApp for customized order inquiries.
 */

document.addEventListener("DOMContentLoaded", () => {
  const launchBtn = document.getElementById("assistant-launch-btn");
  const popover = document.getElementById("assistant-popover");
  const closeBtn = document.getElementById("assistant-close-btn");
  const messagesBody = document.getElementById("assistant-messages-body");
  const quickRepliesContainer = document.getElementById("assistant-quick-replies");
  const userInput = document.getElementById("assistant-user-input");
  const sendBtn = document.getElementById("assistant-send-btn");
  const transferWaChip = document.getElementById("assistant-transfer-wa-chip");

  if (!launchBtn || !popover) return;

  // Toggle Assistant Popover
  function openAssistant() {
    popover.classList.add("open");
    launchBtn.setAttribute("aria-expanded", "true");
    setTimeout(() => {
      userInput.focus();
    }, 300);
  }

  function closeAssistant() {
    popover.classList.remove("open");
    launchBtn.setAttribute("aria-expanded", "false");
  }

  launchBtn.addEventListener("click", () => {
    if (popover.classList.contains("open")) {
      closeAssistant();
    } else {
      openAssistant();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeAssistant);
  }

  // Scroll to bottom of message list
  function scrollToBottom() {
    messagesBody.scrollTop = messagesBody.scrollHeight;
  }

  // Add Message Bubble
  function addMessage(text, sender = "bot", isHTML = false) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    if (isHTML) {
      bubble.innerHTML = text;
    } else {
      bubble.textContent = text;
    }
    messagesBody.appendChild(bubble);
    scrollToBottom();
    return bubble;
  }

  // Send WhatsApp Transfer Card inside Chat
  function addWhatsAppTransferCard(topic = "an order") {
    const transferCard = document.createElement("div");
    transferCard.className = "chat-bubble transfer-card";
    const waUrl = buildWhatsAppUrl(SITE_CONFIG.whatsappTemplates.assistantTransferCTA(topic));

    transferCard.innerHTML = `
      <p><strong>Transfer to Live WhatsApp Specialist:</strong></p>
      <p style="margin-bottom: 12px; color: #4b5563;">Connect directly with our master metal craftsman on WhatsApp with pre-filled details for priority response.</p>
      <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="width: 100%; display: flex; justify-content: center; gap: 8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.4 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.12.82.83-3.04-.19-.3a8.197 8.197 0 0 1-1.25-4.46c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.3z"/>
        </svg>
        <span>Open WhatsApp Chat Now</span>
      </a>
    `;
    messagesBody.appendChild(transferCard);
    scrollToBottom();
  }

  // Answer Questions by Category/Topic
  const topicResponses = {
    materials: {
      title: "Card Materials & Finishes",
      text: "We offer <strong>5 bespoke luxury finishes</strong>:<br><br>1. <strong>Matte Black Stainless Steel</strong> – Non-glare obsidian black with laser engraving.<br>2. <strong>Brushed Stainless Steel</strong> – Classic silver horizontal brush grain with mirror chamfer.<br>3. <strong>Brushed Brass Gold</strong> – 24K satin gold luster for executive and VIP prestige.<br>4. <strong>Rose Gold / Copper</strong> – Warm, distinctive metallic tone.<br>5. <strong>Custom Cut-Out &amp; NFC</strong> – Die-cut stencil art + smart contactless tap-to-share.<br><br>Standard thickness is 0.5mm to 0.8mm."
    },
    moq: {
      title: "Minimum Order Quantities",
      text: "Our minimum order quantity starts at just <strong>50 cards</strong>. We also offer tailored volume packages for 100, 250, 500, and 1,000+ cards with tiered corporate savings. Sample prototype proofs can also be prepared prior to bulk production."
    },
    artwork: {
      title: "Design & Artwork File Formats",
      text: "We recommend vector files: <strong>Adobe Illustrator (.AI), Vector .EPS, or Vector .PDF</strong>. High-resolution .PNG files (300 DPI+) with transparent backgrounds are also accepted.<br><br>Don't have print-ready artwork? Send your logo on WhatsApp and our in-house design team will format a <strong>complimentary digital mockup</strong> for your approval!"
    },
    shipping: {
      title: "Production & Shipping Times",
      text: "Standard handcrafting and laser production takes approximately <strong>7–10 business days</strong> after you approve the digital proof.<br><br>We ship worldwide via <strong>DHL Express &amp; FedEx Priority</strong> (typically 3–5 days to North America, Europe, UAE, Asia, and Australia) with full door-to-door tracking."
    }
  };

  function respondToTopic(topicKey) {
    const data = topicResponses[topicKey];
    if (data) {
      addMessage(data.text, "bot", true);
      setTimeout(() => {
        addWhatsAppTransferCard(data.title);
      }, 350);
    }
  }

  // Quick Reply Click Handlers
  const quickChips = quickRepliesContainer.querySelectorAll(".quick-chip-btn");
  quickChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const topic = chip.getAttribute("data-topic");
      if (topic) {
        addMessage(chip.textContent.trim(), "user");
        setTimeout(() => {
          respondToTopic(topic);
        }, 300);
      }
    });
  });

  // Transfer Order to WhatsApp button inside chat
  if (transferWaChip) {
    transferWaChip.addEventListener("click", () => {
      addMessage("I'd like to transfer my order to WhatsApp.", "user");
      setTimeout(() => {
        addMessage("Transferring you directly to our live WhatsApp concierge desk now...", "bot");
        addWhatsAppTransferCard("Card Custom Order");
      }, 250);
    });
  }

  // Smart Keyword Search for Free Text Input
  function handleUserQuery(query) {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return;

    addMessage(query, "user");
    userInput.value = "";

    // Simulate natural thinking delay
    setTimeout(() => {
      let matchedQA = null;

      // Check configured Q&A
      for (const qa of SITE_CONFIG.assistantQA) {
        for (const kw of qa.keywords) {
          if (cleanQuery.includes(kw)) {
            matchedQA = qa;
            break;
          }
        }
        if (matchedQA) break;
      }

      if (matchedQA) {
        addMessage(`<strong>${matchedQA.title}:</strong><br><br>${matchedQA.answer}`, "bot", true);
        setTimeout(() => {
          addWhatsAppTransferCard(matchedQA.title);
        }, 350);
      } else if (cleanQuery.includes("order") || cleanQuery.includes("buy") || cleanQuery.includes("price") || cleanQuery.includes("cost") || cleanQuery.includes("quote")) {
        addMessage("We provide custom transparent quotes based on your chosen finish (Matte Black, Brushed Silver, Brass Gold, Rose Gold, or NFC Cutout) and order volume. Let's get you a tailored price quote right now on WhatsApp!", "bot");
        addWhatsAppTransferCard("Quote & Pricing");
      } else if (cleanQuery.includes("hello") || cleanQuery.includes("hi") || cleanQuery.includes("hey")) {
        addMessage("Greetings! Looking for custom metal business cards or VIP membership cards? Click any of the quick topics below or tell me which of our 5 finishes interests you!", "bot");
      } else {
        // Helpful fallback
        addMessage("Thank you for your question! To give you exact specifications and a tailored quote for your card project, our team would love to speak with you directly on WhatsApp.", "bot");
        addWhatsAppTransferCard("Custom Inquiry: " + cleanQuery.slice(0, 30));
      }
    }, 400);
  }

  sendBtn.addEventListener("click", () => {
    handleUserQuery(userInput.value);
  });

  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUserQuery(userInput.value);
    }
  });
});
