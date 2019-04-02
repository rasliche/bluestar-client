<template>
    <div>
        <h1>User Dashboard Page</h1>
        <div v-for="(value, key) in user" :key="key">
            {{ key }}: {{ value }}
        </div>
        {{ user }}
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    computed: {
        ...mapGetters(['user'])
    }
}
</script>

<style>

</style>
