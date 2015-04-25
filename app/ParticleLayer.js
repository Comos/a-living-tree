define(function(require) {

	var weatherManager = require('WeatherManager');
	var dateManager = require('DateManager');

return cc.Layer.extend({
	_forecast: 0,

	ctor: function() {
		this._super();
		this._forecast = weatherManager.getWeather(dateManager.getIndexDateStr())['forecast'];
		season = weatherManager.getSeason(dateManager.getCurDate());

		this._particleBigSnowList = new Array();
		for (var i=0;i<4;i++)
		{
			particleBigSnow = new cc.ParticleSnow();
			particleBigSnow.initWithTotalParticles(1000);
			particleBigSnow.setStartSize(20);
			particleBigSnow.setSpeed(250);
			this._particleBigSnowList.push(particleBigSnow);			
		}
		if (this._forecast == 'snowy' && season==4)
		{
			this._bigSnowFlag = 1;
			this._particleBigSnowList[0].resetSystem();
		}
		else
		{
			this._bigSnowFlag = 0;
			for (var i=0;i<4;i++)
			{
				this._particleBigSnowList[i].stopSystem();
			}
		}
		for (var i=0;i<4;i++)
		{
			this.addChild(this._particleBigSnowList[i]);
		}

		this._particleLittleSnowList = new Array();
		for (var i=0;i<4;i++)
		{
			particleLittleSnow = new cc.ParticleSnow();
			particleLittleSnow.initWithTotalParticles(1000);
			particleLittleSnow.setStartSize(8);
			particleLittleSnow.setSpeed(250);
			this._particleLittleSnowList.push(particleLittleSnow);			
		}
		if (this._forecast == 'snowy' && season==0)
		{
			this._littleSnowFlag = 1;
			this._particleLittleSnowList[0].resetSystem();
		}
		else
		{	this._littleSnowFlag = 0;
			for (var i=0;i<4;i++)
			{
				this._particleLittleSnowList[i].stopSystem();
			}
		}
		for (var i=0;i<4;i++)
		{	
			this.addChild(this._particleLittleSnowList[i]);
		}
		
		this._particleRainList = new Array();
		for (var i=0;i<4;i++)
		{
			particleRain = new cc.ParticleRain();
			particleRain.initWithTotalParticles(8000);
			particleLittleSnow.setStartSize(15);
			particleRain.setSpeed(250);
			particleRain.setStartColor(cc.color(200,200,200));
			//particleRain.setSourcePosition(new cc.Point(600, 900));
			particleRain.setPosVar(new cc.Point(600, 0));
			this._particleRainList.push(particleRain);		
		}
		if (this._forecast == 'rainy')
		{
			this._rainFlag = 1;
			this._particleRainList[0].stopSystem();
		}
		else
		{
			this._rainFlag = 0;
			for ( var i=0;i<4;i++)
			{
				this._particleRainList[i].resetSystem();
			}
		}
		for (var i=0;i<4;i++)
		{
			this.addChild(this._particleRainList[i]);
		}
	},
	setRealParticle: function() {
		this._forecast = weatherManager.getWeather(dateManager.getIndexDateStr())['forecast'];
		season = weatherManager.getSeason(dateManager.getCurDate());

		if (this._forecast == 'snowy' && season==0)
		{
			this._particleLittleSnowList[this._littleSnowFlag].resetSystem();
			this._littleSnowFlag++;
			this._littleSnowFlag=this._littleSnowFlag%4;
		}
		else
		{
			for (var i=0;i<4;i++)
			{
				this._particleLittleSnowList[i].stopSystem();
			}
		}

		if (this._forecast == 'snowy' && season==4)
		{
			this._particleBigSnowList[this._bigSnowFlag].resetSystem();
			this._bigSnowFlag++;
			this._bigSnowFlag=this._bigSnowFlag%4
		}
		else
		{
			for (var i=0;i<4;i++)
			{
				this._particleBigSnowList[i].stopSystem();
			}			
		}

		if (this._forecast == 'rainy')
		{
			this._particleRainList[this._rainFlag].resetSystem();
			this._rainFlag++;
			this._rainFlag=this._rainFlag%4;
		}
		else
		{
			for (var i=0;i<4;i++)
			{
				this._particleRainList[i].stopSystem();
			}
		}		
	},
	update: function() {
		if (dateManager.isChanged())
		{
			this.setRealParticle();
		}
	}
});
});