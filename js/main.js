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

  /* ===== Catering page: hybrid engine cycle ===== */
  var engineSources = document.getElementById('js-engine-sources');
  var engineFleets = document.getElementById('js-engine-fleets');
  if (engineSources && engineFleets && !prefersReducedMotion) {
    var srcBoxes = engineSources.querySelectorAll('.cat-engine-box');
    var fleetBoxes = engineFleets.querySelectorAll('.cat-engine-fleet');
    var ei = 0;
    setInterval(function () {
      srcBoxes.forEach(function (b, n) { b.classList.toggle('is-active', n === ei % srcBoxes.length); });
      fleetBoxes.forEach(function (b, n) { b.classList.toggle('is-active', n === ei % fleetBoxes.length); });
      ei++;
    }, 1600);
  } else if (engineSources) {
    engineSources.querySelectorAll('.cat-engine-box')[0].classList.add('is-active');
    engineFleets.querySelectorAll('.cat-engine-fleet')[0].classList.add('is-active');
  }

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
