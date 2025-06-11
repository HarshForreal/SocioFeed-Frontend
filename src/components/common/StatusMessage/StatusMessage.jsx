import PropTypes from 'prop-types';

const StatusMessage = ({ status, message }) => {
  let color;
  if (status === 'success') color = 'text-green-600';
  if (status === 'error') color = 'text-red-600';
  if (status === 'loading') color = 'text-gray-600';

  return <h1 className={`text-xl font-medium ${color}`}>{message}</h1>;
};

StatusMessage.propTypes = {
  status: PropTypes.oneOf(['loading', 'success', 'error']).isRequired,
  message: PropTypes.string.isRequired,
};

export default StatusMessage;
