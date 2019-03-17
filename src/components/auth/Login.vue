<template>
    <div>
        <h1>Login Component</h1>
        <form>
            <select name="shopChoice" id="shopChoice">
                <option v-for="operator in operators" :value="operator" :key="operator._id">{{ operator.name }}</option>
            </select>
            <br>
            <label for="shopPassword">Shop Password</label>
            <input type="text" name="shopPassword" id="shopPassword">
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'operators'
        ])
    }
}
</script>

<style>

</style>
