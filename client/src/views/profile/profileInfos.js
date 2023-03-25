import react from "react";
import {useState, useEffect} from "react";
import axios from "axios";

const ProfileInfos = () => {
    return (
        <section className="px-8 py-6 mb-4">
            <div className="flex items-center space-x-4">
                <img className="w-24 h-24 rounded-full border-4 border-red-600" src="https://via.placeholder.com/96" alt="Profile" />
                <div>
                    <h2 className="text-2xl font-semibold">Jean Bosco</h2>
                    <p className="text-sm text-gray-400">Membre depuis 2023</p>
                </div>
            </div>
        </section>


    );

};

export default ProfileInfos;