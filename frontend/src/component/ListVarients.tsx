import { useFrappeGetDocList } from 'frappe-react-sdk';
import React from 'react'

export default function ListVarients() {
    const { data, error, isValidating, mutate } = useFrappeGetDocList(
        'PL Variant',
        {
            /** Fields to be fetched - Optional */
            fields: ['name', 'creation'],
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
        return <>{JSON.stringify(error)}</>;
    }
    if (data) {
        return (
            <p>
                {JSON.stringify(data)}
                <button onClick={() => mutate()}>Reload</button>
            </p>
        );
    }
    return null;
}
