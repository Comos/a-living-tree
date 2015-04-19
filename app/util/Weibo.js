define(function(require, exports, module) {
	var Weibo = function(appKey) {
		this._appKey = appKey;
	};
	Weibo.prototype = {
		"login": function(callback) {
			WB2.login(function() {
				if (!callback) {
					return;
				}
				callback();
			});
		},
		"logout" : function(callback) {
			WB2.logout(function() {
				if (!callback) {
					return;
				}
				callback();
			});
		},
		"isLogged" : function() {
			return WB2.checkLogin() == 'true' || WB2.checkLogin() === true;
		},
		"getUserInfo" : function(uid, callback) {
			WB2.anyWhere(function(W){
		        W.parseCMD('/users/show.json', function(oResult, bStatus) 
		        {
	                if(bStatus) {
	                    callback(oResult);
	                }
		        },
		        {
		        	'uid' : uid,
		        	'source' : this._appKey
		        },
		        {
		        	method : 'get',
		        	cache_time : 30
		        });
		    });
		},
		"getUid" : function(callback, errorCallback) {
			WB2.anyWhere(function(W){
				W.parseCMD('/account/get_uid.json', function(oResult, bStatus) 
		        {
					if(bStatus) {
						callback(oResult);
	                } else {
	                	if (errorCallback) {
	                		errorCallback(oResult);
	                	}
	                	Console.log('fail to get Uid');
	                }
		        },
		        {
			        'source' : this._appKey
			    },
			    {
			        method : 'get',
			        cache_time : 30
		        });
	    	});
		},
		"share" : function(text, callback, errorCallback) {
	        WB2.anyWhere(function(W){
	            W.parseCMD('/statuses/update.json', function(oResult, bStatus) 
	            {
                    if(bStatus) {
                        callback(oResult);
                    } else {
	                	if (errorCallback) {
	                		errorCallback(oResult);
	                	}
	                	Console.log('fail to get Uid');
	                }
	            },
	            {
	            	'status' : encodeURIComponent(text),
	            	'source' : this._appKey
	            },
	            {
	            	method : 'post'
	            });
	        });
		}
	};
	return Weibo;
});