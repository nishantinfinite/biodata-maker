import React, { useState } from 'react';
import BiodataForm from './components/BiodataForm';
import TemplateGallery from './components/TemplateGallery';
import Preview from './components/Preview';
import './styles/App.css';

function App() {
  const [formData, setFormData] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleImageUpload = (image) => {
    setProfileImage(image);
  };

  const handleGeneratePDF = async () => {
    try {
      const response = await fetch('http://localhost:3001/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, template: selectedTemplate, profileImage }),
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'biodata.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Marriage Biodata Maker</h1>
      </header>
      <main>
        <BiodataForm onSubmit={handleFormSubmit} onImageUpload={handleImageUpload} />
        <TemplateGallery onSelect={handleTemplateSelect} />
        {formData && selectedTemplate && (
          <>
            <Preview formData={formData} template={selectedTemplate} profileImage={profileImage} />
            <button onClick={handleGeneratePDF} className="generate-pdf-btn">Generate PDF</button>
          </>
        )}
      </main>
      <footer>
        <p>&copy; 2023 Marriage Biodata Maker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;