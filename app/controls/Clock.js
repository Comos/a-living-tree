define(function(require) {
	var Clock = cc.Class.extend({
		_startTime: 0,
		_realStartTime: 0,
		_step: 1,

		setStep: function(step) {
			if (step <= 0) {
				throw new Error('step cannot be less than zero');
			}
			this._step = step;
		},
		start: function(startTime, step) {
			this._startTime = startTime != undefined ? startTime : Date.now();
			step != undefined && this.setStep(step);
			this._realStartTime = Date.now();
		},
		getTime: function() {
			var offset = (Date.now() - this._realStartTime) * this._step;

			return this._startTime + offset;
		}
	});

	Clock.getInstance = function() {
		if (!this._instance) {
			this._instance = new Clock();
		}

		return this._instance;
	}

	return Clock;
});