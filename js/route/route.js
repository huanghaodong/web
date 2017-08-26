define(['modules/app'],function(app){
	//定义路由
	function route(){
		//获取哈希 #list/type/1
		var hash = location.hash;
		//#list/type/1 	=>	['list','type','1']
		hash = hash.replace(/^#(\/)?/,'').split('/');
		//定义map对象来适配可以直接使用的哈希
		var map = {
			home : true,
			list : true,
			producte : true,
			news : true,
			account : true
		}
		//适配成功，直接将hash设为视图变量
		if(map[hash[0]]){
			app.view = hash[0]
		//适配失败，将视图变量设为默认'home'
		}else{
			app.view = 'home'
		}
		// 保存路由参数 ['type', '1']
		app.query = hash.slice(1);
	}
	//路由改变时，调用route方法切换组件
	window.addEventListener('hashchange',route);
	//页面加载完成时，调用route方法组件
	//window.addEventListener('load',route);

	return route;
})