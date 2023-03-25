import react from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const getUserIdFromToken = (token) => {
    try {
        const decoded = jwt_decode(token);
        return decoded.userId; // Assurez-vous que le JWT contient un champ 'userId' avec l'ID utilisateur
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
                const token = localStorage.getItem("jwt");
                const userId = getUserIdFromToken(token);
                if (userId) {
                    const response = await axios.get(`http://localhost:8090/api/v1/user/${userId}`);
                    setUser(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);


    // Affiche les informations de l'utilisateur
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