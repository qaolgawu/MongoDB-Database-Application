import { api } from "./api.js";
import { user } from "./user.js";


async function auth(){
    const res = await api.get();
    if(res.ok){
        const data = await res.json();
        user.setUser(data);
    
        return await data
    } else {
        throw new Error('Something went wrong');
    }
}


export default auth