var Borwser={
	isIe  : !!window.ActiveXObject ,
	isLowerIe9  : !-[1,] ,
	isIe6: !window.XMLHttpRequest  && window.ActiveXObject ,
	isOpera: window.oprea+""=="[object Oprea]"
};

String.prototype.repeat =function(n){
	//n表示字符串重复的次数
	return new Array(n+1).join(this);
};

String.prototype.trim= function(){
	return this.replace(/^\s+/,"").replace(/\s+/,"");
};

Number.prototype.inter = function(a,b){
	var min = Math.min(a,b),max = Math.max(a,b);
	return this==a ||this ==b ||(Math.max(this,min)==this&&Math.min(this,max)==this);
};

var Base = {};
Base.extend =function ( src,dest){
	for(var i in src){
		if(src[i]!=undefined){
			dest[i]=src[i];
		}
	}
}

(function(){
	function jsonEncode(o){
		if(window.JSON+""==="[object JSON]"){
			return JSON.stringify(o);
		}
		var t = typeof o ;
		switch(t){
			case "string":
			 return '"'+ addslashes(o) +'"';
			 case "number" :
			 case "boolean":
			      return o + "";
			 case "undefined":
			 case "function":
			 case  "unknow":
			    return "null" ;
			 case "object":
			      if(!o) return "null";
			    var ret = [] ;
			     if(o instanceof Array){
			     	for(var i = 0 ;i<o.length;i++){
			          ret.push(jsonEncode[o[i]]);
			     	}
			     	return "["+ ret.join(",") + "]" ;
			     }else{
			     	for (var i in o){
			  		  ret.push(jsonEncode(i)+":"+jsonEncode(o[i]));
			     	}
			      return "{"+ ret.join(",")+"}";
			     }
		  }
	}
	var specialchars={
		'"':'\\"',
		'\\':'\\\\',
		"\n":"\\n",
		"\r":"\\r"
	};
	function addslashes(s){
	 return s.replace(/\\|\n|\r/g,function(m){
	 	 return specialchars[m] ;
	 });
	}
})() ;

Base.init =function(Class,$this,args){
	$this.originalArgs = args ;
	for(var i in ars){
		$this[i]= args[i];
	}
	if(Class.defaultArgs){
		for(i in Class.defaultArgs){
			if(args[i]===undefined){
			$this[i]=Class.defaultArgs[i].valueOf($this);
		  }
		}
	}
}
Base.params = function(o){ //一个json对象转为url键值对
    var a =[] ;
    for (var i in o){
    	if(o[i]!=undefined){
    		a.push(encodeURIComponent(i)+"="encodeURIComponent(o[i]));
    	}
    }
    return a.join('&');
 };
Base.createXHR = function(){
	return window.XMLHttpRequest?
	new XMLHttpRequest();
	new ActiveXObject("Microsoft.XMLHttpRequest"); //ie6
}
/*
* arrgs{
	url 
	method   default 为get
	success Function
	data {key:value}
	cache Boolean true表示缓存 默认值为false
}
*/
Base.ajax=function(args){
   var xhr = Base.createXHR(),
   data=Base.params(args.data);
   args.method = args.method ||"GET" ;
   if(/get/i.test(args.method)){
      args.url+="?"+data ;    
   }
   if(!args.cache){ //不缓存
	   	if(args.url.indexOf("?")<0) {
	   		args.url+= "?" ;	   	
	   	}
	   	args.url+="&"+(new Date());
   }
   xhr.open(args.method,args.url,true);

   xhr.onreadystatechange =function(){
   	if(xhr.readyState===4&& xhr.status===200){
   	 	args.success(xhr.responseText,xhr.responseXML);
   	    }
   	};
   	if(/post/i.test(ars.method)){
   		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   		xhr.send(data); //post以http协议发送
     	}
   	else{
   		xhr.send() ; //get以url发送
   	     }
   };
       
 Base.prefix =function(n,pos){
 	 //功能：接受一个数字，加前导0 
 	 //n：数字
 	//pos 表示当前数字少于pos为的时候加前导0
 	var n = ""+ n ;
 	if(n.length<pos){
 		n="0".repeat(pos-n.length)+n;
 	}
 	return n ;
 } ;

 Base.swapNode = function(a,b){
 	//parentNode.insertBefore(要插入的节点，原来的节点)；
 	//pearentNode.replaceChild(newNode,child)
 	//parentNode.appendChild
 	var temp = document.createTextNode("");
 	a.parentNode.replaceChild(tem,a);
 	b.parentNode.replaceChild(a,b);
 	tmp.parentNode.replaceChild(b,temp);
 };
 Base.delNode =function(){ //删除指定的节点
 	for(var i=0;node;i<arguments.length;i++){
 	 node=arguments[i];
 	 node.parentNode.removeChild(node);
 	}
 };
 function date(s,t){ //php的格式
   //s Y-m-d H:i:s
   //t new Date ()
   t = t || new Date();
   var re = /Y|m|d|H|i|s/g ;
   return s.replace(re,function($1){
   	  switch($1){
   	  	case "Y" : return Base.prefix( t.getFullYear(),4);
   	  	case "m" : return Base.prefix(t.getMonth()+1 ,2) ;
   	  	case "d" :return Base.prefix(t.getDate(),2);
   	  	case "H" :return Base.prefix(t.getHours(),2);
   	  	case "i" :return Base.prefix(t.getMinutes(),2);
   	  	case "s" :return Base.prefix(t.getSeconds() ,2);
   	  }
   	  return $1 ;
   });

   function $(id){
   	return document.getElementById(id);
    }
  }

 function getByClass(className,context){
 	context =context ||document ;
 	if(context.getElementByClassName){
 		return context.getElementByClassName(className);
 	}
 	var nodes =context.getElementsByTagName('*'),ret =[];
 	var l = nodes.length ;
  for (var i = 0;i<l ; i++){
  	if(hasclass(node[i],className)){
  		ret.push(nodes[i]);
  	}
  }
  return ret ;
 }
