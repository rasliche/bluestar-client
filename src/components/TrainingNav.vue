<template>
    <nav>
        <!-- TODO: iterate through training children -->
        <router-link :to="{ name: 'training'}">Training Home</router-link>
        <router-link :to="{ name: 'about-fknms' }">About FKNMS</router-link>
        <router-link :to="{ name: 'mangroves-and-seagrasses' }">Mangroves and Seagrasses</router-link>
    </nav>
</template>

