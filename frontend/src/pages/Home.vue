<template>
  <div class="w-auto py-12 mx-auto">
    <h2 class="font-bold text-lg text-gray-600 mb-4">Welcome {{ session.user }}!</h2>
    <div class="card flex flex-wrap justify-center gap-8">
      <Tree :value="rows" :filter="true" filterMode="lenient" class="w-full md:w-[30rem]">
        <template #default="slotProps">
          <b>{{ slotProps.node.name }}</b>
        </template>
        <template #url="slotProps">
          <a :href="slotProps.node.name"
            class="text-surface-700 dark:text-surface-0 hover:text-primary">{{ slotProps.node.name }}</a>
        </template>
      </Tree>
    </div>
  </div>
</template>

<script setup>
import Tree from 'primevue/tree';
import { ref, onMounted } from "vue";
import {
  createListResource,
} from "frappe-ui";
import { session } from "../data/session";

// const columns = ref(["Name", "Title", "Parent Item", "Category"]);
const rows = ref([]);

function buildTree(data, parentCategory = null) {
  // Filter the items that belong to the current parent category
  const tree = data
    .filter(item => item.parent_pl_category === parentCategory)
    .map(item => {
      const children = buildTree(data, item.name); // Recursively find the children
      if (children.length) {
        item.children = children; // Add the children property if children exist
      }
      return item;
    });

  return tree;
}

onMounted(async () => {
  var resource = createListResource({
    doctype: "PL Category",
    fields: ["name", "title", "parent_pl_category", "is_group", "thumbnail"],
  })

  const data = await resource.reload();
  const treeData = buildTree(data);
  console.log(treeData);
  rows.value = treeData;

  // var resource = createResource({
  //   url: "pricelist.api.doc.get_data",
  //   params: {
  //     doctype: "PL Variant",
  //     rows: ["name", "title", "parent_item", "category"],
  //     page_length: 10,
  //   },
  //   // fields: ["name", "title", "parent_item", "category", "options"],
  // });

  // const data = await resource.reload();
  // console.log(data);
  // rows.value = data;
});
</script>
