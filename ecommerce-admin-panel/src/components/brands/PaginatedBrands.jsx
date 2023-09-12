import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";


const PaginatedBrands = ({ brands, deleteItem }) => {


    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(brands.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(brands.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % brands.length;
        setItemOffset(newOffset);
    };

    return (
        <>


            {currentItems.map(({ _id, brand_name, image }) => (
                <tr key={_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {brand_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {image?.url}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                        <Link
                            to={`/edit-brand/${_id}`}
                            className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => deleteItem(_id, "brand")}
                            className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                breakLabel="..."
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName="flex justify-center"
                pageClassName=" py-2 px-4 rounded hover:bg-orange-500 transition duration-100"
                previousClassName=" py-2 px-4 rounded hover:bg-orange-500 transition duration-100"
                nextClassName=" py-2 px-4 rounded hover:bg-orange-500 transition duration-100"
                activeClassName="bg-orange-500 text-white"
                disabledClassName="text-gray-400 cursor-not-allowed"
                initialPage={0}
                renderOnZeroPageCount={null}

            />
        </>
    );
}

export default PaginatedBrands;
