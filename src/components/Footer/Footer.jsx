import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-gray-600">Sociofeed Inc.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
