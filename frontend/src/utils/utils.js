const renderCategories = (categories) => {
    const parentCategories = categories.filter((category) => category.is_group);
    const otherCategories = categories.filter(
      (category) => !category.parent_pl_category && !category.is_group
    );

    const renderCategoryList = (categories) => {
      return categories.map((category) => {
        return (
          <div className="space-y-3" key={category.name}>
            {category.is_group ? (
              <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                {category.name}
              </label>
            ) : (
              <a
                class={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${
                  state.selectedMenuOption === category.name
                    ? "bg-gray-100 dark:bg-gray-800"
                    : ""
                }`}
                onClick={() => handleMenuClick(category.name)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                  />
                </svg>

                <span class="mx-2 text-sm font-medium">{category.name}</span>
              </a>
            )}

            {category.is_group && (
              <div className="pl-2">
                {renderCategoryList(
                  data.filter((c) => {
                    return c.parent_pl_category === category.name;
                  })
                )}
              </div>
            )}
          </div>
        );
      });
    };

    return (
      <>
        {renderCategoryList(parentCategories)}
        {otherCategories.length > 0 && (
          <div>
            <h3 className="p-4 text-gray-700 dark:text-gray-200">Others</h3>
            {renderCategoryList(otherCategories)}
          </div>
        )}
      </>
    );
  };