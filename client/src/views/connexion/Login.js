//import components
import{TextFieldLarge} from "../../components/forms/TextField/TextFieldLarge";

//import social icons
import {LoginSocialFacebook} from "reactjs-social-login";
import {LoginSocialGoogle} from "reactjs-social-login";
import {LoginSocialTwitter} from "reactjs-social-login";
// import social icons btn
import {FacebookLoginButton,GoogleLoginButton,TwitterLoginButton} from "react-social-login-buttons";
// import submit btn
import {FormSubmit} from "../../components/buttons/FormSubmit";
import {initialValues, validate} from "../../services/constants/Connexion/Constants"
import {useState, useEffect} from "react";
// import route
import {Link} from "react-router-dom";
//import footer
import Footer from "../../components/footer/Footer";



/**
 *
 * @returns {JSX.Element}
 * @constructor
 */


function Login() {
    //Declaration
    const [userValues, setUserValues] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e)=>{
        const {name, value} = e.target
        setUserValues({...userValues,[name]:value});
    }

    const submitHandler =(e)=>{
        e.preventDefault();
        if(Object.keys(formError).length === 0){

            console.log("form submitted");
        }else{
            setIsSubmit(true);
            console.log("form have errors");
        }
    }

    useEffect(()=>{
        setFormError(validate(userValues));
    },[userValues])




    return (
        <div className="mx-5 py-12 my-0 flex flex-col items-center">
            <section className="py-6 px-20">
                {/* document title */}
                <h1 className="text-5xl mb-8 font-extrabold ">
                    Connexion
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
                    <div className="flex flex-col max-w-xl">

                        {/* username and password section*/}
                        <TextFieldLarge label="Identifiant"
                                        type="text"
                                        placeholder="Entrer votre identifiant"
                                        name={"username"}
                                        values={userValues.username}
                                        formError={formError.username}
                                        handleChange={handleChange}


                        />
                        <TextFieldLarge label="Mot de passe"
                                        type="password"
                                        placeholder="Entrer votre mot de passe"
                                        name="password"
                                        formError={formError.password}
                                        values={userValues.password}
                                        handleChange={handleChange}

                        />

                        {/* change button text name*/}
                        <FormSubmit buttonText="Connexion" />

                            <p className="mt-7">

                            Vous n'avez pas de compte ? <Link to="/register" className="text-red-600 hover:underline">Inscrivez-Vous</Link>
                        </p><br/>
                        <p> Ou bien connectez-vous avec : </p>

                        {/* Socials authentification*/}
                        <div className="flex flex-col space-y-3 m-3">

                            {/* Google */}

                            <LoginSocialGoogle client_id="955538355623-dok0i9d3ndq8ruds7k3av7qgjurc5clj.apps.googleusercontent.com"
                                                onReject={(err)=>console.log(err)}
                                                onResolve={(res)=>console.log(res)}>
                                <GoogleLoginButton text="continuer avec google" />
                            </LoginSocialGoogle>

                            {/* Facebook */}
                            <LoginSocialFacebook
                                appId="1774459536258808"
                                onResolve={(res)=>{
                                    console.log(res);
                                        }
                                }
                                onReject={(err)=>{
                                        console.log(err);
                                        }
                                }
                            >
                                <FacebookLoginButton text="continuer avec facebook" className="w-50 rounded-lg"/>
                            </LoginSocialFacebook>

                            {/* Twitter */}
                            <LoginSocialTwitter client_id="LUZqanB0cFpEMnF6MU9sSUs3clU6MTpjaQ"
                                                redirect_uri="http://localhost:3000/login"
                                                onReject={(err)=>console.log(err)}
                                                onResolve={({ provider, data })=>
                                                {console.log(data);}}

                            >

                                <TwitterLoginButton text="continuer avec twitter" className="w-30 rounded-lg"/>
                            </LoginSocialTwitter>



                        </div>

                    </div>

                </form>

            </section> <br/><br/>

            {/*footer*/}
            <footer>
                <Footer/>
            </footer>
        </div>




    );
}


export default Login