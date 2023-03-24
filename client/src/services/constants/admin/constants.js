export const actorInitialValues = {
    fullname: "",
    description: "",
    birthdate: "10-10-2010",
}


export const directorInitialValues = {
    firstname:"",
    lastname:"",
    description:"",
    birthdate: "",
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

export const selectedFilmsTypes = ["action", "aventure", "romance", "horreur", "combat"];


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
    if (!directorValues.firstname) {
        errors.firstname = "Vous devez rentrer le prénom de l'acteur";
    } else {
        delete errors.firstname
    }

    if (!directorValues.lastname) {
        errors.lastname = "Vous devez rentrer le nom de l'acteur";
    } else {
        delete errors.lastname
    }

    if (!directorValues.birthdate) {
        errors.birthdate = "la date de naissance de l'acteur";
    } else {
        delete errors.birthdate
    }

    if(!directorValues.description){
        errors.description= "Vous devez rentrer la description de l'acteur";
    }else{delete errors.description}

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