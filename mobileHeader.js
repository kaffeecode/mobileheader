(function initialize($) {

  $.fn.mobileHeader = function mobileHeader(
    {delay, pointer} = {}) {
    delay = delay || 50;
    const articles = $('article');
    const $this = $(this);
    const $headerTitle = $this.children('.headerTitle');
    const $title = $('title');
    let lastScrollTop = 0;
    let startScrollTop = 0;
    let isLastDown = false;

    $(window).on('scroll.mobileHeader', ()=> {
      const scrollTop = $(window).scrollTop();
      const offset = pointer || window.innerHeight / 3;
      const isAnimated = $this.is(':animated');
      const isDown = scrollTop > lastScrollTop;

      if(isDown === !isLastDown)
        startScrollTop = scrollTop;
      else if(!isAnimated && window.innerWidth <= 768) {
        const scrollDistance = scrollTop - startScrollTop;
        
        if(isDown) {
          if(scrollDistance > delay)
            hide($this);
        }
        else {
          if(scrollDistance < -delay)
            show($this);
        }
      }
      let distance = 0;

      for(const article of articles) {
        if((distance = scrollTop - article.offsetTop + offset) > 0) {
          if(distance < article.offsetHeight) {
            $headerTitle.html(article.getAttribute('articleTitle'));
            $title.html(article.getAttribute('windowTitle'));
            break;
          }
        }
      }

      isLastDown = isDown;
      lastScrollTop = scrollTop;

      function show(element) {
        element.css('display', 'block');
        element.clearQueue().animate({opacity: 1});
      }

      function hide(element) {
        element.clearQueue().animate({opacity: 0},
          {complete: ()=>
            element.css('display', 'none')
        });
      }
    });
  };
})(jQuery);

export {};
