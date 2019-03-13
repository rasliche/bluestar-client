<template>
    <div class="border">
        <form>
            <label for="name">Operator Name</label>
            <input type="text" id="name" v-model="name">
            <button @click.prevent="submitOperator">Create</button>
        </form>
        <div>
            <p>Operator Name: {{ name }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            name: '',
            region: ''
        }
    },
    methods: {
        ...mapActions([
            'createNewOperator'
        ]),
        submitOperator() {
            const newOperator = {
                name: this.name
            }
            this.createNewOperator(newOperator)
            this.name = ''
        }
    }
}
</script>

<style>

</style>
