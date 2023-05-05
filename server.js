require("dotenv").config();
const port = process.env.PORT || 4000;

const express = require("express");
const app = express();
app.use(express.json());

const options = require("./app");
const {
  findInventories,
  createInventories,
  findInventoryOperators,
  findInventoryAggregate,
} = options;

app.get("/", async (req, res) => {
  res.status(200).send("Bienvenido a nuestro servidor");
});

app.get("/inventories", async (req, res) => {
  const Inventory = await findInventories();
  res.status(200).send({ result: Inventory });
});

app.get("/inventory/operators", async (req, res) => {
  const Inventories = await findInventoryOperators();
  res.status(200).send({ result: Inventories });
});

app.get("/inventories/aggregations", async (req, res) => {
  const result = await findInventoryAggregate();
  res.status(200).send({ result: result });
});

app.post("/inventories", async (req, res) => {
  const result = await createInventories([
    {
      item: "journal",
      qty: 25,
      size: { h: 14, w: 21, uom: "cm" },
      status: "A",
    },
    {
      item: "notebook",
      qty: 50,
      size: { h: 8.5, w: 11, uom: "in" },
      status: "A",
    },
    {
      item: "paper",
      qty: 100,
      size: { h: 8.5, w: 11, uom: "in" },
      status: "D",
    },
    {
      item: "planner",
      qty: 75,
      size: { h: 22.85, w: 30, uom: "cm" },
      status: "D",
    },
    {
      item: "postcard",
      qty: 45,
      size: { h: 10, w: 15.25, uom: "cm" },
      status: "A",
    },
  ]);
  res.status(200).send({ result: result });
});

app.listen(port, () => {
  console.log(`servidor corriendo en el puerto ${port}`);
});
