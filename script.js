const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// DANH SÁCH CÁC CÂU CHÚC
const texts = [
    "Chúc mừng sinh nhật vui vẻ!", 
    "Cô nàng bận với công việc!", 
    "Hãy suy nghĩ tích cực nhé!", 
    "", 
    "Happy Birthday!",
    "Không phải thằng con trai nào cũng xấu đâu!",
    "Thoáng lên nào!",
];

const particleCount = 80; // Giảm nhẹ số lượng để không bị rối mắt
const baseColor = "hsla(330, 100%, 70%, "; 
const fontBaseSize = 20; 

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = (Math.random() - 0.5) * width * 2;
        this.y = (Math.random() - 0.5) * height * 2;
        this.z = Math.random() * width; 
        this.text = texts[Math.floor(Math.random() * texts.length)];
        this.velocityZ = Math.random() * 1.5 + 0.5; 
    }

    update() {
        this.z -= this.velocityZ;
        if (this.z <= 0) {
            this.reset();
            this.z = width; 
        }
    }

    draw() {
        const perspective = 300; 
        const scale = perspective / (perspective + this.z);
        
        const screenX = this.x * scale + width / 2;
        const screenY = this.y * scale + height / 2;
        
        if (screenX < 0 || screenX > width || screenY < 0 || screenY > height) return;

        const currentFontSize = fontBaseSize * (1 / scale) * 0.5; 
        const opacity = 1 - (this.z / width); 

        ctx.font = `${currentFontSize}px 'Dancing Script', cursive`;
        ctx.fillStyle = baseColor + opacity + ")";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ff69b4";
        
        ctx.fillText(this.text, screenX, screenY);
        
        ctx.shadowBlur = 0;
    }
}

function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    // Xóa màn hình bằng màu đen
    ctx.fillStyle = "black"; 
    ctx.fillRect(0, 0, width, height); 

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

init();
animate();