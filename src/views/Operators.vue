<template>
    <div>
        <h1>All Shops</h1>
        {{ operators }}
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions([
            'fetchAllOperators'
        ])
    },
    mounted() {
        // this.fetchAllOperators()
    },
    computed: {
        operators() {
            return this.$store.getters.operators
        }
    }
}
</script>

<style>

</style>
