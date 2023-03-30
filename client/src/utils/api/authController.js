import { api } from "../../services/constants/api/constants";

export const SecurityApi = async (type,userValues)=>{
    const requestOptions ={
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userValues)
    };

    localStorage.removeItem("token");
    const response = await fetch(api+'/auth/'+type, requestOptions)
    if (response.ok || response.status === 409) {
         return response;
    }
    else{
        throw new Error('Data could not be fetched!');
    }
}


export const authUser = async (type,userValues)=>{
     const response = await SecurityApi(type,userValues).then((response)=>{
        if(response.ok){
            response.json().then((response)=>{
                localStorage.setItem("token",response.token);
            })
            return response;
        }
        if(response.status === 409){
            return response;
        }
    });
    if(response){
        return response;
    }
}

export const forgotPassword = async (email) => {
    let formData = new FormData();
    formData.append("email", email)
    const requestOptions = {
        method: 'POST',
        body: formData
    }
    return await fetch(api + '/auth/resetpassword', requestOptions);
}

export const newPassword = async (password, token) => {
    let formData = new FormData();
    formData.append("password", password)
    formData.append("token", token)
    const requestOptions = {
        method: 'POST',
        body: formData
    }
    return await fetch(api + '/auth/newpassword', requestOptions);
}

