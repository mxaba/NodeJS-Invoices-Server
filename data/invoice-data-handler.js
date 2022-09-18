const ErrorHandlerService = require("./../error-handler/error-handler-service");
const Invoice = require("./../models/invoce");
const initInvoices = require("./data-json");
const items = require("./json/items.json");
const customers = require("./json/customers.json");

class InvoiceDataHandler {
  _invoicesData = null;

  static initInvoicesData() {
    this._invoicesData =
      initInvoices().map((invoice) => new Invoice(invoice)) || [];
  }

  static _getInvoiceById(id) {
    const index = this._invoicesData.findIndex(
      (currentInvoice) => currentInvoice.id === Number(id)
    );
    if (index === -1) {
      throw new ErrorHandlerService(
        `Invoice ${id} does not exist`,
        "NOT_FOUND",
        404
      );
    }
    return index;
  }

  static getInvoiceById(id) {
    const index = this._getInvoiceById(id);
    return this._invoicesData[index];
  }

  static getAllInvoices() {
    return this._invoicesData;
  }

  static _beforePostDataFindItems(invoiceData) {
    invoiceData.items.forEach((item) => {
      item.invoiceId = [invoiceData.id];
      items.push(item);
    });
    var cstm = customers.find(
      (cust) => cust.email === invoiceData.customerDetails.email
    );
    if (cstm !== undefined) {
      invoiceData.customerDetails = cstm;
    } else {
      invoiceData.customerDetails.id = customers.length + 1;
      customers.push(invoiceData.customerDetails);
    }
    return invoiceData;
  }

  static postInvoiceData(invoiceData) {
    invoiceData.id = Number(invoiceData.id);
    if (this._invoicesData.findIndex((i) => i.id === invoiceData.id) > -1) {
      throw new ErrorHandlerService(
        `Invoice with id ${invoiceData.id} already exists, please generate a new one`,
        "ALREADY_EXISTS",
        409
      );
    }
    const checkedInvoice = this._beforePostDataFindItems(invoiceData);
    this._invoicesData.push(new Invoice(checkedInvoice));
    return checkedInvoice;
  }

  static deleteInvoiceById(id) {
    const index = this._getInvoiceById(id);
    this._invoicesData.splice(index, 1);
    return "Removed Successfully";
  }

  static updateInvoiceById(id, invoiceData) {
    invoiceData.id = Number(id);
    const index = this._getInvoiceById(invoiceData.id);
    return (this._invoicesData[index] = new Invoice(invoiceData));
  }
}

module.exports = InvoiceDataHandler;
