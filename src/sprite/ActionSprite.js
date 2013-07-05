//精灵状态
var ActionState ={
	kActionStateNone :0,
	kActionStateIdle :1,
	kActionStateAttack:2,
	kActionStateWalk:3,
	kActionStateHurt:4,
	kActionStateKnockedOut:5
} ;
var ActionSpriteSeries={
		
} ;


// 活动精灵
var ActionSprite = cc.Sprite
.extend({
	_hit_sprite:null ,//攻击效果精灵
	
	_idleAction :null,// 站立
	_attackAction :null,// 攻击
	_walkAction :null,// 行走
	_hurtAction :null,// 受伤
	_knockedOutAction :null,// 倒下
	
	_actionState :ActionState.kActionStateNone,
	_velocity :new cc.Point(0,0),
	_desiredPosition:new cc.Point(0,0),
	_isWalking:false,//正在行走
	
	//中心距离
	_centerToSides :35,
	_centerToBottom :35,
	
	ctor : function() {
		this._super();
	},
	//站立
	idle:function(){
		if (this._actionState!= ActionState.kActionStateIdle)
		{
			this.stopAllActions();
			
			
			this.runAction(this._idleAction);
			this._actionState = ActionState.kActionStateIdle;
			this._velocity = new cc.Point(0,0);
		}
		
	},
	//行走
	walkWithDirection:function(direction){
		if (this._actionState ==  ActionState.kActionStateIdle)//执行攻击动画
		{
			this.stopAllActions();
			
			if(this._hit_sprite)this._hit_sprite.stopAllActions();//停止攻击效果
			
			this.runAction(this._walkAction);
			this._actionState = ActionState.kActionStateWalk;
		}
		if (this._actionState == ActionState.kActionStateWalk)//行走移动位置
		{
			this._velocity = new cc.Point(direction.x * this._walkSpeed, direction.y * this._walkSpeed);
			if (this._velocity.x>= 0)
			{
				this.setScaleX(1.0);
				if(this._hit_sprite)this._hit_sprite.setScaleX(1.0);
			} 
			else
			{
				this.setScaleX(-1.0);
				if(this._hit_sprite)this._hit_sprite.setScaleX(-1.0);
			}
		}
	},
	
	//步速
    setWalkSpeed:function(s){
		this._walkSpeed =s;
	},
	
	//更新移动方向位置
	update:function(dt){
		if (this._actionState == ActionState.kActionStateWalk)
		{
			this._desiredPosition =new cc.Point(this.getPosition().x+this._velocity.x*dt ,this.getPosition().y+this._velocity.y*dt )
		}
	},
	//攻击完
	attackDone:function(){
		this.idle();
	},
	//攻击
	attack:function(){
		
		if (this._actionState ==ActionState. kActionStateIdle ||this. _actionState ==ActionState. kActionStateAttack || this._actionState == ActionState.kActionStateWalk)
		{
			this.stopAllActions();
			
			if(this._hit_sprite)this._hit_sprite.stopAllActions();//停止攻击效果
			
			this.runAction(this._attackAction);

			if(this._hit_sprite ){
				
				this._hit_sprite .runAction(this._attackHitAction );
			}
			this._actionState =ActionState. kActionStateAttack;
		}
	},
	//攻击效果精灵
	getHitSprite:function(){
		return this._hit_sprite;
	},
	//将要移动的位置
	getDesiredPosition:function(){
		return this._desiredPosition;
	},
	setDesiredPosition:function(p){
		this._desiredPosition=p;
	},
	setCenterToBottom:function(p){
		this._centerToBottom =p;
	},
	
	setCenterToSides:function(p){
		this._centerToSides =p;
	},
	getCenterToBottom:function(p){
		return this._centerToBottom ;
	},
	
	getCenterToSides:function(p){
		return this._centerToSides ;
	},
	
	setPosition:function(p){
		this._super(p);
		
		
		// 攻击效果位置
		if (this.getHitSprite()){
			this.getHitSprite().setPosition(
					this.getPosition());// 攻击效果
		}
	}
	
});