import react from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";



const getUsernameFromToken = (token) => {
    try {
        const decoded = jwt_decode(token);
        console.log("Decoded JWT:", decoded);
        return decoded.sub; // Utilisez 'sub' pour récupér le 'username'
    } catch (error) {
        console.error("Erreur lors de la décodage du JWT:", error);
        return null;
    }
};



const getInitials = (firstname, lastname) => {
    if (!firstname || !lastname) {
        return "";
    }
    return firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase();
};




const ProfileInfos = () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token"); // ligne pour utiliser "token"
                console.log("JWT:", token);
                const username = getUsernameFromToken(token);
                console.log("Username:", username);
                if (username) {
                    const response = await axios.get(`http://localhost:8090/api/v1/users/${username}`);
                    console.log("API Response:", response);
                    setUser(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    };



    // Affiche les informations de l'utilisateur connecté
    return (
        <section className="px-8 py-6 mb-4">
            <div className="flex items-center space-x-4">
                <div
                    className="w-24 h-24 rounded-full border-4 border-red-600 bg-red-600 text-white flex items-center justify-center text-4xl font-bold"
                    title={`${user.firstname} ${user.lastname}`}
                >
                    {getInitials(user.firstname, user.lastname)}
                </div>
                <div>
                    <h2 className="text-2xl font-semibold">{user.firstname} {user.lastname}</h2>
                    <p className="text-sm text-gray-400">Membre depuis {formatDate(user.created_at)}</p>
                </div>
            </div>
        </section>


    );

};

export default ProfileInfos;