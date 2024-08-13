import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { application } from '../../../apis/api';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';

const DownloadImages = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [aadhaarNo, setAadhaarNo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${application.getApplication.url}/${id}`, config);
        const { data } = response;
        setImages(data.fingerprints);
        setAadhaarNo(data.aadhaarNo);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [id]);

  const generatePdf = async (images, aadhaarNo) => {
    const doc = new jsPDF('l', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const imageWidth = (pageWidth - margin * (images.length + 1)) / images.length;
    const imageHeight = imageWidth; // Assuming square images
    const yPosition = margin;

    try {
      for (let i = 0; i < images.length; i++) {
        const imgData = await getBase64Image(images[i].url);
        const xPosition = margin + i * (imageWidth + margin);
        doc.addImage(imgData, 'PNG', xPosition, yPosition, imageWidth, imageHeight);
      }

      doc.save(`${aadhaarNo}_fingerprints.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const getBase64Image = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  return (
    <div>
      <h1>Download Images for : <span className='font-bold'>{aadhaarNo}</span></h1>
      <div className='flex flex-nowrap gap-5 mt-5 justify-center overflow-x-auto'>
        {loading? <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-[#000]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>:images.map((image, index) => (
          <img key={index} src={image.url} alt={`Fingerprint ${index + 1}`} style={{ width: 'auto', height: '200px' }} />
        ))}
      </div>

      <div className='w-full flex justify-center mt-10'>
        <Button onClick={() => generatePdf(images, aadhaarNo)} className='mt-5'>
          Download as PDF
        </Button>
      </div>
    </div>
  );
};

export default DownloadImages;