'use strict';
var collectionArr = [];
var index;
var Item;
var app = new kendo.mobile.Application(document.body, {
                                                        statusBarStyle: "black",
                                                        transition: 'slide',
                                                        skin: 'flat',
                                                        initial: 'components/home/collection.html'
                                                   });

		/*Waiting for device ready*/
                 if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
                    document.addEventListener("deviceready", onDeviceReady, false);
                     
                } else {
                  	onDeviceReady();
                    
                }
		/*On device ready*/
            function onDeviceReady(){
                navigator.splashscreen.hide();
                //window.screen.lockOrientation('portrait');
                //alert(navigator.connection.type);
                
            }
/*var app;
(function() {
    app = {
        data: {}
    };
    
        
	var bootstrap = function() {
        $(function() {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                transition: 'slide',
                skin: 'flat',
                initial: 'components/home/collection.html'
            });
        });
    };

    if (window.cordova) {
        document.addEventListener('deviceready', function() {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            bootstrap();
            
        }, false);
    } else {
        bootstrap();
    }
    
    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li a.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function() {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
}());*/

function initView(){
    var viewApp = new viewInit();
    viewApp.run();
    viewApp._openDB();
}
function showView(){
    var viewApp = new view();
    viewApp.run();
    viewApp._openDB();
}

function showEddit(){
    alert("app");
    
    var edditApp = new eddit();
    edditApp.run();
    edditApp._openDB();
}

function showAdd(){
     //alert("in");
    var DBAppp = new DBApp();
     //alert("1");
    DBAppp.run();
    DBAppp._openDB();
    DBAppp._createTable();
    
    $("#IDTextField").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    //alert("done");
}
function showRemove(){
    var removeApp = new remove();
    
     //alert("1");
    removeApp.run();
    removeApp._openDB();
    $("#IDTextFieldRemove").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
}
function show(){
    alert("1");
    var fileApp = new FileApp();
    alert("2");
    fileApp.run();
    alert("3");
    //var DBAppp = new DBApp();
    fileApp._openDB();
    alert("4");
    //fileApp._createTableCollect();
    alert("4");
    $("#idField, #weightField, #netWeightField, #advanceField").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    alert("dpne");
}

	/*app.openDb = function() {
                if (window.sqlitePlugin !== undefined) {
                    app.db = window.sqlitePlugin.openDatabase("My Database");
                } else {
                    // For debugging in simulator fallback to native SQL Lite
                    console.log("done");
                    app.db = window.openDatabase("My Database", "1.0", "Cordova Demo", 200000);
                }
            }
    
	app.createTable = function() {
        app.db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS CustommerTable (id INTEGER PRIMARY KEY ASC, custommer_id TEXT, custommer_name TEXT, added_date DATETIME)", []);
        });
    }
    
    app.insertNewRecord = function(ID,name) {
        app.db.transaction(function(tx) {
            var cDate = new Date();
            tx.executeSql("INSERT INTO CustommerTable(custommer_id, custommer_name, added_date) VALUES (?,?,?)",
                          [ID, name, cDate],
                          app.onSuccess,
                          app.onError);
        });
    }
    
    app.onSuccess = function(tx, r) {
        console.log("Your SQLite query was successful!");
    }

    app.onError = function(tx, e) {
        console.log("SQLite Error: " + e.message);
    }
    
    app.selectAllRecords = function(fn) {
        app.db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM MyTable ORDER BY id", [],
                          fn,
                          app.onError);
        });
    }
    
    function getAllTheData() {
        var render = function (tx, rs) {
            // rs contains our SQLite recordset, at this point you can do anything with it
            // in this case we'll just loop through it and output the results to the console
            for (var i = 0; i < rs.rows.length; i++) {
                console.log(rs.rows.item(i));
            }
        }

        app.selectAllRecords(render);
    }

	function saveCustommer(){
        app.insertNewRecord();
    }*/