
//游戏图层
var GameLayer = cc.Layer.extend({
	_backTileMap:null,//背景
	_hero :null,//主角
    init:function () {
        var bRet = false;
        if (this._super()) {
            
            //控制
            this.initControll();
          //背景地图
            this.initBackground();
            
          //主角
            this.initHero();
            bRet = true;
        }
        return bRet;
    },
    initControll:function(){
    	
    	// accept touch now!

        if( 'keyboard' in sys.capabilities )
            this.setKeyboardEnabled(true);

        if( 'mouse' in sys.capabilities )
            this.setMouseEnabled(true);

        if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);
    },
    initBackground:function () {//背景地图
        //tilemap
        this._backTileMap = cc.TMXTiledMap.create(s_0000000_hotel_tmx);
        var contentSize =this._backTileMap.getContentSize();//地图大小
        var winSize = cc.Director.getInstance().getWinSize();//屏幕大小
        this._backTileMap.setPosition( new cc.Point(winSize.width/2-contentSize.width/2,winSize.height/2-contentSize.height/2) );
        this.addChild(this._backTileMap, -9);
    },
    initHero :function(){
    	var winSize = cc.Director.getInstance().getWinSize();//屏幕大小
    	this._hero = new Hero();
    	
    	this._hero.setPosition( new cc.Point(winSize.width/2,winSize.height/2) );
    	this.addChild(this._hero, -8);
    	
    	this._hero.idle();
    }
});

GameLayer.create = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
//游戏场景
GameLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameLayer.create();
    scene.addChild(layer);
    return scene;
};
