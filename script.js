const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const muteBtn = document.getElementById("muteBtn");
const loopBtn = document.getElementById("loopBtn");
const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");
const volume = document.getElementById("volume");
const volumeValue = document.getElementById("volumeValue");
const speed = document.getElementById("speed");
const time = document.getElementById("time");

playBtn.addEventListener("click", () => audio.play());
pauseBtn.addEventListener("click", () => audio.pause());

// Volume 
volume.addEventListener("input", () => {
  audio.volume = Number(volume.value);
  volumeValue.textContent = `${Math.round(audio.volume * 100)}%`;
});

// Mute / Unmute
muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? "Unmute" : "Mute";
});

// Loop
loopBtn.addEventListener("click", () => {
  audio.loop = !audio.loop;
  loopBtn.textContent = audio.loop ? "Loop: On" : "Loop: Off";
});

// Playback speed
speed.addEventListener("change", () => {
  audio.playbackRate = Number(speed.value);
});

// Skip controls
// Back
backBtn.addEventListener("click", () => {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});
// Forward
forwardBtn.addEventListener("click", () => {
  audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + 10);
});

// duration 
function formatTime(seconds) {
  if (Number.isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateTime() {
  time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
}

audio.addEventListener("timeupdate", updateTime);
audio.addEventListener("loadedmetadata", updateTime);

// Keyboard controls 
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (audio.paused) audio.play();
    else audio.pause();
  }
  if (e.key.toLowerCase() === "m") {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "Unmute" : "Mute";
  }
  if (e.key === "ArrowLeft") audio.currentTime = Math.max(0, audio.currentTime - 5);
  if (e.key === "ArrowRight") audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + 5);
});