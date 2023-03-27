import react from 'react';
import  {useState, useEffect} from "react";
import axios from "axios";

import {FormNavbar} from "../../components/navbar/FormNavbar";
import footer, {Footer} from "../../components/footer/Footer";
import {Link} from "react-router-dom";


const MovieList = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("http://localhost:8090/api/v1/films");
                setMovies(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, []);


    return (
        <div>
            <FormNavbar/>
            &nbsp;
            <section className="px-8 py-6 mb-4">
                <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Mes films et séries</h2>
                <div className="grid grid-cols-5 gap-4">
                    {movies.map((movie) => (
                        <Link key={movie.id} to={`/films/film/${movie.id}`}>

                            <div key={movie._id} className="bg-gray text-black p-4 rounded">
                                <img className="w-30 h-52 object-cover rounded"
                                     src={`data:image/jpeg;base64,${movie.poster}`}
                                     alt={movie.title}
                                />
                                <h3 className="text-l text-white font-bold mb-4 mt-4">{movie.title}</h3>
                                <p className="text-red-600">Date de sortie :</p>
                                <p className="text-red-600">{movie.pubDate}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </div>


    );

};

export default MovieList;