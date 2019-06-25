// 封装一个代替getElementById()的方法,方便简写
function byId(id) {
	return typeof(id) === "string" ? document.getElementById(id) : id;
}
// 定义全局变量 index 为了遍历轮播图中的div,以及后面的圆点
// 定义 timer 为了定时
// 定义 pics 获取 banner 下所有的图片
// 定义 picLen 获取共有多少张图片
// 定义 prev next 绑定点击事件 上一张 下一张切换 
var index = 0,
	timer = null,
	main = byId("main"),
	pics = byId("banner").getElementsByTagName("div"),
	dots = byId("dots").getElementsByTagName("span"),
	picLen = pics.length;
// 点击 X 关闭左侧导航子菜单
var close = byId("close");

close.onclick = function(){
	var subset = byId("subset");
	subset.style.visibility = "hidden";
	
	// subset.className = "subset";
}

// 遍历得到左侧导航栏里面的每一个 X 的ID
// var len = main.getElementsByClassName("close").length;
// // console.log(len)
// for (var i = 0; i < len; i++) {
// 	index++;
// 	console.log(index);
// }




// 切换图片
function changImg() {
	// 遍历banner下所有的div以及dots下的所有的span，将其隐藏
	for(var i = 0; i < picLen; i++) {
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
	let prev = byId("prev"),
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
			if(index >= picLen) {
				index = 0;
			}
			// console.log(index);
			// 调用切换图片函数实现每个一定时间banner图片的轮播
			changImg();
		}, 3000);
	}
	// 自动在 main 上触发鼠标离开的事件,让图片直接轮播,不用进行滑过离开就可触发
	main.onmouseout();

	// 点击圆点切换图片（写在这里是为了刚进入页面就可以直接点击）
	// 遍历所有的圆点，并且绑定单击事件，点击圆点时可以实现图片切换
	for(var i = 0; i < picLen; i++) {
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
			index = picLen - 1;
		}
		changImg();
	}
	// 下一张 按钮
	next.onclick = function() {
		// 同上 由于index 最大值只能是轮播图片的最大长度-1 所以当index变为最大值以后需要强制变成0，变回第一张
		index++;
		if(index >= picLen) {
			index = 0;
		}
		changImg();
	}
}
slideImg();