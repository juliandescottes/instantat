var MongoStore = function (db, collection, key) {
	this.url = "https://api.mongolab.com/api/1/databases/"+db+"/collections/"+collection;
	this.key = key;
};

MongoStore.prototype._getXHR = function () {
	return new aria.core.transport.BaseXHR();
};

MongoStore.prototype.get = function (oid, callback) {
	this._getXHR().request({
	    url: this.url + "?" + this.key + "&q={'_id': { '$oid' : '"+oid+"'}}",
	    method: "GET"
	}, {
	    fn: function (a, b, res) {
	    	if (res.status == 200) {
	    		eval("var results = " + res.responseText);
	    		if (results && results.length == 1) {
		    		callback.call(null, results[0]);
	    		} else {
		    		callback.call(null, null, "No snippet found for id : " + oid);
	    		}
	    	} else {
	    		callback.call(null, null, "Unexpected error while retrieving : " + oid);
	    	}
	    	
	    },
	    scope: this
    });
};

MongoStore.prototype.save = function (object, callback) {
	this._getXHR().request({
	    url: this.url + "?" + this.key, data : JSON.stringify(object),
	    headers : {"Content-Type":"application/json"}, method: "POST"
	}, {
	    fn: function (a, b, res) {
	    	eval("var result = " + res.responseText);
	    	callback.call(null, result)
	    },
	    scope: this
    });
};

MongoStore.prototype.list = function (callback) {
	this._getXHR().request({
	    url: this.url + "?" + this.key,
	    method: "GET"
	}, {
	    fn: function (a, b, res) {
	    	if (res.status == 200) {
	    		eval("var results = " + res.responseText);
	    		callback.call(null, results);
	    	} else {
	    		callback.call(null, null, "Unexpected error");
	    	}
	    },
	    scope: this
    });
};