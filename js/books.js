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
    // 初始化弹窗颜色
    const modal = document.querySelector('.modal-content');
    modal.style.backgroundColor = '#333';
    modal.style.color = '#fff';
}

// 添加书籍点击事件
document.querySelectorAll('.book-item').forEach((item, index) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function () {
        const modal = document.querySelector('.book-modal');
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // 根据点击的书籍加载内容
        if (index === 0) {
            loadBookContent('kongyiji');
        } else {
            loadBookContent('daocaoren');
        }
    });
});

// 关闭弹窗事件
document.querySelector('.close-modal').addEventListener('click', function () {
    const modal = document.querySelector('.book-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
});

toggleSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

    // 根据系统偏好设置初始主题
    if (prefersDarkMode) {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        toggleSwitch.checked = true;
        // 初始化弹窗颜色
        const modal = document.querySelector('.modal-content');
        modal.style.backgroundColor = '#333';
        modal.style.color = '#fff';

        // 初始化书籍介绍颜色
        document.querySelectorAll('.book-description').forEach(desc => {
            desc.style.color = '#e0e0e0';
        });
        document.querySelectorAll('.book-item h3, .book-item p').forEach(text => {
            text.style.color = '#ffffff';
        });
    }

    // 更新弹窗主题
    const modal = document.querySelector('.modal-content');
    if (document.body.classList.contains('dark')) {
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
        modal.style.backgroundColor = '';
        modal.style.color = '';

        // 恢复书籍介绍颜色
        document.querySelectorAll('.book-description').forEach(desc => {
            desc.style.color = '';
        });
        document.querySelectorAll('.book-item h3, .book-item p').forEach(text => {
            text.style.color = '';
        });
    }
});

// 加载书籍内容函数
function loadBookContent(bookId) {
    const tocList = document.querySelector('.toc-list');
    const contentText = document.querySelector('.content-text');

    // 清空现有内容
    tocList.innerHTML = '';
    contentText.innerHTML = '';

    // 书籍内容数据
    const booksData = {
        kongyiji: {
            chapters: [
                "第一章：孔乙己出场",
                "第二章：酒馆里的嘲笑",
                "第三章：偷书事件",
                "第四章：最后的遭遇"
            ],
            contents: [
                "鲁镇的酒店的格局，是和别处不同的...",
                "孔乙己是站着喝酒而穿长衫的唯一的人...",
                "有一回对我说道，“你读过书么？”...",
                "自此以后，又长久没有看见孔乙己..."
            ]
        },
        daocaoren: {
            chapters: [
                "第一章：田野守望者",
                "第二章：农妇的悲剧",
                "第三章：渔妇的挣扎",
                "第四章：鲫鱼的命运"
            ],
            contents: [
                "田野里立着一个稻草人，骨架子是竹园里的细竹枝...",
                "一个满天星斗的夜里，稻草人看见一个农妇...",
                "第二天，稻草人又看见一个渔妇...",
                "渔妇的船舱里，鲫鱼躺在木桶底上..."
            ]
        }
    };

    const book = booksData[bookId];
    let currentSelectedItem = null;

    if (book) {
        // 尝试从本地存储获取上次阅读位置
        const lastReadKey = `lastRead_${bookId}`;
        let lastChapterIndex = localStorage.getItem(lastReadKey);
        lastChapterIndex = lastChapterIndex ? parseInt(lastChapterIndex) : 0;

        book.chapters.forEach((chapter, index) => {
            const li = document.createElement('li');
            li.textContent = chapter;
            li.addEventListener('click', () => {
                contentText.innerHTML = `<p>${book.contents[index]}</p>`;
                
                // 移除之前选中项的样式
                if (currentSelectedItem) {
                    currentSelectedItem.style.color = '';
                    currentSelectedItem.style.fontWeight = '';
                }
                
                // 设置当前选中项的样式
                li.style.color = '#0066cc';
                li.style.fontWeight = 'bold';
                currentSelectedItem = li;
                
                // 保存当前阅读位置
                localStorage.setItem(lastReadKey, index);
            });
            tocList.appendChild(li);
        });

        // 显示上次阅读的章节或第一章
        const showIndex = Math.min(lastChapterIndex, book.chapters.length - 1);
        if (book.chapters.length > 0) {
            contentText.innerHTML = `<p>${book.contents[showIndex]}</p>`;
            const selectedItem = tocList.children[showIndex];
            if (selectedItem) {
                selectedItem.style.color = '#0066cc';
                selectedItem.style.fontWeight = 'bold';
                currentSelectedItem = selectedItem;
            }
        }
    }
}