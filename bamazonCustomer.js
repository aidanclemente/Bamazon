var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


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

        console.log("\n          --------------------------\n          Available Bamazon Products\n          --------------------------\n");

        var table = new Table ({
            head: ["Product ID", "Product", "Department", "Price", "Stock Quantity"],
            colWidths: [10, 80, 30, 10, 10]
        });

        console.log(table);

        for (var i = 0; i < results.length; i++) {
            var infoArray = [results[i].item_id, results[i].product_name,  results[i].department_name, results[i].price, results[i].stock_quantity]; 

            table.push(infoArray);
        };        
        console.log("________________table");
        console.log(table);

        console.log("to string--------------------");
        console.log(table.toString());
        connection.end();
    });
};

function shoppingCart() {
    inquirer
        .prompt({
            name: "product_id",
            type: "input",
            message: "Select products to order by entering Product ID. [Press Q to quit]"
        })
        .then(function(answer) {
            var query = "SELECT"
        })
}

// Show the user a list of the products
// Prompt the user for which product they want to buy
    //they enter the product id for what they want to buy
// Second prompt askes how many units they would like to buy
    //they enter a number they would like to buy
        //I take the answers and call a query for the order
        //Need to compare the number available and the nubmer ordered
        //if the number ordered is less than or equal to the number available, then
            //update the quantity available
            //create a variable to store the total