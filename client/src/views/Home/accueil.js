/* eslint-disable jsx-a11y/alt-text */
import {Link} from "react-router-dom";
import react from "react";
import logo from "../../assets/Images/7thfloor.png";
import Gauche from "../../assets/Svg/defileGauche.svg";
import {FormActusMoment} from "../../components/buttons/FormActusMoment";
import {FormFilmMoment} from "../../components/buttons/FormFilmMoment";
import {FormShowMoment} from "../../components/buttons/FormShowMoment";
import {FormLogin} from "../../components/buttons/FormLogin";
import {FormRegister} from "../../components/buttons/FormRegister";
import {FormNavbar} from "../../components/navbar/FormNavbar";
import {FormGridFilm} from "../../components/Grid/FormGridFilm";
import {useSelector} from "react-redux";
import ResponsiveLayout from "../../components/responsive/ResponsiveLayout";
import NewsActor from "./NewsActor";
import FilmNews from "./FilmNews";
import Footer from "../../components/footer/Footer";

//importe les modules pour la recupe des articles.
import React, {useState, useEffect} from "react";
import axios from "axios";


/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

export const Accueil = (props) => {

    const {user, isLogged} = useSelector((state) => state.user)
    console.log(isLogged)


    //Affiche les articles récupérés
    return (
        <>

          {/* LandingPage page container*/}
            <div>
                <div className=" flex flex-col items-stretch justify-around font-small
                             leading-3 text-white w-full bg-black h-full  space-y-5">
                    {/*Navbar*/}
                    <FormNavbar/>

                    {/*film/serie/manga contents*/}
                    {/*doit défilier automatique, pour linstant il est statique*/}
                    <FormGridFilm/>


                    {/*grid layout row and column layout*/}
                    <div className="grid grid-rows-3 grid-flow-col gap-4">

                        {/*nav btn*/}
                        <div className="col-span-2">

                            <div className=" flex flex-row ml-5 items-center mb-4">
                                {/*btn de navigation*/}

                                {/* les actus du moments*/}
                                <FormActusMoment/>

                                {/*les shows du moment*/}
                                <FormShowMoment/>

                                {/*les films du moments*/}
                                <FormFilmMoment/>
                            </div>

                            {/*first news  actor section*/}

                            {/*les articles récupéré seront afficher ici */}
                            <NewsActor/>



                        </div>

                        {/*third section in the right*/}
                        <FilmNews/>
                    </div>

                </div>
                {/* Footer   */}
                <Footer/>
            </div>

        </>
    );
}

export default Accueil;