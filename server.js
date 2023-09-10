require("dotenv").config();
const { PORT = 3000 } = process.env;

const app = require("./app");


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });