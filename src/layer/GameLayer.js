//��Ϸͼ��
var GameLayer = cc.Layer
		.extend({
			_backTileMap : null,// ����
			_hero : null,// ����
			_key_list : {},
			_actors : null,
			init : function() {
				var bRet = false;
				if (this._super()) {

					// ����
					this.initControll();
					// ������ͼ
					this.initBackground();

					// ����
					this.initHero();

					//����
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
			initBackground : function() {// ������ͼ
				// tilemap
				this._tileMap = cc.TMXTiledMap.create(s_0000000_hotel_tmx);

				var contentSize = this._tileMap.getContentSize();// ��ͼ��С
				var winSize = cc.Director.getInstance().getWinSize();// ��Ļ��С
				this._tileMap.setPosition(new cc.Point(winSize.width / 2
						- contentSize.width / 2, winSize.height / 2
						- contentSize.height / 2));
				// �����
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
			// ����
			initHero : function() {
				var winSize = cc.Director.getInstance().getWinSize();// ��Ļ��С

				//Ӣ��batch
				this._actors = cc.SpriteBatchNode.create(ActionSpriteSeries.Ichigo.texture);
				if (this._actors.getTexture()
						&& this._actors.getTexture().setAliasTexParameters) {
					this._actors.getTexture().setAliasTexParameters();
				}
				this.addChild(this._actors, -4);

				this._hero = new ActionSpriteSeries.Ichigo();// ����

				this._hero.setPosition(new cc.Point(winSize.width / 2,
						winSize.height / 2 - 150));// λ��

				this._hero.setDesiredPosition( this._hero.getPosition());
				this._hero.setWalkSpeed(160);// ����
				this._hero._gameLayer = this;// ��Ϸ��

				if (this._hero.getHitSprite())
					this._hero._hit_sprite
							.setPosition(this._hero.getPosition());// ����Ч��

				this._actors.addChild(this._hero);
				this._actors.addChild(this._hero.getHitSprite());

				this._hero.idle();
			},
			
			//��ʼ������
			initEnemys :function(){
				var winSize = cc.Director.getInstance().getWinSize();// ��Ļ��С

				//����batch
				this._actors_enemys = cc.SpriteBatchNode.create(ActionSpriteSeries.HollowInvasionOne.texture);
				if (this._actors_enemys.getTexture()
						&& this._actors_enemys.getTexture().setAliasTexParameters) {
					this._actors_enemys.getTexture().setAliasTexParameters();
				}
				this.addChild(this._actors_enemys, -8);
				
				this._hollowInvasionOne= new ActionSpriteSeries.HollowInvasionOne();//����
				this._hollowInvasionOne.setPosition(new cc.Point(winSize.width / 2+190,
						winSize.height / 2 - 150));// λ��

				this._hollowInvasionOne.setDesiredPosition( this._hero.getPosition() );
				
				this._actors_enemys.addChild(this._hollowInvasionOne);
				
				this._hollowInvasionOne.idle();//վ��

			},
			
			// �����
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
			// ����
			onKeyUp : function(key) {
				this._key_list[key] = 0;// �ɿ�
				var d = this.getDirection();
				if (d.x == 0 && d.y == 0) {
					this._hero._isWalking = false;
				}
			},
			// ȡ�÷���
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

				this._hero.update(dt);// ����Ӣ��

				// վ��
				if (!this._hero._isWalking
						&& this._hero._actionState == ActionState.kActionStateWalk) {

					this._hero.idle();
				} else
				// ����
				if (this._hero._isWalking) {

					this._hero.walkWithDirection(this.getDirection());
				}
				// ����λ��
				this.updatePositions();
			},
			//����Ӣ��λ��
			updateHeroPosition:function(){
				// �ƶ���Χ
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
				// ��ͼ��
				var wall = this._tileMap.getLayer("wall");
				/* ��õ�ǰ�����ڵ�ͼ�еĸ���λ�� */
				var tiledPos = this.tileCoordForPosition(cc.p(posX
						- this._tileMap.getPositionX(), posY
						- this._tileMap.getPositionY()));
				/* ��ȡ��ͼ���ӵ�Ψһ��ʶ */
				var tiledGid = wall.getTileGIDAt(tiledPos);

				if (tiledGid != 0) {
				} else {
					// ����λ��
					this._hero.setPosition(cc.p(posX, posY));
					// ����Ч��λ��
					if (this._hero.getHitSprite())
						this._hero.getHitSprite().setPosition(
								this._hero.getPosition());// ����Ч��

				}
			},
			// ����λ��
			updatePositions : function() {
				//����Ӣ��λ��
				this.updateHeroPosition();
			},
			// ��ͼ����
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
			//�ͷ��ڴ�
			release:function(){
				
				if(this._backTileMap){
				   //�ͷŵ�ͼ
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

