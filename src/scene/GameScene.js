//游戏场景
var GameScene= cc.Scene
		.extend({
			_tileMapName :null,
		    ctor :function(config){
		    	this._tileMapName =config._tileMapName;//地图
		    },
			init : function() {
				var bRet = false;
				if (this._super()) {

					var cfg ={
							
							_tileMapName:this._tileMapName	
					};
					//游戏层
					var layer = GameLayer.create(cfg);
					this.addChild(layer);
					bRet = true;
				}
				return bRet;
			}
		
});

GameScene.create = function(config) {
	var sg = new GameScene(config);
	if (sg && sg.init()) {
		return sg;
	}
	return null;
};