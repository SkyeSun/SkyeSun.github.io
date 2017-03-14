
var bindClick = function() {
    var logo = getElement('#skye-logo')
    var selector = 'li'
    bindEvent(logo, 'click', function(){
        move(0)
    })
    bindEventAll(selector, 'click', function(event){
        var self = event.target
        var num = self.dataset.num
        move(num)
    })

}

var bindScroll = function() {
    var page = getElement('#skye-background')
    var nextNum = 0

    mouseScroll(function(delta){
        var curnum = parseInt(page.dataset.curnum)
        if(delta < 0 && curnum < 5 ) {
            nextNum = curnum + 1
        } else if(delta > 0 && curnum > 0) {
            nextNum = curnum - 1
        }
        move(nextNum)
    })
}

var move = function(num) {
    var page = getElement('#skye-background')
    page.dataset.curnum = num
    var offset = num * 100
    page.style.top = `-${offset}%`
}

// 监听鼠标滚轮事件(套路)
var mouseScroll = function(fn){
    var roll = function(){
        var delta = 0,
        e = arguments[0] || window.event
        delta = (e.wheelDelta) ? e.wheelDelta / 120 : -(e.detail || 0) / 3
        fn(delta) // 回调函数中的回调函数
    }
    if(window.netscape ){
        document.addEventListener('DOMMouseScroll', roll, false)
    }else{
        document.onmousewheel = roll
    }
}























var skye = function() {
    bindClick()
    bindScroll()
}

skye()
