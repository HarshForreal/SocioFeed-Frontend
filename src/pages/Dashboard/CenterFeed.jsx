const CenterFeed = () => {
  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Ask Question Section */}
        <div className="bg-white shadow-sm p-4 mb-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-gray-600 text-sm">
            Ask a question to the community?
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white shadow-sm p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Post #{i + 1}
              </h3>
              <p className="text-gray-600 text-sm">
                This is a sample post content. You can replace this with actual
                post data.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CenterFeed;
