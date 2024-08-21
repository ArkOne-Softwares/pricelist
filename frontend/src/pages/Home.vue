<template>
  <div class="max-w-3xl py-12 mx-auto">
    <h2 class="font-bold text-lg text-gray-600 mb-4">Welcome {{ session.user }}!</h2>
    <div>
      <v-data-table :items="rows"></v-data-table>
    </div>
    <!-- <ListView
        class="h-[250px]"
        :columns="[
          {
            label: 'Name',
            key: 'name',
            width: 3,
            getLabel: ({ row }) => row.name,
            prefix: ({ row }) => {
              return h(Avatar, {
                shape: 'circle',
                image: row.user_image,
                size: 'sm'
              });
            },
          },
          {
            label: 'Email',
            key: 'email',
            width: '200px',
          },
          {
            label: 'Role',
            key: 'role',
          },
          {
            label: 'Status',
            key: 'status',
          },
        ]"
        :rows="[]"
        :options="{
          selectable: true,
          showTooltip: true,
          resizeColumn: true,
          emptyState: {
            title: 'No records found',
            description: 'Import Price List to View Here',
            button: {
              label: 'New Record',
              variant: 'solid',
              onClick: () => console.log('New Record'),
            },
          },
        }"
        row-key="id"
      /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  createResource,
  createListResource,
  ListView,
  Dialog,
  ListHeader,
  ListHeaderItem,
} from "frappe-ui";
import { session } from "../data/session";

const columns = ref(["Name", "Title", "Parent Item", "Category"]);
const rows = ref([]);

onMounted(async () => {
  var resource = createResource({
    url: "pricelist.api.doc.get_data",
    params: {
      doctype: "PL Variant",
      rows: ["*"],
      page_length: 10,
    },
    // fields: ["name", "title", "parent_item", "category", "options"],
  });

  const data = await resource.reload();
  console.log(data);
  rows.value = data;
});
</script>
