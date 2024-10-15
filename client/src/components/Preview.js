import React from 'react';

function Preview({ formData, template, profileImage }) {
  return (
    <div className="preview">
      <h2>Preview</h2>
      <div className={`biodata-preview ${template.name.toLowerCase()}`}>
        {profileImage && <img src={profileImage} alt="Profile" className="profile-image" />}
        <h3>{formData.personalInfo.name}</h3>
        <div className="info-section">
          <h4>Personal Information</h4>
          {Object.entries(formData.personalInfo).map(([key, value]) => (
            <p key={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value}</p>
          ))}
        </div>
        <div className="info-section">
          <h4>Family Information</h4>
          {Object.entries(formData.familyInfo).map(([key, value]) => (
            <p key={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value}</p>
          ))}
        </div>
        <div className="info-section">
          <h4>Contact Information</h4>
          {Object.entries(formData.contactInfo).map(([key, value]) => (
            <p key={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Preview;