//敌人
var Enemy =ActionSprite.extend({
	_nextDecisionTime :null,//��һ�ξ����ж���ʱ��
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