const express = require("express");
const router = express.Router();
const InvoiceDataHandler = require("./../data/invoice-data-handler");

InvoiceDataHandler.initInvoicesData();

//Find list of invoices
router.get("/", (req, res, next) => {
  try {
    res.send(InvoiceDataHandler.getAllInvoices());
  } catch (error) {
    next(error);
  }
});

// Find invoice by id
router.get("/:id", (req, res, next) => {
  try {
    res.send(InvoiceDataHandler.getInvoiceById(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    res.status(201).send(InvoiceDataHandler.postInvoiceData(req.body));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    if (req.params.id === "" || req.params.id === undefined) {
      res.status(500).json({ message: "Invoice Id cannot be empty" });
    } else {
      res
        .status(204)
        .send(InvoiceDataHandler.updateInvoiceById(req.params.id, req.body));
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    if (req.params.id === "" || req.params.id === undefined) {
      res.status(500).json({ message: "Invoice Id cannot be empty" });
    } else {
      res
        .sendStatus(204)
        .send(InvoiceDataHandler.deleteInvoiceById(req.params.id));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
