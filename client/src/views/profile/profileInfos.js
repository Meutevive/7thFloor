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


    // Affiche les informations de l'utilisateur connecté
    return (
        <section className="px-8 py-6 mb-4">
            <div className="flex items-center space-x-4">
                <img className="w-24 h-24 rounded-full border-4 border-red-600" src="https://via.placeholder.com/96" alt="Profile" />
                <div>
                    <h2 className="text-2xl font-semibold">{user.firstname} {user.lastname}</h2>
                    <p className="text-sm text-gray-400">Membre depuis 2023</p>
                </div>
            </div>
        </section>


    );

};

export default ProfileInfos;