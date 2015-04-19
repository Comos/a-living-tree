define(function(require) {
return cc.Sprite.extend({
	ctor: function() {
		this._super();
		var drawNode = new cc.DrawNode();
		this.addChild(drawNode);
		drawNode.drawRect(
			cc.p(0, 0), cc.p(200, 100),
			cc.color(255,255,255,0),
			2
		);
		cc.eventManager.addListener({
			event: cc.EventListener.MOUSE,
			target: this,
			onMouseDown: this._onMouseDown
		}, this);
	},
	_onMouseDown: function(event) {
		console.log(this.target.getContentSize());
	}
});
});