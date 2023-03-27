export const actorInitialValues = {
    fullname: "",
    description: "",
    birthdate: "",
    country:""
}


export const directorInitialValues = {
    fullname:"",
    description:"",
    birthdate: "",
    country:""
}

export const articleInitialValues = {
    title:"",
    content:"",
}

export const filmInitialValues = {
    title:"",
    description:"",
    genres : "",
    file : "",
    pubDate : "",
    actors : [],
    directors : []
}

export const selectedFilmsTypes = [
    "action", "aventure", "romance", "horreur", "combat", "animaux", "comedie","detective", "drame", "fantastique",
"amitié", "loi", "manga", "mature", "melodrame", "musique", "politique", "sci-fi", "sport", "suspence", "tokusatu",
"vampire", "westerne", "jeunesse", "bussness", "crime", "documentaire", "famille", "nourriture", "historique", "vie",
"art-martiaux", "medical", "mystére", "psychologique", "thriller", "tragédie", "guerre", "wuxia", "zombie"];



export const validateFilm = (filmValues)=>{
    const errors = {};
    if (!filmValues.title) {
        errors.title = "Vous devez rentrer le nom du film";
    } else {
        delete errors.title
    }

    return errors;
}

export const validateDirector = (directorValues)=>{
    const errors = {};
    if (!directorValues.fullname) {
        errors.fullname = "Vous devez rentrer le nom du réalisateur";
    } else {
        delete errors.fullname
    }

    return errors;
}

export const validateActor = (actorValues)=> {
    const errors = {};

    if (!actorValues.fullname) {
        errors.fullname = "Vous devez rentrer le prénom et nom de l'acteur";
    } else {
        delete errors.fullname
    }

    if (!actorValues.birthdate) {
        errors.birthdate = "la date de naissance de l'acteur";
    } else {
        delete errors.birthdate
    }

    return errors;
}
export const validateArticle = (articleValues)=> {
    const errors = {};

    if (!articleValues.title) {
        errors.title = "Vous devez rentrer le titre de l'article";
    } else {
        delete errors.title
    }

    if (!articleValues.content) {
        errors.content = "vous devez rentrer le contenu de l'article";
    } else {
        delete errors.content
    }

    return errors;
}