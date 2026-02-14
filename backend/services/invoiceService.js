const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = function generateInvoice(order) {
  const doc = new PDFDocument();
  const filePath = path.join(
    __dirname,
    `../invoices/${order._id}.pdf`
  );

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("KAEORN Invoice");
  doc.moveDown();
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Total: ₹${order.totalAmount}`);
  doc.text(`Status: ${order.status}`);

  doc.end();

  return filePath;
};
