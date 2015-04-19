define(function(require) {
	var math = require('util/math'),
		Segment = require('models/Segment');

	var TreeAxis = Segment.extend({
		_base: null,
		_segments: null,
		_axisOrder: 0,
		_subTreeAxises: null,
		_angle: null,
		_worldAngle: null,
		_length: 0,		

		ctor: function(basePoint, angle) {
			this._super(basePoint, angle);
			this._basePoint = basePoint;		
			this._segments = [];
			this._subTreeAxises = [];
		},
		addSegment: function(segment) {
			this._segments.push(segment);
			segment.setParent(this);			
		},
		addTreeAxis: function(treeAxis) {
			this._subTreeAxises.push(treeAxis);
			treeAxis.setParent(this);
			treeAxis.setAxisOrder(this._axisOrder + 1);
		},
		update: function() {
			var segments = this._segments,
				subTreeAxises = this._subTreeAxises,
				changed = false,
				apexSegment;


			if (segments.length == 0) {
				this.addSegment(new Segment(this._basePoint, this._angle));
			}

			segments.forEach(function(segment) {
				changed = segment.update() || changed;
			});	

			if (subTreeAxises.length > 0) {
				subTreeAxises.forEach(function(treeAxis) {
					treeAxis.update();
				});
			}

			apexSegment = this.getApexSegment();
			if (apexSegment.getLength() > 10 && subTreeAxises.length == 0) {							
				this.addTreeAxis(new TreeAxis(apexSegment.getEndPoint(), math.random(-10, 10)));
			}

			return changed;
		},
		getApexSegment: function() {
			return this._segments[this._segments.length - 1];
		},
		render: function(renderer) {
			this._segments.forEach(function(segment) {
				segment.render(renderer);
			});

			this._subTreeAxises.forEach(function(treeAxis) {
				treeAxis.render(renderer);
			});
		}
	});

	return TreeAxis;
});