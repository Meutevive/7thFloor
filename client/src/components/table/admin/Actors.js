import {actorsData} from "./constants";
import {useSelector} from "react-redux";

export const ActorsTable = ({handleModal, handleUpdate})=>{
     const {allActors} = useSelector((state)=>state.actors)
    console.log(allActors)
    return (
        <div>
            <table className="table-auto w-full text-left">
                <thead className="uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">Id</th>
                        <th scope="col" className="px-6 py-3">Nom</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { allActors &&
                      allActors.map((actor)=>{
                          const {id,fullname} = actor;

                              return (
                              <tr key={id}>
                                <td className="px-6 py-4">{id}</td>
                                <td className="px-6 py-4">{fullname}</td>
                                <td className="px-6 py-4">
                                    <button className="text-sky-500 mr-3" onClick={()=>handleUpdate(id)}>Editer</button>
                                    <button className="text-red-600" onClick={()=>handleModal(id)}>Supprimer</button>
                                </td>
                              </tr>
                          );
                      })
                    }
                </tbody>
            </table>
        </div>
    );
}