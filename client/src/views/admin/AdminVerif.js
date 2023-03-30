import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import admin, {Admin} from "./admin";
import jwt_decode from "jwt-decode";


const AdminVerif = () => {

    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const getUsernameFromToken = (token) => {
        try {
            const decoded = jwt_decode(token);
            return decoded.sub;
        } catch (error) {
            console.error("Erreur lors de la décodage du JWT:", error);
            return null;
        }
    };

    useEffect(() => {
        const checkAdminRole = async () => {
            try {
                // Récupère le token stocké dans le localStorage
                const token = localStorage.getItem("token");

                // Extrait le nom d'utilisateur à partir du token
                const username = getUsernameFromToken(token);

                // Si un nom d'utilisateur est présent, effectue une requête à l'API pour obtenir les informations de l'utilisateur
                if (username) {
                    const response = await axios.get(`http://localhost:8090/api/v1/users/${username}`);

                    // Vérifie si le rôle de l'utilisateur est "admin"
                    if (response.data.role === "admin") {
                        // Si l'utilisateur est un administrateur, met à jour l'état isAdmin pour afficher le contenu de la page d'administration
                        setIsAdmin(true);
                    } else {
                        // Si l'utilisateur n'est pas un administrateur, redirige-le vers la page d'accueil
                        navigate("/");
                    }
                }
            } catch (error) {
                console.error(error);
                // En cas d'erreur, redirige l'utilisateur vers la page d'accueil
                navigate("/");
            }
        };

        // Appelle la fonction checkAdminRole pour vérifier si l'utilisateur est un administrateur
        checkAdminRole();
    }, [navigate]);


    // Si l'utilisateur est un administrateur, affiche le contenu de la page d'administration
    // Sinon, affiche un message d'erreur
    return (
        <>
            {isAdmin ? (
                <Admin/>
            ) : (
                <div className="error-message">
                    ACCÈS RÉFUSÉ : Vous devez être administrateur pour accéder à cette page.
                </div>
            )}
        </>
    );

  
};



export default AdminVerif;