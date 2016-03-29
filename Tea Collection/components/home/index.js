'use strict';

app.home = kendo.observable({
    onShow: function() {
        alert("in");
        var fileApp = new FileApp();
        fileApp.run();
    },
    afterShow: function() {}
});

function FileApp() {
}

FileApp.prototype = {
    db : null,
	fileSystemHelper: null,
	nameField: null,
	idField: null,
    weightField : null,
    ammountField : null,
    advanceField : null,
    oaldText: null, 
    DbHelper : null,
    nameArr : null,
	run: function() {
		var that = this,
    		writeFileButton = document.getElementById("writeFileButton"),
    		readFileButton = document.getElementById("readFileButton"),
    		deleteFileButton = document.getElementById("deleteFileButton");
        
        that.nameField = document.getElementById("nameField");
		that.idField = document.getElementById("idField");
        that.weightField = document.getElementById("weightField");
        that.weightField = document.getElementById("netWeightField");
		that.ammountField = document.getElementById("ammountField");
        that.advanceField = document.getElementById("advanceField");
        $("#writeFileButton").click(
										 function() { 
                                             that._readTextFromFile.call(that);
                                             
											 that._writeTextToFile.call(that); 
										 });
        
		$("#readFileButton").click(
										function() {
											that._readTextFromFile.call(that);
										});
        
		$("#findButton").click(
										  function() {
											  that._getCustommerNameByID.call(that);
										  });
        alert("1");
        that.DbHelper = new DBHelper();
        alert("2");
		that.fileSystemHelper = new FileSystemHelper();
        console.log(that.fileSystemHelper);
	},
    _getCustommerNameByID: function(){
    	var that = this;
        that._openDB();
        that._getAllTheData(that.idField.value);
        //that.nameField.innerHTML = that.nameArr;
        
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
            
            that.nameField.innerHTML = nameArr[0]
        }
        
        that.DbHelper.selectAllRecords(render,ID);
        
    },
    _openDB : function(){
        var that = this;
        that.DbHelper.openDb();
    },
	_deleteFile: function () {
		var that = this,
		    fileName = that.fileNameField.value;
        
		if (that._isValidFileName(fileName)) {
			that.fileSystemHelper.deleteFile(fileName, that._onSuccess, that._onError);
		}
		else {
			var error = { code: 44, message: "Invalid filename"};
			that._onError(error);
		}
	},
    
	_readTextFromFile: function() {
		var that = this,
		    fileName = "test_file.txt";
        alert(fileName);
		if (that._isValidFileName(fileName)) {
			that.fileSystemHelper.readTextFromFile(fileName, that._onSuccess, that._onError);
		}
		else {
			var error = { code: 44, message: "Invalid filename"};
			that._onError(error);
		}
	},
    
	_writeTextToFile: function() {
		var that = this,
    		fileName = "test_file.txt",
    		text = "";
       	var d = new Date();
		var createdDate = d.yyyymmdd();
       
        
        //alert(that.oaldText);
		if(that.oaldText != null){
            text = that.oaldText+
                	that.idField.value+","+
                	that.nameField.innerHTML+","+
                	createdDate+","+
                	that.weightField.value+","+
                	that.netWeightField.value+","+
                	that.ammountField.value+","+
                	that.advanceField.value;
        }else{
            text =  that.idField.value+","+
                	that.nameField.innerHTML+","+
                	createdDate+","+
                	that.weightField.value+","+
                	that.netWeightField.value+","+
                	that.ammountField.value+","+
                	that.advanceField.value;
            alert(text);
        }
        
		if (that._isValidFileName(fileName)) {
			that.fileSystemHelper.writeLine(fileName, text, that._onSuccess, that._onError)
		}
		else {
			var error = { code: 44, message: "Invalid filename"};
			that._onError(error);
		}
	},
    onSuccess : function(tx, r) {
        console.log("Your SQLite query was successful!");
    },
	_onSuccess: function(value) {
        
	},
    
	_onError: function(error) {

		console.log(error);
	},
    
	_isValidFileName: function(fileName) {
		//var patternFileName = /^[\w]+\.[\w]{1,5}$/;

		return fileName.length > 2;
	}
}

function FileSystemHelper() { 
}

