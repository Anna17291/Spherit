const buttonOpenHeaderMenu = document.querySelector('.main-header__open-button');
const isEscapeKey = (evt) => evt.key === 'Escape';

const initSwiper = () => {
  const swiper = new Swiper('.promo__swiper', {
    loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    effect: 'flip',

    pagination: {
      el: '.promo__pagination',
    },

    navigation: {
      prevEl: '.promo__button-prev',
      nextEl: '.promo__button-next',
    },
  })
}

const initPopupSwiper = (current) => {
  const swiper = new Swiper('.popup__swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 25,
    initialSlide: current,
    pagination: {
      el: '.popup__pagination',
    },

    navigation: {
      prevEl: '.popup__button-prev',
      nextEl: '.popup__button-next',
    },
  })
};

const onPhoneInput = () => {
  $("#phone").mask("+7(999) 999-99-99");
};

const changeHeader = () => {
  const breakpoint = window.matchMedia('(min-width: 831px)');
  let scrollHeader = $('.main-header--scroll');
  let topHeader = $('.main-header--top');

  document.addEventListener('scroll', function () {
    if (breakpoint.matches) {
      if ($(this).scrollTop() > 120) {
        scrollHeader.fadeIn();
        topHeader.fadeOut();
        window.addEventListener('resize', function () {
          if (!breakpoint.matches) {
            scrollHeader.fadeOut();
            topHeader.fadeIn();
          }
        })

      } else {
        scrollHeader.fadeOut();
        topHeader.fadeIn();
      }
    }
  })
}

const resizeHeader = () => {
  const breakpoint = window.matchMedia('(min-width: 831px)');
  let scrollHeader = document.querySelector('.main-header--scroll');
  let topHeader = document.querySelector('.main-header--top');
  window.addEventListener('resize', function () {
    if (!breakpoint.matches) {

    }
  })
}

const manageHeader = () => {
  const button = document.querySelector('.hero__button--search');
  const sectionSearch = document.querySelector('.search-block');
  const mobileButton = document.querySelector('.hero__mobile-search-button');

  const openSearch = () => {
    const buttonClose = document.querySelector('.search-block__close-button');
    sectionSearch.classList.remove('search-block--closed');
    sectionSearch.classList.add('search-block--opened');
    button.removeEventListener('click', openSearch);
    buttonClose.addEventListener('click', closeSearch);
    document.addEventListener('scroll', function () {
      if ($(document).scrollTop() < 100) {
        sectionSearch.classList.add('main-header__search-block--on-top')
      } else {
        sectionSearch.classList.remove('main-header__search-block--on-top')
      }
    })
  }

  const closeSearch = () => {


    sectionSearch.classList.add('search-block--closed');
    sectionSearch.classList.remove('search-block--opened');
    button.addEventListener('click', openSearch);
    button.removeEventListener('click', closeSearch);
  }

  const handleSearch = () => {
    if (button) {
      button.addEventListener('click', openSearch);
    }
  }
  mobileButton.addEventListener('click', openSearch);
  handleSearch()
}

const manageForm = () => {
  const failMessage = document.querySelector('.feedback__fail-message');
  let messageSuccess = document.querySelector('.feedback__success-message');
  const showUploadErrorMessage = () => {
    failMessage.classList.add('feedback__fail-message--opened');
    failMessage.classList.remove('feedback__fail-message--closed');
  }

  const closeSuccessMessage = () => {
    messageSuccess.classList.remove('feedback__success-message--opened');
    messageSuccess.classList.add('feedback__success-message--closed');
  }

  const showUploadSuccessMessage = () => {
    messageSuccess.classList.add('feedback__success-message--opened');
    messageSuccess.classList.remove('feedback__success-message--closed');
    setTimeout(closeSuccessMessage, 5000)
  }

  const sendData = (body, onSuccess, onFail,) => {
    const BASE_URL = 'https://echo.htmlacademy.ru';

    fetch(`${BASE_URL}`,
      {
        method: 'POST',
        body,
      },
    )
      .then((response) => {
        if (response.ok) {
          onSuccess();
        }
        else {
          onFail();
        }
      })
      .catch(() => showUploadErrorMessage()
      );
  };

  let pristine = new Pristine(form);
  const initValidatePristine = (onSuccess) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const isValid = pristine.validate();
      if (isValid) {
        sendData(
          new FormData(evt.target),
          () => {
            onSuccess();
            showUploadSuccessMessage();
            form.reset();
          },
          showUploadErrorMessage,
        );
      }
    });
  };

  const clearForm = () => {
    form.reset()
  }
  initValidatePristine(clearForm);
}

