// 1. Create a MySQL Database called `bamazon`.
// 2. Then create a Table inside of that database called `products`.
// 3. The products table should have each of the following columns:
//    * item_id (unique id for each product)
//    * product_name (Name of product)
//    * department_name
//    * price (cost to customer)
//    * stock_quantity (how much of the product is available in stores)

// 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

// 5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. 
//Include the ids, names, and prices of products for sale.

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

var mysql = require ('mysql');
var inquirer = require ('inquirer');
const cTable = require('console.table');

var conn= mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon_DB"
  });
  
  conn.connect(function(err) {
    console.log("connected as id " + conn.threadId + "\n");
    start()
  });


  function start() {
      conn.query('SELECT * FROM products', function(err,res){
          
          console.table(res)
          inquirer.prompt([
              {
                  type: 'input',
                  message: "Please enter Product ID",
                  name: "productID"
              },
              {
                type: 'input',
                message: "How many units do you want?",
                name: "quantity"
            }

          ]).then(answers => {
            
              placeOrder(answers);
          })
      })
  }



  function placeOrder(answers) {

        conn.query('SELECT * FROM products WHERE id = ' + answers.productID, function(err,res){
            console.log(res, "quantity check response")
            if( answers.quantity < res[0].stock_quantity) {
                console.log("Order successful")
                var newQuantity = res[0].stock_quantity - answers.quantity 
                conn.query('UPDATE products SET stock_quantity =' + newQuantity + ' WHERE id = ' + answers.productID, function(err, response){
                    if(!err){
                        var total = res[0].price * answers.quantity;
                        console.log("Your total is : $" +total);
                        inquirer
                        .prompt([{
                        
                            choices: ["yes", "no"],
                            message: "Would you like to make another purchase?",
                            name:"Continue"
                        }
                        ]).then(answers => {
                            console.log(answers);
                            if(answers.Continue == 'y' || answers.Continue === 'yes'){
                                start()
                            }else {
                                console.log('Bye!')
                                return
                            }
                        })
                    }
                })
            } else {
                console.log("Sorry, this was a popular product and is out of stock.")
            }
        })

  }