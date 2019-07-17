<template>
<div class="fixed pin-r pin-b m-6">
    <div :class="[`bg-${flashColor} text-${flashColor}-darkest rounded-lg shadow-md p-6 pr-10 opacity-75 hover:opacity-100`]" style="min-width: 240px">
        <button class="cursor-pointer static top-0 right-0 py-2 px-3" @click="clearAlert">
            X
        </button>
        <div class="flex items-center">
            {{ text }}
        </div>
    </div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('alert')
export default {
    name: 'BSFlashMessage',
    props: ['type', 'text'],
    methods: {
        ...mapActions(['clearAlert'])
    },
    computed: {
        flashColor: function() {
            if (this.type === 'error') return 'red'
            if (this.type === 'warn') return 'yellow'
            if (this.type === 'success') return 'green'
        }
    }
}
</script>