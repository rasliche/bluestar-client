<template>
    <OnClickOutside :do="close">
        <div class="relative py-1 shadow-md">
            <button 
                ref="button"
                @click="open" 
                type="button" 
                class="w-full rounded shadow-inner focus:border-blue-300"
            >
                <span v-if="value !== null">{{ value }}</span>
                <span v-else>Select an option...</span>
            </button>
            <div 
                ref="dropdown" 
                v-show="isOpen" 
                class="absolute w-full px-2 py-1 rounded-md bg-gray-800 text-gray-200"
            >
                <input 
                    ref="search" 
                    @keydown.esc="close"
                    @keydown.down="highlightNext"
                    @keydown.up="highlightPrev"
                    @keydown.enter.prevent="selectHighlighted"
                    @keydown.tab.prevent
                    v-model="search"
                    class="block px-2 my-1 text-left w-full rounded-md text-gray-800" 
                    type="text"
                >
                <ul ref="options" class="rounded-md">
                    <li
                        v-show="filteredOptions.length > 0"
                        v-for="(option, i) in filteredOptions" 
                        :key="option._id"
                        @click="select(option)"
                        class="px-2 my-1 rounded-md hover:bg-gray-700"
                        :class="{'bg-gray-700': i === highlightedIndex}"
                    >
                        {{ option }}
                    </li>
                    <li 
                        v-show="filteredOptions.length === 0" 
                        class="px-2 my-1 rounded-md"
                    >
                        No Results Found For "{{ search }}"
                    </li>
                </ul>
            </div>
        </div>
    </OnClickOutside>
</template>

<script>
import { OnClickOutside } from "@/components/BaseComponents";
import { createPopper } from '@popperjs/core'

export default {
    name: 'SearchSelect',
    components: {
        OnClickOutside
    },
    props: {
      value: { },
      options: {
          type: Array,
          default: () => ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
      },
      filterFunction: {
        type: Function,
      }
    },
    data() {
        return {
            isOpen: false,
            search: '',
            highlightedIndex: 0
        }
    },
    beforeDestroy() {
        if (this.popper) this.popper.destroy()
    },
    computed: {
        filteredOptions() {
            return this.filterFunction(this.search, this.options)
        }
    },
    methods: {
        open() {
            if (this.isOpen) return
            this.isOpen = true
            this.$nextTick(() => {
                this.setupPopper()
                this.$refs.search.focus()
                this.scrollToHighlighted()
            })
        },
        async setupPopper() {
            if (this.popper === undefined) {
                this.popper = createPopper(this.$refs.button, this.$refs.dropdown, { placement: 'bottom' })
            } else {
                await this.popper.update()
            }
        },
        close() {
            if (!this.isOpen) return
            this.isOpen = false
            this.$refs.button.focus()
        },
        select(option) {
            this.$emit('input', option)
            this.search = ''
            this.highlightedIndex = 0
            this.close()
        },
        selectHighlighted() {
            this.select(this.filteredOptions[this.highlightedIndex])
        },
        scrollToHighlighted() {
            this.$refs.options.children[this.highlightedIndex].scrollIntoView({ block: 'nearest' })
        },
        highlight(index) {
            this.highlightedIndex = index
            if (this.highlightedIndex < 0) {
                this.highlightedIndex = this.filteredOptions.length - 1
            }
            if (this.highlightedIndex > this.filteredOptions.length - 1) {
                this.highlightedIndex = 0
            }
            this.scrollToHighlighted()

        },
        highlightPrev() {
            this.highlight(this.highlightedIndex - 1)
        },
        highlightNext() {
            this.highlight(this.highlightedIndex + 1)
        },
    }
}
</script>

<style>

</style>