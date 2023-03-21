import {AdminSidebar} from "../../components/Sidebar/AdminSidebar";
import {Search} from "../../components/forms/search/Search";
import {Link, useNavigate} from "react-router-dom";
import { FilmsTable } from "../../components/table/admin/Films";
import { useEffect, useState } from "react";
import {
    filmInitialValues,
    selectedFilmsTypes,
    selectedListGenres,
    validateFilm
} from "../../services/constants/admin/constants";
import { addfilm } from "../../utils/api/filmsController";
import { TextFieldLarge } from "../../components/forms/TextField/TextFieldLarge";
import { Button } from "../../components/buttons/Button";
import { TextArea } from "../../components/forms/textarea/TextArea";
import {SelectField} from "../../components/forms/selectField/SelectField";



export const AdminFilms =()=>{
    const [search,setSearch] = useState();

    const handleSearch = (e)=>{
        e.preventDefault();
        console.log(search);
    }

    const handleDelete = ()=>{
        console.log("deleted");
    }

    const handleUpdate = ()=>{
        console.log("updated");
    }

    return (
        <div className="flex space-x-3 items-start py-12">
            <AdminSidebar/>
            <section className="py-6 px-20 w-full space-y-3 flex flex-col max-w-screen-desktop">
                <Search placeholder = "chercher par le nom, le prenom de l'acteur"
                        handleSubmit={handleSearch}
                        setSearch={setSearch}
                        search={search}
                />

                <Link to="/admin/films/add" className="text-white bg-red-600 p-3 rounded-xl self-start">+ Ajouter un nouveau film</Link>
                <FilmsTable handleDelete={handleDelete} handleUpdate={handleUpdate}/>
            </section>
        </div>
    );
}

export const FilmAdd = ()=>{
    const navigate = useNavigate()
    const [filmValues, setFilmValues] = useState(filmInitialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState("");
    const [genres, setGenres] = useState([]);
    const [selectionGenres, setSelectionGenres] = useState(selectedFilmsTypes);
    const submitHandler = (e)=>{
        e.preventDefault();

        if(Object.keys(formErrors).length === 0){

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
        console.log(formErrors)
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
        if(files){
            setFilmValues({...filmValues,[name]:files[0]})
        }else{
            setFilmValues({...filmValues,[name]:value})
        }
    }

    const handleReset = ()=>{
        setGenres([]);
        setSelectionGenres(selectedFilmsTypes);
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

                        <TextFieldLarge     label="acteurs"
                                            type="text"
                                            placeholder="entrer les acteurs du film séparé par un ;"
                                            name="actors"
                                            values={filmValues.actors}
                                            handleChange={handleChange}
                        />

                        <TextFieldLarge     label="directors"
                                            type="text"
                                            placeholder="entrer les réalisateurs du film séparé par un ;"
                                            name="directors"
                                            values={filmValues.directors}
                                            handleChange={handleChange}
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