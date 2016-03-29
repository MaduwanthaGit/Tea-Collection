'use strict';

(function() {
    var app = {
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
}());



function showAdd(){
     alert("in");
    var DBAppp = new DBApp();
     alert("1");
    DBAppp.run();
    DBAppp._openDB();
    DBAppp._createTable();
    alert("done");
}
function show(){
    var fileApp = new FileApp();
    fileApp.run();
    //var DBAppp = new DBApp();
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