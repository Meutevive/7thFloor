
import { api } from "../../services/constants/api/constants";

export const getFilms =  ()=>{
    return  fetch(api+'/films').then((response)=>response.json())
}

export const addfilm = async(filmValues)=>{

        let formData= new FormData();
        formData.append('title', filmValues.title)
        formData.append('description', filmValues.description)
        formData.append('pubDate', filmValues.pubDate)
        formData.append('genres', filmValues.genres)
        formData.append('actors', filmValues.actors)
        formData.append('directors', filmValues.directors)
        formData.append('file', filmValues.file)

        const requestOptions = {
                method: 'POST',
                body: formData
        }
        return await fetch(api+'/films', requestOptions);
        }

export const deleteFilm = async (id)=>{
    const requestOptions = {
        method: 'DELETE',
    }
    return await fetch(api+'/films/'+id, requestOptions);
}

export const updateFilm = async (filmValues)=>{

    const data = {
        id : filmValues.id,
        title : filmValues.title,
        description: filmValues.description,
        pubDate: filmValues.pubDate,
        genres : filmValues.genres,
        actors : filmValues.actors,
        directors: filmValues.directors
    }
    console.log(data);


    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    return await fetch(api+'/films', requestOptions);
}

export const getFilm = async (id)=>{
    const requestOptions = {
        method: 'GET',
    }
    return await fetch(api+'/films/'+id, requestOptions);
}

export const getFilmByTitle = async (title)=>{
    const requestOptions = {
        method: 'GET',
    }
    return await fetch(api+'/films/'+title, requestOptions);
}

export const getFilmByPagination = async ()=>{
    const requestOptions = {
        method: 'GET',
    }
    return await fetch(api+'/films?sort=pubDate')
}