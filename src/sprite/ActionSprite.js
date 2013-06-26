
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
		
	}
});