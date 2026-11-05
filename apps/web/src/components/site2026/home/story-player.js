import { gsap } from "gsap";

// Vidéo d'accroche v3 « Qui fait le lien entre tous vos outils ? » (voix du 03/11 : Julien, Nadia, Pierre ; phrase de la scène 13 refaite le 05/11)
// Rythme slayte.io : un mot clé par écran, alternance clair / noir, objets d'interface qui jouent la scène.
// La voix (une seule prise ElevenLabs) est découpée en 18 phrases lues chacune à son repère ;
// certains silences sont allongés pour laisser l'image respirer. Fin : figé 5 s, noir 2 s, on reboucle.
// Module lancé par HomeClient ; la fonction renvoyée arrête la vidéo, coupe le son et défait les écouteurs.
export function initStory() {
	var SIG_AC = new AbortController(), SIG = SIG_AC.signal, dead = false, OBS = [], TIMERS = [];
	function IO(cb, o) { var x = new IntersectionObserver(cb, o); OBS.push(x); return x; }
	function later(f, ms) { var id = setTimeout(function () { if (!dead) f(); }, ms); TIMERS.push(id); return id; }
	function frame(f) { return requestAnimationFrame(function (t) { if (!dead) f(t); }); }

  var story = document.getElementById("story");
  if (!story || !story.classList.contains("vd")) return function () {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s) { return story.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(story.querySelectorAll(s)); }
  var NS = "http://www.w3.org/2000/svg";
  var bar = document.getElementById("storyBar"), nf0 = new Intl.NumberFormat("fr-FR");
  function fmt(n) { return nf0.format(Math.round(n)).replace(/\s/g, " "); }
  var tl = null, W = 0, H = 0;

  // ---------- La voix : [début, fin] de chaque phrase dans le fichier, et silence ajouté avant ----------
  var G = [[0.05, 1.85], [2.37, 2.87], [3.50, 4.46], [4.92, 8.09], [8.54, 10.57], [10.94, 13.30], [13.77, 15.96], [16.38, 22.59], [22.99, 27.82], [28.24, 33.10], [33.40, 36.42], [36.91, 43.83], [44.13, 51.91], [52.36, 56.54], [56.80, 59.69], [60.10, 66.33], [66.78, 72.01], [72.41, 77.75]];
  var PRE = [0.6, 0.9, 0, 0, 0, 0.55, 0.45, 0.35, 0, 0, 0.25, 0.5, 0.35, 0.35, 0.25, 0, 0.35, 0.25];
  var VT = [];
  G.forEach(function (g, i) { VT[i] = i ? VT[i - 1] + (g[0] - G[i - 1][0]) + PRE[i] : PRE[0]; });
  // Temps du fichier audio → temps de la vidéo
  function T(a) { var i = G.length - 1; while (i > 0 && a < G[i][0] - 0.001) i--; return VT[i] + (a - G[i][0]); }
  var VGROUPS = G;

  // ---------- Mots révélés un à un ----------
  function splitWords(el) {
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.nodeValue.split(/(\s+)/).forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
          var s = document.createElement("span"); s.className = "w"; s.textContent = p; frag.appendChild(s);
        });
        el.replaceChild(frag, n);
      } else if (n.nodeType === 1) splitWords(n);
    });
  }
  $$("[data-w]").forEach(function (el) { if (el.dataset.split) return; el.dataset.split = "1"; splitWords(el); });

  // ---------- Textes tapés, compteurs et états (recalculés à chaque image : on peut se déplacer dans la vidéo) ----------
  var TY = {
    p1: { el: $("#ptxt1"), txt: "Qui fait le lien entre tous vos outils ?", n: 0 },
    ai: { el: $("#aiMsg"), txt: "Julien n'a pas répondu à votre devis depuis 3 jours. J'ai préparé une relance. Je l'envoie ?", n: 0 }
  };
  var CN = { cal: { el: $("#calD"), v: 15, f: function (v) { return String(Math.round(v)); } }, pay: { el: $("#payN"), v: 0, f: function (v) { return "+" + fmt(Math.round(v / 10) * 10) + " €"; } } };
  var ST = { tag8: 0 }, tag8 = $("#tag8"), last = {};

  // ---------- Son : musique et bruitages fabriqués dans le navigateur (Web Audio), calés sur la ligne de temps ----------
  // Rien ne joue sans clic du visiteur. Chaque son est programmé ~150 ms à l'avance pour tomber pile sur l'image.
  var A = { ctx: null, on: false, sched: -1, master: null, conv: null, bed: null, noise: null, voice: null, loading: false }, S = null, AUD = [];
  var DIST = (function () { var n = 1024, a = new Float32Array(n); for (var i = 0; i < n; i++) a[i] = Math.tanh(2.5 * (i * 2 / n - 1)); return a; })();
  var PENTA = [1567.98, 1760, 2093, 2349.32, 2637.02, 3135.96];
  function graph(c) {
    A.master = c.createGain(); A.master.gain.value = 0.75;
    var comp = c.createDynamicsCompressor(); comp.threshold.value = -16; comp.knee.value = 12; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.25;
    A.master.connect(comp); comp.connect(c.destination);
    var len = Math.floor(c.sampleRate * 2.6), ir = c.createBuffer(2, len, c.sampleRate);
    for (var ch = 0; ch < 2; ch++) { var d = ir.getChannelData(ch); for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.8); }
    A.conv = c.createConvolver(); A.conv.buffer = ir; var rg = c.createGain(); rg.gain.value = 0.32; A.conv.connect(rg); A.bed = c.createGain(); A.bed.connect(A.master); rg.connect(A.bed); A.rev = rg;
    var nl = c.sampleRate * 2, nb = c.createBuffer(1, nl, c.sampleRate), nd = nb.getChannelData(0);
    for (var j = 0; j < nl; j++) nd[j] = Math.random() * 2 - 1;
    A.noise = nb;
  }
  // Une « session » par lecture : on la coupe d'un geste au redémarrage ou au changement de taille
  function newSession() {
    var c = A.ctx, t = c.currentTime;
    if (S) { var o = S; o.dry.gain.setTargetAtTime(0, t, 0.03); o.wet.gain.setTargetAtTime(0, t, 0.03); o.voice.gain.setTargetAtTime(0, t, 0.03); later(function () { try { o.dry.disconnect(); o.wet.disconnect(); o.voice.disconnect(); } catch (e) {} }, 400); }
    S = { dry: c.createGain(), wet: c.createGain(), voice: c.createGain() }; S.dry.connect(A.bed); S.wet.connect(A.conv); S.voice.gain.value = 0.95; S.voice.connect(A.master);
    A.bed.gain.cancelScheduledValues(t); A.bed.gain.setValueAtTime(1, t);
  }
  function out(n, d, wt) {
    var c = A.ctx;
    if (d) { var g = c.createGain(); g.gain.value = d; n.connect(g); g.connect(S.dry); }
    if (wt) { var h = c.createGain(); h.gain.value = wt; n.connect(h); h.connect(S.wet); }
  }
  function os(type, f, w, dur) { var o = A.ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, w); o.start(w); o.stop(w + dur); return o; }
  function nz(w, dur) { var s = A.ctx.createBufferSource(); s.buffer = A.noise; s.loop = true; s.start(w, (w * 0.37) % 1.5); s.stop(w + dur + 0.02); return s; }
  function perc(w, v, a, d) { var g = A.ctx.createGain(); g.gain.setValueAtTime(0.0001, w); g.gain.exponentialRampToValueAtTime(v, w + a); g.gain.exponentialRampToValueAtTime(0.0001, w + a + d); return g; }
  function filt(type, f, q) { var b = A.ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; if (q) b.Q.value = q; return b; }
  // Nappe : deux oscillateurs désaccordés par note, filtre passe-bas qui peut s'ouvrir
  function pad(fs, w, dur, o) {
    var c = A.ctx, v = o.vol, at = o.att, rl = o.rel;
    if (at + rl > dur) { var k = dur / (at + rl); at *= k; rl *= k; }
    var f = c.createBiquadFilter(); f.type = "lowpass"; f.Q.value = 0.6; f.frequency.setValueAtTime(o.cut, w);
    if (o.cut2) f.frequency.exponentialRampToValueAtTime(o.cut2, w + dur);
    var g = c.createGain(); g.gain.setValueAtTime(0, w); g.gain.linearRampToValueAtTime(v, w + at); g.gain.setValueAtTime(v, w + dur - rl); g.gain.linearRampToValueAtTime(0, w + dur);
    f.connect(g); out(g, 1, o.wet == null ? 0.5 : o.wet);
    fs.forEach(function (fr) { [-1, 1].forEach(function (s) { var x = os(o.type || "sawtooth", fr, w, dur + 0.05); x.detune.value = s * (o.det || 6); x.connect(f); }); });
  }
  function bass(f, w, dur, v) {
    var c = A.ctx, o = os("sine", f, w, dur + 0.05), o2 = os("triangle", f * 2, w, dur + 0.05), h = c.createGain(); h.gain.value = 0.22; o2.connect(h);
    var g = c.createGain(); g.gain.setValueAtTime(0, w); g.gain.linearRampToValueAtTime(v, w + 0.03); g.gain.setValueAtTime(v, Math.max(w + 0.03, w + dur - 0.15)); g.gain.linearRampToValueAtTime(0, w + dur);
    o.connect(g); h.connect(g); out(g, 1, 0);
  }
  function thump(w, v, f0, f1) { var o = os("sine", f0 || 95, w, 0.5); o.frequency.exponentialRampToValueAtTime(f1 || 42, w + 0.15); var g = perc(w, v, 0.005, 0.4); o.connect(g); out(g, 1, 0.06); }
  function pluck(f, w, v, dec) {
    dec = dec || 0.9; var g = perc(w, v, 0.004, dec); out(g, 1, 0.45);
    [[1, 1], [2, 0.25], [3, 0.08]].forEach(function (p) { var o = os("sine", f * p[0], w, dec + 0.05), h = A.ctx.createGain(); h.gain.value = p[1]; o.connect(h); h.connect(g); });
  }
  function bell(f, w, v, dec) {
    dec = dec || 2;
    [[1, 1, 1], [2.76, 0.45, 0.6], [5.4, 0.22, 0.4], [8.93, 0.1, 0.25]].forEach(function (p) { var o = os("sine", f * p[0], w, dec * p[2] + 0.05), g = perc(w, v * p[1], 0.003, dec * p[2]); o.connect(g); out(g, 1, 0.6); });
  }
  function shimmer(w, v) { for (var i = 0; i < 6; i++) bell(PENTA[(i * 7) % 6], w + i * 0.035, v * (1 - i * 0.12), 0.9); }
  function notif(w, f, v, r) { pluck(f, w, v, 0.35); pluck(f * (r || 1.335), w + 0.075, v * 0.85, 0.45); }
  function whoosh(w, dur, v, f0, f1, p0, p1) {
    var c = A.ctx, n = nz(w, dur), bp = filt("bandpass", f0, 0.8);
    bp.frequency.setValueAtTime(f0, w); bp.frequency.exponentialRampToValueAtTime(f1, w + dur);
    var g = c.createGain(); g.gain.setValueAtTime(0, w); g.gain.linearRampToValueAtTime(v, w + dur * 0.6); g.gain.linearRampToValueAtTime(0, w + dur);
    n.connect(bp); bp.connect(g);
    if (c.createStereoPanner) { var pn = c.createStereoPanner(); pn.pan.setValueAtTime(p0 == null ? 0.5 : p0, w); pn.pan.linearRampToValueAtTime(p1 == null ? -0.5 : p1, w + dur); g.connect(pn); out(pn, 1, 0.3); }
    else out(g, 1, 0.3);
  }
  function riser(w, dur, v) {
    var c = A.ctx, n = nz(w, dur), bp = filt("bandpass", 300, 1.4);
    bp.frequency.setValueAtTime(300, w); bp.frequency.exponentialRampToValueAtTime(6000, w + dur);
    var g = c.createGain(); g.gain.setValueAtTime(0.0001, w); g.gain.exponentialRampToValueAtTime(v, w + dur - 0.015); g.gain.linearRampToValueAtTime(0, w + dur);
    n.connect(bp); bp.connect(g); out(g, 1, 0.25);
    var o = os("sine", 160, w, dur + 0.02); o.frequency.exponentialRampToValueAtTime(880, w + dur);
    var g2 = c.createGain(); g2.gain.setValueAtTime(0.0001, w); g2.gain.exponentialRampToValueAtTime(v * 0.35, w + dur - 0.015); g2.gain.linearRampToValueAtTime(0, w + dur);
    o.connect(g2); out(g2, 1, 0.25);
  }
  function tick(w, v, f) {
    var n = nz(w, 0.03), hp = filt("highpass", 3000), g = perc(w, v, 0.001, 0.025); n.connect(hp); hp.connect(g); out(g, 1, 0.12);
    var o = os("sine", f || 1800, w, 0.07), g2 = perc(w, v * 0.5, 0.001, 0.05); o.connect(g2); out(g2, 1, 0.12);
  }
  function click(w, v) {
    var n = nz(w, 0.02), bp = filt("bandpass", 4200, 1.5), g = perc(w, v, 0.0008, 0.018); n.connect(bp); bp.connect(g); out(g, 1, 0.08);
    var o = os("sine", 1350, w, 0.04), g2 = perc(w, v * 0.4, 0.0008, 0.025); o.connect(g2); out(g2, 1, 0.08);
  }
  function shaker(w, v) { var n = nz(w, 0.06), hp = filt("highpass", 7000), g = perc(w, v, 0.004, 0.045); n.connect(hp); hp.connect(g); out(g, 1, 0.1); }
  function glide(w, dur, f0, f1, v) {
    var c = A.ctx, o = os("triangle", f0, w, dur + 0.35); o.frequency.exponentialRampToValueAtTime(f1, w + dur);
    var g = c.createGain(); g.gain.setValueAtTime(0, w); g.gain.linearRampToValueAtTime(v, w + 0.15); g.gain.setValueAtTime(v, w + dur); g.gain.linearRampToValueAtTime(0, w + dur + 0.3);
    var lp = filt("lowpass", 1200); o.connect(lp); lp.connect(g); out(g, 1, 0.5);
  }
  // La casse : craquement sec, corde qui fouette, impact grave saturé, grondement
  function snap(w) {
    var n = nz(w, 0.12), hp = filt("highpass", 1200), g = perc(w, 0.7, 0.001, 0.09); n.connect(hp); hp.connect(g); out(g, 1, 0.35);
    var s = os("sawtooth", 1100, w, 0.2); s.frequency.exponentialRampToValueAtTime(90, w + 0.16); var lp = filt("lowpass", 2500), g2 = perc(w, 0.18, 0.001, 0.16); s.connect(lp); lp.connect(g2); out(g2, 1, 0.3);
    var b = os("sine", 72, w, 1.6); b.frequency.exponentialRampToValueAtTime(30, w + 1.2); var ws = A.ctx.createWaveShaper(); ws.curve = DIST; var g3 = perc(w, 0.9, 0.004, 1.3); b.connect(ws); ws.connect(g3); out(g3, 1, 0.2);
    var r = nz(w, 1.6), lp2 = filt("lowpass", 180), g4 = perc(w, 0.5, 0.01, 1.4); r.connect(lp2); lp2.connect(g4); out(g4, 1, 0.3);
  }
  // Voix off : une seule prise ElevenLabs ; chaque phrase est lue à son repère (début et fin mesurés dans le fichier)
  var VL = VGROUPS;
  var VD = VL.map(function (l) { return l[1] - l[0]; });
  var VOICE_URL = "/audio/voix-kenzy-v4.mp3";
  // La voix n'est téléchargée qu'au premier clic sur « Activer le son »
  function fetchVoice(c) { return fetch(VOICE_URL).then(function (r) { if (!r.ok) throw new Error("voix " + r.status); return r.arrayBuffer(); }).then(function (b) { return new Promise(function (ok, ko) { c.decodeAudioData(b, ok, ko); }); }); }
  function voiceLine(i, w) {
    if (!A.voice) return;
    var c = A.ctx, a = Math.max(0, VL[i][0] - 0.06), d = VL[i][1] + 0.14 - a, s = c.createBufferSource(), g = c.createGain();
    s.buffer = A.voice;
    g.gain.setValueAtTime(0, w); g.gain.linearRampToValueAtTime(1, w + 0.02); g.gain.setValueAtTime(1, w + d - 0.06); g.gain.linearRampToValueAtTime(0, w + d);
    s.connect(g); g.connect(S.voice); s.start(w, a, d);
    // la musique et les bruitages s'effacent sous la voix (environ −8 dB), puis reviennent
    A.bed.gain.setTargetAtTime(0.4, Math.max(c.currentTime, w - 0.12), 0.05); A.bed.gain.setTargetAtTime(1, w + d + 0.05, 0.18);
  }
  // Programmation : à chaque image, on programme les sons des 150 ms à venir (en temps total, boucles comprises)
  function audioTick() {
    if (!A.on || !A.ctx || !S || !tl || !AUD.length) return;
    var tt = tl.totalTime(), D = tl.duration(), now = A.ctx.currentTime;
    if (A.sched < 0 || tt < A.sched - 0.3 || tt > A.sched + 0.6) A.sched = tt - 0.001;   // saut de lecture : on repart d'ici
    var to = tt + 0.15; if (to <= A.sched || !D) return;
    for (var k = Math.floor(A.sched / D); k <= Math.floor(to / D); k++) {
      for (var i = 0; i < AUD.length; i++) {
        var et = AUD[i].t + k * D;
        if (et > A.sched && et <= to) { try { AUD[i].f(Math.max(now, now + et - tt)); A.fired = (A.fired || 0) + 1; } catch (e) {} }
      }
    }
    A.sched = to;
  }
  function soundOn() {
    try {
      if (!A.ctx) { var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; A.ctx = new AC(); graph(A.ctx); }
      A.ctx.resume();
    } catch (e) { return; }
    sBtn.classList.add("on"); sBtn.setAttribute("aria-pressed", "true");
    if (!A.voice && !A.voiceTried) {
      if (A.loading) return;
      A.loading = true; sLbl.textContent = "Chargement…";
      var done = function (b) { A.voice = b || null; A.voiceTried = true; A.loading = false; if (!dead && sBtn.classList.contains("on")) startSound(); };
      fetchVoice(A.ctx).then(done, function () { done(null); });
      return;
    }
    startSound();
  }
  function startSound() {
    var t = A.ctx.currentTime;
    A.on = true; A.sched = -1; newSession();
    A.master.gain.cancelScheduledValues(t); A.master.gain.setValueAtTime(0.75, t);
    A.rev.gain.cancelScheduledValues(t); A.rev.gain.setValueAtTime(0.32, t);
    sLbl.textContent = "Couper le son";
    if (tl) tl.restart();   // le son raconte une histoire : on la reprend depuis le début
  }
  function soundOff() {
    A.on = false;
    if (A.ctx) A.master.gain.setTargetAtTime(0, A.ctx.currentTime, 0.04);
    sBtn.classList.remove("on"); sBtn.setAttribute("aria-pressed", "false"); sLbl.textContent = "Activer le son";
  }
  var sBtn = $("#fSound"), sLbl = $("#fSoundL");
  if (reduce) sBtn.hidden = true;
  sBtn.addEventListener("click", function () { if (A.on || A.loading) soundOff(); else soundOn(); }, { signal: SIG });
  document.addEventListener("visibilitychange", function () { if (!A.ctx) return; if (document.hidden) A.ctx.suspend(); else if (A.on) A.ctx.resume(); }, { signal: SIG });
  // Pour les tests : rendu hors ligne d'une boucle complète, avec niveaux par tranche de 0,5 s
  story.__audio = A;
  story.__renderAudio = function () {
    var OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext; if (!OAC || !tl) return Promise.resolve(null);
    var D = tl.duration(), oc = new OAC(2, Math.ceil(44100 * D), 44100);
    return new Promise(function (ok) { fetchVoice(oc).then(ok, function () { ok(null); }); }).then(function (vb) {
      var keep = { ctx: A.ctx, master: A.master, conv: A.conv, rev: A.rev, bed: A.bed, noise: A.noise, S: S, voice: A.voice };
      A.ctx = oc; graph(oc); S = null; newSession(); A.voice = vb;
      AUD.forEach(function (e) { e.f(e.t); });
      var res = oc.startRendering();
      A.ctx = keep.ctx; A.master = keep.master; A.conv = keep.conv; A.rev = keep.rev; A.bed = keep.bed; A.noise = keep.noise; S = keep.S; A.voice = keep.voice;
      return res;
    }).then(function (buf) {
      var L = buf.getChannelData(0), Rr = buf.getChannelData(1), win = 4410, rows = [], peak = 0;
      for (var s = 0; s < L.length; s += win) {
        var pk = 0, sq = 0, n = Math.min(win, L.length - s);
        for (var i = s; i < s + n; i++) { var a = Math.max(Math.abs(L[i]), Math.abs(Rr[i])); if (a > pk) pk = a; sq += (L[i] * L[i] + Rr[i] * Rr[i]) / 2; }
        if (pk > peak) peak = pk;
        rows.push([+(s / 44100).toFixed(1), +(20 * Math.log10(pk + 1e-9)).toFixed(1), +(10 * Math.log10(sq / n + 1e-12)).toFixed(1)]);
      }
      return { dur: D, peakDb: +(20 * Math.log10(peak + 1e-9)).toFixed(2), rows: rows };
    });
  };

  function render() {
    var k;
    for (k in TY) { var o = TY[k], s = o.txt.slice(0, Math.round(o.n)); if (last[k] !== s) { last[k] = s; o.el.textContent = s; } }
    for (k in CN) { var q = CN[k], v = q.f(q.v); if (last[k] !== v) { last[k] = v; q.el.textContent = v; } }
    var t8 = ST.tag8 > 0.5;
    if (last.t8 !== t8) { last.t8 = t8; tag8.textContent = t8 ? "Devis envoyé" : "Nouveau"; tag8.className = "v-chip" + (t8 ? " warn" : ""); }
    if (A.on) audioTick();
    if (tl) bar.style.width = (tl.progress() * 100).toFixed(2) + "%";
  }

  // Lignes du moyeu et de l'orbite : du centre vers chaque tuile (coordonnées en %)
  function lines(svgSel, itemSel) {
    var svg = $(svgSel); if (!svg || svg.childNodes.length) return;
    $$(itemSel).forEach(function (it) {
      var cs = getComputedStyle(it), x = parseFloat(cs.getPropertyValue("--x")), y = parseFloat(cs.getPropertyValue("--y"));
      var l = document.createElementNS(NS, "line"); l.dataset.x = x; l.dataset.y = y; l.setAttribute("pathLength", "1");
      svg.appendChild(l);
    });
  }
  // Chaque tuile est posée sur un point d'ancrage ; son contenu est centré dessus en CSS
  $$(".v-tile, .v-ochip").forEach(function (t) { if (t.children.length === 1 && t.firstElementChild.classList.contains("v-in")) return; var inr = document.createElement("span"); inr.className = "v-in"; while (t.firstChild) inr.appendChild(t.firstChild); t.appendChild(inr); });
  lines("#spokes", "#hub .v-tile"); lines("#olines", "#orbit .v-ochip");
  // Les traits sont recalculés en pixels à chaque construction : épaisseur nette, et tracé progressif fiable
  function fitSvg(svg) {
    if (!svg) return;
    var w = svg.parentNode.offsetWidth, h = svg.parentNode.offsetHeight; if (!w || !h) return;
    svg.setAttribute("viewBox", "0 0 " + w + " " + h); svg.removeAttribute("preserveAspectRatio");
    Array.prototype.forEach.call(svg.querySelectorAll("line"), function (l) { l.setAttribute("x1", w / 2); l.setAttribute("y1", h / 2); l.setAttribute("x2", l.dataset.x / 100 * w); l.setAttribute("y2", l.dataset.y / 100 * h); });
    Array.prototype.forEach.call(svg.querySelectorAll("path"), function (p) {
      var d0 = p.dataset.d || p.getAttribute("d"); p.dataset.d = d0;
      p.setAttribute("d", d0.replace(/([\d.]+) ([\d.]+)/g, function (m, a, b) { return (a * w / 100).toFixed(1) + " " + (b * h / 100).toFixed(1); }));
    });
  }

  function fitTeam() {
    var box = $("#s7b .v-teamfiche"), svg = box && box.querySelector(".v-tlines");
    if (!svg || !matchMedia("(max-width: 767px)").matches) return;
    var w = box.offsetWidth, h = box.offsetHeight; if (!w || !h) return;
    var fc = box.querySelector(".v-fc"), inset = fc.offsetWidth * 0.12, gap = w * 0.015;
    var cl = fc.offsetLeft, ct = fc.offsetTop, cr = cl + fc.offsetWidth, cb = ct + fc.offsetHeight;
    var paths = svg.querySelectorAll("path");
    [".t1", ".t2", ".t3"].forEach(function (q, i) {
      var a = box.querySelector(q), p = paths[i]; if (!a || !p) return;
      var r = a.offsetWidth / 2, cx = a.offsetLeft + r, cy = a.offsetTop + r;
      var ex = Math.min(cr - inset, Math.max(cl + inset, cx)), ey = Math.min(cb, Math.max(ct, cy));
      var dx = ex - cx, dy = ey - cy, L = Math.hypot(dx, dy) || 1, k = (r + gap) / L;
      p.setAttribute("d", "M" + (cx + dx * k).toFixed(1) + " " + (cy + dy * k).toFixed(1) + " L" + ex.toFixed(1) + " " + ey.toFixed(1));
    });
  }

  function build() {
    if (tl) { tl.kill(); tl = null; }
    W = story.offsetWidth; H = story.offsetHeight; if (!W || !H) return;
    var M = W < 600, X = Math.round(W * 0.12);
    var CLR = "transform,opacity,visibility,filter,clipPath,strokeDashoffset,display";
    // On ne remet pas à zéro les transformations des éléments SVG intérieurs (GSAP y fige l'origine) : seulement leur tracé
    var RESET = $$(".vstage *").filter(function (e) { return !e.ownerSVGElement; }).concat($$(".vbg"), [$("#vRed"), $("#vBlack")]);
    var DRAWN = $$("#spokes line, #olines line, .v-tlines path, #sig10, #ring14, #arr14");
    gsap.set(RESET, { clearProps: CLR }); gsap.set(DRAWN, { strokeDashoffset: 1 });
    fitSvg($("#spokes")); fitSvg($("#olines")); fitSvg($(".v-tlines")); fitTeam();
    last = {};
    function rr(el) { var s = story.getBoundingClientRect(), r = el.getBoundingClientRect(), k = s.width / W; return { x: (r.left - s.left) / k, y: (r.top - s.top) / k, w: r.width / k, h: r.height / k }; }
    // Position du clic sur « Valider », dans le repère de la carte de l'assistant
    var aiR = rr($("#ai9")), okR = rr($("#aiOk")), cw = rr($("#cur9")).w;
    var ckx = okR.x - aiR.x + okR.w * 0.55 - cw * 5 / 32, cky = okR.y - aiR.y + okR.h * 0.62 - cw * 3 / 32;

    tl = gsap.timeline({ repeat: -1, onUpdate: render });
    tl.set(RESET, { clearProps: CLR }, 0).set(DRAWN, { strokeDashoffset: 1 }, 0)
      .set([TY.p1, TY.ai], { n: 0 }, 0).set(CN.cal, { v: 15 }, 0).set(CN.pay, { v: 0 }, 0).set(ST, { tag8: 0 }, 0)
      .set("#prompt1", { xPercent: -50, yPercent: -50 }, 0)
      .set($$(".v-dr"), { "--hl": 0 }, 0);
    var HIDE = [];
    function hid() { for (var i = 0; i < arguments.length; i++) HIDE.push.apply(HIDE, [].concat(arguments[i])); }

    // ---------- Outils de mise en scène ----------
    function show(el, t) { tl.set(el, { autoAlpha: 1 }, t); }
    function hide(el, t) { tl.set(el, { autoAlpha: 0 }, t); }
    function inR(el, t, d) { show(el, t); tl.fromTo(el, { x: X, filter: "blur(10px)" }, { x: 0, filter: "blur(0px)", duration: d || 0.5, ease: "power4.out", immediateRender: false }, t); }
    function inL(el, t) { show(el, t); tl.fromTo(el, { x: -X, filter: "blur(10px)" }, { x: 0, filter: "blur(0px)", duration: 0.5, ease: "power4.out", immediateRender: false }, t); }
    function outL(el, t) { tl.to(el, { x: -X, filter: "blur(10px)", opacity: 0, duration: 0.3, ease: "power3.in" }, t - 0.3); hide(el, t); }
    function inZ(el, t, s, d) { show(el, t); tl.fromTo(el, { scale: s || 1.25, filter: "blur(12px)" }, { scale: 1, filter: "blur(0px)", duration: d || 0.6, ease: "expo.out", immediateRender: false }, t); }
    function outZ(el, t) { tl.to(el, { scale: 1.15, filter: "blur(10px)", opacity: 0, duration: 0.25, ease: "power3.in" }, t - 0.25); hide(el, t); }
    function pop(el, t, o) {
      o = o || {}; hid(el);
      tl.fromTo(el, { autoAlpha: 0, scale: o.s || 0.82, y: o.y || 0, rotation: o.r0 || 0 }, { autoAlpha: 1, scale: 1, y: 0, rotation: o.r || 0, duration: o.d || 0.5, ease: o.e || "back.out(1.7)", immediateRender: false }, t);
    }
    function words(el, t, span) {
      var ws = el.querySelectorAll(".w"), n = ws.length, st = span ? Math.min(0.13, span / Math.max(1, n)) : 0.06;
      Array.prototype.forEach.call(ws, function (w, i) {
        tl.fromTo(w, { opacity: 0, y: "0.3em", filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out", immediateRender: false }, t + i * st);
      });
    }
    function capOut(el, t) { tl.to(el.querySelectorAll(".w"), { x: -X * 0.45, opacity: 0, filter: "blur(8px)", duration: 0.28, ease: "power3.in", stagger: 0.012 }, t - 0.3); }
    function bg(name, t, d) {
      d = d || 0.22;
      tl.to("#bgL", { opacity: name === "light" ? 1 : 0, duration: d, ease: "power2.inOut" }, t)
        .to("#bgD", { opacity: name === "dark" ? 1 : 0, duration: d, ease: "power2.inOut" }, t)
        .to("#bgO", { opacity: name === "orange" ? 1 : 0, duration: d, ease: "power2.inOut" }, t);
    }
    function push(el, t0, t1, s) { tl.fromTo(el, { scale: 1 }, { scale: s || 1.04, duration: Math.max(0.2, t1 - t0), ease: "sine.inOut", immediateRender: false }, t0); }

    // ===== 1. La question tapée, puis les outils éparpillés (fond clair) =====
    tl.to("#vBlack", { opacity: 0, duration: 0.45, ease: "power2.out" }, 0);
    show("#s1", 0.05);
    pop("#prompt1", 0.15, { s: 0.92, e: "expo.out", d: 0.6 });
    hid("#caret1"); show("#caret1", T(0.05) - 0.05); hide("#caret1", T(1.85) + 0.35);
    tl.to(TY.p1, { n: TY.p1.txt.length, duration: T(1.78) - T(0.05), ease: "none" }, T(0.05));
    tl.fromTo("#psend1", { scale: 1 }, { scale: 0.82, duration: 0.08, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, T(1.9));
    tl.to("#prompt1", { y: -H * (M ? 0.24 : 0.2), duration: 0.7, ease: "power3.inOut" }, T(1.97));
    var WR = [-6, 4, -3, 5, -4], tw0 = T(2.07), twD = (VT[1] - 0.3 - tw0) / 5;
    $$("#s1 .v-win").forEach(function (w, i) { pop(w, tw0 + i * twD, { y: 24, s: 0.85, r0: WR[i] * 2, r: WR[i] }); });

    // ===== 2. « Vous. » (noir) =====
    tl.to("#s1", { scale: 1.08, filter: "blur(10px)", opacity: 0, duration: 0.2, ease: "power3.in" }, VT[1] - 0.2); hide("#s1", VT[1]);
    bg("dark", VT[1] - 0.12, 0.14);
    show("#s2", VT[1]); inZ("#vous", VT[1] - 0.02, 1.6, 0.55);
    $$("#team .av").forEach(function (a, i) { pop(a, T(3.5) + i * 0.08, { s: 0.5 }); });
    words($("#team-t"), T(3.54), 0.8);
    push("#s2", VT[1] + 0.6, T(4.9), 1.05);

    // ===== 3. Recopier, relancer, vérifier (clair) =====
    outL("#s2", T(4.9)); bg("light", T(4.8), 0.22);
    show("#s3", T(4.9)); words($("#s3a"), T(4.92), 0.7);
    var tv = [T(5.69), T(6.54), T(7.47)];
    hid("#vg1", "#vg2", "#vg3");
    words($("#vb1"), tv[0], 0.45); inR("#vg1", tv[0]); pop("#ghost", tv[0] + 0.35, { s: 0.6 });
    tl.fromTo("#ghost", { x: -W * 0.16 }, { x: 0, duration: 0.5, ease: "power3.out", immediateRender: false }, tv[0] + 0.35);
    capOut($("#vb1"), tv[1]); outL("#vg1", tv[1]); words($("#vb2"), tv[1], 0.45); show("#vg2", tv[1]);
    tl.fromTo("#vg2 .v-notif", { y: -H * 0.12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "back.out(1.6)", immediateRender: false }, tv[1]);
    capOut($("#vb2"), tv[2]); outL("#vg2", tv[2]); words($("#vb3"), tv[2], 0.45); show("#vg3", tv[2]);
    $$("#vg3 > *").forEach(function (e, i) { pop(e, tv[2] + 0.05 + i * 0.14, { s: 0.7 }); });

    // ===== 4. Un oubli, et le client signe ailleurs (noir) =====
    outL("#s3", T(8.52)); bg("dark", T(8.44), 0.2);
    show("#s4", T(8.52)); words($("#s4a"), T(8.54), 0.45);
    pop("#ag4", T(8.58), { y: 16 }); pop("#cl4", T(8.7), { y: 16 });
    tl.fromTo("#strike4", { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "power2.out", immediateRender: false }, T(8.8));
    tl.to("#ag4", { opacity: 0.4, filter: "grayscale(1)", duration: 0.4 }, T(9.1));
    words($("#s4b"), T(9.59), 0.8);
    tl.to("#cl4", { x: W * 0.22, filter: "blur(8px)", opacity: 0, duration: 0.7, ease: "power2.in" }, T(10.2));
    hid("#loss4"); inZ("#loss4", T(10.55), 1.35, 0.5);
    tl.to("#vRed", { opacity: 1, duration: 0.1 }, T(10.55)).to("#vRed", { opacity: 0.45, duration: 0.6 }, T(10.65)).to("#vRed", { opacity: 0, duration: 0.5 }, VT[5] - 0.4);
    tl.to("#s4", { keyframes: { x: [0, -10, 8, -5, 3, 0] }, duration: 0.35, ease: "none" }, T(10.55));

    // ===== 5. Arrêtez de faire le facteur (noir, le titre de la page en pilule) =====
    outL("#s4", VT[5]);
    show("#s5", VT[5]); words($("#s5a"), T(10.94), 1.0);
    hid("#s5b"); inZ("#s5b", T(12.53), 1.3, 0.6);
    push("#s5", T(12.7), VT[6] - 0.3, 1.05);

    // ===== 6. Et si vos outils se parlaient ? (noir, puis l'étincelle ouvre la lumière) =====
    outL("#s5", VT[6]);
    show("#s6", VT[6]); words($("#s6a"), T(13.77), 0.7); words($("#s6b"), T(15.0), 0.8);
    var tSp = T(15.96);
    hid("#spark"); pop("#spark", tSp - 0.1, { s: 0.1, e: "expo.out", d: 0.4 });
    tl.set("#bgL", { opacity: 1, clipPath: "circle(0% at 50% 74%)" }, tSp + 0.15)
      .to("#bgL", { clipPath: "circle(150% at 50% 74%)", duration: 0.55, ease: "power3.in" }, tSp + 0.15)
      .set("#bgD", { opacity: 0 }, tSp + 0.72);
    outZ("#s6", VT[7] - 0.02);

    // ===== 7. Le point central (clair) =====
    inZ("#s7", VT[7] - 0.02, 0.86, 0.6);
    pop("#disc", T(16.45), { s: 0.5 });
    words($("#c7a"), T(17.4), 1.1);
    $$("#spokes line").forEach(function (l, i) { tl.to(l, { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" }, T(17.6) + i * 0.15); });
    $$("#hub .v-tile").forEach(function (e, i) { pop(e, T(17.6) + i * 0.15 + 0.22, { s: 0.6 }); });
    capOut($("#c7a"), T(19.32)); words($("#c7b"), T(19.32), 1.2);
    outZ("#s7", T(21.15));
    inZ("#s7b", T(21.15), 0.82, 0.6); words($("#c7c"), T(21.21), 1.0);
    pop("#s7b .v-fc", T(21.3), { y: 14 });
    $$("#s7b .v-teamfiche > .av").forEach(function (a, i) { pop(a, T(21.45) + i * 0.12, { s: 0.5 }); });
    $$("#s7b .v-tlines path").forEach(function (p, i) { tl.to(p, { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" }, T(21.7) + i * 0.1); });
    pop("#s7b .v-fc .v-chip", T(22.25), { s: 0.6 });

    // ===== 8. Prenons Julien (clair) =====
    outL("#s7b", T(22.97));
    inR("#s8", T(22.97)); words($("#c8a"), T(22.99), 1.0);
    hid("#mail8", "#fiche8"); hid($$("#fiche8 .v-fr"));
    capOut($("#c8a"), T(24.61)); words($("#c8b"), T(24.61), 1.4);
    inL("#mail8", T(24.65));
    pop("#fiche8", T(26.0), { y: 18, s: 0.9 });
    tl.to("#mail8", { opacity: 0.4, scale: 0.94, duration: 0.4 }, T(26.15));
    var frs = $$("#fiche8 .v-fr");
    pop(frs[0], T(26.15), { y: 8, s: 0.96 }); pop(frs[1], T(26.3), { y: 8, s: 0.96 });
    capOut($("#c8b"), T(27.02)); words($("#c8c"), T(27.02), 0.5);
    pop(frs[2], T(27.1), { y: 8, s: 0.96 });
    tl.fromTo("#devis8", { x: -40 }, { x: 0, duration: 0.5, ease: "power3.out", immediateRender: false }, T(27.1));
    tl.set(ST, { tag8: 1 }, T(27.45)).fromTo("#tag8", { scale: 1.25 }, { scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, T(27.45));

    // ===== 9. Trois jours plus tard, l'assistant, vous validez (clair) =====
    outL("#s8", T(28.22));
    show("#s9", T(28.22)); words($("#c9a"), T(28.24), 1.6);
    hid("#ai9", "#cal3", "#cur9");
    inR("#cal9", T(28.24));
    tl.to(CN.cal, { v: 18, duration: 0.75, ease: "none" }, T(28.33));
    tl.fromTo("#calD", { y: -8 }, { y: 0, duration: 0.18, repeat: 2, ease: "power2.out", immediateRender: false }, T(28.33));
    pop("#cal3", T(29.67), { s: 0.7 });
    capOut($("#c9a"), T(30.79)); words($("#c9b"), T(30.79), 0.9);
    outL("#cal9", T(30.78)); inR("#ai9", T(30.78));
    tl.to(TY.ai, { n: TY.ai.txt.length, duration: T(32.05) - T(30.92), ease: "none" }, T(30.92));
    capOut($("#c9b"), T(32.29)); words($("#c9c"), T(32.29), 0.6);
    tl.set("#cur9", { autoAlpha: 1, x: ckx + W * 0.1, y: cky + H * 0.16 }, T(31.85))
      .to("#cur9", { x: ckx, y: cky, duration: 0.6, ease: "power3.out" }, T(31.85));
    var tClick = T(32.83);
    tl.to("#cur9", { scale: 0.85, duration: 0.08 }, tClick).to("#cur9", { scale: 1, duration: 0.2 }, tClick + 0.08)
      .to("#aiOk", { scale: 0.9, duration: 0.08 }, tClick).to("#aiOk", { scale: 1, duration: 0.2 }, tClick + 0.08)
      .set("#aiBtn", { display: "none" }, tClick + 0.18).set("#aiDone", { display: "flex" }, tClick + 0.18)
      .to("#cur9", { opacity: 0, duration: 0.25 }, tClick + 0.45);

    // ===== 10. Au final, il signe, la facture suit, il paie (noir) =====
    outL("#s9", VT[10] - 0.02); bg("dark", VT[10] - 0.1, 0.2);
    show("#s10", VT[10] - 0.02);
    hid("#inv10", "#pay10", $$("#pay10 .v-chip"));
    inR("#ct10", VT[10]);
    words($("#c10a"), T(33.99), 0.5);
    tl.to("#sig10", { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" }, T(34.3));
    capOut($("#c10a"), T(34.83)); words($("#c10b"), T(34.83), 0.5); outL("#ct10", T(34.83)); inR("#inv10", T(34.83));
    capOut($("#c10b"), T(36.03)); words($("#c10c"), T(36.03), 0.3); outL("#inv10", T(36.03));
    inZ("#pay10", T(36.03), 1.3, 0.55);
    tl.to(CN.pay, { v: 2340, duration: 0.9, ease: "power3.out" }, T(36.08));
    pop($$("#pay10 .v-chip"), T(36.6), { s: 0.6 });

    // ===== 10b. Nadia, organisme de formation (clair) =====
    outL("#s10", VT[11]); bg("light", VT[11] - 0.1, 0.22);
    show("#s10b", VT[11]); words($("#c10ba"), T(36.91), 1.5);
    var prt = $$("#form10b .v-part li"), frb = $$("#fiche10b .v-fr");
    hid("#form10b", "#fiche10b", "#tag10b2", prt, frb);
    inL("#form10b", T(37.3));
    prt.forEach(function (p, i) { pop(p, T(37.6) + i * 0.14, { y: 8, s: 0.9 }); });
    capOut($("#c10ba"), T(39.17)); words($("#c10bb"), T(39.17), 0.9);
    tl.to(prt, { keyframes: { scale: [1, 1.08, 1] }, duration: 0.4, ease: "power2.out", stagger: 0.1 }, T(39.84));
    pop("#fiche10b", T(40.7), { y: 18, s: 0.9 });
    tl.to("#form10b", { opacity: 0.4, scale: 0.94, duration: 0.4 }, T(40.85));
    pop(frb[0], T(40.99), { y: 8, s: 0.96 }); pop(frb[1], T(41.85), { y: 8, s: 0.96 }); pop(frb[2], T(43.03), { y: 8, s: 0.96 });
    hide("#tag10b", T(43.6)); pop("#tag10b2", T(43.6), { s: 1.3, e: "back.out(2)", d: 0.4 });

    // ===== 10c. Pierre, la panne du dimanche soir (noir) =====
    outL("#s10b", VT[12]); bg("dark", VT[12] - 0.1, 0.22);
    show("#s10c", VT[12]); words($("#c10ca"), T(44.13), 1.4);
    hid("#chat10c", "#bout10c", "#stamp10c");
    push("#s10c", VT[12] + 0.5, VT[13] - 0.3, 1.03);
    capOut($("#c10ca"), T(46.44)); words($("#c10cb"), T(46.44), 1.3);
    inR("#chat10c", T(46.9));
    capOut($("#c10cb"), T(48.62)); words($("#c10cc"), T(48.62), 0.8);
    pop("#bout10c", T(48.9), { y: 14, s: 0.94 });
    tl.to("#slotA", { scale: 1.1, duration: 0.12, ease: "power2.out" }, T(50.0)).to("#slotA", { scale: 1, duration: 0.25, ease: "power2.out" }, T(50.12))
      .to("#slotA b", { opacity: 1, duration: 0.15 }, T(50.0))
      .to("#slotB", { opacity: 0.35, duration: 0.3 }, T(50.1));
    pop("#stamp10c", T(51.15), { s: 0.7, e: "back.out(1.8)" });

    // ===== 10d. Trois métiers (clair) =====
    outL("#s10c", VT[13]); bg("light", VT[13] - 0.1, 0.22);
    show("#s10d", VT[13]); words($("#c10da"), T(52.36), 0.4);
    var tcs = $$("#trio .v-tcard");
    tcs.forEach(function (c, i) { pop(c, T(52.4) + i * 0.12, { y: 18, s: 0.9 }); });
    [[53.3, 0.5], [54.35, 0.6], [55.64, 0.5]].forEach(function (q, i) {
      words($("#tr" + (i + 1)), T(q[0]), q[1]);
      tl.to(tcs[i], { keyframes: { scale: [1, 1.07, 1] }, duration: 0.45, ease: "power2.out" }, T(q[0]));
    });

    // ===== 11. Je relie les outils que vous avez déjà (clair) =====
    outZ("#s10d", VT[14]);
    inZ("#s11b", VT[14], 0.86, 0.6);
    hid(".v-odisc"); pop(".v-odisc", T(56.8), { s: 0.5 });
    $$("#orbit .v-ochip").forEach(function (c, i) { pop(c, T(57.0) + i * 0.11, { s: 0.55 }); });
    words($("#c11b"), T(56.8), 1.2);
    $$("#olines line").forEach(function (l, i) { tl.to(l, { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" }, T(57.3) + i * 0.1); });
    capOut($("#c11b"), T(58.49)); words($("#c11c"), T(58.49), 0.7);
    $$("#orbit .v-ochip").forEach(function (c, i) { tl.to(c, { keyframes: { scale: [1, 1.1, 1] }, duration: 0.4, ease: "power2.out" }, T(58.9) + i * 0.06); });

    // ===== 12. Ce qui bloque, puis le récap du matin (clair) =====
    outL("#s11b", VT[15]);
    show("#s12", VT[15]); words($("#c12a"), T(60.1), 1.1); inR("#dash12", T(60.14));
    capOut($("#c12a"), T(61.44)); words($("#c12b"), T(61.44), 0.8);
    tl.to("#dr1", { "--hl": 1, duration: 0.3 }, T(61.7)).to("#dr2", { "--hl": 1, duration: 0.3 }, T(62.0));
    tl.fromTo("#dash12", { scale: 1, transformOrigin: "50% 20%" }, { scale: 1.07, duration: 1.6, ease: "power2.inOut", immediateRender: false }, T(61.6));
    capOut($("#c12b"), T(62.69)); words($("#c12c"), T(62.69), 0.9);
    outL("#s12", T(64.32));
    show("#s12b", T(64.32)); words($("#c12d"), T(64.34), 0.5);
    hid("#pnote");
    tl.fromTo("#phone", { y: H * 0.35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power4.out", immediateRender: false }, T(64.38));
    capOut($("#c12d"), T(65.17)); words($("#c12e"), T(65.17), 0.8);
    pop("#pnote", T(65.25), { y: -30, s: 0.94 });

    // ===== 13. Vos outils font le lien entre eux ; vous, le lien avec vos clients (noir, réponse à la question du début) =====
    outL("#s12b", VT[16] - 0.02); bg("dark", VT[16] - 0.1, 0.22);
    show("#s13", VT[16] - 0.02); pop("#prompt13", VT[16] + 0.02, { s: 0.92, e: "expo.out", d: 0.5 });
    words($("#c13a"), T(66.78), 0.5); words($("#c13b"), T(67.62), 1.3);
    words($("#c13c1"), T(69.79), 0.25); words($("#c13c2"), T(71.03), 0.7);
    push("#s13", T(67.2), VT[17] - 0.3, 1.04);

    // ===== 14. Frédéric (orange) =====
    outZ("#s13", VT[17]); bg("orange", VT[17] - 0.15, 0.3);
    inZ("#s14", VT[17], 0.86, 0.6);
    tl.to("#ring14", { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, T(72.44));
    pop("#fPh", T(72.47), { s: 0.9, e: "power4.out" });
    words($("#c14a"), T(72.40), 0.8);
    pop("#cta14", T(74.41), { s: 0.7 });
    words($("#c14b"), T(75.62), 1.6);
    hid("#arrW"); show("#arrW", T(77.27)); tl.to("#arr14", { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" }, T(77.27));

    var FROZEN = T(77.75) + 0.7, BLACK = FROZEN + 5, END = BLACK + 0.4 + 2;
    tl.to("#vBlack", { opacity: 1, duration: 0.4, ease: "power2.in" }, BLACK);
    tl.set({}, {}, END);
    tl.set(HIDE, { autoAlpha: 0 }, 0);

    // ---------- Partition : voix, musique et bruitages ----------
    AUD = [];
    function E(t, f) { AUD.push({ t: t, f: f }); }
    G.forEach(function (g, i) { E(VT[i], function (w) { voiceLine(i, w); }); });
    var tSpark = tSp, tLight = VT[7], tFred = VT[17];
    E(0.1, function (w) { pad([110, 164.81, 220], w, tSpark - 0.1, { type: "triangle", vol: 0.04, cut: 700, cut2: 1300, att: 1.2, rel: 0.3, wet: 0.45 }); });
    E(VT[1] - 0.05, function (w) { pad([55, 82.41], w, tSpark - VT[1], { type: "triangle", vol: 0.05, cut: 300, att: 0.05, rel: 0.4, wet: 0.3 }); });
    E(tSpark + 0.1, function (w) { pad([261.63, 329.63, 392, 523.25], w, FROZEN + 3 - tSpark, { type: "triangle", vol: 0.035, cut: 900, cut2: 2600, att: 1.4, rel: 2.4, wet: 0.6 }); });
    var bt = 60 / 110, CH = [65.41, 49, 55, 43.65];
    for (var bs = tLight, k = 0; bs < tFred - 0.5; bs += bt * 4, k++) (function (s, kk) {
      E(s, function (w) { bass(CH[kk % 4], w, bt * 4, 0.09); });
      [0, 2].forEach(function (q) { E(s + q * bt, function (w) { thump(w, 0.12, 100, 45); }); });
      [1, 3].forEach(function (q) { E(s + q * bt + bt / 2, function (w) { shaker(w, 0.035); }); });
    })(bs, k);
    var nT = 22; for (var i = 0; i < nT; i++) (function (ii) { E(T(0.05) + ii * (T(1.78) - T(0.05)) / nT, function (w) { tick(w, 0.05, 2200 + (ii % 4) * 180); }); })(i);
    E(T(1.9), function (w) { click(w, 0.3); });
    [659.25, 739.99, 830.61, 880, 987.77].forEach(function (f, ii) { E(tw0 + ii * twD, function (w) { pluck(f, w, 0.06, 0.5); }); });
    E(VT[1] - 0.02, function (w) { thump(w, 0.55, 110, 38); whoosh(w - 0.2, 0.3, 0.12, 600, 2200, 0, 0); });
    [0, 1, 2].forEach(function (ii) { E(T(3.5) + ii * 0.08, function (w) { pluck(523.25 + ii * 130, w, 0.05, 0.5); }); });
    E(T(4.8), function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); });
    E(tv[0] + 0.35, function (w) { whoosh(w, 0.4, 0.08, 1500, 4500, -0.4, 0.4); });
    E(tv[1], function (w) { notif(w, 783.99, 0.07); });
    E(tv[2] + 0.2, function (w) { pluck(196, w, 0.08, 0.8); });
    E(T(8.44), function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); });
    E(T(8.8), function (w) { tick(w, 0.08, 900); });
    E(T(10.2), function (w) { whoosh(w, 0.7, 0.12, 400, 1600, 0, 0.8); });
    E(T(10.53), function (w) { snap(w); });
    E(T(12.5), function (w) { thump(w, 0.4, 120, 40); bell(523.25, w, 0.05, 2); });
    E(tSpark - 0.1, function (w) { shimmer(w, 0.05); bell(1318.51, w, 0.07, 2.2); });
    E(tSpark + 0.15, function (w) { whoosh(w, 0.55, 0.2, 300, 5000, 0, 0); });
    E(T(16.45), function (w) { thump(w, 0.25, 95, 50); });
    [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51].forEach(function (f, ii) { E(T(17.6) + ii * 0.15 + 0.22, function (w) { pluck(f, w, 0.07, 0.9); }); });
    E(T(21.15), function (w) { whoosh(w - 0.2, 0.4, 0.12, 400, 3000, 0, 0); });
    [0, 1, 2].forEach(function (ii) { E(T(21.45) + ii * 0.12, function (w) { pluck(659.25 + ii * 196, w, 0.05, 0.6); }); });
    E(T(22.97), function (w) { whoosh(w - 0.2, 0.35, 0.1, 900, 3800, 0.4, -0.4); });
    E(T(24.65), function (w) { notif(w, 659.25, 0.07); });
    E(T(26.15), function (w) { tick(w, 0.05); }); E(T(26.3), function (w) { tick(w, 0.05); });
    E(T(27.1), function (w) { whoosh(w, 0.35, 0.08, 1200, 4200, -0.4, 0.3); });
    E(T(28.22), function (w) { whoosh(w - 0.2, 0.35, 0.1, 900, 3800, 0.4, -0.4); });
    [0, 1, 2].forEach(function (ii) { E(T(28.33) + ii * 0.25, function (w) { tick(w, 0.09, 1500); }); });
    var nA = 26; for (var j = 0; j < nA; j++) (function (jj) { E(T(30.92) + jj * (T(32.05) - T(30.92)) / nA, function (w) { tick(w, 0.035, 2400 + (jj % 3) * 160); }); })(j);
    E(tClick, function (w) { click(w, 0.4); });
    E(tClick + 0.2, function (w) { notif(w, 659.25, 0.08, 1.5); });
    E(VT[10] - 0.1, function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); });
    E(T(34.83) - 0.15, function (w) { whoosh(w, 0.3, 0.08, 1200, 4200, 0.4, -0.4); });
    E(T(36.08), function (w) { thump(w, 0.4, 120, 40); [1046.5, 1318.51, 1567.98].forEach(function (f, ii) { bell(f, w + ii * 0.045, 0.06, 2.4); }); });
    // Nadia
    E(VT[11] - 0.1, function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); });
    E(T(37.3), function (w) { notif(w, 587.33, 0.06); });
    [0, 1, 2].forEach(function (ii) { E(T(37.6) + ii * 0.14, function (w) { pluck(523.25 + ii * 130, w, 0.05, 0.5); }); });
    [0, 1, 2].forEach(function (ii) { E(T(39.84) + ii * 0.1, function (w) { tick(w, 0.05, 1800 + ii * 200); }); });
    E(T(40.7), function (w) { thump(w, 0.2, 95, 50); });
    [[40.99, 659.25], [41.85, 783.99], [43.03, 880]].forEach(function (q) { E(T(q[0]), function (w) { pluck(q[1], w, 0.07, 0.8); }); });
    E(T(43.6), function (w) { [1046.5, 1318.51].forEach(function (f, ii) { bell(f, w + ii * 0.05, 0.05, 1.8); }); });
    // Pierre
    E(VT[12] - 0.1, function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); });
    E(T(46.9), function (w) { whoosh(w - 0.15, 0.3, 0.06, 1200, 4200, 0.4, -0.4); notif(w + 0.12, 739.99, 0.08); });
    E(T(48.9), function (w) { notif(w, 987.77, 0.08, 1.25); });
    E(T(50.0), function (w) { click(w, 0.3); });
    E(T(51.15), function (w) { thump(w, 0.3, 120, 40); [880, 1108.73, 1318.51].forEach(function (f, ii) { bell(f, w + ii * 0.045, 0.05, 2); }); });
    // Trois métiers
    E(VT[13] - 0.1, function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); });
    [0, 1, 2].forEach(function (ii) { E(T(52.4) + ii * 0.12, function (w) { pluck(523.25 + ii * 130, w, 0.05, 0.5); }); });
    [[53.3, 659.25], [54.35, 783.99], [55.64, 1046.5]].forEach(function (q) { E(T(q[0]), function (w) { pluck(q[1], w, 0.08, 0.9); }); });
    // Tous vos outils
    E(VT[14] - 0.1, function (w) { whoosh(w, 0.6, 0.12, 300, 2600, 0, 0); });
    [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66].forEach(function (f, ii) { E(T(57.0) + ii * 0.11, function (w) { pluck(f, w, 0.07, 0.9); }); });
    E(T(57.3), function (w) { shimmer(w, 0.035); });
    E(VT[15] - 0.2, function (w) { whoosh(w, 0.35, 0.1, 900, 3800, 0.4, -0.4); });
    E(T(61.7), function (w) { notif(w, 587.33, 0.06, 0.85); }); E(T(62.0), function (w) { notif(w, 523.25, 0.06, 0.85); });
    E(T(65.25), function (w) { notif(w, 880, 0.08, 1.25); });
    E(VT[16] - 0.1, function (w) { whoosh(w, 0.35, 0.12, 900, 3800, 0.4, -0.4); pad([73.42, 110], w, tFred - VT[16] + 0.1, { type: "triangle", vol: 0.04, cut: 380, att: 0.6, rel: 0.6, wet: 0.4 }); });
    E(tFred - 0.1, function (w) { whoosh(w, 0.5, 0.14, 400, 3000, 0, 0); shimmer(w + 0.1, 0.04); });
    E(T(74.41), function (w) { pluck(1046.5, w, 0.07, 1); });
    E(T(77.27), function (w) { pluck(1318.51, w, 0.06, 1.2); });

    story.__tl = tl; story.__T = T; story.__vt = VT;
    story.__marks = { q: T(0.05), vous: VT[1], verbs: T(4.92), oubli: T(8.54), facteur: VT[5], parlaient: VT[6], spark: tSp, hub: VT[7], fiche: T(21.21), julien: VT[8], cal: VT[9], click: tClick, paie: VT[10], nadia: VT[11], nadiaFin: T(43.9), pierre: VT[12], pierreFin: T(51.8), trois: VT[13], troisFin: T(56.4), outils: VT[14], pilotage: VT[15], matin: T(64.34), lien: VT[16], fred: VT[17], FROZEN: FROZEN, BLACK: BLACK, END: END };
    tl.seek(0.01);
    render();
    if (reduce) tl.pause(FROZEN + 1);
  }

  build();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!dead) build(); });
  var rz; window.addEventListener("resize", function () { clearTimeout(rz); rz = later(function () { if (story.offsetWidth !== W) build(); }, 250); }, { signal: SIG });
  if ("IntersectionObserver" in window) IO(function (en) {
    if (!tl || reduce) return;
    if (en[0].isIntersecting) { if (story.__userPaused) return; tl.play(); if (A.ctx && A.on) A.ctx.resume(); } else { tl.pause(); if (A.ctx) A.ctx.suspend(); }
  }, { threshold: 0.1 }).observe(story);

  return function () {
    dead = true; SIG_AC.abort(); clearTimeout(rz);
    OBS.forEach(function (o) { o.disconnect(); }); TIMERS.forEach(clearTimeout);
    if (tl) { tl.kill(); tl = null; }
    A.on = false;
    if (A.ctx) { try { A.ctx.close(); } catch (e) {} A.ctx = null; }
  };
}