function hasClass(node,className){
	var names = node.className.split(/\s+/);
	for (var i = 0 ;i<names.length;i++){
		if(names[i]==className){
			return true ;
		}
	}
	return false ;
}

function addClass(o,className){
	if(!hasClass(o,className)){
		o.className +=" " + className ;
		return o  ;
	}
}

function delClass(o,className){
	var names = o.className.split(/\s+/);
	for(var i = 0;i<names.length;i++){
		if(names[i].className) delete names[i] ;
	}
	o.className = names.join(" ") ;
	return  o ;
}

function animate(o,start,alter,dur,fx){
	/*o 动画对象
	start {opacity：0 , fontSize:12 动画对象属性初始值 } 
    alter {动画对象属性终值}
    dur 持续时间
    fx 运动的动画形式
    */
 var curTime  = 0 ; //当前运动时间数
 var t =setInterval(function(){
 	if(curTime>=dur){ clearInterval(t);};
 	for (var i in start){
 		if("opacity"==i){
	 			if(!!o.style.opacity){  //opacity 0~1 
	 	         o.style.opacity =  fx(s tart[i],alter[i],cutTime,dur) ;	           
	 			}
	 			else{
	 	          o.style.filter ="alpha(opacity=" + fx(s tart[i],alter[i],cutTime,dur)*100 + ")" ;				
	 			}
 			 }else{
 		       o.style[i] =fx(start[i],alter[i],cutTime,dur)+'px';
 			 }
 	}
 });

}

function addEvent(obj,evType,fn){
	if(obj.addEventListener &&!Browser.isOpera){
		obj.addEventListener(evType,fn,false);
	} 
	if(obj.attachEvent){
		obj.attachEvent('on'+evType,fn);
	}

	return obj ;
}

function delEvent(obj,evType,fn){
	if(obj.removeEventListener&& !Browser.isOpera){
		obj.removeEventListener(evType,fn,false);
	}
	if(obj.detachEvent){
		obj,detachEvent(evType,fn) ;
	}
	return obj ;
}

function fixEvt(evt,o){
	if(!evt.target){
		evt.target =evt.srcElement;
	 
	 if("mouseover"==evt.type){
		evt.relatedTraget = evt.fromElement;
	  } else if("mouseout"==evt.type){
        evt.relatedTarget = evt.toElement ;
	  }
	  evt.pageX = evt.clientX+document.documentElement.scrollLeft;
	  evt.PageY =evt.clientY+document.documentElement.scrollTop;
	  evt.stopPropagation=function(){
	  	evt.cancelBubble = true ;
	  };
	  evt.preventDefault =function(){
	  	evt.returnValue =false ;
	  };
 }
 //ie与oprea的offsetx与offsetY 没有将边框算进内
 if(o!=window && o.nodeType){ 
 //要求是个DOM对象
   //evt.layerX = evt.offsetX + o.clientLeft ;
   //evt.layerY = evt.offsetY + o.clentTop ;
   //如何获取一个DOM元素在页面中的坐标
   var offset = getOffset(o);
   evt.layerX = evt.pageX -offset.x ;
   evt.layerY = evt.PageY -offset.y ;
   }
   return evt ;
}

