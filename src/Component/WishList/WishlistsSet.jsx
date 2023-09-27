import { ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Modal, Dropdown, Space } from 'antd';
import Map from "../Map/Map";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";
import Rating from "../ListingInfo/Ratings";
import Popup from '../../hoc/Popup';



const WishlistsSet=()=>{
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [textField,setTextField]=useState(null);

    const handleMenu=({ key })=>{
     
        if(key == 1){
          Modal.confirm({
              // title: 'Confirm',
              content: 'Are you sure you want to delete ? ',
              icon: <ExclamationCircleOutlined />,
              okText: <span className=''> Delete </span>,
              cancelText:<span className=''>Keep</span>,
              style: { top: '40%' },
              
             
            });      
        }
        else if(key == 0 ){
          handleShowModal();


        }

    }

      
        const onTextChange=(event)=>{
          setTextField(event.target.value);
      
      
       }

    


    

      const handleShowModal = () => {
        setIsModalVisible(true);
      };

      const handleCancel = () => {
        setIsModalVisible(false);
      };

    

    const wishlist_groups = [
      {
        id: 1,
        pictures: [
          "https://a0.muscache.com/im/pictures/959f7a1d-6e52-4317-a2a5-4271b323e19c.jpg?im_w=720",
          "https://a0.muscache.com/im/pictures/c089e5bd-89cd-4efc-bda5-0b6e36978e9c.jpg?im_w=720",
          "https://a0.muscache.com/im/pictures/766780af-d334-4b1a-9356-cda032db1f13.jpg?im_w=720",
        ],
        location: "1004 Victoria Island",
        price: "$150 per night",
        date: "22/08/2023",
        kilometres: "22miles away",
        rating: 4.8,
        link:"/ListingInfoMain",
  
      },
      {
        id: 2,
        pictures: [
          "https://a0.muscache.com/im/pictures/7ca6118f-68c7-4a32-8bbc-09ce1840a373.jpg?im_w=720",
          "https://a0.muscache.com/im/pictures/c99e5b00-a779-40e9-bd0e-5062dfdb7eb8.jpg?im_w=720",
          "https://a0.muscache.com/im/pictures/f8099680-c563-4491-9258-f679eef415e9.jpg?im_w=720",
        ],
        location: "2b, Admiralty Road",
        price: "$120 per night",
        date: "22/08/2023",
        kilometres: "22miles away",
        rating: 4.2,
        link:"/ListingInfoMain",
  
      },
      {
        id: 3,
        pictures: [
          "https://a0.muscache.com/im/pictures/prohost-api/Hosting-816385654242432020/original/2468fc87-15fe-40a7-97c8-8910ba6c3267.jpeg?im_w=720",
          "https://a0.muscache.com/im/pictures/prohost-api/Hosting-816385654242432020/original/819c217b-c551-4de5-9a98-b4fedae488ba.jpeg?im_w=720",
          "https://a0.muscache.com/im/pictures/prohost-api/Hosting-816385654242432020/original/9e70e7f0-57cf-43de-94a1-8383324687bf.jpeg?im_w=720",
        ],
        location: "Eva Pearl Lekki",
        price: "$200 per night",
        date: "22/08/2023",
        kilometres: "22miles away",
        rating: 4.0,
              link:"/ListingInfoMain",
  
      },
  
  
        
        // it should have a "url" object aswell for Svg images  
      ];
    
      const SavedItems=wishlist_groups.map(group=>(
        <div
        key={group.id}
        className=" md:max-w-[18rem] rounded overflow-hidden  m-4 cursor-pointer"
      >
        <Carousel>
          {group.pictures.map((picture, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFavorite(group.id)}
                className={`flex items-center absolute outline-none bg-${
                  group.isFavorite ? "yellow-400" : ""
                } hover:bg-${
                  group.isFavorite ? "yellow-500" : ""
                } text-white font-bold py-2 px-4 rounded`}
              >
                <div
                  className={`border border-gray-400 rounded-full p-1 ${
                    group.isFavorite ? "bg-white" : ""
                  }`}
                >
                  <svg
                    className={`w-5 h-5 fill-current ${
                      group.isFavorite ? "text-red-600" : "text-white"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 16.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 7.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </button>
              <img src={picture} alt={`Apartment in ${group.location}`} />
            </div>
          ))}
        </Carousel>
        <Link to={group.link}> 

        <div className=" py-4">
          <div className="font-medium text-base mb-2">{group.location}</div>
          <Rating rating={group.rating} /> 

          <p className="text-gray-400 text-base">{group.kilometres}</p>

          <p className="text-gray-400 text-base">{group.date}</p>
          <p className="font-medium text-gray-700 text-base">{group.price}</p>
        </div>
        </Link>
      </div>
      ));


      const toggleFavorite = (id) => {
        setListings((prevListings) =>
          prevListings.map((listing) => {
            if (listing.id === id) {
              return { ...listing, isFavorite: !listing.isFavorite };
            }
            return listing;
          })
        );
      };

 

  



      return (
      <div className=' min-h-[100dvh] relative box-border'>
      <div className=" pb-14 left-0 right-0 top-[105px] bottom-0  lg:pb-0      ">
            <div className=" flex box-border ">
                <div className=" w-full md:w-full lg:w-[55%] xl:w-[63%] flex-shrink-0 flex-grow-0     z-[2] block ">
                    <div className=" min-h-[400px] block box-border ">

                            {/* Menu and back buttton  */}
                        <div className=" px-6 py-[18px] md:top-20 sticky left-0 w-full top-0 block bg-white
                                         box-border z-[2]   md:px-10 lg:px-6    ">
                            <div className=" flex items-center justify-between  "> 

                                <div className=" items-center flex w-11 "> 
                                    <button className=" cursor-pointer p-0 m-0 transition-transform transparent 
                                     border-none rounded-[50%] relative outline-none touch-manipulation inline-block   ">
                                       
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24px"
                                                height="24px"
                                                viewBox="0 0 24 24"
                                            >
                                                <title>keyboard-backspace</title>
                                                <path d="M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z" />
                                            </svg>

                                      
                                        
                                     </button>                                               
                                </div> 

                                <div className="  items-center justify-end flex" >
                                    <button className=" cursor-pointer p-0 m-0 transition-transform transparent 
                                        border-none  relative outline-none touch-manipulation inline-block   ">
                                          <svg xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24"
                                        width="17px"
                                        height="17px"
                                        >
                                            <title>Share</title>
                                        <path d="M12,1L8,5H11V14H13V5H16M18,
                                        23H6C4.89,23 4,22.1 4,21V9A2,2 0 0,1 6,
                                        7H9V9H6V21H18V9H15V7H18A2,2 0 0,1 20,
                                        9V21A2,2 0 0,1 18,23Z" />
                                    </svg>
                                     </button>

                                    <label className=" pr-6"></label>
                                      <MyDropdown click={handleMenu} >   
                                     <button className=" cursor-pointer p-0 m-0 transition-transform transparent 
                                        border-none  relative outline-none touch-manipulation inline-block   ">
                                          <div className=" flex items-center justify-between underline ">
                                            <span className=" mr-1">
                                            <svg  aria-hidden="true"
                                             width="17px"
                                             height="17px" 
                                            viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path fillRule="evenodd" 
                                                d="M12 2.75a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 7.25a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" 
                                                clipRule="evenodd"></path>
                                            </svg>
                                            </span>

                                            <label className=" text-sm font-medium">Menu</label>  
                                        </div>
                                     </button>
                                     </MyDropdown> 

                                   <Popup isModalVisible={isModalVisible} handleCancel={handleCancel} title={" Rename Wishlist "} className={" top-[40%] md:max-w-[400px] "} >   
                                            <div className=' pb-6 pt-3 block box-border '>
                                                 <div className=' font-normal text-base m-0 rounded-md   border w-full flex relative min-h-[56px]'>
                                                   <label className=' p-0 relative flex-1 '>
                                                       <div className=' p-0 font-normal text-base m-0 left-3 right-3 -translate-y-2 transform absolute top-[18px] '>
                                                        <div className=' whitespace-nowrap overflow-hidden max-w-full text-ellipsis '>Name</div>
                                                       </div>
                                                        <div className=' box-border block'>
                                                          <div className=' flex opacity-100'>
                                                            <input maxLength="50" className=' p-0 border-none mt-[26px] mr-3 mb-[6px] ml-3 w-full   ' onChange={onTextChange}/>
                                                          </div>
                                                        </div>
                                                   </label>
                                                </div> 
                                                <div className=' mt-2 grid-cols-1 grid box-border'>
                                                  <div className=' text-sm font-bold block  box-border '>max 50 characters</div>
                                                </div>
                                                <hr className=' my-4 '/>
                                                <div className=' flex items-center justify-between text-base  '>
                                                  <button className=' -mr-[10px] text-center cursor-pointer font-semibold text-base rounded-lg border-none p-[10px] underline -ml-[10px]' onClick={handleCancel}>Cancel</button>
                                                  <button className='  text-center cursor-pointer font-semibold text-base rounded-lg border-none p-[10px] bg-orange-500 text-white'>Save</button>
                                                </div>

                                            </div>
                                    </Popup>
                                     
                                       
                                 </div>

                            </div>     



                        </div>

                            {/* Wishlist Name */}
                        <div className=" md:mt-3 block z-[1] box-border">
                            <div className=" mx-6 pt-3 md:pt-0 md:mx-10 lg:mx-6 ">
                                <h1>
                                    <span className=" text-2xl break-words block box-border font-semibold  md:text-3xl" >
                                        Bed & breakfasts 2021
                                    </span>
                                </h1>
                            </div>
                        
                        </div>    

                          {/*  */}
                          <div className=" top-8 pt-6 px-6 sticky z-[1] min-[744px]:top-28 min-[744px]:px-10 min-[950px]:px-6 bg-white   ">
                            <h2 className=" block box-border text-2xl font-medium  ">Your saved items</h2>
                          </div>


                        {/* Saved Items */}

                        <div className=" mt[-4px] block box-border">
                            <div className=" pb-6 block box-border  md:pb-10">
                                <div className=" pe-6 ps-6 lg:ps-6 lg:pe-6 md:ps-10 md:pe-10 ">
                                    <div className=" gap-10 grid  gap-x-6 gap-y-10 auto-rows-fr  grid-cols-1 min-[551px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 min-[1240px]:grid-cols-3    ">
                                        {SavedItems}
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>


                <div className=" flex-auto box-border hidden flex-grow flex-shrink   lg:flex  ">
                    <div className=" w-full h-screen sticky top-0 pt-20 pb-[-80px] block  ">
                        <div className=" relative w-full h-full">
                            <Map></Map>
                        </div>
                    </div>
                </div>

            </div>

        </div>
       
      </div>
    );


}

export default WishlistsSet;









const items = [
  {
    label: 
    <button className=" cursor-pointer p-0 m-0 transition-transform transparent 
    border-none  relative outline-none touch-manipulation inline-block   ">
      <div className=" flex items-center justify-between  ">
        <span className=" mr-1">
        <svg  aria-hidden="true"
         width="20px"
         height="20px" 
        viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" 
            d="m5.21 18.93.15-.01 4-.8c.14-.03.27-.1.38-.2l11.18-11.2a.75.75 0 0 0 0-1.05l-3.2-3.2a.77.77 0 0 0-1.05 
            0L5.47 13.66c-.1.1-.17.24-.2.38l-.8 4a.75.75 0 0 0 .74.9zM17.2 4.06l2.13 2.14-1.46 1.46-2.1-2.17 1.43-1.43zM6.7 
            14.56l8-8 2.11 2.16-7.97 7.97-2.67.54.53-2.67zm14.09 5.69H9.21a.75.75 0 1 0 0 1.5h11.58a.75.75 0 0 0 0-1.5zm-15 
            0H3.21a.75.75 0 1 0 0 1.5h2.58a.75.75 0 0 0 0-1.5z" 
            clipRule="evenodd"></path>
        </svg>
        </span>

        <label className=" text-sm font-medium">Rename</label>  
    </div>
 </button>
       
       ,
    key: '0',
  },
  {
    label:
    <button className=" cursor-pointer p-0 m-0 transition-transform transparent 
     border-none  relative outline-none touch-manipulation inline-block   ">
          <div className=" flex items-center justify-between ">
             <span className=" mr-1">
            <svg  aria-hidden="true"
                  width="20px"
                 height="20px" 
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
                 >
                 <path d="M20.75 5h-4.88v-.25a2.25 2.25 0 0 0-2.24-2.25h-3.26a2.25 2.25 0 0 0-2.24 
                  2.25V5H3.25a.75.75 0 0 0 0 1.5h14.81l-1.07 
                  12.81a.76.76 0 0 1-.74.69h-8.5a.76.76 0 0 1-.74-.69L6.1 8.56a.75.75 0 0 0-1.5.13l.9 
                   10.75a2.26 2.26 0 0 0 2.25 2.06h8.49c1.16 0 2.14-.9 2.24-2.06L19.57 6.5h1.18a.75.75 0 1 0 0-1.5zM9.62 
                  5v-.25a.75.75 0 0 1 .76-.75h3.24a.75.75 0 0 1 .76.75V5H9.62z"></path>
                   <path d="M10.88 16.38v-6.25a.75.75 0 1 0-1.5 0v6.24a.75.75 0 1 0 1.5 0zm3.74 0v-6.25a.75.75 0 1 0-1.5
                       0v6.24a.75.75 0 1 0 1.5 0z"></path>
                  </svg>
                  </span>

                <label className=" text-sm font-medium">Delete</label>  
                 </div>
                  </button>
      ,
    key: '1',
  },
  {
    type: 'divider',
  },
];

const MyDropdown = ({children,click}) => {

  const onClick=click;

  return (
  <Dropdown
    placement="bottom"
    overlayClassName=" mt-[0.75rem] "
  
   autoAdjustOverflow={false}
    menu={{
      items,
      onClick,
    
      
    }}
    trigger={['click']}
    
  >
    {children}
    
  </Dropdown>
  );
  };








