# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a database for an e-commerce app.

To submit this homework write the correct commands for each question here:

```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Setup

To prepare your environment for this homework, open a terminal and create a new database called `cyf_ecommerce`:

```sql
createdb cyf_ecommerce
```

Import the file [`cyf_ecommerce.sql`](./cyf_ecommerce.sql) in your newly created database:

```sql
psql -d cyf_ecommerce -f cyf_ecommerce.sql
```

Open the file `cyf_ecommerce.sql` in VSCode and examine the SQL code. Take a piece of paper and draw the database with the different relationships between tables (as defined by the REFERENCES keyword in the CREATE TABLE commands). Identify the foreign keys and make sure you understand the full database schema.

## Task

Once you understand the database that you are going to work with, solve the following challenge by writing SQL queries using everything you learned about SQL:

1. Retrieve all the customers' names and addresses who live in the United States

   -- select name, address from customers c
   where country = 'United States';

2. Retrieve all the customers in ascending name sequence

   -- select \* from customers c order by name;

3. Retrieve all the products whose name contains the word `socks`

   -- select \* from products p
   where product_name
   like '%socks%';

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

   -- select pa.prod_id, p.product_name, pa.unit_price, pa.supp_id
   from products p
   inner join product_availability pa
   on p.id = pa.prod_id
   where pa.unit_price > 100;

5. Retrieve the 5 most expensive products

   -- select p.product_name as product, pa.unit_price as price
   from products p
   inner join product_availability pa
   on p.id = pa.prod_id
   order by price desc
   limit 5;

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

   -- select p.product_name, pa.unit_price, s.supplier_name
   from products p
   inner join product_availability pa
   on p.id = pa.prod_id
   inner join suppliers s
   on pa.supp_id = s.id;

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

   -- select p.product_name as product, s.supplier_name as supplier
   from products p
   inner join product_availability pa
   on p.id = pa.prod_id
   inner join suppliers s
   on pa.supp_id = s.id
   where s.country = 'United Kingdom';

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).

   -- select o.id , o.order_reference, o.order_date, p.product_name, pa.unit_price \* oi.quantity as totalcost  
    from orders o
   inner join customers c
   on c.id = o.customer_id
   inner join order_items oi  
    on oi.order_id = o.id  
    inner join product_availability pa
   on pa.prod_id = oi.product_id
   inner join products p
   on p.id = pa.prod_id
   where c.id =1;

9. Retrieve all orders, including order items, from customer named `Hope Crosby`

-- select o.id, o.order_reference, o.order_date, p.product_name
from orders o
inner join customers c  
 on o.customer_id = c.id
inner join order_items oi
on o.id = oi.order_id
inner join product_availability pa
on oi.product_id = pa.prod_id
inner join products p
on pa.prod_id = p.id
where c."name" = 'Hope Crosby';

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

-- select p.product_name, pa.unit_price, oi.quantity
from orders o
inner join order_items oi
on o.id = oi.order_id
inner join product_availability pa
on oi.product_id = pa.prod_id
inner join products p
on pa.prod_id = p.id
where o.order_reference = 'ORD006';

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

-- select c.name, o.order_reference, o.order_date, p.product_name, s.supplier_name, oi.quantity
from customers c
inner join orders o ON
c.id = o.customer_id
inner join order_items oi on
o.id = oi.order_id
inner join product_availability pa on
pa.prod_id = oi.product_id
inner join products p on
p.id = pa.prod_id
inner join suppliers s on
pa.supp_id = s.id;

12. Retrieve the names of all customers who bought a product from a supplier based in China.

-- select c.name, s.country
from customers c
inner join orders o on
c.id = o.customer_id
inner join order_items oi on
o.id = oi.order_id
inner join product_availability pa on
oi.supplier_id = pa.supp_id
inner join suppliers s
on oi.supplier_id = s.id
where s.country = 'China';

13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.

--select c.name, o.order_reference, o.order_date, pa.unit_price \* oi.quantity as total
from customers c
inner join orders o on
c.id = o.customer_id
inner join order_items oi on
o.id = oi.order_id
inner join product_availability pa on
oi.product_id = pa.prod_id
order by total desc;
