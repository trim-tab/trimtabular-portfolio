const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

function moveCarousel(track, slides, nextButton, prevButton, dotsNav, dots) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  // console.log(slideWidth);

  // arrange the slides next to one another
  // slides[0].style.left = slideWidth * 0 + 'px';
  // slides[1].style.left = slideWidth * 1 + 'px';
  // slides[2].style.left = slideWidth * 2 + 'px';

  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };

  slides.forEach(setSlidePosition);

  // function that moves slide to previous or next
  const moveToSlide = (track, currentSlide, targetSlide) => {
    // amountToMove = nextSlide.style.left (displacement of slide)
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  };

  // function that changes dot color when slide is changed
  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
  };

  const hideShowArrows = (slide, prevButton, nextButton, targetIndex) => {
    // console.log(targetIndex);
    console.log(targetIndex);
    if (targetIndex === 0) {
      console.log('here');
      prevButton.classList.add('is-hidden');
      nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
      console.log('yipes');
      console.log(prevButton.classList);
      console.log(nextButton.classList);
      prevButton.classList.remove('is-hidden');
      nextButton.classList.add('is-hidden');
    } else {
      console.log('else');
      prevButton.classList.remove('is-hidden');
      nextButton.classList.remove('is-hidden');
    }
  };

  // when I click left, move slides to the left
  prevButton.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex((slide) => slide === prevSlide);
    updateDots(currentDot, prevDot);
    moveToSlide(track, currentSlide, prevSlide);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
  });

  // when I click right, move slides to the right
  nextButton.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
  });

  // when I click the nav indicators, move to that slide

  dotsNav.addEventListener('click', (e) => {
    // what indicator was clicked on? only when button is clicked inside the nav
    const targetDot = e.target.closest('button');

    // stops event listener if a anything but a button is clicked
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex((dot) => dot === targetDot);
    const targetSlide = slides[targetIndex];

    // move to proper Nav dot slide
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
  });
}

moveCarousel(track, slides, nextButton, prevButton, dotsNav, dots);

const pTrack = document.querySelector('.pCarousel__track');
const pSlides = Array.from(pTrack.children);
const pNextButton = document.querySelector('.pCarousel__button--right');
const pPrevButton = document.querySelector('.pCarousel__button--left');
const pDotsNav = document.querySelector('.pCarousel__nav');
const pDots = Array.from(pDotsNav.children);

moveCarousel(pTrack, pSlides, pNextButton, pPrevButton, pDotsNav, pDots);
