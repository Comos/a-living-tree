define(function(require) {
var WeatherLayer = require('WeatherLayer');
var Trunk = require('Trunk');
var Tree = require('Tree');
var Vector = require('lang/Vector');
var KochLine = require('KochLine');

return cc.Scene.extend({
	_drawer: null,
	_length: 0,

	onEnter: function() {
		this._super();
		var size = cc.winSize;
		var label = new cc.LabelTTF('Hello World', 'Arial', 38);
		label.x = size.width / 2;
		label.y = size.height / 2;
		this.addChild(label);
		this._sprite = label;
		var action = cc.spawn(cc.moveBy(2.5, cc.p(0, 200)),cc.tintTo(2.5,255,125,0));		
		label.runAction(action);
		this._drawer = new cc.DrawNode();
		this.addChild(this._drawer);
		var tree = new Tree(new Vector(size.width/2, 0), 200, 0);
		tree.render(this._drawer);
		this._tree = tree;
		this.scheduleUpdate();

		//var trunk = new Trunk(200, 6);
		//this.addChild(trunk);
		//trunk.grow();
//		this._tree = new Tree(cc.p(size.width/2, 0), 0);
//		this.scheduleUpdate();
/*
		var start = new Vector(0, 10);
		var end = new Vector(size.width, 10);
		kochLines = [new KochLine(start, end)];
		var drawer = this._drawer;
		kochLines.forEach(function(kochLine) {
			kochLine.render(drawer);
		});
		this._kochLines = kochLines;
		//kochLine.render(this._drawer);
	
		this.schedule(this.update, 1, 1);
*/		
	},
	update: function() {
		if (this._tree.update() === false) {
			return;
		}
		this._drawer.clear();
		this._tree.render(this._drawer);
	},

	_generate: function() {
		var next = [];

		this._kochLines.forEach(function(kochLine) {
			var a = kochLine.kochA(),
				b = kochLine.kochB(),
				c = kochLine.kochC(),
				d = kochLine.kochD(),
				e = kochLine.kochE();

			next.push(new KochLine(a, b));
			next.push(new KochLine(b, c));
			next.push(new KochLine(c, d));
			next.push(new KochLine(d, e));
		});
		
		return next;
	},
		/*
	update: function() {
		var drawer = this._drawer;
		drawer.clear();
		this._kochLines = this._generate();
		this._kochLines.forEach(function(kochLine) {
			kochLine.render(drawer);
		});
	},*/
	render: function() {
		this._drawer.clear();
		this._tree.render(this._drawer);
		return;
		this._drawer.clear();
		this._drawer.drawSegment(cc.p(cc.winSize.width/2, 0), cc.p(100,this._length), 1, cc.color(255,255,255));
		window.dn = this._drawer;
	}
});
});