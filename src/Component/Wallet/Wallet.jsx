import React, { useState, useEffect } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { TiArrowForwardOutline, TiArrowBackOutline } from "react-icons/ti";
import { FaRegCreditCard } from "react-icons/fa";
import verve from '../../assets/Verve-Logo.png';
import visa from '../../assets/Visa-Payment-Card.png';
import masterCard from '../../assets/mastercard.png';
import { useStateContext } from "../../ContextProvider/ContextProvider";
import { message, Popconfirm, Tag } from 'antd';
import { Link } from "react-router-dom";
import Header from "../Navigation/Header";
import Footer from "../Navigation/Footer";
import { FaPlusCircle } from "react-icons/fa";
import axios from "../../Axios";
import url from "../../assets/apartment1.jpeg"
import { LuArrowDownLeft, LuArrowUpRight } from "react-icons/lu";
import Popup from "../../hoc/Popup";
import WithdrawForm from "./WithdrawForm";




const Wallet = () => {


    const [transactions, setTransactions] = useState([

        {
            id: "1",
            imageUrl: url,
            status: "Incoming",
            from: "Shbro",
            amount: "1,000"

        },


        {
            id: "2",
            imageUrl: url,
            status: "Outgoing",
            from: "Shbro",
            amount: "3,000"

        },
        {
            id: "3",
            imageUrl: url,
            status: "Incoming",
            from: "Shbro",
            amount: "500"

        },
        {
            id: "4",
            imageUrl: url,
            status: "Outgoing",
            from: "Shbro",
            amount: "4,000"

        },


    ]);
    const [loading, setLoading] = useState(false);
    const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);

    const [paymentDetails, setPaymentDetails] = useState([
        // {
        //     title: "MasterCard ****4567",
        //     value: "Expiration: 02/24",
        //     selected: "",
        //     //   action: "Remove Payment Method",
        //     link: "",
        //     id: "1",
        //     card_type: "Visa",
        //     created_at: "",
        // },
        // {
        //     title: "MasterCard ****4567",
        //     value: "Expiration: 02/24",
        //     //   action: "Remove Payment Method",
        //     link: "",
        //     id: "2",
        //     selected: "Selected",
        //     card_type: "Verve",
        //     created_at: "2",
        // },

    ]);
    const [isViewBalance, setViewBalance] = useState(true);
    const [acLoading, setAcLoading] = useState(false);
    const [supportedBanks, setSupportedBanks] = useState([]);


    const { user, setUser, setHost, setAdminStatus } = useStateContext();
    // const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Make a request to get the user data
                const response = await axios.get('/user'); // Adjust the endpoint based on your API


                // Set the user data in state
                setUser(response.data);
                setHost(response.data.host);
                setAdminStatus(response.data.adminStatus);


            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                // Set loading to false regardless of success or error
                // setLoading(false);

            }
        };
        if (!user.id) {

            fetchUserData();
        }
    }, []);



    const toggleSelected = (cardId) => {
        setPaymentDetails((prevPaymentDetails) =>
            prevPaymentDetails.map((paymentDetail) => {
                // Check if the current paymentDetail has the same id as the parameter


                if (paymentDetail.id === cardId) {
                    // Toggle the selected field
                    return { ...paymentDetail, selected: paymentDetail.selected === 'Selected' ? null : 'Selected' };
                } else if (paymentDetail.selected !== null) {
                    // Deselect any previously selected item
                    return { ...paymentDetail, selected: null };
                }
                // Keep other paymentDetails unchanged
                return paymentDetail;
            })
        );

    }

    const selectCard = async (cardId, type) => {

        toggleSelected(cardId);

        await axios.get(`/selectCard/${cardId}/${user.id}`).then(response => {
            console.log(response);
            message.success(`Card ${type} Selected successfully`);
        }).catch(err => {
            console.error("Failed to Selected Card", err);
            message.error(`An Error Occured while trying to Select Card ${type}`)
            toggleSelected(cardId);

        })

    }

    const determine_card = (type) => {
        let cardUrl = "";
        if (type == "Visa") {
            cardUrl = visa;
        } else if (type == "Verve") {
            cardUrl = verve;
        } else if (type == "Master") {
            cardUrl = masterCard;
        }

        return (cardUrl);

    }



    const Transactions = transactions.map((transaction) => (

        <li key={transaction.id} className="flex justify-between gap-x-6 py-5 md:py-4">
            <div className="flex min-w-0 gap-x-4 items-center">
                {/* <img className=" h-12 w-12   md:h-10 md:w-10  flex-none rounded-full bg-gray-50" src={transaction.imageUrl} alt="" /> */}


                {transaction.status == "Incoming" ? <LuArrowDownLeft /> : <LuArrowUpRight />}

                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{transaction.status}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{transaction.status == "Incoming" ? "From" : "To"}: {transaction.from}</p>
                </div>
            </div>
            <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className={` text-base font-normal leading-6 ${transaction.status == "Incoming" ? "text-green-500" : "text-gray-900 "} `}>{transaction.status == "Incoming" ? "+" : "-"} {transaction.amount}</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                    ₦{transaction.amount}
                </p>

            </div>
        </li>

    ));

    const Cards = paymentDetails.map((detail) => (
        <li key={detail.id} className=" min-[640px]:justify-between min-[640px]:items-start min-[640px]:flex py-3   rounded-md w-full relative" >
            <h4 className=" absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap ">{detail.card_type}</h4>
            {(detail.selected == "Selected") && <Tag bordered={true} color="success" className=" min-[640px]:text-[10px] max-[639px]:right-2 min-[640px]:left-16 min-[640px]:bottom-1 absolute min-[640px]:leading-4   ">
                selected
            </Tag>}
            <div className=" items-center min-[640px]:flex cursor-pointer " onClick={() => { selectCard(detail.id, detail.title) }}>
                <div className=" bg-slate-400/30 rounded  h-8 w-12  px-2 " >
                    <img src={determine_card(detail.card_type)} className="h-full object-contain w-full " alt="cardType" />
                </div>
                <div className="block mt-3 min-[640px]:mt-0 min-[640px]:ml-4 ">
                    <div className=" text-xs font-medium text-[rgb(17,24,39)] ">{detail.title}</div>
                    {/* <div className="min-[640px]:items-center min-[640px]:flex mt-1 text-sm text-[rgb(75,85,99)]  "><div>{detail.value}</div><span className="min-[640px]:inline min-[640px]:mx-2 hidden ">.</span> <div>Card added on:{detail.created_at}</div> </div> */}
                </div>

            </div>
            {/* <div className=" mt-4 min-[640px]:mt-0 min-[640px]:flex-shrink-0 min-[640px]:ml-6 ">
                <Popconfirm
                    title="Remove Payment Card"
                    description={`Sure you want to remove ${detail.title} Card?`}
                    onConfirm={(e) => { confirm(e, detail.title, detail.id) }}
                    onCancel={cancel}
                    okText="Delete"
                    cancelText="Cancel"
                >
                    <button className="m-0 cursor-pointer inline-flex items-center rounded-md bg-[rgb(255,255,255)] px-3 py-2 text-sm font-semibold text-[rgb(17,24,39)] border   ">
                        Remove Card
                    </button>
                </Popconfirm>

            </div> */}


        </li>
    ));

    useEffect(() => {

        if (user.id) {
            fetchUserCards();
        }
    }, [user.id]);


    // Fetch user cards
    const fetchUserCards = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/getUserCards/${user.id}`);
            console.log('cards', response.data);

            const newDetails = response.data.data.map((card) => {
                const formattedCreatedAt = new Date(card.created_at).toLocaleString();
                return {
                    title: `${card.cardtype} ****${card.card_number.slice(-4)}`,
                    value: `Expiration: ${card.expiry_data.slice(0, 2)}/${card.expiry_data.slice(2)}`,
                    link: "",
                    id: card.id,
                    card_type: card.cardtype,
                    created_at: formattedCreatedAt,
                    selected: card.Selected,
                };
            });
            setPaymentDetails(newDetails);



        } catch (error) {
            console.error('Error fetching user cards:', error);
        } finally {
            setLoading(false)
        }
    };


    const cardSkeletonLoader = Array.from({ length: 3 }).map((group, index) =>
        <div
            key={index}
            className=" relative  h-fit row-span-1  flex items-center gap-4   w-full  md:mt-2 "
        >
            <div
                className="  h-6 skeleton-loader rounded cursor-pointer p-4  flex hover:bg-slate-100/10  w-12  "
            />
            <div
                className="  h-1 skeleton-loader cursor-pointer p-2  flex hover:bg-slate-100/10 w-32  "
            />



        </div>

    );




    message.config({
        duration: 5,
    });





    const handleAccountNumber = async (data) => {

        const details = {
            account_number: data.accountNumber,
            bank_name: data.bankName,
            account_name: data.fullName,
        }

        // await axios.post(`/createUserBankinfo/${user.id}`, details).then((response) => {

        //     console.log(response);
        //     message.success(`Account Details added successfully`);
        //     fetchUserData();
        // }).catch(error => {
        //     console.error("Failed to add Account detalis", error);
        //     message.error(`An Error Occured while trying to add Account detais ${type}`)
        // }).finally(() => {
        //     setAcLoading(false)
        //     setIsChangeAccountNumber(false);
        // });


    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Make a request to get the user data
                const response = await axios.get(`/listBanks`);
                const formattedBanks = response.data.map((bank) => ({
                    value: bank,
                    label: bank,

                }));
                setSupportedBanks(formattedBanks);

            } catch (error) {
                console.error('Error fetching supported banks:', error);
            } finally {
                // Set loading to false regardless of success or error
                // setLoading(false);

            }
        };


        fetchUserData();

    }, []);
















    return (
        <div className="min-h-[100vh]   bg-slate-50">
            <Header />


            <div className=" max-w-5xl mx-auto  ">

                <div className=" md:my-14 py-6    md:flex  gap-4">

                    <div className="h-[90vh] overflow-y-scroll example mx-4 md:w-[60%] col-span-[1.5] md:mx-0  md:h-full p-4 bg-white shadow-sm  rounded-2xl mt-2 ">
                        <div className=" flex flex-wrap mt-3 md:mt-0 w-full h-44 rounded-2xl shadow-md bg-gradient-to-r from-orange-300/70 via-orange-500/50 to-orange-700/25 px-8 py-6 ">
                            <div className=" h-full w-full text-slate-700 ">
                                <div className=" text-sm text-slate-700 font-medium mb-5 flex items-center gap-3">
                                    <p className="m-0">Wallet Balance</p>
                                    {
                                        isViewBalance ?
                                            <button onClick={() => { setViewBalance(false) }}><VscEyeClosed className="h-5 w-5" /></button>
                                            :
                                            <button onClick={() => { setViewBalance(true) }}><VscEye className="h-5 w-5" /></button>

                                    }
                                </div>
                                <div className="  flex flex-wrap justify-between " >
                                    <div className=" text-4xl font-semibold text-slate-700   ">{isViewBalance ? "₦13,280.25" : "**********"} </div>
                                    <div className=" flex gap-3 " >
                                        {/* <div className=" h-full flex items-center flex-col gap-1 ">
                                            <button className=" rounded-full h-10 bg-slate-100 p-3"><TiArrowBackOutline /></button>
                                            <label className=" text-[11px] leading-4 font-medium ">Send</label>
                                        </div> */}

                                        <div className=" h-full flex items-center flex-col gap-1 ">
                                            <button onClick={() => { setWithdrawModalOpen(true) }} className=" rounded-full h-10 bg-slate-100 p-3"><TiArrowForwardOutline /></button>
                                            <label className=" text-[11px] leading-4 font-medium ">Request</label>
                                        </div>
                                        <Popup isModalVisible={isWithdrawModalOpen} title={"Withdraw To"} handleCancel={() => { setWithdrawModalOpen(false) }} >
                                            <WithdrawForm close={(bool) => { setWithdrawModalOpen(false) }} loading={acLoading} Submit={(val) => { handleAccountNumber(val) }} banks={supportedBanks} />

                                        </Popup>

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className=" mt-6 mx-1  ">

                            <div className=" w-full pb-4 md:hidden ">
                                <div className=" flex flex-col justify-center ">

                                    <Link to={"/ManageCard"} className=" rounded-full w-10 p-2 shadow-sm bg-white "> <FaRegCreditCard className=" w-5 h-5  text-orange-500" /></Link>
                                    <label className=" text-xs ">Linked Cards</label>
                                </div>
                            </div>


                            <div className=" flex justify-between ">
                                <p className=" font-medium text-lg ">Last Transactions</p>
                                <Link to={"/TransactionHistory"} className=" text-orange-500 text-sm font-medium" >View All</Link>
                            </div>

                            <ul role="list" className="divide-y divide-gray-100 h-full overflow-y-scroll example mt-4">

                                {Transactions}
                            </ul>

                        </div>




                    </div>

                    <div className="md:grid grid-rows-2 md:w-[40%] shadow-sm gap-4 mt-2 hidden ">
                        {/*                         
                        <div className="   p-6 h-auto  bg-white rounded-2xl">

                        </div> */}

                        <div className=" p-6 h-auto  bg-white rounded-2xl ">

                            <div className=" h-auto ">
                                <div className="  flex justify-between ">
                                    <p className=" font-medium text-lg ">Linked Cards</p>
                                    {paymentDetails.length > 0 && <Link to={"/ManageCard"} className=" text-orange-500 text-sm font-medium" >View All</Link>}
                                </div>

                                <ul role="list" className=" h-full overflow-y-scroll example mt-4">

                                    {!loading ?
                                        <>
                                            {Cards}

                                            <li className=" mt-2">
                                                {/* <h4 className=" absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap ">{detail.card_type}</h4> */}

                                                <div className=" items-center flex  cursor-pointer " >
                                                    <Link to={"/ManageCard"} >

                                                        <div className=" border border-dotted border-black/80 flex justify-center items-center  rounded  h-8 w-12  p-1 " >

                                                            <FaPlusCircle className=" w-4 h-4" />

                                                        </div>
                                                    </Link>
                                                    <div className="block mt-3 min-[640px]:mt-0 min-[640px]:ml-4 ">
                                                        <div className=" text-xs font-medium  text-orange-400 ">Add new card</div>
                                                    </div>

                                                </div>
                                            </li>
                                        </>
                                        :
                                        <>
                                            {cardSkeletonLoader}
                                        </>
                                    }

                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>

    );

}


export default Wallet;