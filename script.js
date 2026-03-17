// 鼠标跟随光效
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
}
animateGlow();

// 导航栏滚动效果
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// 汉堡菜单
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 点击导航链接后关闭菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 加入购物车功能
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;

        // 按钮动画
        const originalText = this.textContent;
        this.textContent = '已添加';
        this.style.pointerEvents = 'none';

        // 创建提示信息
        showNotification(`「${productName}」已添加至购物车`, 'success');

        // 恢复按钮
        setTimeout(() => {
            this.textContent = originalText;
            this.style.pointerEvents = '';
        }, 2500);
    });
});

// 优雅的提示信息
function showNotification(message, type = 'default') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';

    const bgColor = type === 'success' ? '#1a1a1a' : '#2d2d2d';
    const borderColor = type === 'success' ? 'rgba(201, 169, 97, 0.6)' : 'rgba(139, 105, 20, 0.4)';

    notification.innerHTML = `
        <span class="notification-icon">◇</span>
        <span class="notification-text">${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 110px;
        right: 40px;
        background-color: ${bgColor};
        color: rgba(255, 255, 255, 0.9);
        padding: 18px 30px;
        border-left: 2px solid ${borderColor};
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-family: 'Noto Serif SC', serif;
        font-size: 13px;
        letter-spacing: 2px;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: notificationSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    const style = document.createElement('style');
    style.textContent = `
        .notification-icon {
            color: #c9a961;
            font-size: 10px;
        }
        @keyframes notificationSlideIn {
            from {
                transform: translateX(100px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes notificationSlideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3500);
}

// 表单提交
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        if (name && email && message) {
            showNotification('感谢您的留言，我们将尽快回复', 'success');
            this.reset();
        } else {
            showNotification('请填写完整信息', 'warning');
        }
    });
}

// 优雅的滚动动画
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 为产品卡片添加滚动动画
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(card);
});

// 为文化区块添加动画
document.querySelectorAll('.culture-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
    observer.observe(item);
});

// 为特性项添加动画
document.querySelectorAll('.feature').forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateX(-20px)';
    feature.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(feature);
});

// 视差滚动效果
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;

            // 英雄区视差
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
            }

            // 烟雾容器视差
            const smokeContainer = document.querySelector('.smoke-container');
            if (smokeContainer && scrolled < window.innerHeight) {
                smokeContainer.style.transform = `translateX(-50%) translateY(${scrolled * 0.2}px)`;
            }

            ticking = false;
        });
        ticking = true;
    }
});

// 创建装饰性飘动粒子
function createParticles() {
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        document.body.appendChild(particle);
    }
}
createParticles();

// 页面加载完成
window.addEventListener('load', () => {
    document.body.style.opacity = '1';

    // 移除加载遮罩（如果存在）
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 500);
    }
});

// 初始化
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.8s ease';

// 视差鼠标移动效果（产品卡片）
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

console.log('朱一合 · 东方线香美学');
