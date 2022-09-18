const customers = require("./json/customers.json");
const items = require("./json/items.json");
const invoices = require("./json/invoices.json");

const getItems = (invoiceId) => {
  let mactItems = [];
  items.forEach((element) => {
    if (element.invoiceId.includes(invoiceId)) {
      mactItems.push(element);
    }
  });
  return mactItems;
};

const getCustomerDetails = (customerId) => {
  return customers.find((cust) => cust.id === customerId);
};

const initInvoicesData = () => {
  for (const invoice of invoices) {
    invoice.customerDetails = getCustomerDetails(invoice.customerId);
    invoice.items = getItems(invoice.id);
  }
  return invoices;
};

module.exports = initInvoicesData;
