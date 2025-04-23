export const changeHeader = () => {
  document.addEventListener('scroll', function () {
    let scrollHeader = $('.main-header--scroll');
    if ($(this).scrollTop() > 120) {
      scrollHeader.fadeIn();
    } else {
      scrollHeader.fadeOut();
      closeSearch()
    }
  })
}