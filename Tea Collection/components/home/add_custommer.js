'use strict';
function showAdd(){
     alert("in");
    var DBAppp = new DBApp();
     alert("1");
    DBAppp.run();
    DBAppp._openDB();
    DBAppp._createTable();
    alert("done");
}
/*app.addCustommer = kendo.observable({
    onShow: function() {
       //var DBAppp = new DBApp();
        //DBAppp.run();
       // DBAppp._openDB();
       // DBAppp._createTable();
    },
    afterShow: function() {}
});*/

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
            that.DbHelper.getAllTheData("1");
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
    _onSuccess(){
        var that = this;
        that.DbHelper.onSuccess();
    },
    _onError(){
        var that = this;
        that.DbHelper.onError();
    }
    
};

