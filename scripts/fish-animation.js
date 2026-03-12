// scripts/fish-animation.js
window.addEventListener('load', function() {
    const canvas = document.getElementById('fishes');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gridSize = 6;
    const gridColor = '#f0f0f0';
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseSpeed = 0;
    const trails = [];
    const fishArray = [];
    const fishCount = 20;

    class Fish {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 10 + 5;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.angle = Math.random() * Math.PI * 2;
            this.color = `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, 0.7)`;
        }
        
        update() {
            if (Math.random() < 0.05) {
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
            }
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            this.x += this.speedX;
            this.y += this.speedY;
            this.angle = Math.atan2(this.speedY, this.speedX);
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = 'rgba(0,0,0,0.8)';
            ctx.beginPath();
            ctx.arc(this.size / 2, 0, this.size / 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-this.size, 0);
            ctx.lineTo(-this.size - this.size / 2, -this.size / 2);
            ctx.lineTo(-this.size - this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
        }
    }

    for (let i = 0; i < fishCount; i++) {
        fishArray.push(new Fish());
    }
    
    function drawGrid() {
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;
        for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    function updateTrails() {
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        mouseSpeed = Math.sqrt(dx * dx + dy * dy);
        mouseSpeed = Math.min(mouseSpeed, 30);

        if (mouseSpeed > 0.1) {
            trails.push({
                x: mouseX,
                y: mouseY,
                speed: mouseSpeed,
                alpha: 1,
                angle: Math.atan2(dy, dx)
            });
        }

        for (let i = 0; i < trails.length; i++) {
            trails[i].alpha -= 0.01;
            if (trails[i].alpha <= 0) {
                trails.splice(i, 1);
                i--;
            }
        }
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }

    function drawTrails() {
        for (let i = 0; i < trails.length; i++) {
            const trail = trails[i];
            const size = trail.speed * 1.5;
            const hue = (trail.speed * 10 + Date.now() / 50) % 360;
            
            const gradient = ctx.createRadialGradient(
                trail.x, trail.y, 0,
                trail.x, trail.y, size
            );
            gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, ${trail.alpha})`);
            gradient.addColorStop(1, `hsla(${hue}, 80%, 60%, 0)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(trail.x, trail.y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        drawGrid();
        for (let fish of fishArray) {
            fish.update();
            fish.draw();
        }
        updateTrails();
        drawTrails();
        
        requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    animate();
});
