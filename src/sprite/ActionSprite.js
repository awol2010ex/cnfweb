//����״̬
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


// �����
var ActionSprite = cc.Sprite
.extend({
	_hit_sprite:null ,//����Ч������
	
	_idleAction :null,// վ��
	_attackAction :null,// ����
	_walkAction :null,// ����
	_hurtAction :null,// ����
	_knockedOutAction :null,// ����
	
	_actionState :ActionState.kActionStateNone,
	_velocity :new cc.Point(0,0),
	_desiredPosition:new cc.Point(0,0),
	_isWalking:false,//��������
	
	//���ľ���
	_centerToSides :35,
	_centerToBottom :35,
	
	ctor : function() {
		this._super();
	},
	//վ��
	idle:function(){
		if (this._actionState!= ActionState.kActionStateIdle)
		{
			this.stopAllActions();
			
			
			this.runAction(this._idleAction);
			this._actionState = ActionState.kActionStateIdle;
			this._velocity = new cc.Point(0,0);
		}
		
	},
	//����
	walkWithDirection:function(direction){
		if (this._actionState ==  ActionState.kActionStateIdle)//ִ�й�������
		{
			this.stopAllActions();
			
			if(this._hit_sprite)this._hit_sprite.stopAllActions();//ֹͣ����Ч��
			
			this.runAction(this._walkAction);
			this._actionState = ActionState.kActionStateWalk;
		}
		if (this._actionState == ActionState.kActionStateWalk)//�����ƶ�λ��
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
	
	//����
    setWalkSpeed:function(s){
		this._walkSpeed =s;
	},
	
	//�����ƶ�����λ��
	update:function(dt){
		if (this._actionState == ActionState.kActionStateWalk)
		{
			this._desiredPosition =new cc.Point(this.getPosition().x+this._velocity.x*dt ,this.getPosition().y+this._velocity.y*dt )
		}
	},
	//������
	attackDone:function(){
		this.idle();
	},
	//����
	attack:function(){
		
		if (this._actionState ==ActionState. kActionStateIdle ||this. _actionState ==ActionState. kActionStateAttack || this._actionState == ActionState.kActionStateWalk)
		{
			this.stopAllActions();
			
			if(this._hit_sprite)this._hit_sprite.stopAllActions();//ֹͣ����Ч��
			
			this.runAction(this._attackAction);

			if(this._hit_sprite ){
				
				this._hit_sprite .runAction(this._attackHitAction );
			}
			this._actionState =ActionState. kActionStateAttack;
		}
	},
	//����Ч������
	getHitSprite:function(){
		return this._hit_sprite;
	},
	//��Ҫ�ƶ���λ��
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
		
		
		// ����Ч��λ��
		if (this.getHitSprite()){
			this.getHitSprite().setPosition(
					this.getPosition());// ����Ч��
		}
	}
	
});