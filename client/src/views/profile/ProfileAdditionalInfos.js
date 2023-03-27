import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


const getUsernameFromToken = (token) => {
    try {
        const decoded = jwt_decode(token);
        return decoded.sub;
    } catch (error) {
        console.error("Erreur lors de la décodage du JWT:", error);
        return null;
    }
};



const ProfileAdditionalInfos = () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const username = getUsernameFromToken(token);
                if (username) {
                    const response = await axios.get(`http://localhost:8090/api/v1/users/${username}`);
                    setUser(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);


    const [editing, setEditing] = useState(false);

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const genderRef = useRef(null);
    const poscodeRef = useRef();
    const addressRef = useRef();
    const countryRef = useRef();
    const phoneRef = useRef();


    //gere l'édition
    const handleEdit = () => {
        setEditing(true);
    };

    //permet de géré la fonction de sauvegarde et l'envoi dans la bdd
    const handleSave = async () => {
        // Récupérer les nouvelles informations à partir des champs de formulaire
        const updatedFistname = firstnameRef.current.value;
        const updatedLastname = lastnameRef.current.value;
        const updatedEmail = emailRef.current.value;
        const updatedGender = genderRef.current.value;
        const updatedPostcode = poscodeRef.current.value;
        const updatedAddress = addressRef.current.value;
        const updatedCountry = countryRef.current.value;
        const updatedPhone = phoneRef.current.value;
        // ... (autres champs si nécessaire)

        // Logique de sauvegarde des modifications
        // Par exemple, envoyer les nouvelles informations à l'API pour mettre à jour les données de l'utilisateur
        try {
            await axios.put(`http://localhost:8090/api/v1/users/update`, {
                username : user.username,
                firstname : updatedFistname,
                lastname : updatedLastname,
                email: updatedEmail,
                gender : updatedGender,
                poscode : updatedPostcode,
                address: updatedAddress,
                country : updatedCountry,
                phone: updatedPhone,
                // ... (autres champs si nécessaire)

                headers: {

                    'Content-Type' : 'application/json',
                },
            });
            // Mettre à jour l'état local avec les nouvelles informations
            setUser({
                ...user,
                firstname : updatedFistname,
                lastname : updatedLastname,
                email: updatedEmail,
                gender : updatedGender,
                poscode : updatedPostcode,
                address: updatedAddress,
                country : updatedCountry,
                phone: updatedPhone,
                // ... (autres champs si nécessaire)
            });
        } catch (error) {
            console.error(error);
        }

        setEditing(false);
    };



    //gere l'annulation
    const handleCancel = () => {
        setEditing(false);
    };


    return(

        <section className="px-8 py-6 mb-4">
            {editing ? (
                <>
                    {/* Formulaire de modification */}
                    <div className="grid grid-cols-2 gap-4 mb-4">

                        <div>
                            <label htmlFor="firstname" className="block text-sm font-bold mb-2">Nom:</label>
                        </div>

                        <div>
                            <input ref={firstnameRef} type="text" id="firstname" className="w-full px-3 py-2 border rounded bg-white text-black" defaultValue={user.firstname} />
                        </div>

                        <div>
                            <label htmlFor="lastname" className="block text-sm font-bold mb-2">Prénom:</label>
                        </div>

                        <div>
                            <input  ref={lastnameRef} type="text" id="lastname" className="w-full px-3 py-2 border rounded bg-white text-black" defaultValue={user.lastname} />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold mb-2">Email:</label>
                        </div>

                        <div>
                            <input ref={emailRef} type="email" id="email" className="w-full px-3 py-2 border rounded bg-white text-black" defaultValue={user.email} />
                        </div>

                        <div>
                            <label htmlFor="gender" className="block text-sm font-bold mb-2">Sexe:</label>
                        </div>

                        <div>
                            <select ref={genderRef} type="text" id="gender" className="w-full px-3 py-2 border rounded bg-white text-black" defaultValue={user.gender}>
                                <option value="M"> M </option>
                                <option value="F"> F </option>
                                <option value="Autre"> Autre </option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="postcode" className="block text-sm font-bold mb-2">Code postal:</label>
                        </div>
                        <div>
                            <input ref={poscodeRef} type="text" id="postcode" className="w-full px-3 py-2 border rounded bg-white text-black" defaultValue={user.postcode} />
                        </div>

                        <div>
                            <label htmlFor="adress" className="block text-sm font-bold mb-2">Adresse:</label>
                        </div>
                        <div>
                            <input  ref={addressRef} type="text" id="adress" className="w-full px-3 py-2 border rounded bg-white text-black" defaultValue={user.adress} />
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-sm font-bold mb-2">Pay:</label>
                        </div>

                        <div>
                            <input ref={countryRef} type="text" id="country" className="w-full px-3 py-2 border rounded bg-white text-black" defaultValue={user.country} />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-bold mb-2">Tel:</label>
                        </div>
                        <div>
                            <input  ref={phoneRef} type="text" id="phone" className="w-full px-3 py-2 border rounded bg-white text-black" defaultValue={user.phone} />
                        </div>


                    </div>

                    <button className="bg-red-600 text-white px-4 py-2 rounded mr-2" onClick={handleSave}>Enregistrer</button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCancel}>Annuler</button>
                </>
            ) : (
                <>
                    {/* Affichage des informations */}
                    <h2 className="text-xl font-bold text-red-600 mb-4">Informations supplémentaires</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <span className="font-semibold">Nom :  {user.lastname || ''}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Prénom : {user.firstname || ''}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Email : {user.email || ''}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Code postal : {user.postalCode || ''}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Adresse : {user.address || ''}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Pays : {user.country || ''}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Téléphone : {user.phone || ''}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Sexe : {user.gender || ''}</span>
                        </div>
                    </div>

                    <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded" onClick={handleEdit}>Modifier</button>
                </>
            )}
        </section>
    );



};



export default ProfileAdditionalInfos;