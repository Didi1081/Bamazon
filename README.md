## Overview
This is an Amazon-like store front inventory system using Node.js and MySQL.

## Demo


![Demo](https://user-images.githubusercontent.com/42124030/47970470-6c5cf300-e04b-11e8-9159-3e15bf04a8f8.gif)

<a href="https://drive.google.com/file/d/1xRUMe4VMcXVLpJ_Pn4hTxjFXCj_K1sks/view"> Click here for a Demo</a>


## Technologies Utilized

* Terminal
* MysqlWorkBench
* VS Code

* Node Packages:
    
    MySQL ```$ npm install mysql```

    inquirer ``` $ npm install inquirer```
    
    
    

## User Guide

1. Clone Repo
2. Run Terminal ```npm install```
3. Enter ```node bamazonCustomer.js``` in terminal command line
    * This will print out all products in the store.
    * Inquirer will prompt user to input item ID and quantity.
    * If there is enough inventory in stock, it will return the total for that purchase and say order successful.
    * It will update the stock quantity of the item purchased.
    * If inventory is out of stock, it will say ```Sorry, this was a popular product and is out of stock.```
    * If a purchase was made, it will ask ```Would you like to make another purchase?```
    * If user types in ``` y or yes``` then it resets. 
    * Any other response the app closes and says ``` bye ```.
  
4. Run ```ctrl + c``` to exit

