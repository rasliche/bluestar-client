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
import axios from 'axios'

export default {
    data() {
        return {
            user: null
        }
    },
    created() {
        this.user = this.$store.state.user.user
    }
}
</script>

<style>

</style>
