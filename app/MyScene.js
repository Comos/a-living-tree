define(function(require) {
var MySprite = require('MySprite'),
	MenuLayer = require('MenuLayer'),
	Clock = require('controls/Clock'),
	Vector = require('lang/Vector'),
	RootAxis = require('models/RootSegment'),
	Leaf = require('models/Leaf');

var MyScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		// var sprite = new cc.Sprite();
		// sprite.setTextureRect(cc.rect(50,50,150,150));
		// sprite.setColor(cc.color(255,255,255));
		// sprite.setNormalizedPosition(0.5,0.5);
		// this.addChild(sprite);
		this.addChild(new MenuLayer());
		var clock = Clock.getInstance();
		this._drawer = new cc.DrawNode();
		this.addChild(this._drawer);		
		this._rootAxis = new RootAxis(new Vector(400, 0), 30);
		this.schedule(this.update, 0.01);
		this.schedule(this.render, 0.01);	
		var particleSystem = new cc.ParticleSnow();
		this.addChild(particleSystem);	
		//var leaf = new Leaf(1/3);
		//this._rootAxis.addLeaf(leaf);
	},

	update: function() {
		if (this._rootAxis.getAge() > 1000) {
			//this._rootAxis.stop();
		}
		if (!this._rootAxis.update()) {			
			this.unschedule(this.update);
			this.unschedule(this.render);			
		}	
	},
	render: function() {
		this._drawer.clear();
		this._rootAxis.render(this._drawer);			
	}
});

return MyScene;
});