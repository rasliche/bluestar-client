<template>
  <div class="relative py-1 shadow-md">
    <button @click="open" type="button" class="w-full focus:border-blue-300">
      <span v-if="value !== null">{{ value }}</span>
      <span v-else>Select an option...</span>
    </button>
    <div v-show="isOpen" class="absolute w-full mt-1 px-2 py-1 rounded-md bg-gray-800 text-gray-200">
      <input class="block px-2 my-1 text-left w-full rounded-md text-gray-800" type="text" v-model="search">
      <ul class="rounded-md">
        <li
          v-show="filteredOptions.length > 0"
          v-for="option in filteredOptions" 
          :key="option._id"
          @click="select(option)"
          class="px-2 my-1 rounded-md hover:bg-gray-700"
        >
          {{ option }}
        </li>
        <li 
          v-show="filteredOptions.length === 0" 
          class="px-2 my-1 rounded-md">
          No Results Found For "{{ search }}"
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'SearchSelect',
    props: {
        options: {
            type: Array,
            default: () => [ 'red', 'blue', 'green', 'yellow' ],
        },
    },
    data() {
        return {
            isOpen: false,
            value: null,
            search: '',
        }
    },
    computed: {
        filteredOptions() {
            return this.options.filter(option => {
                return option.toLowerCase().startsWith(this.search.toLowerCase())
            })
        }
    },
    methods: {
        open() {
            this.isOpen = true
        },
        close() {
            this.isOpen = false
        },
        select(option) {
            this.value = option
            this.search = ''
            this.close()
        }
    }
}
</script>

<style>

</style>