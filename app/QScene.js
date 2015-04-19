define(function(require) {

var MyScene = require('MyScene');

return cc.Scene.extend({
	onEnter: function() {
		this._super();
		var sprite = new cc.Sprite();
		sprite.setTextureRect(cc.rect(0,0,150,150));
		sprite.setColor(cc.color(255,25,255));
		sprite.x = 75;
		sprite.y = 75;
		//sprite.setNormalizedPosition(0.5,0.5);
		this.addChild(sprite);
		/*sprite.runAction(
			cc.spawn(cc.moveBy(2.5, cc.p(cc.winSize.width/2, cc.winSize.height/2)))
		);*/
	},
	changeScene: function() {
		//var ms = new MyScene();
		cc.log("end");
		//cc.director.runScene(ms, 5);
	}
});

});
