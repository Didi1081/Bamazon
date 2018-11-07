
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