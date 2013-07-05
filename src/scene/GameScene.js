//”Œœ∑≥°æ∞
var GameScene= cc.Scene
		.extend({
			
		
			init : function() {
				var bRet = false;
				if (this._super()) {

					//”Œœ∑≤„
					var layer = GameLayer.create();
					this.addChild(layer);
					bRet = true;
				}
				return bRet;
			}
		
});

GameScene.create = function() {
	var sg = new GameScene();
	if (sg && sg.init()) {
		return sg;
	}
	return null;
};