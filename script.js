// 粒子背景效果和网站功能
document.addEventListener('DOMContentLoaded', function() {
    const particlesBackground = document.getElementById('particles-background');
    
    // 创建随机飘动的黄色粒子
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // 随机大小
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 随机位置
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // 随机透明度
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        
        // 随机闪烁动画
        const blinkDuration = Math.random() * 3 + 2;
        particle.style.animation = `blink ${blinkDuration}s infinite alternate`;
        
        // 随机飘动方向和速度
        const moveX = (Math.random() - 0.5) * 4;
        const moveY = -(Math.random() * 2 + 1); // 向上飘动
        particle.style.setProperty('--move-x', `${moveX}px`);
        particle.style.setProperty('--move-y', `${moveY}px`);
        
        particlesBackground.appendChild(particle);
        
        // 添加飘动动画
        particle.animate([
            { transform: 'translate(0, 0)' },
            { transform: `translate(var(--move-x, 0), var(--move-y, 0))` }
        ], {
            duration: Math.random() * 5000 + 5000,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        });
        
        // 移除粒子以避免内存泄漏
        setTimeout(() => {
            particle.remove();
        }, 10000);
    }
    
    // 定期创建粒子
    setInterval(createParticle, 300);
    
    // 作品滑块功能
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    function showSlide(index) {
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }
        
        // 移动滑块
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 更新圆点指示器
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
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
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // 按钮事件
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // 自动播放
    setInterval(nextSlide, 5000);
    
    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 这里可以添加表单提交逻辑
            alert(`感谢您的消息，${name}！我会尽快回复您。`);
            contactForm.reset();
        });
    }
    
    // 图片压缩功能实现
    function compressImage(file, quality = 0.7) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = function() {
                // 设置压缩后的最大宽度和高度
                const maxWidth = 1920;
                const maxHeight = 1080;
                
                let width = img.width;
                let height = img.height;
                
                // 按比例缩放图片
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height *= maxWidth / width));
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width *= maxHeight / height));
                        height = maxHeight;
                    }
                }
                
                // 设置canvas尺寸
                canvas.width = width;
                canvas.height = height;
                
                // 绘制图片到canvas
                ctx.drawImage(img, 0, 0, width, height);
                
                // 将canvas转换为blob对象
                canvas.toBlob(resolve, 'image/jpeg', quality);
            };
            
            img.onerror = reject;
            
            // 读取文件
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
    
    // 应用图片压缩到所有图片元素
    function applyImageCompression() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // 为已经加载的图片应用压缩
            if (img.complete && img.naturalHeight !== 0) {
                // 这里只是示例，实际应用中需要更复杂的逻辑来处理图片压缩
                console.log('Compressing image:', img.src);
            }
        });
    }
    
    // 页面加载完成后应用图片压缩
    window.addEventListener('load', applyImageCompression);
});
