//精灵状态
var ActionState ={
	kActionStateNone :0,
	kActionStateIdle :1,
	kActionStateAttack:2,
	kActionStateWalk:3,
	kActionStateHurt:4,
	kActionStateKnockedOut:5
} ;

// 活动精灵
var ActionSprite = cc.Sprite
.extend({
	_idleAction :null,// 站立
	_attackAction :null,// 攻击
	_walkAction :null,// 行走
	_hurtAction :null,// 受伤
	_knockedOutAction :null,// 倒下
	
	_actionState :ActionState.kActionStateNone,
	_velocity :new cc.Point(0,0),
	_desiredPosition:new cc.Point(0,0),
	_isWalking:false,//正在行走
	
	_hit_sprite :null ,//效果精灵
	_attackHitAction :null , //攻击效果
	_gameLayer :null ,
	ctor : function() {
		this._super();
	},
	
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
		if (this._actionState ==  ActionState.kActionStateIdle)
		{
			this.stopAllActions();
			this.runAction(this._walkAction);
			this._actionState = ActionState.kActionStateWalk;
		}
		if (this._actionState == ActionState.kActionStateWalk)
		{
			this._velocity = new cc.Point(direction.x * this._walkSpeed, direction.y * this._walkSpeed);
			if (this._velocity.x>= 0)
			{
				this.setScaleX(1.0);
			} 
			else
			{
				this.setScaleX(-1.0);
			}
		}
	},
    setWalkSpeed:function(s){
		this._walkSpeed =s;
	},
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
	attack:function(){
		
		if (this._actionState ==ActionState. kActionStateIdle ||this. _actionState ==ActionState. kActionStateAttack || this._actionState == ActionState.kActionStateWalk)
		{
			this.stopAllActions();
			this.runAction(this._attackAction);
			this._actionState =ActionState. kActionStateAttack;
		}
	}
});