import React,{useEffect,useState} from "react";
import Wishlists from "../Component/WishList/Wishlists";
import Header from "../Component/Navigation/Header";
import BottomNavigation from "../Component/Navigation/BottomNavigation";
import axios from '../Axios';

const WishList=()=>{
    const [wishlists,setWishLists]=useState([]);

    useEffect(()=>{

        axios.get('/getUserWishlistContainersAndItems').then(response=>{
            console.log(response.data.userWishlist);
            const formattedWishlist=response.data.userWishlist.map(item=>({
                    id:item.wishlistContainer.id,
                    title:item.wishlistContainer.name,
                    saves:item.itemsLength,
                    url:item.items[0].hosthomes.hosthomephotos[0],
                    link:`/WishlistsSet/${item.wishlistContainer.name}/${item.wishlistContainer.id}`,
                
            }));

            console.log(formattedWishlist);
            setWishLists(formattedWishlist);


        }).catch(err=>{
            console.error(err);

        });

    },[]);

    return(
    <div>
        <Header/>
         <div className=" block h-full px-6 md:px-10 xl:px-20 max-w-7xl  m-auto  ">
          <Wishlists wishlists={wishlists}/>
    
        </div>
     <BottomNavigation/>
    </div>
    );


}

export default WishList;
