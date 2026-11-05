// Accueil Synapsis : apparitions, scènes pilotées par le défilement (le fil, la fiche client),
// pilotage à onglets, assistant IA, bouton pause de la vidéo. Tout reste lisible sans JavaScript.
// Module lancé par HomeClient une fois la page affichée ; la fonction renvoyée défait tout
// (écouteurs, observateurs, minuteurs), pour la navigation entre pages et le double montage de React en développement.
export function initHome() {
	var SIG_AC = new AbortController(), SIG = SIG_AC.signal, dead = false, OBS = [], TIMERS = [];
	function IO(cb, o) { var x = new IntersectionObserver(cb, o); OBS.push(x); return x; }
	function later(f, ms) { var id = setTimeout(function () { if (!dead) f(); }, ms); TIMERS.push(id); return id; }
	function frame(f) { return requestAnimationFrame(function (t) { if (!dead) f(t); }); }

  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pinMQ = window.matchMedia("(min-width: 960px) and (min-height: 620px)");
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  var nf = new Intl.NumberFormat("fr-FR");
  function fmt(v, dec) { return nf.format(dec ? Math.round(v * 10) / 10 : Math.round(v)).replace(/\s/g, " "); }
  // .pin : scènes épinglées sur ordinateur ; .pinx : la piste horizontale du fil (ordinateur et mobile)
  function setPin() { root.classList.toggle("pin", pinMQ.matches && !reduce); root.classList.toggle("pinx", !reduce && window.innerHeight >= 520); }
  setPin();

  // Titres mot à mot
  function split(el, st) {
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.nodeValue.split(/(\s+)/).forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
          var s = document.createElement("span"); s.className = "w"; s.style.setProperty("--i", st.i++); s.textContent = p; frag.appendChild(s);
        });
        el.replaceChild(frag, n);
      } else if (n.nodeType === 1) {
        if (n.classList.contains("t2")) split(n, st);
        else { n.classList.add("w"); n.style.setProperty("--i", st.i++); }
      }
    });
  }
  $$("[data-words]").forEach(function (el) { split(el, { i: 0 }); });

  // Compteurs et barres
  function countUp(el) {
    var to = parseFloat(el.dataset.count), dec = el.dataset.dec === "1", suf = el.dataset.suf || "";
    if (reduce) { el.textContent = fmt(to, dec) + suf; return; }
    var t0 = performance.now(), dur = 1100;
    (function step(t) {
      var k = clamp((t - t0) / dur, 0, 1), e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(to * e, dec) + suf;
      if (k < 1) frame(step);
    })(t0);
  }
  function animatePanel(p) {
    $$("[data-count]", p).forEach(countUp);
    $$("[data-w]", p).forEach(function (b) { b.style.transition = "none"; b.style.width = "0"; void b.offsetWidth; b.style.transition = ""; b.style.width = b.dataset.w + "%"; });
    var ch = $(".chart", p); if (ch) { ch.classList.remove("in"); void ch.offsetWidth; ch.classList.add("in"); }
  }

  // Apparitions au défilement
  var seen = IO(function (en) {
    en.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in"); seen.unobserve(e.target);
      if (e.target.id === "phases") e.target.classList.add("in");
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
  $$("[data-words], .rv, #phases").forEach(function (el) { seen.observe(el); });

  // « Vous vous reconnaissez ? » : chaque ligne se coche en entrant à l'écran
  var cks = $$(".ck");
  var ckIO = IO(function (en) {
    en.forEach(function (e) {
      if (!e.isIntersecting) return;
      var i = cks.indexOf(e.target);
      later(function () { e.target.classList.add("on"); }, reduce ? 0 : 120 + i * 90);
      ckIO.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -25% 0px", threshold: 0.6 });
  cks.forEach(function (c) { ckIO.observe(c); });

  // Courbe lisse passant par chaque point (Catmull-Rom centripète : pas de débordement)
  function smooth(P) {
    var d = "M" + P[0][0].toFixed(1) + " " + P[0][1].toFixed(1);
    function dist(a, b) { return Math.pow(Math.hypot(b[0] - a[0], b[1] - a[1]), 0.5); }
    for (var i = 0; i < P.length - 1; i++) {
      var p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
      var d1 = dist(p0, p1), d2 = dist(p1, p2), d3 = dist(p2, p3), b1, b2;
      if (d2 < 1e-6) continue;
      if (d1 < 1e-6) b1 = [p1[0] + (p2[0] - p1[0]) / 3, p1[1] + (p2[1] - p1[1]) / 3];
      else { var A = 2 * d1 * d1 + 3 * d1 * d2 + d2 * d2, B = 3 * d1 * (d1 + d2); b1 = [(d1 * d1 * p2[0] - d2 * d2 * p0[0] + A * p1[0]) / B, (d1 * d1 * p2[1] - d2 * d2 * p0[1] + A * p1[1]) / B]; }
      if (d3 < 1e-6) b2 = [p2[0] - (p2[0] - p1[0]) / 3, p2[1] - (p2[1] - p1[1]) / 3];
      else { var C = 2 * d3 * d3 + 3 * d3 * d2 + d2 * d2, D = 3 * d3 * (d3 + d2); b2 = [(d3 * d3 * p1[0] - d2 * d2 * p3[0] + C * p2[0]) / D, (d3 * d3 * p1[1] - d2 * d2 * p3[1] + C * p2[1]) / D]; }
      d += "C" + b1[0].toFixed(1) + " " + b1[1].toFixed(1) + " " + b2[0].toFixed(1) + " " + b2[1].toFixed(1) + " " + p2[0].toFixed(1) + " " + p2[1].toFixed(1);
    }
    return d;
  }

  // Progression d'une scène : épinglée sur ordinateur, au fil de la lecture sur mobile
  function prog(sec) {
    var r = sec.getBoundingClientRect(), vh = window.innerHeight;
    if (root.classList.contains("pin")) return clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
    return clamp((vh * 0.78 - r.top) / Math.max(1, r.height), 0, 1);
  }

  // ===== Le fil : la piste défile vers la droite pendant qu'on descend =====
  var F = { sec: $("#fil"), vp: $("#trackVp"), track: $("#track"), svg: $("#curveSvg"), base: $("#cBase"), draw: $("#cDraw"), dot: $("#cDot"), evs: $$("#track .ev"), L: 0, nodeL: [], TW: 0, VW: 0, x0: 0 };
  function nearestL(samples, p) { var best = 0, bd = Infinity; samples.forEach(function (sm) { var dd = (sm[1] - p[0]) * (sm[1] - p[0]) + (sm[2] - p[1]) * (sm[2] - p[1]); if (dd < bd) { bd = dd; best = sm[0]; } }); return best; }
  function buildFil() {
    if (!F.track) return;
    var px = root.classList.contains("pinx"), n = F.evs.length, pts = [], nodes = [], W, H;
    F.track.style.transform = ""; F.track.style.width = "";
    F.evs.forEach(function (ev) { ev.style.left = ""; ev.style.top = ""; ev.classList.remove("up", "down"); });
    if (px) {
      var vw = F.vp.clientWidth, mob = vw < 640, gap = mob ? Math.max(230, vw * 0.7) : clamp(vw * 0.3, 340, 460), x0 = vw * 0.5;
      H = F.vp.clientHeight; var A = H * (mob ? 0.16 : 0.17);
      F.evs.forEach(function (ev, i) {
        var up = i % 2 === 1, x = x0 + i * gap, y = H / 2 + (up ? -A : A);
        ev.style.left = x + "px"; ev.style.top = y + "px"; ev.classList.add(up ? "up" : "down");
        nodes.push([x, y]);
      });
      W = x0 + (n - 1) * gap + vw * 0.9; F.TW = W; F.VW = vw; F.x0 = x0;
      pts = [[-60, H / 2 - A * 0.2], [x0 - gap * 0.55, H / 2 - A * 0.85]].concat(nodes, [[nodes[n - 1][0] + gap * 0.6, H / 2 - A], [W + 60, H / 2 + A * 0.3]]);
      F.track.style.width = W + "px";
    } else {
      var br = F.track.getBoundingClientRect();
      W = F.track.clientWidth; H = F.track.clientHeight;
      F.evs.forEach(function (ev) { var d = $(".ev-dot", ev).getBoundingClientRect(); nodes.push([d.left - br.left + d.width / 2, d.top - br.top + d.height / 2]); });
      pts = [[nodes[0][0], 0]].concat(nodes, [[nodes[n - 1][0], H]]);
    }
    F.svg.setAttribute("width", W); F.svg.setAttribute("height", H); F.svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    var d = smooth(pts); F.base.setAttribute("d", d); F.draw.setAttribute("d", d);
    F.L = F.draw.getTotalLength(); F.draw.style.strokeDasharray = F.L + " " + (F.L + 40);
    var samples = []; for (var s2 = 0; s2 <= F.L; s2 += 3) { var q = F.draw.getPointAtLength(s2); samples.push([s2, q.x, q.y]); }
    F.nodeL = nodes.map(function (p) { return nearestL(samples, p); });
    updFil();
  }
  function ease(t) { t = clamp((t - 0.16) / 0.68, 0, 1); return t * t * (3 - 2 * t); }   // le point marque une pause à chaque étape
  function updFil() {
    if (!F.L) return;
    var n = F.nodeL.length, len, px = root.classList.contains("pinx"), r = F.sec.getBoundingClientRect(), vh = window.innerHeight;
    if (reduce) len = F.L;
    else if (px) {
      var p = prog(F.sec), q = clamp((p - 0.04) / 0.88, 0, 1) * (n - 1), i = Math.min(n - 2, Math.floor(q)), t = q - i;
      len = F.nodeL[i] + (F.nodeL[i + 1] - F.nodeL[i]) * ease(t);
      if (r.top > vh * 0.35) len = F.nodeL[0] * clamp((vh - r.top) / (vh * 0.65), 0, 1);   // le fil arrive pendant que la section entre
    } else len = F.L * prog(F.sec);
    F.draw.style.strokeDashoffset = F.L - len;
    var hp = F.draw.getPointAtLength(Math.max(0.01, len));
    if (px) { var tx = clamp(F.x0 - hp.x, F.VW - F.TW, 0); F.track.style.transform = "translate3d(" + tx.toFixed(1) + "px,0,0)"; }
    F.dot.style.transform = "translate(" + hp.x.toFixed(1) + "px," + hp.y.toFixed(1) + "px)";
    F.dot.style.opacity = len > 2 ? 1 : 0;
    // la carte surgit juste avant que le point n'atteigne son étape
    F.evs.forEach(function (ev, k) { var seg = k ? F.nodeL[k] - F.nodeL[k - 1] : 60; ev.classList.toggle("on", len >= F.nodeL[k] - Math.min(70, seg * 0.14)); });
  }

  // ===== La fiche client =====
  var K = { sec: $("#fiche"), steps: $$("#ficheSteps li"), rows: $$("#ficheCard .fc-row"), tag: $("#ficheTag") };
  var TAGS = [["Prospect", ""], ["Prospect", ""], ["Devis envoyé", "warn"], ["Devis envoyé", "warn"], ["Client", "ok"], ["Client", "ok"], ["Payé", "ok"]];
  function setFiche(k) {
    K.rows.forEach(function (r, i) { r.classList.toggle("on", i <= k); });
    K.steps.forEach(function (s, i) { s.classList.toggle("done", i <= k); s.classList.toggle("cur", i === k); });
    var t = TAGS[clamp(k, 0, 6)];
    if (K.tag && K.tag.textContent !== t[0]) { K.tag.textContent = t[0]; K.tag.className = "chip " + t[1]; void K.tag.offsetWidth; K.tag.classList.add("pop"); }
  }
  function updFiche() {
    if (!K.sec) return;
    if (reduce) { setFiche(6); return; }
    if (root.classList.contains("pin")) setFiche(Math.floor(clamp((prog(K.sec) - 0.06) / 0.82, 0, 0.999) * 7));
    else {
      var vh = window.innerHeight, k = -1;
      K.rows.forEach(function (r, i) { if (r.getBoundingClientRect().top < vh * 0.82) k = i; });
      setFiche(k);
    }
  }

  // Une seule boucle pour tout ce qui suit le défilement
  var ticking = false;
  var pars = $$("[data-par]"), fw = $("#frameWrap");
  function updPar() {
    if (reduce) return;
    var vh = window.innerHeight;
    pars.forEach(function (el) { var r = el.parentNode.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; var c = r.top + r.height / 2 - vh / 2; el.style.transform = "translate3d(0," + (c * parseFloat(el.dataset.par)).toFixed(1) + "px,0)"; });
    if (fw) fw.style.setProperty("--hs", (0.94 + 0.06 * clamp(window.scrollY / (vh * 0.55), 0, 1)).toFixed(4));
  }
  function onScroll() { if (ticking) return; ticking = true; frame(function () { ticking = false; updFil(); updFiche(); updPar(); }); }
  window.addEventListener("scroll", onScroll, { passive: true, signal: SIG });
  var rz;
  function rebuild() { setPin(); buildFil(); updFiche(); updPar(); }
  window.addEventListener("resize", function () { clearTimeout(rz); rz = later(rebuild, 150); }, { signal: SIG });
  if (pinMQ.addEventListener) pinMQ.addEventListener("change", rebuild, { signal: SIG });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!dead) rebuild(); });
  window.addEventListener("load", rebuild, { signal: SIG });
  rebuild();

  // ===== Le pilotage : onglets (souris, clavier, défilement automatique quand on regarde) =====
  var tabs = $$('[role="tab"]'), panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });
  var cur = 0, userTook = false, tabsEl = $(".tabs"), shown = false;
  function show(p) { p.classList.remove("show"); void p.offsetWidth; p.classList.add("show"); animatePanel(p); }
  function select(i, focus) {
    cur = (i + tabs.length) % tabs.length;
    tabs.forEach(function (t, k) { var on = k === cur; t.setAttribute("aria-selected", on ? "true" : "false"); t.tabIndex = on ? 0 : -1; panels[k].hidden = !on; });
    show(panels[cur]);
    if (focus) tabs[cur].focus();
  }
  function stopAuto() { userTook = true; if (tabsEl) tabsEl.classList.remove("auto"); }
  tabs.forEach(function (t, k) {
    t.addEventListener("click", function () { stopAuto(); select(k); }, { signal: SIG });
    t.addEventListener("keydown", function (e) {
      var m = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (m) { e.preventDefault(); stopAuto(); select(cur + m, true); }
      else if (e.key === "Home") { e.preventDefault(); stopAuto(); select(0, true); }
      else if (e.key === "End") { e.preventDefault(); stopAuto(); select(tabs.length - 1, true); }
    }, { signal: SIG });
  });
  // L'onglet suivant arrive quand la barre sous l'onglet actif a fini de se remplir (en pause au survol)
  if (tabsEl) tabsEl.addEventListener("animationend", function (e) { if (e.animationName === "tabprog" && tabsEl.classList.contains("auto")) select(cur + 1); }, { signal: SIG });
  var dw = $("#dashWrap");
  if (dw && tabsEl) {
    var hold = function (on) { tabsEl.classList.toggle("hold", on); };
    [dw, tabsEl].forEach(function (el) {
      el.addEventListener("mouseenter", function () { hold(true); }, { signal: SIG }); el.addEventListener("mouseleave", function () { hold(false); }, { signal: SIG });
      el.addEventListener("focusin", function () { hold(true); }, { signal: SIG }); el.addEventListener("focusout", function () { hold(false); }, { signal: SIG });
    });
    IO(function (en) {
      var vis = en[0].isIntersecting;
      if (vis && !shown) { shown = true; show(panels[cur]); }
      tabsEl.classList.toggle("auto", vis && !userTook && !reduce);
    }, { threshold: 0.35 }).observe(dw);
  }

  // ===== L'assistant IA : il écrit, puis vous validez =====
  var ia = $("#iaCard"), msg = $("#iaMsg");
  if (ia && msg) {
    var text = msg.dataset.text || (msg.dataset.text = msg.textContent);
    if (!reduce) msg.textContent = "";
    IO(function (en, obs) {
      if (!en[0].isIntersecting) return;
      obs.disconnect();
      if (reduce) { ia.classList.add("done"); return; }
      var i = 0; ia.classList.add("typing");
      (function type() {
        msg.textContent = text.slice(0, ++i);
        if (i < text.length) later(type, text[i - 1] === "." || text[i - 1] === "?" ? 260 : 22);
        else {
          ia.classList.remove("typing");
          later(function () { ia.classList.add("press"); }, 900);
          later(function () { ia.classList.remove("press"); ia.classList.add("done"); }, 1250);
        }
      })();
    }, { threshold: 0.5 }).observe(ia);
  }

  // ===== Bouton pause de la vidéo =====
  var vp = $("#vidPause"), story = document.getElementById("story");
  if (vp && story) {
    if (reduce) vp.hidden = true;
    function setBtn(paused) { vp.classList.toggle("paused", paused); vp.setAttribute("aria-pressed", paused ? "true" : "false"); vp.setAttribute("aria-label", paused ? "Reprendre la vidéo" : "Mettre la vidéo en pause"); }
    vp.addEventListener("click", function () {
      var tl = story.__tl, A = story.__audio; if (!tl) return;
      story.__userPaused = !story.__userPaused;
      if (story.__userPaused) { tl.pause(); if (A && A.ctx) A.ctx.suspend(); }
      else { tl.play(); if (A && A.ctx && A.on) A.ctx.resume(); }
      setBtn(story.__userPaused);
    }, { signal: SIG });
    var sb = document.getElementById("fSound");
    if (sb) sb.addEventListener("click", function () { if (story.__userPaused) { story.__userPaused = false; setBtn(false); } }, { signal: SIG });
  }

  return function () {
    dead = true; SIG_AC.abort(); clearTimeout(rz);
    OBS.forEach(function (o) { o.disconnect(); }); TIMERS.forEach(clearTimeout);
    root.classList.remove("pin", "pinx");
  };
}
