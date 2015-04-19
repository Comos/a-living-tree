define(function(require, exports, module) {
	var radian = function(angleInDegree) {
			return angleInDegree * Math.PI/180;
		};

	return {
		radian: radian,
		sin: function(angleInDegree) {
			return angleInDegree % 180 === 0 ? 0 : Math.sin(radian(angleInDegree));
		},
		cos: function(angleInDegree) {
			return angleInDegree % 90 === 0 ? 0 : Math.cos(radian(angleInDegree));
		},
		random: function(min, max) {
			min = min == undefined ? 1 : min;

			if (max == undefined) {
				return min * Math.random();
			}

			return (min + (max - min) * Math.random());
		}
	};
});