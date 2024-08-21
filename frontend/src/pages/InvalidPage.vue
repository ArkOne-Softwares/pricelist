<template>
    <div
      class="grid h-full place-items-center px-4 py-20 text-center text-lg text-gray-600"
    >
      <div class="space-y-2">
        <div>Invalid page or not permitted to access</div>
        <Button :route="{ name: 'PriceList' }">
          <template #prefix></template>
          Price List
        </Button>
      </div>
    </div>
  </template>
  
  <script setup>
//   import LeadsIcon from '@/components/Icons/LeadsIcon.vue'
  </script>