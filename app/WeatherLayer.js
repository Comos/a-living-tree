define(function(require) {

	var weatherManager = require('WeatherManager');
	var dateManager = require('DateManager');

return cc.Layer.extend({
	_bg_container: {},
	_out_action: 0,
	_in_action: 0,
	_name: 0,

	ctor: function() {
		this._super();
		for (var i=0; i<5; i++)
		{
			for (var j=0; j<2; j++)
			{
				this._name = i.toString()+j.toString();
				var bgSprite = new cc.Sprite(res['bg_'+this._name]);
				bgSprite.setPosition(0,0);
				bgSprite.setAnchorPoint(0,0);
				bgSprite.setOpacity(0);
				bgSprite.width=1200;
				bgSprite.height=900;		
				this._bg_container[this._name] = bgSprite;
				this.addChild(bgSprite);
			}
		}
		dateobj = dateManager.getCurDate();
		this._name = weatherManager.getRealWeather(dateobj);
		bg_sprite = this._bg_container[this._name];
		bg_sprite.setOpacity(255);
		this._out_action = cc.fadeOut(0.2*dateManager._speed);

	},
	setRealBg: function()
	{
		var newName = weatherManager.getRealWeather(dateManager.getCurDate());
		bg_sprite = this._bg_container[this._name];
		bg_sprite.stopAllActions();
		bg_sprite.setOpacity(0);
		this._name = newName;
		bg_sprite = this._bg_container[this._name];
		bg_sprite.stopAllActions();
		bg_sprite.setOpacity(255);
	},
	UpdateStatus: function() {
		var newName = weatherManager.getDrawWeather(dateManager.getIndexDate());
		if ( newName != this._name )
		{
			bg_sprite = this._bg_container[this._name];
			bg_sprite.stopAllActions();
			bg_sprite.runAction(this._out_action);
			this._name = newName;
			bg_sprite.stopAllActions();
			bg_sprite = this._bg_container[this._name];
			bg_sprite.runAction(this._out_action.reverse());
		}
	},
	onEnter: function() {
		this._super();
	},
	onExit: function() {
		this._super();
	}
});
});