<template>
  <nav>
    <!-- TODO: iterate through training children -->
    <router-link :to="{ name: 'training' }">Training Home</router-link>
    <router-link :to="{ name: 'about-fknms' }">About FKNMS</router-link>
    <router-link :to="{ name: 'regulations-and-zones' }"
      >Regulations and Zones</router-link
    >
  </nav>
</template>
