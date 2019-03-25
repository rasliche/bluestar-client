<template>
    <div>
        <h1>This is a single operator</h1>
        <p>Name: {{ name }}</p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            loading: true,
            name: null,
            slug: null,
            programs: []
        }
    },
    watch: {
        '$route': 'fetchOperator'
    },
    methods: {
        async fetchOperator() {
            this.loading = true
            const { data } = await axios.get(`http://localhost:3000/api/operators/${this.$route.params.slug}`, {
                headers: {
                    Authorization: `Bearer: ${this.$store.state.user.token}`
                }
            })
            this.name = data.name
            this.slug = data.slug
            this.programs = data.programs
            this.loading = false
        }
    },
    created() {
        this.fetchOperator()
    }
    
}
</script>

<style>

</style>
