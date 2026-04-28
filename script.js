function generateQuote() {
  let company = document.getElementById("company").value;
  let client = document.getElementById("client").value;
  let service = document.getElementById("service").value;
  let price = document.getElementById("price").value;
  let date = document.getElementById("date").value;
  let invoice = document.getElementById("invoice").value;
let gst = document.getElementById("gst").value || 0;

let gstAmount = (price * gst) / 100;
let total = Number(price) + Number(gstAmount);
  let quote = `
    <h2>${company}</h2>
    <p><b>Invoice No:</b> ${invoice}</p>
    <p><b>Date:</b> ${date}</p>
    <hr>
    <p><b>Client:</b> ${client}</p>
    <p><b>Service:</b> ${service}</p>
    <p><b>Price:</b> ₹${price}</p>
    <p><b>GST (${gst}%):</b> ₹${gstAmount.toFixed(2)}</p>
    <hr>
    <h3>Total: ₹${total.toFixed(2)}</h3>
  `;

  document.getElementById("output").innerHTML = quote;
}
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let company = document.getElementById("company").value;
  let client = document.getElementById("client").value;
  let service = document.getElementById("service").value;
  let price = document.getElementById("price").value;
  let date = document.getElementById("date").value;
  let invoice = document.getElementById("invoice").value;
  let gst = document.getElementById("gst").value || 0;

  let gstAmount = (price * gst) / 100;
  let total = Number(price) + Number(gstAmount);

  // 🟣 HEADER BOX
  doc.setFillColor(90, 50, 200); // purple
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text(company || "Your Company", 20, 18);

  // Reset color
  doc.setTextColor(0, 0, 0);

  // 📄 INVOICE DETAILS (Right side)
  doc.setFontSize(10);
  doc.text("Invoice No: " + invoice, 140, 15);
  doc.text("Date: " + date, 140, 22);

  // Line
  doc.line(20, 35, 190, 35);

  // 👤 CLIENT SECTION
  doc.setFontSize(12);
  doc.text("Bill To:", 20, 50);
  doc.setFontSize(11);
  doc.text(client, 20, 58);

  // 📊 TABLE HEADER
  doc.setFontSize(12);
  doc.text("Description", 20, 80);
  doc.text("Amount", 150, 80);

  doc.line(20, 82, 190, 82);

  // 📊 DATA ROW
  doc.setFontSize(11);
  doc.text(service, 20, 95);
  doc.text("₹ " + price, 150, 95);

  // GST
  doc.text("GST (" + gst + "%)", 20, 110);
  doc.text("₹ " + gstAmount.toFixed(2), 150, 110);

  // Divider
  doc.line(20, 120, 190, 120);

  // 🟢 TOTAL BOX
  doc.setFillColor(240, 240, 240);
  doc.rect(20, 125, 170, 15, "F");

  doc.setFontSize(13);
  doc.text("Total", 25, 135);
  doc.text("₹ " + total.toFixed(2), 150, 135);

  // FOOTER
  doc.setFontSize(10);
  doc.text("Thank you for your business!", 20, 170);

  // SAVE
  doc.save("invoice.pdf");
}
