define(function(require) {
	var Node = require('models/Node');
	var Vector = require('lang/Vector');
	var math = require('util/math');
	var LeafColor = require('models/LeafColor');
	var Leaf = Node.extend({
		_pos: 1,
		_angle: 0,
		_length: 0,
		_maxLength: 0,
		_locked: false,
		_isDied: false,

		ctor: function(pos) {
			this._super();
			this._pos = pos;
			this._maxLength = math.random(10, 10);	
			this._angle = (math.random() > 0.5 ? -1 : 1) * math.random(30, 60);		
		},
		update: function() {
			if (this._isDied) {
				return false;
			}
			this._super();
			this._length = this._maxLength * Math.log(this._age/300+1);
			var lc = new LeafColor();
			this._color = lc.getColor(this.getLivingDays());
			var livingDays = this.getLivingDays();
			if (livingDays > 180) {
				var diedProperbility;
					
				diedProperbility = 1;
				this._isDied = math.random() < diedProperbility ? true : false;
			}			
			//this._color = cc.color(0, 255 - 30 * Math.log((this._age-1)/100 + 1) , 0);
		},
		isDied: function() {
			return this._isDied;
		},
		render: function(renderer) {this._getPloyVects(renderer)
			this._getPloyVects(renderer)
			renderer.drawPoly(this._getPloyVects(renderer), this._color, 1, cc.color(0,0,0));
		},
		lock: function() {
			this._locked = true;
		},
		_getPloyVects: function(renderer) {
			var p1,
				p2,
				p3,
				p4,								
				worldAngle = this.getParent().getWorldAngle(),				
				basePoint = this.getBasePoint(),
				normalizedVect = new Vector(1, 0),
				transformVect,
				offset = this.getParent().getWidth()/2;

			
			normalizedVect.rotate(-worldAngle);
			offsetVect = normalizedVect.clone();
			offsetVect.rotate(this._angle>0 ? 90 : -90);
			offsetVect.mult(offset);

			p1 = Vector.add(basePoint, offsetVect);
			transformVect = normalizedVect.clone();
			transformVect.rotate(this._angle);
			transformVect.rotate(-30);
			transformVect.mult(this._length);
			//renderer.drawDot(p1.toCCPoint(), 1, this._angle > 0 ? cc.color(255,0,0) : cc.color(0,0,255))		
	
			p2 = Vector.add(p1, transformVect);
			transformVect.rotate(60);
			p3 = Vector.add(p2, transformVect);
			transformVect.rotate(120);
			p4 = Vector.add(p3, transformVect);
	
			return [p1, p2, p3, p4];
		},
		getBasePoint: function() {
			var basePoint = this._parent.getBasePoint(),
				endPoint = this._parent.getEndPoint(),
				vector = Vector.sub(endPoint, basePoint);

			vector.mult(this._pos);
			vector.add(basePoint);

			return vector;
		},
		setParent: function(parent) {
			var worldAngle;
			this._parent = parent;
			//worldAngle = parent.getWorldAngle();
			//this._angle = worldAngle < 90 ? math.random(20, 30) : math.random(150, 160);
		},
		getParent: function() {
			return this._parent;
		}
	});

	return Leaf;
});