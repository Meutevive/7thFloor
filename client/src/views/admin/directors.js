
import {AdminSidebar} from "../../components/Sidebar/AdminSidebar";
import {Search} from "../../components/forms/search/Search";
import {useEffect, useState} from "react";
import {TextFieldMedium} from "../../components/forms/TextField/TextFieldMedium";
import {TextFieldLarge} from "../../components/forms/TextField/TextFieldLarge";
import {TextArea} from "../../components/forms/textarea/TextArea";
import {Button} from "../../components/buttons/Button";
import {Link, useNavigate} from "react-router-dom";
import { DirectorsTable } from "../../components/table/admin/Directors";
import { directorInitialValues, validateDirector } from "../../services/constants/admin/constants";
import {addDirector, deleteDirector} from "../../utils/api/directorsController";
import {Confirm} from "../../components/modals/confirm";
import {countryList} from "../../services/constants/admin/countryList";
import {SelectField} from "../../components/forms/selectField/SelectField";


export const AdminDirectors =()=>{
    const [search,setSearch] = useState();
    const [modal, setModal] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const navigate = useNavigate();

    const handleSearch = (e)=>{
        e.preventDefault();
        console.log(search);
    }

    const handleDelete = ()=>{
       deleteDirector(selectedId).then((response)=>{
           setModal(!modal);
           window.location.reload();
       })
    }

     const handleModal = (id)=>{
        setModal(!modal);
        setSelectedId(id);
    }

    const handleUpdate = ()=>{
        console.log('update');
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

                <Link to="/admin/directors/add" className="text-white bg-red-600 p-3 rounded-xl self-start">+ Ajouter un nouveau directeur</Link>
                <DirectorsTable handleModal={handleModal} handleUpdate={handleUpdate}/>
            </section>
        </div>
    );
}

export const DirectorAdd = ()=>{
    const navigate = useNavigate()
    const [directorValues, setDirectorValues] = useState(directorInitialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState("");
    const [country, setCountry] = useState([]);
    const [selectionCountries, setSelectionCountries] = useState(countryList);
    const submitHandler = (e)=>{
        e.preventDefault();

        if(Object.keys(formErrors).length === 0){

            addDirector(directorValues).then(response=>response.json()).then((response)=>{
                if(response){
                    console.log(response);
                    navigate('/admin/directors')
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
            setDirectorValues({...directorValues,[name]:files[0]})
        }else{
            if(name === "country"){
                let selectedCountry = country;
                selectedCountry.push(value);
                setCountry(selectedCountry);
                setDirectorValues({...directorValues,[name]:value})
                setSelectionCountries([])



            }else{
                setDirectorValues({...directorValues,[name]:value})
            }
        }
    }

    useEffect(()=>{
        setFormErrors(validateDirector(directorValues));
    },[directorValues])

    const handleReset = ()=>{

            setCountry([]);
            setSelectionCountries(countryList);

    }
    return (
         <div className="mx-5 py-12 my-0 flex flex-col items-center">
            <section className="py-6 px-20">
                <h1 className="text-5xl mb-8 font-extrabold ">
                    Ajouter un réalisateur
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
                                         placeholder="Entrer le prénom et le nom du réalisateur"
                                         name="fullname"
                                         values={directorValues.fullname}
                                         handleChange={handleChange}
                                         formError={formErrors.fullname}
                        />

                        <TextFieldLarge
                                        label="Date de naissance"
                                        type="date"
                                        placeholder="Entrer la date de naissance"
                                        name="birthdate"
                                        values={directorValues.birthdate}
                                        handleChange={handleChange}
                                        formError={formErrors.birthdate}
                        />

                         <SelectField label="pays d'origine"
                                     type="genres"
                                     name="country"
                                     values={directorValues.country}
                                     handleChange={handleChange}
                                     listeSelected={country}
                                     selection={selectionCountries}
                                     handleReset={handleReset}

                        />
                        <TextArea
                                    label="description"
                                    placeholder="entrer la description du réalisateur"
                                    name="description"
                                    values={directorValues.description}
                                    handleChange={handleChange}
                        />
                        <TextFieldLarge
                                    label="Image de l'acteur"
                                    placeholder="Entrer l'image du réalisateur"
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
                                route="/admin/directors"
                        />

                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}

