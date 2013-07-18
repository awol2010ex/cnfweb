cc.dumpConfig();

// 开机画面
var TitleScreen = cc.Layer.extend({
	_screenSprite : null,
	init : function() {
		var bRet = false;
		if (this._super()) {
			var winSize = cc.Director.getInstance().getWinSize();
			// 控制
			this.initControll();

			bRet = true;
		}
		return bRet;
	},
	initControll : function() {

		// accept touch now!

		if ('keyboard' in sys.capabilities)
			this.setKeyboardEnabled(true);

		if ('mouse' in sys.capabilities)
			this.setMouseEnabled(true);

		if ('touches' in sys.capabilities)
			this.setTouchEnabled(true);
	},
	onKeyDown : function(key) {
		if (cc.KEY.enter == key) {
			// initialize director
			var director = cc.Director.getInstance();
			// 主游戏画面
			cc.Loader.preload(g_maingame, function() {

				director.replaceScene(cc.TransitionFade.create(1.2, GameScene
						.create({
							_tileMapName :s_0000000_hotel_tmx
				})));
			}, this);
		}
	}
});
TitleScreen.create = function() {
	var sg = new TitleScreen();
	if (sg && sg.init()) {
		return sg;
	}
	return null;
};

TitleScreen.scene = function() {
	var scene = cc.Scene.create();
	var layer = TitleScreen.create();
	scene.addChild(layer);
	return scene;
};
