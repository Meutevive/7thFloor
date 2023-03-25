import react from 'react';
import ProfileAvis from "./ProfileAvis";
import ProfileInfos from "./profileInfos";
import ProfileFilms from "./ProfileFilms";
import ProfileSeries from "./ProfileSeries";
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

            {/* Mes films */}
            <ProfileFilms/>

            {/* Mes séries */}
            <ProfileSeries/>

            {/* Mes avis */}

            <ProfileAvis/>

        </div>

    );
}

export default Profile;