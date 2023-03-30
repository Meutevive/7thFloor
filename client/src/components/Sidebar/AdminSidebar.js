import {Links} from "./Links";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAllUsers} from "../../reducers/usersReducer";
import {fetchAllActors} from "../../reducers/actorsReducer";
import { fetchAllDirectors } from "../../reducers/directorsReducer";
import { fetchAllFilms } from "../../reducers/filmsReducer";
import {fetchAllArticles} from "../../reducers/articlesReducer";
import { useLocation } from "react-router-dom";

export const AdminSidebar = ()=>{
    const {allUsers} = useSelector((state)=>state.users)
    const {allActors} = useSelector((state)=>state.actors)
    const {allDirectors} = useSelector((state)=>state.directors)
    const {allFilms, elements} = useSelector((state)=>state.films)
    const {allArticles} = useSelector((state)=>state.articles)
    const dispatch = useDispatch()
    const query = new URLSearchParams(useLocation().search);
    const page = query.get("page");

    useEffect(() => {
        dispatch(fetchAllFilms(page));
        dispatch(fetchAllUsers());
        dispatch(fetchAllActors());
        dispatch(fetchAllDirectors());
        dispatch(fetchAllArticles());
    },[page])

    return(
        <section className="h-full px-3 py-4">
            <ul className="space-y-2">
                <li>
                    <p
                       className="flex items-center p-2 text-base font-normal  rounded-lg ">
                        <svg aria-hidden="true"
                             className="w-6 h-6  transition duration-75 "
                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                        </svg>
                        <span className="ml-3">Administrateur</span>
                    </p>
                </li>
                <Links name="users" title="Utilisateurs" count={allUsers.length}/>
                <Links name="actors" title="Acteurs" count={allActors.length}/>
                <Links name="films" title="Filmographie" count={elements}/>
                <Links name="directors" title="Réalisateurs" count={allDirectors.length}/>
                <Links name="articles" title="Articles" count={allArticles.length}/>
            </ul>
        </section>
    );
}