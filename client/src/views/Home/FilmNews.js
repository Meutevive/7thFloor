import react from "react";
import {Button} from "../../components/buttons/Button";
import StarRate from "../../assets/Svg/StarRate.svg";
import { useState, useEffect } from 'react';
import axios from 'axios';


/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const FilmNews = () => {

    const [films, setFilms] = useState([]);

    useEffect(() => {
        async function fetchFilms() {
            try {
                const response = await axios.get('http://localhost:8090/api/v1/films'); // Remplacez cette URL par l'URL de votre API
                setFilms(response.data.content);
            } catch (error) {
                console.error(error);
            }
        }
        fetchFilms();
    }, []);

    const recentFilms = films.slice(-3).reverse(); // Prend les 3 derniers films et les inverse pour avoir les plus récents

    return (
        <div className="row-span-3 space-x-2">
            <section className="flex flex-col py-4 px-12 w-4/5 mr-20 max-w-screen-desktop mt-14 leading-3">
                <h1 className="mb-3 text-2xl font-black text-red-600">Les films les plus récents</h1>
                <div className="flex flex-col space-y-8">
                    {recentFilms.map((film) => (
                        <div key={film.id} className="flex space-x-2 items-start">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-24">
                                    <img
                                        className="object-fill w-24 h-28 rounded-md items-center mt-4"
                                        src={`data:image/jpef;base64,${film.poster}`}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-3 mt-4 items-start">
                                <div>{film.title}</div>
                                <div>
                                    <Button
                                        text="Ajouter à ma liste"
                                        color="red"
                                        size="small"
                                    />
                                </div>
                            </div>
                            &nbsp;&nbsp;
                        </div>
                    ))}
                </div>
            </section>
        </div>

    );

};

export default FilmNews;