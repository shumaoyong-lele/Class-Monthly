/**
 * 通用JavaScript文件
 * 主要功能：主题切换功能（优化后）
 */

// 从 localStorage 获取用户主题偏好
const savedTheme = localStorage.getItem('theme');
const toggleSwitch = document.getElementById("theme-toggle");

// 初始化主题
function initializeTheme() {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDarkMode ? 'dark' : 'light');
    
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(initialTheme);
    toggleSwitch.checked = initialTheme === 'dark';
}

// 保存主题到 localStorage
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

// 切换主题逻辑
function toggleTheme() {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    saveTheme(newTheme);
}

// 主题切换事件监听（优化后）
toggleSwitch.addEventListener("change", toggleTheme);

// 初始化调用
initializeTheme();