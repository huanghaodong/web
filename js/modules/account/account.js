define(['lib/vue','util/util','filter/filter','css!./account.css', 'css!../../../css/yahoo.css'],function (Vue,Util,filter){
	var Account = Vue.extend({
		template : Util.tpl('tpl_account'),
		data : function(){
			return {
				data:{},
				size : 0,
				proNum:0,
				colorid:0,
				src:"",
				payImg :["01.png","02.png","03.png","04.png","05.png","06.png","07.png","08.png","09.png","10.png"]
			}
		},
		created : function(){
			this.$dispatch('headerStyle','list-header')
			this.$dispatch('loginStatus',false)
			var that = this;
			var arr = this.$parent.query;
			this.proId = arr[0];
			this.size = arr[1];
			this.proNum = +arr[3];
			this.colorid = +arr[2];
			url = "data/account.json"+"?id="+this.proId;
			Util.ajax(url,function(res){
				if(res && res.errno === 0){
					that.data = res.data;
					that.src = res.data.img[that.colorid].src;
				}
			})
		},
		methods : {
			addBorder : function(e){
			$(e.target).css("border","2px solid #000").parent().siblings().find('img').css('border','none')
			}
		}
	})
	//注册组件
	Vue.component('account',Account);
})