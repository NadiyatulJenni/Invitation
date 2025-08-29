document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const celebration = document.getElementById('celebration');
    const fireworksContainer = document.querySelector('.fireworks');
    const flowersContainer = document.querySelector('.flowers');
    const container = document.querySelector('.container');

    // Function to make the "No" button move randomly within the buttons container
    let lastX = 0;
    let lastY = 0;
    function moveNoButton() {
        const buttonsContainer = document.querySelector('.buttons-container');
        const containerRect = buttonsContainer.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate new position with minimum distance equal to 5x button width
        const minDistance = noBtn.offsetWidth * 5;
        let newX, newY, distance;

        do {
            newX = (Math.random() * 2 - 1) * minDistance;
            newY = (Math.random() * 2 - 1) * minDistance;
            distance = Math.sqrt(newX * newX + newY * newY);
        } while (distance < minDistance);

        // Clamp new position within the buttons container boundaries
        const minX = 0;
        const maxX = containerRect.width - noBtn.offsetWidth;
        const minY = 0;
        const maxY = containerRect.height - noBtn.offsetHeight;

        newX = Math.min(Math.max(minX, newX), maxX);
        newY = Math.min(Math.max(minY, newY), maxY);

        // Position relative to the buttons container
        noBtn.style.position = 'absolute';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';

        // Add some fun animation
        noBtn.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            noBtn.style.transition = '';
        }, 300);

        lastX = newX;
        lastY = newY;
    }

    // New function to show sad notification when No button clicked or hovered
    const notifications = [];
    function showSadNotification() {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'sad-notification';
        notification.textContent = 'Pleasee?? 🥲';
        document.body.appendChild(notification);

        // Position notification at random position on screen
        const maxX = window.innerWidth - 150;
        const maxY = window.innerHeight - 50;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        notification.style.position = 'fixed';
        notification.style.left = randomX + 'px';
        notification.style.top = randomY + 'px';
        notification.style.background = 'rgba(0,0,0,0.7)';
        notification.style.color = 'white';
        notification.style.padding = '8px 12px';
        notification.style.borderRadius = '8px';
        notification.style.fontSize = '1rem';
        notification.style.zIndex = '10000';
        notification.style.pointerEvents = 'none';

        // Store notification to clear later
        notifications.push(notification);
    }

    // Function to create celebration effects
    function startCelebration() {
        celebration.classList.remove('hidden');
        container.style.opacity = '0.3';
        
        // Create fireworks
        createFireworks();
        
        // Create flowers
        createFlowers();
        
        // Add some confetti effect
        createConfetti();
    }

    function createFireworks() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = Math.random() * 100 + '%';
                firework.style.top = Math.random() * 100 + '%';
                firework.style.background = getRandomColor();
                fireworksContainer.appendChild(firework);
                
                setTimeout(() => {
                    firework.remove();
                }, 1000);
            }, i * 100);
        }
    }

    function createFlowers() {
        const flowers = ['🌸', '🌹', '🌺', '🌻', '🌷', '💐', '🥀'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const flower = document.createElement('div');
                flower.className = 'flower';
                flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
                flower.style.left = Math.random() * 100 + '%';
                flower.style.fontSize = (Math.random() * 3 + 2) + 'rem';
                flower.style.animationDuration = (Math.random() * 2 + 2) + 's';
                flowersContainer.appendChild(flower);
                
                setTimeout(() => {
                    flower.remove();
                }, 3000);
            }, i * 150);
        }
    }

    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${getRandomColor()};
                    border-radius: 2px;
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    animation: confettiFall ${Math.random() * 2 + 1}s ease-in forwards;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 30);
        }
        
        // Add confetti animation to styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    function getRandomColor() {
        const colors = [
            '#ff6b6b', '#ff8e8e', '#ff5252', '#ff4081', 
            '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
            '#2196f3', '#03a9f4', '#00bcd4', '#009688',
            '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b',
            '#ffc107', '#ff9800', '#ff5722', '#795548'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Function to play celebration music
    function playCelebrationMusic() {
        const audio = new Audio('celebration-music.mp3');
        audio.volume = 0.7; // Set volume to 70%
        audio.play().catch(error => {
            console.log('Music playback failed. Please add a celebration-music.mp3 file to the invitation folder.');
        });
    }

    // Event listeners
    yesBtn.addEventListener('click', function() {
        startCelebration();
        playCelebrationMusic();
        // Clear all sad notifications on Yes click
        notifications.forEach(n => n.remove());
        notifications.length = 0;
    });
    
    noBtn.addEventListener('mouseover', function(e) {
        e.preventDefault();
        moveNoButton();
        showSadNotification();
    });
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        moveNoButton();
        showSadNotification();
    });
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        moveNoButton();
        showSadNotification();
    });

    // Make sure the "No" button stays within view on resize
    window.addEventListener('resize', function() {
        if (noBtn.style.position === 'absolute') {
            moveNoButton();
        }
    });

    // Add some initial animation to the invitation
    setTimeout(() => {
        document.querySelector('.invitation-card').style.transform = 'translateY(0)';
        document.querySelector('.invitation-card').style.opacity = '1';
    }, 100);
});

// Add initial styles for smooth entrance
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .invitation-card {
            transform: translateY(50px);
            opacity: 0;
            transition: all 0.8s ease-out;
        }
    `;
    document.head.appendChild(style);
});
