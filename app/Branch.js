define(function(require) {
	var Config = require('Config');
	var Branch = cc.Sprite.extend({
		_length: 0,
		_width: 0,
		_growingPoint: null,
		_direction: 1,

		ctor: function(growingPoint, length, width, direction) {
			this._super();
			this._growingPoint = growingPoint;
			this._length = length * (Config.RATIO_RANGE.MIN + (Config.RATIO_RANGE.MAX - Config.RATIO_RANGE.MIN) * Math.random());
			this._width = this._length < 50 ? 1 : Math.max(1, width * Config.WIDTH_RATIO);
			this._direction = direction;
			this.setPosition(this._growingPoint);
			var drawNode = new cc.DrawNode();
			var color = length < 20 ? cc.color(255,100+155*Math.random(),155*Math.random()) : cc.color(255,255,255);
			drawNode.drawSegment(cc.p(0,0), cc.p(this._length, 0), this._width, color);
			this.rotationX = (20 + Math.random() * 40) * this._direction;
			this.addChild(drawNode);
		},		
		grow: function() {
			var branchNum = Math.round(Math.random() * 3) + 1,
				left,
				right;
			for (var i=0; i<branchNum; i++) {
				 left = new Branch(cc.p(this._length, 0), this._length, this._width, -1);
				 right = new Branch(cc.p(this._length, 0), this._length, this._width, 1);
				this.addChild(left);
				this.addChild(right);			
				if (this._length > 20) {
					left.scheduleOnce(left.grow, 1);
					right.scheduleOnce(right.grow, 1);
				}
			}
		}
	});

	return Branch;
});