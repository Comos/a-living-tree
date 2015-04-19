define(function(require) {
	var Tree = require('models/RootSegment'),
		Vector = require('lang/Vector');

	return cc.Layer.extend({
		_root: null,
		_renderer: null,

		ctor: function() {
			this._super();
			this._renderer = new cc.DrawNode();
			this.addChild(this._renderer);
			this._root = new Tree(new Vector(520, 240), 30);
			this.schedule(this.update, 0.001);
			this.schedule(this.render, 0.01);					
		},

		pauseTree: function() {
			this.unschedule(this.update);
			this.unschedule(this.render);
		},

		resumeTree: function() {
			this.schedule(this.update, 0.001);
			this.schedule(this.render, 0.01);
		},

		update: function() {		
			if (!this._root.update()) {			
				this.unschedule(this.update);
				this.unschedule(this.render);			
			}	
		},
		render: function() {
			this._renderer.clear();
			this._root.render(this._renderer);		
		}
	});
});