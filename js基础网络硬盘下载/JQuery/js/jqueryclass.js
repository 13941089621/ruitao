(function($) {
				//默认参数
				var config = {
					width: 350,
					height: 350,
					borderWidth: 1,
					borderColor: "black"
				};
				//创建插件函数
				$.fn.extend({
					"glass": function(gconfig) {
						//合并参数
						var newconfig = $.extend({}, config, gconfig);
						return this.each(function() {
							$this = $(this);
							//获取各种元素
							var $glasswrap = $this.find(".glass-wrap");
							var $glasswrapsmall = $this.find(".glass-wrap-small");
							var $glasswrapbig = $this.find(".glass-wrap-big");
							var $glassimgsmall = $this.find(".glass-img-small");
							var $glassimgbig = $this.find(".glass-img-big");
							var $glassbox = $this.find(".glass-box");
							$glasswrap.css({
								position: "relative",
							});
							//小图容器样式
							$glasswrapsmall.css({
								width: newconfig.width + "px",
								height: newconfig.height + "px",
								border: newconfig.borderWidth + "px solid " + newconfig.borderColor,
								position: "absolute",
								top: 0,
								left: 0
							});
							//大图容器样式
							$glasswrapbig.css({
								width: newconfig.width + "px",
								height: newconfig.height + "px",
								border: newconfig.borderWidth + "px solid " + newconfig.borderColor,
								position: "absolute",
								top: 0,
								left: parseInt(newconfig.borderWidth) * 2 + parseInt(newconfig.width) + "px",
								overflow: "hidden",
								display: "none"
							});
							//小图的样式
							$glassimgsmall.css({
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%"
							});
							//大图的样式
							$glassimgbig.css({
								position: "absolute",
								top: 0,
								left: 0
							});
							//放大镜的样式
							$glassbox.css({
								width: "100px",
								height: "100px",
								backgroundColor: "skyblue",
								opacity: "0.3",
								position: "absolute",
								top: 0,
								left: 0,
								display: "none"
							});
							//当鼠标移入显示放大镜和大图
							$glasswrapsmall.mouseover(function() {
								$glasswrapbig.css("display", "");
								$glassbox.css("display", "");
							});
							//当鼠标移入显示放大镜和大图
							$glasswrapsmall.mouseout(function() {
								$glasswrapbig.css("display", "none");
								$glassbox.css("display", "none");
							});
							//移动
							$glasswrapsmall.mousemove(function(e) {
								var e = e || window.event;
								var offset = $glasswrapsmall.offset();
								//获取鼠标位置
								var mX = e.pageX - offset.left;
								var mY = e.pageY - offset.top;
								//计算放大镜的移动范围
								var moveX = $glasswrapsmall.width() - $glassbox.width();
								var moveY = $glasswrapsmall.height() - $glassbox.height();
								//设置放大镜的临时位置
								var tempX = mX - $glassbox.width() / 2;
								var tempY = mY - $glassbox.height() / 2;
								//最终位置
								var nowX = 0;
								var nowY = 0;
								if (tempX >= moveX) {
									nowX = moveX;
								} else if (tempX > 0 && tempX < moveX) {
									nowX = tempX;
								}
								if (tempY >= moveY) {
									nowY = moveY;
								} else if (tempY > 0 && tempY < moveY) {
									nowY = tempY;
								}
								//设置放大镜的位置
								$glassbox.css("left", nowX + "px").css("top", nowY + "px");
								//计算放大镜的位置比例
								var ratioX = $glassbox.position().left / $glasswrapsmall.width();
								var ratioY = $glassbox.position().top / $glasswrapsmall.height();
								//设置大图的位置
								$glassimgbig.css({
									left: -ratioX * $glassimgbig.width() + "px",
									top: -ratioY * $glassimgbig.height() + "px"
								});
							});
						});
					}
				});
			})(window.jQuery);