(function () {
    let vol = $('audio')[0].volume;
    $('audio')[0].volume=0.5;
    window.onload = function() {
        var lineDiv = document.getElementById('lineDiv'); //长线条
        var minDiv = document.getElementById('minDiv'); //小方块
        var msg = document.getElementById("msg");
        var vals = document.getElementById("vals");
        var ifBool = false; //判断鼠标是否按下
        //事件
        var start = function(e) {
            e.stopPropagation();
            ifBool = true;
            console.log("鼠标按下")
        }
        var move = function(e) {
            console.log("鼠标拖动")
            if(ifBool) {
                if(!e.touches) {    //兼容移动端
                    var y = e.clientY;
                } else {     //兼容PC端
                    var y = e.touches[0].pageY;
                }
                //var x = e.touches[0].pageX || e.clientX; //鼠标横坐标var x
                var lineDiv_left = getPosition(lineDiv).top; //长线条的横坐标
                var minDiv_left = y - lineDiv_left; //小方块相对于父元素（长线条）的left值
                if(minDiv_left >= lineDiv.offsetHeight - 15) {
                    minDiv_left = lineDiv.offsetHeight - 15;
                }
                if(minDiv_left < 0) {
                    minDiv_left = 0;
                }
                //设置拖动后小方块的left值
                minDiv.style.top = minDiv_left + "px";
                vals.innerText = parseInt((minDiv_left / (lineDiv.offsetHeight - 15)) * 100);
                $('audio')[0].volume = Math.abs(parseInt((minDiv_left / (lineDiv.offsetHeight - 15)) * 100-100)/100);
            }
        }
        var end = function(e) {
            console.log("鼠标弹起")
            ifBool = false;
        }
        //鼠标按下方块
        minDiv.addEventListener("touchstart", start);
        minDiv.addEventListener("mousedown", start);
        //拖动
        window.addEventListener("touchmove", move);
        window.addEventListener("mousemove", move);
        //鼠标松开
        window.addEventListener("touchend", end);
        window.addEventListener("mouseup", end);
        //获取元素的绝对位置
        function getPosition(node) {
            var left = node.offsetLeft; //获取元素相对于其父元素的left值var left

            var top = node.offsetTop;
            current = node.offsetParent; // 取得元素的offsetParent
            // 一直循环直到根元素

            while(current != null) {
                left += current.offsetLeft;

                top += current.offsetTop;
                current = current.offsetParent;
            }

            return {
                "left": left,
                "top": top
            };
        }
    }
    $(".voice").click(function(){
        if($(".lineDiv").css("display")=="none"){
            // $(".lineDiv").show();
            $(".lineDiv").fadeIn('slow');
        }else{
            // $(".lineDiv").hide();
            $(".lineDiv").fadeOut("slow");
        }
    });
})();