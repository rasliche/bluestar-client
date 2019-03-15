<template>
    <nav class="flex flex-col">
        <!-- TODO: iterate through training children -->
        <router-link :to="{ name: 'training'}">Training Home</router-link>
        <router-link :to="{ name: 'about-fknms'}">About FKNMS</router-link>
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>
