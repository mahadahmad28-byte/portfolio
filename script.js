/* ═══════════════════════════════════════════════
   Portfolio JavaScript — Baskara Edition
   1. Nav: Active link tracking (pill highlight)
   2. Scroll Reveal (IntersectionObserver)
   3. Skill bar animation
   4. Contact form handler
   5. Terminal animation
   6. Page load fade-in
═══════════════════════════════════════════════ */

'use strict';


/* ── 1. Nav: Active link tracking ────────────── */
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          const isActive = a.getAttribute('href') === `#${id}`;
          a.classList.toggle('active', isActive);
        });
      }
    });
  },
  { threshold: 0.35 }
);

document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));


/* ── 2. Scroll Reveal ────────────────────────── */
const revealEls = document.querySelectorAll(
  '.section-eyebrow, .section-title, .section-sub, ' +
  '.about-headline, .about-body > p, .about-card, ' +
  '.project-card, ' +
  '.skill-group, ' +
  '.timeline-item, ' +
  '.contact-card, .contact-form-wrap, ' +
  '.cta-left, .cta-right'
);

revealEls.forEach((el) => {
  el.classList.add('reveal');
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
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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


/* ── 4. Hero role typewriter ─────────────────── */
const ROLES = [
  'Computer Science Student',
  'AI Tools Builder',
  'Security Researcher',
  'Full Stack Developer',
  'Flutter Developer',
];

// Role tag is now static in hero; typewriter only runs if element exists
const roleEl = document.querySelector('.role-tag');
if (roleEl) {
  let roleIdx = 0, charIdx = 0, deleting = false, paused = false;

  function typeRole() {
    const current = ROLES[roleIdx];
    if (paused) { paused = false; setTimeout(typeRole, 1500); return; }
    if (!deleting) {
      roleEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) { deleting = true; paused = true; }
      setTimeout(typeRole, 75);
    } else {
      roleEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % ROLES.length; }
      setTimeout(typeRole, 38);
    }
  }
  setTimeout(typeRole, 1800);
}


/* ── 5. Contact Form ─────────────────────────── */
function handleContactForm(e) {
  e.preventDefault();
  const form    = document.getElementById('contact-form');
  const note    = document.getElementById('form-note');
  const btn     = document.getElementById('contact-submit');
  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email-input').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const msg     = document.getElementById('contact-msg').value.trim();

  if (!name || !email || !msg) {
    note.textContent = 'Please fill in all required fields.';
    note.className = 'form-note error';
    return;
  }

  const mailSubject = encodeURIComponent(subject || `Portfolio contact from ${name}`);
  const mailBody    = encodeURIComponent(`Hi Mahad,\n\n${msg}\n\nBest,\n${name}\n${email}`);
  const mailto = `mailto:mahadahmad28@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  btn.disabled = true;
  btn.textContent = 'Opening mail client…';
  window.location.href = mailto;

  setTimeout(() => {
    note.textContent = '✓ Mail client opened!';
    note.className = 'form-note success';
    form.reset();
    btn.disabled = false;
    btn.innerHTML = 'Send Message <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>';
  }, 1000);
}
window.handleContactForm = handleContactForm;


/* ── 6. Copy email on click ──────────────────── */
const emailCard = document.getElementById('contact-email');
if (emailCard) {
  emailCard.addEventListener('click', () => {
    navigator.clipboard?.writeText('mahadahmad28@gmail.com').catch(() => {});
  });
}


/* ── 7. Terminal animation ───────────────────── */
function animateTerminal() {
  const lines = document.querySelectorAll('.terminal-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transition = 'opacity 0.28s ease';
    setTimeout(() => { line.style.opacity = '1'; }, 350 + i * 260);
  });
}

const terminal = document.querySelector('.terminal-window');
if (terminal) {
  const termObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateTerminal(); termObs.unobserve(terminal); }
    });
  }, { threshold: 0.5 });
  termObs.observe(terminal);
}


/* ── 8. Page load fade-in ────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});
