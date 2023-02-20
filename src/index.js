// B1: tạo file index.js
// B2: terminal gõ yarn init và enter

// B3: cài 3 thư viện
// yarn add express nodemon dotenv

// B4: mở file package.json thêm
//  "script": { "start": "nodemon index.js" }

// B5: setup server express

const express = require("express");
const app = express();

//add một số middle ware để thực hiện các nhu cầu tương ứng
app.use(express.json());
app.use(express.static("."));

// setup thêm CORS()
const cors = require("cors");
app.use(cors());

// tạo host từ thư viện express
app.listen(8080);

//yarn prisma db pull => db first
//yarn prisma db push => code first

const { PrismaClient } = require("@prisma/client");
const model = new PrismaClient();

//import rootRoute
const rootRoute = require("./routes/rootRoute");

app.get("/getUser", async (req, res) => {
  let data = await model.user.findMany();
  res.send(data);
});
app.use("/api", rootRoute);
