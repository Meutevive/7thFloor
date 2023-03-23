    import './assets/App.css';
import Register from "./views/registration/Register";
import Login from "./views/connexion/Login";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Accueil } from './views/Home/accueil';
import {Film} from "./views/Film/Film";
import {Admin} from "./views/admin/admin";
import {ActorAdd, ActorUpdate, AdminActors} from "./views/admin/actors";
import { AdminDirectors, DirectorAdd } from './views/admin/directors';
import { AdminFilms, FilmAdd } from './views/admin/films';

import {useDispatch} from "react-redux";
import jwt_decode from "jwt-decode";
import {loginUser} from "./reducers/userReducer";
import {AdminUsers} from "./views/admin/users";
import {Actor, Actors} from "./views/actor/Actor";
function App() {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    if(token){
        const decoded = jwt_decode(token);
        dispatch(loginUser(decoded.sub))
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Accueil/>}/>
                <Route path="/home" element={<Accueil/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/actors" element={<Actors/>}/>
                <Route path="/actors/actor/:id" element={<Actor/>}/>
               {/* <Route path="/films" element={<Film/>}/>*/}
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/admin/users" element={<AdminUsers/>}/>
                <Route path="/admin/actors" element={<AdminActors/>}/>
                <Route path="/admin/actors/add" element={<ActorAdd/>}/>
                <Route path="/admin/actors/update/:id" element={<ActorUpdate/>}/>
                <Route path="/admin/films" element={<AdminFilms/>}/>
                <Route path="/admin/films/add" element={<FilmAdd/>}/>
                <Route path="/admin/directors" element={<AdminDirectors/>}/>
                <Route path="/admin/directors/add" element={<DirectorAdd/>}/>
                <Route path="/admin/home_elements" element={<Admin/>}/>
                <Route path="*" element={<h1>Error 404 page not found</h1>}/>
            </Routes>
        </Router>
    );
}
export default App;