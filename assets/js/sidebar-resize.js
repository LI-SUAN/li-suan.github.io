const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const resizeHandle = document.getElementById('resize-handle');

let isResizing = false;

resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});

function resize(e) {
    if (isResizing) {
        const newWidth = e.clientX;
        sidebar.style.width = `${newWidth}px`;
        mainContent.style.marginLeft = `${newWidth}px`;
        resizeHandle.style.left = `${newWidth}px`;
    }
}

function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
}