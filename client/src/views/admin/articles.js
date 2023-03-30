import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Confirm} from "../../components/modals/confirm";
import {AdminSidebar} from "../../components/Sidebar/AdminSidebar";
import {Search} from "../../components/forms/search/Search";

import {ArticlesTable} from "../../components/table/admin/Articles";
import {articleInitialValues, validateArticle} from "../../services/constants/admin/constants";
import {TextFieldLarge} from "../../components/forms/TextField/TextFieldLarge";
import {TextArea} from "../../components/forms/textarea/TextArea";
import {Button} from "../../components/buttons/Button";
import {addArticle} from "../../utils/api/articlesController";

export const AdminArticles = ()=>{
    const [search, setSearch] = useState();
    const [modal, setModal] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const navigate = useNavigate();
    const handleSearch = (e)=>{
        e.preventDefault();
        console.log(search);
    }

    const handleDelete = ()=>{


    }

     const handleModal = (id)=>{
        setModal(!modal);
        setSelectedId(id);
    }

    const handleUpdate = (id)=>{

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

                <Link to="/admin/articles/add" className="text-white bg-red-600 p-3 rounded-xl self-start">+ Ajouter un nouveau article</Link>
                <ArticlesTable handleModal={handleModal} handleUpdate={handleUpdate}/>
            </section>
        </div>
    );
}

export const ArticleAdd = ()=>{
    const navigate = useNavigate()
    const [articleValues, setArticleValues] = useState(articleInitialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState("");
    const submitHandler = (e)=>{
        e.preventDefault();
        console.log(articleValues)
        if(Object.keys(formErrors).length === 0){

            addArticle(articleValues).then(response=>response.json()).then((response)=>{
                if(response){
                    navigate('/admin/articles')
                }
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            setIsSubmit(true);
            setMessage("Vous avez des erreurs dans le formulaire")
        }
    }

    const handleChange = (e)=>{
        const {name, value, files} = e.target
        if(files){
            setArticleValues({...articleValues,[name]:files[0]})
        }else{
            setArticleValues({...articleValues,[name]:value})
        }
    }

    useEffect(()=>{
        setFormErrors(validateArticle(articleValues));
    },[articleValues])

    return (
         <div className="mx-5 py-12 my-0 flex flex-col items-center">
            <section className="py-6 px-20">
                <h1 className="text-5xl mb-8 font-extrabold ">
                    Ajouter un article
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
                        <TextFieldLarge  label="titre"
                                         type="text"
                                         placeholder="Entrer le titre de l'article"
                                         name="title"
                                         values={articleValues.title}
                                         handleChange={handleChange}
                                         formError={formErrors.title}
                        />


                        <TextArea
                                    label="content"
                                    placeholder="entrer le contenu de l'article"
                                    name="content"
                                    values={articleValues.content}
                                    handleChange={handleChange}
                        />
                        <TextFieldLarge
                                    label="couverture de l'article"
                                    placeholder="Entrer l'image de couverture"
                                    name="cover"
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
                                route="/admin/articles"
                        />

                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}