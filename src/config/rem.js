(function(doc, win) {
    let docm = doc.documentElement,
        //orientationchange为移动终端横屏事件
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
        handleResize = function() {
            let clientWidth = docm.clientWidth;
            //假设以iphone6（375x667）为设计稿，则此时为 1rem = 10px;
            docm.style.fontSize = clientWidth / 37.5 + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvent, handleResize, false);
    doc.addEventListener('DOMContentLoaded', handleResize, false);
})(document, window);
