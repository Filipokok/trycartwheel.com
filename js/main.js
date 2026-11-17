(function () {
  'use strict';

  var root = document.getElementById('root');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== Theme toggle ===== */
  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
    });
  }

  /* ===== Mobile menu ===== */
  var navToggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      mobileMenu.hidden = !isOpen;
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        mobileMenu.hidden = true;
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== Live order counter ===== */
  var orders = 1284;
  var orderEls = document.querySelectorAll('.order-count');
  function paintOrders() {
    var formatted = orders.toLocaleString('en-US');
    orderEls.forEach(function (el) { el.textContent = formatted; });
  }
  paintOrders();
  setInterval(function () {
    orders += Math.floor(Math.random() * 3);
    paintOrders();
  }, 2600);

  /* ===== Case studies carousel ===== */
  var cases = [
    { stat: '490%', cap: 'ROI · 22 hours of manual work eliminated monthly', brand: "Mandy's", quote: '“Cartwheel’s dispatch automation paid for itself many times over. The manual coordination just disappeared.”', attr: "Operations Lead, Mandy's", img: 'assets/case-mandys.jpg' },
    { stat: '+930%', cap: 'in tips · +50% catering order volume', brand: "Illegal Pete's", quote: '“Our catering took off once orders flowed through Cartwheel and Olo together. The tips alone changed the math.”', attr: "Catering Director, Illegal Pete's", img: 'assets/case-illegal-petes.jpg' },
    { stat: '+24%', cap: 'on-time rate · 3 hours saved every day', brand: 'Calif Chicken Cafe', quote: '“AI auto-dispatch gave us back hours every day, and our customers actually notice the on-time deliveries.”', attr: 'Owner, California Chicken Cafe', img: 'assets/case-calif-chicken.png' },
    { stat: '65', cap: 'locations launched in 10 weeks', brand: "Portillo's", quote: '“Cartwheel let us stand up self-delivery for our highest-value orders across dozens of locations, fast.”', attr: "Off-Premise Dining, Portillo's", img: 'assets/case-portillos.png' }
  ];

  var fanEl = document.getElementById('js-case-fan');
  var dotsEl = document.getElementById('js-case-dots');
  var ci = 0;

  if (fanEl && dotsEl) {
    var cardEls = cases.map(function (c) {
      var card = document.createElement('article');
      card.className = 'case-card';
      card.innerHTML =
        '<div class="case-card-inner">' +
          '<div class="case-top">' +
            '<div class="case-stat">' + c.stat + '</div>' +
            '<p class="case-cap">' + c.cap + '</p>' +
            '<h3 class="case-brand">' + c.brand + '</h3>' +
            '<p class="case-quote">' + c.quote + '</p>' +
            '<p class="case-attr">' + c.attr + '</p>' +
            '<a href="#" class="case-link">Read the story</a>' +
          '</div>' +
          '<div class="case-photo" style="background-image:url(&quot;' + c.img + '&quot;)"></div>' +
        '</div>';
      fanEl.appendChild(card);
      return card;
    });

    var dotEls = cases.map(function (_, n) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'case-dot';
      dot.setAttribute('aria-label', 'Case ' + (n + 1));
      dot.addEventListener('click', function () { ci = n; render(); });
      dotsEl.appendChild(dot);
      return dot;
    });

    function render() {
      var n = cases.length;
      cardEls.forEach(function (card, i) {
        var d = (i - ci + n) % n;
        var front = d === 0;
        card.style.transform = 'translate(' + (d * 16) + 'px,' + (d * 14) + 'px) rotate(' + (d * 4) + 'deg) scale(' + (1 - d * 0.035) + ')';
        card.style.zIndex = String((n - d) * 10);
        card.style.filter = front ? 'none' : 'brightness(.97)';
        card.style.cursor = front ? 'default' : 'pointer';
        card.onclick = front ? null : (function (idx) { return function () { ci = idx; render(); }; })(i);
      });
      dotEls.forEach(function (dot, n2) {
        dot.classList.toggle('active', n2 === ci);
      });
    }

    var prevBtn = document.querySelector('.case-prev');
    var nextBtn = document.querySelector('.case-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { ci = (ci - 1 + cases.length) % cases.length; render(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { ci = (ci + 1) % cases.length; render(); });

    render();
  }

  /* ===== Scroll-reveal: how it works ===== */
  var stepsGrid = document.getElementById('js-steps-grid');
  if (stepsGrid) {
    if (prefersReducedMotion) {
      stepsGrid.querySelectorAll('.step-card').forEach(function (el) { el.classList.add('in'); });
    } else {
      var stepsIO = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          stepsGrid.querySelectorAll('.step-card').forEach(function (el) { el.classList.add('in'); });
          stepsIO.disconnect();
        }
      }, { threshold: 0.25 });
      stepsIO.observe(stepsGrid);
    }
  }

  /* ===== Scroll-reveal: thought leadership ===== */
  var tlGrid = document.getElementById('js-tl-grid');
  if (tlGrid) {
    if (prefersReducedMotion) {
      tlGrid.classList.add('in');
    } else {
      var tlIO = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          tlGrid.classList.add('in');
          tlIO.disconnect();
        }
      }, { threshold: 0.2 });
      tlIO.observe(tlGrid);
    }
  }

  /* ===== Catering page: testimonial carousel ===== */
  var testimonials = [
    { logo: 'assets/logo-pfchangs.svg', initials: 'CB', quote: '“Cartwheel allows us to handle the highest priority orders with self-delivery, ensuring the experience is seamless, delivered with P.F. Chang’s hospitality and encouraging the customer to return for repeat deliveries through our native ordering platforms.”', name: 'Candice Barnett', role: 'VP Off-Premises Dining, P.F. Chang’s' },
    { logo: 'assets/logo-jasons-deli.svg', initials: 'AS', quote: '“By implementing Cartwheel’s unified delivery management platform, we’ve streamlined our operations, reduced the load on team members, and enhanced our ability to ensure the best, most efficient customer service across all ordering channels.”', name: 'Amy Schuster', role: 'Vice President of IT, Jason’s Deli' },
    { logo: 'assets/logo-giordanos.png', initials: 'NS', quote: '“Chicago’s love for pizza and football runs deep, and peak demand periods like Super Bowl weekend put real pressure on our operations. Cartwheel gives our store teams the control they need to make smart delivery decisions in real time while ensuring that every delivery feels like Giordano’s, not a generic transaction.”', name: 'Nick Scarpino', role: 'CEO, Giordano’s' },
    { logo: 'assets/logo-portillos.svg', initials: 'MO', quote: '“With more than 60 Portillo’s locations nationwide and the highest average unit sales volumes in the fast-casual industry, we have a lot of deliveries to manage. It’s important that our brand is well-represented. Our experience with Cartwheel has been so positive that we invested in the company so they can further develop services with brands in mind.”', name: 'Michael Osanloo', role: 'CEO, Portillo’s' },
    { logo: '', initials: 'MS', quote: '“We continue to see real value in maintaining a direct relationship with our guests and investing in our in-house delivery capabilities. Third-party delivery provides important additional reach and flexibility, and Cartwheel helps us bring these approaches together while maintaining a consistent guest experience as we modernize our delivery operations.”', name: 'Moe Shrikian', role: 'Executive Vice President and General Counsel, Hungry Howie’s' },
    { logo: 'assets/logo-potbelly.svg', initials: 'SM', quote: '“With Cartwheel, our delivery program is as customizable as our menu. Since implementing Cartwheel’s tools, Potbelly has been able to offer faster, more efficient delivery to our customers from more than 400 locations nationwide.”', name: 'Sam Martinez', role: 'Business Systems Manager, Potbelly' },
    { logo: 'assets/logo-portillos.svg', initials: 'DN', quote: '“Cartwheel allowed us to adjust our order volume to driver availability, eliminating the worry of having enough drivers to maintain delivery quality.”', name: 'Dino Northway', role: 'Senior Manager Off-Premise Dining, Portillo’s' }
  ];

  var tcard = document.getElementById('js-tcard');
  var tdotsEl = document.getElementById('js-tdots');
  if (tcard && tdotsEl) {
    var ti = 0;
    var tdots = testimonials.map(function (_, n) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'case-dot';
      dot.setAttribute('aria-label', 'Testimonial ' + (n + 1));
      dot.addEventListener('click', function () { ti = n; renderT(); });
      tdotsEl.appendChild(dot);
      return dot;
    });
    function renderT() {
      var t = testimonials[ti];
      tcard.innerHTML =
        (t.logo ? '<img src="' + t.logo + '" alt="" class="cat-tcard-logo">' : '') +
        '<div class="cat-tcard-mark">&rdquo;</div>' +
        '<p class="cat-tcard-quote">' + t.quote + '</p>' +
        '<div class="cat-tcard-attr">' +
          '<div class="cat-tcard-avatar">' + t.initials + '</div>' +
          '<div><div class="cat-tcard-name">' + t.name + '</div><div class="cat-tcard-role">' + t.role + '</div></div>' +
        '</div>';
      tdots.forEach(function (d, n) { d.classList.toggle('active', n === ti); });
    }
    var tprev = document.querySelector('.cat-tprev');
    var tnext = document.querySelector('.cat-tnext');
    if (tprev) tprev.addEventListener('click', function () { ti = (ti - 1 + testimonials.length) % testimonials.length; renderT(); });
    if (tnext) tnext.addEventListener('click', function () { ti = (ti + 1) % testimonials.length; renderT(); });
    renderT();
  }

  /* ===== FAQ accordion (smooth height animation) ===== */
  var faqRoot = document.getElementById('js-faq');
  if (faqRoot) {
    var faqItems = Array.prototype.slice.call(faqRoot.querySelectorAll('.cat-faq-item'));
    var faqReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function faqOpen(item) {
      var body = item.querySelector('.cat-faq-a');
      item.classList.add('is-open');
      if (faqReduced || item._busy) { body.style.display = 'block'; return; }
      item._busy = true;
      body.style.display = 'block';
      body.style.overflow = 'hidden';
      body.style.height = '0px';
      body.style.opacity = '0';
      var full = body.scrollHeight;
      requestAnimationFrame(function () {
        body.style.transition = 'height .42s cubic-bezier(.22,.7,.2,1),opacity .3s ease';
        body.style.height = full + 'px';
        body.style.opacity = '1';
        setTimeout(function () {
          body.style.transition = ''; body.style.height = ''; body.style.opacity = ''; body.style.overflow = '';
          item._busy = false;
        }, 440);
      });
    }

    function faqClose(item) {
      var body = item.querySelector('.cat-faq-a');
      item.classList.remove('is-open');
      if (faqReduced || item._busy) { body.style.display = 'none'; return; }
      item._busy = true;
      body.style.overflow = 'hidden';
      body.style.height = body.scrollHeight + 'px';
      body.style.opacity = '1';
      requestAnimationFrame(function () {
        body.style.transition = 'height .38s cubic-bezier(.32,.06,.24,1),opacity .3s ease';
        body.style.height = '0px';
        body.style.opacity = '0';
        setTimeout(function () {
          body.style.display = 'none';
          body.style.transition = ''; body.style.height = ''; body.style.opacity = ''; body.style.overflow = '';
          item._busy = false;
        }, 390);
      });
    }

    faqItems.forEach(function (item) {
      item.querySelector('.cat-faq-q').addEventListener('click', function () {
        var wasOpen = item.classList.contains('is-open');
        faqItems.forEach(function (el) { if (el !== item && el.classList.contains('is-open')) faqClose(el); });
        if (wasOpen) faqClose(item); else faqOpen(item);
      });
    });
  }

  /* ===== Hybrid Delivery engine (ecd): mouse-lens map reveal ===== */
  (function () {
    var sec = document.querySelector('.ecd-sec');
    var sharp = sec && sec.querySelector('.ecd-sharp');
    var dim = sec && sec.querySelector('.ecd-dim');
    if (!sec || !sharp || prefersReducedMotion) return;
    sec.addEventListener('mousemove', function (e) {
      if (window.innerWidth <= 880) return;
      var r = sharp.getBoundingClientRect();
      var m = 'radial-gradient(circle 250px at ' + (e.clientX - r.left).toFixed(0) + 'px ' + (e.clientY - r.top).toFixed(0) + 'px,rgba(0,0,0,.5) 0%,rgba(0,0,0,.32) 55%,rgba(0,0,0,0) 100%)';
      sharp.style.webkitMaskImage = m; sharp.style.maskImage = m;
      sharp.style.opacity = '1';
      if (dim) {
        var rd = dim.getBoundingClientRect();
        var md = 'radial-gradient(circle 250px at ' + (e.clientX - rd.left).toFixed(0) + 'px ' + (e.clientY - rd.top).toFixed(0) + 'px,rgba(0,0,0,.5) 0%,rgba(0,0,0,.68) 55%,#000 100%)';
        dim.style.webkitMaskImage = md; dim.style.maskImage = md;
      }
    });
    sec.addEventListener('mouseleave', function () {
      sharp.style.opacity = '0';
      if (dim) { dim.style.webkitMaskImage = ''; dim.style.maskImage = ''; }
    });
  })();

  /* ===== Hybrid Delivery engine (ecd): animated connector lines + traveling dots ===== */
  (function () {
    var stage = document.querySelector('.ecd-stage');
    var svg = stage && stage.querySelector('.ecd-net');
    var gear = stage && stage.querySelector('.ecd-gear');
    if (!svg || !gear) return;
    var raf = null, t = null;
    var paint = function () {
      svg.innerHTML = '';
      svg.removeAttribute('viewBox');
      var SB = stage.getBoundingClientRect();
      var rel = function (el) { var r = el.getBoundingClientRect(); return { x: r.left - SB.left, y: r.top - SB.top, w: r.width, h: r.height }; };
      var g = rel(gear);
      var core = { x: g.x + g.w / 2, y: g.y + g.h / 2, r: g.w / 2 + 10 };
      var EL = 9;
      var mkPath = function (d, stroke) {
        var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.setAttribute('d', d);
        p.setAttribute('fill', 'none');
        p.setAttribute('stroke', stroke || 'rgba(42,223,180,.4)');
        p.setAttribute('stroke-width', '1.4');
        p.setAttribute('stroke-linecap', 'round');
        svg.appendChild(p);
        return p;
      };
      var plates = Array.prototype.map.call(stage.querySelectorAll('.ecd-src > div'), function (el) {
        var z = rel(el);
        return { cx: z.x + z.w / 2, bottom: z.y + z.h, el: el };
      });
      var busTop = Math.max.apply(null, plates.map(function (p) { return p.bottom; })) + 14;
      var busBottom = core.y - core.r - 12;
      var order = plates.map(function (p, i) { return i; }).sort(function (a, b) { return Math.abs(plates[a].cx - core.x) - Math.abs(plates[b].cx - core.x); });
      var step = order.length > 1 ? (busBottom - busTop) / (order.length - 1) : 0;
      order.forEach(function (idx, rank) { plates[idx].bus = busTop + rank * step; });
      ['l', 'r'].forEach(function (k) {
        var dir = k === 'l' ? -1 : 1;
        plates.filter(function (p) { return (p.cx < core.x ? 'l' : 'r') === k && Math.abs(p.cx - core.x) > 6; })
          .sort(function (a, b) { return Math.abs(a.cx - core.x) - Math.abs(b.cx - core.x); })
          .forEach(function (p, i) { p.off = dir * (core.r * 0.28 + i * core.r * 0.3); });
      });
      var inPaths = plates.map(function (p) {
        if (Math.abs(p.cx - core.x) <= 6) return mkPath('M' + p.cx + ',' + p.bottom + ' V' + (core.y - core.r));
        var dir = p.cx < core.x ? 1 : -1;
        var tx = core.x + p.off;
        var ey = core.y - Math.sqrt(Math.max(1, core.r * core.r - p.off * p.off));
        return mkPath('M' + p.cx + ',' + p.bottom + ' V' + (p.bus - EL) +
          ' Q' + p.cx + ',' + p.bus + ' ' + (p.cx + dir * EL) + ',' + p.bus +
          ' H' + (tx - dir * EL) +
          ' Q' + tx + ',' + p.bus + ' ' + tx + ',' + (p.bus + EL) +
          ' V' + ey);
      });
      var cardEls = Array.prototype.slice.call(stage.querySelectorAll('.ecd-out > div'));
      var cards = cardEls.map(function (el) {
        var z = rel(el);
        return { cx: z.x + z.w / 2, top: z.y, el: el };
      });
      var mkHalo = function (el, i) {
        Array.prototype.forEach.call(el.querySelectorAll('.ecd-halo'), function (n) { n.remove(); });
        var b = el.getBoundingClientRect(), R = 9, w = b.width, h = b.height;
        var sv = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        sv.setAttribute('class', 'ecd-halo');
        sv.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
        sv.setAttribute('preserveAspectRatio', 'none');
        sv.setAttribute('aria-hidden', 'true');
        var col = i === 0 ? '#2ADFB4' : '#FFFFFF';
        var half = function (dir) {
          var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          var d = dir > 0
            ? 'M' + (w / 2) + ',0 H' + (w - R) + ' Q' + w + ',0 ' + w + ',' + R + ' V' + (h - R) + ' Q' + w + ',' + h + ' ' + (w - R) + ',' + h + ' H' + (w / 2)
            : 'M' + (w / 2) + ',0 H' + R + ' Q0,0 0,' + R + ' V' + (h - R) + ' Q0,' + h + ' ' + R + ',' + h + ' H' + (w / 2);
          p.setAttribute('d', d);
          p.setAttribute('fill', 'none');
          p.setAttribute('stroke', col);
          p.setAttribute('stroke-width', '2');
          p.setAttribute('stroke-linecap', 'round');
          p.style.opacity = '0';
          p.style.filter = 'drop-shadow(0 0 6px ' + (i === 0 ? 'rgba(42,223,180,.8)' : 'rgba(255,255,255,.6)') + ')';
          sv.appendChild(p);
          return p;
        };
        el.appendChild(sv);
        var a = half(1), b2 = half(-1);
        var L = a.getTotalLength();
        [a, b2].forEach(function (p) { p.setAttribute('stroke-dasharray', '46 ' + L); p.setAttribute('stroke-dashoffset', '0'); });
        return function () {
          [a, b2].forEach(function (p) {
            p.getAnimations().forEach(function (an) { an.cancel(); });
            p.animate(
              [{ strokeDashoffset: 46, opacity: 0 }, { opacity: 1, offset: 0.15 }, { strokeDashoffset: -L, opacity: 0 }],
              { duration: 1100, easing: 'cubic-bezier(.3,.6,.3,1)' }
            );
          });
        };
      };
      var halo = cardEls.map(function (el, i) { try { return mkHalo(el, i); } catch (e) { return null; } });
      var lvl = core.y + core.r + Math.max(18, (Math.min.apply(null, cards.map(function (c) { return c.top; })) - (core.y + core.r)) / 2);
      var outPaths = cards.map(function (c, ci) {
        var wcol = ci === 0 ? null : 'rgba(255,255,255,.2)';
        var side = Math.abs(c.cx - core.x) <= 6 ? 0 : (c.cx > core.x ? 1 : -1);
        var off = side * core.r * 0.3;
        var sx = core.x + off;
        var sy = core.y + Math.sqrt(Math.max(1, core.r * core.r - off * off));
        if (!side || Math.abs(c.cx - sx) < 2 * EL) {
          return mkPath('M' + sx + ',' + sy + ' V' + lvl + ' H' + c.cx + ' V' + c.top, wcol);
        }
        var dir = c.cx > sx ? 1 : -1;
        return mkPath('M' + sx + ',' + sy + ' V' + (lvl - EL) +
          ' Q' + sx + ',' + lvl + ' ' + (sx + dir * EL) + ',' + lvl +
          ' H' + (c.cx - dir * EL) +
          ' Q' + c.cx + ',' + lvl + ' ' + c.cx + ',' + (lvl + EL) +
          ' V' + c.top, wcol);
      });
      if (raf) cancelAnimationFrame(raf);
      if (prefersReducedMotion) return;
      var dot = function (path, white) {
        var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('r', '5');
        c.setAttribute('opacity', '0');
        try { var p0 = path.getPointAtLength(0); c.setAttribute('cx', p0.x); c.setAttribute('cy', p0.y); } catch (e) {}
        c.setAttribute('fill', white ? '#FFFFFF' : '#2ADFB4');
        c.setAttribute('stroke', '#11161C');
        c.setAttribute('stroke-width', '1.6');
        svg.appendChild(c);
        return c;
      };
      var SPEED = 0.19;
      if (!inPaths.length || !outPaths.length) return;
      var runners = plates.map(function (p, i) {
        var inPath = inPaths[i], outPath = outPaths.length ? outPaths[i % outPaths.length] : null;
        var inLen = inPath.getTotalLength(), outLen = outPath ? outPath.getTotalLength() : 0;
        return {
          inPath: inPath, inLen: inLen, outPath: outPath, outLen: outLen,
          card: outPaths.length ? i % outPaths.length : 0,
          inT: inLen / SPEED,
          outT: outPath ? outLen / SPEED : 260,
          plateEl: p.el,
          inDot: dot(inPath),
          outDot: outPath ? dot(outPath, (i % outPaths.length) !== 0) : null,
          phase: 0
        };
      });
      var CYCLE = Math.max.apply(null, runners.map(function (r) { return r.inT + r.outT; })) + 700;
      var jit = [0, 0.42, 0.17, 0.71, 0.28, 0.58, 0.86, 0.09];
      runners.forEach(function (r, i) {
        var slot = ((i / runners.length) + (jit[i % jit.length] / runners.length)) * CYCLE;
        var ph = ((slot - r.inT) / CYCLE) % 1;
        if (ph < 0) ph += 1;
        r.phase = ph;
      });
      var t0 = performance.now();
      var place = function (el, path, len, f) {
        var pt = path.getPointAtLength(len * f);
        el.setAttribute('cx', pt.x.toFixed(2));
        el.setAttribute('cy', pt.y.toFixed(2));
        el.setAttribute('opacity', '1');
      };
      var tick = function (now) {
        if (!svg.isConnected) { clearTimeout(t); t = setTimeout(paint, 200); return; }
        runners.forEach(function (r) {
          var tt = (now - t0 - r.phase * CYCLE) % CYCLE;
          if (tt < 0) tt += CYCLE;
          if (tt < r.inT) {
            place(r.inDot, r.inPath, r.inLen, tt / r.inT);
            if (r.outDot) r.outDot.setAttribute('opacity', '0');
          } else if (tt < r.inT + r.outT) {
            r.inDot.setAttribute('opacity', '0');
            if (r.outDot) place(r.outDot, r.outPath, r.outLen, (tt - r.inT) / r.outT);
          } else {
            r.inDot.setAttribute('opacity', '0');
            if (r.outDot) r.outDot.setAttribute('opacity', '0');
            if (!r.fired) { r.fired = true; var f = halo[r.card]; if (f) f(); }
          }
          if (tt < r.inT + r.outT) r.fired = false;
          var hot = tt < Math.min(420, r.inT * 0.45);
          if (hot !== r.hot) { r.hot = hot; if (r.plateEl) r.plateEl.classList.toggle('ecd-hot', hot); }
        });
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    paint();
    setTimeout(paint, 300);
    window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(paint, 100); });
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(function () { clearTimeout(t); t = setTimeout(paint, 80); });
      ro.observe(stage);
    }
  })();

  /* ===== Ask AI strips: interactive dot-grid background (any number of .ai-sec) ===== */
  Array.prototype.forEach.call(document.querySelectorAll('.ai-sec'), function (sec) {
    var cv = sec.querySelector('.ai-px');
    if (!cv || prefersReducedMotion) return;
    var ctx = cv.getContext('2d');
    var PITCH = 12, SZ = 3, R = 110, PUSH = 18;
    var pts = [], W = 0, H = 0, dpr = 1, mx = -9999, my = -9999, raf = null, live = false;
    var draw = function () {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      var th = cv.closest('[data-theme]');
      var dark = th && th.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = sec.classList.contains('eb-strip-dark') ? 'rgba(255,255,255,.10)' : dark ? 'rgba(42,223,180,.18)' : 'rgba(0,153,125,.22)';
      for (var i = 0; i < pts.length; i++) { var p = pts[i]; ctx.fillRect(p.hx + p.x - SZ / 2, p.hy + p.y - SZ / 2, SZ, SZ); }
    };
    var build = function () {
      if (!cv.isConnected) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = sec.clientWidth; H = sec.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      pts = [];
      var cols = Math.ceil(W / PITCH), rows = Math.ceil(H / PITCH);
      for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
        pts.push({ hx: c * PITCH + PITCH / 2, hy: r * PITCH + PITCH / 2, x: 0, y: 0 });
      }
      draw();
    };
    var tick = function () {
      if (!cv.isConnected) { live = false; return; }
      var moving = false;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i], tx = 0, ty = 0;
        var dx = p.hx - mx, dy = p.hy - my, d = Math.hypot(dx, dy);
        if (d < R && d > 0.01) { var f = 1 - d / R; tx = dx / d * PUSH * f; ty = dy / d * PUSH * f; }
        p.x += (tx - p.x) * 0.14; p.y += (ty - p.y) * 0.14;
        if (Math.abs(p.x - tx) > 0.08 || Math.abs(p.y - ty) > 0.08) moving = true;
      }
      draw();
      if (moving || mx > -9000) raf = requestAnimationFrame(tick); else live = false;
    };
    var wake = function () { if (!live) { live = true; raf = requestAnimationFrame(tick); } };
    sec.addEventListener('pointermove', function (e) {
      if (window.innerWidth <= 880) return;
      var b = sec.getBoundingClientRect();
      mx = e.clientX - b.left; my = e.clientY - b.top;
      wake();
    });
    sec.addEventListener('pointerleave', function () { mx = -9999; my = -9999; wake(); });
    build();
    var bt;
    window.addEventListener('resize', function () { clearTimeout(bt); bt = setTimeout(build, 120); });
    if (window.ResizeObserver) {
      var ro2 = new ResizeObserver(function () { clearTimeout(bt); bt = setTimeout(build, 100); });
      ro2.observe(sec);
    }
  });

  /* ===== Catering parallax ===== */
  var catering = document.getElementById('js-catering');
  if (catering && !prefersReducedMotion) {
    var raf = null;
    var onScroll = function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var r = catering.getBoundingClientRect();
        var y = (window.innerHeight - r.top) * -0.16;
        catering.style.backgroundPosition = 'center ' + y.toFixed(1) + 'px, center 0';
        var prog = Math.max(0, Math.min(1, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
        var pos = (160 - prog * 320).toFixed(1) + '%';
        catering.querySelectorAll('.stat-num').forEach(function (el) { el.style.backgroundPositionX = pos; });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ===== Restaurants page: model tabs ===== */
  var restTabs = document.getElementById('js-rest-tabs');
  if (restTabs) {
    var tabBtns = restTabs.querySelectorAll('.rest-tab');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        tabBtns.forEach(function (b) { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-selected', String(b === btn)); });
        document.querySelectorAll('.rest-model-panel').forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-tab') === target); });
        document.querySelectorAll('.rest-diagram').forEach(function (d) {
          var match = d.getAttribute('data-tab') === target;
          d.classList.toggle('is-active', match);
          if (match && !prefersReducedMotion) { d.classList.remove('rest-diagram-fade'); void d.offsetWidth; d.classList.add('rest-diagram-fade'); }
        });
        document.querySelectorAll('.toast-model-case').forEach(function (c) { c.classList.toggle('is-active', c.getAttribute('data-tab') === target); });
      });
    });
  }

  /* ===== Restaurants page: economics accordion ===== */
  var ecoRoot = document.getElementById('js-rest-eco');
  if (ecoRoot) {
    var ecoRows = ecoRoot.querySelectorAll('.rest-eco-row');
    ecoRows.forEach(function (row) {
      row.addEventListener('click', function () {
        var wasOpen = row.classList.contains('is-open');
        ecoRows.forEach(function (r) { r.classList.remove('is-open'); });
        if (!wasOpen) row.classList.add('is-open');
      });
    });
  }

  /* ===== Restaurants page: testimonial carousel ===== */
  var restTestimonials = [
    { logo: 'assets/logo-portillos.svg', initials: 'MO', quote: '“With more than 60 Portillo’s locations nationwide and the highest average unit sales volumes in the fast-casual industry, we have a lot of deliveries to manage. It’s important that our brand is well-represented. Our experience with Cartwheel has been so positive that we invested in the company so they can further develop services with brands in mind.”', name: 'Michael Osanloo', role: 'CEO, Portillo’s' },
    { logo: 'assets/logo-pfchangs.svg', initials: 'CB', quote: '“Cartwheel allows us to handle the highest priority orders with self-delivery, ensuring the experience is seamless, delivered with P.F. Chang’s hospitality and encouraging the customer to return for repeat deliveries through our native ordering platforms.”', name: 'Candice Barnett', role: 'VP, Off-Premise Dining, P.F. Chang’s' },
    { logo: 'assets/logo-jasons-deli.svg', initials: 'AS', quote: '“By implementing Cartwheel’s unified delivery management platform, we’ve streamlined our operations, reduced the load on team members, and enhanced our ability to ensure the best, most efficient customer service across all ordering channels.”', name: 'Amy Schuster', role: 'VP of IT, Jason’s Deli' },
    { logo: 'assets/logo-portillos.svg', initials: 'NS', quote: '“With Cartwheel we were able to use our team members to deliver our highest-value orders. Instead of relying exclusively on third-party delivery companies for fulfilment, we have been able to cross-train our staff so that they can become drivers for our own fleet.”', name: 'Nick Scarpino', role: 'SVP of Marketing, Portillo’s' }
  ];
  var restTcard = document.getElementById('js-tcard-rest');
  var restTdotsEl = document.getElementById('js-tdots-rest');
  if (restTcard && restTdotsEl) {
    var rti = 0;
    var restTdots = restTestimonials.map(function (_, n) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'case-dot';
      dot.setAttribute('aria-label', 'Testimonial ' + (n + 1));
      dot.addEventListener('click', function () { rti = n; renderRestT(); });
      restTdotsEl.appendChild(dot);
      return dot;
    });
    function renderRestT() {
      var t = restTestimonials[rti];
      restTcard.innerHTML =
        (t.logo ? '<img src="' + t.logo + '" alt="" class="cat-tcard-logo">' : '') +
        '<div class="cat-tcard-mark">&rdquo;</div>' +
        '<p class="cat-tcard-quote">' + t.quote + '</p>' +
        '<div class="cat-tcard-attr">' +
          '<div class="cat-tcard-avatar">' + t.initials + '</div>' +
          '<div><div class="cat-tcard-name">' + t.name + '</div><div class="cat-tcard-role">' + t.role + '</div></div>' +
        '</div>';
      restTdots.forEach(function (d, n) { d.classList.toggle('active', n === rti); });
    }
    var restTprev = document.querySelector('.rest-tprev');
    var restTnext = document.querySelector('.rest-tnext');
    if (restTprev) restTprev.addEventListener('click', function () { rti = (rti - 1 + restTestimonials.length) % restTestimonials.length; renderRestT(); });
    if (restTnext) restTnext.addEventListener('click', function () { rti = (rti + 1) % restTestimonials.length; renderRestT(); });
    renderRestT();
  }

  /* ===== Toast page: testimonial carousel ===== */
  var toastTestimonials = [
    { logo: 'assets/logo-portillos.svg', initials: 'MO', quote: '“With more than 60 Portillo’s locations nationwide and the highest average unit sales volumes in the fast-casual industry, we have a lot of deliveries to manage. It’s important that our brand is well-represented. Our experience with Cartwheel has been so positive that we invested in the company so they can further develop services with brands in mind.”', name: 'Michael Osanloo', role: 'CEO, Portillo’s' },
    { logo: 'assets/logo-pfchangs.svg', initials: 'CB', quote: '“Cartwheel allows us to handle the highest priority orders with self-delivery, ensuring the experience is seamless, delivered with P.F. Chang’s hospitality and encouraging the customer to return for repeat deliveries through our native ordering platforms.”', name: 'Candice Barnett', role: 'VP, Off-Premise Dining, P.F. Chang’s' },
    { logo: 'assets/logo-jasons-deli.svg', initials: 'AS', quote: '“By implementing Cartwheel’s unified delivery management platform, we’ve streamlined our operations, reduced the load on team members, and enhanced our ability to ensure the best, most efficient customer service across all ordering channels.”', name: 'Amy Schuster', role: 'VP of IT, Jason’s Deli' },
    { logo: 'assets/logo-portillos.svg', initials: 'NS', quote: '“With Cartwheel we were able to use our team members to deliver our highest-value orders. Instead of relying exclusively on third-party delivery companies for fulfilment, we have been able to cross-train our staff so that they can become drivers for our own fleet.”', name: 'Nick Scarpino', role: 'SVP of Marketing, Portillo’s' }
  ];
  var toastTcard = document.getElementById('js-tcard-toast');
  var toastTdotsEl = document.getElementById('js-tdots-toast');
  if (toastTcard && toastTdotsEl) {
    var tti = 0;
    var toastTdots = toastTestimonials.map(function (_, n) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'case-dot';
      dot.setAttribute('aria-label', 'Testimonial ' + (n + 1));
      dot.addEventListener('click', function () { tti = n; renderToastT(); });
      toastTdotsEl.appendChild(dot);
      return dot;
    });
    function renderToastT() {
      var t = toastTestimonials[tti];
      toastTcard.innerHTML =
        (t.logo ? '<img src="' + t.logo + '" alt="" class="cat-tcard-logo">' : '') +
        '<div class="cat-tcard-mark">&rdquo;</div>' +
        '<p class="cat-tcard-quote">' + t.quote + '</p>' +
        '<div class="cat-tcard-attr">' +
          '<div class="cat-tcard-avatar">' + t.initials + '</div>' +
          '<div><div class="cat-tcard-name">' + t.name + '</div><div class="cat-tcard-role">' + t.role + '</div></div>' +
        '</div>';
      toastTdots.forEach(function (d, n) { d.classList.toggle('active', n === tti); });
    }
    var toastTprev = document.querySelector('.toast-tprev');
    var toastTnext = document.querySelector('.toast-tnext');
    if (toastTprev) toastTprev.addEventListener('click', function () { tti = (tti - 1 + toastTestimonials.length) % toastTestimonials.length; renderToastT(); });
    if (toastTnext) toastTnext.addEventListener('click', function () { tti = (tti + 1) % toastTestimonials.length; renderToastT(); });
    renderToastT();
  }

  /* ===== Platform Overview page: testimonial carousel ===== */
  var platTestimonials = [
    { photo: 'assets/people/osanloo.jpg', quote: '“With more than 60 Portillo’s locations nationwide and the highest average unit sales volumes in the fast-casual industry, we have a lot of deliveries to manage. Our experience with Cartwheel has been so positive that we invested in the company so they can further develop services with brands in mind.”', name: 'Michael Osanloo', role: 'CEO, Portillo’s' },
    { photo: 'assets/people/barnett.jpg', quote: '“Cartwheel allows us to handle the highest priority orders with self-delivery, ensuring the experience is seamless, delivered with P.F. Chang’s hospitality and encouraging the customer to return for repeat deliveries through our native ordering platforms.”', name: 'Candice Barnett', role: 'VP Off-Premises Dining, P.F. Chang’s' },
    { initials: 'SM', quote: '“With Cartwheel, our delivery program is as customizable as our menu. Since implementing Cartwheel’s tools, Potbelly has been able to offer faster, more efficient delivery to our customers from more than 400 locations nationwide.”', name: 'Sam Martinez', role: 'Business Systems Manager, Potbelly' },
    { photo: 'assets/people/northway.jpg', quote: '“Cartwheel allowed us to adjust our order volume to driver availability, eliminating the worry of having enough drivers to maintain delivery quality.”', name: 'Dino Northway', role: 'Senior Manager Off-Premise Dining, Portillo’s' },
    { photo: 'assets/people/schuster.png', quote: '“By implementing Cartwheel’s unified delivery management platform, we’ve streamlined our operations, reduced the load on team members, and enhanced our ability to ensure the best, most efficient customer service across all ordering channels.”', name: 'Amy Schuster', role: 'Vice President of IT, Jason’s Deli' },
    { photo: 'assets/people/polk.png', quote: '“Together, Cartwheel and Omnicart technologies offer the optimal end-to-end delivery management solution for local delivery operators. Local providers can now access via open APIs the sophisticated tech and customizable offerings typically only available within expensive enterprise platforms.”', name: 'Kevin Polk', role: 'Owner, JackRabbit Deliveries' },
    { initials: 'MS', quote: '“We continue to see real value in maintaining a direct relationship with our guests and investing in our in-house delivery capabilities. Cartwheel helps us bring in-house and third-party delivery together while maintaining a consistent guest experience.”', name: 'Moe Shrikian', role: 'EVP and General Counsel, Hungry Howie’s' }
  ];
  var platTcard = document.getElementById('js-tcard-plat');
  var platTdotsEl = document.getElementById('js-tdots-plat');
  if (platTcard && platTdotsEl) {
    var pti = 0;
    var platTdots = platTestimonials.map(function (_, n) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'case-dot';
      dot.setAttribute('aria-label', 'Testimonial ' + (n + 1));
      dot.addEventListener('click', function () { pti = n; renderPlatT(); });
      platTdotsEl.appendChild(dot);
      return dot;
    });
    function renderPlatT() {
      var t = platTestimonials[pti];
      platTcard.innerHTML =
        '<div class="cat-tcard-mark">&rdquo;</div>' +
        '<p class="cat-tcard-quote">' + t.quote + '</p>' +
        '<div class="cat-tcard-attr">' +
          '<div class="cat-tcard-avatar" style="overflow:hidden">' + (t.photo ? '<img src="' + t.photo + '" alt="" style="width:100%;height:100%;object-fit:cover">' : t.initials) + '</div>' +
          '<div><div class="cat-tcard-name">' + t.name + '</div><div class="cat-tcard-role">' + t.role + '</div></div>' +
        '</div>';
      platTdots.forEach(function (d, n) { d.classList.toggle('active', n === pti); });
    }
    var platTprev = document.querySelector('.plat-tprev');
    var platTnext = document.querySelector('.plat-tnext');
    if (platTprev) platTprev.addEventListener('click', function () { pti = (pti - 1 + platTestimonials.length) % platTestimonials.length; renderPlatT(); });
    if (platTnext) platTnext.addEventListener('click', function () { pti = (pti + 1) % platTestimonials.length; renderPlatT(); });
    renderPlatT();
  }

  /* ===== Delivery Types page: third-party tabs ===== */
  var dtThird = document.getElementById('js-dt-third');
  if (dtThird) {
    var dtSaveWords = ['costs', 'reputation', 'time', 'customers'];
    var dtSaveEl = document.getElementById('js-dt-save-word');
    var dtTabs = dtThird.querySelectorAll('.dt-third-tab');
    dtTabs.forEach(function (tab) {
      var btn = tab.querySelector('.dt-third-tab-btn');
      btn.addEventListener('click', function () {
        var target = tab.getAttribute('data-tab');
        dtTabs.forEach(function (t) {
          var active = t === tab;
          t.classList.toggle('is-active', active);
          var chev = t.querySelector('.dt-third-tab-btn i');
          chev.className = 'ti ' + (active ? 'ti-chevron-down' : 'ti-chevron-right');
        });
        dtThird.querySelectorAll('.dt-third-panel').forEach(function (p) {
          p.classList.toggle('is-active', p.getAttribute('data-panel') === target);
        });
        if (dtSaveEl) dtSaveEl.textContent = dtSaveWords[+target] || dtSaveWords[0];
      });
    });
  }
})();
