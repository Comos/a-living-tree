define(function(require) {
	var Segment = require('models/Segment');

	return Segment.extend({
		_angle: 0,
		_worldAngle: 90,
		_basePoint: null,
		_isRoot: true,
		_stopped: false,

		ctor: function(basePoint, maxLength) {
			this._basePoint = basePoint;
			this._super(this._angle, maxLength);
		},
		getBasePoint: function() {
			return this._basePoint;
		},
		getWorldAngle: function() {
			return 90;
		},
		getAxisBaseSegment: function() {
			return this;
		},
		stop: function() {
			this._stopped = true;
		}
	});
});