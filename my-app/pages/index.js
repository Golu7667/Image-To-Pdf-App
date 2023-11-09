import { useState } from 'react';
import jsPDF from 'jspdf';
import Link from 'next/link'

export default function Home (){
    const [images, setImages] = useState([]);
    const [pdf, setPdf] = useState(null);
    const [check,setCheck]=useState(false)
  
    const handleFileChange = (e) => {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages);
    };
  
    const generatePDF = () => {
      const doc = new jsPDF();
      images.forEach((image, index) => {
        if (index !== 0) {
          doc.addPage();
        }
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          doc.addImage(reader.result, 'JPEG', 10, 10, 190, 0);
          if (index === images.length - 1) {
            setPdf(doc);
          }
        };
      });
      setCheck(true)
    };
  
    const downloadPDF = () => {
      if (pdf) {
        pdf.save('converted.pdf');
      }
    };
  

    return (
    <div className='w-100vw min-h-screen flex justify-center items-center '>
    <div className='w-96 h-96 flex justify-center items-center shadow-orange-400'>
    <h1 >Image to PDF Converter</h1>
    <input type="file" accept=".jpg, .jpeg, .png" multiple onChange={handleFileChange} />
    <button onClick={generatePDF}>Convert to PDF</button>
    <button onClick={downloadPDF}>Download</button>
    <iframe
          src={pdf.output('bloburl')}
          width="100%"
          height="600px"
          title="Converted PDF"
        ></iframe>
    </div>
    </div>
    )
}