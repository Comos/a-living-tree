define(function(require) {
	var Segment = require('models/Segment');

	return Segment.extend({
		_angle: 0,

		ctor: function(maxLength) {
			this._super(this._angle, maxLength);
		}
	});
});