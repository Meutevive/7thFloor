import {Link} from "react-router-dom";
import logo from "../../assets/Images/7thfloor.png";
import {FormLogin} from "../buttons/FormLogin";
import {FormRegister} from "../buttons/FormRegister";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../buttons/Button";
import {logout} from "../../reducers/userReducer";

export const FormNavbar = () => {
    const {isLogged} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const handleClick = ()=>{
        dispatch(logout())
    }
    return(
        <section className="flex flex-auto items-center justify-evenly h-full pr-2 pl-5 sticky top-0 border border-black bg-black ">

            <Link to="/">
                <img className="bg-center h-18 w-24 mr-5" src={logo} alt="Logo"/>
            </Link>
            <Link to="/films" className="mt-0 text-sm">tops shows </Link>
            <Link to="/actors" className="mt-0 text-sm">tops stars</Link>
            <Link to="/" className="mt-0 text-sm ">Ma liste</Link>

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
                 {isLogged
                    ? <Button text="se déconnecter"
                              color="red"
                              type="normal"
                              size="small" handleClick={handleClick}/>
                    : <div> <FormLogin/>  <FormRegister/> </div>}

            </div>


        </section>


    );

}