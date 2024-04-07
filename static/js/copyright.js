/** 监听copy事件 */
document.addEventListener('copy', function (e) {
    //取消默认事件，才能修改复制的值
    e.preventDefault();
    //复制的内容
    var copyTxt;
    if (window.getSelection(0).toString().length >= 200) {
        copyTxt = `${window
            .getSelection(0)
            .toString()}\n\n---\n作者: 黄阿信\n站长: Yalexin\n公众号: GeekSpace\n链接: ${window.location.href
            }\n商业转载请联系作者获得授权，非商业转载请附上原文出处及本链接。`;
    } else {
        copyTxt = window.getSelection(0).toString();
    }
    if (e.clipboardData) {
        e.clipboardData.setData('text/plain', copyTxt);
    } else if (window.clipboardData) {
        return window.clipboardData.setData('text', copyTxt);
    }
});