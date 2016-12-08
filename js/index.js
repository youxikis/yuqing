$(function(){
//	backtop
	var top=$(".banner").eq(0).offset().top;
	$(window).scroll(function(){
		var scrolltop=$(document).scrollTop();
		if(scrolltop>top){
			$(".fixedhead").eq(0).css("display","block");
			$(".fanhui").eq(0).css("display","block");
		}else if(scrolltop<top){
			$(".fixedhead").eq(0).css("display","none");
			$(".fanhui").eq(0).css("display","none");
		}
	})
	$(".fanhui").eq(0).click(function(){
		var scrolltop=$(document).scrollTop(0);
	})
//	backtop
//	jiedianlunbo
       var flagJ=true;
        var n=1;
        var width=$(".lunbobox>li").eq(0).outerWidth();
        function moveJ(){
          $(".lunbobox").eq(0).animate({left:-width*n},500,function(){
             $(this).eq(0).append($(".lunbobox>li").eq(0)).css({left:0});
             flagJ=true;
          })
        }
   // };
    $(".jcarousel-next").eq(0).click(function(){
        if(flagJ){
          moveJ();
        }
        flagJ=false;
    })
    $(".jcarousel-prev ").eq(0).click(function(){
         $(".lunbobox").eq(0).prepend($(".lunbobox>li").eq(length-1)).css({left:-width*n}).animate({left:0});
    })
//	jiedianlunbo
	$(".threex").click(function(){
		var index=$(this).index();
		$(".xuanbox>div").css("display","none").eq(index).css("display","block");
	    $(".threex>a").css({"color": "#828282","background":"#fafafa",}).eq(index).css({"color": "#000","background":"#fff"})
	    $(".threex").removeClass("first").eq(index).addClass("first");
	})
//banner
    $(window).resize(function(){
    	$(".banner").eq(0).height((400/1079)*$(".banner").eq(0).width());
    	$(".banner>h1").eq(0).css({"font-size":(3.3/1079)*$(".banner").eq(0).width()+"rem"});
    	$(".banner>h2").css({"font-size":(1.8/1079)*$(".banner").eq(0).width()+"rem"});
    	$(".banner>h4").css({"font-size":(1.6/1079)*$(".banner").eq(0).width()+"rem"})
    	
    })
       $(".banner").eq(0).hover(function(){
       	$(".ls-nav").css("display","block");
       },function(){
       	$(".ls-nav").css("display","none");
       })
    		$(".plane1").eq(0).css({"left":"40%","transition": "all 0.2s ease-in-out"});
	    	$(".plane2").eq(0).css({"left":"62%","transition":" all 0.25s ease-in-out 0.1s"});
	    	$(".cloud1").eq(0).css({"left":"17%","transition":"all 0.15s ease-in-out"});
	    	$(".cloud2").eq(0).css({"left":"60%","transition": "all 0.17s ease-in-out"});
	    	$(".banner>h1").eq(0).css({"top":"38%","transition":"all 0.4s ease-in-out 0.35s"});
	    	$(".banner>h2").eq(0).css({"top":"51%","transition": "all 0.4s ease-in-out 0.45s"});
	    	$(".banner>h2").eq(1).css({"top":"60%" ,"transition": "all 0.4s ease-in-out 0.5s"});
	    	
        $(".ls-nav-next").click(function(){
        	$(".plane1").eq(0).css({"left":"-100%","transition": "all 0.5s ease-in-out"});
	    	$(".plane2").eq(0).css({"left":"-100%","transition":" all 0.6s ease-in-out"});
	    	$(".cloud1").eq(0).css({"left":"-100%","transition":"all 0.5s ease-in-out"});
	    	$(".cloud2").eq(0).css({"left":"-100%","transition": "all 0.52s ease-in-out"});
	    	$(".banner>h1").eq(0).css({"top":"100%","transition":"all 0.9s ease-in-out"});
	    	$(".banner>h2").eq(0).css({"top":"100%","transition": "all 0.7s ease-in-out"});
	    	$(".banner>h2").eq(1).css({"top":"100%" ,"transition": "all 0.5s ease-in-out"});
        	$(".ls-s2").eq(0).css("display","none");
        	
    		$(".lunbopc").eq(0).css({"top":"8%","transition":" all 0.15s ease-in-out 0.6s"});
	    	$(".lunbo2goodne").eq(0).css({"top":"35%","opacity":1,"transition": "all 0.15s ease-in-out 0.9s"});
	    	$(".lunbo2h4").eq(0).css({"top":"46%","opacity":1,"transition": "all 0.15s ease-in-out 1s"});
	    	$(".linbo2x").eq(0).css({"top":"32%","opacity":1,"transition": "all 0.15s ease-in-out 1.75s"});
	    	$(".banner>.linbo2h21").eq(0).css({"left":"64%","transition": "all 0.15s ease-in-out 1.7s"});
	    	$(".banner>.linbo2h22").eq(0).css({"left":"64%","transition": "all 0.15s ease-in-out 1.9s"});
	    	$(".banner>.linbo2h1").eq(0).css({"top":"50%","transition": "all 0.15s ease-in-out 2.1s"});
    	})
    	
    	
   
    
});
