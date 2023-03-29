import {Button} from "../../components/buttons/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import {Actors, Commentaires, Contenu, Reviews} from "./test/Data";
import {FormNavbar} from "../../components/navbar/FormNavbar";
import React, {useEffect, useState} from "react";
import {json, Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {TextFieldMedium} from "../../components/forms/TextField/TextFieldMedium";
import {fetchAllFilms} from "../../reducers/filmsReducer";
import {filmInitialValues} from "../../services/constants/global";
import {getActor, getActorByFullName} from "../../utils/api/actorsController";
import {getFilm, getFilmByTitle} from "../../utils/api/filmsController";
import {options} from "../../services/constants/global";
import {postComment} from "../../utils/api/commentsController";

export const Films = ()=>{
    const initialFilterValues = {
        title:""
    }
    const {allFilms} = useSelector((state)=>state.films);
    const [filterValues, setFilterValues] = useState(initialFilterValues)
    const dispatch = useDispatch();

    const handleFilterSubmit = (e)=>{
        e.preventDefault();
        console.log(filterValues);
        if(Object.keys(filterValues).length > 0){

            getFilmByTitle(filterValues.title).then(res=>res.json()).then((film)=>{
                console.log(film);
            })
        }
    }
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFilterValues({...filterValues, [name]:value});
    }


    useEffect(()=>{
        dispatch(fetchAllFilms())
    },[])

    return (
      <div>
            <FormNavbar/>
          <div className="flex flex-row">
                <div className="py-6 px-20 w-full max-w-screen-laptop   flex-col space-y-5">
                    {
                        allFilms.map((film) => {
                            const {title, description, id, poster} = film;
                            const posterSrc = `data:image/jpeg;base64,${poster}`;
                           return (
                               <section className="py-4 px-4" key={id}>
                                   <div className="flex flex-row space-x-4">
                                       <div className="w-40 shrink-0">
                                          <img className="object-fill w-40 h-52" src={posterSrc} alt="poster film"/>
                                       </div>
                                       <div className="flex flex-col space-y-2">
                                            <Link to={"/films/film/"+id} className="mb-3 text-xl font-white">{title}</Link>
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
                     <TextFieldMedium label="titre du film"
                                      placeholder="titre du film"
                                      name="title"
                                      values={filterValues.title}
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

export const  Film = () =>{

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(Commentaires);
    const [filmValues, setFilmValues] = useState(filmInitialValues);
    const [posterFilm, setPosterFilm] = useState()
    const [actors, setActors] = useState([]);
    const [ov, setOv] = useState(false);
    const {id} = useParams();
    let actor=[];
             getFilm(id).then(res=>res.json()).then((film)=>{
                   setFilmValues(film);
                   setPosterFilm(film.poster);
                   setOv(true);
             })

        useEffect(()=>{
             getFilm(id).then(res=>res.json()).then((film)=>{
                   setFilmValues(film);
                   setPosterFilm(film.poster);
                   setOv(true);
             })
            filmValues.actors.map((fullname)=>{
                     getActorByFullName(fullname).then(res=>res.json()).then(data=>{
                         actor.push(data[0]);
                         setActors(actor);
                         console.log(data[0])
                     })
                console.log(ov)
            })

        },[ov])


    const {isLogged} = useSelector((state)=>state.user);
    const {user} = useSelector((state)=>state.user);
    const navigate = useNavigate();

    const submitHandler = (e)=>{
        e.preventDefault();
        if(isLogged){
             if(comment){
                 postComment(filmValues.id, comment, user).then((data)=>{
                      getFilm(id).then(res=>res.json()).then((film)=>{
                        console.log(film);
                        console.log(data);
                    })
                 });

             }
        }else{
            navigate('/login');
        }
    }
    return (
        <div>
            <FormNavbar/>

            <div className="mx-5 py-12 my-0 flex flex-col items-center space-y-5">
                <section className="py-6 px-20 w-full max-w-screen-desktop">
                    <h1 className="mb-3 text-2xl font-black">{filmValues.title}</h1>
                    <div className="flex space-x-9">
                        <div className="flex flex-col items-center space-y-4">
                            {
                                posterFilm &&
                                    <div className="w-40">
                                            <img className="object-fill w-40 h-52" src={`data:image/jpeg;base64,${posterFilm}`} alt="bd"/>
                                    </div>
                            }
                            <div className="flex flex-col space-y-6">

                                <Button text="Regarder le trailer"
                                        color="white"
                                        size="small"
                                        type="link"
                                />
                                <Button text="Ajouter à ma liste"
                                        color="red"
                                        size="small"
                                        type="link"
                                />


                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            {
                                filmValues.note &&
                                    <div>
                                       <Button text={filmValues.note}
                                               color="orange"
                                               size="note"
                                       />
                                    </div>
                            }

                            <div>
                                <h3 className="text-red-600 font-bold text-lg my-1.5">Synopsis et infos</h3>
                                <p>
                                    {filmValues.description}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-red-600 font-bold text-lg my-1.5">Description</h3>
                                <div className="flex space-x-6">
                                    <div>
                                        <div className="flex space-x-3">
                                            <span>Pays:</span>
                                            <span>{filmValues.country}</span>
                                        </div>
                                        <div className="flex space-x-3">
                                            <span>Réalisateurs:</span>
                                            <span>{
                                                filmValues.directors.map(director=>{
                                                    return (
                                                        <span>{director}, </span>
                                                    );
                                                })
                                            }</span>
                                        </div>
                                       <div className="flex space-x-3">
                                            <span>Genres:</span>
                                            <span>{
                                                filmValues.genres.map(genre=>{
                                                    return (
                                                        <span>{genre}, </span>
                                                    );
                                                })
                                            }</span>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-6 px-20 w-full max-w-screen-desktop">
                    <h1 className="mb-3 text-2xl text-red-600 font-bold">Acteurs et casting</h1>
                    <div className="flex flex-wrap -mr-12">
                    {
                        actors.map(({fullname, id, posterActor})=>{
                             return (
                                 <div key={id} className="mb-7 ml-12">
                                   <Link to={"/actors/actor/"+id}> <span>{fullname}</span></Link>
                                     <img className="object-fill w-40 h-52 rounded-md" src={`data:image/jpeg;base64,${posterActor}`} alt="actor"/>
                                 </div>
                             );
                        })
                   }
                </div>
                </section >

                <section className="py-6 px-20 w-full max-w-screen-desktop">
                    <div className="flex justify-between text-red-600 ">
                        <h1 className="mb-3 text-2xl text-red-600 font-bold">Reviews</h1>
                        <a className="underline" href="#Ecrire">Ecrire un review</a>
                    </div>
                    {
                        filmValues.reviews && filmValues.reviews.map(({name,image,review,note})=>{
                            return (
                                <div className="flex space-x-16">
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex space-x-1 items-center">
                                            <img className="object-fill w-10 h-10 rounded-full" src={image} alt="user"/>
                                            <p>{name}</p>
                                        </div>
                                        <div>
                                            <p className="whitespace-normal">
                                                {review}
                                            </p>
                                            <a className="underline" href="#lire plus">Lire plus...</a>
                                        </div>
                                    </div>

                                    <div className="flex border-2 border-black px-6 py-1.5 rounded-md h-28 space-x-4">
                                        <div className="flex flex-col">
                                            <p>histoire</p>
                                            <p>acting</p>
                                            <p>musique</p>
                                            <p>à revoir</p>
                                        </div>

                                        <div className="flex flex-col">
                                            <p>{note.histoire}/10</p>
                                            <p>{note.acting}/10</p>
                                            <p>{note.musique}/10</p>
                                            <p>{note.revoir}/10</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }


                </section>

                <section className="py-6 px-20 w-full max-w-screen-desktop">
                    <h1 className="mb-3 text-2xl text-red-600 font-bold">Commentaires</h1>
                    {
                     filmValues.comments && filmValues.comments.map(({name,image,commentaire})=>{
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

                        <form className="flex mx-10" onSubmit={submitHandler}>
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