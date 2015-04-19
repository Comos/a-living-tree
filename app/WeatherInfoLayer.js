define(function(require) {

return cc.Layer.extend({
	_weatherManger: 0,
	_month_sprite: 0,
	_day_sprite: 0,
	_T_sprite: 0,
	_board_sprite: 0,
	_forecast_sprite: 0,
	_rect_map: {'sunny': cc.rect(20,20,300,300),
				'cloudy': cc.rect(340,40,300,300),
				'rainy': cc.rect(660, 340, 300, 300),
				'snowy': cc.rect(340, 660, 300, 300)},

	ctor: function(weatherManger) {
		this._super();
		this._weatherManger = weatherManger;

		this._board_sprite = new cc.Sprite(res.ui_weather_board);
		this._board_sprite.setAnchorPoint(0,0);
		this._board_sprite.setNormalizedPosition(0.23,0.08);
		
		//this._board_sprite.setScale(0.3, 0.3);
		this.addChild(this._board_sprite);

		mon_str = this._weatherManger.getMonStr();
		this._month_sprite = new cc.LabelTTF(mon_str, 'Haettenschweiler', 83);
		this._month_sprite.setFontFillColor(cc.color(255, 255, 255));
		this._board_sprite.setAnchorPoint(0,0);
		this._month_sprite.setNormalizedPosition(0.25,0.5);
		this._month_sprite.enableStroke(cc.color(82, 110, 134), 4)
		this._board_sprite.addChild(this._month_sprite);

		day_str = this._weatherManger.getDayStr();
		this._date_sprite = new cc.LabelTTF(day_str, 'Bauhaus 93', 30);
		this._date_sprite.setNormalizedPosition(0.56,0.7);
		this._date_sprite.setFontFillColor(cc.color(58, 84, 106));
		this._date_sprite.enableStroke(cc.color(255, 255, 255), 5)
		this._board_sprite.addChild(this._date_sprite);

		dateindex = this._weatherManger.dateindex
		var forecast = this._weatherManger._weatherDataContainer[dateindex]['forecast'];
		this._forecast_sprite = new cc.Sprite(res.weather, this._rect_map[forecast]);
		this._forecast_sprite.setNormalizedPosition(0.8, 0.5);
		this._forecast_sprite.setScale(0.3, 0.3);
		this._board_sprite.addChild(this._forecast_sprite);

		this._T_sprite = new cc.LabelTTF(parseInt(this._weatherManger._weatherDataContainer[dateindex]['T']).toString()+'℃', 'Bauhaus 93', 30);
		this._T_sprite.setNormalizedPosition(0.56, 0.3);
		this._T_sprite.setFontFillColor(cc.color(58, 84, 106));	
		this._T_sprite.enableStroke(cc.color(255, 255, 255), 5);
		this._board_sprite.addChild(this._T_sprite);
	},
	update: function(dateindex) {

		mon_str = this._weatherManger.getMonStr();
		this._month_sprite.setString(mon_str);
		day_str = this._weatherManger.getDayStr();
		this._date_sprite.setString(day_str);
		var forecast = this._weatherManger._weatherDataContainer[dateindex]['forecast'];
		this._forecast_sprite.setTextureRect(this._rect_map[forecast]);
		this._T_sprite.setString(parseInt(this._weatherManger._weatherDataContainer[dateindex]['T']).toString()+'℃');

	},
	onEnter: function() {
		this._super();
	},
	onExit: function() {
		this._super();
	}
});
});