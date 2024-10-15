import React from 'react';

const templates = [
  { id: 1, name: 'Classic', thumbnail: 'classic-thumbnail.jpg' },
  { id: 2, name: 'Modern', thumbnail: 'modern-thumbnail.jpg' },
  { id: 3, name: 'Elegant', thumbnail: 'elegant-thumbnail.jpg' },
  { id: 4, name: 'Professional', thumbnail: 'professional-thumbnail.jpg' },
];

function TemplateGallery({ onSelect }) {
  return (
    <div className="template-gallery">
      <h2>Choose a Template</h2>
      <div className="templates">
        {templates.map((template) => (
          <div
            key={template.id}
            className="template"
            onClick={() => onSelect(template)}
          >
            <img src={template.thumbnail} alt={template.name} />
            <p>{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateGallery;