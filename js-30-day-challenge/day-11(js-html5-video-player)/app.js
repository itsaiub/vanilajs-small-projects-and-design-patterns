const playerEl = document.querySelector(".player");
const videoEl = playerEl.querySelector(".viewer");
const progressEl = playerEl.querySelector(".progress");
const progressBarEl = playerEl.querySelector(".progress__filled");
const toggleEl = playerEl.querySelector(".toggle");
const skipButtons = playerEl.querySelectorAll("[data-skip]");
const rangesEl = playerEl.querySelectorAll(".player__slider");
const fullscreenEl = playerEl.querySelector("#fullscreen");

function togglePlay() {
  const method = videoEl.paused ? "play" : "pause";
  videoEl[method]();
}

function updateButton() {
  const icon = this.paused ? "►" : "❚❚";
  toggleEl.textContent = icon;
}

function skip() {
  videoEl.currentTime += +this.dataset.skip;
}

function handleRangeUpdate() {
  videoEl[this.name] = this.value;
}

function handleProgress() {
  const percent = (videoEl.currentTime / videoEl.duration) * 100;

  progressBarEl.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progressEl.offsetWidth) * videoEl.duration;

  videoEl.currentTime = scrubTime;
}

function toggleFullScreen(e) {
  if (!document.fullscreen) {
    videoEl.requestFullscreen();
  }
}

videoEl.addEventListener("click", togglePlay);
videoEl.addEventListener("play", updateButton);
videoEl.addEventListener("pause", updateButton);
videoEl.addEventListener("timeupdate", handleProgress);

toggleEl.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));

rangesEl.forEach((range) =>
  range.addEventListener("change", handleRangeUpdate)
);

rangesEl.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;
progressEl.addEventListener("click", scrub);
progressEl.addEventListener("mousemove", (e) => mousedown && scrub(e));
progressEl.addEventListener("mousedown", () => (mousedown = true));
progressEl.addEventListener("mouseup", () => (mousedown = false));

fullscreenEl.addEventListener("click", toggleFullScreen);
