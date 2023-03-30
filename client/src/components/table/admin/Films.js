import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAllFilms } from "../../../reducers/filmsReducer";
import { Pagination } from "../../pagination/Pagination";


export const FilmsTable = ({handleModal, handleUpdate})=>{
    const { allFilms, pages } = useSelector((state) => state.films)
    const dispatch = useDispatch()
    const query = new URLSearchParams(useLocation().search);
    const page = query.get("page");
    const link = "/admin/films";

    useEffect(() => {
        dispatch(fetchAllFilms(page));
    },[])
    return (
        <div>
            <table className="table-auto w-full text-left">
                <thead className="uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">Id</th>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allFilms  &&
                        allFilms.map((data) => {
                          const {id, title} = data;
                              return (
                              <tr key={id}>
                                <td className="px-6 py-4">{id}</td>
                                <td className="px-6 py-4">{title}</td>
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
            <Pagination totalPages={pages} link={link} />
        </div>
    );
}