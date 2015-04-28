define(function(require) {
	var dateManager = require('DateManager');
	var LeafColor = function(){
		
	};
	LeafColor.prototype = {
		REF_COLORS:[
		  [190, 200, 80],
		  [72,149,16],
		  [47,101,8],
		  [191,79,30],
		  [108,47,22]
		],
		getColor: function(livingDays) {
			var indexes = this._getRefIndexs(livingDays);
			
			if (indexes[0] < 3) {
				var today = dateManager.getCurDate();
				if (today.getMonth()>=11 || today.getMonth()<=1) {
					return cc.color(191,79,30);
				}
			}
			
			var r0 = this.REF_COLORS[indexes[0]];
			var r1 = this.REF_COLORS[indexes[1]];
			var rs = [];
			for (var i=0; i<3; i++) {
				rs[i] = parseInt(r0[i] + (r1[i]-r0[i])*indexes[2]);
			}
			return cc.color(rs[0], rs[1], rs[2]);
		},
		_getRefIndexs:function(livingDays) {
			var data;var isRed = false;
			if (livingDays<30) {
				data = [0,1,(30 - livingDays)/30];
			} else if (livingDays>=30 && livingDays<140) {
				data = [1,2,(140 - livingDays)/(140-30)];
			} else if (livingDays>=140 && livingDays<170) {
				data = [2,3,(170 - livingDays)/(170-140)];
			} else if (livingDays>=170 && livingDays<230) {
				data = [3,4,(230 - livingDays)/(230-170)];
			} else {
				data = [4, 4, 0]; 
			}
			return data;
		}
	};
	return LeafColor;
});