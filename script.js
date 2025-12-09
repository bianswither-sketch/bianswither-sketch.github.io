// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
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
