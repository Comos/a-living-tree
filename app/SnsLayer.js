define(function(require) {

return cc.Layer.extend({
	
	ctor: function() {
		this._super();
		var normal = new cc.Sprite(res.share);
		var selected = new cc.Sprite(res.share1);
		
		var menuItem = new cc.MenuItemSprite(
			normal,
			selected,
			this.doShare,
			this
		);
		this.menuItem = menuItem;
		menuItem.setScale(0.4, 0.3);
		menuItem.setAnchorPoint(0,0);
		menuItem.setNormalizedPosition(0.9,0.05);
		var menu = new cc.Menu(menuItem);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu);
	},
	doShare:function(sender) {
		var  APP_KEY = '2240941861';
		var Weibo = require('util/Weibo');
		var wb = new Weibo(APP_KEY);
		if (wb.isLogged()) {
			wb.share(
				'我的Living Tree收获了种子，欢迎大家都来种。'+ "http://hi-diving.com/index.html?seed=", 
				this.afterShare.bind(this),
				function() {alert("分享失败，请重试。");}
			);
		} else {
			wb.login(this.doShare.bind(this));
		}
	},
	afterShare:function(info) {
		alert("分享成功");
		this.menuItem.visible = false;
	}
});

});