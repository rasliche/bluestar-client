<template>
    <div class="text-center text-xs">
      <p class="border-t border-blue-light p-2 mt-2">Copyright 2018 - FKNMS</p>
      <div v-for="childRoute in this.$router.options.routes.filter(x => x.name === 'training')">
        {{ childRoute }}
      </div>
    </div>
</template>