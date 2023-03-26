import {AdminSidebar} from "../../components/Sidebar/AdminSidebar";
import {Search} from "../../components/forms/search/Search";
import {Link, useNavigate, useParams} from "react-router-dom";
import { FilmsTable } from "../../components/table/admin/Films";
import { useEffect, useState } from "react";
import {
    filmInitialValues,
    selectedFilmsTypes, validateActor,
    validateFilm
} from "../../services/constants/admin/constants";
import {addfilm, deleteFilm, getFilm, updateFilm} from "../../utils/api/filmsController";
import { TextFieldLarge } from "../../components/forms/TextField/TextFieldLarge";
import { Button } from "../../components/buttons/Button";
import { TextArea } from "../../components/forms/textarea/TextArea";
import {SelectField} from "../../components/forms/selectField/SelectField";
import {useSelector} from "react-redux";
import {Confirm} from "../../components/modals/confirm";
import {getActor, updateActor} from "../../utils/api/actorsController";




export const AdminFilms =()=>{
    const [search,setSearch] = useState();
    const [selectedId, setSelectedId] = useState();
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const handleSearch = (e)=>{
        e.preventDefault();
        console.log(search);
    }

    const handleDelete = ()=>{
        deleteFilm(selectedId).then((response)=>{
           setModal(!modal);
           window.location.reload();
       })
    }

    const handleModal = (id)=>{
        setModal(!modal);
        setSelectedId(id);
    }

    const handleUpdate = (id)=>{
         navigate('/admin/films/update/'+id);
    }

    return (
        <div className="flex space-x-3 items-start py-12">
            {modal &&  <Confirm type="suppression" context="acteur" handleModal={handleModal} handleDelete={handleDelete}/>}
            <AdminSidebar/>
            <section className="py-6 px-20 w-full space-y-3 flex flex-col max-w-screen-desktop">
                <Search placeholder = "chercher par le nom, le prenom de l'acteur"
                        handleSubmit={handleSearch}
                        setSearch={setSearch}
                        search={search}
                />

                <Link to="/admin/films/add" className="text-white bg-red-600 p-3 rounded-xl self-start">+ Ajouter un nouveau film</Link>
                <FilmsTable handleModal={handleModal} handleUpdate={handleUpdate}/>
            </section>
        </div>
    );
}

