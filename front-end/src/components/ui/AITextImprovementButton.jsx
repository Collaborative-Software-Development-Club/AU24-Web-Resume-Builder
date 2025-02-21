import React from 'react';
import { Wand2 } from 'lucide-react';

const AITextImprovementButton = ({ placeholder }) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block', // stay inline
        width: '250px', // default width
      }}
    >
      {/* text input */}
      <input
        type="text"
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 40px 10px 10px', // space for icon
          borderRadius: '8px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />
      {/* icon button */}
      <button
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)', // center vertically
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Wand2 size={16} color="white" />
      </button>
    </div>
  );
};

export default AITextImprovementButton;
