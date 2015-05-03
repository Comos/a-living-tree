define(function(require) {
	//var weatherManager = require('WeatherManager');

	var DateManager = cc.Class.extend({
		startYear: 2005,
		endYear: 2014,
		_curDateObj: 0,
		_indexDateObj: 0,
		_speed: 4,
		_scheduleNum: 0,
		_monthEn: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

		ctor: function() {
			dateobj = new Date();
			dateobj.setFullYear(2005, 3, 10);
			this._curDateObj = dateobj;
			this._lastVaildWeatherDateObj = this._curDateObj;
			this._indexDateObj = this._curDateObj;
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
		getCurDateStr: function() {
			return this.dateToString(this._curDateObj);
		},
		getCurDate: function() {
			return this._curDateObj;
		},
		getCurMonStrEn: function() {
			var mon = this._curDateObj.getMonth();
			return this._monthEn[mon].toUpperCase();
		},
		getCurDayStr: function() {
			return this._curDateObj.getDate();
		},
		getIndexDate: function() {
			return this._indexDateObj;
		},
		setIndexDate: function(dateobj) {
			this._indexDateObj = dateobj;
		},
		getIndexDateStr: function() {
			return this.dateToString(this._indexDateObj)
		},
		setSpeed: function(speed)
		{
			this._speed = speed;
		},
		getSpeed: function()
		{
			return this._speed;
		},
		UpdateStatus: function() {
			this._scheduleNum++;
			this._curDateObj = new Date(this._curDateObj.getTime()+24*3600*1000);

		},
		isChanged: function() {
			if (this._scheduleNum%this._speed == 0)
			{
				return true;
			}
			return false;
		}
	});
	var dateManager = new DateManager();
	return dateManager;
});