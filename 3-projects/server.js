const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const { pool } = require("pg");

const pool = new Pool({
  user: "riyaaz",
  host: "",
  database: "cyf_ecommerce_i43p",
  password: "dpg-cefmi99gp3jk7mhomnhg-a.oregon-postgres.render.com",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

app.listen(port, function () {
  console.log(
    `Server is listening on port ${port}. Ready to accept requests!`
  );
});
