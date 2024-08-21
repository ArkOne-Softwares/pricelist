<template>
  <div class="flex">
    <Sidebar @menu-click="handleMenuClick" />
    <p>Selected Menu Option: {{ menuStore.selectedOption }}</p>
    <VariantGrid />
  </div>
</template>

<script setup>
import { Dialog } from 'frappe-ui'
import { createResource } from 'frappe-ui'
import { session } from '../data/session'
import { storeToRefs } from 'pinia'
import Sidebar from './Sidebar.vue'
import VariantGrid from './VariantGrid.vue'
import { useMenuStore } from '../stores/menu.js'
import { ref, computed, onMounted } from "vue";

const menuStore = useMenuStore()


const handleMenuClick = (option) => {
  menuStore.changeSelectedOption(option);
};

</script>
