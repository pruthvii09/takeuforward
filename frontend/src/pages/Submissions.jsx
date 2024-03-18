import React, { useEffect, useState } from "react";
import axios from "axios";
const Submissions = () => {
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState(null);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10; // Number of submissions per page

  useEffect(() => {
    fetchSubmissions();
  }, [currentPage]); // Fetch submissions whenever the current page changes

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NODE_API}/submissions?page=${currentPage}`
      );
      setSubmissions(response.data.data);
      setTotalSubmissions(response.data.count);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
    setLoading(false);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalSubmissions / perPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="text-white py-10">
      <h1 className="text-3xl">Submissions</h1>
      <div className="py-4">
        <table className="w-full overflow-x-scroll text-sm text-left rtl:text-right  text-gray-400">
          <thead className="text-xs uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Language Id
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Source Code
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              "Loading"
            ) : (
              <>
                {submissions?.map((submission) => (
                  <tr
                    key={submission.id}
                    className="border-b bg-gray-800 border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      {submission.language_id}
                    </th>
                    <td className="px-6 py-4">{submission.username}</td>
                    <td className="px-6 py-4">
                      {submission.source_code.substr(0, 100)}
                    </td>
                    <td className="px-6 py-4">{submission.timestamp}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
        >
          Previous Page
        </button>
        <div className="text-gray-400">
          Page {currentPage} of {Math.ceil(totalSubmissions / perPage)}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(totalSubmissions / perPage)}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Submissions;
