import axios from 'axios';


const instance =axios.create(
    {

    baseURL:"https://shortletbooking.com/api"


}
);
// instance.defaults.post['Content-Type']= 'application/json';


export default instance