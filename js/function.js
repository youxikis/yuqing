	


	//兼容函数
	//功能：兼容IE8 通过类名获取元素
	//参数说明：
	function getClass(classname,obj){
		var obj=obj||document;
		if(obj.getElementsByClassName){//判断w3c浏览器
			return obj.getElementsByClassName(classname);//结果返回
		}
		else{//否则IE8
            var all=obj.getElementsByTagName("*");//用标签名获取到所有元素，是一个集合
            var arr=[];
            //新数组，用来保存找到的元素
            for(var i=0;i<all.length;i++){
            	//遍历all
            	if(checkRel(all[i].className,classname)){
            		arr.push(all[i]);
            		//末尾添加元素
            	}
            }return arr;
		}
	}
		//"inner one"["inner","one"]
		//参数说明：str-多个类名的集合以后的字符串
		          //val-想找的类名
		function checkRel(str,val){
			var newarr=str.split(" ");
			//字符串转换成数组，以空格拆分
			for(var i=0;i<newarr.length;i++){//遍历数组
				if(newarr[i]==val){
				//如果数组中的值与val相同
					return true;
					//函数返回true，表示找到
				}
			}
			return false;
			//如果没有找到，返回false
		}
	// var box=getClass("box")[0];
	// var inner=getClass("inner",box);
	//alert(inner.length);
//***************************************
//可以获取与设置纯文本函数
//obj:哪个对象用这个方法
//val:接收第二个实参，表示设置一个文本
function getContent(obj,value){
	 if(value){
      //设置
       if(obj.innerText){
             obj.innerText=value;
       }else{
             obj.textContent=value;
       }
     }else{
        //获取
        if(obj.innerText){
          return obj.innerText;
       }else{
          return obj.textContent;
       }
     }
}


//**************************************
//获取样式
//obj:哪个对象
//attr:哪个属性

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr]; //IE
	}
	else{
		return getComputedStyle(obj,null)[attr];//w3c
	}
}
/*
**********************************************************
$(".box");   类名
$("#first"); ID名
$("div");    标签名
*/
	function $(select,obj){
		var obj=obj||document;
		if(typeof select=="string"){
			select=select.replace(/^\s*|\s*$/g,"");
			//去掉字符串前后的空格
			if(select.charAt(0)=="."){
				return getClass(select.slice(1),obj);
			}
			else if(select.charAt(0)=="#"){
				return document.getElementById(select.slice(1));
			}
			else if(/^[a-zA-Z][a-zA-Z0-9]{0,10}$/g.test(select)){
        //测试是否符合标签
				return obj.getElementsByTagName(select);
			}else if(/^<[a-zA-Z][a-zA-Z0-9]{0,10}>$/g.test(select)){
                return document.createElement(select.slice(1,-1));
      }	
		}
		else if(typeof select=="function"){
				window.onload=function(){
					select();
				}
			}

	}
