/* Renders the professional landing page from the shared DATA object. */
(function () {
  const D = window.DATA;
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isTodo = (s) => /TODO/i.test(String(s));
  const mark = (s) =>
    isTodo(s) ? `<span class="todo">${esc(s)}</span>` : esc(s);

  // --- hero ---
  $("name").textContent = D.name;
  $("role").textContent = D.role;
  $("role-sub").textContent = D.roleSub ? `— ${D.roleSub}` : "";
  $("tagline").textContent = D.tagline;
  $("location").textContent = D.location;
  $("availability").textContent = D.availability;

  // --- contact links ---
  const c = D.contact || {};
  const links = [
    c.email && { label: "email", href: `mailto:${c.email}` },
    c.github && { label: "GitHub", href: c.github },
    c.linkedin && { label: "LinkedIn", href: c.linkedin },
  ].filter(Boolean);
  const nav = $("contact-links");
  links.forEach((l) => {
    const a = el("a");
    a.textContent = l.label;
    a.href = l.href;
    if (l.href.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
    nav.appendChild(a);
  });

  // --- summary ---
  $("summary").textContent = (D.summary || []).join(" ");

  // --- projects ---
  const pc = $("projects");
  (D.projects || []).forEach((p) => {
    const card = el("div", "card");
    const head = el("div", "p-head");
    head.appendChild(el("h3", null, esc(p.name)));
    if (p.tagline) head.appendChild(el("span", "p-tag", esc(p.tagline)));
    card.appendChild(head);
    if (p.description) card.appendChild(el("p", "p-desc", esc(p.description)));
    if (p.note) card.appendChild(el("p", "p-note", esc(p.note)));
    if (p.tech && p.tech.length) {
      const chips = el("div", "chips");
      p.tech.forEach((t) => chips.appendChild(el("span", "chip", esc(t))));
      card.appendChild(chips);
    }
    if (p.highlights && p.highlights.length) {
      const ul = el("ul", "hl");
      p.highlights.forEach((h) => ul.appendChild(el("li", null, esc(h))));
      card.appendChild(ul);
    }
    const linkKeys = Object.keys(p.links || {});
    if (linkKeys.length) {
      const pl = el("div", "p-links");
      linkKeys.forEach((k) => {
        const a = el("a");
        a.textContent = `${k} ↗`;
        a.href = p.links[k]; a.target = "_blank"; a.rel = "noopener";
        pl.appendChild(a);
      });
      card.appendChild(pl);
    }
    pc.appendChild(card);
  });

  // --- skills ---
  const sg = $("skills-grid");
  Object.entries(D.skills || {}).forEach(([group, items]) => {
    const g = el("div", "skill-group");
    g.appendChild(el("h4", null, esc(group)));
    const ul = el("ul");
    items.forEach((i) => ul.appendChild(el("li", null, esc(i))));
    g.appendChild(ul);
    sg.appendChild(g);
  });

  // --- experience ---
  const ex = $("experience-list");
  (D.experience || []).forEach((e) => {
    const wrap = el("div", "exp");
    const head = el("div", "e-head");
    const left = el("div");
    left.appendChild(el("h3", null, mark(e.title)));
    left.appendChild(el("span", "e-co", " · " + (isTodo(e.company)
      ? `<span class="todo">${esc(e.company)}</span>` : esc(e.company))));
    head.appendChild(left);
    head.appendChild(el("span", "e-dates", mark(e.dates || "")));
    wrap.appendChild(head);
    if (e.bullets && e.bullets.length) {
      const ul = el("ul");
      e.bullets.forEach((b) => ul.appendChild(el("li", null, mark(b))));
      wrap.appendChild(ul);
    }
    ex.appendChild(wrap);
  });

  // --- footer ---
  $("footer-contact").innerHTML =
    `${esc(D.name)} · <a href="mailto:${esc(c.email)}">${esc(c.email)}</a>` +
    (c.github ? ` · <a href="${esc(c.github)}" target="_blank" rel="noopener">github</a>` : "") +
    (c.linkedin ? ` · <a href="${esc(c.linkedin)}" target="_blank" rel="noopener">linkedin</a>` : "");
})();
