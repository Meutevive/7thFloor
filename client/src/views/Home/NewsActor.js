import {contenu1, contenu2} from "./test/Data";
import temps from "../../assets/Svg/temps.svg";
import jaime from "../../assets/Svg/jaime.svg";
import commentaire from "../../assets/Svg/commentaire.svg";
import {useMediaQuery} from "react-responsive";

//importe les modules pour la recupe des articles.
import react, {useEffect, useState} from 'react';
import axios from "axios";

const NewsActor = () => {
    const isTabletOrMobile = useMediaQuery({query: "(max-width: 1224px)"});

    //initialise un état pour stocker les articles récupéré
    const [article, setArticle] = useState([]);

    //utilise useEffect pour récupéré les articles lorsque le composant est monté
    useEffect(() => {

        //la requette GET à l'api pour récupéré les articles
        axios
            .get("http://localhost:8090/api/v1/Article")
            .then((response) => {
                //si la requête est réussie, l'état  articles se met à jour avec les données recup
                // Trie les articles par ordre décroissant de date de création
                const sorteArticles = response.data.sort((a, b) =>
                    a.creationDate < b.creationDate ? 1 : -1
                );

                setArticle(response.data);
            })
            .catch((error) => {
                //si l'erreur est produite l'ors de la requête, l'erreur est acfficher dans la console
                console.error("Erreur lors de la récupération des articles :", error);
            });
    }, []); //Passe un tableau vide pour exécuter useEffect une seule fois lors du montage du composant


    return (
        <>
            {article.map(article)} => (
            //first block
            <section
                key={article.id}
                className="py-6 px-2.5 w-4/5 max-w-screen-desktop flex-row flex space-x-4 my-8">

                // Utilise la méthode map pour parcourir le tableau d'articles et afficher chaque article
                // La propriété key est nécessaire lors de l'utilisation de map pour assurer un rendu efficace

                <div className=" article flex flex-row items-center space-x-4">
                    {/*affiche le cover de l'article*/}
                    <div className="w-32">
                        <img
                            className={`object-fill ${
                                isTabletOrMobile ? "w-full h-auto" : "w-40 h-50"
                            }`}
                            src={article.cover}
                            alt={article.id}
                        />

                    </div>

                </div>

                <div className="flex-col justify-between items-stretch mt-0 flex">
                    <span className="text-red-600 ml-0 text-xl font-bold leading-7">
                        {article.title}
                    </span>
                    <div className="w-full flex-col justify-between items-center mb-1 font-small text-xs flex">
                        {/*add contenu listed from acceuil data*/}
                        <h1 className="mb-1 text-sm font-black">{article.description}</h1>
                    </div>
                    &nbsp;

                    {/*<div className="w-6/12 flex-row justify-between items-center mt-0 flex">
                        <img className="w-4 h-4 object-cover self-start" src={temps}/>
                        <span>{contenu1.temps}</span>
                        <img className="w-4 h-3 object-cover mb-0 ml-4" src={jaime}/>
                        <span className="mb-0">{contenu1.jaime}</span>
                        <img className="w-4 h-4 object-cover ml-2" src={commentaire}/>
                        <span className="mb-0 ml-0">{contenu1.Nbcommentaire}</span>
                    </div>*/}
                </div>
            </section>
            ))}
        </>


    );


}

export default NewsActor;


