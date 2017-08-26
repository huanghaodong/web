define(['lib/vue'],function (Vue){
	//自定义过滤器
	Vue.filter('priceFilter',function(str){
		return str + '元';
	})
	Vue.filter('orignPriceFilter',function(str){
		return '原价 ' + str + '元';
	})
	Vue.filter('salesFilter',function(str){
		return '销量 ' + str;
	})
})