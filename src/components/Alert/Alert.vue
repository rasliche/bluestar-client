<template>
<div class="fixed pin-r pin-b m-4">
    <div 
        :class="[
            `flex flex-row-reverse justify-between
            bg-${alertColor} text-${alertColor}-darkest 
            rounded-sm shadow-md 
            p-2
            opacity-75 hover:opacity-100`
            ]">
        <button 
            :class="[
                `cursor-pointer p-2 text-sm
                border border-transparent hover:border-${alertColor}-dark 
                rounded-sm`]"
            @click="clearAlert">
            x
        </button>
        <div class="mr-2">
            {{ text }}
        </div>
    </div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('alert')
export default {
    name: 'Alert',
    props: {
        type: {
            type: String,
            default: 'warn',
        },
        text: {
            type: String,
        }
    },
    methods: {
        ...mapActions(['clearAlert'])
    },
    computed: {
        alertColor: function() {
            if (this.type === 'error') return 'red'
            if (this.type === 'warn') return 'yellow'
            if (this.type === 'success') return 'green'
        }
    }
}
</script>