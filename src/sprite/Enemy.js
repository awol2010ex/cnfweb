//敌人
var Enemy =ActionSprite.extend({
	_nextDecisionTime :null,//下一次决定行动的时间
	ctor : function() {
		this._super();
		
		this._nextDecisionTime =new Date().getTime();
	},
	setNextDecisionTime:function(t){
		this._nextDecisionTime =t;
	},
	getNextDecisionTime:function(){
		return this._nextDecisionTime ;
	}
});