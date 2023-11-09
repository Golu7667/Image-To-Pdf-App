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
    <div className='w-5/6 h-96  '>
    <h1 className='w-100% flex justify-center font-extrabold text-4xl font-serif text-green-700 '>Image to PDF Converter</h1>
    <div className='w-full flex justify-center mt-32 '>
    <input type="file" accept=".jpg, .jpeg, .png" multiple onChange={handleFileChange}/>
    </div>
    <div className='w-full flex justify-center font-extrabold '>
    <button onClick={generatePDF} className='w-96 h-16 bg-sky-500 rounded-lg mt-32 text-white font-serif'>Generate PDF</button>
    </div>
    {pdf &&
    <div className='w-full flex justify-center font-extrabold mt-6'>
    <button onClick={downloadPDF} className='w-96 h-16 bg-sky-500 rounded-lg text-white font-serif'>Download</button>
    </div>
    }
    </div>
    </div>
    )
}