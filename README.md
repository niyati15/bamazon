# Bamazon
It is a CLI app that uses a SQL database to emulate amazon.

## Technologies

MySQL | NodeJS | Javascript

## Setup
First clone this repo to your local directory.

Next, navigate to your repo in your command terminal, and enter:

`npm install`

This will ensure you have all the necessary NPM packages installed to run this generator.

Next, you will need to run the `database.sql` file in your SQL IDE of choice. Be sure to have your SQL server of choice running, such as MySQL.

You will likely be prompted for your credentials. Assuming you know your password for the connection, enter them now with `host` set to `localhost` or `127.0.0.1`, `password` set to your password, and `port` set to `3306` or `3307`.

Open or paste the contents of the `database.sql` file in the IDE, and run the script, preferably function by function in order to check possible errors as you go along.

Next, navigate to the `customer.js`, and in the `connection variable` (defined at the top of these files), enter in your password in the `password` property of the object in the `''`.

To run them, enter `node <your app of choice>` and then press enter to access the CLI.

You are now ready to shop Bamazon.

