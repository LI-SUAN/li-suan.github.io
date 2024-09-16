// 加载README内容
fetch('/README.md')
    .then(response => response.text())
    .then(text => {
        const converter = new showdown.Converter();
        document.getElementById('readme-content').innerHTML = converter.makeHtml(text.replace(/---[\s\S]*?---/, '').trim());
    });

// 加载文章列表
fetch('/posts.json')
    .then(response => response.json())
    .then(posts => {
        const postList = document.getElementById('post-list');
        
        if (posts.length === 0) {
            postList.innerHTML = '<li>没有找到文章</li>';
            return;
        }

        // 按日期排序文章，最新的在前
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        posts.forEach(post => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#post/${post.filename}`;
            a.textContent = post.title;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                loadPost(post.filename);
            });
            li.appendChild(a);
            postList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('加载文章列表时出错:', error);
        document.getElementById('post-list').innerHTML = '<li>加载文章列表时出错</li>';
    });

function loadPost(fileName) {
    fetch(`/_posts/${fileName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            const content = text.replace(/---[\s\S]*?---/, '').trim(); // 移除YAML前置元数据
            const converter = new showdown.Converter();
            document.getElementById('readme-content').innerHTML = converter.makeHtml(content);
        })
        .catch(error => {
            console.error('加载文章时出错:', error);
            document.getElementById('readme-content').innerHTML = '<p>加载文章时出错</p>';
        });
}