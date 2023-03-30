import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../../components/buttons/Button";
import { TextFieldMedium } from "../../components/forms/TextField/TextFieldMedium";
import { validate } from "../../services/constants/newPassword/constants";

export const NewPassword = () => {
    const initialValues = {
        password: "",
        confirm_password: ""
    };

    const [passwordValues, setPasswordValues] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("Le formulaire que vous venez de soumettre contient des erreurs");

    const query = new URLSearchParams(useLocation().search);
    const token = query.get("token");

    const handleChange = (e) => {
        const { name, value } = e.target
        setPasswordValues({ ...passwordValues, [name]: value });
    
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (Object.keys(formError).length === 0) {
            console.log(passwordValues);
        } else {
            setIsSubmit(true);
            setShowError(true);
            setMessage("Le formulaire que vous venez de soumettre contient des erreurs");
        }
    }

    useEffect(() => {
        setFormError(validate(passwordValues));
    }, [passwordValues])

    return (
        <div>
            <div className="mx-5 py-12 my-0 flex flex-col items-center">
                <section className="py-6 px-20">
                    {/* document title */}
                    <h1 className="text-5xl mb-8 font-extrabold ">
                        Nouveau mot de passe
                    </h1>

                    {isSubmit &&

                        <div
                            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg font-bold"
                            role="alert">
                            <span className="font-medium">{message}</span>
                        </div>

                    }
                    {/* registration form*/}
                    <form onSubmit={submitHandler}>
                        <div className="flex flex-col max-w-xl">

                            {/* first name and last name section*/}
                            
                                <TextFieldMedium label={"Password"}
                                    type={"password"}
                                    placeholder={"Entrer votre mot de passe"}
                                    name={"password"}
                                    values={passwordValues.password}
                                    showError={showError}
                                    formError={formError.password}
                                    handleChange={handleChange}

                                />

                                <TextFieldMedium label={"Confirmation du mot de passe"}
                                    type={"password"}
                                    placeholder={"Confirmation du mot de passe"}
                                    name={"confirm_password"}
                                    values={passwordValues.confirm_password}
                                    showError={showError}
                                    formError={formError.confirm_password}
                                    handleChange={handleChange}

                                />
                                <Button text="Valider"
                                    color="white"
                                    type="submit"
                                />

                        </div>
                    </form>
                </section>
            </div>
        </div>

    );
}