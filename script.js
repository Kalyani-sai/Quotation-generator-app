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

  let company = document.getElementById("company").value || "Your Company";
  let client = document.getElementById("client").value;
  let service = document.getElementById("service").value;
  let price = document.getElementById("price").value;
  let date = document.getElementById("date").value;
  let invoice = document.getElementById("invoice").value;
  let gst = document.getElementById("gst").value || 0;

  let gstAmount = (price * gst) / 100;
  let total = Number(price) + Number(gstAmount);

  // 🧾 HEADER
  doc.setFontSize(18);
  doc.text(company, 20, 20);

  doc.setFontSize(12);
  doc.text("Invoice No: " + invoice, 20, 35);
  doc.text("Date: " + date, 150, 35);

  // 🔹 LINE
  doc.line(20, 40, 190, 40);

  // 👤 CLIENT
  doc.text("Bill To:", 20, 50);
  doc.text(client, 20, 60);

  // 📊 TABLE HEADER
  doc.text("Service", 20, 80);
  doc.text("Amount", 150, 80);

  doc.line(20, 85, 190, 85);

  // 📦 SERVICE ROW
  doc.text(service, 20, 95);
  doc.text("₹" + price, 150, 95);

  // 💰 GST
  doc.text("GST (" + gst + "%)", 20, 110);
  doc.text("₹" + gstAmount.toFixed(2), 150, 110);

  // 🔹 LINE
  doc.line(20, 120, 190, 120);

  // 🧮 TOTAL
  doc.setFontSize(14);
  doc.text("Total:", 20, 135);
  doc.text("₹" + total.toFixed(2), 150, 135);

  // 💾 SAVE
  const blobUrl = doc.output('bloburl');
window.location.href = blobUrl;

}


  