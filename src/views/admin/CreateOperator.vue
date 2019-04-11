<template>
    <div>
        <h1>Create Operator</h1>
        <form class="border">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name">
            <label for="password">Password</label>
            <input type="text" id="password" v-model="password">
            <label for="programs">Programs</label>
            <input type="checkbox" value="diving" id="diving" v-model="programs">Diving
            <input type="checkbox" value="fishing" id="fishing" v-model="programs">Fishing

            <button @click.prevent="submitOperator">Create</button>
        </form>
    </div>
</template>

<script>
import Api from '@/services/Api'

export default {
    data() {
        return {
            name: '',
            password: '',
            programs: [],
        }
    },
    methods: {
        async submitOperator() {
            const result = await Api.post('/operators', {
                name: this.name,
                password: this.password,
                programs: this.programs
            })
            console.log(result)
        }
    }
}
</script>

<style>

</style>
