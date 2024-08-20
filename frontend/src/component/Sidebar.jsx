import { useFrappeGetDocList } from "frappe-react-sdk";
import React, { useEffect, useState } from "react";
import { useStore } from "../store";

export default function Sidebar({ selectCategory }) {
  const { state, dispatch } = useStore();

  const { data, error, isValidating, mutate } = useFrappeGetDocList(
    "PL Category",
    {
      /** Fields to be fetched - Optional */
      fields: ["name", "title", "parent_pl_category", "thumbnail", "is_group"],
      /** Filters to be applied - SQL AND operation */
      // filters: [['creation', '>', '2021-10-09']],
      /** Filters to be applied - SQL OR operation */
      // orFilters: [],
      /** Fetch from nth document in filtered and sorted list. Used for pagination  */
      // limit_start: 5,
      /** Number of documents to be fetched. Default is 20  */
      limit: 100,
      /** Sort results by field and order  */
      // orderBy: {
      //     field: 'creation',
      //     order: 'desc',
      // },
      /** Fetch documents as a dictionary */
      // asDict: false,
    },
    {
      /** SWR Configuration Options - Optional **/
    }
  );

  const handleMenuClick = (option) => {
    dispatch({ type: "SELECT_MENU_OPTION", payload: option });
  };

  if (isValidating) {
    return <>Loading</>;
  }
  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

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
                class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
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

  return (
    <>
      <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <a href="#">
          <img
            className="w-auto h-7"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </a>
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="-mx-3 space-y-6 ">{renderCategories(data)}</nav>
        </div>
      </aside>
    </>
  );
}
