define(['lib/vue','util/util','filter/filter','css!./home.css'],function (Vue,Util,filter){

	//home组件
	var Home = Vue.extend({
		template : Util.tpl('tpl_home'),
		//组件中的数据必须以函数的形式返回
		data : function(){
			return {
				list: [
					{id: 1, title: '美食', url: '01.png'},
					{id: 2, title: '电影', url: '02.png'},
					{id: 3, title: '酒店', url: '03.png'},
					{id: 4, title: '休闲娱乐', url: '04.png'},
					{id: 5, title: '外卖', url: '05.png'},
					{id: 6, title: 'KTV', url: '06.png'},
					{id: 7, title: '周边游', url: '07.png'},
					{id: 8, title: '丽人', url: '08.png'},
					{id: 9, title: '小吃快餐', url: '09.png'},
					{id: 10, title: '火车票', url: '10.png'}
				],
				ad : [],
				items : [],
				news : [],
				deviceWidth : $(window).width(),
				num : 2
			}
		},
		//组件生命周期
		//在组件创建完成后(create)再发送请求 
		created : function(){
			var that = this;
			Util.ajax('data/home.json',function(res){
				if(res && res.errno === 0){
					that.ad = res.data.ad;
					that.items = res.data.list;
					that.news = res.data.news;
				}
			})
		},
		ready : function(){
				var that = this;
				var num = this.num;
				//banner的计时器
				setInterval(function(){
					num = ++num>2 ? 0 : num;
					that.bannerMove(num);
					that.newsMove(num);
				},2000)
		},
		methods : {
			bannerMove : function(num){
				var that = this;
				var box = $(this.$el);
				box.find('.ad li').eq(num).css('left',that.deviceWidth+'px');
				box.find('.ad').animate({'left' : -that.deviceWidth + 'px'},500,function(){
					box.find('.ad').css('left', 0);
					box.find('.ad li').eq(num).css({'left':0,'zIndex':1}).siblings().css('zIndex',0);
					box.find('.cir-box span').eq(num).css('background','rgba(0,0,0,.8)').siblings().css('background','rgba(255,255,255,.8)')
				})
			},
			newsMove : function(num){
				var box = $(this.$el);
				box.find('.news-box li').eq(num).css('top','50px');
				box.find('.news-box ul').animate({'top':'-50px'},500,function(){
					box.find('.news-box ul').css('top', 0);
					box.find('.news-box li').eq(num).css({'top':0,'zIndex':1}).siblings().css('zIndex',0);
				})
			}
		}
	})
	//注册组件
	Vue.component('home',Home);
})