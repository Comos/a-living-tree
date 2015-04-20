define(function(require) {

	var MenuLayer  = cc.Layer.extend({
		ctor: function() {
			this._super();
			var normal = new cc.Sprite(res.go);
			var selected = new cc.Sprite(res.go1);
			var menuItem = new cc.MenuItemSprite(
				normal,
				selected,
				this._menuItemHandler,
				this
			);
			menuItem.setNormalizedPosition(0.73,0.30);
			var menu = new cc.Menu(menuItem);
			menu.x = 0;
			menu.y = 0;
			this.addChild(menu);
		},
		_menuItemHandler: function(sender) {
			var MainScene = require('MainScene');
			cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
			cc.log('menu item clicked');
		}
	});
	
return cc.Scene.extend({
	onEnter: function() {
		this._super();
		var sprite = new cc.Sprite(res.bg_cover);
		sprite.setNormalizedPosition(0.5,0.5);
		sprite.opacity = 0;
		this.addChild(sprite);
		sprite.runAction(
			cc.fadeIn(3)
		);
		
		var label = new cc.LabelTTF('A Living Tree', 'Bauhaus 93', 50);
		label.opacity = 0;
		label.setNormalizedPosition(0.55,0.45);
		this.addChild(label);
		label.runAction(
			cc.spawn(cc.fadeIn(3),cc.moveTo(2.5, cc.p(cc.winSize.width*0.55, cc.winSize.height*0.55)))
		);
		
		var menu = new MenuLayer();
		this.addChild(menu);
		
	},
	changeScene: function() {
		//var ms = new MyScene();
		cc.log("end");
		//cc.director.runScene(ms, 5);
	}
});

});
