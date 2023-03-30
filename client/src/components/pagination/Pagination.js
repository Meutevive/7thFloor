import { Link } from "react-router-dom";

export const Pagination = ({totalPages , last, number}) => {
    return (

        <nav aria-label="Page navigation example">
            <ul className="inline-flex items-center -space-x-px">
                {
                    
                    [...Array(totalPages)].map((element, index) => {
                        return (
                            <li>
                                <Link to={ "/admin/films?page="+index} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" >{ index}</Link>
                            </li>
                        );
                    })
                }
               
               {/* <li>
                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</a>
                </li>
                <li>
                    <a href="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">3</a>
                </li>
                <li>
                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">4</a>
                </li>
                <li>
                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">5</a>
                </li> */}
            </ul>
        </nav>

    );
}