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
      prefix,
      addonRight,
      error,
      ...rest // 👈 for react-hook-form
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1 mb-3">
        {label && <label className="text-sm font-medium">{label}</label>}

        <div
          className={`flex items-center border rounded-xl p-2 focus-within:ring-2 ${error ? 'border-red-500 ring-red-200' : 'border-gray-300 focus-within:ring-gray-200'}`}
        >
          {prefix && <div className="mr-2">{prefix}</div>}

          {as === 'textarea' ? (
            <textarea
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              rows={rows}
              className={`flex-1 outline-none ${className}`}
              ref={ref}
              {...rest} // 👈 support RHF props like onBlur
            />
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`flex-1 outline-none ${className}`}
              ref={ref}
              {...rest}
            />
          )}

          {addonRight && <div className="ml-2">{addonRight}</div>}
        </div>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField'; // for forwardRef

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
  prefix: PropTypes.node,
  addonRight: PropTypes.node,
  error: PropTypes.string,
};

export default InputField;
