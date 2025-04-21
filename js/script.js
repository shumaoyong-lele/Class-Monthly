const toggleSwitch = document.getElementById("theme-toggle");
// 检测系统是否为深色模式
const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
).matches;

// 根据系统偏好设置初始主题
if (prefersDarkMode) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    toggleSwitch.checked = true;
}

toggleSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
});