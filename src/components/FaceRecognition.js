import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './FaceRecognition.css'; // Puedes definir estilos aquí

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Cargar modelos necesarios
    const loadModels = async () => {
      const MODEL_URL = '/models'; // Ruta a la carpeta con los modelos (descargados)
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    };

    // Iniciar el video y el reconocimiento facial
    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error('Error accessing webcam:', err));
    };

    // Procesar las imágenes del video para reconocimiento
    const handleVideoPlay = () => {
      if (videoRef.current) {
        const canvas = faceapi.createCanvasFromMedia(videoRef.current);
        canvasRef.current.append(canvas);
        const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors();

          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }, 100);
      }
    };

    loadModels().then(startVideo);
    videoRef.current && videoRef.current.addEventListener('play', handleVideoPlay);

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('play', handleVideoPlay);
      }
    };
  }, []);

  return (
    <div className="face-recognition-container">
      <video ref={videoRef} autoPlay muted width="720" height="560" />
      <div ref={canvasRef} />
    </div>
  );
};

export default FaceRecognition;
