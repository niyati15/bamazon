DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price INTEGER(10),
  quantity INTEGER(10),
  PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, quantity) values ('Samsung LED TV', 'Electronics', 1200, 40);
INSERT INTO products (product_name, department_name, price, quantity) values ('Bounce Fabric Softener Sheets', 'Laundary', 10, 100);
INSERT INTO products (product_name, department_name, price, quantity) values ('Fitbit Flex 2', 'Health and Fitness', 300, 75);
INSERT INTO products (product_name, department_name, price, quantity) values ('Apple Ipad', 'Electronics', 400, 86);
INSERT INTO products (product_name, department_name, price, quantity) values ('Jansport bagpack', 'Bags', 60, 100);

