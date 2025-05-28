import PropTypes from 'prop-types';

const Button = ({
  text,
  onClick,
  color = 'bg-blue-500',
  textColor = 'text-white',
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={`${color} ${textColor} px-2 py-2 rounded hover:opacity-90 transition ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
