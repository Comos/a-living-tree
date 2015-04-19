define(function(require) {
var TextScene = require('TextScene'),
	ZbDemoScene = require('ZbDemoScene'),
	QScene = require('QScene');

return cc.Layer.extend({
	ctor: function() {
		this._super();
		var normal = new cc.Sprite('res/CloseNormal.png');
		var selected = new cc.Sprite('res/CloseSelected.png');
		var menuItem = new cc.MenuItemSprite(
			normal,
			selected,
			this._menuItemHandler,
			this
		);
		menuItem.x = 200;
		menuItem.y = 100;
		var menu = new cc.Menu(menuItem);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu);
	},
	_menuItemHandler: function(sender) {
		//zs = new TextScene();
		cc.director.runScene(new cc.TransitionFade(1.2, new TextScene()));
		cc.log('menu item clicked');
		//zs.scheduleOnce(zs.changeScene, 5);
	}
});
});