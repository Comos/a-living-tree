define(function(require) {
var math = require('util/math');

var Flower = cc.Class.extend({
	_growPoint: null,
	_color: null,
	_size: 0,

	ctor: function(growPoint) {
		this._growPoint = growPoint;
		this._color = cc.color(math.random(0,255), math.random(0,200), math.random(0,100));
		this._size = math.random(2, 5);
	},
	render: function(context) {
		context.drawDot(cc.p(this._growPoint.x, this._growPoint.y), this._size, this._color);
	}
});

return Flower;
});