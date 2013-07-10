//��Ϸͼ��
var GameLayer = cc.Layer
		.extend({
			_backTileMap : null,// ����
			_tileMapName: null,//��ͼ·��
			_hero : null,// ����
			_enemyList : [],// ����
			_key_list : {},//�����¼�
			_actors:null,
			ctor :function(cfg){
				this._tileMapName =cfg._tileMapName;//��ͼ·��
			},
			init : function() {
				var bRet = false;
				if (this._super()) {

					cc.SpriteFrameCache.getInstance().addSpriteFrames(s_cnf_plist);// ���ؾ���
					//Ӣ��batch
					this._actors = cc.SpriteBatchNode.create(s_cnf_png);

					this.addChild(this._actors, -4);
					// ����
					this.initControll();
					// ������ͼ
					this.initBackground();
					//��ʼ��������
					this.initDoors();

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
				this._tileMap = cc.TMXTiledMap.create(this._tileMapName);

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

				
				if (this._actors.getTexture()
						&& this._actors.getTexture().setAliasTexParameters) {
					this._actors.getTexture().setAliasTexParameters();
				}

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

				if (this._actors.getTexture()
						&& this._actors.getTexture().setAliasTexParameters) {
					this._actors.getTexture().setAliasTexParameters();
				}
				
				var _hollowInvasionOne= new ActionSpriteSeries.HollowInvasionOne();//����
				_hollowInvasionOne.setPosition(new cc.Point(winSize.width / 2+190,
						winSize.height / 2 - 100));// λ��

			    _hollowInvasionOne.setDesiredPosition( _hollowInvasionOne.getPosition() );
				
			    _hollowInvasionOne.setWalkSpeed(80);// ����
			    this._enemyList.push(_hollowInvasionOne);
			    
				this._actors.addChild(_hollowInvasionOne);
				
				
				var _hollowInvasionTwo= new ActionSpriteSeries.HollowInvasionOne();//����
				_hollowInvasionTwo.setPosition(new cc.Point(winSize.width / 2+250,
						winSize.height / 2 - 100));// λ��

				_hollowInvasionTwo.setDesiredPosition( _hollowInvasionTwo.getPosition() );
				
				_hollowInvasionTwo.setWalkSpeed(80);// ����
			    this._enemyList.push(_hollowInvasionTwo);
			    
				this._actors.addChild(_hollowInvasionTwo);
				
				_hollowInvasionTwo.idle();
				_hollowInvasionOne.idle();//վ��

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

				//���µ���
				this.updateEnemys(dt);
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
				
				//���¶�batchNode����
				this.reorderActors();
			},
			//���µ���
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
							
							//����������
							enemy.walkWithDirection(moveDirection);
						}else{
							enemy.idle();//վ��
						}
						//��һ����Ϊʱ��
						enemy.setNextDecisionTime(new Date().getTime()+1000*Math.random()*3);
					}
				} 
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
					

				}
			},
			//���µ���λ��
			updateEnemyPosition:function(){
				if(this._enemyList && this._enemyList.length>0){
					for(var i=0,s=this._enemyList.length;i<s;i++){
						var enemy =this._enemyList [i];
						// �ƶ���Χ
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
							enemy.setPosition(cc.p(posX, posY));
							

						}
					}
				} 
			},
			// ����λ��
			updatePositions : function() {
				//����Ӣ��λ��
				this.updateHeroPosition();
				//���µ���λ��
				this.updateEnemyPosition();
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
				this._super();
			},
			//���¶�batchNode����
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
			//��ʼ��������
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

