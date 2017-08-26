define(['lib/vue','util/util','filter/filter', 'css!./news.css'],function (Vue,Util,filter){
	//news组件
	var News = Vue.extend({
		template : Util.tpl('tpl_news'),
		data : function(){
			return {
				title : [],
				list : []
			}
		},
		created : function(){
			var that = this;
			this.$dispatch('inputStatus',false)
			var query = this.$parent.query;
			var url = 'data/news.json';
			if(query[0] !== undefined){
				url += '?id'+ '=' + query[0];
			}
			Util.ajax(url,function(res){
				if(res && res.errno === 0){
					that.title = res.data.title;
					that.list = res.data.list
				}
			})
		}
	})
	//注册组件
	Vue.component('news',News);
})