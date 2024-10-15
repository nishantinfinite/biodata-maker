import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

function BiodataForm({ onSubmit, onImageUpload }) {
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      age: '',
      dateOfBirth: '',
      placeOfBirth: '',
      height: '',
      weight: '',
      bloodGroup: '',
      religion: '',
      maritalStatus: '',
      education: '',
      occupation: '',
      income: '',
    },
    familyInfo: {
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      siblings: '',
    },
    contactInfo: {
      address: '',
      phone: '',
      email: '',
    },
  });

  const handleChange = (category, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="biodata-form">
      <h2>Personal Information</h2>
      {Object.entries(formData.personalInfo).map(([field, value]) => (
        <input
          key={field}
          type={field === 'dateOfBirth' ? 'date' : 'text'}
          name={field}
          value={value}
          onChange={(e) => handleChange('personalInfo', field, e.target.value)}
          placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          required
        />
      ))}

      <h2>Family Information</h2>
      {Object.entries(formData.familyInfo).map(([field, value]) => (
        <input
          key={field}
          type="text"
          name={field}
          value={value}
          onChange={(e) => handleChange('familyInfo', field, e.target.value)}
          placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          required
        />
      ))}

      <h2>Contact Information</h2>
      {Object.entries(formData.contactInfo).map(([field, value]) => (
        <input
          key={field}
          type={field === 'email' ? 'email' : 'text'}
          name={field}
          value={value}
          onChange={(e) => handleChange('contactInfo', field, e.target.value)}
          placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          required
        />
      ))}

      <ImageUpload onImageUpload={onImageUpload} />

      <button type="submit">Submit</button>
    </form>
  );
}

export default BiodataForm;