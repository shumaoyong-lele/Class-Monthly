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
        } else {
            loadBookContent('daocaoren'); // 加载稻草人内容
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
function loadBookContent(bookId) {
    const tocList = document.querySelector('.toc-list'); // 目录列表
    const contentText = document.querySelector('.content-text'); // 内容区域

    // 清空现有内容
    tocList.innerHTML = '';
    contentText.innerHTML = '';

    /**
     * 书籍内容数据
     * @type {Object}
     * @property {Array} chapters - 章节标题数组
     * @property {Array} contents - 章节内容数组
     */
    const booksData = {
        kongyiji: {
            chapters: ["第一章：孔乙己出场", "第二章：酒馆里的嘲笑", "第三章：偷书事件", "第四章：最后的遭遇"],
            contents: [
                "鲁镇的酒店的格局，是和别处不同的...",
                "孔乙己是站着喝酒而穿长衫的唯一的人...",
                "有一回对我说道，“你读过书么？”...",
                "自此以后，又长久没有看见孔乙己..."
            ]
        },
        daocaoren: {
            chapters: [
                "稻草人",
                "燕子",
                "一粒种子",
                "地球",
                "梧桐子",
                "旅行家",
                "鲤鱼的遇险",
                "眼泪",
                "画眉",
                "玫瑰和金鱼",
                "祥哥的胡琴",
                "瞎子和聋子",
                "跛乞丐",
                "快乐的人",
                "牧羊儿",
                "小黄猫的恋爱故事",
                "聪明的野牛",
                "古代英雄的石像",
                "书的夜话",
                "皇帝的新衣",
                "蚕和蚂蚁",
                "熊夫人幼稚园",
                "“鸟言兽语”"
            ],
            contents: [
                "  田野里白天的风景和情形，有诗人把他写成美妙的诗，有画家把它画成生动的画。到了夜间，诗人喝了酒，有些醉了；画家呢，正在抱着精致的乐器低低的唱，都没有功夫到田野里来。那么，还有谁把田野里夜间的风景和情形告诉人们呢？有，还有，就是稻草人。\n基督教里的人说，人是上帝亲手造的。且不问这句话对不对，咱们可以套一句说，稻草人是农人亲手造的。他的骨架子是竹园里的细竹枝，他的肌肉、皮肤是隔年的黄稻草。破竹篮子、残荷叶都可以做他的帽子；帽子下面的脸平板板的，分不清哪里是鼻子，哪里是是眼睛。他的手没有手指，却拿着一把破扇子——其实也不能算拿，不过用线拴住扇柄，挂在手上罢了。他的骨架子长得很，脚底下下还有一段，农人把这一段插在田地中间的泥土里，他就整天整夜地站在那里了。\n  稻草人是非常尽责任。要是拿牛有跟他比，有比他懒怠多了，有时躺在地上，抬起头看天。要是拿狗跟他比，狗比他顽皮多了，有时到处乱跑，累得主人四处去找寻。他从来不嫌烦，像牛那样躺着看天；也从来不贪玩，像狗那样到处乱跑。他安安静静的看着田地，手里的扇子轻轻摇动，赶走那些飞来的小雀，他们是来吃新结的稻穗的。他不吃饭，也不睡觉，不是坐下歇一歇也不肯，总是直挺挺地站在那里。\n  这是当然的，田野里夜间的风景和情形，只有稻草人知道得最清楚，也知道的最多。他知道露水怎么样洒在草叶上，露水的味道怎么样香甜；他知道星星怎么样眨眼，月亮怎么样笑；他知道夜间的田野怎么样沉静，花草树木怎么样沉睡；他知道小虫们怎么样你找我、我找你，蝴蝶们怎么样恋爱。总之，夜间的一切他都知道的清清楚楚。\n  以下就讲讲稻草人在夜间遇见的几件事情。\n  一个满天星斗的夜里，他看守着田地，手里的扇子轻轻摇动。新出的稻穗一个挨一个，星光射在上面，有些发亮，相顶着一层水珠；有一点儿风，有沙拉沙拉的响。稻草人看着，心里很高兴。他想，今年的收成一定可以使它的主人——一个可怜的老太太——笑一笑了。她以前哪里笑过呢八九年前的丈夫死了她想起来就哭眼睛到现在还红着而且成了毛病动不动就流眼泪他只有一个儿子娘儿两个费古利中这块田足足有三年才没能把她丈夫的丧丧必废话母亲不会想到儿子紧接着得了白喉也死了他当时昏过去了后来就落了个冰棒的毛病",
                "一个满天星斗的夜里，稻草人看见一个农妇...",
                "第二天，稻草人又看见一个渔妇...",
                "渔妇的船舱里，鲫鱼躺在木桶底上..."
            ]
        }
    };

    const book = booksData[bookId];
    let currentSelectedItem = null; // 当前选中的章节项

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