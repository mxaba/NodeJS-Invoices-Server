const express = require("express");
const bodyParser = require("body-parser");
const swaggerDocument = require("./routes/swagger-ui");
const errorHandlerMiddleware = require("./middleware/error-handler-middleware");
const invoiceRoutes = require("./routes/invoice-routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandlerMiddleware);

app.use("/", swaggerDocument);
app.use("/invoices", invoiceRoutes);

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
