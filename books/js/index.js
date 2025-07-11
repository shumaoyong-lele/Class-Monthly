(function (c, l, a, r, i, t, y) {
    c[a] =
        c[a] ||
        function () {
            (c[a].q = c[a].q || []).push(arguments);
        };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "qtvqid4vik");


/**
 * 书籍页面JavaScript文件
 * 主要功能：
 * 1. 主题切换功能
 * 2. 书籍弹窗交互
 * 3. 书籍内容加载和阅读位置记忆
 */

// 初始化Clarity分析工具
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

    // 初始化弹窗颜色为深色
    const modal = document.querySelector('.modal-content');
    modal.style.backgroundColor = '#333';
    modal.style.color = '#fff';
}

/**
 * 添加书籍点击事件
 * 点击书籍项时显示弹窗并加载对应书籍内容
 */
document.querySelectorAll('.book-item').forEach((item, index) => {
    item.style.cursor = 'pointer'; // 设置鼠标指针样式

    item.addEventListener('click', function () {
        const modal = document.querySelector('.book-modal');
        modal.style.display = 'block';

        // 延迟添加show类以实现动画效果
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // 根据点击的书籍索引加载对应内容
        if (index === 0) {
            loadBookContent('kongyiji'); // 加载孔乙己内容
        } else if (index === 1) {
            loadBookContent('daocaoren'); // 加载稻草人内容
        } else if (index === 2) {
            loadBookContent('jiyiheishifanmaizhe'); 
        }
    });
});

// 关闭弹窗事件
document.querySelector('.close-modal').addEventListener('click', function () {
    const modal = document.querySelector('.book-modal');
    modal.classList.remove('show');

    // 延迟隐藏弹窗以实现淡出动画
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
});

/**
 * 主题切换事件监听
 * 切换深色/浅色主题并更新相关元素样式
 */
toggleSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

    // 更新弹窗和书籍介绍的颜色主题
    updateThemeColors();
});

/**
 * 加载书籍内容函数
 * @param {string} bookId - 书籍ID (kongyiji或daocaoren)
 */

async function fetch_book_data() {
    try{
        const response = await fetch('content/book.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data);
        return data;
    }catch (error){
        console.error(error);
        return false;
    }
}

// 修改为async异步函数
async function loadBookContent(bookId) {
    const tocList = document.querySelector('.toc-list'); // 目录列表
    const contentText = document.querySelector('.content-text'); // 内容区域

    // 清空现有内容
    tocList.innerHTML = "";
    contentText.innerHTML = "";

    // 异步获取书籍数据
    const booksData = await fetch_book_data();
    if (!booksData) {
        contentText.innerHTML = "<p>加载书籍数据失败，请稍后重试。</p>";
        return;
    }

    const book = booksData[bookId];
    let currentSelectedItem = null; // 当前选中的章节项
    const bookUrl = book && book.url;

    if (book) {
        // 从本地存储获取上次阅读位置
        const lastReadKey = `lastRead_${bookId}`;
        let lastChapterIndex = localStorage.getItem(lastReadKey);
        lastChapterIndex = lastChapterIndex ? parseInt(lastChapterIndex) : 0;

        // 生成目录列表
        book.chapters.forEach((chapter, index) => {
            const li = document.createElement('li');
            li.textContent = chapter;

            // 章节点击事件
            li.addEventListener('click', () => {
                // 显示章节内容
                contentText.innerHTML = `<p>${book.contents[index]}</p>`;

                // 更新选中项样式
                updateSelectedChapterStyle(li, currentSelectedItem);
                currentSelectedItem = li;

                // 保存阅读位置
                localStorage.setItem(lastReadKey, index);
            });

            tocList.appendChild(li);
        });

        // 显示上次阅读的章节或第一章
        showLastReadChapter(tocList, contentText, book, lastChapterIndex);

        // 全屏按钮逻辑（如有）
        // const fullWidthBtn = document.getElementById('full-width');
        // if (fullWidthBtn && bookUrl) {
        //     fullWidthBtn.onclick = () => window.open(bookUrl, '_blank');
        // }
    }
}

/**
 * 更新主题颜色
 */
function updateThemeColors() {
    const modal = document.querySelector('.modal-content');

    if (document.body.classList.contains('dark')) {
        // 深色模式样式
        modal.style.backgroundColor = '#333';
        modal.style.color = '#fff';

        // 更新书籍介绍颜色
        document.querySelectorAll('.book-description').forEach(desc => {
            desc.style.color = '#e0e0e0';
        });
        document.querySelectorAll('.book-item h3, .book-item p').forEach(text => {
            text.style.color = '#ffffff';
        });
    } else {
        // 浅色模式样式
        modal.style.backgroundColor = '';
        modal.style.color = '';

        // 恢复默认颜色
        document.querySelectorAll('.book-description').forEach(desc => {
            desc.style.color = '';
        });
        document.querySelectorAll('.book-item h3, .book-item p').forEach(text => {
            text.style.color = '';
        });
    }
}

/**
 * 更新选中章节样式
 * @param {HTMLElement} newItem - 新选中的章节项
 * @param {HTMLElement|null} currentItem - 当前选中的章节项
 */
function updateSelectedChapterStyle(newItem, currentItem) {
    if (currentItem) {
        currentItem.style.color = '';
        currentItem.style.fontWeight = '';
    }
    newItem.style.color = '#0066cc';
    newItem.style.fontWeight = 'bold';
}

/**
 * 显示上次阅读的章节
 * @param {HTMLElement} tocList - 目录列表元素
 * @param {HTMLElement} contentText - 内容区域元素
 * @param {Object} book - 书籍数据对象
 * @param {number} chapterIndex - 章节索引
 */
function showLastReadChapter(tocList, contentText, book, chapterIndex) {
    const showIndex = Math.min(chapterIndex, book.chapters.length - 1);
    if (book.chapters.length > 0) {
        contentText.innerHTML = `<p>${book.contents[showIndex]}</p>`;
        const selectedItem = tocList.children[showIndex];
        if (selectedItem) {
            selectedItem.style.color = '#0066cc';
            selectedItem.style.fontWeight = 'bold';
        }
    }
}
document.getElementById('toggle-toc').addEventListener('click', function () {
    const toc = document.querySelector('.modal-toc');
    const content = document.querySelector('.modal-content-text');
    const btn = document.getElementById('toggle-toc');

    // 添加动画类
    toc.classList.add('animating');
    content.classList.add('animating');

    // 切换显示状态
    toc.classList.toggle('hidden');
    content.classList.toggle('full-width');

    // 更新按钮文本
    btn.textContent = toc.classList.contains('hidden') ? '显示目录' : '隐藏目录';

    // 动画结束后移除动画类
    setTimeout(() => {
        toc.classList.remove('animating');
        content.classList.remove('animating');
    }, 300);
});