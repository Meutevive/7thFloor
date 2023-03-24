import { api } from "../../services/constants/api/constants";

export const getActors =  ()=>{
    return  fetch(api+'/acteur').then((response)=>response.json())
}

export const addActor = async(actorValues)=>{
    console.log(actorValues)
    let formData= new FormData();
    formData.append('fullname', actorValues.fullname)
    formData.append('birthdate', actorValues.birthdate)
    formData.append('description', actorValues.description)
    formData.append('file', actorValues.image)
    const requestOptions = {
        method: 'POST',
        body: formData
    }
    return await fetch(api+'/acteur', requestOptions);
}

export const deleteActor = async (id)=>{
    const requestOptions = {
        method: 'DELETE',
    }
    return await fetch(api+'/acteur/'+id, requestOptions);
}

export const updateActor = async (actorValues)=>{
    console.log(actorValues)
    const data = {
        id : actorValues.id,
        fullname : actorValues.fullname,
        birthdate : actorValues.birthdate,
        description : actorValues.description
    }


    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    return await fetch(api+'/acteur', requestOptions);
}

export const getActor = async (id)=>{
    const requestOptions = {
        method: 'GET',
    }
    return await fetch(api+'/acteur/'+id, requestOptions);
}

export const getActorByFullName = async (fullname)=>{

     const requestOptions = {
        method: 'GET',
    }
    return await fetch(api+'/acteur/search?fullname='+fullname, requestOptions);
}