import { favoriteProductsService } from "../services/product-service";
import { ERROR_MSG } from "../utils/constants";
import createElement from "../utils/create-element";
import Loader from "./Loader";
import { SliderCard } from "./SliderCard";

const delay = 4000;
let currentIndex = 0;
let totalCards = 0;
let cardWidth = 0;

const sliderWrapper = document.querySelector<HTMLDivElement>(".slider");
const slider = document.querySelector<HTMLDivElement>(".slider__content");
const sliderCards = document.querySelector<HTMLDivElement>(
  ".slider__content__cards"
);
const btnPrev = document.querySelector<HTMLButtonElement>(
  ".slider__control_prev"
);
const btnNext = document.querySelector<HTMLButtonElement>(
  ".slider__control_next"
);
const sliderProgress =
  document.querySelector<HTMLDivElement>(".slider__progress");
const progressBars = document.querySelectorAll<HTMLDivElement>(
  ".slider__progress__bar_active"
);

export const Slider = async () => {
  const lodader = Loader();
  sliderWrapper?.append(lodader);

  const favoriteProducts = await favoriteProductsService();
  lodader.remove();
  if (favoriteProducts && favoriteProducts.length) {
    const cards = favoriteProducts?.map(SliderCard);
    if (!cards) return;
    cards.forEach((card) => {
      sliderCards?.append(card);
    });

    totalCards = cards.length;
    cardWidth = cards[0].offsetWidth;

    updateSlider();
    attachEventListeners();
  } else {
    sliderWrapper?.replaceChildren(
      createElement("h3", "slider__error", ERROR_MSG)
    );
    sliderProgress?.remove();
  }
};

function updateSlider() {
  if (!sliderCards) return;
  disableControls();
  const offset = -currentIndex * cardWidth;
  sliderCards.style.transform = `translateX(${offset}px)`;
  fillProgressBar();
  enableControls();
}

function fillProgressBar() {
  progressBars.forEach((bar, index) => {
    if (index === currentIndex) {
      bar.classList.add("active");
      bar.classList.remove("paused");
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
  if (!btnPrev || !btnNext) return;
  btnPrev.disabled = true;
  btnNext.disabled = true;
}

function enableControls() {
  if (!btnPrev || !btnNext) return;
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
  resetTimer();
}

function moveLeft() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalCards - 1;
  }
  updateSlider();
  resetTimer();
}

let startTime: number;
let remaining = delay;
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

function pauseSlider() {
  pauseTimer();
  pauseProgressBar();
}

function resumeSlider() {
  resumeTimer();
  resumeProgressBar();
}

let startX = 0;

function attachEventListeners() {
  btnPrev?.addEventListener("click", moveLeft);

  btnNext?.addEventListener("click", moveRight);

  slider?.addEventListener("mouseover", pauseSlider);

  slider?.addEventListener("mouseout", resumeSlider);

  slider?.addEventListener("touchstart", (e) => {
    pauseSlider();
    startX = e.touches[0].clientX;
  });

  slider?.addEventListener("touchmove", (e) => {
    if (!sliderCards) return;
    const moveX = e.touches[0].clientX;
    const diffX = moveX - startX;
    sliderCards.style.transform = `translateX(${
      -currentIndex * cardWidth + diffX
    }px)`;
  });

  slider?.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    if (diffX > 50) {
      moveLeft();
    } else if (diffX < -50) {
      moveRight();
    } else {
      updateSlider();
    }
    resumeSlider();
  });
}
