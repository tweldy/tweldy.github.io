/* Terminal portfolio engine. Content comes from data.js (global DATA). */
(function () {
  const screen = document.getElementById('screen');
  const form = document.getElementById('prompt-form');
  const input = document.getElementById('cmd');
  const history = [];
  let hpos = -1;

  // ---- output helpers -------------------------------------------------
  const esc = (s) => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  function out(html, cls) {
    const div = document.createElement('div');
    div.className = 'line' + (cls ? ' ' + cls : '');
    div.innerHTML = html;
    screen.appendChild(div);
    screen.scrollTop = screen.scrollHeight;
    return div;
  }
  const blank = () => out('&nbsp;');
  const rule = () => out('<span class="rule">' + '─'.repeat(52) + '</span>');
  const link = (url, label) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label || url)}</a>`;
  const projUrl = (p) => p.url || (p.links && Object.values(p.links)[0]) || '';

  // ---- content renderers ----------------------------------------------
  function renderExperience(list) {
    list.forEach((j, i) => {
      out(`<span class="head">${esc(j.title)}</span> <span class="dim">@</span> <span class="bright">${esc(j.company)}</span>`);
      out(`<span class="dim">${esc(j.dates)}${j.location ? '  ·  ' + esc(j.location) : ''}</span>`);
      (j.bullets || []).forEach(b => out(`  <span class="tag">▸</span> ${esc(b)}`));
      if (i < list.length - 1) blank();
    });
  }
  function renderSkills() {
    Object.entries(DATA.skills).forEach(([group, items]) => {
      out(`<div class="two-col"><span class="head">${esc(group)}</span><span>${items.map(esc).join('<span class="dim">, </span>')}</span></div>`);
    });
  }
  function renderProjects() {
    DATA.projects.forEach((p, i) => {
      out(`<span class="head">${esc(p.name)}</span>  <span class="dim">[${(p.tech || []).map(esc).join(', ')}]</span>`);
      out(`  ${esc(p.description || p.desc || '')}`);
      const _u = projUrl(p);
      if (_u) out(`  <span class="dim">↳</span> ${link(_u)}   <span class="dim">(try:</span> <span class="amber">open ${esc(p.name)}</span><span class="dim">)</span>`);
      if (i < DATA.projects.length - 1) blank();
    });
  }
  function renderContact() {
    const c = DATA.contact;
    if (c.email) out(`<div class="two-col"><span class="tag">email</span>${link('mailto:' + c.email, c.email)}</div>`);
    if (c.github) out(`<div class="two-col"><span class="tag">github</span>${link(c.github)}</div>`);
    if (c.linkedin) out(`<div class="two-col"><span class="tag">linkedin</span>${link(c.linkedin)}</div>`);
    if (c.website) out(`<div class="two-col"><span class="tag">web</span>${link(c.website)}</div>`);
  }

  // ---- commands --------------------------------------------------------
  const commands = {
    help: {
      desc: 'list available commands',
      run() {
        out('<span class="head">available commands</span>');
        rule();
        Object.keys(commands).sort().forEach(name => {
          out(`<div class="two-col"><span class="amber">${name}</span><span class="dim">${esc(commands[name].desc)}</span></div>`);
        });
        blank();
        out('<span class="dim">flags example:</span> <span class="amber">resume --list-experience --most-recent</span>');
        out('<span class="dim">tip: use ↑/↓ for history,</span> <span class="amber">clear</span> <span class="dim">to wipe the screen.</span>');
      },
    },
    about: {
      desc: 'who is this',
      run() {
        out(`<span class="head">${esc(DATA.name)}</span> <span class="dim">—</span> <span class="bright">${esc(DATA.role)}</span>  <span class="dim">${esc(DATA.location)}</span>`);
        blank();
        out(esc(DATA.tagline));
        blank();
        DATA.summary.forEach(l => out('<span class="dim">' + esc(l) + '</span>'));
      },
    },
    resume: {
      desc: 'the résumé. try: resume --help',
      run(flags) {
        const has = (...f) => f.some(x => flags.has(x));
        if (has('help', 'h')) {
          out('<span class="head">usage:</span> resume [flags]');
          [['--summary', 'the elevator pitch'],
           ['--list-experience, -e', 'work history'],
           ['   --most-recent, -r', '   (with -e) only the latest role'],
           ['--skills', 'the tech stack'],
           ['--education', 'schooling / certs'],
           ['--all', 'everything, top to bottom'],
           ['--download', 'grab the PDF']].forEach(([f, d]) =>
            out(`<div class="two-col"><span class="amber">${esc(f)}</span><span class="dim">${esc(d)}</span></div>`));
          return;
        }
        let shown = false;
        const all = has('all');
        if (all || has('summary')) { commands.about.run(); shown = true; }
        if (all || has('list-experience', 'e', 'experience')) {
          if (shown) { blank(); rule(); }
          out('<span class="head">EXPERIENCE</span>');
          const recent = has('most-recent', 'r');
          renderExperience(recent ? DATA.experience.slice(0, 1) : DATA.experience);
          shown = true;
        }
        if (all || has('skills')) { if (shown) { blank(); rule(); } out('<span class="head">SKILLS</span>'); renderSkills(); shown = true; }
        if (all || has('education')) { if (shown) { blank(); rule(); } out('<span class="head">EDUCATION</span>'); DATA.education.forEach(e => out(`${esc(e.detail)} <span class="dim">— ${esc(e.school)} (${esc(e.dates)})</span>`)); shown = true; }
        if (has('download')) { commands.download.run(); shown = true; }
        if (!shown) {
          commands.about.run(); blank();
          out('<span class="dim">this is the short version.</span> <span class="amber">resume --help</span> <span class="dim">for the full menu, or:</span>');
          out('  <span class="amber">resume --list-experience</span><span class="dim">,</span> <span class="amber">resume --skills</span><span class="dim">,</span> <span class="amber">resume --download</span>');
        }
      },
    },
    experience: { desc: 'work history (= resume -e)', run() { out('<span class="head">EXPERIENCE</span>'); renderExperience(DATA.experience); } },
    skills: { desc: 'the tech stack', run() { out('<span class="head">SKILLS</span>'); renderSkills(); } },
    projects: { desc: 'things I have built', run() { out('<span class="head">PROJECTS</span>'); renderProjects(); } },
    contact: { desc: 'how to reach me', run() { out('<span class="head">CONTACT</span>'); renderContact(); } },
    education: { desc: 'schooling / certs', run() { out('<span class="head">EDUCATION</span>'); DATA.education.forEach(e => out(`${esc(e.detail)} <span class="dim">— ${esc(e.school)} (${esc(e.dates)})</span>`)); } },
    open: {
      desc: 'open a link: open portfolio | github | linkedin | <project>',
      run(flags, args) {
        const target = (args[0] || '').toLowerCase();
        const map = {
          portfolio: DATA.contact.github, github: DATA.contact.github,
          linkedin: DATA.contact.linkedin, web: DATA.contact.website, website: DATA.contact.website,
        };
        let url = map[target];
        if (!url) { const p = DATA.projects.find(p => p.name.toLowerCase() === target); if (p) url = projUrl(p); }
        if (!target) { out('<span class="err">open what?</span> try: <span class="amber">open portfolio</span>, <span class="amber">open linkedin</span>, or <span class="amber">open ' + esc((DATA.projects[0] || {}).name || 'project') + '</span>'); return; }
        if (!url) { out(`<span class="err">nothing to open for "${esc(target)}".</span>`); return; }
        out(`<span class="dim">opening</span> ${link(url)} <span class="dim">in a new window…</span>`);
        window.open(url, '_blank', 'noopener');
      },
    },
    download: {
      desc: 'download the PDF résumé',
      run() {
        out(`<span class="dim">downloading</span> ${esc(DATA.resumePdf)} <span class="dim">…</span> <span class="dim">(if nothing happens, the PDF isn\'t added yet)</span>`);
        const a = document.createElement('a'); a.href = DATA.resumePdf; a.download = ''; document.body.appendChild(a); a.click(); a.remove();
      },
    },
    ls: { desc: 'alias for help', run() { commands.help.run(); } },
    clear: { desc: 'clear the screen', run() { screen.innerHTML = ''; } },
    whoami: { desc: 'existential', run() { out('<span class="dim">a hiring manager with good taste, hopefully.</span>'); } },
    sudo: { desc: '', run(flags, args) { out(`<span class="err">${esc(DATA.name.split(' ')[0])} is not in the sudoers file. This incident will be reported.</span> <span class="dim">😉</span>`); } },
  };

  // ---- command execution ----------------------------------------------
  function run(raw) {
    const line = raw.trim();
    out(`<span class="ps1 dim">${document.getElementById('ps1').textContent}</span> ${esc(line)}`, 'input-echo');
    if (!line) return;
    const tokens = line.split(/\s+/);
    const name = tokens[0].toLowerCase();
    const flags = new Set(tokens.slice(1).filter(t => t.startsWith('-')).map(t => t.replace(/^-+/, '').toLowerCase()));
    const args = tokens.slice(1).filter(t => !t.startsWith('-'));
    const cmd = commands[name];
    if (!cmd) { out(`<span class="err">command not found: ${esc(name)}</span> — type <span class="amber">help</span>`); return; }
    try { cmd.run(flags, args); } catch (e) { out('<span class="err">error: ' + esc(e.message) + '</span>'); }
  }

  // ---- boot sequence ---------------------------------------------------
  const boot = [
    ['<span class="dim">booting tjOS v1.0 …</span>', 120],
    ['<span class="dim">loading profile … <span class="bright">ok</span></span>', 160],
    ['<span class="dim">mounting /experience … <span class="bright">ok</span></span>', 140],
    ['&nbsp;', 80],
    [`<span class="head ascii">  _____ _  __  _    _      _     _       </span>`, 10],
    [`<span class="head ascii"> |_   _| || | | |  | |    | |   | |      </span>`, 10],
    [`<span class="head ascii">   | | | || |_| |  | | ___| | __| |_   _ </span>`, 10],
    [`<span class="head ascii">   | | |__   _| |/\\| |/ _ \\ |/ _\` | | | |</span>`, 10],
    [`<span class="head ascii">   | |    | | \\  /\\  /  __/ | (_| | |_| |</span>`, 10],
    [`<span class="head ascii">   |_|    |_|  \\/  \\/ \\___|_|\\__,_|\\__, |</span>`, 10],
    [`<span class="head ascii">                                    __/ |</span>`, 10],
    [`<span class="head ascii">                                   |___/ </span>`, 40],
    ['&nbsp;', 60],
    [`<span class="bright">${DATA.name}</span> <span class="dim">·</span> ${DATA.role}`, 60],
    ['<span class="dim">Interactive résumé & portfolio.</span>', 40],
    ['&nbsp;', 40],
    ['Type <span class="amber">help</span> to see what you can do.', 0],
  ];
  let bi = 0;
  (function playBoot() {
    if (bi >= boot.length) { input.focus(); return; }
    const [html, delay] = boot[bi++];
    out(html);
    setTimeout(playBoot, delay);
  })();

  // ---- input handling --------------------------------------------------
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value;
    if (v.trim()) { history.push(v); hpos = history.length; }
    input.value = '';
    run(v);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') { if (hpos > 0) { hpos--; input.value = history[hpos]; } e.preventDefault(); }
    else if (e.key === 'ArrowDown') { if (hpos < history.length - 1) { hpos++; input.value = history[hpos]; } else { hpos = history.length; input.value = ''; } e.preventDefault(); }
    else if (e.key === 'l' && e.ctrlKey) { screen.innerHTML = ''; e.preventDefault(); }
  });
  document.addEventListener('click', () => input.focus());
})();
