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

});

function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        formatter(res);
        askCustomer();

    });
}

function askCustomer() {
    ask
        .prompt([
            {
                type: "input",
                message: "What would you like to buy today (type the product ID)?",
                name: "productID"
            },
            {
                type: "input",
                message: "How many would you like to buy?",
                name: "quantity"
            }
        ]).then(function (inquirerResponse) {
            var quantity = inquirerResponse.quantity;
            var productID = inquirerResponse.productID;
            reduceQuantity(productID, quantity);

        });
}

function reduceQuantity(productID, quantity) {
    var newQuantity = 0;
    var totalPrice = 0;
    connection.query("SELECT quantity, price FROM products WHERE id = " + productID, function (err, res) {
        if (err) throw err;
        // console.log("existing quantity", res[0].quantity);
        newQuantity = res[0].quantity - quantity;
        totalPrice = quantity * res[0].price;
        // console.log(totalPrice);
        // console.log("new quantity", newQuantity);
        if (newQuantity > 0) {
            updateProduct(productID, newQuantity, totalPrice);
        } else {
            console.log("Sorry! You may have to select a quantity less than " + quantity);
            buyAgain();
            // connection.end();
        }
    });

}

function updateProduct(productID, quantity, price) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                quantity: quantity
            },
            {
                id: productID
            }
        ],
        function (err, res) {
            // showProducts();

            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                formatter(res);
                console.log("Your total price is $" + price);
                buyAgain();
            });

        }
    );

}

function buyAgain() {
    ask
        .prompt([
            {
                type: "confirm",
                message: "Do you want to continue?",
                name: "answer",
                default: false
            }
        ]).then(function (inquirerResponse) {
            if (inquirerResponse.answer) {
                askCustomer();
            } else {
                console.log("Thanks for visiting Bamazon.");
                connection.end();
            }
        });
}

function formatter(arr) {

    var table = new Table({
        head: ['ID', 'PRODUCT NAME', 'DEPARTMENT', 'PRICE (USD)', 'QUANTITY']
        , colWidths: [10, 30, 20, 15, 15]
    });
    for (var i = 0; i < arr.length; i++) {
        table.push(
            [arr[i].id, arr[i].product_name, arr[i].department_name, arr[i].price, arr[i].quantity]
        );
    }
    console.log(table.toString());
}

