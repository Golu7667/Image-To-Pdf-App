import { useState } from 'react';
import jsPDF from 'jspdf';


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
    <div>
    <h1>Image to PDF Converter</h1>
    <input type="file" accept=".jpg, .jpeg, .png" multiple onChange={handleFileChange} />
    <button onClick={generatePDF}>Convert to PDF</button>
    
    </div>
    )
}