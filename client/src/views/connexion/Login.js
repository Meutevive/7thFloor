import {TextFieldLarge} from "../../components/forms/TextField/TextFieldLarge";
import {FormGoogle} from "../../components/buttons/FormGoogle";
import {FormTwitter} from "../../components/buttons/FormTwitter";
import {FormFacebook} from "../../components/buttons/FormFacebook";
import {Button} from "../../components/buttons/Button";
import {initialValues, validate} from "../../services/constants/Connexion/Constants"
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Footer} from "../../components/footer/Footer"
import {useNavigate} from "react-router-dom";
import {authUser} from "../../utils/api/authController";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../reducers/userReducer";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */


function Login() {
    //Declaration
    const navigate = useNavigate();
    const [userValues, setUserValues] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const {isLogged} = useSelector((state) => state.user)
    const handleChange = (e) => {
        const {name, value} = e.target
        setUserValues({...userValues, [name]: value});
    }

    const submitHandler = (e) => {

        e.preventDefault();
        if (Object.keys(formError).length === 0) {
            authUser("authenticate", userValues).then((res) => {

                if (res) {

                    navigate("/home");
                    dispatch(loginUser(userValues.username))
                    console.log(isLogged)
                }
            }).catch(() => {
                setIsSubmit(true);
            })

        } else {
            setShowError(true)
        }
    }

    useEffect(() => {
        setFormError(validate(userValues));
    }, [userValues])

    if (isLogged) {
        navigate("/");
    }
    return (

        <div>
            <div className="mx-5 py-12 my-0 flex flex-col items-center">
                <section className="py-6 px-20">
                    {/* document title */}
                    <h1 className="text-3xl mb-2 ml-8 font-extrabold ">
                        Connectez-vous
                    </h1>

                    {isSubmit &&

                        <div
                            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg font-bold"
                            role="alert">
                            <span className="font-medium">L'identifiant ou le mot de passe ne sont pas valide</span>
                        </div>

                    }
                    {/* Login form*/}
                    <form onSubmit={submitHandler}>
                        <div className="flex flex-col max-w-sm">

                            {/* username and password section*/}
                            <TextFieldLarge label="Identifiant"
                                            type="text"
                                            placeholder="Entrer votre identifiant"
                                            name={"username"}
                                            values={userValues.username}
                                            showError={showError}
                                            formError={formError.username}
                                            handleChange={handleChange}


                            />
                            <TextFieldLarge label="Mot de passe"
                                            type="password"
                                            placeholder="Entrer votre mot de passe"
                                            name="password"
                                            showError={showError}
                                            formError={formError.password}
                                            values={userValues.password}
                                            handleChange={handleChange}

                            />

                            {/* change button text name*/}
                            <Button text="Connexion"
                                    color="white"
                                    type="submit"
                            />

                            <p className="mt-5">

                                Vous n'avez pas de compte ? <Link to="/register"
                                                                  className="text-red-600 hover:underline">Inscrivez-Vous</Link>
                            </p>
                            <p className="mt-5">
                             <Link to="/forgotpassword"
                                   className="text-red-600 hover:underline">Mot de passe oublié?</Link>
                            </p><br/>

                            {/* Socials authentification*/}
                            <div className="flex flex-col space-y-2 m-2">

                                {/* Google */}
                                <FormGoogle type="authenticate" setIsSubmit={setIsSubmit}/>
                                {/* Facebook */}
                                <FormFacebook type="authenticate" setIsSubmit={setIsSubmit}/>

                                {/* Twitter */}
                                <FormTwitter type="authenticate" setIsSubmit={setIsSubmit}/>

                            </div>

                        </div>

                    </form>

                </section>
                <br/><br/>


            </div>

            {/*footer*/}
            <Footer/>

        </div>


    );

};


export default Login