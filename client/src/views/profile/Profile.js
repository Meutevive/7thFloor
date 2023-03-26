import react from 'react';
import ProfileInfos from "./profileInfos";
import ProfileFilms from "./ProfileFilms";
import {FormNavbar} from "../../components/navbar/FormNavbar";


const Profile = () => {


    return (
        <div className="bg-black text-white min-h-screen">

            {/*navbar*/}
            <FormNavbar/>

            &nbsp;

            {/* Header */}
            <header className="py-4 px-8">
                <h1 className="text-3xl font-bold text-red-600">Mon profil</h1>
            </header>

            {/* Profile Info */}
            <ProfileInfos/>

            {/* Mes films et series */}
            <ProfileFilms/>



        </div>

    );
}

export default Profile;