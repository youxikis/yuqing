$(function(){
    $(".obj4").css("transform","translate(0,0)").css("opacity",1)
    var ch=$(window).height();
    $(".firstbox").css("height",ch)
    $(".first").css("height",ch)
    $(".secondbox").css("height",ch)
    $(".second").css("height",ch)
    $(".thirdbox").css("height",ch)
    $(".third").css("height",ch)
    $(".fourbox").css("height",ch)
    $(".four").css("height",ch)
    //移动端swipe事件
    var flag=true
    var num=0
    $(".manping").mousedown(function(e){
        e.preventDefault()
        $(".manping").mousemove(function(e){
            e.preventDefault()
        })
    })
    touch.on(".manping","swipe",function(e){
        if(e.direction=="down"){
            //1.方向 2.开关 3.和数字关联起来
            if(num==0){
                return;
            }
            if(!flag){
                return;
            }
            flag=false
            num--
            $(".manping").css("marginTop",-num*ch)
            $("#right-dian>li").css("background","").eq(num).css("background","#333")
        }else if(e.direction=="up"){
            if(num==$(".lista").length-1){
                return;
            }
            if(!flag){
                return;
            }
            flag=false
            num++
            $(".manping").css("marginTop",-num*ch)
            $("#right-dian>li").css("background","").eq(num).css("background","#333")
        }
        $(".lista").each(function(index,obj){
            if(index==num){
                $(obj).find(".leftdx").css("transform","translate(0,0)").css("opacity",1)
                $(obj).find(".rightdx").css("transform","translate(0,0)").css("opacity",1)
            }else{
                $(obj).find(".leftdx").css("transform","translate(-50px,0)").css("opacity",0.4)
                $(obj).find(".rightdx").css("transform","translate(50px,0)").css("opacity",0.4)
            }
        })
        $(window).resize(function(){
            var ch=$(window).height();
            $(".firstbox").css("height",ch)
            $(".first").css("height",ch)
            $(".secondbox").css("height",ch)
            $(".second").css("height",ch)
            $(".thirdbox").css("height",ch)
            $(".third").css("height",ch)
            $(".fourbox").css("height",ch)
            $(".four").css("height",ch)
            $(".manping").css("marginTop",-num*ch)
        })
    })
    $(".manping")[0].addEventListener("webkitTransitionEnd",function(){
        flag=true;
    })
    //右边圆点事件
    $("#right-dian>li").mouseover(function(){
        var index=$("#right-dian>li").index(this)
        $("#right-zi>li").eq(index).finish().animate({opacity:0.7})
    })
    $("#right-dian>li").mouseout(function(){
        var index=$("#right-dian>li").index(this)
        $("#right-zi>li").eq(index).finish().animate({opacity:0})
    })
    //圆点点击
    $("#right-dian>li").click(function(){
        var num=$("#right-dian>li").index(this)
        $(".manping").css("marginTop",-num*ch)
        $("#right-dian>li").css("background","").eq(num).css("background","#333")
        $(".lista").each(function(index,obj){
            if(index==num){
                $(obj).find(".leftdx").css("transform","translate(0,0)").css("opacity",1)
                $(obj).find(".rightdx").css("transform","translate(0,0)").css("opacity",1)
            }else{
                $(obj).find(".leftdx").css("transform","translate(-50px,0)").css("opacity",0.4)
                $(obj).find(".rightdx").css("transform","translate(50px,0)").css("opacity",0.4)
            }
        })
        $(window).resize(function(){
            var ch=$(window).height();
            $(".firstbox").css("height",ch)
            $(".first").css("height",ch)
            $(".secondbox").css("height",ch)
            $(".second").css("height",ch)
            $(".thirdbox").css("height",ch)
            $(".third").css("height",ch)
            $(".fourbox").css("height",ch)
            $(".four").css("height",ch)
            $(".manping").css("marginTop",-num*ch)
        })
    })
    //箭头点击
    $(".btna").click(function(){
        var num=$(".btna").index(this)
        $(".manping").css("marginTop",-(num+1)*ch)
        $("#right-dian>li").css("background","").eq(num+1).css("background","#333")
        $(".lista").each(function(index,obj){
            if(index==(num+1)){
                $(obj).find(".leftdx").css("transform","translate(0,0)").css("opacity",1)
                $(obj).find(".rightdx").css("transform","translate(0,0)").css("opacity",1)
            }else{
                $(obj).find(".leftdx").css("transform","translate(-50px,0)").css("opacity",0.4)
                $(obj).find(".rightdx").css("transform","translate(50px,0)").css("opacity",0.4)
            }
        })
        $(window).resize(function(){
            var ch=$(window).height();
            $(".firstbox").css("height",ch)
            $(".first").css("height",ch)
            $(".secondbox").css("height",ch)
            $(".second").css("height",ch)
            $(".thirdbox").css("height",ch)
            $(".third").css("height",ch)
            $(".fourbox").css("height",ch)
            $(".four").css("height",ch)
            $(".manping").css("marginTop",-(num+1)*ch)
        })
    })
    //响应
    $(".cha").click(function(){
        if(flag){
            $(".cha1").css({
                "transform":"translate(0,9px) rotate(45deg)"
            })
            $(".cha2").css({
                "transform":"translate(0,-9px) rotate(-45deg)"
            })
            $(".menu").css({
                "height": 400,
            })
            $(".menu li a").each(function(index,obj){
                $(obj).css({
                    "opacity":1,
                    "transition":"all 700ms ease "+index*0.3+"s"
                })
            })
            flag=false
        }else{
            $(".cha1").css({
                "transform":""
            })
            $(".cha2").css({
                "transform":""
            })
            $(".menu").css({
                "height": 0,
            })
            $(".menu li a").each(function(index,obj){
                $(obj).css({
                    "opacity":0,
                    "transition":"all 700ms ease "+index*0.3+"s"
                })
            })
            flag=true
        }

    })
    //滚轮事件
    function mouseWheel(obj,upfun,downfun){
        if(obj.attachEvent){
            obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
        }else if(obj.addEventListener){
            obj.addEventListener("mousewheel",scrollFn,false);
            //chrome,safari -webkit-
            obj.addEventListener("DOMMouseScroll",scrollFn,false);
            //firefox -moz-
        }
        function scrollFn(e){
            var ev=e||window.event;
            if (ev.preventDefault ){
                ev.preventDefault(); //阻止默认浏览器动作(W3C)
            }else{
                ev.returnValue = false;//IE中阻止函数器默认动作的方式
            }
            var num=ev.detail||ev.wheelDelta;
            if(num==-3||num==120){//向上
                if(upfun){
                    upfun();
                }
            }
            if(num==3||num==-120){//向上
                if(downfun){
                    downfun();
                }
            }
        }
    }

    mouseWheel($(".manping")[0],function(){
        if(num==0){
            return;
        }
        if(!flag){
            return;
        }
        flag=false
        num--
        $(".manping").css("marginTop",-num*ch)
        $("#right-dian>li").css("background","").eq(num).css("background","#333")
        $(".lista").each(function(index,obj){
            if(index==num){
                $(obj).find(".leftdx").css("transform","translate(0,0)").css("opacity",1)
                $(obj).find(".rightdx").css("transform","translate(0,0)").css("opacity",1)
            }else{
                $(obj).find(".leftdx").css("transform","translate(-50px,0)").css("opacity",0.4)
                $(obj).find(".rightdx").css("transform","translate(50px,0)").css("opacity",0.4)
            }
        })
        $(window).resize(function(){
            var ch=$(window).height();
            $(".firstbox").css("height",ch)
            $(".first").css("height",ch)
            $(".secondbox").css("height",ch)
            $(".second").css("height",ch)
            $(".thirdbox").css("height",ch)
            $(".third").css("height",ch)
            $(".fourbox").css("height",ch)
            $(".four").css("height",ch)
            $(".manping").css("marginTop",-num*ch)
        })
    },function(){
        if(num==$(".lista").length-1){
            return;
        }
        if(!flag){
            return;
        }
        flag=false
        num++
        $(".manping").css("marginTop",-num*ch)
        $("#right-dian>li").css("background","").eq(num).css("background","#333")
        $(".lista").each(function(index,obj){
            if(index==num){
                $(obj).find(".leftdx").css("transform","translate(0,0)").css("opacity",1)
                $(obj).find(".rightdx").css("transform","translate(0,0)").css("opacity",1)
            }else{
                $(obj).find(".leftdx").css("transform","translate(-50px,0)").css("opacity",0.4)
                $(obj).find(".rightdx").css("transform","translate(50px,0)").css("opacity",0.4)
            }
        })
        $(window).resize(function(){
            var ch=$(window).height();
            $(".firstbox").css("height",ch)
            $(".first").css("height",ch)
            $(".secondbox").css("height",ch)
            $(".second").css("height",ch)
            $(".thirdbox").css("height",ch)
            $(".third").css("height",ch)
            $(".fourbox").css("height",ch)
            $(".four").css("height",ch)
            $(".manping").css("marginTop",-num*ch)
        })
    })
})
