const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "Ask_Community_Schema",
});

const db = pool.promise();

// 1. SQL - Structural querying language (Ngôn ngữ dùng để truy vấn)

// 2. SQL vs noSQL ?????

// SQL dùng để truy vấn những cơ sở dữ liệu dạng quan hệ
// noSQL thì ngược lại (Không quan hệ)

// 3. Hệ quản trị CSDL
// SQL - r(Relational) Database Management System
// MySQL, Postgres, MariaDB, Oracle...

// 4. Một số thuật ngữ
// Schema - Database

// > Table -  Entity (Bảng - Thực thể)

// > Record (Bản ghi)- Row (Dòng)

// > Properties (Thuộc tính) - Column (Cột)

// NOTE: Mỗi một bảng hay thực thể
// đều phải có PK (Primary key) - Thông thường
// là thuộc tính "id" dùng để định danh và phân biệt
// các bản ghi trong một bảng với nhau

app.get("/", (req, res) => {
  db.execute("SELECT * FROM tbl_questions")
    .then((data) => {
      let [records] = data; // array destructuring
      // let records = data[0]
      res.status(200).json({
        data: records,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });

  db.execute(
    `INSERT INTO Ask_Community_Schema.tbl_questions (id, content, ` /
      like /
      `, dislike) 
    VALUES (?, ?, ?, ?);`,
    [1, "Hello world", 100, 10]
  )
    .then((data) => {
      let [records] = data; // array destructuring
      // let records = data[0]
      res.status(200).json({
        data: records,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
