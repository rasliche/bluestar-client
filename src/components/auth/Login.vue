<template>
  <div class="border-2 rounded w-1/2 mx-auto text-center">
    <h1 class="">Login</h1>
    <form>
      <div class="m-2">
        <label for="email" class="text-blue-darker pr-2">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          v-model="email"
          class="border-blue-lighter border-b-2 pl-2"
        />
      </div>
      <div>
        <label for="password" class="text-blue-darker pr-2">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          v-model="password"
          class="border-blue-lighter border-b-2 pl-2"
        />
      </div>

      <button
        @click.prevent="submitLogin"
        class="border-2 m-2 rounded border-blue mx-auto"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async submitLogin() {
      const authData = {
        email: this.email,
        password: this.password
      };

      this.$store.dispatch("login", authData);
    }
  }
};
</script>
