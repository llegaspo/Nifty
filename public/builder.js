(() => {
  const frame = document.getElementById("preview-frame");
  const btnDownload = document.getElementById("btn-download");
  const btnReset = document.getElementById("btn-reset");

  const els = {
    heroBadge: document.getElementById("hero-badge"),
    heroTitle: document.getElementById("hero-title"),
    heroSubtitle: document.getElementById("hero-subtitle"),
    scrubVh: document.getElementById("scrub-vh"),
    scrubVhLabel: document.getElementById("scrub-vh-label"),
    landingTitle: document.getElementById("landing-title"),
    landingLede: document.getElementById("landing-lede"),
    btnPrimaryText: document.getElementById("btn-primary-text"),
    btnPrimaryHref: document.getElementById("btn-primary-href"),
    btnGhostText: document.getElementById("btn-ghost-text"),
    btnGhostHref: document.getElementById("btn-ghost-href"),
    colorGreen: document.getElementById("color-green"),
    colorGreen2: document.getElementById("color-green-2"),
  };

  const defaults = {
    heroBadge: els.heroBadge?.value ?? "",
    heroTitle: els.heroTitle?.value ?? "",
    heroSubtitle: els.heroSubtitle?.value ?? "",
    scrubVh: Number(els.scrubVh?.value ?? 320),
    landingTitle: els.landingTitle?.value ?? "",
    landingLede: els.landingLede?.value ?? "",
    btnPrimaryText: els.btnPrimaryText?.value ?? "",
    btnPrimaryHref: els.btnPrimaryHref?.value ?? "",
    btnGhostText: els.btnGhostText?.value ?? "",
    btnGhostHref: els.btnGhostHref?.value ?? "",
    colorGreen: els.colorGreen?.value ?? "#16ff9a",
    colorGreen2: els.colorGreen2?.value ?? "#00d084",
  };

  /** @type {Document | null} */
  let doc = null;

  const q = (sel) => doc?.querySelector(sel) ?? null;

  const setText = (sel, value) => {
    const node = q(sel);
    if (!node) return;
    node.textContent = value;
  };

  const setHref = (sel, href) => {
    const a = q(sel);
    if (!a) return;
    a.setAttribute("href", href);
  };

  const setVar = (name, value) => {
    if (!doc) return;
    doc.documentElement.style.setProperty(name, value);
  };

  const applyAll = () => {
    if (!doc) return;

    // Hero
    setText(".hero-badge", els.heroBadge.value);

    // Preserve the accent span by editing the whole h1 text carefully.
    const heroH1 = q(".hero-title");
    if (heroH1) {
      // If it has an .accent span, keep it and set surrounding text.
      const accent = heroH1.querySelector(".accent");
      if (accent) {
        // Basic strategy: split on the accent text placeholder if present.
        // If user types "Get Nifty" somewhere, we still keep the span at the end.
        const raw = els.heroTitle.value.trim();
        // Put everything before last word-group into text node, and keep accent content as last phrase.
        // If user includes a dot-separated title, we just set full text and keep span at end.
        const fallbackAccent = accent.textContent || "Get Nifty";
        const last = raw.split(/\s+/).slice(-2).join(" ").trim();
        const accentText =
          raw.toLowerCase().includes("nifty") ? raw : fallbackAccent;
        const before =
          raw.toLowerCase().includes("nifty") ? raw.replace(/get\s+nifty\.?/i, "").trim() : raw;

        // Clear and rebuild: [beforeText + space] + <span class="accent">...</span>
        heroH1.textContent = "";
        const beforeNode = doc.createTextNode(before ? `${before} ` : "");
        heroH1.appendChild(beforeNode);
        accent.textContent = accentText || last || fallbackAccent;
        heroH1.appendChild(accent);
      } else {
        heroH1.textContent = els.heroTitle.value;
      }
    }

    setText(".hero-subtitle", els.heroSubtitle.value);

    // Landing
    const landingH2 = q(".landing-title");
    if (landingH2) {
      const accent = landingH2.querySelector(".accent");
      if (accent) {
        const raw = els.landingTitle.value.trim();
        landingH2.textContent = "";
        // Keep accent span but set everything as plain text with accent at end if user included it.
        const before = raw.replace(/\bfeels\s+alive\.?/i, "").trim();
        landingH2.appendChild(doc.createTextNode(before ? `${before} ` : raw ? `${raw} ` : ""));
        accent.textContent = "feels alive";
        landingH2.appendChild(accent);
        landingH2.appendChild(doc.createTextNode(raw.endsWith(".") ? "" : "."));
      } else {
        landingH2.textContent = els.landingTitle.value;
      }
    }
    setText(".landing-lede", els.landingLede.value);

    // Buttons
    const primary = q(".btn.btn-primary");
    if (primary) primary.textContent = els.btnPrimaryText.value;
    setHref(".btn.btn-primary", els.btnPrimaryHref.value);

    const ghost = q(".btn.btn-ghost");
    if (ghost) ghost.textContent = els.btnGhostText.value;
    setHref(".btn.btn-ghost", els.btnGhostHref.value);

    // Theme + runway
    const vh = Number(els.scrubVh.value || defaults.scrubVh);
    setVar("--scrub-runway", `${vh}vh`);
    setVar("--green", els.colorGreen.value);
    setVar("--green-2", els.colorGreen2.value);

    if (els.scrubVhLabel) els.scrubVhLabel.textContent = `${vh}vh`;
  };

  const connectInputs = () => {
    const onAnyInput = () => applyAll();

    Object.values(els).forEach((el) => {
      if (!el) return;
      el.addEventListener("input", onAnyInput);
      el.addEventListener("change", onAnyInput);
    });
  };

  const resetControls = () => {
    if (els.heroBadge) els.heroBadge.value = defaults.heroBadge;
    if (els.heroTitle) els.heroTitle.value = defaults.heroTitle;
    if (els.heroSubtitle) els.heroSubtitle.value = defaults.heroSubtitle;
    if (els.scrubVh) els.scrubVh.value = String(defaults.scrubVh);
    if (els.landingTitle) els.landingTitle.value = defaults.landingTitle;
    if (els.landingLede) els.landingLede.value = defaults.landingLede;
    if (els.btnPrimaryText) els.btnPrimaryText.value = defaults.btnPrimaryText;
    if (els.btnPrimaryHref) els.btnPrimaryHref.value = defaults.btnPrimaryHref;
    if (els.btnGhostText) els.btnGhostText.value = defaults.btnGhostText;
    if (els.btnGhostHref) els.btnGhostHref.value = defaults.btnGhostHref;
    if (els.colorGreen) els.colorGreen.value = defaults.colorGreen;
    if (els.colorGreen2) els.colorGreen2.value = defaults.colorGreen2;

    // Reload the iframe to restore original DOM and re-apply from defaults.
    if (frame) frame.src = frame.src;
  };

  const serializeIndexHtml = () => {
    if (!doc) return null;

    // Make sure relative links stay relative.
    // Keep DOCTYPE for a clean export.
    const doctype = "<!doctype html>\n";
    const html = doc.documentElement.outerHTML;
    return doctype + html + "\n";
  };

  const downloadTextFile = (filename, content) => {
    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2500);
  };

  const onDownload = () => {
    const html = serializeIndexHtml();
    if (!html) return;
    downloadTextFile("index.html", html);
  };

  frame?.addEventListener("load", () => {
    try {
      doc = frame.contentDocument;
    } catch {
      doc = null;
    }

    // If we can't access the iframe DOM, export can’t work.
    // This typically happens when opening via file:// in some browsers.
    if (!doc) return;

    applyAll();
  });

  btnDownload?.addEventListener("click", onDownload);
  btnReset?.addEventListener("click", resetControls);

  connectInputs();

  // Initial label.
  if (els.scrubVhLabel) els.scrubVhLabel.textContent = `${defaults.scrubVh}vh`;
})();


