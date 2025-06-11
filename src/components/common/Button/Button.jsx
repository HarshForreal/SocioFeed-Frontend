import PropTypes from 'prop-types';

const Button = ({
  text,
  onClick,
  color = 'bg-blue-500',
  textColor = 'text-white',
  className = '',
  type = 'button',
  icon = null,
  loading = false,
}) => {
  return (
    <button
      type={type}
      className={`${color} ${textColor} px-2 py-2 rounded hover:opacity-90 transition ${className}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-t-transparent border-white animate-spin rounded-full"></div>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
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
  icon: PropTypes.node,
  loading: PropTypes.bool,
};

export default Button;
