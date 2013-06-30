
//��Ϸͼ��
var GameLayer = cc.Layer.extend({
	_backTileMap:null,// ����
	_hero :null,// ����
    init:function () {
        var bRet = false;
        if (this._super()) {
            
            // ����
            this.initControll();
          // ������ͼ
            this.initBackground();
            
          // ����
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
    initBackground:function () {// ������ͼ
        // tilemap
        this._backTileMap = cc.TMXTiledMap.create(s_0000000_hotel_tmx);
        var contentSize =this._backTileMap.getContentSize();// ��ͼ��С
        var winSize = cc.Director.getInstance().getWinSize();// ��Ļ��С
        this._backTileMap.setPosition( new cc.Point(winSize.width/2-contentSize.width/2,winSize.height/2-contentSize.height/2) );
        this.addChild(this._backTileMap, -9);
    },
    // ����
    initHero :function(){
    	var winSize = cc.Director.getInstance().getWinSize();// ��Ļ��С
    	this._hero = new Hero();
    	
    	this._hero.setPosition( new cc.Point(winSize.width/2,winSize.height/2) );
    	
    	this._hero._desiredPosition= this._hero.getPosition();
    	
    	this.addChild(this._hero, -8);
    	this._hero.setWalkSpeed(160);
    	this._hero.idle();
    },
    // ����
    onKeyDown:function (key) {  
    	if(36 == key ){// 7
    		var v =new  cc.Point(-1,1);
    		this._hero._isWalking =true ;
    		this._hero.walkWithDirection(v);
    	} 
    	else
    	if(38 == key ){// 8
    		var v =new  cc.Point(0,1);
    		this._hero._isWalking =true ;
    		this._hero.walkWithDirection(v);
    	}
    	else
        if(33 == key ){// 9
        	var v =new  cc.Point(1,1);	
        	this._hero._isWalking =true ;
        	this._hero.walkWithDirection(v);
        }
        else
        if(37 == key ){// 4
        	var v =new cc.Point(-1,0);	
        	this._hero._isWalking =true ;
        	this._hero.walkWithDirection(v);
        }
        else
        if(39 == key ){// 6
            var v =new  cc.Point(1,0);	
            this._hero._isWalking =true ;
            this._hero.walkWithDirection(v);
        }
        else
        if(35 == key ){// 1
            var v =new  cc.Point(-1,-1);	
            this._hero._isWalking =true ;
            this._hero.walkWithDirection(v);
        }
        else
        if(40== key ){// 2
            var v =new  cc.Point(0,-1);	
            this._hero._isWalking =true ;
            this._hero.walkWithDirection(v);
        }
        else
        if(34 == key ){// 3
            var v =new  cc.Point(1,-1);	
            this._hero._isWalking =true ;
            this._hero.walkWithDirection(v);
        }
        else
        if(cc.KEY.z==key){
        	this._hero.attack();
        }
    },
  // ����
    onKeyUp:function (key) {  
    	
    	this._hero._isWalking =false ;
		
    },
    
    update:function(dt){
    	
    	this._hero.update(dt);//����Ӣ��
    	
    	//վ��
        if(!this._hero._isWalking && this._hero._actionState ==ActionState.kActionStateWalk){
			
			this._hero.idle();
		}
    	//����λ��
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
// ��Ϸ����
GameLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameLayer.create();
    scene.addChild(layer);
    return scene;
};
