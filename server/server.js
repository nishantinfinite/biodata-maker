const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const templates = {
  classic: require('./templates/classic'),
  modern: require('./templates/modern')
};

app.post('/generate-pdf', (req, res) => {
  const { formData, template, profileImage } = req.body;

  const doc = new PDFDocument();
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdfData),
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=biodata.pdf',
    }).end(pdfData);
  });

  const selectedTemplate = templates[template.name.toLowerCase()];
  selectedTemplate(doc, formData, profileImage);

  doc.end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));