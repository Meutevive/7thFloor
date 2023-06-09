import {useSelector} from "react-redux";

export const ArticlesTable = ({handleModal, handleUpdate})=>{
     const {allArticles} = useSelector((state)=>state.articles)
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
                    { allArticles &&
                      allArticles.map((actor)=>{
                          const {id,title} = actor;

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
        </div>
    );
}