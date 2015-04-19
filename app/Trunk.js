define(function(require) {
	var Config = require('Config');
	var Branch = require('Branch');

	return cc.Sprite.extend({
		_length: 0,
		_width: 0,

		ctor: function(length, width) {
			this._super();
			this._length = length;
			this._width = width;
			var size = cc.winSize;
			this.setPosition(size.width/2, 0);
			var drawNode = new cc.DrawNode();
			drawNode.drawSegment(cc.p(0, 0), cc.p(this._length, 0), this._width, cc.color(255,255,255));
			this.addChild(drawNode);
			this.rotationX = -90;
		},
		grow: function() {
			var left = new Branch(cc.p(this._length, 0), this._length, this._width, -1);
			var right = new Branch(cc.p(this._length, 0), this._length, this._width, 1);
			this.addChild(left);
			this.addChild(right);
			left.grow();
			right.grow();
		}
	});
});