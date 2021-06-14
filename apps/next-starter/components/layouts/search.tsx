import React from 'react';

function renderIfTrue(component, condition) {
  if (condition) {
    return component
  }
  return null;
}

export function LayoutSearchBar() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <div className="flex items-center py-4 md:max-w-3xl md:mx-auto lg:mx-0">
        <div className="w-full">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search"
              type="search"
              value={searchTerm}
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {renderIfTrue(
        <div className="w-full absolute top-20 left-0 bg-white rounded-lg shadow p-6 pt-4 -mb-16 -mt-2 border">
          <p className="text-xs uppercase tracking-wider">results</p>
          <hr className="text-gray-300 my-2" />
          <div>
            {renderIfTrue(
              <span className="text-gray-400 text-sm tracking-wide">
                no results found
              </span>,
              !!searchTerm.length
            )}
          </div>
        </div>,
        open
      )}
    </div>
  );
}

const SearchIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
)