import React, {useEffect, useState} from "react";
import {FormNavbar} from "../../components/navbar/FormNavbar";
import {Contenu, Khphotos, recompense} from "./test/Data";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import {Commentaires} from "../Film/test/Data";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllActors} from "../../reducers/actorsReducer";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getActor} from "../../utils/api/actorsController";
import {TextFieldMedium} from "../../components/forms/TextField/TextFieldMedium";
import {FormSubmit} from "../../components/buttons/FormSubmit";
import {Button} from "../../components/buttons/Button";
import {actorInitialValues, options} from "../../services/constants/global";

export const Actors = ()=>{
    const {allActors} = useSelector((state)=>state.actors);
    const [filterValues, setFilterValues] = useState({})
    const dispatch = useDispatch();

    const handleFilterSubmit = (e)=>{
        e.preventDefault();
        console.log(filterValues);
    }
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFilterValues({...filterValues, [name]:value});
    }


    useEffect(()=>{
        dispatch(fetchAllActors())
    },[])

    return (
      <div>
            <FormNavbar/>
          <div className="flex flex-row">
                <div className="py-6 px-20 w-full max-w-screen-laptop flex flex-col space-y-5">
                   {
                       allActors.map((actor)=>{
                            const {fullname, description, id, posterActor} = actor;
                            const posterSrc = `data:image/jpeg;base64,${posterActor}`;
                           return (
                               <section className="py-4 px-4" key={id}>
                                   <div className="flex flex-row space-x-4">
                                       <div className="w-40 shrink-0">
                                           <img className="object-fill w-40 h-52" src={posterSrc} alt="poster actor"/>
                                       </div>
                                       <div className="flex flex-col space-y-2">
                                            <Link to={"/actors/actor/"+id} className="mb-3 text-xl font-white">{fullname}</Link>
                                            <p>{description.slice(0, 300)}</p>
                                       </div>
                                   </div>
                               </section>
                           );
                       })
                   }
               </div>

             <section className="py-4 px-4 max-w-xl self-start my-6">
                <h1 className="mb-3 text-xl font-white">Filtre de recherche</h1>
                 <form onSubmit={handleFilterSubmit}>
                     <TextFieldMedium label="Nom de l'acteur"
                                      placeholder="nom de l'acteur"
                                      name="fullname"
                                      values={filterValues.fullname}
                                      handleChange={handleChange}/>
                     <Button text="valider"
                             size="small"
                             color="red"
                             type="submit"/>
                 </form>

             </section>
          </div>

       </div>
    );
}
export const Actor = () => {

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(Commentaires);
    const [actorValues, setActorValues] = useState(actorInitialValues);
    const [posterActor, setPosterActor]=useState()
    const {id} = useParams();

    useEffect(()=>{
       getActor(id).then(res=>res.json()).then((actor)=>{
           setActorValues(actor);
           setPosterActor(actor.posterActor);
       })
    },[])



    const {isLogged} = useSelector((state)=>state.user);
    const navigate = useNavigate();
    const submitHandler = (e)=>{
        e.preventDefault();
        if(isLogged){

            Commentaires.push(
                {
                    name:"this test user",
                    image:"/assets/images/avatar1.png",
                    commentaire: comment
                }
            );
            setComment("");
            setComments(Commentaires);
        }else{
            navigate('/login');
        }
    }

    return(
        <div>
            <FormNavbar/>
            <div className="mx-5 py-12 my-0 flex flex-col items-center space-y-5">
                <section className="py-6 px-20 w-10/12 max-w-screen-desktop leading-3">
                    <h1 className="mb-3 text-2xl font-black">{actorValues.fullname}</h1>
                    <div className="flex space-x-9">
                        <div className="flex flex-col items-center space-y-4">
                            {
                                posterActor &&
                                <div className="w-40 ">
                                    <img className="object-fill w-48 h-52 rounded-lg"
                                         src={`data:image/jpeg;base64,${posterActor}`}
                                         alt="KH"/>
                                </div>
                            }

                        </div>

                        <div className="flex flex-col space-y-2">

                            <div>
                                <div className="flex space-x-6">
                                    <div className="text-red-600 space-y-4">
                                       {/* <p>Etat civil:</p>
                                        <p>Nationnalité:</p>*/}
                                        <p>Naisance:</p>
                                        <p>Age:</p>

                                    </div>
                                    <div className="space-y-4">
                                      {/*  <p></p>
                                        <p></p>*/}
                                        <p>{new Date(actorValues.birthdate).toLocaleDateString(undefined, options)}</p>
                                        <p> {new Date().getFullYear() - new Date(actorValues.birthdate).getFullYear()} ans</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {
                    actorValues.description &&
                    <section className="py-6 px-20 w-10/12 max-w-screen-desktop">
                        <h1 className="mb-3 text-2xl font-black text-red-600 font-bold">Biographie</h1>
                        <div>
                            <p>{actorValues.description}</p>

                        </div>

                    </section>
                }
                {
                    actorValues.photos &&
                    <section className="py-6 px-20 w-10/12 max-w-screen-desktop">
                        <h1 className="mb-3 text-2xl font-black text-red-600 font-bold">Photos</h1>
                        <div className="flex flex-wrap -mr-12">



                        </div>

                    </section>
                }

                {
                    actorValues.recompenses &&
                    <section className="py-6 px-20 w-10/12 max-w-screen-desktop">
                        <h1 className="mb-3 text-2xl font-black text-red-600 font-bold">Récompenses</h1>
                        <div className="flex flex-col space-y-2 items-centers">

                            <div>
                                {/*left infos*/}
                                <div className="flex space-x-12 items-center">
                                    <div className=" space-y-8">
                                        <p></p>
                                        <p></p>
                                        <p></p>

                                    </div>
                                    {/*right infos*/}
                                    <div className="space-y-8">
                                        <p></p>
                                        <p></p>
                                        <p></p>
                                    </div>

                                </div>
                            </div>
                        </div>



                    </section>
                }

                {/*Commentaires sections*/}
                <section className="py-6 px-20 w-10/12 max-w-screen-desktop">
                    <h1 className="mb-3 text-2xl font-black text-red-600 font-bold">Commentaires</h1>
                        {
                            actorValues.comments &&
                                actorValues.comments.map(({name,image,commentaire})=>{
                                    return (
                                        <div className="flex mb-4 space-x-2">
                                            <div>
                                                <img className="object-fill w-10 h-10 rounded-full" src={image} alt="user"/>
                                            </div>

                                            <div className="flex flex-col">
                                                <p>{name}</p>
                                                <p>{commentaire}</p>
                                            </div>
                                        </div>
                                    );
                                })
                        }

                    <form className="flex " onSubmit={submitHandler}>
                            <textarea className="appearance-none bg-transparent border-b-2 border-white w-full max-w-2xl text-slate-100 mr-2 py-1 px-2 focus:outline-none"
                                      placeholder="écrire un commentaire"
                                      rows="2"
                                      value={comment}
                                      onChange={(e)=>setComment(e.target.value)}
                            ></textarea>
                        <button type="submit">
                            <FontAwesomeIcon icon={faPaperPlane}/>
                        </button>
                    </form>


                </section>


            </div>
        </div>
    );

}