FileSystemHelper.prototype = {
	
    //Writing operations
    writeLine: function(fileName, text, onSuccess, onError) {
		var that = this;
		var grantedBytes = 0;

		window.requestFileSystem(LocalFileSystem.PERSISTENT, grantedBytes,
								 function(fileSystem) {
									 that._createFile.call(that, fileSystem, fileName, text, onSuccess, onError);
								 },
								 function(error) {
									 error.message = "Request file system failed.";
									 onError.call(that, error);
								 });
	},
    
	_createFile: function(fileSystem, fileName, text, onSuccess, onError) { 
		var that = this;
		var options = {
			create: true, 
			exclusive: false
		};

		fileSystem.root.getFile(fileName, options,
								function(fileEntry) {
									that._createFileWriter.call(that, fileEntry, text, onSuccess, onError);
								},
								function (error) {
									error.message = "Failed creating file.";
									onError.call(that, error);
								});
	},
    
	_createFileWriter: function(fileEntry, text, onSuccess, onError) {
		var that = this;
		fileEntry.createWriter(function(fileWriter) {
                                    var len = fileWriter.length;
                                    fileWriter.seek(len);
                                    fileWriter.write(text + '\n');
                                    var message = "Wrote: " + text;
                                    onSuccess.call(that, message);
                                },
                    			function(error) {
                    				error.message = "Unable to create file writer.";
                    				onError.call(that, error);
                    			});
        
	},
    
    //Reading operations
	readTextFromFile : function(fileName, onSuccess, onError) {
		var that = this;
        
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
								 function(fileSystem) {
									 that._getFileEntry.call(that, fileSystem, fileName, onSuccess, onError);
								 },
								 function(error) {
									 error.message = "Unable to request file system.";
									 onError.call(that, error);
								 });
	},
    
	_getFileEntry: function(fileSystem, fileName, onSuccess, onError) {
        
		var that = this;
		// Get existing file, don't create a new one.
		fileSystem.root.getFile(fileName, null,
								function(fileEntry) {
									that._getFile.call(that, fileEntry, onSuccess, onError);
								}, 
								function(error) {
									error.message = "Unable to get file entry for reading.";
									onError.call(that, error);
								});
	},

	_getFile: function(fileEntry, onSuccess, onError) { 
		var that = this; 
		fileEntry.file(
			function(file) { 
				that._getFileReader.call(that, file, onSuccess);
			},
			function(error) {
				error.message = "Unable to get file for reading.";
				onError.call(that, error);
			});
	},

	_getFileReader: function(file, onSuccess) {
		var that = this;
		var reader = new FileReader();
		reader.onloadend = function(evt) { 
			var textToWrite = evt.target.result;
            that.oaldText = textToWrite;
            alert("thi"+that.oaldText);
			onSuccess.call(that, textToWrite);
		};
        
		reader.readAsText(file);
	},
   
    //Deleting operations
	deleteFile: function(fileName, onSuccess, onError) {
		var that = this;
       
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
                                function(fileSystem) {
                        			that._getFileEntryForDelete.call(that, fileSystem, fileName, onSuccess, onError);
                        		}, function(error) {
                        			error.message = "Unable to retrieve file system.";
                        			onError.call(that, error);
                        		});
	}, 
    
	_getFileEntryForDelete: function(fileSystem, fileName, onSuccess, onError) { 
		var that = this;
		fileSystem.root.getFile(fileName, 
                                null, 
								function (fileEntry) {
									that._removeFile.call(that, fileEntry, onSuccess, onError);
								},
								function(error) {
									error.message = "Unable to find the file.";
									onError.call(that, error)
								});
	},
    
	_removeFile : function(fileEntry, onSuccess, onError) {
		var that = this;
		fileEntry.remove(function (entry) {
                			var message = "File removed.";
                			onSuccess.call(that, message);
                		}, function (error) {
                			error.message = "Unable to remove the file.";
                			onError.call(that, error)
                		});
	}
};

function DBHelper(){
    
}

DBHelper.prototype = {
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
            tx.executeSql("CREATE TABLE IF NOT EXISTS CustommerTable (id INTEGER PRIMARY KEY ASC, custommer_id TEXT UNIQUE, custommer_name TEXT, added_date DATETIME)", []);
        });
    },
    
    insertNewRecord : function(ID,name) {
        var that = this;
        if(ID != null || $trim(ID) != "" && name != null || $trim(name) != ""){
            that.db.transaction(function(tx) {
            var cDate = new Date();
            /*tx.executeSql("INSERT OR INTO CustommerTable(custommer_id, custommer_name, added_date) VALUES (?,?,?)",
                          [ID, name, cDate],
                          that.onSuccess,
                          that.onError);*/
                tx.executeSql("INSERT INTO CustommerTable(custommer_id, custommer_name, added_date) SELECT '"+ID+"','"+name+"','"+cDate+"' WHERE NOT EXISTS(SELECT * FROM CustommerTable WHERE custommer_id = '"+ID+"')",
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
    
    
};

Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy+"-" + (mm[1]?mm:"0"+mm[0])+"-" + (dd[1]?dd:"0"+dd[0]); // padding
  };



/*app.addCustommer = kendo.observable({
    onShow: function() {
       //var DBAppp = new DBApp();
        //DBAppp.run();
       // DBAppp._openDB();
       // DBAppp._createTable();
    },
    afterShow: function() {}
});*/

