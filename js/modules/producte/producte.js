define(['lib/vue','util/util','filter/filter','css!./producte.css', 'css!../../../css/yahoo.css'],function (Vue,Util,filter){

	//Producte组件
	var Producte = Vue.extend({
		template : Util.tpl('tpl_producte'),
		data : function(){
			return {
				data :{},
				useItem : {},
				//按下的位置
				startX : 0,
				//滑动的位置
				ingX : 0,
				//松开的位置
				endX : 0,
				//图片s索引
				num : 0,
				deviceWidth : $(window).width(),
				//节流锁
				lock : true,
				//购买商品数量
				proNum : 1,
				//购买商品的颜色
				proColor:'',
				//购买商品的尺码
				proSize:'',
				//商品id
				proId:0,
			}
		},
		created : function(){
			this.$dispatch('headerStyle','list-header')
			this.$dispatch('inputStatus',false)
			var that = this;
			var query = this.$parent.query;
			var url = 'data/product.json';
			if(query[0] !== undefined){
				url += '?id'+ '=' + query[0];
			}
			Util.ajax(url,function(res){
				if(res && res.errno === 0){
					//默认加载出来三条数据
					that.data = res.data;
					that.useItem = res.data.goods[0];
					that.proId = res.data.id;
				}
			})
		},
		methods : {
			pleaseLogin : function(){
				if(this.$parent.showLogin){
					alert('请先登录')
					return;
				}
				//没有选择商品颜色、尺寸或者数量就点击购买
				if((this.proNum === '' || this.proColor === '' || this.proSize === '')){
					$(this.$el).find('.tips').show();
					return;
				}
				var url = "#account/"+this.proId+"/"+this.proSize+"/"+this.proColor+"/"+this.proNum;
				
				location.href= url ;
				
			},
			startTouch : function(e){
				this.startX = e.changedTouches[0].clientX;
			},
			moveTouch : function(e){
				if(!this.lock) return;
				
				var instance = e.changedTouches[0].clientX - this.startX;
				//向右滑
				if(instance>0){
					var shortNum = this.num-1 < 0 ? 4 : this.num-1 ;
					$(this.$el).find('.img ul li').eq(shortNum).css({'left':-this.deviceWidth+'px','opacity':1});
					$(this.$el).find('.img ul').css('left',instance + 'px');
				//向左滑
				}else{
					var shortNum = this.num+1 > 4 ? 0 : this.num+1 ;
					$(this.$el).find('.img ul li').eq(shortNum).css({'left':this.deviceWidth+'px','opacity':1});
					$(this.$el).find('.img ul').css('left',instance + 'px');
				}
				
				
			},
			endTouch : function(e){

				if(e.changedTouches[0].clientX - this.startX > 80){
					this.num = --this.num < 0 ? 4 : this.num ;
					this.move(this.num);
				}else if(e.changedTouches[0].clientX - this.startX < -80){
					this.num = ++this.num > 4 ? 0 : this.num ;
					this.move(this.num,true);
				}else{
					this.comeBack()
				}
			},
			//定义大图ul动一格的方法
			/*
			*num表示图片索引值
			*如果left为true向左滑，否则向右滑动
			*
			***/
			move : function(num,left){
				if(!this.lock) return;
				this.lock = false;
				var i = left? 1 : -1;
				var that = this;
				var box = $(this.$el);
				this.circlesMethods(num)
				box.find('.img ul').animate({'left' : -i*that.deviceWidth + 'px'},500,"ease-out",function(){
				box.find('.img ul').css('left', 0);
				box.find('.img ul li').eq(num).css({'left':0,'opacity':1}).siblings().css('opacity',0);
					//开锁
					that.lock = true;
				})
			},
			//移动距离不足，回到原处
			comeBack : function (){
				var that = this;
				$(this.$el).find('.img ul').animate({'left':0},500,"ease-out",function(){
					//开锁
					that.lock = true;
				});
				
			},
			//圆点样式方法
			circlesMethods : function(num){
				$(this.$el).find('.circles span').eq(num).css('background','#4A4A4A').siblings().css('background','#D8D8D8')
			},
			//颜色框点击事件方法，根据id选择展示商品图
			chageColor : function(id){
				this.useItem = this.data.goods[id],
				this.proColor = id
			},
			//尺码框点击事件
			addBorder : function(size,$event){
				$($event.target).css({"border":"2px solid red","lineHeight":"26px"}).siblings().css({"border":"1px solid #000","lineHeight":"30px"})
				this.proSize = size;
			},
			addNum : function(){
				this.proNum++;
			},
			subNum : function(){
				this.proNum = --this.proNum<0 ? 0 : this.proNum;
			},
			closeTips : function(){
				$(this.$el).find('.tips').hide();
			}
		}
	})
	//注册组件
	Vue.component('producte',Producte);
})