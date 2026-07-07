(function() {
  // ---------- WEB3FORMS CONFIGURATION ----------
  // Replace with your Web3Forms Access Key from https://web3forms.com
  const WEB3FORMS_ACCESS_KEY = "073e0963-fd22-4886-8a40-5ccd11749be3";

  // ---------- PLAN DATA ----------
  const plans = [
    {
      id: 'basic',
      title: 'Basic NGO Website',
      price: 180000,
      timeline: 'Delivery: 3 Days',
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
      timeline: 'Delivery: 1 Week',
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
      timeline: 'Delivery: 2 Weeks',
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
  const checkoutSpinnerView = document.getElementById('checkoutSpinnerView');
  const checkoutSpinnerText = document.getElementById('checkoutSpinnerText');
  const checkoutSuccessView = document.getElementById('checkoutSuccessView');
  const viewInvoiceBtn = document.getElementById('viewInvoiceBtn');

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
      const clock = document.createElement('i');
      clock.className = 'fas fa-clock';
      clock.style.marginRight = '6px';
      timeline.appendChild(clock);
      timeline.appendChild(document.createTextNode(plan.timeline));
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
          triggerDirectSubmission();
        }
      }
    });

    payPartial.addEventListener('change', () => {
      updateFormPrice();
    });

    // Submission overlay interactions
    closeCheckoutBtn.addEventListener('click', () => {
      checkoutOverlay.style.display = 'none';
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
    const clock = document.createElement('i');
    clock.className = 'fas fa-clock';
    clock.style.marginRight = '6px';
    timelineDiv.appendChild(clock);
    timelineDiv.appendChild(document.createTextNode(plan.timeline));
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

    renderPageSelector(plan);

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
    } else {
      payPercent = 100;
      payAmount = originalPrice;
      balanceAmount = 0;
    }
    nextStepBtn.textContent = "Submit Discovery Form ✨";
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
    const currentPanel = panels.at(step - 1);
    const requiredInputs = currentPanel ? currentPanel.querySelectorAll('[required]') : [];
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

  // 4. Direct Form Submission Flow
  function triggerDirectSubmission() {
    checkoutOverlay.style.display = 'flex';
    checkoutSpinnerView.style.display = 'block';
    checkoutSuccessView.style.display = 'none';

    sendWeb3FormsSubmission();
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
    
    receiptClientContact.replaceChildren();
    
    const emailIcon = document.createElement('i');
    emailIcon.className = 'fas fa-envelope';
    emailIcon.style.marginRight = '5px';
    receiptClientContact.appendChild(emailIcon);
    receiptClientContact.appendChild(document.createTextNode(' ' + document.getElementById('contactEmail').value + ' | '));
    
    const phoneIcon = document.createElement('i');
    phoneIcon.className = 'fas fa-phone-alt';
    phoneIcon.style.marginRight = '5px';
    receiptClientContact.appendChild(phoneIcon);
    receiptClientContact.appendChild(document.createTextNode(' ' + document.getElementById('contactPhone').value));

    // Project details
    receiptPlanTitle.textContent = activePlan.title;
    receiptProjectTimeline.textContent = `Delivery Timeline: ${activePlan.timeline}`;
    receiptItemTitle.textContent = activePlan.title + ` Custom Web Build (${payPercent}% Selected)`;

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
        checkoutSpinnerView.style.display = 'none';
        checkoutSuccessView.style.display = 'block';
      } else {
        console.error("Web3Forms submission failed:", json);
        alert("Form submission failed. Please try again or contact us directly on WhatsApp.");
        checkoutOverlay.style.display = 'none';
      }
    })
    .catch((error) => {
      console.error("Web3Forms API connection error:", error);
      // Fallback: Still show success so user isn't stuck and can chat on WhatsApp
      checkoutSpinnerView.style.display = 'none';
      checkoutSuccessView.style.display = 'block';
    });
  }

  function renderPageSelector(plan) {
    const container = document.getElementById('dynamicPagesContainer');
    const label = document.getElementById('selectedPlanLabel');
    const info = document.getElementById('pageSelectionInfo');
    const hiddenInput = document.getElementById('q7');

    if (!container || !label || !info || !hiddenInput) return;

    label.textContent = plan.title;

    // Define pool of possible pages with their details (using FontAwesome class names instead of emojis)
    const pagePool = [
      { id: 'home', label: 'Home', iconClass: 'fas fa-home', default: true, required: true },
      { id: 'about', label: 'About Us', iconClass: 'fas fa-info-circle', default: true, required: false },
      { id: 'programs', label: 'Programs / Outreaches', iconClass: 'fas fa-tasks', default: true, required: false },
      { id: 'gallery', label: 'Photo Gallery', iconClass: 'fas fa-images', default: true, required: false },
      { id: 'contact', label: 'Contact Us', iconClass: 'fas fa-envelope', default: true, required: true },
      { id: 'blog', label: 'News & Blog Stories', iconClass: 'fas fa-newspaper', default: plan.id !== 'basic', required: false, minPlan: 'standard' },
      { id: 'donate', label: 'Online Donation Form', iconClass: 'fas fa-heart', default: plan.id !== 'basic', required: false, minPlan: 'standard' },
      { id: 'volunteer', label: 'Volunteer Registration', iconClass: 'fas fa-users', default: plan.id !== 'basic', required: false, minPlan: 'standard' },
      { id: 'newsletter', label: 'Newsletter Signup', iconClass: 'fas fa-paper-plane', default: plan.id !== 'basic', required: false, minPlan: 'standard' },
      { id: 'events', label: 'Event Ticketing / Booking', iconClass: 'fas fa-ticket-alt', default: plan.id === 'premium', required: false, minPlan: 'premium' },
      { id: 'portal', label: 'Member Login Portal', iconClass: 'fas fa-user-lock', default: plan.id === 'premium', required: false, minPlan: 'premium' },
      { id: 'multilingual', label: 'Multilingual Selector', iconClass: 'fas fa-language', default: plan.id === 'premium', required: false, minPlan: 'premium' }
    ];

    // Filter pages that are supported by the plan
    const availablePages = pagePool.filter(p => {
      if (!p.minPlan) return true;
      if (plan.id === 'basic') return false; 
      if (plan.id === 'standard') return p.minPlan === 'standard';
      return true; // Premium gets all
    });

    container.replaceChildren(); // Safe clear

    // Max limit definition
    const maxPages = plan.id === 'basic' ? 5 : (plan.id === 'standard' ? 10 : Infinity);
    info.textContent = plan.id === 'basic'
      ? "Basic plan: Up to 5 pages included. (Home and Contact are required)"
      : (plan.id === 'standard' ? `Standard plan: Up to 10 pages included.` : "Premium plan: Unlimited pages included.");

    const selectedPages = new Set();

    // Helper to update the hidden input value
    const updateHiddenInput = () => {
      const pageNames = Array.from(selectedPages);
      // Add custom pages if any
      const customItems = container.querySelectorAll('.custom-page-checkbox');
      customItems.forEach(item => {
        if (item.checked) {
          pageNames.push(item.value);
        }
      });
      hiddenInput.value = pageNames.join(', ');
    };

    // Render checkboxes
    availablePages.forEach(p => {
      const itemLabel = document.createElement('label');
      itemLabel.className = 'page-checkbox-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = p.label;
      
      if (p.default) {
        checkbox.checked = true;
        selectedPages.add(p.label);
        itemLabel.classList.add('selected');
      }

      if (p.required) {
        checkbox.disabled = true; // Always checked & locked
        itemLabel.classList.add('disabled');
      }

      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          if (selectedPages.size >= maxPages) {
            checkbox.checked = false;
            alert(`Your selected plan allows a maximum of ${maxPages} pages. Upgrade to Standard or Premium for more pages.`);
            return;
          }
          selectedPages.add(p.label);
          itemLabel.classList.add('selected');
        } else {
          selectedPages.delete(p.label);
          itemLabel.classList.remove('selected');
        }
        updateHiddenInput();
      });

      itemLabel.appendChild(checkbox);

      const icon = document.createElement('i');
      icon.className = p.iconClass;
      icon.style.marginRight = '8px';
      itemLabel.appendChild(icon);

      const textSpan = document.createElement('span');
      textSpan.textContent = p.label;
      itemLabel.appendChild(textSpan);
      container.appendChild(itemLabel);
    });

    // Custom Page Adder
    const customWrapper = document.createElement('div');
    customWrapper.className = 'custom-page-input-wrapper';

    const customInput = document.createElement('input');
    customInput.type = 'text';
    customInput.placeholder = 'Add a custom page (e.g. FAQ, Impact Report)';
    customInput.style.padding = '0.6rem 1rem';
    customInput.style.borderRadius = '12px';
    customInput.style.border = '1px solid var(--slate-200)';
    customInput.style.background = 'white';

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'btn-add-custom-page';
    addBtn.textContent = 'Add Page';

    addBtn.addEventListener('click', () => {
      const val = customInput.value.trim();
      if (!val) return;

      if (selectedPages.size >= maxPages) {
        alert(`Your selected plan allows a maximum of ${maxPages} pages. Upgrade to Standard or Premium for more pages.`);
        return;
      }

      // Add to selection
      selectedPages.add(val);

      // Create checkbox dynamically
      const itemLabel = document.createElement('label');
      itemLabel.className = 'page-checkbox-item selected';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = val;
      checkbox.checked = true;
      checkbox.className = 'custom-page-checkbox';

      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          if (selectedPages.size >= maxPages) {
            checkbox.checked = false;
            alert(`Your selected plan allows a maximum of ${maxPages} pages. Upgrade to Standard or Premium for more pages.`);
            return;
          }
          selectedPages.add(val);
          itemLabel.classList.add('selected');
        } else {
          selectedPages.delete(val);
          itemLabel.classList.remove('selected');
        }
        updateHiddenInput();
      });

      itemLabel.appendChild(checkbox);

      const icon = document.createElement('i');
      icon.className = 'fas fa-file-alt';
      icon.style.marginRight = '8px';
      itemLabel.appendChild(icon);

      const textSpan = document.createElement('span');
      textSpan.textContent = val;
      itemLabel.appendChild(textSpan);

      // Insert before the custom wrapper
      container.insertBefore(itemLabel, customWrapper);
      customInput.value = '';
      updateHiddenInput();
    });

    customWrapper.appendChild(customInput);
    customWrapper.appendChild(addBtn);
    container.appendChild(customWrapper);

    updateHiddenInput();
  }

  init();
})();
