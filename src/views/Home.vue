<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <CreateOperator />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"
import CreateOperator from "@/components/CreateOperator.vue"

export default {
  name: "home",
  components: {
    HelloWorld,
    CreateOperator
  }
}
</script>
