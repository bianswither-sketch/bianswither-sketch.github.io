// 粒子系统
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initParticles() {
        // 创建粒子
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(255, 215, 0, ${Math.random() * 0.5 + 0.1})`,
                opacity: Math.random() * 0.5 + 0.1,
                blinkSpeed: Math.random() * 0.02 + 0.005
            });
        }
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            
            // 更新位置
            p.x += p.speedX;
            p.y += p.speedY;
            
            // 边界检查
            if (p.x > this.canvas.width || p.x < 0) p.speedX *= -1;
            if (p.y > this.canvas.height || p.y < 0) p.speedY *= -1;
            
            // 闪烁效果
            p.opacity += p.blinkSpeed;
            if (p.opacity > 0.6 || p.opacity < 0.1) {
                p.blinkSpeed *= -1;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
            this.ctx.fill();
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子系统
    const particleSystem = new ParticleSystem();
    
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const slideCount = slides.length;

    // 设置轮播图宽度
    function setupSlider() {
        sliderContainer.style.width = `${slideCount * 100}%`;
        slides.forEach(slide => {
            slide.style.width = `${100 / slideCount}%`;
        });
        updateSlider();
    }

    // 更新轮播图位置
    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentIndex * (100 / slideCount)}%)`;
    }

    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }

    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }

    // 绑定按钮事件
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // 自动播放
    setInterval(nextSlide, 5000);

    // 初始化轮播图
    setupSlider();

    // 平滑过渡动画
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // 滚动动画
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
});
