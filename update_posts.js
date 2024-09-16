const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

async function updatePostsJson() {
  const postsDir = '_posts';
  const postsJsonPath = 'posts.json';

  try {
    const files = await fs.readdir(postsDir);
    
    const posts = await Promise.all(
      files
        .filter(file => path.extname(file) === '.md')
        .map(async file => {
          const filePath = path.join(postsDir, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const { data } = matter(content);
          
          return {
            filename: file,
            title: data.title || path.basename(file, '.md')
          };
        })
    );

    posts.sort((a, b) => b.filename.localeCompare(a.filename));

    await fs.writeFile(postsJsonPath, JSON.stringify(posts, null, 2));
    console.log('posts.json 已成功更新');
  } catch (error) {
    console.error('更新 posts.json 时出错:', error);
    process.exit(1);
  }
}

updatePostsJson();