var Hero = ActionSprite.extend({
	anim_frames_idle : [], // վ��
	ctor : function() {
		this._super();

		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_ichigo_plist);// ���ؾ���

		// idle
		for ( var i = 0; i <83; i++) {
			this.anim_frames_idle.push(cc.SpriteFrameCache.getInstance()
					.getSpriteFrame("ichigo_idle" + i + ".png"));
		}

		var idle_animation = cc.Animation.create(this.anim_frames_idle,
				1.0 / 12.0);
		
		this._idleAction =cc.RepeatForever.create( cc.Animate.create(idle_animation));
		// ��ʼ֡
		this.initWithSpriteFrame(this.anim_frames_idle[0]);
	}
});