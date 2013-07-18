


/**
 * Used to display the loading screen
 * @class
 * @extends cc.Scene
 */
var MyLoaderScene = cc.Scene.extend(/** @lends cc.LoaderScene# */{
    _logo:null,
    _logoTexture:null,
    _texture2d:null,
    _bgLayer:null,
    _label:null,

    /**
     * Constructor
     */
    ctor:function () {
        this._super();
        this._logoTexture = new Image();
        var _this = this;
        this._logoTexture.addEventListener("load", function () {
            _this.initStage();
        });
        this._logoTexture.src = s_startup_img;
        var winSize = cc.Director.getInstance().getWinSize();
        this._logoTexture.width = winSize.width;
        this._logoTexture.height = winSize.height;
    },

    /**
     * init stage
     */
    initStage:function () {
        // bg
        this._bgLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 255));
        this._bgLayer.setPosition(cc.p(0, 0));
        this.addChild(this._bgLayer, 0);

        //logo
        var winSize = cc.Director.getInstance().getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        var logoHeight = 200;

        if (cc.renderContextType === cc.CANVAS) {
            this._logo = cc.Sprite.createWithTexture(this._logoTexture);
            this._logo.setPosition(centerPos);
            this._bgLayer.addChild(this._logo, 10);
        } else {
            this._texture2d = new cc.Texture2D();
            this._texture2d.initWithElement(this._logoTexture);
            this._texture2d.handleLoadedTexture();

            if (this._texture2d) {
                this._logo = cc.Sprite.createWithTexture(this._texture2d);
                this._logo.setPosition(centerPos);
                this._bgLayer.addChild(this._logo, 10);
                logoHeight = this._logo.getContentSize().height;
            }
        }

        //loading percent
        this._label = cc.LabelTTF.create("正在加载资源... 0%", "宋体", 30);
        this._label.setColor(cc.c3(83,231,27));
        this._label.setOpacity(0);
        this._label.setPosition(cc.p(winSize.width / 2, 30));
        this._bgLayer.addChild(this._label,11);

        this._logoFadeIn();

        //load resources
        this.schedule(this._startLoading, 0.3);
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} selector
     * @param {Object} target
     */
    initWithResources:function (resources, selector, target) {
        this.resources = resources;
        this.selector = selector;
        this.target = target;
    },

    _startLoading:function () {
        this.unschedule(this._startLoading);
        cc.Loader.preload(this.resources, this.selector, this.target);
        this.schedule(this._updatePercent);
    },

    _logoFadeIn:function () {
        var logoAction = cc.Spawn.create(
            cc.EaseBounce.create(cc.MoveBy.create(0.25, cc.p(0, 10))),
            cc.FadeIn.create(0.5));

        var labelAction = cc.Sequence.create(
            cc.DelayTime.create(0.15),
            logoAction.copy());
        this._logo.runAction(logoAction);
        this._label.runAction(labelAction);
    },

    _updatePercent:function () {
        var percent = cc.Loader.getInstance().getPercentage();
        var tmpStr = "正在加载资源... " + percent + "%";
        this._label.setString(tmpStr);

        if (percent >= 100) {
            this.unschedule(this._updatePercent);
        }
    }
});

MyLoaderScene.preload = function (resources, selector, target) {
    if (!this._instance) {
        this._instance = new MyLoaderScene();
        this._instance.init();
    }

    var director = cc.Director.getInstance();
    if (director.getRunningScene()) {
        director.replaceScene(this._instance);
    } else {
        director.runWithScene(this._instance);
    }

    this._instance.initWithResources(resources, selector, target);
    return this._instance;
};