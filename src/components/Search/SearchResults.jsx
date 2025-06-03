// // src/components/Search/SearchResults.jsx
// import React from 'react';
// import Button from '../common/Button/Button'; // Reuse button component

// const SearchResults = ({ users, followingSet, onToggleFollow }) => {
//   return (
//     <div>
//       {users.length === 0 ? (
//         <p>No users found</p>
//       ) : (
//         <ul className="divide-y divide-gray-200">
//           {users.map((user) => (
//             <li
//               key={user.id}
//               className="flex items-center justify-between py-3 hover:bg-gray-50 rounded px-2"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={user.avatarUrl || '/default-avatar.png'}
//                   alt={user.username}
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//                 <div>
//                   <p className="font-semibold">{user.username}</p>
//                   <p className="text-sm text-gray-600">
//                     {user.bio || 'No bio'}
//                   </p>
//                 </div>
//               </div>

//               <Button
//                 text={followingSet.has(user.id) ? 'Unfollow' : 'Follow'}
//                 color={
//                   followingSet.has(user.id) ? 'bg-gray-300' : 'bg-blue-500'
//                 }
//                 textColor={
//                   followingSet.has(user.id) ? 'text-gray-700' : 'text-white'
//                 }
//                 onClick={() => onToggleFollow(user.id)}
//               />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchResults;
