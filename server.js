require("dotenv").config();
const { PORT } = process.env;

console.log(process);

const app = require("./app");


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
  });