const handlePopup = () => {
  let popup = document.querySelector('.popup');
  let buttonOpen = document.querySelectorAll('.portfolio__item-link');
  let buttonOpenArray = Array.from(buttonOpen);
  let closeButton = document.querySelector('.popup__close-button');
  let body = document.querySelector('body');
  let mainHeader = document.querySelector('.page-header');

  const onPopupEscDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  const openPopup = () => {
    popup.classList.remove('popup--closed');
    popup.classList.add('popup--opened');
    closeButton.addEventListener('click', closePopup);
    body.style.overflow = 'hidden';
    mainHeader.style.display = 'none';
    document.addEventListener('keydown', onPopupEscDown);
  }

  const closePopup = () => {
    popup.classList.add('popup--closed');
    popup.classList.remove('popup--opened');
    closeButton.removeEventListener('click', closePopup);
    body.style.overflow = 'auto';
    mainHeader.style.display = 'block';
    document.removeEventListener('keydown', onPopupEscDown);
  }

  for (let i = 0; i < buttonOpenArray.length; i++) {
    buttonOpenArray[i].addEventListener('click', function () {
      initPopupSwiper(i);
      buttonOpenArray[i].removeEventListener('click', openPopup);
      openPopup()
    });
  }
}

const handleMenu = () => {
  const buttonClose = document.querySelector('.main-header__close-button');
  const menu = document.querySelector('.main-header-popup');
  const breakpoint = window.matchMedia('(max-width: 830px)');
  const page = document.querySelector('body');
  const popup = document.querySelector('.main-header-popup');
  const popupContainer = document.querySelector('.main-header-popup__container');
  const openSubMenuButton = document.querySelector('.main-header-popup__link');
  const subMenu = document.querySelector('.main-header-popup__submenu');
  const arrow = document.querySelector('.main-header-popup__arrow');

  const openMenu = () => {
    menu.classList.add('main-header-popup--opened');
    menu.classList.remove('main-header-popup--closed');
    buttonOpenHeaderMenu.classList.remove('main-header__open-button--opened');
    buttonOpenHeaderMenu.classList.add('main-header__open-button--closed');
    buttonClose.classList.add('main-header__close-button--opened');
    buttonClose.classList.remove('main-header__close-button--closed');
    buttonOpenHeaderMenu.removeEventListener('click', openMenu);
    buttonClose.addEventListener('click', closeMenu);
    window.addEventListener('resize', changeSize);
    page.style.overflow = 'hidden';
    popup.addEventListener('click', closeMenuOnOwerclick);
    document.addEventListener('keydown', onMenuEscDown);
  }

  const closeMenuOnOwerclick = (e) => {
    const withinBoundaries = e.composedPath().includes(popupContainer);
    if (!withinBoundaries) {
      closeMenu();
    }
  }

  const onMenuEscDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMenu();
    }
  };

  const closeMenu = () => {
    menu.classList.remove('main-header-popup--opened');
    menu.classList.add('main-header-popup--closed');
    buttonOpenHeaderMenu.classList.add('main-header__open-button--opened');
    buttonOpenHeaderMenu.classList.remove('main-header__open-button--closed');
    buttonClose.classList.remove('main-header__close-button--opened');
    buttonClose.classList.add('main-header__close-button--closed');
    buttonOpenHeaderMenu.addEventListener('click', openMenu);
    page.style.overflow = 'auto';
    closeSubMenu();
    popup.removeEventListener('click', closeMenuOnOwerclick);
    document.removeEventListener('keydown', onMenuEscDown);
  }

  const changeSize = () => {
    if (!breakpoint.matches) {
      closeMenu();
      closeSubMenu();
    }
  }

  const openSubMenu = () => {
    subMenu.classList.add('main-header-popup__submenu--opened');
    subMenu.classList.remove('main-header-popup__submenu--closed');
    openSubMenuButton.addEventListener('click', closeSubMenu);
    arrow.style.transform = 'rotate(-45deg)';
    openSubMenuButton.style.color = '#3ab7b3';
  }

  const closeSubMenu = () => {
    subMenu.classList.remove('main-header-popup__submenu--opened');
    subMenu.classList.add('main-header-popup__submenu--closed');
    openSubMenuButton.removeEventListener('click', closeSubMenu);
    arrow.style.transform = 'rotate(-135deg)';
    openSubMenuButton.style.color = '#ffffff';
  }
  openSubMenuButton.addEventListener('click', openSubMenu);
  buttonOpenHeaderMenu.addEventListener('click', openMenu);
}

const initSwiperNews = () => {
  const breakpoint = window.matchMedia('(max-width: 767px)');
  if (breakpoint.matches) {
    const swiper = new Swiper('.news__swiper', {
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      spaceBetween: 10,
    })
    window.addEventListener('resize', () => {
      if (!breakpoint.matches) {
        swiper.destroy(true, true);
        initSwiperNewsOnResize();
      }
    })
  }
};

const initSwiperNewsOnResize = () => {
  const breakpoint = window.matchMedia('(max-width: 767px)');
  window.addEventListener('resize', () => {
    if (breakpoint.matches) {
      initSwiperNews()
    }
  })
}

handleMenu();
handlePopup();
changeHeader();
onPhoneInput();
initSwiper();
manageForm();
manageHeader();
initSwiperNews();