define(function(require) {

	return cc.Class.extend({
		_dlNumMax: 3,
		_dlNum: 0,
		_layerCB: 0,
		_date: 0,
		_speed: 4,
		_schedule_num: 0,
		_pic_name: 0,
		dateindex: 0,
		dateobj: 0,
		_weatherDataContainer: {},
		_monthEn: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec', 'Nov'],

		ctor: function(dateobj) {
			this._date = dateobj;
			this._lastDate = this._date;
			this.dateindex=this.getdateString();
			this.dateobj = this._date;
		},
		bindCB: function(layCB) {
			this._layerCB = layCB;
		},
		getDateNumber:function() {
			return this._date;
		},
		downloadWeatherData: function() {
			cc.loader.loadTxt("./data/2012_SAPPORO", this.downloadWeatherDataCB.bind(this));
			cc.loader.loadTxt("./data/2013_SAPPORO", this.downloadWeatherDataCB.bind(this));
			cc.loader.loadTxt("./data/2014_SAPPORO", this.downloadWeatherDataCB.bind(this));
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
			if (this._dlNum == this._dlNumMax)
			{
				this._pic_name = this.getRealWeather(this._date)
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
		setSpeed: function(speed)
		{
			this._speed = speed;
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
		dateToString: function(dateobj) {
			var year=dateobj.getFullYear().toString();
			var month=(dateobj.getMonth()+1).toString();
			var date=dateobj.getDate().toString();
			if (month.length == 1)
			{
				month='0'+month;
			}
			if (date.length ==1)
			{
				date='0'+date;
			}
			return ''+year+month+date;
		},
		getdateString: function() {
			var dateobj = this._date;
			return this.dateToString(dateobj);
		},
		getMonStr: function() {
			var mon = this._date.getMonth();
			return this._monthEn[mon].toUpperCase();
		},
		getDayStr: function() {
			return this._date.getDate();
		},
		getRealWeather: function(date) {
			var first = this.getSeason(date);
			var second = 0;
			date_str = this.dateToString(date);
			if (this._weatherDataContainer[date_str]['forecast']=='sunny')
			{
				second=0;
			}
			else
			{
				second=1;
			}
			return first.toString()+'-'+second.toString();
		},
		isChange: function() {
			if (this._schedule_num%this._speed == 0)
			{
				return true;
			}
			return false;
		},
		getDrawWeather: function(date) {
			if ( this.isChange())
			{
				this._pic_name = this.getRealWeather(date);
			}
			return this._pic_name;
		},
		update: function() {
			this._schedule_num++;
			this._date = new Date(this._date.getTime()+24*3600*1000);
			this.dateindex=this.getdateString();
			this.dateobj = this._date;
			if (!this._weatherDataContainer[this.dateindex])
			{
				this.dateobj = this._lastDate;
				this.dateindex=this.dateToString(this.dateobj);
			}
			else
			{
				this._lastDate = this._date
			}
		}
	});

});