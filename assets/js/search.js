let allPosts = [];

async function initSearch() {
    const response = await fetch('posts.json');
    allPosts = await response.json();

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', performSearch);
}

async function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';

    for (const post of allPosts) {
        if (post.title.toLowerCase().includes(searchTerm)) {
            const li = createPostListItem(post);
            postList.appendChild(li);
        } else {
            const content = await fetchPostContent(post.filename);
            if (content.toLowerCase().includes(searchTerm)) {
                const li = createPostListItem(post);
                postList.appendChild(li);
            }
        }
    }
}

function createPostListItem(post) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${post.filename}`;
    a.textContent = post.title;
    a.addEventListener('click', (e) => {
        e.preventDefault();
        loadPost(post.filename);
    });
    li.appendChild(a);
    return li;
}

async function fetchPostContent(filename) {
    const response = await fetch(`posts/${filename}.md`);
    return await response.text();
}

document.addEventListener('DOMContentLoaded', initSearch);