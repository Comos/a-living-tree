define(function(require) {
	var math = require('util/math');

	var Vector = cc.Class.extend({
		_x: 0,
		_y: 0,

		ctor: function(x, y) {
			this._x = x;
			this._y = y;
		},
		setX: function(x) {
			this._x = x;
		},
		getX: function() {
			return this._x;
		},
		setY: function(y) {
			this._y = y;
		},
		getY: function() {
			return this._y;
		},
		clone: function() {
			return new Vector(this._x, this._y);
		},
		add: function(vector) {
			this._x += vector.x;
			this._y += vector.y;
		},
		sub: function(vector) {
			this._x -= vector.x;
			this._y -= vector.y;
		},
		mult: function(n) {
			this._x *= n;
			this._y *= n;
		},
		div: function(n) {
			this._x /= n;
			this._y /= n;
		},
		mag: function() {
			return Math.sqrt(this._x*this._x + this._y*this._y);
		},
		rotate: function(theta) {
			var x = this._x,
				y = this._y,			
				sinTheta = math.sin(theta),
				cosTheta = math.cos(theta);

			this._x = x * cosTheta + y * sinTheta;
			this._y = -x * sinTheta + y * cosTheta;
		},
		toCCPoint: function() {
			return cc.p(this._x, this._y);
		}
	});
	Vector.add = function(v1, v2) {
		var v = v1.clone();
		v.add(v2);
		return v;
	};
	Vector.sub = function(v1, v2) {
		var v = v1.clone();
		v.sub(v2)
		return v;
	};
	Vector.mult = function(vector, n) {
		var v = vector.clone();
		v.mult(n);
		return v;
	};
	var _p = Vector.prototype;
	cc.defineGetterSetter(_p, 'x', _p.getX, _p.setX);
	cc.defineGetterSetter(_p, 'y', _p.getY, _p.setY);
	window.Vector = Vector;
	return Vector;
});