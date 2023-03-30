import { Link } from "react-router-dom";

export const Pagination = ({totalPages , last, number, link}) => {
    return (

        <nav aria-label="Page navigation example">
            <ul className="inline-flex items-center -space-x-px">
                {
                    
                    [...Array(totalPages)].map((element, index) => {
                        return (
                            <li>
                                <Link to={ link+"?page="+index} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" >{ index}</Link>
                            </li>
                        );
                    })
                }
             
            </ul>
        </nav>

    );
}