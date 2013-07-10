//游戏图层
var GameLayer = cc.Layer
		.extend({
			_backTileMap : null,// 背景
			_tileMapName: null,//地图路径
			_hero : null,// 主角
			_enemyList : [],// 敌人
			_key_list : {},//键盘事件
			_actors:null,
			ctor :function(cfg){
				this._tileMapName =cfg._tileMapName;//地图路径
			},
			init : function() {
				var bRet = false;
				if (this._super()) {

					cc.SpriteFrameCache.getInstance().addSpriteFrames(s_cnf_plist);// 加载精灵
					//英雄batch
					this._actors = cc.SpriteBatchNode.create(s_cnf_png);

					this.addChild(this._actors, -4);
					// 控制
					this.initControll();
					// 背景地图
					this.initBackground();
					//初始化传送门
					this.initDoors();

					// 主角
					this.initHero();

					//敌人
					this.initEnemys();
					
					
					
					// schedule
					this.scheduleUpdate();
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
			initBackground : function() {// 背景地图
				// tilemap
				this._tileMap = cc.TMXTiledMap.create(this._tileMapName);

				var contentSize = this._tileMap.getContentSize();// 地图大小
				var winSize = cc.Director.getInstance().getWinSize();// 屏幕大小
				this._tileMap.setPosition(new cc.Point(winSize.width / 2
						- contentSize.width / 2, winSize.height / 2
						- contentSize.height / 2));
				// 抗锯齿
				var clist = this._tileMap.getChildren();
				if (clist && clist.length > 0)
					for ( var i = 0, s = clist.length; i < s; i++) {
						var c = clist[i];
						if (c.getTexture()
								&& c.getTexture().setAliasTexParameters) {
							c.getTexture().setAliasTexParameters();
						}
					}

				this.addChild(this._tileMap, -9);
			},
			// 主角
			initHero : function() {
				var winSize = cc.Director.getInstance().getWinSize();// 屏幕大小

				
				if (this._actors.getTexture()
						&& this._actors.getTexture().setAliasTexParameters) {
					this._actors.getTexture().setAliasTexParameters();
				}

				this._hero = new ActionSpriteSeries.Ichigo();// 精灵

				this._hero.setPosition(new cc.Point(winSize.width / 2,
						winSize.height / 2 - 150));// 位置

				this._hero.setDesiredPosition( this._hero.getPosition());
				this._hero.setWalkSpeed(160);// 步速
				this._hero._gameLayer = this;// 游戏层

				if (this._hero.getHitSprite())
					this._hero._hit_sprite
							.setPosition(this._hero.getPosition());// 攻击效果

				this._actors.addChild(this._hero);
				this._actors.addChild(this._hero.getHitSprite());

				this._hero.idle();
			},
			
			//初始化敌人
			initEnemys :function(){
				var winSize = cc.Director.getInstance().getWinSize();// 屏幕大小

				if (this._actors.getTexture()
						&& this._actors.getTexture().setAliasTexParameters) {
					this._actors.getTexture().setAliasTexParameters();
				}
				
				var _hollowInvasionOne= new ActionSpriteSeries.HollowInvasionOne();//敌人
				_hollowInvasionOne.setPosition(new cc.Point(winSize.width / 2+190,
						winSize.height / 2 - 100));// 位置

			    _hollowInvasionOne.setDesiredPosition( _hollowInvasionOne.getPosition() );
				
			    _hollowInvasionOne.setWalkSpeed(80);// 步速
			    this._enemyList.push(_hollowInvasionOne);
			    
				this._actors.addChild(_hollowInvasionOne);
				
				
				var _hollowInvasionTwo= new ActionSpriteSeries.HollowInvasionOne();//敌人
				_hollowInvasionTwo.setPosition(new cc.Point(winSize.width / 2+250,
						winSize.height / 2 - 100));// 位置

				_hollowInvasionTwo.setDesiredPosition( _hollowInvasionTwo.getPosition() );
				
				_hollowInvasionTwo.setWalkSpeed(80);// 步速
			    this._enemyList.push(_hollowInvasionTwo);
			    
				this._actors.addChild(_hollowInvasionTwo);
				
				_hollowInvasionTwo.idle();
				_hollowInvasionOne.idle();//站立

			},
			
			// 方向键
			onKeyDown : function(key) {
				if (36 == key) {// 7
					this._hero._isWalking = true;
					this._key_list[key] = 1;
				} else if (38 == key) {// 8
					this._hero._isWalking = true;
					this._key_list[key] = 1;
				} else if (33 == key) {// 9
					this._hero._isWalking = true;
					this._key_list[key] = 1;
				} else if (37 == key) {// 4
					this._hero._isWalking = true;
					this._key_list[key] = 1;
				} else if (39 == key) {// 6
					this._hero._isWalking = true;
					this._key_list[key] = 1;
				} else if (35 == key) {// 1
					this._hero._isWalking = true;
					this._key_list[key] = 1;
				} else if (40 == key) {// 2
					this._hero._isWalking = true;
					this._key_list[key] = 1;
				} else if (34 == key) {// 3
					this._hero._isWalking = true;
					this._key_list[key] = 1;
				} else if (cc.KEY.z == key) {
					this._hero.attack();
				}
			},
			// 方向
			onKeyUp : function(key) {
				this._key_list[key] = 0;// 松开
				var d = this.getDirection();
				if (d.x == 0 && d.y == 0) {
					this._hero._isWalking = false;
				}
			},
			// 取得方向
			getDirection : function() {
				var x = 0;
				var y = 0;
				for ( var key in this._key_list) {
					if (this._key_list[key] != 1)
						continue;
					if (36 == key) {// 7
						x--;
						y++;
					} else if (38 == key) {// 8
						y++;
					} else if (33 == key) {// 9
						x++;
						y++;
					} else if (37 == key) {// 4
						x--;
					} else if (39 == key) {// 6
						x++;
					} else if (35 == key) {// 1
						x--;
						y--;
					} else if (40 == key) {// 2
						y--;
					} else if (34 == key) {// 3
						x++;
						y--;
					}
				}

				return new cc.Point(x, y);
			},
			update : function(dt) {

				this._hero.update(dt);// 更新英雄

				//更新敌人
				this.updateEnemys(dt);
				// 站立
				if (!this._hero._isWalking
						&& this._hero._actionState == ActionState.kActionStateWalk) {

					this._hero.idle();
				} else
				// 行走
				if (this._hero._isWalking) {

					this._hero.walkWithDirection(this.getDirection());
				}
				// 更新位置
				this.updatePositions();
				
				//重新对batchNode排序
				this.reorderActors();
			},
			//更新敌人
			updateEnemys:function(dt){
				if(this._enemyList && this._enemyList.length>0){
					for(var i=0,s=this._enemyList.length;i<s;i++){
						var enemy =this._enemyList [i];
						
						enemy.update(dt);
						
						if(new Date().getTime()<=enemy.getNextDecisionTime()){
							continue;
						}
						
						var random  =Math.ceil(Math.random()*2)%2 ;
						
						if(random ==0){
							var moveDirection  =cc.pNormalize( cc.pSub(this._hero.getPosition(), enemy.getPosition())  );
							
							//向着主角走
							enemy.walkWithDirection(moveDirection);
						}else{
							enemy.idle();//站立
						}
						//下一次行为时间
						enemy.setNextDecisionTime(new Date().getTime()+1000*Math.random()*3);
					}
				} 
			},
			//更新英雄位置
			updateHeroPosition:function(){
				// 移动范围
				var posX = Math.min(this._tileMap.getPositionX()
						+ this._tileMap.getMapSize().width
						* this._tileMap.getTileSize().width
						- this._hero.getCenterToSides(), Math.max(this._tileMap
						.getPositionX()
						+ this._hero.getCenterToSides(), this._hero
						.getDesiredPosition().x));
				var posY =

				Math.min(this._tileMap.getPositionY()
						+ this._tileMap.getMapSize().height
						* this._tileMap.getTileSize().height
						- this._hero.getCenterToBottom(), Math.max(
						this._tileMap.getPositionY()
								+ this._hero.getCenterToBottom(), this._hero
								.getDesiredPosition().y));

				//
				// 地图层
				var wall = this._tileMap.getLayer("wall");
				/* 获得当前主角在地图中的格子位置 */
				var tiledPos = this.tileCoordForPosition(cc.p(posX
						- this._tileMap.getPositionX(), posY
						- this._tileMap.getPositionY()));
				/* 获取地图格子的唯一标识 */
				var tiledGid = wall.getTileGIDAt(tiledPos);

				if (tiledGid != 0) {
				} else {
					// 精灵位置
					this._hero.setPosition(cc.p(posX, posY));
					

				}
			},
			//更新敌人位置
			updateEnemyPosition:function(){
				if(this._enemyList && this._enemyList.length>0){
					for(var i=0,s=this._enemyList.length;i<s;i++){
						var enemy =this._enemyList [i];
						// 移动范围
						var posX = Math.min(this._tileMap.getPositionX()
								+ this._tileMap.getMapSize().width
								* this._tileMap.getTileSize().width
								- this._hero.getCenterToSides(), Math.max(this._tileMap
								.getPositionX()
								+ enemy.getCenterToSides(), enemy
								.getDesiredPosition().x));
						var posY =

						Math.min(this._tileMap.getPositionY()
								+ this._tileMap.getMapSize().height
								* this._tileMap.getTileSize().height
								- enemy.getCenterToBottom(), Math.max(
								this._tileMap.getPositionY()
										+ enemy.getCenterToBottom(), enemy
										.getDesiredPosition().y));

						//
						// 地图层
						var wall = this._tileMap.getLayer("wall");
						/* 获得当前主角在地图中的格子位置 */
						var tiledPos = this.tileCoordForPosition(cc.p(posX
								- this._tileMap.getPositionX(), posY
								- this._tileMap.getPositionY()));
						/* 获取地图格子的唯一标识 */
						var tiledGid = wall.getTileGIDAt(tiledPos);

						if (tiledGid != 0) {
						} else {
							// 精灵位置
							enemy.setPosition(cc.p(posX, posY));
							

						}
					}
				} 
			},
			// 更新位置
			updatePositions : function() {
				//更新英雄位置
				this.updateHeroPosition();
				//更新敌人位置
				this.updateEnemyPosition();
			},
			// 地图坐标
			tileCoordForPosition : function(pos) {
				var mapSize = this._tileMap.getMapSize();
				var tileSize = this._tileMap.getTileSize();

				var tileX = Math.floor(pos.x / tileSize.width) + 1;
				var tileY = Math
						.floor(mapSize.height - pos.y / tileSize.height); // Because
				// Tiled maps register in the  top  left corner rather than bottom left
				var tileCoord = cc.p(parseInt(tileX), parseInt(tileY));

				return tileCoord;
			},
			//释放内存
			release:function(){
				
				if(this._backTileMap){
				   //释放地图
				   this.removeChild(this._backTileMap);
				   this._backTileMap.release();
				   this._backTileMap=null;
			    }
				this._super();
			},
			//重新对batchNode排序
			reorderActors:function(){
				var clist=this._actors.getChildren();
				if(clist && clist.length>0){
					for(var i=0,s=clist.length;i<s;i++){
						var sprite =clist[i];
						this._actors.reorderChild(sprite ,this._tileMap.getMapSize().height
								* this._tileMap.getTileSize().height-sprite.getPositionY());
					}
				}
			},
			//初始化传送门
			initDoors :function(){
				var mapSize = this._tileMap.getMapSize();
				var group =this._tileMap.getObjectGroup("objects");
				var objects =group.getObjects();
				if(objects &&  objects.length>0){
					for(var i=0,s=objects.length;i<s;i++){
						var o =objects[i];
						
						if(o.type=='Door'){
							var door =cc.Sprite.createWithSpriteFrameName("0ACT1 2.png");
							door.setTextureRect(new cc.Rect(0,0,150,200),true);
							door.setPosition(o.x+this._tileMap.getPositionX()+o.width/2,o.y+this._tileMap.getPositionY()-o.height+100);
							this.addChild(door);
						}
					}
				}
			}

		});

GameLayer.create = function(cfg) {
	var sg = new GameLayer(cfg);
	if (sg && sg.init()) {
		return sg;
	}
	return null;
};

