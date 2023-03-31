import React, {useState} from "react";
import {FormNavbar} from "../../components/navbar/FormNavbar";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDirectorByFullName } from "../../utils/api/directorsController";
import { directorInitialValues, options } from "../../services/constants/global";




export const Director= () => {
     const [directorValues, setDirectorValues] = useState(directorInitialValues);
    const [posterDirector, setPosterDirector]=useState()
    const {fullname} = useParams();

    useEffect(()=>{
        getDirectorByFullName(fullname).then(res => res.json()).then((director) => {
            console.log(director);
           setDirectorValues(director);
           setPosterDirector(director.poster);
       })
    },[])
    return(
        <div>
            <FormNavbar/>
            <div className="mx-5 py-12 my-0 flex flex-col items-center space-y-5">
               <section className="py-6 px-20 w-10/12 max-w-screen-desktop leading-3">
                    <h1 className="mb-3 text-2xl font-black">{directorValues.fullname}</h1>
                    <div className="flex space-x-9">
                        <div className="flex flex-col items-center space-y-4">
                            {
                                posterDirector &&
                                <div className="w-40 ">
                                    <img className="object-fill w-48 h-52 rounded-lg"
                                         src={`data:image/jpeg;base64,${posterDirector}`}
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
                                        <p>{new Date(directorValues.birthdate).toLocaleDateString(undefined, options)}</p>
                                        <p> {new Date().getFullYear() - new Date(directorValues.birthdate).getFullYear()} ans</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {
                    directorValues.description &&
                    <section className="py-6 px-20 w-10/12 max-w-screen-desktop">
                        <h1 className="mb-3 text-2xl font-black text-red-600 font-bold">Biographie</h1>
                        <div>
                            <p>{directorValues.description}</p>

                        </div>

                    </section>
                }
            </div>
            <Footer/>
        </div>
    );
        

}
