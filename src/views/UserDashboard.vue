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
import { mapState } from 'vuex'
import Api from '@/services/Api'

export default {
    data() {
        return {
            user: null
        }
    },
    // computed: {
    //     ...mapState(['token'])
    // },
    async created() {
        const { data } = await Api.get('/users/me', {
            headers: {
            Authorization: `Bearer: ${this.$store.state.token}`
            }
        })
        this.user = data.user
        // this.user = await Api.get('users/me')
    }
}
</script>

<style>

</style>
