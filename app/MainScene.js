define(function(require) {
	var weatherManager = require('WeatherManager');
	var dateManager = require('DateManager');

var	WeatherInfoLayer = require('WeatherInfoLayer'),
	WeatherLayer = require('WeatherLayer'),
	SnsLayer = require('SnsLayer'),
	PPLayer = require('PPLayer'),
	ParticleLayer = require('ParticleLayer'),
	TreeLayer = require('TreeLayer');

 return cc.Scene.extend({
	_date: 0,
	_bgLayer: 0,
	_infoLayer: 0,
	_ptLayer: 0,
	_treeLayer: 0,

	onEnter: function() {
		this._super();
		weatherManager.bindCB(this.onDownloadDone.bind(this));
		weatherManager.downloadWeatherData();	


	},
	onDownloadDone: function() {
		this._bgLayer = new WeatherLayer();
		this.addChild(this._bgLayer)
		
		this.addChild(new SnsLayer());
		this.addChild(new PPLayer(this));

		this._infoLayer = new WeatherInfoLayer();
		this.addChild(this._infoLayer);

		this._ptLayer = new ParticleLayer();
		this.addChild(this._ptLayer);

		this.schedule(this.weatherCB, 0.2, cc.REPEAT_FOREVER, 0);
		
		this._treeLayer = new TreeLayer();
		this.addChild(this._treeLayer);
	},
	pauseCB: function() {
		this.unscheduleAllCallbacks();
		this._bgLayer.setRealBg();
		this._ptLayer.setRealParticle();
		this._treeLayer.pauseTree();
	},
	resumeCB: function() {
		this.schedule(this.weatherCB, 0.2, cc.REPEAT_FOREVER, 0);
		this._treeLayer.resumeTree();
	},
	weatherCB: function() {
		if (dateManager.getCurDate().getFullYear()>=2015)
		{
			this.unscheduleAllCallbacks();
		}
		else
		{
			dateManager.UpdateStatus();
			weatherManager.UpdateStatus();

			this._infoLayer.UpdateStatus();
			this._bgLayer.UpdateStatus();
			this._ptLayer.UpdateStatus();
		}
	}
});

});
