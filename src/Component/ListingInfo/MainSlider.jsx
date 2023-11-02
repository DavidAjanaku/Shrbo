import React, { useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import room from "../../assets/room.jpeg";
import kitchen from "../../assets/room2.jpeg";
import video from "../../assets/videos/luxuryInteriror.mp4";
import apartment from "../../assets/apartment2.jpeg";
import apartment1 from "../../assets/apartment1.jpeg";
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import close from "../../assets/svg/close-line-icon 2.svg"
// import './MainSlider.css'; // Import your custom CSS file

const modalStyles = {
  overlay: {
    backgroundColor: 'black',
    zIndex: 1000,
  },
  content: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    border: 'none',
    background: 'transparent',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    padding: '20px',
  },
  sliderWrapper: {
    borderRadius: "0px", // CSS properties should use colons instead of colons
  },
  modalContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
  },
  modalImageContainer: {
    // maxWidth: '80%', // Adjust the width as needed
    maxHeight: '70vh', // Adjust the height as needed
  },

 
};

const MainSlider = (props) => {
  const pics = [
    {
      id: "video",
      min: video,
    },
    {
      id: 2,
      min: kitchen,
    },
    {
      id: 3,
      min: room,
    },
    {
      id: 4,
      min: kitchen,
    },
    {
      id: 5,
      min: room,
    },
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openImageModal = (imageSrc, index) => {
    setSelectedImage(imageSrc);
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedImageIndex(0);
  };

  const slides = pics.map((slide, index) => (
    <SplideSlide key={slide.id}>
      <div className="  ">
        <div className=" relative h-[258px]  ">
          <div
            className='h-full w-full rounded'
            onClick={() => openImageModal(slide.min, index)}
          >
            {slide.id === "video" ? (
              <video
                src={slide.min}
                alt="Video"
                className='rounded  h-full w-full'
                
                controls
                playsInline
              />
            ) : (
              <img src={slide.min} alt="slide 1" className='rounded h-full w-full' />
            )}
          </div>
        </div>
      </div>
    </SplideSlide>
  ));

  return (
    <div className='w-full md:hidden '>
      <Splide
        ref={(slider) => (props.slider1.current = slider)}
        className="main-slider"
        options={{
          perPage: 1,
          perMove: 1,
          arrows: false,
          rewind: true,
          pagination: false,
          mediaQuery: 'min',
          breakpoints: {
            767: {
              destroy: true,
            },
          },
        }}
      >
        {slides}
      </Splide>

      <Modal
        isOpen={selectedImage !== null}
        onRequestClose={closeImageModal}
        style={modalStyles}
        ariaHideApp={false}
        
      >
          <button className="close-button text-white" onClick={closeImageModal}>
            <img src={close} className='w-4' alt="" />
          </button>
        <div className="modal-content" style={modalStyles.modalContent}>
          {selectedImage && (
            <div style={modalStyles.modalImageContainer}>
              <Carousel
                showArrows={true}
                emulateTouch={true}
                selectedItem={selectedImageIndex} // Set the initial selected item
              >
                {pics.map((pic, index) => (
                  <div key={pic.id}>
                    {pic.id !== 'video' ? (
                      <img src={pic.min} alt={`Image ${index}`} />
                    ) : (
                      <video
                        src={pic.min}
                        alt="Video"
                        
                        controls
                        playsInline
                      />
                    )}
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MainSlider;
