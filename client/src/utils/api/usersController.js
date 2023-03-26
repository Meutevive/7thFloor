import { api } from "../../services/constants/api/constants";

export const getUsers =  ()=>{
    return fetch(api+'/users').then((response)=>response.json())
}

export const deleteUser = async (id)=>{
     const requestOptions = {
        method: 'DELETE',
    }
    return await fetch(api+'/users/'+id, requestOptions);
}