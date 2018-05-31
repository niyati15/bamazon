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

    showProducts();
    askCustomer();
});

function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        formatter(res);
        // connection.end();
    });
}

function askCustomer() {
    ask
        .prompt([
            {
                type: "input",
                message: "What would you like to buy today?",
                name: "product"
            },
            {
                type: "input",
                message: "How many would you like to buy?",
                name: "quantity"
            }
        ]).then(function (inquirerResponse) {
                console.log(inquirerResponse.product);
                console.log(inquirerResponse.quantity);
        });
}

function formatter(arr) {

    var table = new Table({
        head: ['ID', 'PRODUCT NAME', 'DEPARTMENT', 'PRICE (USD)', 'QUANTITY']
        , colWidths: [10, 30, 20, 15, 15]
    });
    for (var i = 0; i < arr.length; i++) {
        table.push(
            [i + 1, arr[i].product_name, arr[i].department_name, arr[i].price, arr[i].quantity]
        );
    }
    console.log(table.toString());
}