(function() {
	/*
	 * 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
	 */
	var dateObj = (function() {
		var _date = new Date(); // 默认为当前系统时间
		return {
			getDate: function() {
				return _date;
			},
			setDate: function(date) {
				_date = date;
			}
		};
	})();

	// 设置calendar div中的html部分
	renderHtml();
	// 表格中显示日期
	showCalendarData();
	// 绑定事件
	bindEvent();
//	var table = document.getElementById("calendarTable");
//	var tds = table.getElementsByTagName('td');
//	for(var i = 0; i < tds.length; i++) {
//		
//	}
	/**
	 * 渲染html结构
	 */
	function renderHtml() {
		var calendar = document.getElementById("calendar");
		var titleBox = document.createElement("div"); // 标题盒子 设置上一月 下一月 标题
		var bodyBox = document.createElement("div"); // 表格区 显示数据

		// 设置标题盒子中的html
		titleBox.className = 'calendar-title-box';
		titleBox.innerHTML = "<span class='prev-month' id='prevMonth'></span>" +
			"<span class='calendar-title' id='calendarTitle'></span>" +
			"<span id='nextMonth' class='next-month'></span>";
		calendar.appendChild(titleBox); // 添加到calendar div中

		// 设置表格区的html结构
		bodyBox.className = 'calendar-body-box';
		var _headHtml = "<tr>" +
			"<th>日</th>" +
			"<th>一</th>" +
			"<th>二</th>" +
			"<th>三</th>" +
			"<th>四</th>" +
			"<th>五</th>" +
			"<th>六</th>" +
			"</tr>";
		var _bodyHtml = "";

		// 一个月最多31天，所以一个月最多占6行表格
		for(var i = 0; i < 6; i++) {
			_bodyHtml += "<tr>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"</tr>";
		}
		bodyBox.innerHTML = "<table id='calendarTable' class='calendar-table'>" +
			_headHtml + _bodyHtml +
			"</table>";
		// 添加到calendar div中
		calendar.appendChild(bodyBox);
	}

	/**
	 * 表格中显示数据，并设置类名
	 */
	function showCalendarData() {
		var _year = dateObj.getDate().getFullYear();
		var _month = dateObj.getDate().getMonth() + 1;
		var _dateStr = getDateStr(dateObj.getDate());

		// 设置顶部标题栏中的 年、月信息
		var calendarTitle = document.getElementById("calendarTitle");
		var titleStr = _dateStr.substr(0, 4) + "年" + _dateStr.substr(4, 2) + "月";
		calendarTitle.innerText = titleStr;

		// 设置表格中的日期数据
		var _table = document.getElementById("calendarTable");
		
		var diankuang =document.getElementsByClassName("foot")[0];
		var _tds = _table.getElementsByTagName("td");
		var _firstDay = new Date(_year, _month - 1, 1); // 当前月第一天
		for(var i = 0; i < _tds.length; i++) {
			var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
			var _thisDayStr = getDateStr(_thisDay);
			
			
			// 给td设置属性dian  dian为0，代表此td无点，为1，有点
			var dian = random();
			_tds[i].setAttribute('dian', dian);
			
			var td_text = _thisDay.getDate() + (dian==0?null:".");
			
			if(dian == 1){
				addEvent(_tds[i], 'click', function(e) {
					console.log(e.target.getAttribute('data'));
					setTimeout(function(){
						diankuang.style.display="block"
						a()
					},100)
					function a(){
							setTimeout(function(){
							diankuang.style.display="none"
						},1500)
					}
					
						
				});
			}
			
			
			_tds[i].innerText = td_text;
			
			
			//_tds[i].data = _thisDayStr;
			_tds[i].setAttribute('data', _thisDayStr);
			
			if(_thisDayStr == getDateStr(new Date())) { // 当前天
				_tds[i].className = 'currentDay';
			} else if(_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
				_tds[i].className = 'currentMonth'; // 当前月
			} else { // 其他月
				_tds[i].className = 'otherMonth';
			}
		}
	}

	/**
	 * 绑定上个月下个月事件
	 */
	function bindEvent() {
		var prevMonth = document.getElementById("prevMonth");
		var nextMonth = document.getElementById("nextMonth");
		addEvent(prevMonth, 'click', toPrevMonth);
		addEvent(nextMonth, 'click', toNextMonth);
	}

	/**
	 * 绑定事件
	 */
	function addEvent(dom, eType, func) {
		if(dom.addEventListener) { // DOM 2.0
			dom.addEventListener(eType, function(e) {
				func(e);
			});
		} else if(dom.attachEvent) { // IE5+
			dom.attachEvent('on' + eType, function(e) {
				func(e);
			});
		} else { // DOM 0
			dom['on' + eType] = function(e) {
				func(e);
			}
		}
	}

	/**
	 * 点击上个月图标触发
	 */
	function toPrevMonth() {
		var date = dateObj.getDate();
		dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
		showCalendarData();
	}

	/**
	 * 点击下个月图标触发
	 */
	function toNextMonth() {
		var date = dateObj.getDate();
		dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
		showCalendarData();
	}

	/**
	 * 日期转化为字符串， 4位年+2位月+2位日
	 */
	function getDateStr(date) {
		var _year = date.getFullYear();
		var _month = date.getMonth() + 1; // 月从0开始计数
		var _d = date.getDate();

		_month = (_month > 9) ? ("" + _month) : ("0" + _month);
		_d = (_d > 9) ? ("" + _d) : ("0" + _d);
		return _year + _month + _d;
	}
	// 随机数，随机出来是否有点
	function random(){
		return Math.random() > 0.5 ? 0 : 1;
	}
})();