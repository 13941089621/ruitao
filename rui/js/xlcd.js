
			var first = document.getElementsByClassName("first");
			var first_len = first.length;
			for(var i = 0; i < first_len; i++) {
				var first_i = first[i];
				
				set_menu_attr(first_i, [".second", ".one>.sanjiao", ".first>.one"])
				
				var second = first_i.menu;
				var second_len = second.length;
				for(var j = 0; j < second_len; j++) {
					var second_j = second[j];
					set_menu_attr(second_j, [".third", ".one>.sanjiao", ".second>.one"]);
					if(j == second_len - 1) break;
					second_j.className += " border_bottom"
				}
				if(i == first_len - 1) break;
				first_i.className = "first border_bottom";
			}

			function set_menu_attr(first_i, arr) {
				first_i.menu = first_i.querySelectorAll(arr[0]);
				first_i.sanjiao = first_i.querySelector(arr[1]);
				first_i.temp = "none";
				first_i.first_click_dom = first_i.querySelector(arr[2]);
				first_i.first_click_dom.parent_dom = first_i;
				first_i.first_click_dom.onclick = function() {
					return first_click(this.parent_dom)
				}
			}

			function first_click(obj) {
				var menu = obj.menu;
				var menu_len = menu.length;
				var display = "";
				var src = "";
				var classname;
				var sanjiao_class;
				if(obj.temp == "none") {
					display = "block";
					obj.temp = "block";
					src = "img/left.png";
//					src = "down sanjiao"
					classname = "one border_bottom"
					sanjiao_class = "sanjiao shu";
				} else {
					display = "none";
					obj.temp = "none";
					src = "img/right.png";
//					src = "left sanjiao"
					classname = "one"
					sanjiao_class = "sanjiao heng"
				}
				for(var i = 0; i < menu_len; i++) {
					menu[i].style.display = display;
				}
				obj.sanjiao.src = src;
				obj.sanjiao.className = sanjiao_class;
//				obj.sanjiao.className = src
				obj.first_click_dom.className = classname;
			}
		