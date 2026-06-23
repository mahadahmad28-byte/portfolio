/* ═══════════════════════════════════════════════
   Portfolio JavaScript
   - Nav scroll effect
   - Scroll-reveal animations
   - Skill bar animation (IntersectionObserver)
   - Contact form handler
   - Active nav link highlighting
   - Typewriter effect on hero
═══════════════════════════════════════════════ */

'use strict';

/* ── 1. Nav: Scrolled state ──────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });


/* ── 2. Scroll Reveal ────────────────────────── */
const revealEls = document.querySelectorAll(
  '.section-label, .section-title, .section-sub, ' +
  '.about-text p, .about-card, ' +
  '.project-card, ' +
  '.skill-group, ' +
  '.timeline-item, ' +
  '.contact-card, .contact-form-wrap, ' +
  '.hero-stats .stat'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger siblings
  const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
  const idx = siblings.indexOf(el);
  if (idx > 0 && idx <= 3) el.classList.add(`reveal-delay-${idx}`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));


/* ── 3. Skill Bars Animation ─────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

skillFills.forEach(fill => skillObserver.observe(fill));


/* ── 4. Active Nav Link on Scroll ────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--text)'
            : '';
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach(s => sectionObserver.observe(s));


/* ── 5. Hero Typewriter for Role ─────────────── */
const ROLES = [
  'Computer Science Student',
  'AI Tools Builder',
  'Security Researcher',
  'Full Stack Developer',
  'Open Source Contributor',
];

const roleEl = document.querySelector('.role-tag');
if (roleEl) {
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let paused = false;

  function typeRole() {
    const current = ROLES[roleIdx];
    if (paused) { paused = false; setTimeout(typeRole, 1500); return; }

    if (!deleting) {
      roleEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) { deleting = true; paused = true; }
      setTimeout(typeRole, 80);
    } else {
      roleEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % ROLES.length;
      }
      setTimeout(typeRole, 40);
    }
  }

  // Start after a short delay
  setTimeout(typeRole, 1800);
}


/* ── 6. Contact Form ─────────────────────────── */
function handleContactForm(e) {
  e.preventDefault();
  const form    = document.getElementById('contact-form');
  const note    = document.getElementById('form-note');
  const btn     = document.getElementById('contact-submit');
  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email-input').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const msg     = document.getElementById('contact-msg').value.trim();

  // Simple validation
  if (!name || !email || !msg) {
    note.textContent = 'Please fill in all required fields.';
    note.className = 'form-note error';
    return;
  }

  // Build mailto link as fallback (no server needed)
  const mailSubject = encodeURIComponent(subject || `Portfolio contact from ${name}`);
  const mailBody    = encodeURIComponent(
    `Hi Mahad,\n\n${msg}\n\nBest,\n${name}\n${email}`
  );
  const mailto = `mailto:your.email@example.com?subject=${mailSubject}&body=${mailBody}`;

  btn.disabled = true;
  btn.textContent = 'Opening mail client…';

  // Attempt to open mail client
  window.location.href = mailto;

  setTimeout(() => {
    note.textContent = '✓ Mail client opened! Replace the email in contact.html with your real address.';
    note.className = 'form-note success';
    form.reset();
    btn.disabled = false;
    btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>';
  }, 1000);
}

// Make globally accessible
window.handleContactForm = handleContactForm;


/* ── 7. Smooth parallax on hero orbs (subtle) ── */
window.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-orb');
  const { innerWidth: w, innerHeight: h } = window;
  const xPct = (e.clientX / w - 0.5);
  const yPct = (e.clientY / h - 0.5);

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 15;
    orb.style.transform = `translate(${xPct * factor}px, ${yPct * factor}px)`;
  });
}, { passive: true });


/* ── 8. Terminal animation (VulnHawk mock) ──── */
function animateTerminal() {
  const lines = document.querySelectorAll('.terminal-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      line.style.opacity = '1';
    }, 400 + i * 300);
  });
}

// Re-run terminal animation when visible
const terminal = document.querySelector('.terminal-window');
if (terminal) {
  const termObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateTerminal();
        termObs.unobserve(terminal);
      }
    });
  }, { threshold: 0.5 });
  termObs.observe(terminal);
}


/* ── 9. Copy email on click ─────────────────── */
const emailCard = document.getElementById('contact-email');
if (emailCard) {
  emailCard.addEventListener('click', (e) => {
    // Still open mailto, but also copy to clipboard
    navigator.clipboard?.writeText('your.email@example.com').catch(() => {});
  });
}


/* ── 10. Page load animation ─────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
