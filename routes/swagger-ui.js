const express = require("express");
const swaggerUiExpress = require("swagger-ui-express");
const swaggerConfig = require("../swagger/config");

const router = express.Router();
router.use("/", swaggerUiExpress.serve);
router.get("/", swaggerUiExpress.setup(swaggerConfig));
module.exports = router;
