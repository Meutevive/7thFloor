import react from "react";


const ProfileFilms = () => {

    return(

        <section className="px-8 py-6 mb-4">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Mes films et séries</h2>
            <div className="grid grid-cols-5 gap-4">
                {/* Remplacez ces éléments par les éléments de votre liste de films */}
                <img className="w-full h-48 object-cover rounded" src="https://via.placeholder.com/200x300" alt="Film" />
                <img className="w-full h-48 object-cover rounded" src="https://via.placeholder.com/200x300" alt="Film" />
                <img className="w-full h-48 object-cover rounded" src="https://via.placeholder.com/200x300" alt="Film" />
                <img className="w-full h-48 object-cover rounded" src="https://via.placeholder.com/200x300" alt="Film" />
                <img className="w-full h-48 object-cover rounded" src="https://via.placeholder.com/200x300" alt="Film" />
            </div>
        </section>


    );

};

export default ProfileFilms;