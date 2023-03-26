import {Link} from "react-router-dom";
import logo from "../../assets/Images/7thfloor.png";
import {FormLogin} from "../buttons/FormLogin";
import {FormRegister} from "../buttons/FormRegister";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../buttons/Button";
import {logout} from "../../reducers/userReducer";
import {useState} from "react";


export const FormNavbar = () => {
    const {isLogged} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(logout());
    };

    const [dropdownOpen, setDropwdownOpen] = useState(false);
    return (
        <section
            className="flex flex-auto items-center justify-evenly h-full pr-2 pl-5 sticky top-0 border border-black bg-black ">

            <Link to="/">
                <img className="bg-center h-18 w-24 mr-5" src={logo} alt="Logo"/>
            </Link>
            <Link to="/films" className="mt-0 text-sm">tops shows </Link>
            <Link to="/actors" className="mt-0 text-sm">tops stars</Link>

            <div className="text-gray-400 flex-row justify-between items-center pt-1">
                {/*static navbar*/}
                <input className="search-icon mt-0 w-56 h-8 rounded-full border bg-black text-gray-400 font-light flex
                               mb-1 ml-16 pl-3 mr-12"
                       type="text"
                       placeholder="Recherche ...."
                />
                {/* <span className="mt-0 ">recherche</span>
            <img className="w-10 h-7 " src={rectangle1158} />*/}

            </div>

            <div className="flex flex-row ml-5 items-center justify-center ">
                {/* Vérifie si l'utilisateur est connecté */}
                {isLogged ? (
                    // Si l'utilisateur est connecté, affiche le menu déroulant "Mon compte"
                    <div className="relative inline-block">
                        {/* Le bouton "Mon compte" qui déclenche l'affichage du menu déroulant */}
                        <button
                            onClick={() => setDropwdownOpen(!dropdownOpen)}
                            className="bg-red-600  text-white font-semibold py-2 px-4 rounded-lg text-xs  ">
                            Mon Compte
                        </button>

                        {/* Le contenu du menu déroulant */}
                        {dropdownOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-48
                            rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical"
                                     aria-labelledby="options-menu">
                                    <Link
                                        to="/profil"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                    >
                                        Profile
                                    </Link>

                                    <Link
                                        to="/films"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem">

                                        Mes Films
                                    </Link>

                                    <div className="border-t border-gray-100"></div>
                                    <button
                                        onClick={handleClick}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                                        role="menuitem"
                                    >
                                        Se déconnecter
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // Si l'utilisateur n'est pas connecté, affiche les boutons de connexion et d'inscription
                    <div>
                        {" "}
                        <FormLogin/> <FormRegister/> {" "}
                    </div>
                )}
            </div>
        </section>
    );

}