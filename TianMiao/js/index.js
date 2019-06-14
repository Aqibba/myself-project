// 封装一个代替getElementById()的方法,方便简写
function byId(id) {
	return typeof(id) === "string" ? document.getElementById(id) : id;
}

// 定义全局变量 index 为了遍历轮播图中的div,以及后面的圆点
// 定义 timer 为了定时
// 定义 pics 获取 banner 下所有的图片
// 定义 len 获取共有多少张图片
// 定义 prev next 绑定点击事件 上一张 下一张切换 
var index = 0;
timer = null,
	pics = byId("banner").getElementsByTagName("div"),
	dots = byId("dots").getElementsByTagName("span"),
	len = pics.length;

// 鼠标经过与鼠标离开事件
function showMenu() {
	// 查找"我的淘宝","我的收藏","手机版","商家","网站导航","轮播图","上一张","下一张"的ID
	// 查找每个下面的二级子菜单
	let myTB = byId("myTB"),
		myCollect = byId("myCollect"),
		phone = byId("phone"),
		merchant = byId("merchant"),
		webNav = byId("webNav"),
		banner = byId("banner"),
		subset1 = byId("subset1"),
		subset2 = byId("subset2"),
		subset3 = byId("subset3"),
		subset4 = byId("subset4"),
		subset5 = byId("subset5");
	// 鼠标滑过显示我的淘宝二级子菜单,离开隐藏
	myTB.onmouseover = function() {
		myTB.className = "Hover";
		subset1.style.display = "block";
	}
	myTB.onmouseout = function() {
		subset1.style.display = "none";
		myTB.className = "myTB";
	}
	// 鼠标经过子菜单,子菜单不隐藏,离开隐藏,且主菜单有相应的样式
	subset1.onmouseover = function() {
		subset1.style.display = "block";
		myTB.className = "Hover";
	}
	subset1.onmouseout = function() {
		subset1.style.display = "none";
		myTB.className = "myTB";
	}

	// 鼠标滑过显示收藏夹二级子菜单,离开隐藏
	myCollect.onmouseover = function() {
		myCollect.className = "Hover";
		subset2.style.display = "block";
	}
	myCollect.onmouseout = function() {
		subset2.style.display = "none";
		myCollect.className = "myCollect";
	}
	// 鼠标经过子菜单,子菜单不隐藏,离开隐藏,且主菜单有相应的样式
	subset2.onmouseover = function() {
		subset2.style.display = "block";
		myCollect.className = "Hover";
	}
	subset2.onmouseout = function() {
		subset2.style.display = "none";
		myCollect.className = "myCollect";
	}

	// 鼠标滑过显示手机版二维码,离开隐藏
	phone.onmouseover = function() {
		phone.className = "Hover";
		subset3.style.display = "block";
	}
	phone.onmouseout = function() {
		subset3.style.display = "none";
		phone.className = "phone";
	}
	// 鼠标经过子菜单,子菜单不隐藏,离开隐藏,且主菜单有相应的样式
	subset3.onmouseover = function() {
		subset3.style.display = "block";
		phone.className = "Hover";
	}
	subset3.onmouseout = function() {
		subset3.style.display = "none";
		phone.className = "phone";
	}

	// 鼠标滑过显示商家支持二级子菜单,离开隐藏
	merchant.onmouseover = function() {
		merchant.className = "Hover";
		subset4.style.display = "block";
	}
	merchant.onmouseout = function() {
		subset4.style.display = "none";
		merchant.className = "merchant";
	}
	// 鼠标经过子菜单,子菜单不隐藏,离开隐藏,且主菜单有相应的样式
	subset4.onmouseover = function() {
		subset4.style.display = "block";
		merchant.className = "Hover";
	}
	subset4.onmouseout = function() {
		subset4.style.display = "none";
		merchant.className = "merchant";
	}

	// 鼠标滑过显示网站导航二级子菜单,离开隐藏
	webNav.onmouseover = function() {
		webNav.className = "Hover";
		subset5.style.display = "block";
	}
	webNav.onmouseout = function() {
		subset5.style.display = "none";
		webNav.className = "webNav";
	}
	// 鼠标经过子菜单,子菜单不隐藏,离开隐藏,且主菜单有相应的样式
	subset5.onmouseover = function() {
		subset5.style.display = "block";
		webNav.className = "Hover";
	}
	subset5.onmouseout = function() {
		subset5.style.display = "none";
		webNav.className = "webNav";
	}

	// 鼠标经过时显示上一张 下一张
	banner.onmouseover = function() {
		next.style.display = prev.style.display = "block";
	}
	next.onmouseover = prev.onmouseover = function() {
		next.style.display = prev.style.display = "block";
	}
	// 鼠标离开时隐藏上一张 下一张
	banner.onmouseout = function() {
		next.style.display = prev.style.display = "none";
	}
	next.onmouseout = prev.onmouseout = function() {
		next.style.display = prev.style.display = "none";
	}
}
showMenu();

// 切换图片
function changImg() {
	// 遍历banner下所有的div以及dots下的所有的span，将其隐藏
	for(var i = 0; i < len; i++) {
		pics[i].style.display = "none";
		dots[i].className = "none";
	}
	// 根据 index 索引找到当前的 div 以及当前的 dots 将其显示
	pics[index].style.display = "block";
	dots[index].className = "active";
	// console.log(index);
}

// 轮播图
function slideImg() {
	let main = byId("main"),
		prev = byId("prev"),
		next = byId("next");

	// 滑过清除定时器，离开继续
	main.onmouseover = function() {
		// 清除定时器
		if(timer) {
			clearInterval(timer);
		}
	}

	main.onmouseout = function() {
		// 启用定时器
		timer = setInterval(function() {
			index++;
			if(index >= len) {
				index = 0;
			}
			// console.log(index);
			// 调用切换图片函数实现每个一定时间banner图片的轮播
			changImg();
		}, 5000);
	}
	// 自动在 main 上触发鼠标离开的事件,让图片直接轮播,不用进行滑过离开就可触发
	main.onmouseout();
	
	
	// 点击圆点切换图片（写在这里是为了刚进入页面就可以直接点击）
	// 遍历所有的圆点，并且绑定单击事件，点击圆点时可以实现图片切换
	for(var i = 0; i < len; i++) {
		// 给所有的 span 添加id 值为 i，作为当前的span索引
		dots[i].id = i;
		dots[i].onclick = function() {
			// alert("111")
			// 改变index为当前的span的id值
			index = this.id;

			// 调用切换图片的函数进行图片的切换
			changImg();
		}
	}
	// 上一张 按钮
	prev.onclick = function() {
		// 当前图片的索引为 index 让index-- 翻滚到前一张
		// 由于 index不能为负数，所以在index索引为0 以后让index值强制变成轮播图片的最后一张，也就是轮播图片的长度-1
		index--;
		if(index < 0) {
			index = len - 1;
		}
		changImg();
	}
	// 下一张 按钮
	next.onclick = function() {
		// 同上 由于index 最大值只能是轮播图片的最大长度-1 所以当index变为最大值以后需要强制变成0，变回第一张
		index++;
		if(index >= len) {
			index = 0;
		}
		changImg();
	}
}
slideImg();