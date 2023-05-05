const main = require("./db");

const createInventories = async (arraydata) => {
  const db = await main();
  const collection = db.collection("inventory");
  await collection.insertMany(arraydata);
  const findResult = await collection.find({}).toArray();
  return findResult;
};

const findInventories = async () => {
  const db = await main();
  const collection = db.collection("inventory");
  const findResult = await collection.find({}).toArray();
  return findResult;
};

const findInventoryOperators = async () => {
  const db = await main();
  const collection = db.collection("inventory");
  /**operador $lt */
  // const findResult = await collection.find({ qty: { $lt: 50 } }).toArray();

  /**operador $gt */
  // const findResult = await collection.find({ qty: { $gt: 75 } }).toArray();

  /**operador $in */
  // const findResult = await collection
  //   .find({ item: { $in: ["postcard", "notebook", "paper"] } })
  //   .toArray();

  /**operador $nin */
  // const findResult = await collection
  //   .find({ item: { $nin: ["notebook", "paper"] } })
  //   .toArray();

  /**operador $eq */
  // const findResult = await collection
  //   .find({ item: { $eq: "notebook" } })
  //   .toArray();

  /**operador $and y $or */
  // const findResult = await collection
  //   .find({
  //     $and: [{ qty: { $lt: 50 } }, { item: "notebook" }],
  //   })
  //   .toArray();
  const findResult = await collection
    .find({
      $or: [{ qty: { $lt: 50 } }, { item: "notebook" }],
    })
    .toArray();
  return findResult;
};

const findInventoryAggregate = async () => {
  const db = await main();
  const collection = db.collection("inventory");
  const findResult = await collection
    .aggregate([
      {
        /**Etapa 1 */
        $match: {
          status: "A",
        },
      },
      /**Etapa 2 */
      {
        $limit: 50,
      },
      /**Etapa 3 */
      {
        $project: {
          item: 1,
          qty: 1,
          status: 1,
        },
      },
      /**Etapa 4*/
      {
        $unset: "_id",
      },
      /** Etapa 5*/
      {
        $sort: {
          item: -1,
        },
      },
      /**Etapa 6 */
      {
        $group: {
          _id: "$item",
          count: { $sum: 1 },
        },
      },
      /**Etapa 7 */
      {
        $set: {
          count: 25,
        },
      },
    ])
    .toArray();
  return findResult;
};

module.exports = {
  findInventories,
  createInventories,
  findInventoryOperators,
  findInventoryAggregate,
};
