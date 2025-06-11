// import PropTypes from 'prop-types';

// const Form = ({ title, subtitle, children, onSubmit, bottomText }) => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen px-4">
//       <div className="w-full max-w-md">
//         {title && (
//           <h2 className="text-4xl sm:text-4xl text-black instrument-heading whitespace-nowrap text-center mb-2">
//             {title}
//           </h2>
//         )}
//         {subtitle && (
//           <p className="text-2xl sm:text-2xl text-[#8e9ab0] instrument-heading text-center mb-6">
//             {subtitle}
//           </p>
//         )}

//         <form
//           onSubmit={onSubmit}
//           className="bg-white w-full rounded-2xl shadow-md px-6 py-8 border border-gray-300"
//         >
//           {children}
//         </form>

//         {bottomText && (
//           <div className="text-sm text-center text-gray-500 mt-4">
//             {bottomText}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// Form.propTypes = {
//   title: PropTypes.string,
//   subtitle: PropTypes.string,
//   children: PropTypes.node.isRequired,
//   onSubmit: PropTypes.func.isRequired,
//   bottomText: PropTypes.node,
// };

// export default Form;

// src / components / common / Form / Form.jsx;
import PropTypes from 'prop-types';

const Form = ({ title, subtitle, children, onSubmit, bottomText, error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        {title && (
          <h2 className="text-4xl sm:text-4xl text-black instrument-heading whitespace-nowrap text-center mb-2">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-2xl sm:text-2xl text-[#8e9ab0] instrument-heading text-center mb-6">
            {subtitle}
          </p>
        )}

        {/* Display form-level error if exists */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form
          onSubmit={onSubmit}
          className="bg-white w-full rounded-2xl shadow-md px-6 py-8 border border-gray-300"
        >
          {children}
        </form>

        {bottomText && (
          <div className="text-sm text-center text-gray-500 mt-4">
            {bottomText}
          </div>
        )}
      </div>
    </div>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  bottomText: PropTypes.node,
  error: PropTypes.string, // New error prop
};

export default Form;
