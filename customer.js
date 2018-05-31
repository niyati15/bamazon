var mysql = require("mysql");
var Table = require("cli-table");
var ask = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon_db'
});

connection.connect(function (err) {
    if (err) throw err;

    afterConnection();
});

function afterConnection(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        // console.log(res);
        formatter(res);
        connection.end();
      });
}

function formatter(arr) {
        


    // instantiate
    var table = new Table({
        head: ['ID', 'PRODUCT NAME', 'DEPARTMENT', 'PRICE (USD)', 'QUANTITY']
      , colWidths: [10, 30, 20, 15, 15]
    });
    for (var i = 0; i < arr.length; i++) {
     
    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    table.push(
        [i+1, arr[i].product_name, arr[i].department_name, arr[i].price, arr[i].quantity]
    );
     
    
}
console.log(table.toString());
// console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - ");
}