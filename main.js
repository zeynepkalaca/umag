document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('mumcuAudio');
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const audioTime = document.getElementById('audioTime');

    if (!audio || !playBtn) return;

    // Oynat / Durdur Mantığı
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = '❚❚ Duraklat';
        } else {
            audio.pause();
            playBtn.textContent = '▶ Dinle';
        }
    });

    // İlerleme Çubuğunu Güncelleme
    audio.addEventListener('timeupdate', () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Süreyi dak:san formatına dönüştürme
        let mins = Math.floor(audio.currentTime / 60);
        let secs = Math.floor(audio.currentTime % 60);
        if (secs < 10) secs = `0${secs}`;
        audioTime.textContent = `${mins}:${secs}`;
    });

    // Tıklanılan Yere Atlama
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
    });

    // Ses Bittiğinde Sıfırla
    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶ Dinle';
        progressBar.style.width = '0%';
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Page Fade-In on Load
    document.body.classList.remove('fade-out');

    // Handle Page Transition for Links
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip anchor links (#) or external links (_blank)
            if (href.startsWith('#') || link.target === '_blank' || href.startsWith('javascript:')) {
                return;
            }

            e.preventDefault();
            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = href;
            }, 500); // Matches the 0.5s CSS transition timing
        });
    });
});
