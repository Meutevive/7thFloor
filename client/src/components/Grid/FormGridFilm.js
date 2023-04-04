import React, { useState, useEffect } from "react";
import "../../assets/App.css";
import axios from "axios";



//gives a delay time
const delay = 7000;

export const FormGridFilm = () => {
    const [loading, setLoading] = useState(true);
    const [films, setFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);


    const [totalFilms, setTotalFilms] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isFetching, setIsFetching] = useState(false);





    // fonction qui récupère les films dans la db
    //Modification de la fonction fetchMovies
    // pour qu'elle récupère également le nombre total de films et le nombre de pages.
    const fetchMovies = async (page) => {
        try {
            setIsFetching(true);
            const response = await axios.get("http://localhost:8090/api/v1/films", {
                params: {
                    size: 7,
                    page: page,
                },
            });
            if (response.data && Array.isArray(response.data.content)) {
                console.log("Films récupérés :", response.data.content);
                setFilms(response.data.content);
                setTotalFilms(response.data.totalElements);
                setTotalPages(response.data.totalPages);
            } else {
                console.error("La réponse n'est pas un tableau :", response.data);
            }
            setIsFetching(false);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des films :", error);
            setIsFetching(false);
            setLoading(false);
        }
    };


    //useEffect pour gérer les effets secondaires du cycle de vie des composants.
    useEffect(() => {
        fetchMovies(currentPage);
    }, []);
    
    useEffect(() => {
        if (films.length > 0) {
            const timer = setTimeout(() => {
                onArrowClick("next");
            }, delay);
    
            return () => {
                clearTimeout(timer);
            };
        }
    }, [currentPage, totalPages]);
    




    // flèches pour changer de slide manuellement
    function onArrowClick(direction) {
        const maxPage = totalPages - 1;
        setCurrentPage((prevPage) => {
            const newPage =
                direction === "prev"
                    ? prevPage === 0
                        ? maxPage
                        : prevPage - 1
                    : direction === "next"
                        ? prevPage === maxPage
                            ? 0
                            : prevPage + 1
                        : prevPage;
            console.log("New page:", newPage);
            fetchMovies(newPage);
            return newPage;
        });
    }


    // affiche 7 images dans le conteneur du slider
    //affiche les images en fonction de currentPage
    const start = currentPage * 7;



    return (
        <div className="w-full max-w-screen-desktop mx-auto my-0">
            {loading ? (
                <div className="text-center text-white">Chargement des films...</div>
            ) : (
                <>
                    <div className="my-4 p-4 bg-gray-900 rounded-md">
                        <div className="grid grid-cols-7 gap-4 h-48 w-full bg-black rounded-md mx-auto justify-between mt-5">
                            {films.map((film, idx) => (
                                <div
                                    key={idx}
                                    className={`h-full w-full bg-cover bg-center rounded-md border-2 border-red-500`}
                                    style={{ backgroundImage: `url(data:image/jpeg;base64,${film.poster})` }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="text-center relative">
                        {Array(Math.ceil(films.length / 7))
                            .fill()
                            .map((_, idx) => {
                                const isVisible = idx === currentPage;
                                return (
                                    <div
                                        key={idx}
                                        className={` mt-[15px] mb-0 mx-[7px] rounded-[50%] ${isVisible ? "active bg-red" : ""}`}
                                        onClick={() => {
                                            setCurrentPage(idx);
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
