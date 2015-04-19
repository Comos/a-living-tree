define(function(require, exports, module) {
var CoverScene = require('CoverScene');

cc.game.onStart = function() {
	cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new CoverScene());
    }, this);
};

exports.start = function() {
	cc.game.run('gameCanvas');
};
});
