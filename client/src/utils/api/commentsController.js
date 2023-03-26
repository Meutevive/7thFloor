import {api} from "../../services/constants/api/constants";

export const postComment = async (id, comment, user)=>{

    let formData= new FormData();
    formData.append('content', comment);
    formData.append('author', user);

     const requestOptions = {
        method: 'PUT',
        body: formData
    }

    return await fetch(api+'/films/'+id+'/comment', requestOptions);
}