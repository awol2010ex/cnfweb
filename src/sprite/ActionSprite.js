
var ActionState ={
	kActionStateNone :0,
	kActionStateIdle :1,
	kActionStateAttack:2,
	kActionStateWalk:3,
	kActionStateHurt:4,
	kActionStateKnockedOut:5
} ;

// �����
var ActionSprite = cc.Sprite
.extend({
	_idleAction :null,// վ��
	_attackAction :null,// ����
	_walkAction :null,// ����
	_hurtAction :null,// ����
	_knockedOutAction :null,// ����
	
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