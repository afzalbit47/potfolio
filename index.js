 function showMoreInfo() {
            alert("This would typically navigate to your detailed portfolio page or show more information about your background, skills, and projects!");
        }

        // Add some interactive particle effects on mouse move
        document.addEventListener('mousemove', function(e) {
            const cursor = document.createElement('div');
            cursor.style.position = 'absolute';
            cursor.style.left = e.pageX + 'px';
            cursor.style.top = e.pageY + 'px';
            cursor.style.width = '6px';
            cursor.style.height = '6px';
            cursor.style.background = 'rgba(255, 255, 255, 0.6)';
            cursor.style.borderRadius = '50%';
            cursor.style.pointerEvents = 'none';
            cursor.style.zIndex = '1000';
            cursor.style.animation = 'fadeOut 1s ease-out forwards';
            
            document.body.appendChild(cursor);
            
            setTimeout(() => {
                cursor.remove();
            }, 1000);
        });

        // Add fadeOut animation for cursor trail
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: scale(1);
                }
                to {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        `;
        document.head.appendChild(style);