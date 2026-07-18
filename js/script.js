     const menuBtn = document.getElementById('menu-btn');
      const closeBtn = document.getElementById('close-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      const menuPanel = document.getElementById('menu-panel');
      const menuOverlay = document.getElementById('menu-overlay');

      function openMenu() {
        mobileMenu.classList.remove('hidden');
        requestAnimationFrame(() => {
          mobileMenu.classList.add('open');
        });
      }

      function closeMenu() {
        mobileMenu.classList.remove('open');
        menuPanel.addEventListener('transitionend', () => {
          if (!mobileMenu.classList.contains('open')) {
            mobileMenu.classList.add('hidden');
          }
        }, { once: true });
      }

      menuBtn.addEventListener('click', openMenu);
      closeBtn.addEventListener('click', closeMenu);
      menuOverlay.addEventListener('click', closeMenu);

      const video = document.getElementById('banner-video');
      const playBtn = document.getElementById('video-play-button');
      const centerPlayButton = document.getElementById('video-center-button');
      const timeLabel = document.getElementById('video-time');
      const volumeButton = document.getElementById('volume-button');
      const volumeSlider = document.getElementById('volume-slider');
      const fullscreenButton = document.getElementById('fullscreen-button');
      const videoCard = document.getElementById('video-card');

      function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
      }

      function updateTime() {
        if (!video || !timeLabel) return;
        const current = formatTime(video.currentTime);
        const duration = isNaN(video.duration) ? '0:00' : formatTime(video.duration);
        timeLabel.textContent = `${current} / ${duration}`;
      }

      function updatePlayIcon(isPlaying) {
        const icon = isPlaying
          ? '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 5H10V19H7V5Z" fill="currentColor"/><path d="M14 5H17V19H14V5Z" fill="currentColor"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5L19 12L8 19V5Z" fill="currentColor"/></svg>';
        if (playBtn) playBtn.innerHTML = icon;
        if (centerPlayButton) centerPlayButton.innerHTML = icon;
      }

      function toggleVideo() {
        if (!video) return;
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }

      function updateVolumeIcon(volume) {
        if (!volumeButton) return;
        const icon = volume === 0
          ? '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 9V15H9L14 20V4L9 9H5Z" fill="currentColor"/><path d="M16.5 8.5C17.3284 9.32843 17.8284 10.4426 17.9153 11.6482" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 9V15H9L14 20V4L9 9H5Z" fill="currentColor"/><path d="M16.5 8.5C17.3284 9.32843 17.8284 10.4426 17.9153 11.6482C18.0021 12.8538 17.6698 14.0384 16.9799 14.9283" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
        volumeButton.innerHTML = icon;
      }

      function toggleFullscreen() {
        if (!videoCard) return;
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else if (videoCard.requestFullscreen) {
          videoCard.requestFullscreen();
        }
      }

      if (video) {
        video.volume = Number(volumeSlider?.value) || 0.8;
        updateVolumeIcon(video.volume);

        video.addEventListener('loadedmetadata', updateTime);
        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('play', () => updatePlayIcon(true));
        video.addEventListener('pause', () => updatePlayIcon(false));
        video.addEventListener('ended', () => updatePlayIcon(false));
      }

      [playBtn, centerPlayButton].forEach((btn) => {
        btn?.addEventListener('click', toggleVideo);
      });

      volumeSlider?.addEventListener('input', (event) => {
        if (!video) return;
        const value = parseFloat(event.target.value);
        video.volume = value;
        if (video.muted && value > 0) {
          video.muted = false;
        }
        updateVolumeIcon(value);
      });

      volumeButton?.addEventListener('click', () => {
        if (!video || !volumeSlider) return;
        video.muted = !video.muted;
        if (video.muted) {
          volumeSlider.value = '0';
          updateVolumeIcon(0);
        } else {
          const restoredVolume = Number(volumeSlider.value) || 0.8;
          video.volume = restoredVolume;
          updateVolumeIcon(restoredVolume);
        }
      });

      fullscreenButton?.addEventListener('click', toggleFullscreen);

      const deadlineBtn = document.getElementById('deadline-btn');
      const deadlineModal = document.getElementById('deadline-modal');
      const deadlineClock = document.getElementById('deadline-clock');
      const deadlineClose = document.getElementById('deadline-close');
      const deadline = new Date('2026-07-27T00:00:00');
      let deadlineTimer = null;

      function formatHMS(totalSeconds) {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      }

      function updateDeadlineClock() {
        const now = new Date();
        const diff = Math.max(0, Math.floor((deadline - now) / 1000));
        if (deadlineClock) deadlineClock.textContent = formatHMS(diff);
        if (diff <= 0) {
          clearInterval(deadlineTimer);
          document.documentElement.innerHTML = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Your Time is expired</title><style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#fff;font-family:Inter,system-ui,Arial,sans-serif} .page{max-width:720px;padding:40px;text-align:center;} h1{font-size:3rem;margin-bottom:16px;} p{color:#cbd5e1;font-size:1.05rem;margin-bottom:24px;} .btn{display:inline-flex;align-items:center;justify-content:center;padding:12px 20px;border-radius:999px;background:#facc15;color:#0f172a;font-weight:700;text-decoration:none;box-shadow:0 16px 50px rgba(250,204,21,0.2)}</style></head><body><div class="page"><h1>Your Time is expired</h1><p>The deadline has passed and this countdown has finished. Please contact your project owner or restart the process.</p><a class="btn" href="/">Return Home</a></div></body></html>`;
        }
      }

      function openDeadlineModal() {
        if (!deadlineModal) return;
        deadlineModal.style.display = 'flex';
        updateDeadlineClock();
        deadlineTimer = setInterval(updateDeadlineClock, 1000);
      }

      function closeDeadlineModal() {
        if (!deadlineModal) return;
        deadlineModal.style.display = 'none';
        if (deadlineTimer) { clearInterval(deadlineTimer); deadlineTimer = null; }
      }

      deadlineBtn?.addEventListener('click', openDeadlineModal);
      deadlineClose?.addEventListener('click', closeDeadlineModal);
      deadlineModal?.addEventListener('click', (event) => {
        if (event.target === deadlineModal) closeDeadlineModal();
      });