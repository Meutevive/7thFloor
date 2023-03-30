const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*[a-zA-Z]).{8,}$/;

export const validate = (passwordValues) => {
    const errors = {};

    if(!(passwordValues.password)){
        errors.password = "Veuillez saisir le mot de passe"
    }else{delete errors.password}

    if (!regex_password.test(passwordValues.password)) {
        errors.password = "Votre mot de passe doit contenir au moins 8 charactéres, un charactére majuscule, un charactére minuscule, un chiffre et un charactére spécial"
    }
    else { delete errors.password }

    if (passwordValues.password !== passwordValues.confirm_password) {
        errors.confirm_password = "Les deux mots de passe ne se ressemble pas"
    } else { delete errors.confirm_password }

    return errors;
}