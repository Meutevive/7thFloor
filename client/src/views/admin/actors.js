
import {AdminSidebar} from "../../components/Sidebar/AdminSidebar";
import {Search} from "../../components/forms/search/Search";
import {useEffect, useState} from "react";
import {ActorsTable} from "../../components/table/admin/Actors";
import {TextFieldMedium} from "../../components/forms/TextField/TextFieldMedium";
import {TextFieldLarge} from "../../components/forms/TextField/TextFieldLarge";
import {TextArea} from "../../components/forms/textarea/TextArea";
import {actorInitialValues, selectedFilmsTypes, validateActor} from "../../services/constants/admin/constants";
import {Button} from "../../components/buttons/Button";
import {Link, useNavigate, useSearchParams, useParams} from "react-router-dom";
import {addActor, deleteActor, getActor, updateActor} from "../../utils/api/actorsController";
import {Confirm} from "../../components/modals/confirm";
import {SelectField} from "../../components/forms/selectField/SelectField";
import {countryList} from "../../services/constants/admin/countryList";


export const AdminActors =()=>{
    const [search, setSearch] = useState();
    const [modal, setModal] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const navigate = useNavigate();
    const handleSearch = (e)=>{
        e.preventDefault();
        console.log(search);
    }

    const handleDelete = ()=>{

       deleteActor(selectedId).then((response)=>{
           setModal(!modal);
           window.location.reload();
       })
    }

     const handleModal = (id)=>{
        setModal(!modal);
        setSelectedId(id);
    }

    const handleUpdate = (id)=>{
        navigate('/admin/actors/update/'+id);
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

                <Link to="/admin/actors/add" className="text-white bg-red-600 p-3 rounded-xl self-start">+ Ajouter un nouveau acteur</Link>
                <ActorsTable handleModal={handleModal} handleUpdate={handleUpdate}/>
            </section>
        </div>
    );
  }
export const ActorUpdate = ()=>{

    const navigate = useNavigate()
    const [actorValues, setActorValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState("");
    const {id} = useParams();


    const submitHandler = (e)=>{
        e.preventDefault();

        if(Object.keys(formErrors).length === 0){
            actorValues.id = id;
            updateActor(actorValues).then(response=>response.json()).then((response)=>{
                if(response){
                    navigate('/admin/actors')
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
        if(files){
            setActorValues({...actorValues,[name]:files[0]})
        }else{
            setActorValues({...actorValues,[name]:value})
        }
    }

    useEffect(()=>{
        setFormErrors(validateActor(actorValues));
    },[actorValues])



    useEffect(()=>{
        getActor(id).then(res=>res.json()).then((data)=>{
            setActorValues(data);
        })
    },[])

    return (
         <div className="mx-5 py-12 my-0 flex flex-col items-center">
            <section className="py-6 px-20">
                <h1 className="text-5xl mb-8 font-extrabold ">
                    Modifier l'acteur
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
                        <TextFieldLarge  label="prénom et nom de l'acteur"
                                         type="text"
                                         placeholder="Entrer le prénom et le nom de l'acteur"
                                         name="fullname"
                                         values={actorValues.fullname}
                                         handleChange={handleChange}
                                         formError={formErrors.fullname}
                        />
                        <TextFieldLarge
                                        label="Date de naissance"
                                        type="date"
                                        placeholder="Entrer la date de naissance"
                                        name="birthdate"
                                        values={actorValues.birthdate}
                                        handleChange={handleChange}
                                        formError={formErrors.birthdate}
                        />
                        <TextArea
                                    label="description"
                                    placeholder="entrer la description de l'acteur"
                                    name="description"
                                    values={actorValues.description}
                                    handleChange={handleChange}
                                    formError={formErrors.description}
                        />
                        <TextFieldLarge
                                    label="Image de l'acteur"
                                    placeholder="Entrer l'image de l'acteur"
                                    name="image"
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
                                route="/admin/actors"
                        />

                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}

export const ActorAdd = ()=>{
    const navigate = useNavigate()
    const [actorValues, setActorValues] = useState(actorInitialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState("");
    const [country, setCountry] = useState([]);
    const [selectionCountries, setSelectionCountries] = useState(countryList);
    const submitHandler = (e)=>{
        e.preventDefault();

        if(Object.keys(formErrors).length === 0){

            addActor(actorValues).then(response=>response.json()).then((response)=>{
                if(response){
                    navigate('/admin/actors')
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

        if(files){
            setActorValues({...actorValues,[name]:files[0]})
        }else{
            if(name === "country"){
                let selectedCountry = country;
                selectedCountry.push(value);
                setCountry(selectedCountry);
                setActorValues({...actorValues,[name]:value})
                setSelectionCountries([])



            }else{
                setActorValues({...actorValues,[name]:value})
            }
        }
    }

    useEffect(()=>{
        setFormErrors(validateActor(actorValues));
    },[actorValues])

    const handleReset = ()=>{

            setCountry([]);
            setSelectionCountries(countryList);

    }
    return (
         <div className="mx-5 py-12 my-0 flex flex-col items-center">
            <section className="py-6 px-20">
                <h1 className="text-5xl mb-8 font-extrabold ">
                    Ajouter un acteur
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
                        <TextFieldLarge  label="prénom et nom de l'acteur"
                                         type="text"
                                         placeholder="Entrer le prénom et le nom de l'acteur"
                                         name="fullname"
                                         values={actorValues.fullname}
                                         handleChange={handleChange}
                                         formError={formErrors.fullname}
                        />

                        <TextFieldLarge
                                        label="Date de naissance"
                                        type="date"
                                        placeholder="Entrer la date de naissance"
                                        name="birthdate"
                                        values={actorValues.birthdate}
                                        handleChange={handleChange}
                                        formError={formErrors.birthdate}
                        />

                         <SelectField label="pays d'origine"
                                     type="genres"
                                     name="country"
                                     values={actorValues.country}
                                     handleChange={handleChange}
                                     listeSelected={country}
                                     selection={selectionCountries}
                                     handleReset={handleReset}

                        />
                        <TextArea
                                    label="description"
                                    placeholder="entrer la description de l'acteur"
                                    name="description"
                                    values={actorValues.description}
                                    handleChange={handleChange}
                        />
                        <TextFieldLarge
                                    label="Image de l'acteur"
                                    placeholder="Entrer l'image de l'acteur"
                                    name="image"
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
                                route="/admin/actors"
                        />

                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}