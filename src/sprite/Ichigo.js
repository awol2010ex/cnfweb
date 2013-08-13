//一护
ActionSpriteSeries.Ichigo = ActionSprite.extend({
	anim_frames_idle : [], //idle
	anim_frames_walk : [], //walk
	anim_frames_attack_one : [], // attack1
	anim_frames_attack_one_hit : [], // attack hit1
	anim_frames_attack_two : [], // attack2
	anim_frames_attack_two_hit : [], // attack hit2
	anim_frames_attack_three : [], // attack3
	anim_frames_attack_three_hit : [], // attack hit3
	ctor : function() {
		this._super();


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
		//初始帧
		this.initWithSpriteFrame(this.anim_frames_idle[0]);

		// walk
		for ( var i = 0; i < 6; i++) {
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"ichigo_run" + i + ".png")

			//frame.setOffset(new cc.Point(-42, 88));
		    frame.setOffset(new cc.Point(-11, -13));

			this.anim_frames_walk.push(frame);
		}

		var walk_animation = cc.Animation.create(this.anim_frames_walk,
				1.0 / 6.0);

		this._walkAction = cc.RepeatForever.create(cc.Animate
				.create(walk_animation));

		// attack1
		for ( var i = 0; i < 7; i++) {
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"ichigo_attack_one" + i + ".png");

			//frame.setOffset(new cc.Point(-50, 98));
			frame.setOffset(new cc.Point(-19, -3));
			this.anim_frames_attack_one.push(frame);
		}

		var attack_one_animation = cc.Animation.create(this.anim_frames_attack_one,
				1.0 / 30.0);
		var callFunc = cc.CallFunc.create(this.attackDone, this, null);// 攻击后站立
		
		
		this._attackOneAction= cc.Sequence.create(cc.Animate
				.create(attack_one_animation), callFunc);
		
		this._attackAction =this._attackOneAction;

	
		// attack1
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

			this.anim_frames_attack_one_hit.push(frame);
		}
		this.emptyFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
				"ichigo_attack_one_hit0.png");
		this.emptyFrame .setRect(new cc.Rect(0, 0, 0, 0));
		
		
		this.anim_frames_attack_one_hit.push(this.emptyFrame );

		var attack_one_hit_animation = cc.Animation.create(
				this.anim_frames_attack_one_hit, 1.0 / 30.0);
		
		
		this._attackOneHitAction = cc.Sequence.create( cc.DelayTime.create(2.0 / 30.0),cc.Animate
				.create(attack_one_hit_animation));
		
		this._attackHitAction = this._attackOneHitAction;

		
		
		
		
		// attack2
		for ( var i = 0; i < 8; i++) {
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"ichigo_attack_two" + i + ".png");

			//frame.setOffset(new cc.Point(-50, 80));
			frame.setOffset(new cc.Point(-19, -21));
			this.anim_frames_attack_two.push(frame);
		}

		var attack_two_animation = cc.Animation.create(this.anim_frames_attack_two,
				1.0 / 30.0);
		var callFunc = cc.CallFunc.create(this.attackDone, this, null);// 攻击后站立
		
		
		this._attackTwoAction= cc.Sequence.create(cc.Animate
				.create(attack_two_animation), callFunc);
		
		
		
		
		

		// attack2
		for ( var i = 0; i < 6; i++) {
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"ichigo_attack_two_hit" + i + ".png");
			if (i == 0)
				//frame.setOffset(new cc.Point(-49, 69));
				frame.setOffset(new cc.Point(-18, -32));
			if (i == 1)
				//frame.setOffset(new cc.Point(-13, 62));
			    frame.setOffset(new cc.Point(18, -39));
			if (i == 2)
				//frame.setOffset(new cc.Point(-30, 94));
				frame.setOffset(new cc.Point(1, -7));
			if (i == 3)
				//frame.setOffset(new cc.Point(15, 94));
				frame.setOffset(new cc.Point(46, -7));
			if (i == 4)
				//frame.setOffset(new cc.Point(15, 95));
				frame.setOffset(new cc.Point(46, -6));
			if (i == 5)
				//frame.setOffset(new cc.Point(15, 95));
				frame.setOffset(new cc.Point(46, -6));

			this.anim_frames_attack_two_hit.push(frame);
		}//攻击效果
		this.anim_frames_attack_two_hit.push(this.emptyFrame );

		var attack_two_hit_animation = cc.Animation.create(
				this.anim_frames_attack_two_hit, 1.0 / 30.0);
		
		
		this._attackTwoHitAction = cc.Sequence.create( cc.DelayTime.create(2.0 / 30.0),cc.Animate
				.create(attack_two_hit_animation));
		
		
		//this._attackHitAction = this._attackTwoHitAction;
		//this._attackAction =this._attackTwoAction;
		
		
		

		
		
		// attack3
		for ( var i = 0; i < 8; i++) {
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"ichigo_attack_three" + i + ".png");
			/*
			if (i == 0)
			//frame.setOffset(new cc.Point(-28, 166));
			frame.setOffset(new cc.Point(3, 65));
			
			if (i == 1)
				//frame.setOffset(new cc.Point(-29, 160));
				frame.setOffset(new cc.Point(2,59));
			this.anim_frames_attack_three.push(frame);
			
			if (i == 2)
				//frame.setOffset(new cc.Point(-29, 152));
				frame.setOffset(new cc.Point(2,41));
			
			if (i == 3)
				//frame.setOffset(new cc.Point(-37, 138));
				frame.setOffset(new cc.Point(-6,27));
			this.anim_frames_attack_three.push(frame);
			
			if (i == 4)
				//frame.setOffset(new cc.Point(-37, 117));
				frame.setOffset(new cc.Point(-6,16));
			this.anim_frames_attack_three.push(frame);
			
			if (i == 5)
				//frame.setOffset(new cc.Point(-44, 57));
				frame.setOffset(new cc.Point(-13,44));
			this.anim_frames_attack_three.push(frame);
			
			if (i == 6)
				//frame.setOffset(new cc.Point(-44, 56));
				frame.setOffset(new cc.Point(-13,43));
			this.anim_frames_attack_three.push(frame);
			
			if (i == 7)
				//frame.setOffset(new cc.Point(-44, 56));
				frame.setOffset(new cc.Point(-13,43));
				*/
			this.anim_frames_attack_three.push(frame);
		}

		var attack_three_animation = cc.Animation.create(this.anim_frames_attack_three,
				1.0 / 30.0);
		var callFunc = cc.CallFunc.create(this.attackDone, this, null);// 攻击后站立
		
		
		this._attackThreeAction= cc.Sequence.create(cc.Animate
				.create(attack_three_animation), callFunc);
		
		
		
		
		

		// attack3
		for ( var i = 0; i < 3; i++) {
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(
					"ichigo_attack_three_hit" + i + ".png");
			/*
			if (i == 0)
				//frame.setOffset(new cc.Point(-118, 194));
				frame.setOffset(new cc.Point(-87, 83));
			if (i == 1)
				//frame.setOffset(new cc.Point(-133, 225));
			    frame.setOffset(new cc.Point(-102, 124));
			if (i == 2)
				//frame.setOffset(new cc.Point(-141, 245));
				frame.setOffset(new cc.Point(-110, 144));
            */
			this.anim_frames_attack_three_hit.push(frame);
		}//攻击效果
		this.anim_frames_attack_three_hit.push(this.emptyFrame );

		var attack_three_hit_animation = cc.Animation.create(
				this.anim_frames_attack_three_hit, 1.0 / 30.0);
		
		
		this._attackThreeHitAction = cc.Sequence.create( cc.DelayTime.create(8.0 / 30.0),cc.Animate
				.create(attack_three_hit_animation));
		
		
		//this._attackHitAction = this._attackThreeHitAction;
		//this._attackAction =this._attackThreeAction;
		
		
		
		
		this._hit_sprite = cc.Sprite.createWithSpriteFrame(this.emptyFrame );
		
	},
	getCharacterId:function(){
		return "Ichigo";
	}
});