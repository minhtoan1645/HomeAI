(function () {
  'use strict';

  /* =====================================================
     0. I18N — BỘ CHỮ THEO NGÔN NGỮ
  ===================================================== */
  var I18N = {
    vi: {
      processing:  'Đang xử lý...',
      errorPrefix: 'Gửi thông tin thất bại.\n',
      retry:       'Vui lòng thử lại.',
      networkError: 'Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.'
    },
    ja: {
      // TODO: rà lại bản dịch tiếng Nhật
      processing:  '処理中...',
      errorPrefix: 'エラー: ',
      retry:       'もう一度お試しください。',
      networkError: '通信エラーが発生しました。ネットワークを確認して再度お試しください。'
    }
  };
  var LANG = I18N[document.documentElement.lang] || I18N.vi;


  /* =====================================================
     0b. NÚT ĐỔI NGÔN NGỮ 
  ===================================================== */
  var langBtn = document.querySelector('.nav-lang');
  if (langBtn) {
    var langWrap = langBtn.closest('.nav-lang-wrap');

    var closeLang = function () {
      langBtn.setAttribute('aria-expanded', 'false');
    };

    /* Bấm nút → đảo trạng thái mở/đóng */
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = langBtn.getAttribute('aria-expanded') === 'true';
      langBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });

    /* Bấm ra ngoài → đóng */
    document.addEventListener('click', function (e) {
      if (langWrap && !langWrap.contains(e.target)) closeLang();
    });

    /* Nhấn Esc → đóng */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLang();
    });
  }


  /* =====================================================
     1. ĐÓNG MENU MOBILE
  ===================================================== */
  var toggle = document.getElementById('nav-toggle');
  if (toggle) {
    document.querySelectorAll('.nav-mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.checked = false;
      });
    });
  }


  /* =====================================================
     2. FORM ĐĂNG KÝ — GỌI API 
  ===================================================== */
  var form     = document.getElementById('lien-he-form');
  var overlay  = document.getElementById('success-overlay');
  var closeBtn = document.getElementById('success-close');

  function openPopup() {
    overlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  if (overlay && closeBtn) {
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn    = form.querySelector('.form-submit');
      var originalHTML = submitBtn.innerHTML; 

      var payload = {
        name:    form.elements['name'].value,
        email:   form.elements['email'].value,
        message: form.elements['message'].value,
        description: JSON.stringify({
          contactPerson: form.elements['contact_person'].value,
          phone:         form.elements['phone'].value,
          confirmPolicy: document.getElementById('f-consent').checked
        })
      };

      submitBtn.disabled  = true;
      submitBtn.innerHTML = LANG.processing;

      fetch('https://api-hp.viettelsoftware.com:8443/api/v1/profiles/email-website/create', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            openPopup();
          } else {
            return res.text().then(function (errText) {
              alert(LANG.errorPrefix + (errText || LANG.retry));
            });
          }
        })
        .catch(function () {
          alert(LANG.networkError);
        })
        .finally(function () {
          submitBtn.disabled  = false;
          submitBtn.innerHTML = originalHTML;
        });
    });
  }


  /* =====================================================
     3. PAIN CARDS 
  ===================================================== */
  if (window.matchMedia('(hover: none)').matches) {
    var cards = document.querySelectorAll('.pain-card');
    if (cards.length) {
      var clearAllCards = function () {
        cards.forEach(function (c) { c.classList.remove('pain-card--active'); });
      };
      cards.forEach(function (card) {
        card.addEventListener('touchstart', function () {
          clearAllCards();
          card.classList.add('pain-card--active');
        }, { passive: true });
      });
      document.addEventListener('touchend',    clearAllCards, { passive: true });
      document.addEventListener('touchcancel', clearAllCards, { passive: true });
    }
  }


  /* =====================================================
     4. AUTO-SLIDE CAROUSEL
  ===================================================== */
  function initInfiniteCarousel(trackSel, radioPrefix, realCount, intervalMs) {
    var track = document.querySelector(trackSel);
    if (!track) return;

    var index = 0;

    /* Bước di chuyển = chiều rộng 1 item + gap (px) */
    function stepPx() {
      var gap = parseFloat(getComputedStyle(track).gap) || 0;
      return track.children[0].offsetWidth + gap;
    }

    /* Đặt vị trí track; animate=false → nhảy im lặng */
    function setPos(i, animate) {
      if (!animate) track.style.transition = 'none';
      track.style.transform = 'translateX(' + (-stepPx() * i) + 'px)';
      if (!animate) {
        track.offsetHeight; /* flush reflow → transition:none có hiệu lực ngay */
        track.style.transition = '';
      }
    }

    /* Sync dot: click radio → CSS cập nhật dot active */
    function syncDot(i) {
      var radio = document.getElementById(radioPrefix + (i + 1));
      if (radio) radio.click();
    }

    setPos(0, false);
    syncDot(0);

    setInterval(function () {
      index++;
      setPos(index, true);
      syncDot(index % realCount);

      /* Sau khi transition tới clone xong → nhảy im lặng về vị trí 0 */
      if (index === realCount) {
        track.addEventListener('transitionend', function () {
          index = 0;
          setPos(0, false);
        }, { once: true });
      }
    }, intervalMs);
  }

  /* Ứng dụng thực tế: 6 real cards + 3 clones ở cuối track */
  initInfiniteCarousel('.usecase-track', 'uc-', 6, 2000);

  /* Case Study: 4 real slides + 1 clone ở cuối track */
  initInfiniteCarousel('.casestudy-track', 'cs-', 4, 3500);

})();
