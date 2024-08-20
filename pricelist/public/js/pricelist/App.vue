<template>
  <div>
	<h3>{{ dynamicMessage }}</h3>
    <h4>Start editing at pricelist/public/js/pricelist/App.vue</h4>
  </div>
</template>
<script setup>
import { ref } from "vue";

const dynamicMessage = ref("Hello from App.vue");
</script>