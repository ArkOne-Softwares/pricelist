import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenuStore = defineStore('menu', () => {

   const selectedOption = ref(null);

   const changeSelectedOption = (option) => {
       selectedOption.value = option;
    }

    // state: () => {
    //     return {
    //         selectedOption: "test",
    //     };
    // },
    // actions: {
    //     setSelectedOption(option) {
    //         selectedOption = option;
    //     },
    // },
    // getters: {
    //     selectedOption: (state) => state.selectedOption,
    // },

    return {
        selectedOption,
        changeSelectedOption,
    };
});