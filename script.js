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

  let logoFile = document.getElementById("logo").files[0];
  let signFile = document.getElementById("signature").files[0];

  let logoURL = logoFile ? URL.createObjectURL(logoFile) : null;
  let signURL = signFile ? URL.createObjectURL(signFile) : null;

  // 🟣 HEADER
  doc.setFillColor(40, 40, 120);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text(company || "Your Company", 60, 18);

  doc.text("INVOICE", 150, 18);

  doc.setTextColor(0, 0, 0);

  // 🖼️ LOGO
  if (logoURL) {
    doc.addImage(logoURL, "JPEG", 10, 5, 40, 20);
  }

  // 📄 DETAILS
  doc.setFontSize(10);
  doc.text("Invoice No: " + invoice, 140, 40);
  doc.text("Date: " + date, 140, 48);

  // 👤 CLIENT BOX
  doc.rect(20, 40, 100, 25);
  doc.text("Bill To:", 22, 48);
  doc.text(client, 22, 58);

  // 📊 TABLE HEADER
  doc.setFillColor(240, 240, 240);
  doc.rect(20, 75, 170, 10, "F");

  doc.text("Description", 25, 82);
  doc.text("Amount", 150, 82);

  // 📊 DATA
  doc.text(service, 25, 95);
  doc.text("₹ " + Number(price).toFixed(2), 150, 95);

  doc.text("GST (" + gst + "%)", 25, 110);
  doc.text("₹ " + gstAmount.toFixed(2), 150, 110);

  doc.line(20, 120, 190, 120);

  // 🟢 TOTAL
  doc.setFillColor(220, 255, 220);
  doc.rect(20, 125, 170, 15, "F");

  doc.setFontSize(13);
  doc.setFont(undefined, "bold");

  doc.text("Total", 25, 135);
  doc.text("₹ " + total.toFixed(2), 150, 135);

  doc.setFont(undefined, "normal");

  // ✍️ SIGNATURE
  if (signURL) {
    doc.text("Authorized Signature", 140, 170);
    doc.addImage(signURL, "JPEG", 140, 175, 50, 20);
  }

  // FOOTER
  doc.setFontSize(10);
  doc.text("Thank you for your business!", 20, 180);

  // ✅ FINAL SAVE (IMPORTANT)
  doc.save("invoice.pdf");
}
