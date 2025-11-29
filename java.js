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
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SISTEMA DE LIKES =====
    let likeCount = 0;
    let isLiked = false;

    const likeBtn = document.getElementById('likeBtn');
    const likeCountSpan = document.querySelector('.like-count');

    if (likeBtn && likeCountSpan) {
        likeBtn.addEventListener('click', function() {
            if (!isLiked) {
                likeCount++;
                isLiked = true;
                this.classList.add('liked');
            } else {
                likeCount--;
                isLiked = false;
                this.classList.remove('liked');
            }
            likeCountSpan.textContent = likeCount;
        });
    }

    // ===== SISTEMA DE COMENTARIOS =====
    const commentInput = document.getElementById('commentInput');
    const submitBtn = document.getElementById('submitComment');
    const commentsList = document.getElementById('commentsList');

    // Función para agregar comentario
    function addComment() {
        const commentText = commentInput.value.trim();
        
        if (commentText === '') {
            commentInput.style.borderColor = '#ff1744';
            commentInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                commentInput.style.borderColor = '#e0e0e0';
                commentInput.style.animation = '';
            }, 500);
            return;
        }
        
        // Crear elemento de comentario
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        
        // Obtener fecha y hora actual
        const now = new Date();
        const dateString = now.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Construir el HTML del comentario
        commentItem.innerHTML = `
            <p class="comment-text">${escapeHtml(commentText)}</p>
            <small class="comment-date">${dateString}</small>
        `;
        
        // Agregar al inicio de la lista
        commentsList.insertBefore(commentItem, commentsList.firstChild);
        
        // Limpiar input
        commentInput.value = '';
        
        // Animación de éxito en el botón
        submitBtn.style.background = '#4caf50';
        submitBtn.textContent = '✓ Enviado';
        setTimeout(() => {
            submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            submitBtn.textContent = 'Enviar';
        }, 1500);
    }

    // Event listener para el botón de enviar
    if (submitBtn) {
        submitBtn.addEventListener('click', addComment);
    }

    // Event listener para Enter en el input
    if (commentInput) {
        commentInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addComment();
            }
        });
    }

    // ===== FUNCIÓN DE SEGURIDAD =====
    // Función para escapar HTML y prevenir XSS
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // ===== CONTROL DEL VIDEO =====
    const video = document.getElementById('mainVideo');

    if (video) {
        // Ajustar el contenedor al tamaño del video
        video.addEventListener('loadedmetadata', function() {
            const videoWidth = this.videoWidth;
            const videoHeight = this.videoHeight;
            const aspectRatio = videoWidth / videoHeight;
            
            console.log('📹 Video cargado');
            console.log('Dimensiones:', videoWidth, 'x', videoHeight);
            console.log('Aspect Ratio:', aspectRatio);
        });

        video.addEventListener('play', function() {
            console.log('▶️ Video reproduciendo');
        });

        video.addEventListener('pause', function() {
            console.log('⏸️ Video pausado');
        });

        video.addEventListener('ended', function() {
            console.log('✅ Video finalizado');
        });
    }

    // ===== ANIMACIÓN DE SHAKE PARA ERRORES =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);

    console.log('✨ Sistema de likes y comentarios iniciado correctamente');
});
