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
                 listeSelected.map((genre)=>{
                     return (
                             <span
                                 className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                                 {genre}
                             </span>
                     );
                 })
             }

              </div>
            <select id={label}
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500
                    focus:border-blue-500 block w-full p-2.5 " value={values}
                    name={name}
                    onChange={handleChange}
            >
                <option selected>Choisissez des {type}</option>
                {
                    selection.map((data)=>{
                        return(
                             <option value={data}>{data}</option>
                        );
                    })
                }


            </select>
              <button type="button" onClick={handleReset} className="mt-2">
                    <FontAwesomeIcon icon={faMinus} color="red"/>
                    <span className="text-red-500 ml-2">Réinitialiser</span>
                </button>

        </div>
    );
}