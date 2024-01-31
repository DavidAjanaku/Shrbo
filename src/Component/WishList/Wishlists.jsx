import React from "react";
import room from "../../assets/room.jpeg";
import {Link} from "react-router-dom";
import WishlistsSet from "./WishlistsSet";
import BottomNavigation from "../Navigation/BottomNavigation";

const Wishlists=({wishlists,loading})=>{

  const wishlist_groups= [
    { id: 11,title:"1 bed",saves:1,url:"https://a0.muscache.com/im/pictures/airflow/Hosting-778167635492331048/original/dcf9d96a-d764-472a-9bdc-da6251467660.jpg?im_w=720"},
    { id: 12,title:"Shared bathroom",saves:2,url:"https://a0.muscache.com/im/pictures/airflow/Hosting-778167635492331048/original/dcf9d96a-d764-472a-9bdc-da6251467660.jpg?im_w=720"},
    { id: 13,title:"Penthouse in La Juarez",saves:3,url:room},
    ...wishlists
    
  ];




  const wishlist=wishlist_groups.map(group=>(
    <Link to={group.link||"/WishlistsSet"} key={group.id}>
        <div className=" rounded-[0.25em] overflow-hidden  relative bg-cover" >
          <div className=" overflow-hidden aspect-video relative rounded-[0.25em] block ">
            <div className=" absolute h-full start-0 end-0  m-0 p-0 block  ">
              <img className=" absolute  min-h-full opacity-100 transition w-full block object-cover align-middle overflow-hidden   " src={group.url}></img>
            </div>
            <div className=" h-full w-full  items-end box-border flex flex-row  ">
              <div className=" pt-10 px-3 pb-3 start-0 end-0 m-0 absolute box-border  block bg-gray-400/40 text-white">
                    <h3 className=" box-border block ">{group.title}</h3>
                    <div className=" text-xs font-normal ">{group.saves} Saves</div>
              </div>
            </div>
          </div>

        </div>
      </Link>
  ));

  const SkeletonLoader =wishlist_groups.map((group,index)=>(
        <div key={index} className=" skeleton-loader text-transparent " >
          <div className=" overflow-hidden aspect-video rounded-[0.25em] block ">
            <div className="  h-full start-0 end-0  m-0 p-0 block  ">
              {/* <img className=" absolute  min-h-full opacity-100 transition block object-cover align-middle overflow-hidden   " src=""></img> */}
            </div>
            <div className=" h-full w-full  items-end box-border flex flex-row  ">
              <div className=" pt-10 px-3 pb-3 start-0 end-0 m-0  box-border  block  ">
                    <h3 className=" box-border block "></h3>
                    <div className=" text-xs font-normal "></div>
              </div>
            </div>
          </div>

        </div>
   
  ));

  



    return (
        <div className=" min-h-[100dvh] relative block box-border">
          <div className=" main block box-border mb-32">
            <div className=" mr-auto">
              <div className=" mb-6 mt-8 ">
                <section>
                  <div className=" md:pt-3 pb-2 text-black">
                    <div className=" font-semibold text-4xl ">
                      <h1 className=" p-0 m-0 ">Wishlists</h1>
                      
                    </div>
                  </div>
                </section>
               {!loading? <section>
                  <div className="grid xl:grid-cols-4 gap-6 overflow-hidden    md:grid-cols-3 my-6   lg:gap-4 md:gap-4 grid-cols-1   ">
                      {wishlist}
                  </div>
                </section>:
                <section>
                <div className="grid xl:grid-cols-4 gap-6 overflow-hidden    md:grid-cols-3 my-6   lg:gap-4 md:gap-4 grid-cols-1   ">
                 {SkeletonLoader}
                </div>
              </section>
                
               }

              </div>

              
            </div>
          </div>
      
      </div>
    );


}

export default Wishlists;
