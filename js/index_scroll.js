
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
    var slideDownBtn = getElement('#slideDown')
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
    bindEvent(slideDownBtn, 'click', function(){
        var curnum = parseInt(page.dataset.curnum)
        if(curnum >= 0 && curnum < 5) {
            nextNum = curnum + 1
        }
        move(nextNum)
    })
}

var move = function(num) {
    var slideDownBtn = getElement('#slideDown')
    var page = getElement('#skye-background')
    page.dataset.curnum = num
    var offset = num * 100
    page.style.top = `-${offset}%`

    if(num == 5) {
        slideDownBtn.style.display = 'none'
    } else {
        slideDownBtn.style.display = 'block'
    }
    // bindParticle(num)
    hideCanvas(num)
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

var hideCanvas = function(num) {
    var canvas = getElements('canvas')
    if(num % 2 == 0) {
        canvas[0].style.opacity = '0'
        canvas[1].style.opacity = '1'
    } else {
        canvas[0].style.opacity = '1'
        canvas[1].style.opacity = '0'
    }

}

// 绑定粒子动态效果
var bindParticle = function() {
    var colors = ['#7AEBEB', '#555555']
    var ele = getElement('#skye-background')
    for (var i = 0; i < colors.length; i++) {
        particleground(ele, {
            dotColor: colors[i],
            lineColor: colors[i]
        })
    }
    hideCanvas(0)
}

var bindTouchEvent = function() {
    var page = getElement('#skye-background')
    var nextNum = 0

    var startX = 0, startY = 0, endX = 0, endY = 0
    var selector = 'canvas'
    bindEventAll(selector, 'touchstart', function(e){
        startX = Number(e.targetTouches[0].pageX)
        startY = Number(e.targetTouches[0].pageY)
    })
    bindEventAll(selector, 'touchend', function(e){
        var curnum = parseInt(page.dataset.curnum)
        endX = Number(e.changedTouches[0].pageX)
        endY = Number(e.changedTouches[0].pageY)
        var x = startX - endX
        var y = startY - endY
        if(y > 0 && curnum < 5) {
            nextNum = curnum + 1
        } else if(y < 0 && curnum > 0) {
            nextNum = curnum - 1
        }
        move(nextNum)
    })
}

var bindWork1 = function() {
    var img = getElement('#work1-img')
    var des = getElement('#work1-des')

    bindEvent(img, 'mouseenter', function(){
        img.parentElement.style.transform = 'rotateY(180deg)'
    })
    bindEvent(des, 'mouseleave', function(){
        des.parentElement.style.transform = 'rotateY(0deg)'
    })
    bindEvent(img, 'touchstart', function(){
        img.parentElement.style.transform = 'rotateY(180deg)'
    })
    bindEvent(des, 'touchend', function(){
        des.parentElement.style.transform = 'rotateY(0deg)'
    })
}























var skye = function() {
    bindClick()
    bindScroll()
    bindParticle()
    bindTouchEvent()
    bindWork1()
}

skye()
