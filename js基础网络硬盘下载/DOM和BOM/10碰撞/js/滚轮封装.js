//  创建滚轮事件封装函数
function wheel(obj, fn) {
	//  是否为火狐浏览器
	var firefox = window.navigator.userAgent.indexOf("Firefox") > 0;

	if (firefox) {
		obj.addEventListener("DOMMouseScroll", progress)
	} else {
		obj.onmousewheel = progress;
	}

	function progress(e) {
		e = e || window.event;
		var down = true;
		if (e.detail) {
			if (e.detail < 0) {
				down = false;
			}
		} else {
			if (e.wheelDelta > 0) {
				down = false;
			}
		}
		fn(down);
	}
}