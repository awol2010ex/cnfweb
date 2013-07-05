//虚
ActionSpriteSeries.HollowInvasionOne=ActionSprite.extend({
	anim_frames_idle : [], // 站立
	anim_frames_walk : [], // 行走
	anim_frames_attack : [], // 攻击
	anim_frames_attack_hit : [], // 攻击效果

	ctor : function() {
		this._super();

		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_HollowInvasion_plist);// 加载精灵

		// idle
		for ( var i = 0; i < 5; i++) {

			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"HollowInvasionOne_idle" + i + ".png");

			//frame.setOffset(new cc.Point(109, 111));

			this.anim_frames_idle.push(frame);
		}

		var idle_animation = cc.Animation.create(this.anim_frames_idle,
				1.0 / 6.0);

		this._idleAction = cc.RepeatForever.create(cc.Animate
				.create(idle_animation));
		// 初始帧
		this.initWithSpriteFrame(this.anim_frames_idle[0]);
		
		
	}
});
//贴图
ActionSpriteSeries.HollowInvasionOne.texture = s_HollowInvasion_png;