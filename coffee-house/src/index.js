//slider

const slider = document.querySelector(".slider__content");
const sliderCards = document.querySelector(".slider__content__cards");
const cards = document.querySelectorAll(".slider__content__card");
const btnPrev = document.querySelector(".slider__control_prev");
const btnNext = document.querySelector(".slider__control_next");
const progressBars = document.querySelectorAll(".slider__progress__bar_active");

const delay = 4000;

let currentIndex = 0;
const totalCards = cards.length;

function updateSlider() {
  disableControls();
  const offset = -currentIndex * cards[0].offsetWidth;
  sliderCards.style.transform = `translateX(${offset}px)`;
  fillProgressBar();
  enableControls();
}

function fillProgressBar() {
  progressBars.forEach((bar, index) => {
    if (index === currentIndex) {
      bar.classList.add("active");
    } else {
      bar.classList.remove("active");
    }
  });
}

function pauseProgressBar() {
  progressBars[currentIndex].classList.add("paused");
}

function resumeProgressBar() {
  progressBars[currentIndex].classList.remove("paused");
}

function disableControls() {
  btnPrev.disabled = true;
  btnNext.disabled = true;
}

function enableControls() {
  btnPrev.disabled = false;
  btnNext.disabled = false;
}

function moveRight() {
  if (currentIndex < totalCards - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateSlider();
}

function moveLeft() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalCards - 1;
  }
  updateSlider();
}

let startTime;
remaining = delay;
let timerId = setTimeout(function autoSlide() {
  moveRight();
  startTime = Date.now();
  timerId = setTimeout(autoSlide, delay);
}, delay);

function pauseTimer() {
  clearTimeout(timerId);
  const elapsed = Date.now() - startTime;
  remaining = delay - elapsed;
}

function resumeTimer() {
  startTime = Date.now();
  timerId = setTimeout(function autoSlide() {
    moveRight();
    startTime = Date.now();
    timerId = setTimeout(autoSlide, delay);
  }, remaining);
}

function resetTimer() {
  clearTimeout(timerId);
  timerId = setTimeout(autoSlide, delay);
}

function autoSlide() {
  moveRight();
  startTime = Date.now();
  timerId = setTimeout(autoSlide, delay);
}

btnPrev.addEventListener("click", () => {
  moveLeft();
  resetTimer();
});

btnNext.addEventListener("click", () => {
  moveRight();
  resetTimer();
});

slider.addEventListener("mouseover", () => {
  pauseTimer();
  pauseProgressBar();
});

slider.addEventListener("mouseout", () => {
  resumeTimer();
  resumeProgressBar();
});

updateSlider();
