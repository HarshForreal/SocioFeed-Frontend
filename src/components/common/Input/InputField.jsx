import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const InputField = forwardRef(
  (
    {
      label,
      value,
      onChange,
      placeholder,
      type = 'text',
      name,
      as = 'input',
      rows = 3,
      className = '',
      error,
      ...rest
    },
    ref
  ) => {
    const InputElement =
      as === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`flex-1 outline-none ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          ref={ref}
          {...rest}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`flex-1 outline-none ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          ref={ref}
          {...rest}
        />
      );

    return (
      <div className="flex flex-col gap-1 mb-3">
        {label && <label className="text-sm font-medium">{label}</label>}
        {InputElement}
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

InputField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  as: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
  error: PropTypes.string,
};

export default InputField;
