
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

// 绑定粒子动态效果
var bindParticle = function() {
    var ids = ['#skye-personal', '#skye-about', '#skye-work', '#skye-blog', '#skye-resume', '#skye-contact']

    bindEvent(document, 'DOMContentLoaded', function(){
      for (var i = 0; i < ids.length; i+=2) {
          var ele = getElement(ids[i])
          particleground(ele, {
              dotColor: '#7AEBEB',
              lineColor: '#7AEBEB'
          })
          // log('Ele: ', ele)
      }
      for (var i = 1; i < ids.length; i+=2) {
          var ele = getElement(ids[i])
          particleground(ele, {
              dotColor: '#555555',
              lineColor: '#555555'
          })
          // log('Ele: ', ele)
      }
    })
}

var bindTouchEvent = function() {
    var page = getElement('#skye-background')
    var nextNum = 0

    var startX = 0, startY = 0, endX = 0, endY = 0
    var selector = '.section'
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























var skye = function() {
    bindClick()
    bindScroll()
    bindParticle()
    bindTouchEvent()
}

skye()
