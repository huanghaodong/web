define(['lib/vue', 'modules/home/home', 'modules/list/list', 'modules/producte/producte', 'modules/news/news','modules/account/account','css!./app.css'],function (Vue,home,list,producte,news){
	//定义Vue实例化对象
		var app = new Vue({
		el : '#app',
		data : {
			//定义组件变量
			view : '',
			// 定义路由参数变量
			query : [],
			//是否显示输入框
			showInput : true,
			//是否显示登录按钮
			showLogin : true,
			//输入值
			search : '',
			//传递给子组件的值
			searchKey1 : '',
			headerClass : 'home-header',
			deviceWidth : $(window).width(),
			sure : [
				{
					"url": "01.jpg",
					"id": "1"
				},
				{
					"url": "02.jpg",
					"id": "2"
				},
				{
					"url": "03.jpg",
					"id": "3"
				},
				{
					"url": "04.jpg",
					"id": "3"
				}
			],
			//切换显隐密码 false表示隐藏
			changePwd : false,
			//登录了吗
			loginDown : true
		},
		methods : {
			sureEnter : function(){
				this.searchKey1 = this.search;
				//更新searchKey后就清空search
				this.search = '';
			},
			goBack : function(){
				history.go(-1)
				this.showInput = true;
				this.headerClass = 'home-header';
			},
			goLogin : function(){
				var that = this;
				$(this.$el).find('.layer').fadeIn('fast', function() {
					$(this).find('.layer-box').animate({'left':0},300)
				});
			},
			goBackPage : function(){
				var that = this;

				$(this.$el).find('.layer-box').animate({'left':'-90%'},300,function(){
					$(that.$el).find('.layer').fadeOut('fast')
				})
			
			},
			changeSure : function(){
				this.sure.sort(function(a,b){
					return Math.random()>0.5 ? 1 : -1;
				})
			},
			showPwd : function(e){
				if(!this.changePwd){
					$(e.target).animate({'left':'41px'},'fast');
					$(this.$el).find('.pwd div').css('background','red');
					this.changePwd = true;
					//显示密码
					$(this.$el).find('.pwd input').attr('type','text')
				}else{
					$(e.target).animate({'left': 0},'fast');
					$(this.$el).find('.pwd div').css('background','#fff');
					this.changePwd = false;
					//隐藏密码
					$(this.$el).find('.pwd input').attr('type','password')
				}
				
			},
			toTop : function(){
				window.scrollTo(0, 0)
			},
			//点击laye浮层上的登录
			toLogin : function(){
				this.showLogin = false;
				this.goBackPage();
			}
		},
		//处理子组件传递来的数据
		events : {
			inputStatus : function(msg){
				this.showInput = msg;
			},
			headerStyle : function(msg){
				this.headerClass = msg;
			},
			loginStatus : function(msg){
				this.showLogin = msg;
			}
		},
		ready : function(){
			var that = this;
			$(window).on('scroll',function(){
				if($('body').scrollTop()>150){
					$(that.$el).find('.header').css('background','rgba(0,0,0,0.5)')
				}else{
					$(that.$el).find('.header').css('background','rgba(0,0,0,0)')
				}
				if($('body').scrollTop()>300){
					$(that.$el).find('.to-top').show();
				}else{
					$(that.$el).find('.to-top').hide();
				}
			})

		}
	})
	return app;
})