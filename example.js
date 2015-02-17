var mysql = require('mysql');
var connection =  mysql.createConnection({
    host : "trackeddb.ctyl7vyaixcl.us-west-2.rds.amazonaws.com",
    user : "master",
    password: "masterpassword"
});
connection.connect();

connection.query("use trackeddb");
var strQuery = "select * from LOCATION";

connection.query( strQuery, function(err, rows){
    if(err) {
        throw err;
    }else{
        console.log( rows );
    }
});
