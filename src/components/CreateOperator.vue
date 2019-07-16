<template>
    <div class="border-2 rounded w-1/2 mx-auto text-center">
        <h1 class="">Create Operator</h1>
  <form class="border">
    <label for="name">Name</label>
    <input type="text" id="name" v-model.lazy="$v.formResponses.name.$model" />
    <label for="password">Password</label>
    <input type="text" id="password" v-model.lazy="$v.formResponses.password.$model" />
    <label for="programs">Programs</label>
    <input
      type="checkbox"
      value="diving"
      id="diving"
      v-model="formResponses.programs"
    />Diving
    <input
      type="checkbox"
      value="fishing"
      id="fishing"
      v-model="formResponses.programs"
    />Fishing

    <button @click.prevent="submitOperator">Create</button>
  </form>
  </div>
</template>

<script>
// import Api from "@/services/Api";
import { required } from 'vuelidate/lib/validators'

export default {
  name: "CreateOperator",
  data() {
    return {
      formResponses: {
        name: null,
        password: null,
        programs: []
      },
    }
  },
  validations: {
    formResponses: {
      name: {
        required,
      },
      password: {
        required,
      }
    }
  },
  methods: {
    // async submitOperator() {
    //   const result = await Api.post("/operators", {
    //     name: this.formResponses.name,
    //     password: this.formResponses.password,
    //     programs: this.formResponses.programs
    //   });
    // }
  }
};
</script>