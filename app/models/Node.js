define(function(require) {

var Node = cc.Class.extend({
	_bornTime: 0,	
	_age: 0,

	ctor: function(bornTime) {
		this._bornTime = window.weatherManager.getDateNumber();//bornTime || Date.now();		
	},
	
	getLivingDays: function() {
		return (window.weatherManager.getDateNumber() - this._bornTime)/1000/60/60/24;
	},
	
	update: function() {
		this._age++;
	},
	getAge: function() {
		return this._age;
	}
});
return Node;
});