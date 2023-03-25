import { api } from "../../services/constants/api/constants";

export const getArticles =  ()=>{
    return  fetch(api+'/article').then((response)=>response.json())
}

export const addArticle = async(articleValues)=>{

    let formData= new FormData();
    formData.append('title', articleValues.title)
    formData.append('content', articleValues.content)
    formData.append('cover', articleValues.cover)
    formData.append('description', "")

    const requestOptions = {
        method: 'POST',
        body: formData
    }
    return await fetch(api+'/article', requestOptions);
}