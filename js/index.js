/**
 * 首页JavaScript文件
 * 主要功能：初始化Clarity分析工具
 */

// 使用IIFE(立即调用函数表达式)避免污染全局命名空间
(function (c, l, a, r, i, t, y) {
    // 初始化Clarity对象或使用现有对象
    c[a] = c[a] || function () {
        (c[a].q = c[a].q || []).push(arguments);
    };

    // 创建script标签
    t = l.createElement(r);
    t.async = 1; // 异步加载
    t.src = "https://www.clarity.ms/tag/" + i; // 设置Clarity脚本URL

    // 获取第一个script标签
    y = l.getElementsByTagName(r)[0];
    // 在第一个script标签前插入Clarity脚本
    y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "qtvqid4vik");