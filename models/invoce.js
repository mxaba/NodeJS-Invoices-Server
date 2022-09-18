class Invoice {
  constructor(invoice) {
    this.id = invoice.id;
    this.dateTime = invoice.dateTime;
    this.paymentType = invoice.paymentType;
    this.currency = invoice.currency;
    this.refNo = invoice.refNo;

    this.items = invoice.items.map((item) => {
      return {
        category: item.category,
        name: item.name,
        price: item.price,
        code: item.code
      };
    });

    this.customerDetails = {
      id: invoice.customerDetails.id,
      firstName: invoice.customerDetails.firstName,
      lastName: invoice.customerDetails.lastName,
      email: invoice.customerDetails.email
    };
  }
}

module.exports = Invoice;
