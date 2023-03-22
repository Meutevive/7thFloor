import {selectedFilmsTypes} from "../../../services/constants/admin/constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus} from "@fortawesome/free-solid-svg-icons/faMinus";

export const SelectField = ({label,type, values, name, handleChange, listeSelected, selection, handleReset})=>{

    return (
         <div className="mb-7">
            <label  htmlFor={label}
                    className="block mb-2 text-sm font-medium ">
                {label}
            </label>

              <div className="mb-2">
             {

                 listeSelected.map((data)=>{
                     console.log(data)
                     if(name === "actors"){
                         return (
                             <span
                                 className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                                 {data}
                             </span>
                         );
                     }else{
                         return (
                             <span
                                 className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                                 {data}
                             </span>
                         );
                     }
                 })
             }

              </div>

            <select id={label}
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500
                    focus:border-blue-500 block w-full p-2.5 "
                    value={values}
                    name={name}
                    onChange={handleChange}
            >
                 <option>Choissisez</option>
                {

                    selection.map((data)=>{
                        if(name === "actors"){
                            const {fullname} = data;
                             return(
                                 <option value={fullname}>{fullname}</option>
                             );
                        }else{

                            return(
                                 <option value={data}>{data}</option>
                            );
                        }
                    })
                }

            </select>
              <button type="button" onClick={(event)=>handleReset(name)} className="mt-2">
                    <FontAwesomeIcon icon={faMinus} color="red"/>
                    <span className="text-red-500 ml-2">Réinitialiser</span>
                </button>

        </div>
    );
}