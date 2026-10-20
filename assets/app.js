/* 翡翠山户外营地 · 页面交互 */
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  /* ---------- 导航：滚动固色 ---------- */
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('solid', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 导航：移动端菜单 ---------- */
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }
  if (nav && navLinks) {
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }
  document.addEventListener('click', function (e) {
    if (nav && nav.classList.contains('open') && !nav.contains(e.target)) {
      nav.classList.remove('open');
    }
  });

  /* ---------- 导航：滚动高亮当前分区 ---------- */
  if (navLinks) {
    var anchors = Array.prototype.slice.call(navLinks.querySelectorAll('a[href^="#"]'));
    var map = {};
    anchors.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });

    var targets = anchors
      .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
      .filter(Boolean);

    if ('IntersectionObserver' in window && targets.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          anchors.forEach(function (a) { a.classList.remove('active'); });
          var act = map[en.target.id];
          if (act) act.classList.add('active');
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      targets.forEach(function (t) { spy.observe(t); });
    }
  }

  /* ---------- 滚动渐入 ---------- */
  var reveal = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -60px 0px' });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 图片灯箱 ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-lb]'));
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbX = document.getElementById('lbX');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var index = 0;

  function show(i) {
    if (!items.length) return;
    index = (i % items.length + items.length) % items.length;
    var el = items[index];
    lbImg.src = el.getAttribute('data-lb');
    lbImg.alt = el.getAttribute('data-cap') || '';
    if (lbCap) lbCap.textContent = el.getAttribute('data-cap') || '';
    lb.classList.add('on');
    document.body.style.overflow = 'hidden';
    if (lbX) lbX.focus();
  }

  function hide() {
    if (!lb) return;
    lb.classList.remove('on');
    document.body.style.overflow = '';
  }

  if (lb && items.length) {
    items.forEach(function (el, i) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        show(i);
      });
    });

    if (lbX) lbX.addEventListener('click', hide);
    if (lbPrev) lbPrev.addEventListener('click', function (e) { e.stopPropagation(); show(index - 1); });
    if (lbNext) lbNext.addEventListener('click', function (e) { e.stopPropagation(); show(index + 1); });

    lb.addEventListener('click', function (e) {
      if (e.target === lb) hide();
    });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape') hide();
      else if (e.key === 'ArrowLeft') show(index - 1);
      else if (e.key === 'ArrowRight') show(index + 1);
    });
  }
})();
