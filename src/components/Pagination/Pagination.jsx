import React from "react";
import { Link, useNavigate } from "react-router-dom";

// const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
//   const pageNumbers = Array.from({ length: nPages }, (_, index) => index + 1);

//   const goToNextPage = () => {
//     if (currentPage !== nPages) setCurrentPage(currentPage + 1);
//   };

//   const goToPrevPage = () => {
//     if (currentPage !== 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <nav>
//       <ul className="pagination justify-content-center">
//         <li className="page-item">
//           <button
//             className="page-link btn btn-link"
//             onClick={goToPrevPage}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//         </li>
//         {pageNumbers.map((pgNumber) => (
//           <li
//             key={pgNumber}
//             className={`page-item ${currentPage === pgNumber ? "active" : ""}`}
//           >
//             <button
//               className="page-link btn btn-link"
//               onClick={() => setCurrentPage(pgNumber)}
//             >
//               {pgNumber}
//             </button>
//           </li>
//         ))}
//         <li className="page-item">
//           <button
//             className="page-link btn btn-link"
//             onClick={goToNextPage}
//             disabled={currentPage === nPages}
//           >
//             Next
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
//   const goToNextPage = () => {
//     if (currentPage !== nPages) setCurrentPage(currentPage + 1);
//   };

//   const goToPrevPage = () => {
//     if (currentPage !== 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <nav>
//       <ul className="pagination justify-content-center">
//         <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//           <button
//             className="page-link btn btn-link"
//             onClick={goToPrevPage}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//         </li>
//         {[...Array(nPages).keys()].map((pageNumber) => (
//           <li
//             key={pageNumber + 1}
//             className={`page-item ${
//               pageNumber + 1 === currentPage ? "active" : ""
//             }`}
//           >
//             <button
//               className="page-link btn btn-link"
//               onClick={() => setCurrentPage(pageNumber + 1)}
//             >
//               {pageNumber + 1}
//             </button>
//           </li>
//         ))}
//         <li className={`page-item ${currentPage === nPages ? "disabled" : ""}`}>
//           <button
//             className="page-link btn btn-link"
//             onClick={goToNextPage}
//             disabled={currentPage === nPages}
//           >
//             Next
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

const Pagination = ({ nPages, currentPage, setCurrentPage, value }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const goToNextPage = () => {
    if (parseInt(currentPage) !== nPages) {
      setCurrentPage(parseInt(currentPage) + 1);

      if (role == "admin") {
        if (value) {
          navigate(`/admin${value}?page=${currentPage + 1}`);
        } else {
          navigate(`/admin/products?page=${currentPage + 1}`);
        }
      } else {
        if (value) {
          navigate(`${value}?page=${currentPage + 1}`);
        } else {
          navigate(`/home?page=${currentPage + 1}`);
        }
      }
    }
  };

  const goToPrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);

      if (role == "admin") {
        if (value) {
          navigate(`/admin${value}?page=${currentPage - 1}`);
        } else {
          navigate(`/admin/products?page=${currentPage - 1}`);
        }
      } else {
        if (value) {
          navigate(`${value}?page=${currentPage - 1}`);
        } else {
          navigate(`/home?page=${currentPage - 1}`);
        }
      }
    }
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li
          className={`page-item ${
            parseInt(currentPage) === 1 ? "disabled" : ""
          }`}
        >
          <button
            className="page-link btn btn-link"
            onClick={goToPrevPage}
            disabled={parseInt(currentPage) === 1}
          >
            Previous
          </button>
        </li>
        {[...Array(nPages).keys()].map((pageNumber) => (
          <li
            key={pageNumber + 1}
            className={`page-item ${
              pageNumber + 1 === parseInt(currentPage) ? "active" : ""
            }`}
          >
            <button
              className="page-link btn btn-link"
              onClick={() => {
                setCurrentPage(pageNumber + 1);
                if (role == "admin") {
                  if (value) {
                    navigate(`/admin${value}?page=${pageNumber + 1}`);
                  } else {
                    navigate(`/admin/products?page=${pageNumber + 1}`);
                  }
                } else {
                  if (value) {
                    navigate(`${value}?page=${pageNumber + 1}`);
                  } else {
                    navigate(`/home?page=${pageNumber + 1}`);
                  }
                }
              }}
              disabled={pageNumber + 1 === parseInt(currentPage)}
            >
              {pageNumber + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            parseInt(currentPage) === nPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link btn btn-link"
            onClick={goToNextPage}
            disabled={parseInt(currentPage) === nPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
