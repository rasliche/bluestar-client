<template>
    <nav class="flex flex-col">
        <!-- TODO: iterate through training children -->
        <router-link :to="{ name: 'training'}">Training Home</router-link>
        <router-link :to="{ name: 'about-blue-star'}">About Blue Star</router-link>
        <router-link :to="{ name: 'about-fknms'}">About FKNMS</router-link>
        <router-link :to="{ name: 'regulations'}">Regulations</router-link>
        <router-link :to="{ name: 'cultural-resources'}">Cultural Resources</router-link>
        <router-link :to="{ name: 'mangroves'}">Mangroves</router-link>
        <router-link :to="{ name: 'seagrasses'}">Seagrasses</router-link>
        <router-link :to="{ name: 'coral-reefs'}">Coral Reefs</router-link>
        <router-link :to="{ name: 'threats-to-corals'}">Threats to Corals</router-link>
        <router-link :to="{ name: 'reef-etiquette'}">Reef Etiquette</router-link>
        <router-link :to="{ name: 'invasive-lionfish'}">Invasive Lionfish</router-link>
    </nav>
</template>

<script>
export default {

}
</script>