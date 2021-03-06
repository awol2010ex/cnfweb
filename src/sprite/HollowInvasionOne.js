//虚
ActionSpriteSeries.HollowInvasionOne=Enemy.extend({
	anim_frames_idle : [], 
	anim_frames_walk : [], 
	anim_frames_attack : [],
	anim_frames_attack_hit : [], 
	anim_frames_hurt : [],
	ctor : function() {
		this._super();


		// idle
		for ( var i = 0; i < 5; i++) {

			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"HollowInvasionOne_idle" + i + ".png");

			//frame.setOffset(new cc.Point(-109, 111));

			this.anim_frames_idle.push(frame);
		}

		var idle_animation = cc.Animation.create(this.anim_frames_idle,
				1.0 / 6.0);

		this._idleAction = cc.RepeatForever.create(cc.Animate
				.create(idle_animation));
		
		
		
		// walk
		for ( var i = 0; i < 5; i++) {

			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"HollowInvasionOne_walk" + i + ".png");

			////frame.setOffset(new cc.Point(-71, 94));

			this.anim_frames_walk.push(frame);
		}

		var walk_animation = cc.Animation.create(this.anim_frames_walk,
				1.0 / 6.0);

		this._walkAction = cc.RepeatForever.create(cc.Animate
				.create(walk_animation));
		this.initWithSpriteFrame(this.anim_frames_idle[0]);
		
		// hurt
		for ( var i = 0; i < 4; i++) {

			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"HollowInvasionOne_hurt" + i + ".png");

			////frame.setOffset(new cc.Point(-71, 94));

			this.anim_frames_hurt.push(frame);
		}
		var hurt_animation = cc.Animation.create(this.anim_frames_hurt,
				1.0 / 12.0);
		var callFunc = cc.CallFunc.create(this.attackDone, this, null);// 攻击后站立
		this._hurtAction = cc.Sequence.create(cc.Animate
				.create(hurt_animation), callFunc);
	},
	getCharacterId:function(){
		return "HollowInvasionOne";
	}
});