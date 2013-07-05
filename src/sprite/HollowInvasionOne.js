//��
ActionSpriteSeries.HollowInvasionOne=ActionSprite.extend({
	anim_frames_idle : [], // վ��
	anim_frames_walk : [], // ����
	anim_frames_attack : [], // ����
	anim_frames_attack_hit : [], // ����Ч��

	ctor : function() {
		this._super();

		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_HollowInvasion_plist);// ���ؾ���

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
		// ��ʼ֡
		this.initWithSpriteFrame(this.anim_frames_idle[0]);
		
		
	}
});
//��ͼ
ActionSpriteSeries.HollowInvasionOne.texture = s_HollowInvasion_png;