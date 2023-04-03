import React, {useState, useEffect} from "react";
import "../../assets/App.css";
import axios from "axios";



//gives a delay time
const delay = 3000;

export const FormGridFilm = () => {

    const [loading, setLoading] = useState(true);
    const [films, setFilms ] = useState([]);
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    //un état pour suivre la page actuelle et mettre à jour la fonction fetchMovies
    const [currentPage, setCurrentPage] = useState(0);



    //fonction qui récupère les films dans la db
    const fetchMovies = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8090/api/v1/films", {
                params: {
                    size: 7,
                    page: page
                }
            });
            if (response.data && Array.isArray(response.data.content)) {
                setFilms(response.data.content);
            } else {
                console.error("La réponse n'est pas un tableau :", response.data);
            }
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des films :", error);
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchMovies();
    }, []);



    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    // arrows directions
    function onArrowClick(direction) {
        resetTimeout();
        if (direction === "prev") {
            setCurrentPage((prevPage) => (prevPage === 0 ? 0 : prevPage - 7));
        } else if (direction === "next") {
            setCurrentPage((prevPage) => prevPage + 7);
        }
    }



    //effet sécondaire pour current page
    useEffect(() => {
        fetchMovies(setCurrentPage());
    }, [currentPage]);



    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setIndex((prevIndex) =>
                prevIndex >= films.length - 7 ? 0 : prevIndex + 7
            );
        }, delay);

        return () => {
            resetTimeout();
        };
    }, [index, films.length]);




    // show 7 images in the boundaries container
    // make the container to have 7 images at once and slide to another array of 7 images
    const start = Math.floor(index / 7) * 7;

    React.useEffect(() => {

    }, []);


    return (
        <div className="w-full max-w-screen-desktop mx-auto my-0">
            {loading ? (
                <div className="text-center text-white">Chargement des films...</div>
            ) : (
                <>
                    <div className="my-4 p-4 bg-gray-900 rounded-md">
                        <div className="grid grid-cols-7 gap-4 h-48 w-full bg-black rounded-md mx-auto  justify-between mt-5">
                            {films.slice(start, start + 7).map((film, idx) => (
                                <div
                                    key={start + idx}
                                    className={`h-full w-full bg-cover bg-center rounded-md border-2 border-red-500`} // Ajout d'une bordure
                                    style={{ backgroundImage: `url(data:image/jpeg;base64,${film.poster})` }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="text-center relative">
                        {Array(Math.ceil(films.length / 7))
                            .fill()
                            .map((_, idx) => {
                                const start = idx * 7;
                                const end = start + 7;
                                const isVisible = start <= index && index < end;
                                return (
                                    <div
                                        key={idx}
                                        className={` mt-[15px] mb-0 mx-[7px] rounded-[50%] ${isVisible ? "active bg-red" : ""}`}
                                        onClick={() => {
                                            setIndex(start);
                                        }}
                                    />
                                );
                            })}
                        <div
                            className="left-arrow"
                            style={{
                                position: "absolute",
                                left: 0,
                                top: "50%",
                                bottom: "50% d",
                                transform: "translateY(-50%)",
                            }}
                        >
                            <button
                                className="arrow text-2xl font-bold text-white hover:text-gray-300 mb-64"
                                onClick={() => onArrowClick("prev")}
                            >
                                &lt;
                            </button>
                        </div>

                        <div
                            className="right-arrow"
                            style={{
                                position: "absolute",
                                right: 0,
                                top: "50%",
                                transform: "translateY(-50%)",
                            }}
                        >
                            <button
                                className="arrow text-2xl font-bold text-white hover:text-gray-300 mb-64"
                                onClick={() => onArrowClick("next")}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );


};
