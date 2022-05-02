if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const exp = require("express");
const app = exp();
const routes = require("./routes/routes");
const PORT = process.env.PORT || 3000;

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
