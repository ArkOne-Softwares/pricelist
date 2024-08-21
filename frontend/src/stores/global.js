import { defineStore } from 'pinia'
import { getCurrentInstance, ref, computed } from 'vue'

export const globalStore = defineStore('pl-global', () => {
  const app = getCurrentInstance()
  const { $dialog, $socket } = app.appContext.config.globalProperties
  let callMethod = () => { }

  // Define filters object
  let filters = ref({
    allFilters: {},
    allOrFilters: {},
    allSortOrder: ''
  })

  function setMakeCall(value) {
    callMethod = value
  }

  function makeCall(number) {
    callMethod(number)
  }

  // Functions to update filters
  function updateAllFilters(data) {
    console.log("Updating allFilters", data)
    filters.value.allFilters = data
  }

  function updateAllOrFilters(data) {
    console.log("Updating allOrFilters", data)
    filters.value.allOrFilters = data
  }

  function updateAllSortOrder(data) {
    console.log("Updating allSortOrder", data)
    filters.value.allSortOrder = data
  }

  // Computed properties to return individual filters
  const allFilters = computed(() => filters.value.allFilters)
  const allOrFilters = computed(() => filters.value.allOrFilters)
  const allSortOrder = computed(() => filters.value.allSortOrder)

  return {
    $dialog,
    $socket,
    makeCall,
    setTwilioEnabled,
    setMakeCall,
    filters,
    updateAllFilters,
    updateAllOrFilters,
    updateAllSortOrder,
    allFilters,
    allOrFilters,
    allSortOrder
  }
})