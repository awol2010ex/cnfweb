
//游戏图层
var GameLayer = cc.Layer.extend({
	_backTileMap:null,// 背景
	_hero :null,// 主角
	_key_list:{},
    init:function () {
        var bRet = false;
        if (this._super()) {
            
            // 控制
            this.initControll();
          // 背景地图
            this.initBackground();
            
          // 主角
            this.initHero();
            
            
         // schedule
            this.scheduleUpdate();
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
    initBackground:function () {// 背景地图
        // tilemap
        this._backTileMap = cc.TMXTiledMap.create(s_0000000_hotel_tmx);
        var contentSize =this._backTileMap.getContentSize();// 地图大小
        var winSize = cc.Director.getInstance().getWinSize();// 屏幕大小
        this._backTileMap.setPosition( new cc.Point(winSize.width/2-contentSize.width/2,winSize.height/2-contentSize.height/2) );
        this.addChild(this._backTileMap, -9);
    },
    // 主角
    initHero :function(){
    	var winSize = cc.Director.getInstance().getWinSize();// 屏幕大小
    	this._hero = new Hero();//精灵
    	
    	this._hero.setPosition( new cc.Point(winSize.width/2,winSize.height/2) );//位置
    	
    	this._hero._desiredPosition= this._hero.getPosition();
    	this._hero.setWalkSpeed(160);//步速
    	this._hero._gameLayer =this;//游戏层
    	this.addChild(this._hero, -8);
    	
    	this._hero.idle();
    },
    // 方向
    onKeyDown:function (key) {  
    	if(36 == key ){// 7
    		this._hero._isWalking =true ;
    		this._key_list[key]=1;
    	} 
    	else
    	if(38 == key ){// 8
    		this._hero._isWalking =true ;
    		this._key_list[key]=1;
    	}
    	else
        if(33 == key ){// 9
        	this._hero._isWalking =true ;
        	this._key_list[key]=1;
        }
        else
        if(37 == key ){// 4
        	this._hero._isWalking =true ;
        	this._key_list[key]=1;
        }
        else
        if(39 == key ){// 6
        	this._hero._isWalking =true ;
        	this._key_list[key]=1;
        }
        else
        if(35 == key ){// 1
        	this._hero._isWalking =true ;
        	this._key_list[key]=1;
        }
        else
        if(40== key ){// 2
        	this._hero._isWalking =true ;
        	this._key_list[key]=1;
        }
        else
        if(34 == key ){// 3
        	this._hero._isWalking =true ;
        	this._key_list[key]=1;
        }
        else
        if(cc.KEY.z==key){
        	this._hero.attack();
        }
    },
  // 方向
    onKeyUp:function (key) {  
    	this._key_list[key]=0;//松开
    	var d =this.getDirection();
    	if(d.x==0 && d.y==0)
    	{
    	  this._hero._isWalking =false ;
    	}
    },
    //取得方向
    getDirection:function(){
    	var x = 0;
    	var y = 0;
    	for(var key  in this._key_list){
    		if(this._key_list[key]!=1)continue;
    		if(36 == key ){// 7
        		x--;
        		y++;
        	} 
        	else
        	if(38 == key ){// 8
        		y++;
        	}
        	else
            if(33 == key ){// 9
            	x++;
            	y++;
            }
            else
            if(37 == key ){// 4
            	x--;
            }
            else
            if(39 == key ){// 6
            	x++;
            }
            else
            if(35 == key ){// 1
            	x--;
            	y--;
            }
            else
            if(40== key ){// 2
            	y--;
            }
            else
            if(34 == key ){// 3
            	x++;
            	y--;
            }
    	}
    	
    	return new cc.Point(x,y);
    },
    update:function(dt){
    	
    	this._hero.update(dt);//更新英雄
    	
    	//站立
        if(!this._hero._isWalking && this._hero._actionState ==ActionState.kActionStateWalk){
			
			this._hero.idle();
		}
        else
        	//行走
        if(this._hero._isWalking ){
        	
        	this._hero.walkWithDirection(this.getDirection());
        }
    	//更新位置
    	this.updatePositions();
    },
    
    updatePositions:function(){
    	this._hero.setPosition(this._hero._desiredPosition);
    }
    
});

GameLayer.create = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
// 游戏场景
GameLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameLayer.create();
    scene.addChild(layer);
    return scene;
};
