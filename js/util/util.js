define([],function(){
	//定义工具
	var Util = {
		/**
		 * 根据id获取模板
		 * @id 		模板标签元素的id
		 **/
		tpl : function(id){
			return document.getElementById(id).innerHTML;
			},
		/**
		 * 定义拉去数据的异步请求方法
		 * @url 	请求的路径
		 * @fn 		请求成功时候的回调函数
		 ***/
		ajax : function(url,fn){
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4 && xhr.status === 200){
					var res = JSON.parse(xhr.responseText);
					fn && fn(res) 
				}
			}
			//定义请求
			xhr.open('GET',url,true);
			//发送请求
			xhr.send(null);
		}
	}
	return Util;
})