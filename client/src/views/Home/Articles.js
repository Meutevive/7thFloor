import temps from "../../assets/Svg/temps.svg";
import jaime from "../../assets/Svg/jaime.svg";
import commentaire from "../../assets/Svg/commentaire.svg";
import {useMediaQuery} from "react-responsive";

//importe les modules pour la recupe des articles.
import react, {useEffect, useState} from 'react';
import axios from "axios";

const Articles = () => {
// Initialise un état pour stocker les articles récupéré
    const [article, setArticle] = useState([]);

    // Utilise useEffect pour récupéré les articles lorsque le composant est monté
    useEffect(() => {
        // La requette GET à l'api pour récupéré les articles
        axios
            .get("http://localhost:8090/api/v1/article")
            .then((response) => {
                // Si la requête est réussie, l'état articles se met à jour avec les données recup
                // Trie les articles par ordre décroissant de date de création
                const sortedArticles = response.data.sort((a, b) =>
                    a.creationDate < b.creationDate ? 1 : -1
                );

                setArticle(sortedArticles);
            })
            .catch((error) => {
                // Si l'erreur est produite lors de la requête, l'erreur est afficher dans la console
                console.error("Erreur lors de la récupération des articles :", error);
            });
    }, []); // Passe un tableau vide pour exécuter useEffect une seule fois lors du montage du composant

    return (
        <>
            {article.map((article) => (
                // First block
                <section
                    key={article._id}
                    className="py-6 px-2.5 w-4/5 max-w-screen-desktop flex-row flex space-x-4 my-8"
                >
                    <div className="article flex flex-row items-center space-x-4">
                        {/* Affiche le cover de l'article */}
                        <div className="w-40">
                            <img
                                className="object-fill w-40 h-52 rounded-md"
                                src={`data:image/jpeg;base64,${article.cover}`}
                                alt={article._id}
                            />
                        </div>
                    </div>

                    <div className="flex-col justify-between items-stretch mt-0 flex">
            <span className="text-red-600 ml-0 text-xl font-bold leading-7">
              {article.title}
            </span>
                        <div className="w-full flex-col justify-between items-center mb-1 font-small text-xs flex">
                            {/* Add contenu listed from acceuil data */}
                            <h1 className="mb-1 text-sm font-black">{article.content}</h1>
                        </div>
                    </div>
                </section>
            ))}
        </>

    );

}

export default Articles;


