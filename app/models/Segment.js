define(function(require) {
	var Node = require('models/Node');
	var math = require('util/math');
	var Leaf = require('models/Leaf');
	
	var Segment = Node.extend({
		_width: 0.1,
		_length: 1,
		_maxLength: 0,
		_angle: 0,	
		_worldAngle: 0,	
		_branchSegments: null,			
		_parent: null,
		_isRoot: false,			
		_endPoint: null,
		isStraight: false,
		_axisOrder: 0,
		_leafs: null,
		_segmentOrder: 1,
		_leafingLocked: false,

		ctor: function(angle, maxLength, bornTime) {
			this._super(bornTime);			
			this._angle = angle;
			this._maxLength = maxLength;		
			this._branchSegments = [];
			this._leafs = [];
		},
		update: function() {			
			var changed = false;
			if (this._stopped) {
				return false;
			}
			this._super();
			
			if (this._length < this._maxLength) {
				this._length = this._maxLength * Math.log(this._age/100 + 1);	
				changed = true;
			}
								
			var segmentsCount = this.countSegmentsOfAxis();
			//this._width *= (1 + 1/1000*(Math.log(this._age) + 2 + this._axisOrder));
			this._width = (this._maxLength - segmentsCount - this._axisOrder) / 3 * Math.log(this._age/1000 + 1) / (this._axisOrder + 1);

			if (this._branchSegments.length > 0) {
				this._branchSegments.forEach(function(branch) {
					changed = branch.update() || changed;
				});
			}
			if (this._leafs.length > 0) {
				for (var len=this._leafs.length,i=len-1; i>=0; i--) {
					if (this._leafs[i].isDied()) {
						this._leafs.splice(i, 1);
						len--;
					} else {
						this._leafs[i].update();
					}
				}
				/*
				this._leafs.forEach(function(leaf, i) {
					if (leaf.isDied()) {

					} else {
						leaf.update();	
					}
				});*/
			}
			if (this.readyForBranching()) {
				this.branch();
				changed = true;
			}
			if (this.readyForLeafing()) {				
				this.leafing();
				changed = true;
			}

			return changed;
		},
		readyForBranching: function() {
			var branchOrder = this.getBranchOrderOfAxis(),
				segmentsCount = this.countSegmentsOfAxis(),
				offset = this._segmentOrder - this._axisOrder;
				//maxSegmentsCount = 10 * Math.log(this._age+1)/(2 * this._segmentOrder + this._axisOrder) ;
				//maxSegmentsCount = 40 / ((offset > 0 ? 5*offset : 1));
				maxSegmentsCount = 40 / (Math.pow(this._segmentOrder/10, 2) + Math.pow(1.3, branchOrder));						

			if (this.isApex() && this._width > 0.3 && this._branchSegments.length < 3 && segmentsCount < maxSegmentsCount && this._maxLength > 10 && this._length > math.random(this._maxLength/2, this._maxLength)) {
				return true;
			}
			return false;
		},
		readyForLeafing: function() {			
			if (this._axisOrder > 0 && this.countSegmentsOfAxis() > 1 && this._length > 5 && this._leafs.length < this._length / 20) {
				return true;
			}

			return false;
		},
		leafing: function() {			
			if (math.random() < 1/(this._leafs.length+1)) {
				this.addLeaf(new Leaf(math.random()));
			}
		},
		addSegment: function(segment) {
			if (this._branchSegments.length == 0) {
				segment.setAxisOrder(this._axisOrder);
				segment.setSegmentOrder(this._segmentOrder+1);
				segment.isStraight = true;
			} else {
				segment.setAxisOrder(this._axisOrder+1);
				segment.setSegmentOrder(1);
			}
			if (this._leafingLocked) {
				segment.lockLeafing();
			}
			this._branchSegments.push(segment);
			segment.setParent(this);
			segment.updateWorldAngle();
		},
		addLeaf: function(leaf) {
			this._leafs.push(leaf);
			leaf.setParent(this);
		},
		branch: function() {
			var angle = math.random(30, 60),
				direction = 1,
				branches = this._branchSegments,
				straightSegment,
				lastSegment,
				lateralSegment,
				straightSegmentAngle = math.random(-10, 10);			

			if (this._axisOrder == 0) {													
				if (this._worldAngle < 60 || this._worldAngle > 120) {
					straightSegmentAngle = math.random(20, 30);
					straightSegmentAngle *= (this._worldAngle < 90 ? -1 : 1);								
				}				
			}

			straightSegment = new Segment(straightSegmentAngle, this._maxLength);			
			this.addSegment(straightSegment);

			if (math.random() < 0.2 || (this._axisOrder == 0 && this.countSegmentsOfAxis() < 2) || this._maxLength < 10) {
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
			}

			lastSegment = lastSegment || branches[branches.length-1];
			direction = lastSegment.getAngle() > 0 ? -1 : 1;
			angle *= direction;
			lateralSegment = new Segment(angle, this._maxLength / (this._axisOrder/3 + 1));
			this.addSegment(lateralSegment);
		},
		setParent: function(parent) {
			this._parent = parent;
		},
		getParent: function() {
			return this._parent;
		},
		isApex: function() {
			return this._branchSegments.length == 0;
		},
		getAngle: function() {
			return this._angle;
		},
		getWorldAngle: function() {
			return this._worldAngle;
		},
		updateWorldAngle: function() {			
			if (this._parent) {
				this._worldAngle = (this._parent.getWorldAngle() - this._angle)%360;				
			}
		},
		setAxisOrder: function(axisOrder) {
			this._axisOrder = axisOrder;
		},
		getAxisOrder: function() {
			return this._axisOrder;
		},
		setSegmentOrder: function(order) {
			this._segmentOrder = order;
		},
		getSegmentOrder: function() {
			return this._segmentOrder;
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
			var start = this.getBasePoint().toCCPoint();
			var end = this.getEndPoint().toCCPoint();
			var color = cc.color(50, 50, 35);			
			
			if (this.isStraight) {
				//renderer.drawDot(start, 2, cc.color(255,50,50));													
			}
			
			renderer.drawSegment(start, end, this._width, color);
			if (this._branchSegments.length > 0) {
				this._branchSegments.forEach(function(branch) {
					branch.render(renderer);
				});
			}

			if (this._leafs.length > 0) {
				this._leafs.forEach(function(leaf){
					leaf.render(renderer);
				})
			}			
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
		getBranchOrderOfAxis: function() {
			var axisBaseSegment = this.getAxisBaseSegment(),
				baseSegmentAxisOrder = axisBaseSegment.getAxisOrder(),
				order = 1,
				parent = axisBaseSegment.getParent();

			while (parent && parent.getAxisOrder() == baseSegmentAxisOrder && parent.getLateralSegment()) {
				order++;
				parent = parent.getParent();
			}

			return order;
		},
		getAxisBaseSegment: function() {
			var parent = this.getParent();

			while (parent) {
				if (parent.getAxisOrder() != this._axisOrder || parent.isRoot()) {
					return parent;
				}
				parent = parent.getParent();
			}

			return null;
		},
		getBasePoint: function() {
			return this.getParent().getEndPoint();
		},
		getEndPoint: function() {
			var basePoint = this.getBasePoint(),
				angle = this._worldAngle,				
				branchVector = new Vector(math.cos(angle) * this._length, math.sin(angle)*this._length);
						
			return Vector.add(basePoint, branchVector);

		},
		getWidth: function() {
			return this._width;
		},
		lockLeafing: function() {
			this._leafingLocked = true;
			this._leafs.forEach(function(leaf) {
				leaf.lock();
			});
			this._branchSegments.forEach(function(segment) {
				segment.lockLeafing();
			});
		},
		isLeafingLocked: function() {
			return this._leafingLocked;
		}
	});

	return Segment;
});