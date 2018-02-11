var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "Nugget2014",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;

    console.log("Connected as id: " + connection.threadId);
    displayProducts();
});

function displayProducts() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, results) {
        if(err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log(
                "Product ID: " +
                results[i].item_id +
                " || Product: " +
                results[i].product_name +
                " || Price: " +
                results[i].price
            );
        }

        connection.end();
    });
}