export const FilmAdd = ()=>{
    const {allActors} = useSelector((state)=>state.actors);
    const {allDirectors} = useSelector((state)=>state.directors);
    const navigate = useNavigate();

    const [filmValues, setFilmValues] = useState(filmInitialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState("");
    const [genres, setGenres] = useState([]);
    const [selectionGenres, setSelectionGenres] = useState(selectedFilmsTypes);
    const [actors, setActors] = useState([]);
    const [selectionActors, setSelectionActors] = useState(allActors);

    const [directors, setDirectors] = useState([]);
    const [selectionDirectors, setSelectionDirectors] = useState(allDirectors);

    const submitHandler = (e)=>{
        e.preventDefault();

        if(Object.keys(formErrors).length === 0){
            console.log(filmValues);
            addfilm(filmValues).then(response=>response.json()).then((response)=>{
                if(response){
                    navigate('/admin/films')
                }
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            setIsSubmit(true);
            setMessage("Vous avez des erreurs dans le formulaire")
            console.log("form have errors");
        }
    }

    const handleChange = (e)=>{

        const {name, value, files} = e.target
        if (name === "genres"){

            let mySelectedList = genres;
            if(genres.length <3){
               mySelectedList.push(value);
               setGenres(mySelectedList);
               let newSelection = selectionGenres.filter((genre)=>genre !== value)
               setSelectionGenres(newSelection);
            }
        }

        if(name === "actors"){

            let mySelectedList = actors;
            mySelectedList.push(value);
            setActors(mySelectedList);
            let newSelection = selectionActors.filter((actor)=>actor.fullname !== value);
            setSelectionActors(newSelection);
        }
        if(name === "directors"){

            let mySelectedList = directors;
            mySelectedList.push(value);
            setDirectors(mySelectedList);
            let newSelection = selectionActors.filter((director)=>director.fullname !== value);
            setSelectionDirectors(newSelection);
        }

        if(files){
            setFilmValues({...filmValues,[name]:files[0]})
        }else{
            if(name === "genres"){
                setFilmValues({...filmValues,[name]:genres})
            }
            else if(name === "actors") {
                setFilmValues({...filmValues, [name]: actors})
            }else if(name === "directors"){
             setFilmValues({...filmValues,[name]:directors})
            }else{
                setFilmValues({...filmValues,[name]:value})
            }
        }
    }

    const handleReset = (name)=>{
        if(name === "genres"){

            setGenres([]);
            setSelectionGenres(selectedFilmsTypes);
        }
        if(name === "actors"){
            setActors([]);
            setSelectionActors(allActors);
        }
    }

    useEffect(()=>{
        setFormErrors(validateFilm(filmValues));
    },[filmValues])

    return (
        <div className="mx-5 py-12 my-0 flex flex-col items-center">
            <section className="py-6 px-20">
                <h1 className="text-5xl mb-8 font-extrabold ">
                    Ajouter un film
                </h1>
                {isSubmit &&
                    <div
                        className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg font-bold"
                        role="alert">
                        <span className="font-medium">{message}</span>
                    </div>

                }
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col max-w-xl">

                        <TextFieldLarge label="title"
                                        type="text"
                                        placeholder="Entrer le titre du film"
                                        name="title"
                                        values={filmValues.title}
                                        handleChange={handleChange}
                                        formError={formErrors.title}
                        />

                        <TextFieldLarge
                                        label="Date de parution"
                                        type="date"
                                        placeholder="Entrer la date de parution du film"
                                        name="pubDate"
                                        values={filmValues.pubDate}
                                        handleChange={handleChange}
                        />
                        <TextArea
                            label="description"
                            placeholder="entrer la description du film"
                            name="description"
                            values={filmValues.description}
                            handleChange={handleChange}
                            formError={formErrors.description}
                        />

                        <SelectField label="genres"
                                     type="genres"
                                     name="genres"
                                     values={filmValues.genres}
                                     handleChange={handleChange}
                                     listeSelected={genres}
                                     selection={selectionGenres}
                                     handleReset={handleReset}

                        />

                        <SelectField    label="acteurs"
                                        type="acteurs"
                                        name="actors"
                                        listeSelected={actors}
                                        selection={selectionActors}
                                        values={filmValues.actors}
                                        handleChange={handleChange}
                                        handleReset={handleReset}
                        />

                        <SelectField    label="réalisateurs"
                                        type="directors"
                                        name="directors"
                                        listeSelected={directors}
                                        selection={selectionDirectors}
                                        values={filmValues.directors}
                                        handleChange={handleChange}
                                        handleReset={handleReset}
                        />

                        <TextFieldLarge
                            label="Couverture du film"
                            placeholder="Entrer la couverture du film"
                            name="file"
                            type="file"
                            /*         values={actorValues.image.} */
                            handleChange={handleChange}
                        />
                        <div className="flex space-x-3 items-center">

                            <Button text="Valider"
                                    color="white"
                                    type="submit"
                            />
                            <Button text="Annuler"
                                    color="red"
                                    type="link"
                                    route="/admin/films"
                            />

                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}

export const FilmUpdate = ()=>{
    const {allActors} = useSelector((state)=>state.actors);
    const {allDirectors} = useSelector((state)=>state.directors);
    const navigate = useNavigate();

    const [filmValues, setFilmValues] = useState(filmInitialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState("");
    const [genres, setGenres] = useState([]);
    const [selectionGenres, setSelectionGenres] = useState(selectedFilmsTypes);
    const [actors, setActors] = useState([]);
    const [selectionActors, setSelectionActors] = useState(allActors);

    const [directors, setDirectors] = useState([]);
    const [selectionDirectors, setSelectionDirectors] = useState(allDirectors);

    const {id} = useParams();
    const submitHandler = (e)=>{
        e.preventDefault();

        if(Object.keys(formErrors).length === 0){
            updateFilm(filmValues).then(response=>response.json()).then((response)=>{
                if(response){
                    navigate('/admin/films')
                }
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            setIsSubmit(true);
            setMessage("Vous avez des erreurs dans le formulaire")
            console.log("form have errors");
        }
    }

    const handleChange = (e)=>{

        const {name, value, files} = e.target
        if (name === "genres"){

            let mySelectedList = genres;
            if(genres.length <3){
               mySelectedList.push(value);
               setGenres(mySelectedList);
               let newSelection = selectionGenres.filter((genre)=>genre !== value)
               setSelectionGenres(newSelection);
            }
        }

        if(name === "actors"){

            let mySelectedList = actors;
            mySelectedList.push(value);
            setActors(mySelectedList);
            let newSelection = selectionActors.filter((actor)=>actor.fullname !== value);
            setSelectionActors(newSelection);
        }
        if(name === "directors"){

            let mySelectedList = directors;
            mySelectedList.push(value);
            setDirectors(mySelectedList);
            let newSelection = selectionActors.filter((director)=>director.fullname !== value);
            setSelectionDirectors(newSelection);
        }

        if(files){
            setFilmValues({...filmValues,[name]:files[0]})
        }else{
            if(name === "genres"){
                setFilmValues({...filmValues,[name]:genres})
            }
            else if(name === "actors") {
                setFilmValues({...filmValues, [name]: actors})
            }else if(name === "directors"){
             setFilmValues({...filmValues,[name]:directors})
            }else{
                setFilmValues({...filmValues,[name]:value})
            }
        }
    }

    const handleReset = (name)=>{
        if(name === "genres"){

            setGenres([]);
            setSelectionGenres(selectedFilmsTypes);
        }
        if(name === "actors"){
            setActors([]);
            setSelectionActors(allActors);
        }
    }

    useEffect(()=>{
        setFormErrors(validateFilm(filmValues));
    },[filmValues])

     useEffect(()=>{
        getFilm(id).then(res=>res.json()).then((data)=>{
            setFilmValues(data);
            let newSelectionActor = selectionActors;
             let newSelectionGenre = selectionGenres;
             let newSelectionDirector = selectionDirectors;

            setActors(data.actors);
            setGenres(data.genres);
            setDirectors(data.directors);

            data.actors.forEach((item, index)=>{
                newSelectionActor = newSelectionActor.filter((actor)=>actor.fullname !== item);
            })
            data.genres.forEach((item, index)=>{
                newSelectionGenre = newSelectionGenre.filter((genre)=>genre !== item)
            })
            data.genres.forEach((item, index)=>{
                newSelectionDirector = newSelectionDirector.filter((director)=>director.fullname !== item);
            })

            setSelectionActors(newSelectionActor);
            setSelectionGenres(newSelectionGenre);
            setSelectionDirectors(newSelectionDirector);
        })
    },[])

    return (
        <div className="mx-5 py-12 my-0 flex flex-col items-center">
            <section className="py-6 px-20 ">
                <h1 className="text-5xl mb-8 font-extrabold ">
                    Modifier le film
                </h1>
                {isSubmit &&
                    <div
                        className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg font-bold"
                        role="alert">
                        <span className="font-medium">{message}</span>
                    </div>

                }
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col max-w-xl">

                        <TextFieldLarge label="title"
                                        type="text"
                                        placeholder="Entrer le titre du film"
                                        name="title"
                                        values={filmValues.title}
                                        handleChange={handleChange}
                                        formError={formErrors.title}
                        />

                        <TextFieldLarge
                                        label="Date de parution"
                                        type="date"
                                        placeholder="Entrer la date de parution du film"
                                        name="pubDate"
                                        values={filmValues.pubDate}
                                        handleChange={handleChange}
                        />
                        <TextArea
                            label="description"
                            placeholder="entrer la description du film"
                            name="description"
                            values={filmValues.description}
                            handleChange={handleChange}
                            formError={formErrors.description}
                        />

                        <SelectField label="genres"
                                     type="genres"
                                     name="genres"
                                     values={filmValues.genres}
                                     handleChange={handleChange}
                                     listeSelected={genres}
                                     selection={selectionGenres}
                                     handleReset={handleReset}

                        />

                        <SelectField    label="acteurs"
                                        type="acteurs"
                                        name="actors"
                                        listeSelected={actors}
                                        selection={selectionActors}
                                        values={filmValues.actors}
                                        handleChange={handleChange}
                                        handleReset={handleReset}
                        />

                        <SelectField    label="réalisateurs"
                                        type="directors"
                                        name="directors"
                                        listeSelected={directors}
                                        selection={selectionDirectors}
                                        values={filmValues.directors}
                                        handleChange={handleChange}
                                        handleReset={handleReset}
                        />

                        <TextFieldLarge
                            label="Couverture du film"
                            placeholder="Entrer la couverture du film"
                            name="file"
                            type="file"
                            /*         values={actorValues.image.} */
                            handleChange={handleChange}
                        />
                        <div className="flex space-x-3 items-center">

                            <Button text="Valider"
                                    color="white"
                                    type="submit"
                            />
                            <Button text="Annuler"
                                    color="red"
                                    type="link"
                                    route="/admin/films"
                            />

                        </div>
                    </div>
                </form>
            </section>
        </div>
    );

}