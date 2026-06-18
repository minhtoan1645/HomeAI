/* ============================================================
   Use-case carousel — vòng lặp vô hạn (infinite loop).
   - Vẫn hiển thị 3 card / lượt (desktop), 2 (tablet).
   - Mỗi lần bấm prev/next trượt đúng 1 card; hết card thì
     quay vòng (card cuối -> card đầu và ngược lại).
   - 4 dots: mỗi dot = 1 bước, dot active chạy theo card.
   - Mobile <768px: cuộn ngang native (JS không can thiệp).
   Tự đọc số card trong DOM nên thêm/bớt card đều chạy được.
   ============================================================ */
(function () {
  'use strict';

  var section = document.querySelector('.usecase-section');
  if (!section) return;

  var track = section.querySelector('.usecase-track');
  var prevBtn = section.querySelector('.usecase-nav--prev');
  var nextBtn = section.querySelector('.usecase-nav--next');
  var dots = Array.prototype.slice.call(section.querySelectorAll('.usecase-dot'));
  if (!track) return;

  var index = 0;       // bước hiện tại (0..n-1) -> dot active
  var animating = false;

  function cards() {
    return Array.prototype.slice.call(track.querySelectorAll('.usecase-card'));
  }

  function visibleCount() {
    var w = window.innerWidth;
    if (w >= 1025) return 3;
    if (w >= 768) return 2;
    return 1;
  }

  function isMobile() {
    return window.innerWidth < 768;
  }

  function step() {
    var list = cards();
    if (!list.length) return 0;
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return list[0].offsetWidth + gap;
  }

  function loopable() {
    return cards().length > visibleCount();
  }

  function setActiveDot() {
    var n = cards().length;
    dots.forEach(function (d, i) {
      d.classList.toggle('usecase-dot--active', i === (index % n));
    });
  }

  function clearTransition() {
    track.style.transition = 'none';
    // force reflow để áp dụng ngay
    void track.offsetWidth;
    track.style.transition = '';
  }

  function next() {
    if (isMobile() || animating || !loopable()) return;
    var list = cards();
    animating = true;

    track.style.transform = 'translateX(' + (-step()) + 'px)';

    var onEnd = function () {
      track.removeEventListener('transitionend', onEnd);
      track.style.transition = 'none';
      track.appendChild(list[0]);          // card đầu -> cuối
      track.style.transform = 'translateX(0)';
      clearTransition();
      animating = false;
    };
    track.addEventListener('transitionend', onEnd);

    index = (index + 1) % list.length;
    setActiveDot();
  }

  function prev() {
    if (isMobile() || animating || !loopable()) return;
    var list = cards();
    animating = true;

    // Đưa card cuối lên đầu, dịch sẵn sang trái rồi trượt về 0 -> hiệu ứng lùi
    track.style.transition = 'none';
    track.insertBefore(list[list.length - 1], list[0]);
    track.style.transform = 'translateX(' + (-step()) + 'px)';
    void track.offsetWidth;
    track.style.transition = '';
    track.style.transform = 'translateX(0)';

    var onEnd = function () {
      track.removeEventListener('transitionend', onEnd);
      animating = false;
    };
    track.addEventListener('transitionend', onEnd);

    index = (index - 1 + list.length) % list.length;
    setActiveDot();
  }

  function goTo(target) {
    if (isMobile() || animating || !loopable()) return;
    var n = cards().length;
    var diff = ((target - index) % n + n) % n;   // số bước tiến để tới dot bấm
    if (diff === 0) return;
    track.style.transition = 'none';
    for (var k = 0; k < diff; k++) {
      track.appendChild(cards()[0]);
    }
    track.style.transform = 'translateX(0)';
    clearTransition();
    index = target % n;
    setActiveDot();
  }

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { goTo(i); });
  });

  function syncOnResize() {
    if (isMobile()) {
      track.style.transform = '';
    } else {
      track.style.transform = 'translateX(0)';
    }
    setActiveDot();
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncOnResize, 120);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setActiveDot);
  } else {
    setActiveDot();
  }
})();
