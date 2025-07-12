let currentSlide = 0;
        const totalSlides = 3;
        let autoScrollInterval;
        let isAutoScrolling = true;

        // Load uploaded images
        async function loadImages() {
            try {
                // Read the uploaded files
                const image1Data = await window.fs.readFile('file-R7eukceJBXzjmupUPE34vC');
                const image2Data = await window.fs.readFile('file-ChBKz7jqLpzv8Y89DDcfcm');
                const image3Data = await window.fs.readFile('file-8hGRck83LYeWEgU9tpGA23');

                // Convert to blob URLs
                const image1Blob = new Blob([image1Data]);
                const image2Blob = new Blob([image2Data]);
                const image3Blob = new Blob([image3Data]);

                const image1URL = URL.createObjectURL(image1Blob);
                const image2URL = URL.createObjectURL(image2Blob);
                const image3URL = URL.createObjectURL(image3Blob);

                // Set image sources
                document.getElementById('image1').src = image1URL;
                document.getElementById('image2').src = image2URL;
                document.getElementById('image3').src = image3URL;

            } catch (error) {
                console.error('Error loading images:', error);
                // Fallback to placeholder images
                document.getElementById('image1').src = createPlaceholder('Image 1', '#ff6b6b');
                document.getElementById('image2').src = createPlaceholder('Image 2', '#4ecdc4');
                document.getElementById('image3').src = createPlaceholder('Image 3', '#45b7d1');
            }
        }

        // Create placeholder SVG
        function createPlaceholder(text, color) {
            const svg = `
                <svg width="800" height="500" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="${color}"/>
                    <text x="50%" y="50%" font-family="Arial" font-size="32" fill="white" 
                          text-anchor="middle" dominant-baseline="middle">${text}</text>
                </svg>
            `;
            return 'data:image/svg+xml;base64,' + btoa(svg);
        }

        function updateSlide() {
            const wrapper = document.getElementById('galleryWrapper');
            const transform = -currentSlide * 33.333;
            wrapper.style.transform = `translateX(${transform}%)`;
            
            // Update dots
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // Update counter
            document.getElementById('currentImage').textContent = currentSlide + 1;
            
            // Update progress bar
            const progressFill = document.getElementById('progressFill');
            progressFill.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlide();
        }

        function previousSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlide();
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateSlide();
        }

        function startAutoScroll() {
            autoScrollInterval = setInterval(nextSlide, 4000);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        function toggleAutoScroll() {
            const statusElement = document.getElementById('autoStatus');
            const pauseBtn = document.getElementById('pauseBtn');
            
            if (isAutoScrolling) {
                stopAutoScroll();
                statusElement.textContent = 'OFF';
                pauseBtn.textContent = 'Resume';
                isAutoScrolling = false;
            } else {
                startAutoScroll();
                statusElement.textContent = 'ON';
                pauseBtn.textContent = 'Pause';
                isAutoScrolling = true;
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                previousSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === ' ') {
                e.preventDefault();
                toggleAutoScroll();
            }
        });

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        document.querySelector('.scroll-gallery').addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        document.querySelector('.scroll-gallery').addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }
            }
        }

        // Pause auto-scroll on hover
        document.querySelector('.scroll-gallery').addEventListener('mouseenter', () => {
            if (isAutoScrolling) {
                stopAutoScroll();
            }
        });

        document.querySelector('.scroll-gallery').addEventListener('mouseleave', () => {
            if (isAutoScrolling) {
                startAutoScroll();
            }
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            loadImages();
            startAutoScroll();
            updateSlide();
        });