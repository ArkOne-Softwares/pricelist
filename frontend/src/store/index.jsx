import React, { createContext, useContext, useReducer } from 'react';

// Create the context for the store
const StoreContext = createContext();

// Create the provider component
export const StoreProvider = ({ children }) => {
    // Define your initial state here
    const initialState = {
        selectedMenuOption: null, // Add initial state property for selected menu option
    };

    // Define your reducer function here
    const reducer = (state, action) => {
        // Handle different actions here
        switch (action.type) {
            case 'SELECT_MENU_OPTION':
                return {
                    ...state,
                    selectedMenuOption: action.payload,
                };
            default:
                return state;
        }
    };

    // Use useReducer to create the state and dispatch method
    const [state, dispatch] = useReducer(reducer, initialState);

    // Create the store object
    const store = {
        state,
        dispatch,
    };

    // Provide the store to the children components
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

// Custom hook to access the store and dispatch method
export const useStore = () => useContext(StoreContext);
