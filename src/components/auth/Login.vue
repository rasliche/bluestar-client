<template>
    <div>
        <h1>Login</h1>
        <form class="flex flex-wrap">
            <label for="userEmail" class="w-1/2 text-right pr-2 border border-red">User Email:</label>
            <input type="text" name="userEmail" id="userEmail" class="w-1/2 text-left pl-2 border border-red">
            <label for="shopChoice" class="w-1/2">Choose a Shop:</label>
            <select name="shopChoice" id="shopChoice" class="w-1/2">
                <option v-for="operator in operators" :value="operator" :key="operator._id">{{ operator.name }}</option>
            </select>
            <label for="shopPassword" class="w-1/2">Shop Password:</label>
            <input type="text" name="shopPassword" id="shopPassword" class="w-1/2">
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
