// Shared bits for all three design directions:
// <re-logo>     eye + laurel mark (inherits currentColor)
// <re-bottle>   illustrated Saffron Rabarbaro Amaro bottle (placeholder until real photos)
// <re-agegate>  21+ gate, styled through --gate-* CSS vars on the page

// ---- site config: fill these in before launch ----
window.RE_CONFIG = {
  // formspree.io form id (free tier works on GitHub Pages). e.g. 'xyzabcd'
  formspreeId: '',
  // fallback: if no formspree id, the form opens an email to this address
  email: 'joey@redeyedspirits.co',
  instagram: 'https://www.instagram.com/redeyedspirits/',
};

(function () {
  const NS = 'http://www.w3.org/2000/svg';
  let uid = 0;

  class ReLogo extends HTMLElement {
    connectedCallback() {
      const id = 'rl' + (++uid);
      const plain = this.hasAttribute('plain'); // eye only, no wreath/text
      let leaves = '';
      // laurel: two branches hugging the ring, from bottom center up each side
      const R = 84;
      for (const side of [-1, 1]) {
        leaves += `<path d="M${100 + side * 10} ${100 + R - 1} A${R} ${R} 0 0 ${side > 0 ? 0 : 1} ${(100 + side * R * Math.sin(2.55)).toFixed(1)} ${(100 + R * Math.cos(2.55)).toFixed(1)}" fill="none" stroke="currentColor" stroke-width="2"/>`;
        for (let i = 0; i < 10; i++) {
          const th = (16 + i * 13.5) * Math.PI / 180;
          for (const off of [-1, 1]) {
            const rr = R + off * 6.5;
            const x = 100 + side * rr * Math.sin(th + off * 0.04);
            const y = 100 + rr * Math.cos(th + off * 0.04);
            const tang = Math.atan2(-Math.sin(th), side * Math.cos(th)) * 180 / Math.PI;
            const rot = tang + 90 + side * off * -28;
            leaves += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="3.4" ry="8.5" transform="rotate(${rot.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="currentColor"/>`;
          }
        }
      }
      let rays = '';
      for (let i = 0; i < 9; i++) {
        const a = (-150 + i * 15) * Math.PI / 180;
        const x1 = 100 + 30 * Math.cos(a), y1 = 106 + 30 * Math.sin(a);
        const len = i % 2 ? 9 : 15;
        const x2 = 100 + (30 + len) * Math.cos(a), y2 = 106 + (30 + len) * Math.sin(a);
        rays += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
      }
      const eye = `
        <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
          <path d="M58 108 Q100 72 142 108 Q100 140 58 108 Z"/>
          <circle cx="100" cy="107" r="15"/>
          <path d="M100 107 m-6 0 a6 6 0 1 1 6 6 a3 3 0 1 1 -3 -3"/>
          ${rays}
        </g>`;
      const ring = plain ? '' : `
        <defs>
          <path id="${id}t" d="M38 106 A62 62 0 0 1 162 106"/>
          <path id="${id}b" d="M46 112 A54 54 0 0 0 154 112"/>
        </defs>
        <g>${leaves}</g>
        <text font-family="'IM Fell English', Georgia, serif" font-style="italic" font-size="18" fill="currentColor" text-anchor="middle"><textPath href="#${id}t" startOffset="50%">Red Eyed Spirits</textPath></text>
        <text font-family="Georgia, serif" font-size="9" letter-spacing="2.5" fill="currentColor" text-anchor="middle"><textPath href="#${id}b" startOffset="50%">LOCAL ALCHEMY</textPath></text>`;
      const vb = plain ? '50 58 100 90' : '0 0 200 200';
      // text sits inside the wreath; shift eye down a touch when ring present
      this.innerHTML = `<svg viewBox="${vb}" role="img" aria-label="Red Eyed Spirits" style="display:block;width:100%;height:auto">${ring}${plain ? eye : `<g transform="translate(100 104) scale(.78) translate(-100 -104)">${eye}</g>`}</svg>`;
    }
  }

  // variants match the real labels: saffron = black label / amber,
  // carminio = white label / rosy red, akvavit = white label / clear
  const BOTTLES = {
    saffron:  { name: ['SAFFRON', 'RABARBARO', 'AMARO'], liquid: ['#9a5a12', '#d9932b', '#8a4c0c'], label: '#141414', ink: '#d4a64a' },
    carminio: { name: ['AMARO', 'CARMINIO'], liquid: ['#7a2a22', '#c4574a', '#6b211b'], label: '#f7f3ee', ink: '#b8352a' },
    akvavit:  { name: ['TAFFEL', 'AKVAVIT'], liquid: ['#cfd8d6', '#f4f7f6', '#c2ccca'], label: '#f7f3ee', ink: '#b8352a' },
  };

  class ReBottle extends HTMLElement {
    connectedCallback() {
      const id = 'rb' + (++uid);
      const v = BOTTLES[this.getAttribute('variant')] || BOTTLES.saffron;
      const h = 340, bodyTop = 110;
      const shape = `M48 34 H72 V${bodyTop - 40} Q72 ${bodyTop - 10} 104 ${bodyTop} Q110 ${bodyTop + 4} 110 ${bodyTop + 16} V${h - 14} Q110 ${h} 96 ${h} H24 Q10 ${h} 10 ${h - 14} V${bodyTop + 16} Q10 ${bodyTop + 4} 16 ${bodyTop} Q48 ${bodyTop - 10} 48 ${bodyTop - 40} Z`;
      const lines = v.name.map((t, i) => `<text x="60" y="${bodyTop + 110 + i * 12 - (v.name.length - 2) * 6}" font-size="8.5" letter-spacing="1.2">${t}</text>`).join('');
      this.innerHTML = `
      <svg viewBox="0 0 120 ${h}" role="img" aria-label="Bottle of ${v.name.join(' ').toLowerCase()}" style="display:block;width:100%;height:auto">
        <defs>
          <linearGradient id="${id}l" x1="0" x2="1">
            <stop offset="0" stop-color="${v.liquid[0]}"/><stop offset=".45" stop-color="${v.liquid[1]}"/><stop offset="1" stop-color="${v.liquid[2]}"/>
          </linearGradient>
          <linearGradient id="${id}g" x1="0" x2="1">
            <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".2" stop-color="#fff" stop-opacity=".35"/><stop offset=".3" stop-color="#fff" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <rect x="44" y="0" width="32" height="34" rx="3" fill="#1d1d1f"/>
        <path d="${shape}" fill="url(#${id}l)"/>
        <path d="${shape}" fill="url(#${id}g)"/>
        <path d="${shape}" fill="none" stroke="#000" stroke-opacity=".12"/>
        <rect x="18" y="${bodyTop + 50}" width="84" height="130" rx="2" fill="${v.label}"/>
        <g fill="none" stroke="${v.ink}" stroke-width="1.4" stroke-linecap="round" transform="translate(60 ${bodyTop + 76})">
          <path d="M-16 0 Q0 -12 16 0 Q0 11 -16 0 Z"/><circle r="5"/>
        </g>
        <g fill="${v.ink}" font-family="Georgia, serif" text-anchor="middle">
          ${lines}
          <text x="60" y="${bodyTop + 160}" font-size="6" font-style="italic">Red Eyed Spirits</text>
        </g>
      </svg>`;
    }
  }

  class ReAgeGate extends HTMLElement {
    connectedCallback() {
      let ok = false;
      try { ok = localStorage.getItem('re-21') === 'yes'; } catch (e) {}
      if (ok) { this.remove(); return; }
      this.innerHTML = `
        <div class="gate" role="dialog" aria-modal="true" aria-labelledby="gate-q" style="position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:24px max(16px, env(safe-area-inset-right, 0px)) 24px max(16px, env(safe-area-inset-left, 0px));background:var(--gate-bg);color:var(--gate-fg);font-family:var(--gate-font, inherit)">
          <div style="max-width:360px;text-align:center;display:grid;gap:20px;justify-items:center">
            <re-logo style="width:140px;color:var(--gate-accent)"></re-logo>
            <p id="gate-q" style="margin:0;font-size:1.35rem;line-height:1.3">Are you 21 or older?</p>
            <div style="display:flex;gap:12px">
              <button id="gate-yes" type="button" style="font:inherit;padding:12px 28px;border:1px solid var(--gate-accent);background:var(--gate-accent);color:var(--gate-bg);cursor:pointer">Yes</button>
              <button id="gate-no" type="button" style="font:inherit;padding:12px 28px;border:1px solid currentColor;background:transparent;color:inherit;cursor:pointer">No</button>
            </div>
            <p id="gate-msg" hidden style="margin:0;opacity:.75">Come back when you are. We'll save you a glass.</p>
          </div>
        </div>`;
      document.documentElement.style.overflow = 'hidden';
      this.querySelector('#gate-yes').addEventListener('click', () => {
        try { localStorage.setItem('re-21', 'yes'); } catch (e) {}
        document.documentElement.style.overflow = '';
        this.remove();
      });
      this.querySelector('#gate-no').addEventListener('click', () => {
        this.querySelector('#gate-msg').hidden = false;
      });
    }
  }

  // contact forms: any <form data-contact> with name/email/message fields
  function wireContact(form) {
    const status = form.querySelector('[data-status]');
    const say = (t) => { if (status) status.textContent = t; };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const cfg = window.RE_CONFIG;
      const data = new FormData(form);
      if (cfg.formspreeId) {
        say('Sending...');
        try {
          const r = await fetch('https://formspree.io/f/' + cfg.formspreeId, {
            method: 'POST', body: data, headers: { Accept: 'application/json' },
          });
          if (!r.ok) throw new Error(r.status);
          form.reset();
          say('Thanks, we got it. We will get back to you soon.');
        } catch (err) {
          say('That did not go through. Try again, or message us on Instagram.');
        }
        return;
      }
      if (cfg.email) {
        const subject = encodeURIComponent((data.get('topic') || 'Hello') + ' from ' + (data.get('name') || 'the website'));
        const body = encodeURIComponent((data.get('message') || '') + '\n\n' + (data.get('name') || '') + '\n' + (data.get('email') || ''));
        location.href = 'mailto:' + cfg.email + '?subject=' + subject + '&body=' + body;
        say('Opening your email app...');
        return;
      }
      say('Contact form is not hooked up yet. For now, message us on Instagram @redeyedspirits.');
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form[data-contact]').forEach(wireContact);
  });

  customElements.define('re-logo', ReLogo);
  customElements.define('re-bottle', ReBottle);
  customElements.define('re-agegate', ReAgeGate);
})();
