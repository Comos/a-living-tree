define(function(require) {

return cc.Layer.extend({
	playing: true,
	ctor: function(mainScene) {
		this._super();
		this.mainScene = mainScene;
		var normal = new cc.Sprite(res.pp);
		var selected = new cc.Sprite(res.pp1);
		
		var menuItem = new cc.MenuItemSprite(
			normal,
			selected,
			this.doPP,
			this
		);
		this.menuItem = menuItem;
		menuItem.setScale(0.4, 0.3);
		menuItem.setAnchorPoint(0,0);
		menuItem.setNormalizedPosition(0.8,0.05);
		var menu = new cc.Menu(menuItem);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu);
	},
	doPP:function(sender) {
		if (this.playing) {
			this.mainScene.pauseCB();
		} else {
			this.mainScene.resumeCB();
		}
		this.playing = !this.playing;
	}
});

});