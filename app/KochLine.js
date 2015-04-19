define(function(require) {
var KochLine = cc.Class.extend({
	_start: null,
	_end: null,

	ctor: function(start, end) {
		this._start = start.clone();
		this._end = end.clone();
	},
	
	kochA: function() {
		return this._start.clone(); 
	},
	kochB: function() {
		var v = this._end.clone();
		v.sub(this._start);
		v.div(3);
		v.add(this._start);

		return v;
	},
	kochC: function() {
		var a = this._start.clone();
		var v = this._end.clone();
		v.sub(this._start);
		v.div(3);
		a.add(v);
		v.rotate(-60);
		a.add(v);

		return a;
	},
	kochD: function() {
		var v = this._end.clone();
		v.sub(this._start);
		v.mult(2/3);
		v.add(this._start);
		return v;
	},
	kochE: function() {
		return this._end.clone();
	},

	render: function(context) {
		context.drawSegment(cc.p(this._start.x, this._start.y), cc.p(this._end.x, this._end.y), 1, cc.color(255,255,255));
	}
});

return KochLine;
});