function DBApp(){
    
}

DBApp.prototype = {
    db : null,
    DbHelper : null,
    IDTextField : null,
    nameTextField : null,
    run: function() {
        alert("in");
		var that = this,
    		saveCustommereButton = document.getElementById("saveCustommereButton"),
    		cancelSaveCustommerButton = document.getElementById("cancelSaveCustommerButton");
        
        that.IDTextField = document.getElementById("IDTextField");
        that.nameTextField = document.getElementById("nameTextField");
        
        saveCustommereButton.addEventListener("click",function(){
            that._insertRecords(that.IDTextField.value,that.nameTextField.value);
            that.DbHelperr.getAllTheData("1");
        })
        console.log(cancelSaveCustommerButton);
        alert("in");
		that.DbHelper = new DBHelper();
        alert("done");
        console.log(that.DbHelper);
        
	},
    _openDB : function(){
        var that = this;
        that.DbHelper.openDb();
    },
    _createTable : function(){
        var that = this;
        that.DbHelper.createTable();
       // that.DbHelper.getAllTheData();
    },
    _insertRecords : function(ID,name){
        var that = this;
        that.DbHelper.insertNewRecord(ID,name);
    },
    /*_onSuccess(){
        var that = this;
        that.DbHelperr.onSuccess();
    },
    _onError(){
        var that = this;
        that.DbHelperr.onError();
    }*/
    
};

/*function DBHelper2(){
    
}

DBHelper2.prototype = {
    openDb : function() {
        var that = this;
                if (window.sqlitePlugin !== undefined) {
                    that.db = window.sqlitePlugin.openDatabase("My Database");
                } else {
                    // For debugging in simulator fallback to native SQL Lite
                    that.db = window.openDatabase("My Database", "1.0", "Cordova Demo", 200000);
                     console.log("done");
                }
            },
    
	createTable : function() {
        var that = this;
        that.db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS CustommerTable (id INTEGER PRIMARY KEY ASC, custommer_id TEXT, custommer_name TEXT, added_date DATETIME)", []);
        });
    },
    
    insertNewRecord : function(ID,name) {
        var that = this;
        if(ID != null || $trim(ID) != "" && name != null || $trim(name) != ""){
            that.db.transaction(function(tx) {
            var cDate = new Date();
            tx.executeSql("INSERT INTO CustommerTable(custommer_id, custommer_name, added_date) VALUES (?,?,?)",
                          [ID, name, cDate],
                          that.onSuccess,
                          that.onError);
        });
        }
        
    },
    
    onSuccess : function(tx, r) {
        console.log("Your SQLite query was successful!");
    },

    onError : function(tx, e) {
        console.log("SQLite Error: " + e.message);
    },
    
    selectAllRecords : function(fn,ID) {
        var that = this;
        that.db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM CustommerTable WHERE custommer_id='"+ID+"'ORDER BY id", [],
                          fn,
                          that.onError);
        });
        //console.log(that.nameArr);
    }
    
    
};*/
/*app.addCustommer = kendo.observable({
    onShow: function() {
       //var DBAppp = new DBApp();
        //DBAppp.run();
       // DBAppp._openDB();
       // DBAppp._createTable();
    },
    afterShow: function() {}
});*/

