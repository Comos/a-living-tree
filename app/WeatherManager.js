define(function(require) {

	var dateManager = require('DateManager');

	var WeatherManager = cc.Class.extend({
		_dlNum: 0,
		_layerCB: 0,
		_pic_name: 0,
		_weatherDataContainer: {},

		bindCB: function(layCB) {
			this._layerCB = layCB;
		},
		downloadWeatherData: function() {
			for (var year=dateManager.startYear; year<=dateManager.endYear; year++)
			{
				cc.loader.loadTxt('./data/'+year+'_'+'SAPPORO', this.downloadWeatherDataCB.bind(this));
			}
		},
		downloadWeatherDataCB: function(err, text) {
			var weatherText = new String(text);
			var weatherDay = weatherText.split('\n');
			for (var i=0, len=weatherDay.length; i<len; i++)
			{
				var weatherItems = weatherDay[i].split('`');
				var date = weatherItems[0];
				var weatherData = {	'date': weatherItems[0],
									'T': weatherItems[1],
									'SLP': parseFloat(weatherItems[2]),
									'H': weatherItems[3],
									'PP': weatherItems[4],
									'V': parseFloat(weatherItems[5]),
									'RA': parseInt(weatherItems[6]),
									'SN': parseInt(weatherItems[7]),
									'TS': weatherItems[8]};
				weatherData['forecast'] = this.calWeather(weatherData);
				this._weatherDataContainer[date] = weatherData;

			}

			this._dlNum++;
			if ( this._dlNum == (dateManager.endYear - dateManager.startYear+1) )
			{
				this._pic_name = this.getRealWeather(dateManager.getCurDate());
				this._layerCB();
			}
		},
		calWeather: function(weatherObj) {
			if (weatherObj['SN'] == 1)
			{
				return 'snowy';
			}
			else if (weatherObj['RA'] == 1)
			{
				return 'rainy';
			}
			else if (weatherObj['SLP']<1000 && weatherObj['V']<7)
			{
				return 'cloudy';
			}
			else
			{
				return 'sunny';
			}

		},
		getWeather: function(dateindex) 
		{
			return this._weatherDataContainer[dateindex];
		},
		getSeason: function(date) {
			var month=date.getMonth()
			if (month==3)
			{
				return 0;
			}
			else if (month>3 && month<6)
			{
				return 1;
			}
			else if (month>5 && month<9)
			{
				return 2;
			}
			else if (month>8 && month<12)
			{
				return 3;
			}
			else
			{
				return 4;
			}
		},
		getRealWeather: function(date) {
			var first = this.getSeason(date);
			var second = 0;
			date_str = dateManager.dateToString(date);
			if (this._weatherDataContainer[date_str]['forecast']=='sunny')
			{
				second=0;
			}
			else
			{
				second=1;
			}
			return first.toString()+second.toString();
		},
		getDrawWeather: function(date) {
			if ( dateManager.isChanged())
			{
				this._pic_name = this.getRealWeather(date);
			}
			return this._pic_name;
		},
		update: function()
		{
			if (this._weatherDataContainer[dateManager.getCurDateStr()])
			{
				dateManager.setIndexDate(dateManager.getCurDate());
			}

		}
	});

	var weatherManager = new WeatherManager();
	return weatherManager;
	//return new WeatherManager();
});
