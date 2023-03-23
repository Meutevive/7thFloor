import react from 'react'
import {contenu2} from "./test/Data";
import temps from "../../assets/Svg/temps.svg";
import jaime from "../../assets/Svg/jaime.svg";
import commentaire from "../../assets/Svg/commentaire.svg";


const newsActor2 = () => {


    return(
        <section className="py-6 px-2.5 w-4/5 max-w-screen-desktop flex-row flex space-x-4">
            <div className="flex flex-row items-center space-X-4">
                <div className="w-32">
                    <img className="object-fill  w-40 h-50" src="/assets/images/Scarlett_Johansson.jpeg" alt="SJ"/>
                </div>
            </div>
            <div className="flex-col justify-between items-stretch mt-0 flex">
                <span className="text-red-600 ml-0 text-xl font-bold leading-7">{contenu2.title}</span>
                <div className="w-full flex-col justify-between items-center mb-1 font-small text-xs flex">
                    <h1 className="mb-1 text-sm font-black">{contenu2.infos}</h1>
                </div>
                &nbsp;

                <div className="w-6/12 flex-row justify-between items-center mt-0 flex">
                    <img className="w-4 h-4 object-cover self-start" src={temps}/>
                    <span>{contenu2.temps}</span>
                    <img className="w-4 h-3 object-cover mb-0 ml-4" src={jaime}/>
                    <span className="mb-0">{contenu2.jaime}</span>
                    <img className="w-4 h-4 object-cover ml-2" src={commentaire}/>
                    <span className="mb-0 ml-0">{contenu2.Nbcommentaire}</span>

                </div>
            </div>


        </section>


    );

}

export default newsActor2;