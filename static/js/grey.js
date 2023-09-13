
	function DateFormat() {
	  let date = new Date(),
	    currentDate,
	    currentTime,
	    seperator = "-", 
	    month = date.getMonth() + 1,
	    day = date.getDate(),
	    hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
	    minute =
	      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
	    second =
	      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	  month >= 1 && month <= 9 ? (month = "0" + month) : "";
	  day >= 0 && day <= 9 ? (day = "0" + day) : "";
	  //当前 日期
	  currentDate = month + seperator + day;
	  //当前 时间
	  currentTime = hour + ":" + minute + ":" + second;
	  // 输出格式 为 8-27 14:45:33
	  return currentDate + " " + currentTime;
	}
	var nowTime = DateFormat();
	// 设置南京事件公祭日
	var NJ_country_startTime = "12-13 00:00:00";
	var NJ_country_overTime = "12-14 00:00:00";
	//设置汶川哀悼开始及结束 是 5月12号凌晨
	var earthquake_startTime = "05-12 00:00:00";
	var earthquake_overTime = "05-13 00:00:00";

	var mao_startTime = "09-09 00:00:00";
	var mao_overTime = "09-09 23:59:59";

	var start_test = "09-13 00:00:00";
	var end_test = "09-13 20:59:00";
	grey_times = [
			[NJ_country_startTime, NJ_country_overTime],
			[earthquake_startTime, earthquake_overTime],
			[mao_startTime, mao_overTime],
			[start_test, end_test]

	]


	// 将变灰封装到一个函数里，需要的时候再调用
	function grey() {
	  $("html").css({
	    "-webkit-filter": "grayscale(100%)",
	    "-moz-filter": "grayscale(100%)",
	    "-ms-filter": "grayscale(100%)",
	    "-o-filter": "grayscale(100%)",
	    // ie滤镜
	    filter: "progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)",
	    // ie6 等低版本浏览器不需要加滤镜
	    _filter: "none"
	  });
	}
	for (let i = 0; i < grey_times.length; i++) {
		//在这判断时间，时间字符串可以直接判断大小，不过要精确到秒
		if (nowTime >= grey_times[i][0] && nowTime <= grey_times[i][1]) {
	  		// 把html 设置灰色滤镜
	  		grey();
			break;
		}
	}
	
	
