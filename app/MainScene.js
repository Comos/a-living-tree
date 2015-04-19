define(function(require) {
	var WeatherManager = require('WeatherManger');
	var date = new Date();
	date.setFullYear(2012,3,10);
	window.weatherManager = new WeatherManager(date);

var	WeatherInfoLayer = require('WeatherInfoLayer'),
	WeatherLayer = require('WeatherLayer'),
	SnsLayer = require('SnsLayer'),
	PPLayer = require('PPLayer'),
	ParticleLayer = require('ParticleLayer'),
	TreeLayer = require('TreeLayer');

 return cc.Scene.extend({
	_weatherManger: 0,
	_date: 0,
	_bgLayer: 0,
	_infoLayer: 0,
	_ptLayer: 0,
	_treeLayer: 0,

	onEnter: function() {
		this._super();
		this._weatherManager = window.weatherManager;
		this._weatherManager.bindCB(this.onDownloadDone.bind(this));
		this._weatherManager.downloadWeatherData();	


	},
	onDownloadDone: function() {
		date=this._weatherManager.getdateString();

		this._bgLayer = new WeatherLayer(this._weatherManager);
		this.addChild(this._bgLayer)
		
		this.addChild(new SnsLayer());
		this.addChild(new PPLayer(this));

		this._infoLayer = new WeatherInfoLayer(this._weatherManager);
		this.addChild(this._infoLayer);

		this._ptLayer = new ParticleLayer(this._weatherManager);
		this.addChild(this._ptLayer);

		this.schedule(this.weatherCB, 0.2, cc.REPEAT_FOREVER, 0);
		
		this._treeLayer = new TreeLayer();
		this.addChild(this._treeLayer);
	},
	pauseCB: function() {
		this.pause();
		this._bgLayer.setRealBg();
		this._ptLayer.setRealParticle();
		this._treeLayer.pauseTree();
	},
	resumeCB: function() {
		this.resume();
		this._treeLayer.resumeTree();
	},
	weatherCB: function() {
		if (this._weatherManager._date.getFullYear()>=2015)
		{
			cc.log(stop);
			this.unscheduleAllCallbacks();
		}
		this._weatherManager.update();

		this._infoLayer.update(this._weatherManager.dateindex);
		this._bgLayer.update(this._weatherManager.dateobj);
		this._ptLayer.update();
	}
});

});
