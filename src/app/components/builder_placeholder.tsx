export default function BuilderPlaceholder() {
    // Display placeholders while waiting for the actual values to be loaded
    return (
      <div className="w-full border-4 border-border border-r-0 rounded-l-xl flex grow flex-col p-4 overflow-y-auto mb-2 font-inter text-textC text-3xl">
        <div className="pl-2 h-10 mb-4 rounded-xl bg-gray-300 w-1/2"></div>
            <div className="ml-8 h-4 mb-2 rounded-xl bg-gray-300  w-1/2"></div>
            <div className="ml-20 h-4 mb-2 rounded-xl bg-gray-300  w-1/2"></div>
            <div className="ml-32 h-4 mb-6 rounded-md bg-gray-300  w-1/3"></div>
            <div className="ml-8 h-4 mb-2 rounded-xl bg-gray-300  w-1/2"></div>
            <div className="ml-20 h-4 mb-2 rounded-xl bg-gray-300  w-1/2"></div>
            <div className="ml-32 h-4 mb-6 rounded-md bg-gray-300  w-1/3"></div>
        </div>
    );
  
};