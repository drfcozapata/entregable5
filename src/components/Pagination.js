import React from 'react';
import ReactPaginate from 'react-paginate';
import usePokemon from '../hooks/usePokemon';

const Pagination = ({ handlePageClick }) => {
	const { totalPages } = usePokemon();

	return (
		<ReactPaginate
			previousLabel={'Anterior'}
			nextLabel={'Siguiente'}
			breakLabel={'...'}
			pageCount={totalPages}
			marginPagesDisplayed={5}
			pageRangeDisplayed={5}
			onPageChange={handlePageClick}
			containerClassName={'pagination d-flex justify-content-center mb-50'}
			pageClassName={'page-item'}
			pageLinkClassName={'page-link'}
			previousClassName={'page-item'}
			previousLinkClassName={'page-link'}
			nextClassName={'page-item'}
			nextLinkClassName={'page-link'}
			breakClassName={'page-item'}
			breakLinkClassName={'page-link'}
			activeClassName={'active'}
		/>
	);
};

export default Pagination;
