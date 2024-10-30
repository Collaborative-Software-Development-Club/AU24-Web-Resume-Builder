// import React from 'react';
// import html2pdf from 'html2pdf.js';  // Import the library

// const DownloadButton = ({ targetRef }) => {
//   const downloadResumeAsPDF = () => {
//     const element = targetRef.current;
    
//     const options = {
//       margin: 0.5,
//       filename: 'Resume.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };

//     html2pdf().from(element).set(options).save();
//   };

//   return (
//     <button
//       onClick={downloadResumeAsPDF}
//       className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
//     >
//       Download Resume as PDF
//     </button>
//   );
// };

// export default DownloadButton;