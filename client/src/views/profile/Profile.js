import ProfileInfos from "./profileInfos";
import {FormNavbar} from "../../components/navbar/FormNavbar";
import ProfileAdditionalInfos from "./ProfileAdditionalInfos";


/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
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

        {/* Profile additionalinfos   */}
            <ProfileAdditionalInfos/>

        </div>

    );
}

export default Profile;