import { useFrappeGetDocList } from "frappe-react-sdk";
import React from "react";
import Grid from "./Grid";

export default function ListVarients() {
  const { data, error, isValidating, mutate } = useFrappeGetDocList(
    "PL Variant",
    {
      /** Fields to be fetched - Optional */
      fields: ["name", "title", "parent_item", "category"],
      /** Filters to be applied - SQL AND operation */
      // filters: [['creation', '>', '2021-10-09']],
      /** Filters to be applied - SQL OR operation */
      // orFilters: [],
      /** Fetch from nth document in filtered and sorted list. Used for pagination  */
      // limit_start: 5,
      /** Number of documents to be fetched. Default is 20  */
      // limit: 10,
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

  if (isValidating) {
    return <>Loading</>;
  }
  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  if (data) {
    return (
      <>
        <Grid
          rowData={data}
          colDefs={[
            { field: "parent_item" },
            { field: "title" },
            { field: "category" },
          ]}
        />
        <button onClick={() => mutate()}>Reload</button>
      </>
    );
  }
  return null;
}
