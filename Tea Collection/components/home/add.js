function DBApp(){
    
}

DBApp.prototype = {
    db : null,
    DbHelper : null,
    IDTextField : null,
    nameTextField : null,
    run: function() {
        //alert("in");
		var that = this,
    		saveCustommereButton = document.getElementById("saveCustommereButton"),
    		cancelSaveCustommerButton = document.getElementById("cancelSaveCustommerButton");
        
        that.IDTextField = document.getElementById("IDTextField");
        that.nameTextField = document.getElementById("nameTextField");
        
        saveCustommereButton.addEventListener("click",function(){
            if($.trim(that.IDTextField.value) != "" && $.trim(that.nameTextField.value) != "" ){
                that._insertRecords(that.IDTextField.value,that.nameTextField.value);
            }else{
                alert("Please fill all the fields");
            }
            
            //that.DbHelperr.getAllTheData("1");
            //that._deleteCustommer(1);
        })
        console.log(cancelSaveCustommerButton);
        //alert("in");
		that.DbHelper = new DBHelper();
        //alert("done");
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
        that.IDTextField.value = "";
        that.nameTextField.value = "";
    },
    _deleteCustommer: function(){
      	var that = this;
       // that._openDB();
        that.DbHelper.deleteRecord(1);
        //alert("fi");
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


function remove(){
    
}
remove.prototype = {
    db : null,
    DbHelper : null,
    IDTextFieldRemove : null,
    nameFieldRemove : null,
    run: function() {
        //alert("in");
		var that = this,
    		removeCustommereButton = document.getElementById("removeCustommereButton"),
    		cancelSaveCustommerButton = document.getElementById("cancelSaveCustommerButton"),
        	findButtonRemove = document.getElementById("findButtonRemove");
        
        that.IDTextFieldRemove = document.getElementById("IDTextFieldRemove");
        that.nameFieldRemove = document.getElementById("nameFieldRemove");
        
        removeCustommereButton.addEventListener("click",function(){
            //that._insertRecords(that.IDTextField.value,that.nameTextField.value);
            //that.DbHelperr.getAllTheData("1");
            that._deleteCustommer(that.IDTextFieldRemove.value);
        });
        
        findButtonRemove.addEventListener("click",function(){
            if($.trim(that.IDTextFieldRemove.value) != "" ){
                that._getAllTheData(that.IDTextFieldRemove.value);
            }else{
                alert("enter a ID");
            }
            
        });
        console.log(cancelSaveCustommerButton);
        //alert("in");
		that.DbHelper = new DBHelper();
        //alert("done");
        console.log(that.DbHelper);
        
	},
    _openDB : function(){
        var that = this;
        that.DbHelper.openDb();
    },
   
    _getAllTheData : function (ID) {
        var that = this;
        var nameArr = [];
        var render = function (tx, rs) {
            
            // rs contains our SQLite recordset, at this point you can do anything with it
            // in this case we'll just loop through it and output the results to the console
            for (var i = 0; i < rs.rows.length; i++) {
                console.log(rs.rows.item(i).custommer_name);
                nameArr.push(rs.rows.item(i).custommer_name); 
            }
            if(nameArr.length == 0){
                that.nameFieldRemove.innerHTML = "NOT FOUND";
            }else{
                that.nameFieldRemove.innerHTML = nameArr[0]
            }
        }
        
        that.DbHelper.selectAllRecords(render,ID);
        
    },
    
    _deleteCustommer: function(ID){
      	var that = this;
        if(that.nameFieldRemove.innerHTML === "NOT FOUND"){
            alert("The ID does not exist");
        }
        else if($.trim(that.nameFieldRemove.innerHTML) != "" && $.trim(that.IDTextFieldRemove.value) != ""  ){
            navigator.notification.confirm(
            'Are you sure you want to remove supplier '+ID, // message
             function(buttonIndex){
                if(buttonIndex == 1){
                    that.DbHelper.deleteRecord(ID);
                    that.nameFieldRemove.innerHTML = "";
                    that.IDTextFieldRemove.value = "";
                   
                }else{
                    return;
                } 
             },            // callback to invoke with index of button pressed
            'Remove Supplier',           // title
            ['OK','CANCEL']     // buttonLabels
        );
        }else{
            alert("Enter an ID and click find button to see")
        }
        
       // that._openDB();
        
        alert("fi");
    }
    };
    
 function eddit(){
    
}

eddit.prototype = {
    db : null,
    DbHelper : null,
    IDTextFieldEddit : null,
    run: function() {
        var that = this,
        	findButtonEddit = document.getElementById("findButtonEddit");
        that.DbHelper = new DBHelper();
        that._openDB();
        that.IDTextFieldEddit = document.getElementById("IDTextFieldEddit");
        collectionArr = [];
        alert("in");
        that._getAllTheData(that.IDTextFieldEddit.value);
        findButtonEddit.addEventListener("click",function(){
            //that._insertRecords(that.IDTextField.value,that.nameTextField.value);
            //that.DbHelperr.getAllTheData("1");
            collectionArr = [];
            that._getAllTheData(that.IDTextFieldEddit.value);
        });
        
        //console.log(cancelSaveCustommerButton);
        //alert("in");
		
        //alert("done");
        console.log(that.DbHelper);
        
	},
    _openDB : function(){
        var that = this;
        that.DbHelper.openDb();
    },
   
    _getAllTheData : function (ID) {
        var that = this;
        var collectionItem = function(ID,added_date,weight,net_weight,advance){
            this.ID = ID;
            this.added_date = added_date;
            this.weight = weight;
            this.net_weight = net_weight;
            this.advance = advance;
        }
        var render = function (tx, rs) {
            
            // rs contains our SQLite recordset, at this point you can do anything with it
            // in this case we'll just loop through it and output the results to the console
            for (var i = 0; i < rs.rows.length; i++) {
                console.log(rs.rows.item(i).custommer_name);
                var item = rs.rows.item(i);
                alert(item.status);
                var tempCollectionItem = new collectionItem(item._id,item.added_date,item.weight,item.net_weight,item.advance)
                collectionArr.push(tempCollectionItem);
                
            }
            if(collectionArr.length == 0){
                //that.nameFieldRemove.innerHTML = "NOT FOUND";
            }else{
                $("#collection_list").kendoMobileListView({
                                                                 dataSource: kendo.data.DataSource.create({data: collectionArr}),
                                                                 template: $("#collection_list_Template").html(),
                                                                 click : function(e) {
                                                                     	index = $(e.item).index();
                                                                    	Item = this.dataSource.view()[index];
                                                                     Item = collectionArr[index];
                                                                     //alert(index);
                                                                     console.log(Item);
                                                                    	app.navigate("components/home/view_collection.html");    
                                                                     }
                                                             	});
                   
                    
                    
                }
            }
        
        
        that.DbHelper.selectRecordsFromCollection(render,ID);
        
    },
    
    _deleteCustommer: function(ID){
        var that = this;
      	that.DbHelper.deleteCollection(ID);
    },
    
    _updateCollection: function(ID,custommer_id, name,added_date, weight, net_weight, advance){
        var that = this;
        that.DbHelper.updateCollection(ID,custommer_id, name,added_date, weight, net_weight, advance);
    }
    
    
    
};

function view(){
    
}

view.prototype = {
    db : null,
    DbHelper : null,
    idFieldView : null,
    nameFieldView : null,
    weightFieldView : null,
    netWeightFieldView : null,
    advanceFieldView : null,
    run: function() {
        var that = this;
        	//deletelButtonView = document.getElementById("deletelButtonView");
        
        that.idFieldView = document.getElementById("idFieldView");
        that.weightFieldView = document.getElementById("weightFieldView");
        that.netWeightFieldView = document.getElementById("netWeightFieldView");
        that.advanceFieldView = document.getElementById("advanceFieldView");
        
        that.idFieldView.value = Item.added_date;
        that.weightFieldView.value = Item.weight;
        that.netWeightFieldView.value = Item.net_weight;
        that.advanceFieldView.value = Item.advance;
        alert(Item.weight);
        //deletelButtonView.addEventListener("click",function(){
       //     that._updateCollection(Item.ID,that.weightFieldView.value,that.netWeightFieldView.value,that.advanceFieldView.value);
       // });
        
        //console.log(cancelSaveCustommerButton);
        //alert("in");
		that.DbHelper = new DBHelper();
        //alert("done");
        console.log(that.DbHelper);
        
	},
    _openDB : function(){
        var that = this;
        that.DbHelper.openDb();
    },
   
    
    
    _deleteCollection: function(ID){
        var that = this;
      	that.DbHelper.deleteCollection(ID);
    },
    
    _updateCollection: function(added_date, weight, net_weight, advance){
        var that = this;
        alert(added_date);
        that.DbHelper.updateCollection(added_date, weight, net_weight, advance);
    }
    
    
    
};

function viewInit(){
    
}

viewInit.prototype = {
    db : null,
    DbHelper : null,
    idFieldView : null,
    nameFieldView : null,
    weightFieldView : null,
    netWeightFieldView : null,
    advanceFieldView : null,
    run: function() {
        var that = this,
        	deletelButtonView = document.getElementById("deletelButtonView"),
            edditButtonView = document.getElementById("edditButtonView");
        
        that.idFieldView = document.getElementById("idFieldView");
        that.weightFieldView = document.getElementById("weightFieldView");
        that.netWeightFieldView = document.getElementById("netWeightFieldView");
        that.advanceFieldView = document.getElementById("advanceFieldView");
        
        
        //alert(Item.ID);
        deletelButtonView.addEventListener("click",function(){
            alert("i");
            that._deleteCollection(Item.ID);
        });
        edditButtonView.addEventListener("click",function(){
            that._updateCollection(Item.ID,that.weightFieldView.value,that.netWeightFieldView.value,that.advanceFieldView.value);
        });
        
        //console.log(cancelSaveCustommerButton);
        //alert("in");
		that.DbHelper = new DBHelper();
        //alert("done");
        console.log(that.DbHelper);
        
	},
    _openDB : function(){
        var that = this;
        that.DbHelper.openDb();
    },
   
    
    
    _deleteCollection: function(ID){
        var that = this;
      	that.DbHelper.deleteCollection(ID);
    },
    
    _updateCollection: function(added_date, weight, net_weight, advance){
        var that = this;
        alert(added_date);
        that.DbHelper.updateCollection(added_date, weight, net_weight, advance);
    }
    
    
    
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

