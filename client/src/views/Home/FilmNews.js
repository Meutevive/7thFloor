import react from "react";
import {contenu3, contenu4} from "./test/Data";
import StarRate from "../../assets/Svg/StarRate.svg";
import {Button} from "../../components/buttons/Button";


const FilmNews = () => {

    return (


        <div className="row-span-3 space-x-2">
            <section className="flex flex-col py-4  px-12 w-4/5 mr-20 max-w-screen-desktop mt-14 leading-3">

                <h1 className="mb-3 text-2xl font-black text-red-600">{contenu3.title}</h1>
                {/*first block*/}
                <div className="flex space-x-2">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-14">
                            <img className=" w-18 h-20 items-center justify-between space-x-4"
                                 src="/assets/images/F_BreakingBad.png"/>
                        </div>


                    </div>
                    <div className="flex flex-col space-y-2">
                        <div>
                            {contenu4.name}
                        </div>
                        <div className="flex justify-start items-center text-allign">
                            <img className="" src={StarRate}/> &nbsp;{contenu4.note}
                        </div>
                        <div>
                            {contenu4.type}
                        </div>
                        <div>
                            <Button
                                text="Ajouter à ma liste"
                                color="red"
                                size="small"
                            />
                        </div>
                        &nbsp;&nbsp;

                    </div>
                    &nbsp;&nbsp;

                </div>
                &nbsp;
                {/*end first block*/}

                {/*second block*/}
                <div className="flex space-x-2">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-14">
                            <img className=" w-18 h-20 items-center justify-between space-x-4"
                                 src="/assets/images/F_OurPlanet.png"/>
                        </div>

                    </div>
                    <div className="flex flex-col space-y-2">
                        <div>
                            {contenu4.name2}
                        </div>
                        <div className="flex justify-start items-center text-allign">
                            <img className="" src={StarRate}/> &nbsp;{contenu4.note2}
                        </div>
                        <div>
                            {contenu4.type2}
                        </div>
                        <div>
                            <Button
                                text="Ajouter à ma liste"
                                color="red"
                                size="small"
                            />
                        </div>
                        &nbsp;&nbsp;
                    </div>
                    &nbsp;&nbsp;
                </div>
                &nbsp;
                {/*end seconde */}


                {/*third block*/}
                <div className="flex space-x-2">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-14">
                            <img className=" w-18 h-20 items-center justify-between space-x-4"
                                 src="/assets/images/F_Arcane.png"/>
                        </div>

                    </div>
                    <div className="flex flex-col space-y-2">
                        <div>
                            {contenu4.name3}
                        </div>
                        <div className="flex justify-start items-center text-allign">
                            <img className="" src={StarRate}/> &nbsp;{contenu4.note3}
                        </div>
                        <div>
                            {contenu4.type3}
                        </div>
                        <div>
                            <Button
                                text="Ajouter à ma liste"
                                color="red"
                                size="small"
                            />
                        </div>
                        &nbsp;&nbsp;


                    </div>
                    &nbsp;&nbsp;

                </div>
                {/*end third block*/}
            </section>
        </div>


    );

}

export default FilmNews;