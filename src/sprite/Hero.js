var Hero = ActionSprite.extend({
	anim_frames_idle : [], // 站立
	anim_frames_walk : [], // 行走
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
		
	}
});