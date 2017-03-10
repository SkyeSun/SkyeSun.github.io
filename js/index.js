
// 所有与表现和动画有关的事件绑定函数
var animate = function() {
    var body = getElement('body'),
        header = getElement('#skye-header')

    bindEvent(header, 'click', function(){
        toggleClass(header, 'skye-header-scroll')
    })
}
















var skye = function() {
    animate()
}

skye()
