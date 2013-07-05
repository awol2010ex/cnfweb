//游戏图层
var GameLayer = cc.Layer
		.extend({
			_backTileMap : null,// 背景
			_hero : null,// 主角
			_key_list : {},
			_actors : null,
			init : function() {
				var bRet = false;
				if (this._super()) {

					// 控制
					this.initControll();
					// 背景地图
					this.initBackground();

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
				this._tileMap = cc.TMXTiledMap.create(s_0000000_hotel_tmx);

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

				//英雄batch
				this._actors = cc.SpriteBatchNode.create(ActionSpriteSeries.Ichigo.texture);
				if (this._actors.getTexture()
						&& this._actors.getTexture().setAliasTexParameters) {
					this._actors.getTexture().setAliasTexParameters();
				}
				this.addChild(this._actors, -4);

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

				//敌人batch
				this._actors_enemys = cc.SpriteBatchNode.create(ActionSpriteSeries.HollowInvasionOne.texture);
				if (this._actors_enemys.getTexture()
						&& this._actors_enemys.getTexture().setAliasTexParameters) {
					this._actors_enemys.getTexture().setAliasTexParameters();
				}
				this.addChild(this._actors_enemys, -8);
				
				this._hollowInvasionOne= new ActionSpriteSeries.HollowInvasionOne();//敌人
				this._hollowInvasionOne.setPosition(new cc.Point(winSize.width / 2+190,
						winSize.height / 2 - 150));// 位置

				this._hollowInvasionOne.setDesiredPosition( this._hero.getPosition() );
				
				this._actors_enemys.addChild(this._hollowInvasionOne);
				
				this._hollowInvasionOne.idle();//站立

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
					// 攻击效果位置
					if (this._hero.getHitSprite())
						this._hero.getHitSprite().setPosition(
								this._hero.getPosition());// 攻击效果

				}
			},
			// 更新位置
			updatePositions : function() {
				//更新英雄位置
				this.updateHeroPosition();
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
				this._super.release.call(this);
			}

		});

GameLayer.create = function() {
	var sg = new GameLayer();
	if (sg && sg.init()) {
		return sg;
	}
	return null;
};

