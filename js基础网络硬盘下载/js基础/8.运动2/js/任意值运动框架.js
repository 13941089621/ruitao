//  获取非行间样式
/**
 * 
 * @param {Object} obj   需要操作的对象
 * @param {Object} name   对象的属性
 */
function getStyle(obj, name) {
	//  IE内核
	if (obj.currentStyle) {
		return obj.currentStyle[name]
	} else { //   谷歌内核
		return getComputedStyle(obj, false)[name];
	}
}

//  任意属性运动框架
//  链式运动框架
/**
 * 
 * @param {Object} obj  操作的对象
 * @param {Object} json  要操作的对象的属性值及要达到的目标，组成的json
 * @param {Object} endFn  定时器停止时运行的函数，可以为空
 */
function startMove(obj, json, endFn) {
	//  如果timer有多个，清除掉，就留一个定时器
	clearInterval(obj.timer);
	//  定时器
	obj.timer = setInterval(function() {
		
		//  设一个变量，用来控制什么情况关掉定时器
		var stop = true;
		
		//  for循环 遍历json，取出对象的属性及要达成的目标  attr为对象属性，json[attr]为目标
		for (var attr in json) {
			//  命名变量，值为需要的对象的属性
			//  如果是透明度，四舍五入，浮点，取非行间样式，因为计算机计算浮点数有的不准确
			//  不是透明度，取整，就是把400px中的400取出，不要px
			var offsetCur = attr == "opacity" ? Math.round(parseFloat(getStyle(obj, attr)) * 100) : parseInt(getStyle(obj, attr));
			//  命名变量，控制动画速度，不是匀速运动，速度需要变化   改变10，改变速度
			var speed = (json[attr] - offsetCur) / 10;
			//  判断速度正负，正是向上取整，负是向下取整，防止没到位置就停下
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			
			//  如果有一个值不等于目标值，stop为false，必须都达到目标值，stop才为true
			if (offsetCur != json[attr]) {
				stop = false;
			}
			
				//  如果是透明度  
				if (attr == "opacity") {
					//  谷歌写法
					//   对象属性   =    属性    +   速度     /  100
					obj.style.opacity = (offsetCur + speed) / 100;
					//   IE  写法
					obj.style.filter = "alpha(opacity:" + (offsetCur + speed) + ")";
					
					//  如果不是透明度，是有px的值
				} else {
					//   对象属性   =    属性    +   速度  +  px
					obj.style[attr] = offsetCur + speed + "px"
				}
			
		}
		
		//  判断是否到达目标位置
		//  stop为true时，关掉定时器
			if (stop == true) {
				//  到达就停止
				clearInterval(obj.timer);
				//  判断endFn是否为空，不是空是执行
				if (endFn) {
					endFn();
				}
				
		} 


	}, 20)
}