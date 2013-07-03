
//��Ϸͼ��
var GameLayer = cc.Layer.extend({
	_backTileMap:null,// ����
	_hero :null,// ����
	_key_list:{},
	_actors :null ,
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
        //�����
        var clist =this._backTileMap.getChildren();
        if(clist && clist.length>0)
        for(var i=0,s=clist.length;i<s;i++){
        	var c= clist[i];
        	c.getTexture().setAliasTexParameters();
        }
        
        this.addChild(this._backTileMap, -9);
    },
    // ����
    initHero :function(){
    	var winSize = cc.Director.getInstance().getWinSize();// ��Ļ��С
    	
    	
    	this._actors = cc.SpriteBatchNode.create(s_ichigo_png);
    	this._actors.getTexture().setAliasTexParameters();
    	this.addChild(this._actors, -8);
    	
    	this._hero = new Hero();//����
    	
    	this._hero.setPosition( new cc.Point(winSize.width/2,winSize.height/2) );//λ��
    	
    	this._hero._desiredPosition= this._hero.getPosition();
    	this._hero.setWalkSpeed(160);//����
    	this._hero._gameLayer =this;//��Ϸ��
    	
    	if(this._hero.getHitSprite())this._hero._hit_sprite.setPosition(this._hero.getPosition());//����Ч��
    	
    	
    	this._actors.addChild(this._hero);
    	this._actors.addChild(this._hero.getHitSprite());
    	
    	this._hero.idle();
    },
    // ����
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
  // ����
    onKeyUp:function (key) {  
    	this._key_list[key]=0;//�ɿ�
    	var d =this.getDirection();
    	if(d.x==0 && d.y==0)
    	{
    	  this._hero._isWalking =false ;
    	}
    },
    //ȡ�÷���
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
    	
    	this._hero.update(dt);//����Ӣ��
    	
    	//վ��
        if(!this._hero._isWalking && this._hero._actionState ==ActionState.kActionStateWalk){
			
			this._hero.idle();
		}
        else
        	//����
        if(this._hero._isWalking ){
        	
        	this._hero.walkWithDirection(this.getDirection());
        }
    	//����λ��
    	this.updatePositions();
    },
    //����λ��
    updatePositions:function(){
    	this._hero.setPosition(this._hero._desiredPosition);
    	
    	if(this._hero.getHitSprite())this._hero.getHitSprite().setPosition(this._hero.getPosition());//����Ч��
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
