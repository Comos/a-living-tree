define(function(require) {
	var TreeAxis = require('models/TreeAxis');

	return TreeAxis.extend({		
		_isRoot: true,		
		_worldAngle: 90,

		ctor: function(basePoint, maxLength) {			
			this._super(basePoint, 0, maxLength);			
		},
		getBasePoint: function() {
			return this._rootPoint;
		},
		getEndPoint: function() {
			return Vector.add(this._rootPoint, new Vector(0, this._length));
		}
	});
});