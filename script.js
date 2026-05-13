document.addEventListener('DOMContentLoaded', function() {
    // 汉堡菜单功能（移动端）
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        // 切换菜单显示/隐藏
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // 更新无障碍属性
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
            hamburger.setAttribute('aria-label', isExpanded ? '关闭菜单' : '打开菜单');
        });

        // 点击导航链接后自动关闭菜单
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', '打开菜单');
            });
        });

        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', '打开菜单');
            }
        });
    }

    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // 实现平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是外部链接（如detail.html），不阻止默认行为
            if (href.includes('.html')) {
                return;
            }
            
            e.preventDefault();
            const targetId = href;
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 导航栏滚动时添加阴影效果
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // 视频加载错误处理
    const video = document.getElementById('heroVideo');
    
    video.addEventListener('error', function() {
        console.log('视频加载失败，使用备用背景');
        video.parentElement.style.backgroundImage = 'url("https://picsum.photos/1920/1080?random=hero")';
        video.style.display = 'none';
    });

    // 滚动指示器淡出效果
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100 && scrollIndicator) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.5s ease';
        } else if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
        }
    });
});

// 跳转到作品详情页面
function goToDetail(workId) {
    window.location.href = `detail.html?id=${workId}`;
}
