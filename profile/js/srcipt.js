//spot 제어
const video = document.getElementById('scroll-video');
const Spotinner = document.querySelector('.spot .inner');
const headerblur = document.querySelector('.header');

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
}

disableScroll();

video.addEventListener('ended', () => {
  Spotinner.classList.add('active');
  headerblur.classList.add('blur');

  enableScroll();
});

video.addEventListener('loadedmetadata', () => {
  video.play();
});

// nav 제어
document.addEventListener('DOMContentLoaded', function () {
  const navHeight = document.querySelector('.nav').offsetHeight;
  const navItems = document.querySelectorAll('.nav_item a');

  function handleScroll() {
    const scrollPosition = window.scrollY + navHeight;

    navItems.forEach((item, i) => {
      const targetId = item.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const targetTop = targetSection.offsetTop;
        const targetBottom = targetTop + targetSection.offsetHeight;

        if (scrollPosition >= targetTop && scrollPosition < targetBottom) {
          navItems.forEach(navItem => navItem.parentElement.classList.remove('on'));
          navItems[i].parentElement.classList.add('on');
        }
      }
    });
  }

  window.addEventListener('scroll', handleScroll);

  navItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      navItems.forEach(navItem => navItem.parentElement.classList.remove('on'));
      this.parentElement.classList.add('on');

      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const targetTop = targetSection.offsetTop - navHeight;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // 네비게이션 모바일 버튼 이벤트
  const btnNavMo = document.querySelector('.btn_nav_mo');
  const btnCloseMo = document.querySelector('.btn_close_mo');
  const navItemLinks = document.querySelectorAll('.nav_item a');

  btnNavMo.addEventListener('click', function (event) {
    document.querySelector('.header').classList.add('open');
  });

  btnCloseMo.addEventListener('click', function (event) {
    document.querySelector('.header').classList.remove('open');
  });

  navItemLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      document.querySelector('.header').classList.remove('open');
    });
  });

  // 공지사항 영역 제어
  const contentTitles = document.querySelectorAll('.content_title');

  contentTitles.forEach(title => {
    title.addEventListener('click', function (event) {
      const contentItem = this.closest('.content_item');
      const contentDetail = contentItem.querySelector('.content_detail');
      contentItem.classList.toggle('open');
      const isContentOpen = contentItem.classList.contains('open');
      const max_height_value = isContentOpen ? contentDetail.scrollHeight + 'px' : 0;
      contentDetail.style.transition = 'max-height 0.2s';
      contentDetail.style.maxHeight = max_height_value;
      setTimeout(function () {
        contentDetail.style.transition = '';
      }, 10);
    });
  });

  // 스크롤 시, motion active
  let scrollTopRatio;

  function getScrollTop() {
    if (document.scrollingElement && document.scrollingElement.scrollHeight) {
      scrollTopRatio = window.innerHeight / document.scrollingElement.scrollHeight;
    } else {
      scrollTopRatio = 1;
    }
    return window.scrollY * scrollTopRatio;
  }

  function aniChecker() {
    document.querySelectorAll('.motion').forEach(element => {
      const pos = element.getBoundingClientRect();
      const wY = getScrollTop();
      const wH = window.innerHeight;
      const oH = pos.height;

      if (pos.top >= wY && oH + pos.top <= wY + wH) {
        element.classList.add('active');
      } else if ((pos.top <= wY && pos.top + oH > wY) || (pos.top >= wY && pos.top <= wY + wH)) {
        element.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', aniChecker);
});

// 팝업 클로즈 버튼 + 쿠키
document.addEventListener("DOMContentLoaded", function () {
  const popupWrap = document.querySelector('.popup_wrap');
  const btnClose = document.querySelector('.btn_close');
  // const cookieTodayBtn = document.querySelector('.cookie_today');

  btnClose.addEventListener('click', function () {
    popupWrap.classList.remove('on');
  });

  // cookieTodayBtn.addEventListener('click', function () {
  //   cookieTodayBtn.classList.add('on');
  //   setTimeout(function () {
  //     cookieTodayBtn.classList.remove('on');
  //     const expiryDate = new Date();
  //     expiryDate.setDate(expiryDate.getDate() + 1);
  //     document.cookie = 'hidePopup=true; expires=' + expiryDate.toUTCString() + '; path=/';
  //     popupWrap.classList.remove('on');
  //   }, 300);
  // });

  // function checkPopupCookie() {
  //   if (document.cookie.split(';').some((item) => item.trim().startsWith('hidePopup='))) {
  //     popupWrap.classList.remove('on');
  //   }
  // }

  // checkPopupCookie();
});