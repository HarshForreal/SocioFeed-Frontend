const FormContainer = ({ children, title, subtitle, bottomText }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
    <div className="text-center mb-6">
      {title && (
        <h1 className="text-4xl sm:text-4xl text-black instrument-heading whitespace-nowrap ">
          {title}
        </h1>
      )}
      {subtitle && (
        <div className="text-2xl sm:text-2xl text-[#8e9ab0] instrument-heading">
          {subtitle}
        </div>
      )}
    </div>
    {children}
    {bottomText && <p className="mt-6 text-sm text-gray-500">{bottomText}</p>}
  </div>
);

export default FormContainer;
