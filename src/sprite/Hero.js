var Hero = ActionSprite.extend({
	anim_frames_idle : [], // 站立
	anim_frames_walk : [], // 行走
	anim_frames_attack : [], // 攻击
	
	
	
	ctor : function() {
		this._super();

		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_ichigo_plist);// 加载精灵

		// idle
		for ( var i = 0; i <83; i++) {
			this.anim_frames_idle.push(cc.SpriteFrameCache.getInstance()
					.getSpriteFrame("ichigo_idle" + i + ".png"));
		}

		var idle_animation = cc.Animation.create(this.anim_frames_idle,
				1.0 / 12.0);
		
		this._idleAction =cc.RepeatForever.create( cc.Animate.create(idle_animation));
		// 初始帧
		this.initWithSpriteFrame(this.anim_frames_idle[0]);
		
		
		// walk
		for ( var i = 0; i <8; i++) {
			this.anim_frames_walk.push(cc.SpriteFrameCache.getInstance()
					.getSpriteFrame("ichigo_walk" + i + ".png"));
		}

		var walk_animation = cc.Animation.create(this.anim_frames_walk,
				1.0 / 6.0);
		
		this._walkAction =cc.RepeatForever.create( cc.Animate.create(walk_animation));
		
		

		// attack
		for ( var i = 0; i <10; i++) {
			this.anim_frames_attack.push(cc.SpriteFrameCache.getInstance()
					.getSpriteFrame("ichigo_attack_one" + i + ".png"));
		}

		var attack_animation = cc.Animation.create(this.anim_frames_attack,
				1.0 / 12.0);
		var callFunc = cc.CallFunc.create(this.attackDone, this, null);// 攻击完站立
		this._attackAction =cc.Sequence.create( cc.Animate.create(attack_animation),callFunc);
		
		
		this._hit_sprite  =new cc.Sprite();//攻击效果
		
		//攻击效果
		
		
	}
});