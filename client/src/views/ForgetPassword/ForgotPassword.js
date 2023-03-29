/*import React, { useState } from 'react';
import axios from 'axios';*/
import React from "react";
const ForgotPassword = () => {

   /* const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Remplacez cette URL par l'URL de votre API pour la réinitialisation du mot de passe
            await axios.post('http://localhost:8090/api/v1/forgot-password', { email });
            setMessage('Un e-mail de réinitialisation du mot de passe a été envoyé à votre adresse e-mail.');
        } catch (error) {
            console.error(error);
            setMessage("Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation. Veuillez réessayer.");
        }
    };*/

    const handleSubmit = (event) => {
        event.preventDefault();
        // Traiter la soumission du formulaire ici
    };

    return (
        <div className=" min-h-screen flex items-center justify-center">
            <section className="w-full max-w-md bg- p-8 rounded">
                <h1 className="text-2xl font-bold mb-4 text-red-600">
                    Mot de passe oublié
                </h1>
                <p className="mb-6">
                    Entrez votre adresse e-mail et nous vous enverrons un lien pour
                    réinitialiser votre mot de passe.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-bold mb-2">
                            Adresse e-mail :
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Réinitialiser le mot de passe
                    </button>
                </form>
            </section>
        </div>
    );
};


export default ForgotPassword;