document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
});

// 检查本地存储中的主题设置
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
}