function getRealStyle(o,name){
	if(window.getComputedStyle){
		return window.getComputedStyle(o,null)[name] ;
	}else if(o.currentStyle){
       if("float"==name){
       	name ="styleFloat";
       }
       return o.currentStyle[name] ;
	}
}

function camelize(s){ //将css属性名转换为驼峰式
	return s.replace(/-[a-z]/gi,function(c){
		return c.charAt(1).toUpperCase();
	});
//将匹配到的一个字符 传给 c 
//返还c处理后的结果替换匹配字符
}

function getOffset(o){
	// o.offsetLeft
	//o.offsetTop
	//o.offsetParent
	var x = y = 0 ,de =document.documentElement;
	if(o==de){
		return {
			x:de.srcollLeft ,
			y:de.scrollTop
		};
	}
	while(o){
		x+= o.offsetLeft;
		y+=o.offsetTop ;
		o=o.offsetParent;
		if(o && o!=de && Browser.isLowerIe9){
			x+=o.clientLeft ;  
			y+o.clientTop;
		}
	}
   return {
   	x:x ,
   	y:y 
   }
};
var Tween = {
	Linear:function (start,alter,curTime,dur) {return start+curTime/dur*alter;},//最简单的线性变化,即匀速运动
	Quad:{//二次方缓动
		easeIn:function (start,alter,curTime,dur) {
			return start+Math.pow(curTime/dur,2)*alter;
		},
		easeIn:function(strat,alert,curTime,dur){
			return start+ Math.pow(curTime/dur)*alter ;  //初始值 + (2000/3000)^2* 变化量 
		}
		easeOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur;
			return start-(Math.pow(progress,2)-2*progress)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?Math.pow(progress,2):-((--progress)*(progress-2) - 1))*alter/2+start;
		}
	},
	Cubic:{//三次方缓动
		easeIn:function (start,alter,curTime,dur) {
			return start+Math.pow(curTime/dur,3)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur;
			return start-(Math.pow(progress,3)-Math.pow(progress,2)+1)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?Math.pow(progress,3):((progress-=2)*Math.pow(progress,2) + 2))*alter/2+start;
		}
	},
	Quart:{//四次方缓动
		easeIn:function (start,alter,curTime,dur) {
			return start+Math.pow(curTime/dur,4)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur;
			return start-(Math.pow(progress,4)-Math.pow(progress,3)-1)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?Math.pow(progress,4):-((progress-=2)*Math.pow(progress,3) - 2))*alter/2+start;
		}
	},
	Quint:{//五次方缓动
		easeIn:function (start,alter,curTime,dur) {
			return start+Math.pow(curTime/dur,5)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur;
			return start-(Math.pow(progress,5)-Math.pow(progress,4)+1)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?Math.pow(progress,5):((progress-=2)*Math.pow(progress,4) +2))*alter/2+start;
		}
	},
	Sine :{//正弦曲线缓动
		easeIn:function (start,alter,curTime,dur) {
			return start-(Math.cos(curTime/dur*Math.PI/2)-1)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			return start+Math.sin(curTime/dur*Math.PI/2)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			return start-(Math.cos(curTime/dur*Math.PI/2)-1)*alter/2;
		}
	},
	Expo: {//指数曲线缓动
		easeIn:function (start,alter,curTime,dur) {
			return curTime?(start+alter*Math.pow(2,10*(curTime/dur-1))):start;
		},
		easeOut:function (start,alter,curTime,dur) {
			return (curTime==dur)?(start+alter):(start-(Math.pow(2,-10*curTime/dur)+1)*alter);
		},
		easeInOut:function (start,alter,curTime,dur) {
			if (!curTime) {return start;}
			if (curTime==dur) {return start+alter;}
			var progress =curTime/dur*2;
			if (progress < 1) {
				return alter/2*Math.pow(2,10* (progress-1))+start;
			} else {
				return alter/2* (-Math.pow(2, -10*--progress) + 2) +start;
			}
		}
	},
	Circ :{//圆形曲线缓动
		easeIn:function (start,alter,curTime,dur) {
			return start-alter*Math.sqrt(-Math.pow(curTime/dur,2));
		},
		easeOut:function (start,alter,curTime,dur) {
			return start+alter*Math.sqrt(1-Math.pow(curTime/dur-1));
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?1-Math.sqrt(1-Math.pow(progress,2)):(Math.sqrt(1 - Math.pow(progress-2,2)) + 1))*alter/2+start;
		}
	},
	Elastic: {//指数衰减的正弦曲线缓动
		easeIn:function (start,alter,curTime,dur,extent,cycle) {
			if (!curTime) {return start;}
			if ((curTime==dur)==1) {return start+alter;}
			if (!cycle) {cycle=dur*0.3;}
			var s;
			if (!extent || extent< Math.abs(alter)) {
				extent=alter;
				s = cycle/4;
			} else {s=cycle/(Math.PI*2)*Math.asin(alter/extent);}
			return start-extent*Math.pow(2,10*(curTime/dur-1)) * Math.sin((curTime-dur-s)*(2*Math.PI)/cycle);
		},
		easeOut:function (start,alter,curTime,dur,extent,cycle) {
			if (!curTime) {return start;}
			if (curTime==dur) {return start+alter;}
			if (!cycle) {cycle=dur*0.3;}
			var s;
			if (!extent || extent< Math.abs(alter)) {
				extent=alter;
				s =cycle/4;
			} else {s=cycle/(Math.PI*2)*Math.asin(alter/extent);}
			return start+alter+extent*Math.pow(2,-curTime/dur*10)*Math.sin((curTime-s)*(2*Math.PI)/cycle);
		},
		easeInOut:function (start,alter,curTime,dur,extent,cycle) {
			if (!curTime) {return start;}
			if (curTime==dur) {return start+alter;}
			if (!cycle) {cycle=dur*0.45;}
			var s;
			if (!extent || extent< Math.abs(alter)) {
				extent=alter;
				s =cycle/4;
			} else {s=cycle/(Math.PI*2)*Math.asin(alter/extent);}
			var progress = curTime/dur*2;
			if (progress<1) {
				return start-0.5*extent*Math.pow(2,10*(progress-=1))*Math.sin( (progress*dur-s)*(2*Math.PI)/cycle);
			} else {
				return start+alter+0.5*extent*Math.pow(2,-10*(progress-=1)) * Math.sin( (progress*dur-s)*(2*Math.PI)/cycle);
			}
		}
	},
	Back:{
		easeIn: function (start,alter,curTime,dur,s){
			if (typeof s == "undefined") {s = 1.70158;}
			return start+alter*(curTime/=dur)*curTime*((s+1)*curTime - s);
		},
		easeOut: function (start,alter,curTime,dur,s) {
			if (typeof s == "undefined") {s = 1.70158;}
			return start+alter*((curTime=curTime/dur-1)*curTime*((s+1)*curTime + s) + 1);
		},
		easeInOut: function (start,alter,curTime,dur,s){
			if (typeof s == "undefined") {s = 1.70158;}
			if ((curTime/=dur/2) < 1) {
				return start+alter/2*(Math.pow(curTime,2)*(((s*=(1.525))+1)*curTime- s));
			}
			return start+alter/2*((curTime-=2)*curTime*(((s*=(1.525))+1)*curTime+ s)+2);
		}
	},
	Bounce:{
		easeIn: function(start,alter,curTime,dur){
			return start+alter-Tween.Bounce.easeOut(0,alter,dur-curTime,dur);
		},
		easeOut: function(start,alter,curTime,dur){
			if ((curTime/=dur) < (1/2.75)) {
				return alter*(7.5625*Math.pow(curTime,2))+start;
			} else if (curTime < (2/2.75)) {
				return alter*(7.5625*(curTime-=(1.5/2.75))*curTime + .75)+start;
			} else if (curTime< (2.5/2.75)) {
				return alter*(7.5625*(curTime-=(2.25/2.75))*curTime + .9375)+start;
			} else {
				return alter*(7.5625*(curTime-=(2.625/2.75))*curTime + .984375)+start;
			}
		},
		easeInOut: function (start,alter,curTime,dur){
			if (curTime< dur/2) {
				return Tween.Bounce.easeIn(0,alter,curTime*2,dur) *0.5+start;
			} else {
				return Tween.Bounce.easeOut(0,alter,curTime*2-dur,dur) *0.5 + alter*0.5 +start;
			}
		}
	}
};

