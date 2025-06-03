// // src/components/Search/SearchBar.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { searchUsers } from '../../../../SocioFeed-Backend/src/services/user/searchUsers.service';
// import { toast } from 'react-toastify';

// const SearchBar = ({ onSearchResults }) => {
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(false);

//   const fetchUsers = useCallback(
//     async (searchTerm) => {
//       if (!searchTerm.trim()) {
//         onSearchResults([]); // Pass empty array when search term is empty
//         return;
//       }
//       setLoading(true);
//       try {
//         const res = await searchUsers(searchTerm);
//         onSearchResults(res.data.users); // Pass the fetched users to parent component
//       } catch (err) {
//         toast.error('Failed to fetch users');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [onSearchResults]
//   );

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       fetchUsers(query);
//     }, 500); // Debounced search with 500ms delay

//     return () => clearTimeout(handler);
//   }, [query, fetchUsers]);

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <input
//         type="text"
//         placeholder="Search by username or bio..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="w-full p-3 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       {loading && <p>Loading users...</p>}
//     </div>
//   );
// };

// export default SearchBar;