//**************************************************************
//getChilds(parent);
//"a"获取元素子节点的兼容函数
//"b"获取元素+文本节点
function getChilds(parent,type){
	 var type=type||"a";
     var childs=parent.childNodes;
     //所有儿子
     var arr=[];
    for(var i=0;i<childs.length;i++){
	if(type=="a"){
		if(childs[i].nodeType==1){
            arr.push(childs[i]);
     	}
	}
	else if(type=="b"){//元素+文本
          if(childs[i].nodeType==1||(childs[i].nodeType==3&&
            childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){
            arr.push(childs[i]);
     	}
	}
     	
     }return arr;
}

//********************************************
//6.先获得第一个子节点

function getFirst(parent,type){
    var type=type||"a";
	return getChilds(parent,type)[0];
}


//7.获得最后一个子节点

function getLast(parent,type){
	var type=type||"a";
  var childs=getChilds(parent,type);
	return childs[childs.length-1];
}

//8.获得一个指定节点

function getNum(parent,n,type){
  var type=type||"a";
  var childs=getChilds(parent,type);
  if(n>childs.length||n<1){
    return false;
  }
	return childs[n-1];
}

//9.下一个兄弟节点；

function getNext(obj,type){
   var type=type||"a";
	var next=obj.nextSibling;
	if(next==null){
		return false;
	}

   if(type=="a"){//元素节点
 		while(next.nodeType==3||next.nodeType==8){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
 	 }
	 return next;
 }else if(type=="b"){//元素和文本节点
      while(next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8){
      next=next.nextSibling;
      if(next==null){
        return false;
      }
   }
   return next;
 }
}


// 10.上一个兄弟节点

function getPrevious(obj,type){
	  var type=type||"a";
    var previous=obj.previousSibling;
    if(previous==null){
      return false;
    }
    if(type=="a"){//元素节点
       while(previous.nodeType==3||previous.nodeType==8){
           previous=previous.previousSibling;
           if(previous==null){
            return false;
           }
        } 
      return previous;
    }else if(type=="b"){//元素和文本节点
        while(previous.nodeType==3&&!previous.nodeValue.replace(/^\s*|\s*$/g,"")||previous.nodeType==8){
           previous=previous.previousSibling;
           if(previous==null){
            return false;
           }
        } 
      return previous;
    }

}

//************************************************************************************
//插入到某个对象之后
//对象·insertBefore(obj,obj1)
//插入到下一个对象之前
//重点 给对象的原型添加此方法
//原理：找到第二个参数的下一个兄弟节点，将第一个参数插入到此兄弟节点之前（插入到下一个对象之前）
//obj1:插入的那个对象
//obj2:插入哪个对象的后面

function insertBefore(obj,beforeObj){
         var parent=beforeObj.parentNode;
         parent.insertBefore(obj,beforeObj);
}

function insertAfter(obj,afterObj){
        var parent=afterObj.parentNode;
        var next=getNext(afterObj,"b");
        if(!next){
           parent.appendChild(obj);
        }else{
        parent.insertBefore(obj,next);
      }
}
//********************************************************
//滚动条发生改变时的事件
function getScrollT(){
  	//window.onscroll=function(){
  	/*var fh=document.documentElement.scrollTop;
  	var gh=document.body.scrollTop;
  	document.title=gh;*/

  	
  	//兼容问题,获取滚动条与页面顶部的距离
  	/*var obj=document.documentElement.scrollTop?document.documentElement:document.body;
  	var scrollT=obj.scrollTop;
  	document.title=scrollT;*/

  	var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
  	return scrollT;
  	//document.title=scrollT;
 // }
}
//*****************************************************
//obj:給哪个对象添加
//ev:什么事件
//fun:事件处理程序
function addEvent(obj,even,fun){
  if(obj.addEventListener){
  	return obj.addEventListener(even,function(){
  		fun.call(obj);
  	},false);
  }
  else{
  	return obj.attachEvent("on"+even,function(){
  		fun.call(obj);
  	});
  	//IE8中，this不指当前对象，指的是window
  }
}
//*****************************************************
//obj:給哪个对象添加
//ev:什么事件
//fun:事件处理程序
function delEvent(obj,even,fun){
  if(obj.removeEventListener){
  	return obj.removeEventListener(even,function(){
  		fun.call(obj);
  	},false);
  }
  else{
  	return obj.detachEvent("on"+even,function(){
  		fun.call(obj);
  	});
  	//IE8中，this不指当前对象，指的是window
  }
}

//*******************************************
function getCW(){
	return document.documentElement.clientWidth;
}
function getCH(){
	return document.documentElement.clientHeight;
}
//******************************************
function drag(obj){
     	var cw=getCW();
     	var ch=getCH();
     	var ow=obj.offsetWidth;
     	var oh=obj.offsetHeight;
     	obj.onmousedown=function(e){
     		var ev=e||window.event;
     		var ox=ev.offsetX;
     		var oy=ev.offsetY;
     		//阻止浏览器的默认行为
     		if (ev.preventDefault ){ 
				ev.preventDefault();
				} //阻止默认浏览器动作(W3C) 
				else{
				ev.returnValue=false;}//IE中阻止函数器默认动作的方式	
     		document.onmousemove=function(e){
     			var ev=e||window.event;
     			var cx=ev.clientX;
     			var cy=ev.clientY;
     			var newx=cx-ox;
     			var newy=cy-oy;
     			if(newx<=0){
     				newx=0;
     			}
     			if(newx>(cw-ow)){
     				newx=cw-ow;
     			}
     			if(newy<=0){
     				newy=0;
     			}
     			if(newy>(ch-oh)){
     				newy=ch-oh;
     			}
     			obj.style.left=newx+"px";
     			obj.style.top=newy+"px";

     		}
     	}
     	obj.onmouseup=function(){
     		document.onmousemove=null;
     	}
}
//********************************************
//obj:哪个对象添加滚轮事件
//up:处理滚轮向上的函数
//down:处理滚轮向下的函数
function mouseWheel(obj,down,up){
	if(obj.attachEvent){
	obj.attachEvent("onmousewheel",scrollFun);
	//IE、opera
	}
	else{
	obj.addEventListener("mousewheel",scrollFun,false); 
	//chrome,safari -webkit
	obj.addEventListener("DOMMouseScroll",scrollFun,false); }
	//firefox -moz-
	function scrollFun(e){
		var ev=e||window.event;
		if(ev.preventDefault){
			ev.preventDefault(); 
			//阻止默认浏览器动作(W3C) 
		}
		else{
			ev.returnValue = false;
			//IE中阻止函数器默认动作的方式
		}
		var num=ev.detail||ev.wheelDelta;
		if(num==-3||num==120){
			 up.call(obj);//改变this指针，指向obj
		}else if(num==3||num==-120){
		   down.call(obj);
		}
	}
}
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  hover 不能用于事件委托
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
//时间差  now:现在的时间
function getCha(news,now){
			var arr=[];
			var cha=(news.getTime()-now.getTime())/1000;
			var day=parseInt(cha/(60*60*24));
			arr.push(day);
			cha%=(60*60*24);
			var hour=parseInt(cha/(60*60));
			arr.push(hour);
			cha%=(60*60);
			var minute=parseInt(cha/(60));
			arr.push(minute);
			var second=parseInt(cha%60);
			arr.push(second);
			return arr;
		}
//***************************************************
//obj:要实现拖拽的对象
	//attrobj:
	//attrobj.fatherobj:必传
	//attrobj.x:true可以拖动  false:不让动
	//attrobj.y:true可以拖动  false:不让动
	//attrobj.animate:true有动画 false:没有动画
	// function Drag(obj,attrobj){
 //       this.obj=obj;//把传进来的文档对象保存到构造函数的属性上
 //       if(typeof attrobj=="object"){
 //       	 var attrobj=attrobj;
 //       }else{
 //       	return;
 //       }
       
 //       this.x=attrobj.x==undefined?true:attrobj.x;
 //       this.y=attrobj.y==undefined?true:attrobj.y;
 //       this.animate=attrobj.animate==undefined?true:attrobj.animate;
 //       this.fatherobj=attrobj.fatherobj==undefined?true:attrobj.fatherobj;
 //       if(this.fatherobj){
 //       	  if(this.fatherobj.nodeType==9){
 //       	  	this.fatherobjW=document.documentElement.clientWidth;
 //       	  	this.fatherobjH=document.documentElement.clientHeight;
 //       	  }else{
 //       	  	this.fatherobjW=this.fatherobj.offsetWidth;
 //       	  	this.fatherobjH=this.fatherobj.offsetHeight;
 //       	  }
 //       }
 //       this.objW=this.obj.offsetWidth;
 //       this.objH=this.obj.offsetHeight;
 //       this.ox=0;
 //       this.oy=0;
 //       this.cx=0;
 //       this.cy=0;
 //       this.startx=0;
 //       this.starty=0;
 //       this.endx=0;
 //       this.endy=0;
 //       this.lenx=0;
 //       this.leny=0;
 //       this.sheep=0.8;
 //       this.drags;
	// }
	// Drag.prototype={
	// 	drags:function(){
 //            this.down();
	// 	},
	// 	event:function(e){
 //            return e||window.event;
	// 	},
 //        down:function(){
 //        	var that=this;
 //        	this.obj.onmousedown=function(e){
 //        		var ev=that.event(e);
 //        		if(ev.preventDefault){
 //        			ev.preventDefault();
 //        		}else{
 //        			ev.returnValue=false;
 //        		}
 //        		that.ox=ev.clientX-that.obj.offsetLeft;
 //        		that.oy=ev.clientY-that.obj.offsetTop;
 //        		that.startx=that.ox;
 //        		that.starty=that.oy;
 //                that.move();
 //                that.up();
 //        	}
 //        },
 //        move:function(){
 //        	var that=this;
 //        	document.onmousemove=function(e){
 //        		var ev=that.event(e);
 //        		that.cx=ev.clientX;
 //        		that.cy=ev.clientY;
 //        		var leftx=that.cx-that.ox;
 //        		var topx=that.cy-that.oy;
 //                if(that.fatherobj){
 //                	if(leftx<0){
 //                		leftx=0;
 //                	}
 //                	if(leftx>that.fatherobjW-that.objW){
 //                		leftx=that.fatherobjW-that.objW
 //                	}
 //                	if(topx<0){
 //                		topx=0;
 //                	}
 //                	if(topx>that.fatherobjH-that.objH){
 //                		topx=that.fatherobjH-that.objH
 //                	}
 //                	if(that.x){
 //                		that.obj.style.left=leftx+"px";
 //                	}
 //                	if(that.y){
 //                		that.obj.style.top=topx+"px";
 //                	}           	
                    
 //                }
 //                that.endx=that.cx;
 //                that.endy=that.cy;
 //                that.lenx=that.startx-that.endx;                
 //                that.leny=that.starty-that.endy;
 //                that.startx=that.endx;
 //                that.starty=that.endy;

 //        	}
 //        },
 //        up:function(){
 //        	var that=this;
 //        	document.onmouseup=function(){
 //        		if(that.animate){
 //        			if(Math.abs(that.lenx)<1){
 //        				clearInterval(t);
 //        			}
 //        			if(Math.abs(that.leny)<1){
 //        				clearInterval(t);
 //        			}
 //        			var t=setInterval(function(){
 //        				that.lenx*=that.sheep;
 //        				that.leny*=that.sheep;
 //        				var leftx=that.lenx+that.obj.offsetLeft;
 //        				var topx=that.leny+that.obj.offsetTop;
 //        				if(leftx<0){
 //                		leftx=0;
 //                	}
 //                	if(leftx>that.fatherobjW-that.objW){
 //                		leftx=that.fatherobjW-that.objW
 //                	}
 //                	if(topx<0){
 //                		topx=0;
 //                	}
 //                	if(topx>that.fatherobjH-that.objH){
 //                		topx=that.fatherobjH-that.objH
 //                	}


 //                		that.obj.style.left=leftx+"px";
 //                		that.obj.style.top=topx+"px";
 //        			},40)
 //        		}
 //        		document.onmousemove=null;
 //        		document.onmouseup=null;
 //        	}
 //        }
	// }

//*****************************************************************************************
//obj:要实现拖拽的对象
  function Drag(obj){
        this.obj=obj;//把传进来的文档对象保存到构造函数的属性上
        this.cx=0;
        this.cy=0;
        this.ox=0;
        this.oy=0;
        this.left=0;
        this.top=0;
        this.ow=this.obj.offsetWidth;
        this.oh=this.obj.offsetHeight;
        this.cw=document.documentElement.clientWidth;
        this.ch=document.documentElement.clientHeight;
  }
  Drag.prototype={
    drag:function(){
        this.down();
    },
    down:function(){
        var that=this;
        this.obj.onmousedown=function(e){
          var ev=e||window.event;
          that.ox=ev.offsetX;
          that.oy=ev.offsetY;
          that.move();
          that.up();
      } 
    },
    move:function(){
        var that=this;
        document.onmousemove=function(e){
          var ev=e||window.event;
          if(ev.preventDefault){
             ev.preventDefault();
          }else{
            ev.returnValue=false;
          }
          that.cx=ev.clientX;
          that.cy=ev.clientY;
          that.left=that.cx-that.ox;
          that.top=that.cy-that.oy;
          if(that.left<0){
            that.left=0;
          }
          if(that.top<0){
            that.top=0;
          }
          if(that.left>=that.cw-that.ow){
            that.left=that.cw-that.ow;
          }
          if(that.top>=that.ch-that.oh){
            that.top=that.ch-that.oh;
          }
          that.obj.style.left=that.left+"px";
          that.obj.style.top=that.top+"px";
        }
    },
    up:function(){
        document.onmouseup=function(){
          document.onmousemove=null;
          document.onmouseup=null;
        }
    }
  }
  