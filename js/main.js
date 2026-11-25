/**
 * =====================================================================
 * FINE TOUCH METAL CARD - MAIN APPLICATION SCRIPT
 * =====================================================================
 * Handles:
 * 1. Dynamic WhatsApp URL injection from central SITE_CONFIG
 * 2. Locked Split Hero Card Showcase (No Slideshow, Interactive Switcher)
 * 3. VIP Sign Up / Sign In Modal with LocalStorage Persistence
 * 4. Contact Form Validation with Custom Toast Confirmation
 * 5. Mobile Navigation Drawer & Smooth Scrolling
 * 6. Sticky Header Scroll Shadow
 */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================================
     1. DYNAMIC WHATSAPP LINKS & SITE_CONFIG INJECTION
     =================================================================== */
  function initializeWhatsAppLinks() {
    // 1. Header Order on WhatsApp Button
    const headerWaBtn = document.getElementById("header-whatsapp-btn");
    if (headerWaBtn) {
      headerWaBtn.href = buildWhatsAppUrl(SITE_CONFIG.whatsappTemplates.headerCTA);
    }

    // 2. Mobile Drawer WhatsApp Button
    const mobileDrawerWaBtn = document.getElementById("mobile-drawer-whatsapp-btn");
    if (mobileDrawerWaBtn) {
      mobileDrawerWaBtn.href = buildWhatsAppUrl(SITE_CONFIG.whatsappTemplates.headerCTA);
    }

    // 3. Hero Primary WhatsApp CTA (default to 24K Brushed Brass Gold Card)
    const heroPrimaryWaBtn = document.getElementById("hero-primary-whatsapp-btn");
    if (heroPrimaryWaBtn) {
      heroPrimaryWaBtn.href = getCardWhatsAppUrl("Brushed Brass Gold Card");
    }

    // 4. Product Showcase (Strictly 5 Cards Only)
    // Rule: https://wa.me/YOUR_PHONE_NUMBER?text=Hi%20Fine%20Touch%20Metal%20Card,%20I%20am%20interested%20in%20ordering%20the%20[Card%20Name].
    const cardOrderBtns = document.querySelectorAll(".card-order-btn");
    cardOrderBtns.forEach(btn => {
      const cardName = btn.getAttribute("data-card-name");
      if (cardName) {
        btn.href = getCardWhatsAppUrl(cardName);
      }
    });

    // 5. Promo Banner WhatsApp Button
    const promoWaBtn = document.getElementById("promo-whatsapp-btn");
    if (promoWaBtn) {
      promoWaBtn.href = buildWhatsAppUrl(SITE_CONFIG.whatsappTemplates.promoCTA);
    }

    // 6. Contact Us Left Column WhatsApp Button
    const contactDirectWaBtn = document.getElementById("contact-direct-whatsapp-btn");
    if (contactDirectWaBtn) {
      contactDirectWaBtn.href = buildWhatsAppUrl(SITE_CONFIG.whatsappTemplates.contactChatCTA);
    }

    // 7. Footer WhatsApp CTA
    const footerWaCtas = document.querySelectorAll(".footer-whatsapp-cta");
    footerWaCtas.forEach(btn => {
      btn.href = buildWhatsAppUrl(SITE_CONFIG.whatsappTemplates.headerCTA);
    });

    // 8. Contact Details Display Values
    const phoneDisplays = ["topbar-phone-val", "contact-phone-val", "footer-phone-val"];
    phoneDisplays.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = SITE_CONFIG.whatsappDisplayNumber;
    });

    const emailDisplays = ["topbar-email-val", "contact-email-link"];
    emailDisplays.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (el.tagName.toLowerCase() === "a") {
          el.href = `mailto:${SITE_CONFIG.email}`;
          el.textContent = SITE_CONFIG.email;
        } else {
          el.textContent = SITE_CONFIG.email;
        }
      }
    });

    const hoursEl = document.getElementById("contact-hours-val");
    if (hoursEl) hoursEl.textContent = SITE_CONFIG.businessHours;
  }

  initializeWhatsAppLinks();

  /* ===================================================================
     2. LOCKED SPLIT HERO - INTERACTIVE FINISH SELECTOR (NO SLIDESHOW)
     One side locked content, other side interactive professional card
     =================================================================== */
  const cardDisplayImg = document.getElementById("hero-card-display-img");
  const cardDisplayTitle = document.getElementById("hero-card-display-title");
  const cardDisplaySub = document.getElementById("hero-card-display-sub");
  const activeNameLabel = document.getElementById("hero-selector-active-name");
  const finishPills = document.querySelectorAll(".hero-finish-pill-btn");
  const heroPrimaryWaBtn = document.getElementById("hero-primary-whatsapp-btn");
  const heroCardFrame = document.getElementById("hero-card-frame");

  if (finishPills.length > 0 && cardDisplayImg) {
    finishPills.forEach(pill => {
      pill.addEventListener("click", () => {
        // Toggle active class
        finishPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");

        const newImg = pill.getAttribute("data-img");
        const newTitle = pill.getAttribute("data-title");
        const newSub = pill.getAttribute("data-sub");
        const newName = pill.getAttribute("data-name");

        // Subtle metallic transition flash
        cardDisplayImg.style.opacity = "0.2";
        cardDisplayImg.style.transform = "scale(0.98)";

        setTimeout(() => {
          cardDisplayImg.src = newImg;
          if (cardDisplayTitle) cardDisplayTitle.textContent = newTitle;
          if (cardDisplaySub) cardDisplaySub.textContent = newSub;
          if (activeNameLabel) activeNameLabel.textContent = newName;

          // Update WhatsApp CTA button to pre-fill the selected card finish!
          if (heroPrimaryWaBtn && newTitle) {
            heroPrimaryWaBtn.href = getCardWhatsAppUrl(newTitle);
          }

          cardDisplayImg.style.opacity = "1";
          cardDisplayImg.style.transform = "scale(1)";
        }, 180);
      });
    });

    // 3D subtle mouse movement on the hero card stage
    if (heroCardFrame) {
      heroCardFrame.addEventListener("mousemove", (e) => {
        const rect = heroCardFrame.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / rect.height) * 12;
        const rotateY = (x / rect.width) * 12;
        heroCardFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      heroCardFrame.addEventListener("mouseleave", () => {
        heroCardFrame.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    }
  }

  /* ===================================================================
     3. VIP SIGN UP / SIGN IN MODAL & STATE MANAGEMENT
     =================================================================== */
  const authModal = document.getElementById("auth-modal");
  const authCloseBtn = document.getElementById("auth-close-btn");
  const tabSignupBtn = document.getElementById("tab-signup-btn");
  const tabSigninBtn = document.getElementById("tab-signin-btn");
  const paneSignup = document.getElementById("pane-signup");
  const paneSignin = document.getElementById("pane-signin");
  const linkToSignin = document.getElementById("link-to-signin");
  const linkToSignup = document.getElementById("link-to-signup");
  const signupForm = document.getElementById("auth-signup-form");
  const signinForm = document.getElementById("auth-signin-form");
  const headerAuthContainer = document.getElementById("header-auth-container");

  function openAuthModal(defaultTab = "signup") {
    if (!authModal) return;
    if (defaultTab === "signup") {
      switchAuthTab("signup");
    } else {
      switchAuthTab("signin");
    }
    authModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeAuthModal() {
    if (!authModal) return;
    authModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function switchAuthTab(tab) {
    if (tab === "signup") {
      tabSignupBtn.classList.add("active");
      tabSigninBtn.classList.remove("active");
      paneSignup.classList.add("active");
      paneSignin.classList.remove("active");
    } else {
      tabSigninBtn.classList.add("active");
      tabSignupBtn.classList.remove("active");
      paneSignin.classList.add("active");
      paneSignup.classList.remove("active");
    }
  }

  // Bind auth trigger buttons
  const headerAuthBtn = document.getElementById("header-auth-btn");
  if (headerAuthBtn) {
    headerAuthBtn.addEventListener("click", () => openAuthModal("signup"));
  }

  const mobileAuthBtn = document.getElementById("mobile-auth-btn");
  if (mobileAuthBtn) {
    mobileAuthBtn.addEventListener("click", () => {
      closeMobileNav();
      openAuthModal("signup");
    });
  }

  if (authCloseBtn) authCloseBtn.addEventListener("click", closeAuthModal);
  if (tabSignupBtn) tabSignupBtn.addEventListener("click", () => switchAuthTab("signup"));
  if (tabSigninBtn) tabSigninBtn.addEventListener("click", () => switchAuthTab("signin"));
  if (linkToSignin) linkToSignin.addEventListener("click", () => switchAuthTab("signin"));
  if (linkToSignup) linkToSignup.addEventListener("click", () => switchAuthTab("signup"));

  // Close on backdrop click
  if (authModal) {
    authModal.addEventListener("click", (e) => {
      if (e.target === authModal) closeAuthModal();
    });
  }

  // Render Logged-in State in Header
  function renderAuthState() {
    const savedUserJson = localStorage.getItem("fine_touch_vip_user");
    if (!headerAuthContainer) return;

    if (savedUserJson) {
      try {
        const user = JSON.parse(savedUserJson);
        const firstName = user.name ? user.name.split(" ")[0] : "VIP";
        const initial = firstName.charAt(0).toUpperCase();

        headerAuthContainer.innerHTML = `
          <div class="user-logged-badge" id="user-badge" title="Fine Touch VIP Member: ${user.email}">
            <div class="user-badge-avatar">${initial}</div>
            <span class="user-badge-name">VIP: ${firstName}</span>
            <button class="btn-badge-logout" id="logout-btn" title="Sign Out of VIP Club">&times;</button>
          </div>
        `;

        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            localStorage.removeItem("fine_touch_vip_user");
            renderAuthState();
            showToast("Signed Out", "You have signed out of your Fine Touch VIP account.");
          });
        }
      } catch (err) {
        localStorage.removeItem("fine_touch_vip_user");
      }
    } else {
      headerAuthContainer.innerHTML = `
        <button class="btn-auth-trigger" id="header-auth-btn" aria-label="VIP Sign Up or Sign In">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>VIP Sign Up</span>
        </button>
      `;
      const newHeaderAuthBtn = document.getElementById("header-auth-btn");
      if (newHeaderAuthBtn) {
        newHeaderAuthBtn.addEventListener("click", () => openAuthModal("signup"));
      }
    }
  }

  // Handle Sign Up Form Submit
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const phone = document.getElementById("signup-phone").value.trim();
      const finish = document.getElementById("signup-card-pref").value;

      if (!name || !email || !phone) {
        showToast("Missing Information", "Please fill in all required fields to register.");
        return;
      }

      const userData = {
        name,
        email,
        phone,
        preferredFinish: finish,
        joinedDate: new Date().toISOString()
      };

      localStorage.setItem("fine_touch_vip_user", JSON.stringify(userData));
      closeAuthModal();
      renderAuthState();
      showToast(
        "VIP Account Activated! 🎉",
        `Welcome ${name}! Your Fine Touch VIP membership is now active.`
      );
      signupForm.reset();
    });
  }

  // Handle Sign In Form Submit
  if (signinForm) {
    signinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("signin-email").value.trim();
      if (!email) return;

      const userData = {
        name: email.split("@")[0],
        email: email,
        joinedDate: new Date().toISOString()
      };

      localStorage.setItem("fine_touch_vip_user", JSON.stringify(userData));
      closeAuthModal();
      renderAuthState();
      showToast(
        "Welcome Back!",
        `Signed in successfully as ${email}.`
      );
      signinForm.reset();
    });
  }

  // Initialize auth state
  renderAuthState();

  /* ===================================================================
     4. CONTACT FORM VALIDATION & CONFIRMATION TOAST NOTIFICATION
     =================================================================== */
  const contactForm = document.getElementById("contact-inquiry-form");
  const toast = document.getElementById("toast-notification");
  let toastTimer = null;

  function showToast(title, desc) {
    if (!toast) return;
    const titleEl = document.getElementById("toast-title");
    const descEl = document.getElementById("toast-desc");
    if (titleEl && title) titleEl.textContent = title;
    if (descEl && desc) descEl.textContent = desc;

    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const firstName = contactForm.firstName.value.trim();
      const lastName = contactForm.lastName.value.trim();
      const email = contactForm.email.value.trim();
      const cardType = contactForm.cardType.value;
      const message = contactForm.message.value.trim();

      // Simple validation
      if (!firstName || !lastName || !email || !cardType || !message) {
        showToast("Please Fill in All Fields", "All fields including card type and message are required.");
        return;
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast("Invalid Email", "Please enter a valid email address.");
        return;
      }

      // Form success feedback
      showToast(
        "Inquiry Sent Successfully!",
        `Thank you ${firstName}! We received your inquiry for the ${cardType}. Preparing digital proof...`
      );

      // Offer immediate WhatsApp continuation option
      setTimeout(() => {
        const confirmWa = confirm(
          `Thank you ${firstName}! Your inquiry for the ${cardType} has been recorded.\n\nWould you like to open WhatsApp now to send your design/logo directly to our card specialist?`
        );
        if (confirmWa) {
          const directMessage = `Hi Fine Touch Metal Card, my name is ${firstName} ${lastName} (${email}). I just submitted an inquiry for the ${cardType}. Details: ${message}`;
          window.open(buildWhatsAppUrl(directMessage), "_blank");
        }
      }, 700);

      contactForm.reset();
    });
  }

  /* ===================================================================
     5. MOBILE NAVIGATION DRAWER
     =================================================================== */
  const mobileToggle = document.getElementById("mobile-nav-toggle");
  const mobileDrawer = document.getElementById("mobile-nav-drawer");
  const mobileBackdrop = document.getElementById("mobile-nav-backdrop");
  const mobileClose = document.getElementById("mobile-nav-close");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function openMobileNav() {
    if (mobileDrawer) mobileDrawer.classList.add("active");
    if (mobileBackdrop) mobileBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileNav() {
    if (mobileDrawer) mobileDrawer.classList.remove("active");
    if (mobileBackdrop) mobileBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (mobileToggle) mobileToggle.addEventListener("click", openMobileNav);
  if (mobileClose) mobileClose.addEventListener("click", closeMobileNav);
  if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeMobileNav);

  mobileLinks.forEach(link => {
    link.addEventListener("click", closeMobileNav);
  });

  /* ===================================================================
     6. STICKY HEADER SCROLL SHADOW
     =================================================================== */
  const header = document.getElementById("site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });

});
