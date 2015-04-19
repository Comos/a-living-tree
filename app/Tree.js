define(function(require) {
	var math = require('util/math'),
		Vector = require('lang/Vector'),
		Flower = require('Flower');

	var Tree = cc.Class.extend({
		_growPoint: null,
		_maxLength: 0,
		_length: 0,
		_angle: 0,
		_branches: null,
		_flowers: null,
		_isMature: false,
		_isStop: false,

		ctor: function(growPoint, maxLength, angle) {
			this._growPoint = growPoint;
			this._maxLength = maxLength;
			this._angle = angle;
			this._branches = [];
			this._flowers = [];
			this._length = 0;
		},
		
		update: function() {			
			var branch,
				branchPossibility = 0;

			if (this._isStop) {
				return false;
			}

			if (this._length >= this._maxLength) {
				this._isMature = true;
			} else if (this._length > this._maxLength / 2) {
				branchPossibility = 0.2;
				this._length += 1;
			} else {
				this._length += 1;
			}

			if (this._maxLength < 50 || this._branches.length >= Math.round(this._maxLength / 50)) {
				branchPossibility = 0;
			}
			var maxFlowersNum = Math.round(this._length / 10);
			if (this._isMature && this._maxLength < 200 && this._flowers.length < maxFlowersNum) {				
				this.flower();				
			}
			if (this._flowers.length != 0 && this._flowers.length >= maxFlowersNum) {
				this._isStop = true;
			}

			var r = Math.random();
			if (r < branchPossibility) {
				var leftCount = 0,
					rightCount = 0;

				this._branches.forEach(function(b) {
					b._angle < 0 ? ++leftCount : ++rightCount;
				});
				var diff = leftCount - rightCount,
					direction = diff > 0 ? -1 : 1,
					absDiff = Math.abs(diff),
					probability = Math.pow(1/2, absDiff+1),
					r = Math.random();

				var angle = math.random(20, 70);
				if (r < probability) {
					angle = direction * angle;
				} else {
					angle = (-1) * direction * angle;
				}

				branch = new Tree(this.calculateEndPoint(), this._maxLength*3/4, angle);
				this._branches.push(branch);				
			}
			var stop = this._isStop;
			this._branches.forEach(function(b) {
				var ret = b.update() === false ? true : false;
				stop = stop && ret;
			});
			this._isStop = stop;
		},
		
		branch: function() {
			
		},
		flower: function() {
			var growPointLength = this._length * math.random(0.5, 1),
				angle = 90 - this._angle,
				growPoint = new Vector(growPointLength*math.cos(angle), growPointLength*math.sin(angle));
			growPoint.add(this._growPoint);
			this._flowers.push(new Flower(growPoint));
		},

		random: function(min, max) {
			return min + Math.random() * (max - min);
		},

		calculateEndPoint: function() {
			var angle = 90 - this._angle;
			var vec = new Vector(this._length * math.cos(angle), this._length * math.sin(angle));
			vec.add(this._growPoint);

			return cc.p(vec.x, vec.y);
		},		

		render: function(context) {
			var startPoint = cc.p(this._growPoint.x, this._growPoint.y),
				endPoint = this.calculateEndPoint();

			context.drawSegment(startPoint, endPoint, 1, cc.color(255,255,255));
			if (this._branches.length > 0) {
				this._branches.forEach(function(b) {
					b.render(context);
				});
			}

			if (this._flowers.length > 0) {
				this._flowers.forEach(function(f) {
					f.render(context);
				});
			}
		}
	});

	return Tree;
});