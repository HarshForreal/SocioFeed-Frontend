// import PropTypes from 'prop-types';

// const Button = ({
//   text,
//   onClick,
//   color = 'bg-blue-500',
//   textColor = 'text-white',
//   className = '',
//   type = 'button',
// }) => {
//   return (
//     <button
//       type={type}
//       className={`${color} ${textColor} px-2 py-2 rounded hover:opacity-90 transition ${className}`}
//       onClick={onClick}
//     >
//       {text}
//     </button>
//   );
// };

// Button.propTypes = {
//   text: PropTypes.string.isRequired,
//   onClick: PropTypes.func,
//   color: PropTypes.string,
//   type: PropTypes.oneOf(['button', 'submit', 'reset']),
// };

// export default Button;

// src/components/common/Button/Button.jsx
import PropTypes from 'prop-types';

const Button = ({
  text,
  onClick,
  color = 'bg-blue-500',
  textColor = 'text-white',
  className = '',
  type = 'button',
  icon = null, // New prop to support icons
  loading = false, // New prop for loading state
}) => {
  return (
    <button
      type={type}
      className={`${color} ${textColor} px-2 py-2 rounded hover:opacity-90 transition ${className}`}
      onClick={onClick}
      disabled={loading} // Disable button when loading
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-t-transparent border-white animate-spin rounded-full"></div> // Simple spinner
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>} {/* Render icon */}
          {text}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  icon: PropTypes.node, // Prop for icon
  loading: PropTypes.bool, // Prop for loading state
};

export default Button;
