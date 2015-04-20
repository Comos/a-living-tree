define(function(require) {

return cc.Layer.extend({
	_weatherManger: 0,
	_bg_sprite: 0,
	_bg_container: {},
	_out_action: 0,
	_in_action: 0,
	_name: 0,

	ctor: function(weatherManger) {
		this._super();
		this._weatherManger = weatherManger

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
				//this.addChild(bgSprite);
			}
		}
		dateobj = this._weatherManger.dateobj;
		this._name = this._weatherManger.getRealWeather(dateobj);
		this._bg_sprite = this._bg_container[this._name];
		this._bg_sprite.setOpacity(1);
		this.addChild(this._bg_sprite);
		this._out_action = cc.fadeOut(0.1*this._weatherManger._speed);
		this._in_action = cc.fadeIn(0.1*this._weatherManger._speed);
		this._bg_sprite.width=1200;
		this._bg_sprite.height=900;
		for (var name in this._bg_container)
		{
			if (name == this._name)
			{
				continue;
			}
			this.addChild(this._bg_container[name]);
		}

	},
	setRealBg: function()
	{
		var newName = this._weatherManger.getRealWeather(this._weatherManger.dateobj);
		this._name = newName;
		this._bg_sprite.runAction(this._out_action);
		this._bg_sprite = this._bg_container[this._name];
		this._bg_sprite.runAction(this._in_action);		
	},
	update: function(dateobj) {
		var newName = this._weatherManger.getDrawWeather(dateobj);
		if ( newName != this._name )
		{
			this._name = newName;
			this._bg_sprite.runAction(this._out_action);
			this._bg_sprite = this._bg_container[this._name];
			this._bg_sprite.runAction(this._in_action);			
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