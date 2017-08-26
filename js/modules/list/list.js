define(['lib/vue','util/util','filter/filter', 'css!./list.css'],function (Vue,Util,filter){
	//list组件
	var List = Vue.extend({
		props : ['abc'],
		template : Util.tpl('tpl_list'),
		data : function(){
			return {
				type : [
					{value: '按价格', key: 'price'},
					{value: '按销量', key: 'sales'},
					{value: '按好评', key: 'evaluate'},
					{value: '按优惠', key: 'discount'},
					{value: '默认', key: 'default'}
				],
				//加载出来的数据数量
				items : [],
				//剩余的数据数量
				other : [],
				//高低框隐藏
				keepItems : []
			}
		},
		created : function(){
			//给父组件传递信息，该子组件需要父组件显示input输入框，所以传个true
			this.$dispatch('inputStatus',true)
			this.$dispatch('headerStyle','list-header')
			var that = this;
			//this.$parent组件获取vue实例化对象，this.$parent是只读的
			var query = this.$parent.query;
			var url = 'data/list.json';
			if(query[0] !== undefined && query[1] !== undefined){
				url += '?' + query[0] + '=' + query[1];
			}
			Util.ajax(url,function(res){
				if(res && res.errno === 0){
					//默认加载出来三条数据
					that.items = res.data.slice(0,3);
					that.other = res.data.slice(3);
					that.keepItems = res.data;
				}
			})
		},
		methods : {
			//排序方法
			sort : function(key,$event){
				var dom = $($event.target);
				var id = $event.target.id;
					if($('.type li').index(dom) == 0){
						dom.find('.down-up').toggle();
					}else if($('.type li').index(dom) == 4){
						var str1 = 'keepItems:';
						this.keepItems.forEach(function(obj,index){
							str1 +=obj.id+' '
						})
						console.log(str1)
						var str2 = 'items:';
						this.items.forEach(function(obj,index){
							str2 +=obj.id+' '
						})
						console.log(str2)
						//一个BUG，第一次this.items = this.keepItems后，之后this.keepItems的值会一直与this值保持一致，不论了this.items怎么变
						//this.items = this.keepItems;
						this.items = [].concat(this.keepItems);
						this.other = [];
					}else if(id){
						this.items.sort(function(a,b){
							if(id == 'to-up'){
								return a['price'] - b['price'];
							}else{
								return b['price'] - a['price'];
							}
						})
					}
					else{
						this.items.sort(function(a,b){
							if(key == 'discount'){
								return (b['orignPrice'] - b['price']) - (a['orignPrice'] - a['price'])
							}
							return b[key] - a[key];
						})
					}
			},
			loadMore : function(){
				this.items = this.items.concat(this.other);
				this.other = [];
			}
		}
	})
	//注册组件
	Vue.component('list',List);
})