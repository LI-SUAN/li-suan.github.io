async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        const posts = await response.json();
        const postList = document.getElementById('post-list');
        
        posts.forEach(post => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            // 移除文件扩展名
            const filename = post.filename.replace(/\.md$/, '');
            a.href = `#${filename}`;
            a.textContent = post.title;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                loadPost(filename);
            });
            li.appendChild(a);
            postList.appendChild(li);
        });

        // 默认加载第一篇文章
        if (posts.length > 0) {
            loadPost(posts[0].filename.replace(/\.md$/, ''));
        }
    } catch (error) {
        console.error('加载文章列表时出错:', error);
    }
}

async function loadPost(filename) {
    try {
        // 不添加 .md 扩展名
        const response = await fetch(`posts/${filename}`);
        const content = await response.text();
        const converter = new showdown.Converter();
        const html = converter.makeHtml(content);
        document.getElementById('post-content').innerHTML = html;
        Prism.highlightAll();
    } catch (error) {
        console.error('加载文章时出错:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadPosts);