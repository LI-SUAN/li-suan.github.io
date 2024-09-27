import os
import json
import re
from datetime import datetime

import subprocess
import atexit

def execute_git_commands():
    subprocess.call(['git', 'add', '.'])
    subprocess.call(['git', 'commit', '-m', 'none'])
    subprocess.call(['git', 'push'])

atexit.register(execute_git_commands)

# 定义posts文件夹路径和posts.json文件路径
posts_folder = 'posts'
posts_json = 'posts.json'

# 定义一个函数来提取Markdown文件中的大标题
def extract_title(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            match = re.match(r'^# (.+)', line)
            if match:
                return match.group(1)
    return '无标题'

# 获取posts文件夹中的所有Markdown文件
posts_files = [f for f in os.listdir(posts_folder) if f.endswith('.md')]

# 创建一个列表来存储文件信息
posts_data = []

# 遍历每个Markdown文件，提取文件名和大标题
for post_file in posts_files:
    file_path = os.path.join(posts_folder, post_file)
    title = extract_title(file_path)
    filename = os.path.splitext(post_file)[0]
    posts_data.append({
        'filename': filename,
        'title': title
    })

# 按照文件名中的日期倒序排序
posts_data.sort(key=lambda x: datetime.strptime(x['filename'], '%Y-%m-%d-%H%M'), reverse=True)

# 将结果写入posts.json文件
with open(posts_json, 'w', encoding='utf-8') as json_file:
    json.dump(posts_data, json_file, ensure_ascii=False, indent=4)

print("posts.json has been updated")