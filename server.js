require("dotenv").config();
const { PORT } = process.env;

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

const app = require("./app");


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
  });