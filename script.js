// 粒子背景效果和网站功能
document.addEventListener('DOMContentLoaded', function() {
    const particlesBackground = document.getElementById('particles-background');
    
    // 创建随机飘动的黄黑粒子（适配工业黄黑风格）
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // 随机大小（稍大一些以增强视觉效果）
        const size = Math.random() * 10 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 随机位置
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // 随机透明度
        particle.style.opacity = Math.random() * 0.9 + 0.1;
        
        // 随机闪烁动画
        const blinkDuration = Math.random() * 3 + 1;
        particle.style.animation = `blink ${blinkDuration}s infinite alternate`;
        
        // 随机飘动方向和速度
        const moveX = (Math.random() - 0.5) * 8;
        const moveY = -(Math.random() * 4 + 3); // 向上飘动
        particle.style.setProperty('--move-x', `${moveX}px`);
        particle.style.setProperty('--move-y', `${moveY}px`);
        
        particlesBackground.appendChild(particle);
        
        // 添加更复杂的飘动动画
        const animation = particle.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: particle.style.opacity },
            { transform: `translate(${moveX * 2}px, ${moveY * 3}px) rotate(180deg)`, opacity: parseFloat(particle.style.opacity) * 0.8 },
            { transform: `translate(${moveX * 4}px, ${moveY * 6}px) rotate(360deg)`, opacity: parseFloat(particle.style.opacity) * 0.5 }
        ], {
            duration: Math.random() * 6000 + 6000,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
        });
        
        // 移除粒子以避免内存泄漏
        setTimeout(() => {
            particle.remove();
        }, 12000);
    }
    
    // 定期创建粒子（增加频率以增强效果）
    setInterval(createParticle, 150);
    
    // 作品滑块功能
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // 只有当必要的元素都存在时才初始化滑块功能
    if (sliderContainer && slides && slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;
        
        // 清除自动播放定时器
        function clearSlideInterval() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        }
        
        // 开始自动播放
        function startSlideInterval() {
            clearSlideInterval();
            slideInterval = setInterval(nextSlide, 6000);
        }
        
        function showSlide(index) {
            if (index >= slides.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = slides.length - 1;
            } else {
                currentIndex = index;
            }
            
            // 移动滑块（添加缓动效果）
            sliderContainer.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // 更新圆点指示器
            if (dots && dots.length > 0) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
            
            // 重新开始自动播放
            startSlideInterval();
        }
        
        // 下一张幻灯片
        function nextSlide() {
            showSlide(currentIndex + 1);
        }
        
        // 上一张幻灯片
        function prevSlide() {
            showSlide(currentIndex - 1);
        }
        
        // 圆点点击事件
        if (dots && dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });
        }
        
        // 按钮事件
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
            });
        }
        
        // 鼠标悬停时暂停自动播放
        const portfolioSlider = document.querySelector('.portfolio-slider');
        if (portfolioSlider) {
            portfolioSlider.addEventListener('mouseenter', clearSlideInterval);
            portfolioSlider.addEventListener('mouseleave', startSlideInterval);
        }
        
        // 初始化自动播放
        startSlideInterval();
    }
    
    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // 简单验证
            if (!name || !email || !subject || !message) {
                alert('请填写所有必填字段！');
                return;
            }
            
            // 这里可以添加表单提交逻辑
            alert(`感谢您的消息，${name}！我们会尽快回复您。`);
            contactForm.reset();
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 25, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(10, 10, 25, 0.85)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    });
    
    // 页面加载完成后的动画效果
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
