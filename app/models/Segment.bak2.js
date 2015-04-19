define(function(require) {
	var Node = require('models/Node');
	var math = require('util/math');
	
	var Segment = Node.extend({
		_width: 1,
		_length: 1,
		_maxLength: 0,
		_angle: 0,
		_worldAngle: 0,										
		_basePoint: null,
		_endPoint: null,

		ctor: function(basePoint, angle, maxLength, bornTime) {
			this._super(bornTime);
			this._basePoint = basePoint;
			this._endPoint = basePoint.clone();
			this._angle = angle;
			this._maxLength = maxLength;			
		},
		update: function() {
			var growthVector;				

			if (this._length >= this._maxLength) {
				return false;				
			}
			this._length += 1;
			growthVector = new Vector(this._length * math.cos(this._worldAngle), this._length * math.sin(this._worldAngle));
			this._endPoint.add(growthVector);

			return true;
		},
		readyForBranching: function() {						
			if (this.isApex() && this._branchSegments.length < 2 && (this.countSegmentsOfAxis() < 10 / (2*this._axisOrder + 1)) && this._maxLength > 5 && this._length > math.random(this._maxLength/2, this._maxLength)) {
				return true;
			}
			return false;
		},
		addSegment: function(segment) {
			if (this._branchSegments.length == 0) {
				segment.setAxisOrder(this._axisOrder);
				segment.isStraight = true;
			} else {
				segment.setAxisOrder(this._axisOrder+1);
			}
			this._branchSegments.push(segment);
			segment.setParent(this);
			segment.updateWorldAngle();
		},
		branch: function() {
			var angle = math.random(30, 60),
				direction = 1,
				branches = this._branchSegments,
				straightSegment,
				lastSegment,
				lateralSegment;				

			straightSegment = new Segment(math.random(-10,10), this._maxLength);			
			this.addSegment(straightSegment);

			if (math.random() < 0.2) {
				return;
			}
			var parent = this.getParent();
			while (parent) {
				var prevLateralSegment = parent.getLateralSegment();
				if (prevLateralSegment) {
					lastSegment = prevLateralSegment;
					break;
				}
				parent = parent.getParent();
				console.log(parent);
			}

			lastSegment = lastSegment || branches[branches.length-1];
			direction = lastSegment.getAngle() > 0 ? -1 : 1;
			angle *= direction;
			lateralSegment = new Segment(angle, 2/3*this._maxLength);
			this.addSegment(lateralSegment);
		},
		setParent: function(parent) {
			this._parent = parent;	
			this._updateWorldAngle();				
		},
		getParent: function() {
			return this._parent;
		},		
		getAngle: function() {
			return this._angle;
		},
		getWorldAngle: function() {
			return this._worldAngle;
		},
		_updateWorldAngle: function() {
			if (this._parent) {
				this._worldAngle = this._parent.getWorldAngle() - this._angle;
			}
		},
		getLength: function() {
			return this._length;
		},
		setAxisOrder: function(axisOrder) {
			this._axisOrder = axisOrder;
		},
		getAxisOrder: function() {
			return this._axisOrder;
		},
		getLateralSegment: function() {
			var len = this._branchSegments.length;
			if (len > 1) {
				return this._branchSegments[len-1];
			}

			return null;
		},
		isRoot: function() {
			return this._isRoot;
		},
		render: function(renderer) {
			var start = this._basePoint.toCCPoint();
			var end = this._endPoint.toCCPoint();								
			
			renderer.drawSegment(start, end, this._width, cc.color(255,255,255));			
		},
		countSegmentsOfAxis: function() {
			var count = 1,				
				parent = this.getParent();

			while (parent && parent.getAxisOrder() == this._axisOrder) {
				count++;
				parent = parent.getParent();
			}

			return count;
		},
		getBasePoint: function() {
			return this._basePoint;
		},
		getEndPoint: function() {
			return this._endPoint;
		}
	});

	return Segment;
});