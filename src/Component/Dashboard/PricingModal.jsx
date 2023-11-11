import Popup from "../../hoc/Popup"
import React, { useState,useRef,  } from "react";
import { Radio } from 'antd';



const PricingModal=({ visible, onClose})=>{
    
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [inputShow, setInputShow] = useState(false);
//   const [loading,setLoading]=useState(false);
const inputRef = useRef();
  const handleEdit = () => {
    //   console.log('radio checked', e.target.value);
      setInputShow(!inputShow);
    
        inputRef.current.focus();
     
  };
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonSelection = (buttonId) => {
    if (selectedButton === buttonId) {
      // If the selected button is clicked again, deselect it
      setSelectedButton(null);
    } else {
      setSelectedButton(buttonId);
    }
  };
  const buttons = [
    { id: 1, label: "Block" },
    { id: 2, label: "Unblock" },
    // { id: 3, label: "Button 3" },
  ];

  const [inputValue, setInputValue] = useState('42222222');

    const handleInputChange = (e) => {
        
        setInputValue(e.target.value);
    };



    return(
       <>
      <Popup
      isModalVisible={visible}
      handleCancel={onClose}
      >
        <div className=" py-8 md:px-8 px-3  ">

                {/* start Blocked and Unblocked should only show when they click on a particular date or highlight dates in the calender     */}
              <div className="flex justify-center items-center">
             
                  <div className=" flex mb-4 items-center justify-center border h-10 rounded-md ">
                    {/* {buttons.map((button) => ( */}
                        <div key={1}>
                        <input
                            type="radio"
                            id={`button${1}`}
                            name="buttonGroup"
                            checked={selectedButton === 1}
                            onChange={() => handleButtonSelection(1)}
                            className="hidden"
                        />
                        <label
                            htmlFor={`button${1}`}
                            className={`cursor-pointer select-none border-0 px-5 py-[10px] rounded-s-md  ${
                            selectedButton ===1
                                ? "bg-slate-700 text-white" // Style for selected button
                                : "bg-transparent text-slate-400 border-slate-400" // Style for unselected button
                            }`}
                        >
                            Blocked
                        </label>
                     </div>

                     <div className=" w-[1px] h-full bg-slate-400 text-black"></div>

                     <div key={2} className="">
                        <input
                            type="radio"
                            id={`button${2}`}
                            name="buttonGroup"
                            checked={selectedButton ===2}
                            onChange={() => handleButtonSelection(2)}
                            className="hidden"
                        />
                        <label
                            htmlFor={`button${2}`}
                            className={`cursor-pointer h-full select-none border-0 px-4 py-[10px] rounded-md rounded-s-none  transition-colors ${
                            selectedButton === 2
                                ? "bg-orange-400 text-white" // Style for selected button
                                : "bg-transparent text-orange-400 " // Style for unselected button
                            }`}
                        >
                            Unblocked
                        </label>
                     </div>
                    {/* ))} */}
                </div>   
             </div>   
            {/* end */}


            <div className=" mb-0 box-border block">
                <div className=" flex items-baseline box-border ">
                    <div className=" text-center basis-full box-border  "><section><h2 className=" m-0 p-0 text-base"><div className=" text-base mb-1 font-medium   ">Per night</div></h2></section></div>
                </div>
            </div>
            <form className=" contents box-border mt-0 " >
                <div className=" lg:my-10 m-auto box-border block ">
                    <div className=" pl-4  pb-3 " >
                        <div className=" h-auto visible w-full text-center box-border block    ">
                            <div className=" text-5xl break-keep inline-block ">
                                <div className=" cursor-text border-none transition-shadow rounded-2xl relative font-extrabold   ">
                                    <div className=" relative text-gray-700 flex box-border">
                                        <span>
                                            <div className="block">₦</div>
                                        </span>
                                        <span className={`min-h-[1lh] cursor-pointer  ${inputShow? "invisible":"visible "}  ` }>{inputValue}</span>
                                        <button onClick={handleEdit} type="button" className=" -right-7 bottom-1 absolute  text-xs font-normal text-black  underline   p-[3px] " >{inputShow ? "done":"edit "}</button>
                                        <input
                                            className={`right-0 text-right ${inputShow? "visible":"invisible"}   border-none bg-transparent p-0 m-0 absolute top-0 bottom-[0.5px] w-full`}
                                            value={inputValue}
                                            ref={inputRef}
                                            onChange={handleInputChange}
                                        />

                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                    <div className=" mt-4 gap-1 flex  flex-col-reverse min-h-[20px]">
                        <div className={` transition-all  ${show? "opacity-100 visible h-full ":" invisible opacity-0  h-[40px]" } overflow-hidden   grid gap-y-3  `}>

                            <div className="rounded-xl border      p-5 ">
                              <div className=" flex items-end  justify-between break-words    ">
                                <div>Base price</div>
                                <div className=" break-normal text-slate-700">
                                  $48
                                </div>
                              </div>
                              <div className=" flex items-end justify-between font-normal break-words mb-2     ">
                                <div>Guest service Fee</div>
                                <div className=" break-normal text-slate-700 ">
                                  $6
                                </div>
                              </div>
                              <div className=" flex items-end justify-between break-words text-sm font-medium pt-1 border-t border-slate-400      ">
                                <div>Guest price before taxes </div>
                                <div className=" break-normal text-slate-700 ">
                                  $54
                                </div>
                              </div>

                            </div>

                              <div className="rounded-xl border   p-5 ">
                                <div className=" flex items-end justify-between break-words     ">
                                    <div>You'll earn</div>
                                    <div className=" break-normal font-medium text-slate-700 ">
                                    $47
                                    </div>
                                </div>
                              </div>

                        </div>
                        <div className=" text-center min-h-[20px]" > 
                            <button type="button" onClick={toggleShow} className="  transition-shadow bg-transparent cursor-pointer w-full h-full  " >
                                <div className=" relative inline-flex items-center justify-center " >
                                    <div className=" text-sm font-medium">Guest price before taxes ₦48 </div>
                                    <div className={` transition-transform left-[calc(100%+8px)] absolute ${
                                      show && "rotate-180 transition-transform"
                                    }`} >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" width={"12px"} height={"12px"} role="presentation" focusable="false" >
                                        <path d="M15.71 5.41 14.3 4 8 10.3 1.72 4 .3 5.41l6.59 6.6c.58.57 1.5.6 2.12.1l.12-.1z"></path>
                                        </svg>
                                    </div>
                                </div> 
                            </button>
                        </div>
                    </div>
                </div>
                <div className=" mt-4 flex flex-col gap-3 ">
                    <button type="button"  className= {`rounded-md transition-colors transition-3 text-white bg-orange-400 ring-1 font-medium ring-orange-400 p-2 px-3 opacity-100 disabled:cursor-not-allowed disabled:hover:bg-white hover:bg-orange-400/90` }  >Save</button>
                    <button type="button" className= {`rounded-md transition-3 transition-colors text-orange-400 ring-1 font-medium ring-orange-400 p-2 px-3 opacity-100 disabled:cursor-not-allowed disabled:hover:bg-white hover:bg-slate-50` } onClick={()=>{onClose()}}  >Cancel</button>
                </div>

            </form>

        </div>
     </Popup>
       </>
    )

}


export default PricingModal;