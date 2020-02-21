<template>
  <main class="programs">
      <PageHeading>Programs</PageHeading>
      <ul v-if="programs">
          <li v-for="program in programs" :key="program._id">{{ program.name }}<ButtonDanger @click="removeProgram(program._id)">Remove</ButtonDanger></li>
      </ul>
      <p v-else>No programs created yet.</p>
  </main>
</template>


<script>
import { mapGetters } from 'vuex'
import { PageHeading, ButtonDanger } from '@/components/BaseUI'
import Api from '@/services/Api.js'

export default {
    name: "Programs",
    components: {
        PageHeading,
        ButtonDanger
    },
    data() {
        return {
            programs: []
        }
    },
    computed: {
        ...mapGetters('auth', ['token'])
    },
    async created() {
        const { data } = await Api.get('/programs')
        this.programs = data
    },
    methods: {
        async removeProgram(programId) {
            console.log(programId)
            console.log(this.token)
            const { data } = await Api.delete(`/programs/${programId}`, {
                headers: {
                    Authorization: `Bearer: ${this.token}`
                }
            })
            this.programs = this.programs.filter(program => {
                program._id === data._id
            })
            return this.programs
        }
    }
}
</script>

<style>

</style>