(function() {
  // ---------- WEB3FORMS CONFIGURATION ----------
  // Replace with your Web3Forms Access Key from https://web3forms.com
  const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";

  // ---------- PLAN DATA ----------
  const plans = [
    {
      id: 'basic',
      title: 'Basic NGO Website',
      price: 180000,
      timeline: '⏱️ Delivery: 3 Days',
      description: 'Perfect for newly established NGOs seeking a professional online presence.',
      features: [
        'Responsive Website Design',
        'Up to 5 Pages',
        'Home, About, Programs, Gallery & Contact',
        'Secure Contact Form',
        'Social Media Integration',
        'Google Maps Integration',
        'Basic SEO Optimization',
        'WhatsApp Chat Button',
        'Basic Security Setup',
        'Deployment Assistance',
        '2 Weeks Free Post-Launch Support'
      ],
      icon: 'fa-seedling',
      featured: false
    },
    {
      id: 'standard',
      title: 'Standard NGO Website',
      price: 350000,
      timeline: '⏱️ Delivery: 1 Week',
      description: 'Designed for NGOs looking to increase donations, volunteers, and community engagement.',
      features: [
        'Everything in Basic Package',
        'Up to 10 Pages',
        'News / Blog / Stories Section',
        'Custom Online Donation Form',
        'Payment Gateway Integration (Paystack/Stripe)',
        'Volunteer Registration System',
        'Content Management System (CMS)',
        '1 Month Post-Launch Support',
        'Standard SEO & Google Analytics Integration',
        'Newsletter Subscription Form'
      ],
      icon: 'fa-hand-holding-heart',
      featured: true
    },
    {
      id: 'premium',
      title: 'Premium NGO Portal',
      price: 650000,
      timeline: '⏱️ Delivery: 2 Weeks',
      description: 'Full-featured enterprise suite for established nonprofits needing advanced integrations.',
      features: [
        'Everything in Standard Package',
        'Unlimited Pages Creation',
        'Custom Portal (Event Ticketing / Booking)',
        'Member Registration & Logins',
        'Newsletter & Email Campaign Setup',
        'Multilingual Support (English/French/etc.)',
        'Advanced SEO, Speed Optimization',
        '3 Months Premium Support',
        'Custom Database Integrations',
        'Admin & Editor Video Training'
      ],
      icon: 'fa-crown',
      featured: false
    }
  ];

  // ---------- STATE ----------
  let activePlan = null;
  let activeFormStep = 1;
  let payAmount = 0;
  let originalPrice = 0;
  let balanceAmount = 0;
  let payPercent = 45;

  // ---------- DOM ELEMENTS ----------
  const pricingGrid = document.getElementById('pricingGrid');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalLearnMore = document.getElementById('modalLearnMore');
  const modalProceed = document.getElementById('modalProceed');
  const modalClose = document.getElementById('modalClose');

  // Pages
  const heroHeader = document.getElementById('heroHeader');
  const pricingSection = document.getElementById('pricingSection');
  const planDetailPage = document.getElementById('planDetailPage');
  const planDetailContent = document.getElementById('planDetailContent');
  const formPage = document.getElementById('formPage');
  const receiptContainer = document.getElementById('receiptContainer');

  // Back buttons
  const backToPricingBtn = document.getElementById('backToPricingBtn');
  const backFromFormBtn = document.getElementById('backFromFormBtn');

  // Form Elements
  const selectedPlanInfo = document.getElementById('selectedPlanInfo');
  const partialAmount = document.getElementById('partialAmount');
  const payPartial = document.getElementById('payPartial');
  const discoveryForm = document.getElementById('discoveryForm');
  const prevStepBtn = document.getElementById('prevStepBtn');
  const nextStepBtn = document.getElementById('nextStepBtn');

  // Form wizard step panels and indicators
  const panels = [
    document.getElementById('formPanel1'),
    document.getElementById('formPanel2'),
    document.getElementById('formPanel3'),
    document.getElementById('formPanel4')
  ];
  const indicators = [
    document.getElementById('stepIndicator1'),
    document.getElementById('stepIndicator2'),
    document.getElementById('stepIndicator3'),
    document.getElementById('stepIndicator4')
  ];
  const progressBar = document.getElementById('wizardProgressBar');

  // Checkout simulator elements
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
  const checkoutSummaryItem = document.getElementById('checkoutSummaryItem');
  const checkoutSummaryAmount = document.getElementById('checkoutSummaryAmount');
  const tabCardBtn = document.getElementById('tabCardBtn');
  const tabBankBtn = document.getElementById('tabBankBtn');
  const paneCard = document.getElementById('paneCard');
  const paneBank = document.getElementById('paneBank');
  const checkoutFormContent = document.getElementById('checkoutFormContent');
  const checkoutSpinnerView = document.getElementById('checkoutSpinnerView');
  const checkoutSpinnerText = document.getElementById('checkoutSpinnerText');
  const checkoutOtpView = document.getElementById('checkoutOtpView');
  const checkoutSuccessView = document.getElementById('checkoutSuccessView');
  const paystackPayBtn = document.getElementById('paystackPayBtn');
  const bankPaidBtn = document.getElementById('bankPaidBtn');
  const viewInvoiceBtn = document.getElementById('viewInvoiceBtn');

  // Card input formatting & fields
  const cardNumber = document.getElementById('cardNumber');
  const cardExpiry = document.getElementById('cardExpiry');
  const cardCVV = document.getElementById('cardCVV');
  const cardPin = document.getElementById('cardPin');
  const mockCardForm = document.getElementById('mockCardPaymentForm');

  // OTP digits auto-focus chain
  const otpInputs = [
    document.getElementById('otpDigit1'),
    document.getElementById('otpDigit2'),
    document.getElementById('otpDigit3'),
    document.getElementById('otpDigit4'),
    document.getElementById('otpDigit5'),
    document.getElementById('otpDigit6')
  ];
  const checkoutOtpForm = document.getElementById('checkoutOtpForm');

  // Invoice elements
  const receiptIdText = document.getElementById('receiptIdText');
  const receiptDateText = document.getElementById('receiptDateText');
  const receiptClientName = document.getElementById('receiptClientName');
  const receiptClientNGO = document.getElementById('receiptClientNGO');
  const receiptClientContact = document.getElementById('receiptClientContact');
  const receiptPlanTitle = document.getElementById('receiptPlanTitle');
  const receiptProjectTimeline = document.getElementById('receiptProjectTimeline');
  const receiptItemTitle = document.getElementById('receiptItemTitle');
  const receiptFullPriceText = document.getElementById('receiptFullPriceText');
  const receiptPaidText = document.getElementById('receiptPaidText');
  const receiptBalanceText = document.getElementById('receiptBalanceText');
  const receiptPrintBtn = document.getElementById('receiptPrintBtn');
  const receiptStartOverBtn = document.getElementById('receiptStartOverBtn');

  // ---------- INITIALIZATION ----------
  function init() {
    renderPlans();
    bindEvents();
  }

  // Render plans dynamically with strict security (No innerHTML)
  function renderPlans() {
    pricingGrid.replaceChildren(); // Safe clear

    plans.forEach((plan) => {
      const card = document.createElement('div');
      card.className = plan.featured ? 'pricing-card featured' : 'pricing-card';

      if (plan.featured) {
        const badge = document.createElement('span');
        badge.className = 'badge';
        const starIcon = document.createElement('i');
        starIcon.className = 'fas fa-star';
        badge.appendChild(starIcon);
        const textSpan = document.createElement('span');
        textSpan.textContent = ' Most Popular';
        badge.appendChild(textSpan);
        card.appendChild(badge);
      }

      const iconCircle = document.createElement('div');
      iconCircle.className = 'icon-circle';
      const icon = document.createElement('i');
      icon.className = `fas ${plan.icon}`;
      iconCircle.appendChild(icon);
      card.appendChild(iconCircle);

      const title = document.createElement('h3');
      title.className = 'package-title';
      title.textContent = plan.title;
      card.appendChild(title);

      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = `₦${plan.price.toLocaleString()}`;
      card.appendChild(price);

      const timeline = document.createElement('div');
      timeline.className = 'timeline';
      timeline.textContent = plan.timeline;
      card.appendChild(timeline);

      const desc = document.createElement('p');
      desc.className = 'description';
      desc.textContent = plan.description;
      card.appendChild(desc);

      const list = document.createElement('ul');
      list.className = 'features-list';
      plan.features.forEach((feat) => {
        const li = document.createElement('li');
        const check = document.createElement('i');
        check.className = 'fas fa-check';
        li.appendChild(check);
        const spanText = document.createElement('span');
        spanText.textContent = feat;
        li.appendChild(spanText);
        list.appendChild(li);
      });
      card.appendChild(list);

      const cta = document.createElement('button');
      cta.className = 'cta-button';
      cta.textContent = 'Get Started ';
      const arrowIcon = document.createElement('i');
      arrowIcon.className = 'fas fa-arrow-right';
      cta.appendChild(arrowIcon);
      card.appendChild(cta);

      cta.addEventListener('click', (e) => {
        e.stopPropagation();
        selectPlan(plan);
      });

      card.addEventListener('click', () => {
        selectPlan(plan);
      });

      pricingGrid.appendChild(card);
    });
  }

  function selectPlan(plan) {
    activePlan = plan;
    modalTitle.textContent = `Interested in the ${plan.title}?`;
    modalOverlay.style.display = 'flex';
  }

  // ---------- BIND EVENTS ----------
  function bindEvents() {
    modalClose.addEventListener('click', () => {
      modalOverlay.style.display = 'none';
    });

    // Close modal on background click
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
      }
    });

    modalLearnMore.addEventListener('click', () => {
      modalOverlay.style.display = 'none';
      showPlanDetails(activePlan);
    });

    modalProceed.addEventListener('click', () => {
      modalOverlay.style.display = 'none';
      showForm(activePlan);
    });

    backToPricingBtn.addEventListener('click', () => {
      planDetailPage.style.display = 'none';
      pricingSection.style.display = 'block';
      heroHeader.style.display = 'block';
      window.scrollTo(0, 0);
    });

    backFromFormBtn.addEventListener('click', () => {
      formPage.style.display = 'none';
      pricingSection.style.display = 'block';
      heroHeader.style.display = 'block';
      window.scrollTo(0, 0);
    });

    // Form wizard navigation
    prevStepBtn.addEventListener('click', () => {
      if (activeFormStep > 1) {
        activeFormStep--;
        updateWizardStep();
      }
    });

    nextStepBtn.addEventListener('click', () => {
      if (validateStep(activeFormStep)) {
        if (activeFormStep < 4) {
          activeFormStep++;
          updateWizardStep();
        } else {
          // Submit form (triggered on last step)
          triggerCheckout();
        }
      }
    });

    payPartial.addEventListener('change', () => {
      updateFormPrice();
    });

    // Checkout interactions
    closeCheckoutBtn.addEventListener('click', () => {
      checkoutOverlay.style.display = 'none';
    });

    tabCardBtn.addEventListener('click', () => {
      tabCardBtn.classList.add('active');
      tabBankBtn.classList.remove('active');
      paneCard.classList.add('active');
      paneBank.classList.remove('active');
    });

    tabBankBtn.addEventListener('click', () => {
      tabBankBtn.classList.add('active');
      tabCardBtn.classList.remove('active');
      paneBank.classList.add('active');
      paneCard.classList.remove('active');
    });

    // Format card input fields
    cardNumber.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      let matches = val.match(/\d{4,16}/g);
      let match = (matches && matches[0]) || '';
      let parts = [];

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }

      if (parts.length > 0) {
        e.target.value = parts.join(' ');
      } else {
        e.target.value = val;
      }
    });

    cardExpiry.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length >= 2) {
        e.target.value = val.substring(0, 2) + '/' + val.substring(2, 4);
      } else {
        e.target.value = val;
      }
    });

    cardCVV.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });

    cardPin.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });

    // OTP inputs auto-focus chain
    otpInputs.forEach((input, index) => {
      input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
          otpInputs[index - 1].focus();
        }
      });
    });

    // Mock payment handlers
    mockCardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      startCardAuthorization();
    });

    bankPaidBtn.addEventListener('click', () => {
      startBankValidation();
    });

    checkoutOtpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      validateOtp();
    });

    viewInvoiceBtn.addEventListener('click', () => {
      checkoutOverlay.style.display = 'none';
      showDigitalReceipt();
    });

    receiptPrintBtn.addEventListener('click', () => {
      window.print();
    });

    receiptStartOverBtn.addEventListener('click', () => {
      receiptContainer.style.display = 'none';
      pricingSection.style.display = 'block';
      heroHeader.style.display = 'block';
      discoveryForm.reset();
      activeFormStep = 1;
      updateWizardStep();
      window.scrollTo(0, 0);
    });
  }

  // ---------- VIEW LOGIC ----------

  // 1. Show Detailed Plan Page
  function showPlanDetails(plan) {
    heroHeader.style.display = 'none';
    pricingSection.style.display = 'none';
    planDetailPage.style.display = 'block';
    window.scrollTo(0, 0);

    planDetailContent.replaceChildren(); // Safe clear

    const headerDiv = document.createElement('div');
    headerDiv.className = 'detail-header';

    const titleDiv = document.createElement('div');
    const detailTitle = document.createElement('h2');
    detailTitle.textContent = plan.title;
    titleDiv.appendChild(detailTitle);
    const detailDescText = document.createElement('p');
    detailDescText.className = 'description';
    detailDescText.style.border = 'none';
    detailDescText.style.margin = '0';
    detailDescText.style.padding = '0';
    detailDescText.textContent = plan.description;
    titleDiv.appendChild(detailDescText);
    headerDiv.appendChild(titleDiv);

    const metaDiv = document.createElement('div');
    metaDiv.className = 'meta';
    const priceDiv = document.createElement('div');
    priceDiv.className = 'price';
    priceDiv.style.margin = '0';
    priceDiv.textContent = `₦${plan.price.toLocaleString()}`;
    metaDiv.appendChild(priceDiv);
    const timelineDiv = document.createElement('div');
    timelineDiv.className = 'timeline';
    timelineDiv.textContent = plan.timeline;
    metaDiv.appendChild(timelineDiv);
    headerDiv.appendChild(metaDiv);

    planDetailContent.appendChild(headerDiv);

    const gridDiv = document.createElement('div');
    gridDiv.className = 'detail-grid';

    // Grid Left - Deliverables
    const leftDiv = document.createElement('div');
    leftDiv.className = 'detail-left';

    const whyTitle = document.createElement('h4');
    whyTitle.textContent = 'Package Deliverables & Inclusions';
    leftDiv.appendChild(whyTitle);

    const pDesc = document.createElement('p');
    pDesc.className = 'why-choose';
    pDesc.textContent = 'This package contains professional agency-grade designs, optimized codebases, and custom plugins developed precisely to support nonprofit expansion. Below is the detailed list of deliverables:';
    leftDiv.appendChild(pDesc);

    const list = document.createElement('ul');
    list.className = 'features-list';
    plan.features.forEach((feat) => {
      const li = document.createElement('li');
      const icon = document.createElement('i');
      icon.className = 'fas fa-check';
      li.appendChild(icon);
      const tSpan = document.createElement('span');
      tSpan.textContent = feat;
      li.appendChild(tSpan);
      list.appendChild(li);
    });
    leftDiv.appendChild(list);
    gridDiv.appendChild(leftDiv);

    // Grid Right - Implementation Timeline
    const rightDiv = document.createElement('div');
    rightDiv.className = 'detail-right';

    const timelineTitle = document.createElement('h4');
    timelineTitle.textContent = 'Implementation Lifecycle';
    rightDiv.appendChild(timelineTitle);

    const tc = document.createElement('div');
    tc.className = 'timeline-container';

    const stages = [
      { title: 'Phase 1: Brand Alignment & Wireframing', desc: 'Onboarding call, requirement outline, user journey mappings.' },
      { title: 'Phase 2: UI/UX Styling & Development', desc: 'Creation of modern layouts, typography adjustments, content insertion.' },
      { title: 'Phase 3: Integrations & Database Hookups', desc: 'Setting up Paystack donation processing, volunteer triggers, and standard admin controls.' },
      { title: 'Phase 4: Optimization, Security Check & Launch', desc: 'Comprehensive SEO tagging, speed tests, and final deployment setup.' }
    ];

    stages.forEach((stage) => {
      const step = document.createElement('div');
      step.className = 'timeline-step';
      const dot = document.createElement('div');
      dot.className = 'timeline-dot';
      step.appendChild(dot);
      const tTitle = document.createElement('div');
      tTitle.className = 'timeline-title';
      tTitle.textContent = stage.title;
      step.appendChild(tTitle);
      const tDesc = document.createElement('div');
      tDesc.className = 'timeline-desc';
      tDesc.textContent = stage.desc;
      step.appendChild(tDesc);
      tc.appendChild(step);
    });

    rightDiv.appendChild(tc);
    gridDiv.appendChild(rightDiv);
    planDetailContent.appendChild(gridDiv);

    // Action CTA box at the bottom
    const actionCard = document.createElement('div');
    actionCard.className = 'detail-action-card';

    const acLeft = document.createElement('div');
    const acTitle = document.createElement('h3');
    acTitle.textContent = 'Ready to launch your website?';
    acLeft.appendChild(acTitle);
    const acDesc = document.createElement('p');
    acDesc.textContent = 'Start our interactive Discovery Form to provide the specifications for your project.';
    acLeft.appendChild(acDesc);
    actionCard.appendChild(acLeft);

    const acBtn = document.createElement('button');
    acBtn.className = 'btn-primary';
    acBtn.textContent = 'Configure & Proceed ';
    const arrow = document.createElement('i');
    arrow.className = 'fas fa-arrow-right';
    acBtn.appendChild(arrow);
    actionCard.appendChild(acBtn);

    acBtn.addEventListener('click', () => {
      planDetailPage.style.display = 'none';
      showForm(plan);
    });

    planDetailContent.appendChild(actionCard);
  }

  // 2. Show Discovery Form Page
  function showForm(plan) {
    heroHeader.style.display = 'none';
    pricingSection.style.display = 'none';
    planDetailPage.style.display = 'none';
    formPage.style.display = 'block';
    window.scrollTo(0, 0);

    selectedPlanInfo.textContent = `You have selected the ${plan.title}. Fill in your NGO details below. Complete the steps to initiate checkout.`;
    
    // Prefill default budget and timeline
    document.getElementById('q15').value = `₦${plan.price.toLocaleString()}`;
    document.getElementById('q16').value = plan.id === 'basic' ? '3 Days' : (plan.id === 'standard' ? '1 Week' : '2 Weeks');

    originalPrice = plan.price;
    updateFormPrice();

    activeFormStep = 1;
    updateWizardStep();
  }

  function updateFormPrice() {
    const checked = payPartial.checked;
    if (checked) {
      payPercent = 45;
      payAmount = originalPrice * 0.45;
      balanceAmount = originalPrice * 0.55;
      nextStepBtn.textContent = `Submit & Pay 45% Deposit (₦${payAmount.toLocaleString()}) ✨`;
    } else {
      payPercent = 100;
      payAmount = originalPrice;
      balanceAmount = 0;
      nextStepBtn.textContent = `Submit & Pay Full Amount (₦${payAmount.toLocaleString()}) ✨`;
    }
    partialAmount.textContent = (originalPrice * 0.45).toLocaleString();
  }

  // 3. Wizard Step Control
  function updateWizardStep() {
    // Update panel active states
    panels.forEach((panel, idx) => {
      if (idx + 1 === activeFormStep) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Update indicators
    indicators.forEach((indicator, idx) => {
      const stepNum = idx + 1;
      indicator.className = 'wizard-step';
      if (stepNum === activeFormStep) {
        indicator.classList.add('active');
      } else if (stepNum < activeFormStep) {
        indicator.classList.add('completed');
      }
    });

    // Update progress bar width
    const progressPercent = ((activeFormStep - 1) / (indicators.length - 1)) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Update navigation buttons visibility and text
    if (activeFormStep === 1) {
      prevStepBtn.style.visibility = 'hidden';
    } else {
      prevStepBtn.style.visibility = 'visible';
    }

    if (activeFormStep === 4) {
      updateFormPrice(); // Correct button text for last step
    } else {
      nextStepBtn.textContent = 'Next Step ';
      const arrow = document.createElement('i');
      arrow.className = 'fas fa-chevron-right';
      nextStepBtn.appendChild(arrow);
    }
  }

  function validateStep(step) {
    // Get all required inputs in the current step panel
    const currentPanel = panels[step - 1];
    const requiredInputs = currentPanel.querySelectorAll('[required]');
    let valid = true;

    requiredInputs.forEach((input) => {
      // If input is text/textarea/email/tel and empty, trigger validity message
      if ((input.type === 'text' || input.tagName === 'TEXTAREA' || input.type === 'email' || input.type === 'tel') && !input.value.trim()) {
        input.reportValidity();
        valid = false;
      }
      // If it's a radio group, check if one of the options with the same name is checked
      if (input.type === 'radio') {
        const name = input.name;
        const checkedRadio = currentPanel.querySelector(`input[name="${name}"]:checked`);
        if (!checkedRadio) {
          input.reportValidity();
          valid = false;
        }
      }
    });

    return valid;
  }

  // 4. Payment Gateway Checkout Simulator
  function triggerCheckout() {
    // Get payment checkout totals
    checkoutSummaryItem.textContent = activePlan.title + ` (${payPercent}% Deposit)`;
    checkoutSummaryAmount.textContent = `₦${payAmount.toLocaleString()}`;
    paystackPayBtn.textContent = `Pay ₦${payAmount.toLocaleString()}`;

    // Reset views in checkout dialog
    checkoutFormContent.style.display = 'block';
    checkoutSpinnerView.style.display = 'none';
    checkoutOtpView.style.display = 'none';
    checkoutSuccessView.style.display = 'none';

    // Reset input fields
    mockCardForm.reset();

    checkoutOverlay.style.display = 'flex';
  }

  // Simulator Loading/OTP sequence
  function startCardAuthorization() {
    checkoutFormContent.style.display = 'none';
    checkoutSpinnerView.style.display = 'block';
    checkoutSpinnerText.textContent = 'Authorizing card credentials...';

    setTimeout(() => {
      checkoutSpinnerView.style.display = 'none';
      checkoutOtpView.style.display = 'block';
      otpInputs[0].focus();
    }, 2200);
  }

  function startBankValidation() {
    checkoutFormContent.style.display = 'none';
    checkoutSpinnerView.style.display = 'block';
    checkoutSpinnerText.textContent = 'Listening for bank transfer notification...';

    setTimeout(() => {
      checkoutSpinnerView.style.display = 'none';
      checkoutSuccessView.style.display = 'block';
      sendWeb3FormsSubmission();
    }, 3000);
  }

  function validateOtp() {
    let otpCode = '';
    otpInputs.forEach((input) => {
      otpCode += input.value;
    });

    checkoutOtpView.style.display = 'none';
    checkoutSpinnerView.style.display = 'block';
    checkoutSpinnerText.textContent = 'Validating verification code...';

    setTimeout(() => {
      checkoutSpinnerView.style.display = 'none';
      checkoutSuccessView.style.display = 'block';
      sendWeb3FormsSubmission();
    }, 1800);
  }

  // 5. Digital Receipt Generator (Printable)
  function showDigitalReceipt() {
    formPage.style.display = 'none';
    receiptContainer.style.display = 'block';
    window.scrollTo(0, 0);

    // Generate receipt data securely
    const randomInvoice = 'DC-' + Math.floor(10000000 + Math.random() * 90000000);
    receiptIdText.textContent = `Receipt #: ${randomInvoice}`;
    
    const now = new Date();
    receiptDateText.textContent = `Date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    // Customer details
    receiptClientName.textContent = document.getElementById('contactName').value;
    receiptClientNGO.textContent = document.getElementById('q1').value;
    receiptClientContact.textContent = `📧 ${document.getElementById('contactEmail').value} | 📞 ${document.getElementById('contactPhone').value}`;

    // Project details
    receiptPlanTitle.textContent = activePlan.title;
    receiptProjectTimeline.textContent = `Delivery Timeline: ${activePlan.timeline.replace('⏱️ ', '')}`;
    receiptItemTitle.textContent = activePlan.title + ` Custom Web Build (${payPercent}% Paid)`;

    // Calculations
    receiptFullPriceText.textContent = `₦${originalPrice.toLocaleString()}`;
    receiptPaidText.textContent = `₦${payAmount.toLocaleString()}`;
    receiptBalanceText.textContent = `₦${balanceAmount.toLocaleString()}`;
  }

  function sendWeb3FormsSubmission() {
    const getRadioValue = (name) => {
      const radio = document.querySelector(`input[name="${name}"]:checked`);
      return radio ? radio.value : 'No Response';
    };

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New NGO Website Discovery - ${document.getElementById('q1').value}`,
      from_name: "DimaCode Portal",
      contact_name: document.getElementById('contactName').value,
      contact_email: document.getElementById('contactEmail').value,
      contact_phone: document.getElementById('contactPhone').value,
      ngo_name: document.getElementById('q1').value,
      ngo_description: document.getElementById('q2').value,
      ngo_mission_vision: document.getElementById('q3').value || 'Not provided',
      target_beneficiaries: document.getElementById('q4').value,
      services_programs: document.getElementById('q5').value,
      website_goal: document.getElementById('q6').value,
      requested_pages: document.getElementById('q7').value,
      logo_brand_assets: getRadioValue('q11'),
      accept_donations: getRadioValue('q8'),
      payment_methods: document.getElementById('q9').value || 'Not provided',
      volunteer_registration: getRadioValue('q10'),
      admin_dashboard: getRadioValue('q12'),
      website_examples: document.getElementById('q13').value || 'Not provided',
      domain_and_hosting: getRadioValue('q14'),
      estimated_budget: document.getElementById('q15').value,
      completion_timeline: document.getElementById('q16').value,
      additional_requirements: document.getElementById('q17').value || 'Not provided',
      selected_package: activePlan ? activePlan.title : 'Not selected',
      payment_tier: payPercent === 45 ? '45% Deposit' : '100% Full Payment',
      amount_paid: `₦${payAmount.toLocaleString()}`,
      balance_remaining: `₦${balanceAmount.toLocaleString()}`
    };

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status === 200) {
        console.log("Discovery form successfully submitted to Web3Forms!");
      } else {
        console.error("Web3Forms submission failed:", json);
      }
    })
    .catch((error) => {
      console.error("Web3Forms API connection error:", error);
    });
  }

  init();
})();
