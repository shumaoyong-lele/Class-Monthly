/**
 * 通用JavaScript文件
 * 主要功能：主题切换功能
 */

// 获取主题切换开关元素
const toggleSwitch = document.getElementById("theme-toggle");

/**
 * 检测系统是否为深色模式
 * @type {boolean}
 */
const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

// 根据系统偏好设置初始主题
if (prefersDarkMode) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    toggleSwitch.checked = true;
}

/**
 * 主题切换事件监听
 * 切换深色/浅色主题
 */
toggleSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
});