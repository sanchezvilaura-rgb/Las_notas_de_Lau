// Abrir reproductor
function openEpisodeVideo(videoFile) {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("episodeVideo");
  const source = document.getElementById("videoSource");

  source.src = videoFile;
  video.load();
  modal.style.display = "flex";
  video.play();
}

// Cerrar modal
document.getElementById("closeModal").addEventListener("click", () => {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("episodeVideo");

  video.pause();
  modal.style.display = "none";
});

// Pausar / Reanudar
document.getElementById("pausePlayBtn").addEventListener("click", () => {
  const video = document.getElementById("episodeVideo");
  const btn = document.getElementById("pausePlayBtn");

  if (video.paused) {
    video.play();
    btn.textContent = "⏸ Pausa";
  } else {
    video.pause();
    btn.textContent = "▶ Reproducir";
  }
});
