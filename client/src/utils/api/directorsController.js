import { api } from "../../services/constants/api/constants";

export const getDirectors =  ()=>{
    return  fetch(api+'/director').then((response)=>response.json())
}

export const addDirector = async(directorValues)=>{
    let formData= new FormData();
    console.log(directorValues);
    let datestr = (new Date(directorValues.birthdate)).toUTCString();
    formData.append('fullname', directorValues.fullname)
    formData.append('country', directorValues.country)
    formData.append('birthdate', new Date(directorValues.birthdate) )
    formData.append('description', directorValues.description)
    formData.append('poster', directorValues.image)
    const requestOptions = {
        method: 'POST',
        body: formData
    }
    return await fetch(api+'/director', requestOptions);
}

export const deleteDirector = async (id)=>{
    const requestOptions = {
        method: 'DELETE',
    }
    return await fetch(api+'/director/'+id, requestOptions);
}

export const getDirector = async (id)=>{
    const requestOptions = {
        method: 'GET',
    }
    return await fetch(api+'/director/'+id, requestOptions);
}

export const getDirectorByFullName = async (fullname)=>{
     const requestOptions = {
        method: 'GET',
    }
    return await fetch(api+'/director/search?fullname='+fullname, requestOptions);
}

