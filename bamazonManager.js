var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
//var displayProducts = require("./bamazonCustomer.js")

//******** Need to make a function for making the table and pass results through it */
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
    promptAction();
});

function promptAction() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add a New Product",
            "Quit"
        ]
    }).then(function(answer) {
        switch (answer.action) {
            case "View Products for Sale":
                displayProducts();
                break;

            case "View Low Inventory":
                viewLowInv();
                break;

            case "Add to Inventory":
                //call function here
                break;

            case "Add a New Product":
                //call function here
                break;

            case "Quit":
                quit()
                break;
        }
    });
    // connection.end();
}

function displayProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
        if(err) throw err;

        console.log("\n          --------------------------\n");
        console.log("          Available Bamazon Products");
        console.log("\n          --------------------------\n");

        makeTable(results);
        promptAction();
    });
};

function viewLowInv() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 6", function(err, results) {
        if(err) throw err;

        makeTable(results);
        promptAction();
    });
};

function addInv() {
    // print the table
    //need to prompt the user for which item they would like to add inventory to
    //how much would they like to add
    //if successful send message Successful! You have added X to Y
};





function quit() {
    console.log("Goodbye.");
    process.exit();
};

function makeTable(results) {
    var table = new Table ({
        head: ["Product ID", "Product", "Department", "Price", "Stock \nQuantity"],
        colWidths: [13, 35, 30, 10, 10]
    });

    for (var i = 0; i < results.length; i++) {
        var infoArray = [results[i].item_id, results[i].product_name,  results[i].department_name, results[i].price, results[i].stock_quantity]; 
        table.push(infoArray);
    };        

    console.log(table.toString());
};