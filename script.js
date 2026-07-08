/* ==========================================================================
   HopeLink NGO — Interactive Web Client
   ========================================================================== */

const API_BASE_URL = 'http://127.0.0.1:8001/api';

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }

  // Close mobile menu on nav link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      if (mobileToggle) mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Modal Handlers
  const donationModal = document.getElementById('donationModal');
  const successModal = document.getElementById('successModal');
  const closeDonationModal = document.getElementById('closeDonationModal');
  const successCloseBtn = document.getElementById('successCloseBtn');

  // Toggle active helper
  const openOverlay = (modal) => modal.classList.add('active');
  const closeOverlay = (modal) => modal.classList.remove('active');

  if (closeDonationModal) {
    closeDonationModal.addEventListener('click', () => closeOverlay(donationModal));
  }
  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => closeOverlay(successModal));
  }

  // Fetch and Render Campaigns
  const fetchCampaigns = async () => {
    const campaignsLoading = document.getElementById('campaignsLoading');
    const campaignsGrid = document.getElementById('campaignsGrid');

    try {
      if (campaignsLoading) campaignsLoading.style.display = 'block';
      if (campaignsGrid) campaignsGrid.innerHTML = '';

      const response = await fetch(`${API_BASE_URL}/programs/`);
      if (!response.ok) throw new Error('Failed to fetch programs');
      const programs = await response.data || await response.json();

      if (campaignsLoading) campaignsLoading.style.display = 'none';

      programs.forEach(program => {
        const target = parseFloat(program.target_amount) || 1;
        const current = parseFloat(program.current_amount) || 0;
        const progress = Math.min(current / target, 1);
        const percent = Math.round(progress * 100);

        const card = document.createElement('div');
        card.className = 'campaign-card';
        card.innerHTML = `
          <div class="card-img-wrap">
            <img src="${program.image_url || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600'}" alt="${program.title}">
            <span class="card-tag">${program.status}</span>
          </div>
          <div class="card-body">
            <h3>${program.title}</h3>
            <p>${program.description}</p>
            <div class="progress-section">
              <div class="progress-info">
                <span class="progress-label">Campaign Progress</span>
                <span class="progress-value">${percent}%</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${percent}%"></div>
              </div>
              <div class="amount-details">
                <span class="raised">₦${current.toLocaleString()} <span style="font-weight:400; font-size:0.8rem; color:var(--text-muted);">raised</span></span>
                <span class="target">Goal: ₦${target.toLocaleString()}</span>
              </div>
            </div>
            <button class="btn-donate-card" data-id="${program.id}" data-title="${program.title}">
              <i class="fas fa-heart"></i> Donate Now
            </button>
          </div>
        `;
        campaignsGrid.appendChild(card);
      });

      // Hook up donation click events
      document.querySelectorAll('.btn-donate-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = btn.getAttribute('data-id');
          const title = btn.getAttribute('data-title');
          
          document.getElementById('donationProgramId').value = id;
          document.getElementById('donationProgramTitle').textContent = `Campaign: ${title}`;
          openOverlay(donationModal);
        });
      });

    } catch (err) {
      console.error(err);
      if (campaignsLoading) campaignsLoading.style.display = 'none';
      if (campaignsGrid) {
        campaignsGrid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; color: var(--error); padding: 2rem;">
            <i class="fas fa-exclamation-circle" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
            <h3>Unable to load campaign statistics</h3>
            <p>Please verify that the Django server is running locally on port 8001.</p>
          </div>
        `;
      }
    }
  };

  fetchCampaigns();

  // Handle Donation Form Submit (Simulates Webhook lifecycle)
  const donationForm = document.getElementById('donationForm');
  if (donationForm) {
    donationForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = document.getElementById('btnSubmitDonation');
      const text = btn.querySelector('.btn-text');
      const spinner = btn.querySelector('.btn-spinner');

      const name = document.getElementById('donName').value;
      const email = document.getElementById('donEmail').value;
      const amount = parseFloat(document.getElementById('donAmount').value);
      const programId = document.getElementById('donationProgramId').value;

      if (!name || !email || isNaN(amount) || amount <= 0) return;

      try {
        text.style.display = 'none';
        spinner.style.display = 'inline-block';
        btn.disabled = true;

        const reference = 'PAYSTACK-' + Math.random().toString(36).substring(2, 15).toUpperCase();

        // 1. POST record to donations endpoint
        const donationRes = await fetch(`${API_BASE_URL}/donations/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            donor_name: name,
            donor_email: email,
            amount: amount,
            reference: reference,
            payment_status: 'pending',
            program: programId ? parseInt(programId) : null
          })
        });

        if (!donationRes.ok) throw new Error('Transaction record generation failed');

        // 2. Call local webhook simulator to process Paystack success event
        const webhookRes = await fetch(`${API_BASE_URL}/webhook/paystack/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'charge.success',
            data: { reference: reference }
          })
        });

        if (!webhookRes.ok) throw new Error('Transaction processing verification failed');

        // Close form, show popup
        closeOverlay(donationModal);
        document.getElementById('successTitle').innerText = 'Donation Successful!';
        document.getElementById('successMessage').innerText = `Thank you, ${name}! Your donation of ₦${amount.toLocaleString()} was successfully simulated and recorded.`;
        document.getElementById('successWhatsappRow').style.display = 'block';
        openOverlay(successModal);

        // Reset and refresh stats
        donationForm.reset();
        fetchCampaigns();

      } catch (err) {
        console.error(err);
        alert('An error occurred processing the simulated payment.');
      } finally {
        text.style.display = 'inline';
        spinner.style.display = 'none';
        btn.disabled = false;
      }
    });
  }

  // Handle Volunteer Form Submit
  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = document.getElementById('btnSubmitVolunteer');
      const text = btn.querySelector('.btn-text');
      const spinner = btn.querySelector('.btn-spinner');

      const name = document.getElementById('volName').value;
      const email = document.getElementById('volEmail').value;
      const phone = document.getElementById('volPhone').value;
      const interests = document.getElementById('volInterests').value;
      const motivation = document.getElementById('volMotivation').value;

      try {
        text.style.display = 'none';
        spinner.style.display = 'inline-block';
        btn.disabled = true;

        const res = await fetch(`${API_BASE_URL}/volunteer/register/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: name,
            email: email,
            phone: phone,
            interest_areas: interests,
            experience: motivation
          })
        });

        if (!res.ok) throw new Error('Registration failed');

        document.getElementById('successTitle').innerText = 'Registration Complete!';
        document.getElementById('successMessage').innerText = `Thank you, ${name}. Your volunteer application has been received. We will contact you soon.`;
        document.getElementById('successWhatsappRow').style.display = 'block';
        openOverlay(successModal);

        volunteerForm.reset();

      } catch (err) {
        console.error(err);
        alert('An error occurred submitting the registration.');
      } finally {
        text.style.display = 'inline';
        spinner.style.display = 'none';
        btn.disabled = false;
      }
    });
  }

  // Handle Contact Form Submit
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = document.getElementById('btnSubmitContact');
      const text = btn.querySelector('.btn-text');
      const spinner = btn.querySelector('.btn-spinner');

      const name = document.getElementById('conName').value;
      const email = document.getElementById('conEmail').value;
      const phone = document.getElementById('conPhone').value;
      const message = document.getElementById('conMessage').value;

      try {
        text.style.display = 'none';
        spinner.style.display = 'inline-block';
        btn.disabled = true;

        const res = await fetch(`${API_BASE_URL}/contact/send/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            message: message
          })
        });

        if (!res.ok) throw new Error('Message send failed');

        document.getElementById('successTitle').innerText = 'Message Delivered!';
        document.getElementById('successMessage').innerText = `Hi ${name}, your inquiry has been sent to our administrator team.`;
        document.getElementById('successWhatsappRow').style.display = 'none';
        openOverlay(successModal);

        contactForm.reset();

      } catch (err) {
        console.error(err);
        alert('An error occurred delivering the message.');
      } finally {
        text.style.display = 'inline';
        spinner.style.display = 'none';
        btn.disabled = false;
      }
    });
  }
});
