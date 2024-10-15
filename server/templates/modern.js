const path = require('path');

module.exports = (doc, formData, profileImage) => {
  // Set font
  doc.font('Helvetica');

  // Add header
  doc.fontSize(24).text('Marriage Biodata', { align: 'center' });
  doc.moveDown();

  // Add profile image
  if (profileImage) {
    const imgBuffer = Buffer.from(profileImage.split(',')[1], 'base64');
    doc.image(imgBuffer, { width: 100, height: 100, align: 'center' });
    doc.moveDown();
  }

  // Add personal information
  doc.fontSize(18).text('Personal Information');
  doc.moveDown(0.5);
  Object.entries(formData.personalInfo).forEach(([key, value]) => {
    doc.fontSize(12).text(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${value}`);
  });
  doc.moveDown();

  // Add family information
  doc.fontSize(18).text('Family Information');
  doc.moveDown(0.5);
  Object.entries(formData.familyInfo).forEach(([key, value]) => {
    doc.fontSize(12).text(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${value}`);
  });
  doc.moveDown();

  // Add contact information
  doc.fontSize(18).text('Contact Information');
  doc.moveDown(0.5);
  Object.entries(formData.contactInfo).forEach(([key, value]) => {
    doc.fontSize(12).text(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${value}`);
  });
};