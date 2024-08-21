<template>
  <div class="relative flex h-full flex-col justify-between transition-all duration-300 ease-in-out"
    :class="isSidebarCollapsed ? 'w-12' : 'w-[220px]'">
    <div>
      <UserDropdown class="p-2" :isCollapsed="isSidebarCollapsed" />
    </div>
    <div class="flex-1 overflow-y-auto">
      <div v-for="view in allViews" :key="view.label">
        <div v-if="!view.hideLabel && isSidebarCollapsed && view.views?.length" class="mx-2 my-2 h-1 border-b" />
        <Section :label="view.name" :hideLabel="view.hideLabel" :isOpened="view.opened">
          <template #header="{ opened, hide, toggle }">
            <div v-if="!hide"
              class="flex cursor-pointer gap-1.5 px-1 text-base font-medium text-gray-600 transition-all duration-300 ease-in-out"
              :class="isSidebarCollapsed
                  ? 'ml-0 h-0 overflow-hidden opacity-0'
                  : 'ml-2 mt-4 h-7 w-auto opacity-100'
                " @click="toggle()">
              <FeatherIcon name="chevron-right" class="h-4 text-gray-900 transition-all duration-300 ease-in-out"
                :class="{ 'rotate-90': opened }" />
              <span>{{ __(view.name) }}</span>
            </div>
          </template>
          <nav class="flex flex-col">
            <SidebarLink v-for="link in view.views" :icon="link.icon" :label="__(link.label)" :to="link.to"
              :isCollapsed="isSidebarCollapsed" class="mx-2 my-0.5" />
          </nav>
        </Section>
      </div>
    </div>
    <div class="m-2 flex flex-col gap-1">
      <SidebarLink :label="isSidebarCollapsed ? __('Expand') : __('Collapse')" :isCollapsed="isSidebarCollapsed"
        @click="isSidebarCollapsed = !isSidebarCollapsed" class="">
        <template #icon>
          <span class="grid h-4.5 w-4.5 flex-shrink-0 place-items-center">
            <CollapseSidebar class="h-4.5 w-4.5 text-gray-700 duration-300 ease-in-out"
              :class="{ '[transform:rotateY(180deg)]': isSidebarCollapsed }" />
          </span>
        </template>
      </SidebarLink>
    </div>
  </div>
</template>

<script setup>
import Section from '@/components/Section.vue'
import PinIcon from '@/components/Icons/PinIcon.vue'
import UserDropdown from '@/components/UserDropdown.vue'
import CollapseSidebar from '@/components/Icons/CollapseSidebar.vue'
import SidebarLink from '@/components/SidebarLink.vue'
import { FeatherIcon } from 'frappe-ui'
import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

const isSidebarCollapsed = useStorage('isSidebarCollapsed', false)

const links = [
  {
    label: 'Home',
    icon: PinIcon,
    to: 'Home',
  }
]

const allViews = computed(() => {
  let _views = [
    {
      name: 'All Views',
      hideLabel: true,
      opened: true,
      views: links,
    },
  ]
  return _views
})
</script>
