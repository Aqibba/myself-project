// 封装一个代替getElementById()的方法
function byId(id){
	return typeof(id) === "string"?document.getElementById(id):id;
}

function slideImg(){
	var main = byId("main");
	// 滑过清除定时器，离开继续
	main.onmouseover = function (){
		// 清除定时器
	}

	main.onmouseout = function (){
		// 启用定时器
	}
}


slideImg();