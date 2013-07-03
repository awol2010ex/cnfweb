var Hero = ActionSprite.extend({
	anim_frames_idle : [], // 站立
	anim_frames_walk : [], // 行走
	anim_frames_attack : [], // 攻击
	anim_frames_attack_hit : [], // 攻击效果

	ctor : function() {
		this._super();

		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_ichigo_plist);// 加载精灵

		// idle
		for ( var i = 0; i < 83; i++) {

			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"ichigo_idle" + i + ".png");

			//frame.setOffset(new cc.Point(-31, 101));

			this.anim_frames_idle.push(frame);
		}

		var idle_animation = cc.Animation.create(this.anim_frames_idle,
				1.0 / 12.0);

		this._idleAction = cc.RepeatForever.create(cc.Animate
				.create(idle_animation));
		// 初始帧
		this.initWithSpriteFrame(this.anim_frames_idle[0]);

		// walk
		for ( var i = 0; i < 8; i++) {
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"ichigo_walk" + i + ".png")

			//frame.setOffset(new cc.Point(-30, 100));
		    frame.setOffset(new cc.Point(1, -1));

			this.anim_frames_walk.push(frame);
		}

		var walk_animation = cc.Animation.create(this.anim_frames_walk,
				1.0 / 6.0);

		this._walkAction = cc.RepeatForever.create(cc.Animate
				.create(walk_animation));

		// attack
		for ( var i = 0; i < 7; i++) {
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"ichigo_attack_one" + i + ".png");

			//frame.setOffset(new cc.Point(-50, 98));
			frame.setOffset(new cc.Point(-19, -3));
			this.anim_frames_attack.push(frame);
		}

		var attack_animation = cc.Animation.create(this.anim_frames_attack,
				1.0 / 12.0);
		var callFunc = cc.CallFunc.create(this.attackDone, this, null);// 攻击完站立
		this._attackAction = cc.Sequence.create(cc.Animate
				.create(attack_animation), callFunc);

		// 攻击效果
		// attack
		for ( var i = 0; i < 5; i++) {
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"ichigo_attack_one_hit" + i + ".png");
			if (i == 0)
				//frame.setOffset(new cc.Point(-61, 159));
				frame.setOffset(new cc.Point(-30, 58));
			if (i == 1)
				//frame.setOffset(new cc.Point(-43, 159));
			    frame.setOffset(new cc.Point(-12, 58));
			if (i == 2)
				//frame.setOffset(new cc.Point(27, 153));
				frame.setOffset(new cc.Point(58, 52));
			if (i == 3)
				//frame.setOffset(new cc.Point(27, 81));
				frame.setOffset(new cc.Point(58, -20));
			if (i == 4)
				//frame.setOffset(new cc.Point(27, 81));
				frame.setOffset(new cc.Point(58, -20));

			this.anim_frames_attack_hit.push(frame);
		}
		
		//攻击效果 初始帧
		this.emptyFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
				"ichigo_attack_one_hit0.png");
		this.emptyFrame .setRect(new cc.Rect(0, 0, 0, 0));
		
		
		this.anim_frames_attack_hit.push(this.emptyFrame );
		//攻击效果
		var attack_hit_animation = cc.Animation.create(
				this.anim_frames_attack_hit, 1.0 / 12.0);
		this._attackHitAction = cc.Sequence.create( cc.DelayTime.create(2.0 / 12.0),cc.Animate
				.create(attack_hit_animation));

		
		this._hit_sprite = cc.Sprite.createWithSpriteFrame(this.emptyFrame );// 攻击效果初始空白
		
		
	}
});