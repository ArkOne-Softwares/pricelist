<template>
  <aside
    class="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
    <a href="#">
      <img class="w-auto h-7" src="https://merakiui.com/images/logo.svg" alt="" />
    </a>
    <div class="flex flex-col justify-between flex-1 mt-6">
      <nav class="-mx-3 space-y-6">
        <div v-for="category in parentCategories" :key="category.name" class="spac  e-y-3">
          <label v-if="category.is_group" class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
            {{ category.name }}
          </label>
          <a v-else :class="[
            'flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
            state.selectedMenuOption === category.name ? 'bg-gray-100 dark:bg-gray-800' : ''
          ]" @click="handleMenuClick(category.name)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>
            <span class="mx-2 text-sm font-medium">{{ category.name }}</span>
          </a>
          <div v-if="category.is_group" class="pl-2">
            <SidebarCategoryList :categories="categoryData.data.filter(c => c.parent_pl_category === category.name)" @menu-click="handleMenuClick" />
          </div>
        </div>
        <div v-if="otherCategories.length > 0">
          <h3 class="p-4 text-gray-700 dark:text-gray-200">Others</h3>
          <SidebarCategoryList :categories="otherCategories" @menu-click="handleMenuClick" />
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { createListResource } from "frappe-ui";
import SidebarCategoryList from './SidebarCategoryList.vue';

const emit = defineEmits(['menu-click']);

const categoryData = createListResource({
  doctype: "PL Category",
  fields: ['name', 'title', 'parent_pl_category', 'thumbnail', 'is_group'],
  limit: 100,
});

categoryData.reload();

const handleMenuClick = (option) => {
  emit('menu-click', option);
};

const parentCategories = computed(() => {
  if (categoryData.data)
    return categoryData.data.filter(category => category.is_group);
  return [];
});

const otherCategories = computed(() => {
  if (categoryData.data)
    return categoryData.data.filter(category => !category.parent_pl_category && !category.is_group);
  return [];
});
</script>