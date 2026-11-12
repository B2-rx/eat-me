/* Eat Me : navigation, transitions, animation d'entrée, visionneuse, contenus */
(() => {
  const C = window.EATME;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calme = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const page = document.body.dataset.page;
  const nav = (href, txt, id) => `<a href="${href}"${id === page ? ' aria-current="page"' : ""}>${txt}</a>`;

  /* 1. En-tête, pied de page, bouton d'appel flottant (un seul endroit pour toutes les pages) */
  document.body.insertAdjacentHTML("afterbegin",
    `<a class="skip" href="#contenu">Aller au contenu</a>
     <header class="top"><a class="logo" href="index.html">Eat Me</a>
       <nav aria-label="Navigation principale">${nav("index.html", "Accueil", "accueil")}${nav("recrutement.html", "Recrutement", "recrutement")}${nav("evenement.html", "Événement", "evenement")}</nav>
     </header>`);
  document.body.insertAdjacentHTML("beforeend",
    `<footer class="pied"><div class="wrap">
       <p class="logo">Eat Me</p>
       <p>${C.adresse}<br>${C.ville}</p>
       <p><a href="tel:${C.tel}">${C.telAffiche}</a> · <a href="${C.tiktok}" target="_blank" rel="noopener">TikTok</a> · <a href="${C.maps}" target="_blank" rel="noopener">Google Maps</a></p>
       <p class="petit"><a href="mentions-legales.html">Mentions légales</a> · <a href="confidentialite.html">Confidentialité</a></p>
     </div></footer>
     <a class="fab cache" href="tel:${C.tel}" aria-label="Appeler Eat Me au ${C.telAffiche}">Appeler</a>`);

  /* L'en-tête devient plein après le haut de page */
  const top = $(".top");
  const onScroll = () => top.classList.toggle("plein", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* 2. Transitions de pages en fondu */
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]");
    if (!a || calme || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname === location.pathname || a.hasAttribute("download")) return;
    e.preventDefault();
    document.body.classList.add("sortie");
    setTimeout(() => (location.href = u.href), 320);
  });
  addEventListener("pageshow", e => e.persisted && document.body.classList.remove("sortie"));

  /* 3. Animation d'entrée : le texte se dissout, l'image s'ouvre depuis son centre */
  const intro = $("#intro");
  if (intro) {
    const fin = () => {
      intro.remove();
      document.documentElement.classList.remove("intro-on");
      try { sessionStorage.setItem("eatme-intro", "1"); } catch (e) {}
    };
    if (!document.documentElement.classList.contains("intro-on")) fin();
    else {
      const t = [];
      t.push(setTimeout(() => intro.classList.add("in"), 100));
      t.push(setTimeout(() => intro.classList.add("morph"), 1800));
      t.push(setTimeout(() => intro.classList.add("done"), 4000));
      t.push(setTimeout(fin, 4800));
      const passer = () => { t.forEach(clearTimeout); intro.classList.add("done"); setTimeout(fin, 400); };
      $(".intro-skip").addEventListener("click", passer);
      addEventListener("keydown", e => e.key === "Escape" && passer());
    }
  }

  /* 4. Apparition douce au défilement (contenu visible sans JavaScript) */
  if ("IntersectionObserver" in window && !calme) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("vu"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    $$(".reveal").forEach(el => io.observe(el));
  } else $$(".reveal").forEach(el => el.classList.add("vu"));

  /* 5. Visionneuse : zoom au clic sur toute image [data-zoom] */
  const dlg = document.createElement("dialog");
  dlg.className = "visionneuse";
  dlg.innerHTML = `<button type="button" class="fermer" aria-label="Fermer l'image">Fermer</button><img alt="">`;
  document.body.append(dlg);
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-zoom]");
    if (b) {
      const img = $("img", dlg);
      img.src = b.dataset.zoom; img.alt = b.dataset.alt || "";
      dlg.showModal();
    } else if (e.target === dlg || e.target.closest(".fermer")) dlg.close();
  });

  /* 6. Galerie : flèches sous la rangée, visibles seulement si elle déborde */
  $$(".galerie").forEach(g => {
    const rang = $(".rang", g), fl = $(".fleches", g);
    const maj = () => (fl.hidden = rang.scrollWidth <= rang.clientWidth + 4);
    maj(); addEventListener("resize", maj);
    $$("button", fl).forEach((b, i) => b.addEventListener("click", () =>
      rang.scrollBy({ left: (i ? 1 : -1) * rang.clientWidth * 0.8, behavior: calme ? "auto" : "smooth" })));
  });

  /* 7. Contenus pilotés par site-config.js */
  const li = a => a.map(x => `<li>${x}</li>`).join("");
  const rec = $("#recrutement");
  if (rec) {
    const r = C.recrutement;
    $("h1").textContent = r.recrute ? "Rejoindre l'équipe Eat Me" : "Recrutement";
    rec.innerHTML = r.recrute
      ? `<p class="chapo">${r.poste}</p><p>${r.intro}</p>
         <h2>Vos missions</h2><ul class="liste">${li(r.missions)}</ul>
         <h2>Le profil recherché</h2><ul class="liste">${li(r.profil)}</ul><p>${r.note}</p>
         <h2>Ce que nous offrons</h2><ul class="liste">${li(r.offre)}</ul>
         <h2>Comment postuler</h2><p>${r.postuler}</p>
         <p><a class="btn" data-cta href="mailto:${C.email}">Envoyer ma candidature</a></p>
         <p class="petit">${C.email} · <a href="tel:${C.tel}">${C.telAffiche}</a><br>${C.adresse}</p>`
      : `<h2>${r.messageFerme.titre}</h2><p>${r.messageFerme.texte}</p>
         <p><a class="btn" data-cta href="${C.tiktok}" target="_blank" rel="noopener">Nous suivre sur TikTok</a></p>`;
    $$("[data-si-recrute]").forEach(el => (el.hidden = !r.recrute));
  }
  const ev = $("#evenement");
  if (ev) {
    const e = C.evenement;
    ev.innerHTML = `<p class="chapo">${e.accroche}</p>${e.dates ? `<p class="petit">${e.dates}</p>` : ""}${e.texte.map(t => `<p>${t}</p>`).join("")}
      <p><a class="btn" data-cta href="tel:${C.tel}">Se renseigner par téléphone</a></p>`;
  }
  $$("[data-tel]").forEach(a => (a.href = "tel:" + C.tel));
  $$("[data-num]").forEach(s => (s.textContent = C.telAffiche));
  $$("[data-adresse]").forEach(s => (s.innerHTML = C.adresse + "<br>" + C.ville));
  $$("[data-maps]").forEach(a => (a.href = C.maps));
  $$("[data-tiktok]").forEach(a => (a.href = C.tiktok));
  /* 7 bis. Recrutement : la vidéo d'ouverture se lance seule, sans le son (règle des navigateurs) */
  const ouv = $("#ouverture");
  if (ouv && !ouv.hidden) {
    const [fond, vid] = $$("video", ouv);
    const son = $(".ouv-son", ouv), rejouer = $(".ouv-rejouer", ouv), lancer = $(".ouv-lancer", ouv);
    const jouer = () => {
      rejouer.hidden = lancer.hidden = true;
      fond.currentTime = vid.currentTime = 0;
      return Promise.all([vid.play(), fond.play()]).catch(() => (lancer.hidden = false));   // lecture refusée : bouton de secours
    };
    vid.addEventListener("ended", () => (rejouer.hidden = false));
    son.addEventListener("click", () => {
      vid.muted = !vid.muted;
      son.setAttribute("aria-pressed", String(!vid.muted));
      son.textContent = vid.muted ? "Activer le son" : "Couper le son";
    });
    rejouer.addEventListener("click", jouer);
    lancer.addEventListener("click", jouer);
    if (calme) lancer.hidden = false; else jouer();   // animations réduites : pas de lecture automatique
  }

  /* 8. Le bouton flottant se cache quand un bouton principal [data-cta] est visible (après injection des contenus) */
  const fab = $(".fab"), ctas = $$("[data-cta]");
  if ("IntersectionObserver" in window && ctas.length) {
    const vus = new Set();
    const io = new IntersectionObserver(es => {
      es.forEach(e => e.isIntersecting ? vus.add(e.target) : vus.delete(e.target));
      fab.classList.toggle("cache", vus.size > 0);
    });
    ctas.forEach(c => io.observe(c));
  } else fab.classList.remove("cache");

})();
