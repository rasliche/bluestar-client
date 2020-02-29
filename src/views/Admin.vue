<template>
  <main class="home">
    <h1 class="page-heading">
      Admin Dashboard
    </h1>
    <nav class="flex items-center justify-between">
      <ButtonPrimary @click="createOperatorModalOpen = true">
        New Operator
        <CreateOperatorModal @close="createOperatorModalOpen = false" :show="createOperatorModalOpen">
        </CreateOperatorModal>
      </ButtonPrimary>
      <ButtonPrimary>
        <router-link
          v-if="isAuthenticated && isAdmin"
          :to="{ name: 'create-lesson' }"
          class="no-underline text-white"
        >
          New Lesson
        </router-link>
      </ButtonPrimary>
      <ButtonPrimary @click="createProgramModalOpen = true">
        New Program
        <CreateProgramModal
          @program-created="addProgram"
          @close="createProgramModalOpen = false" 
          :show="createProgramModalOpen">
        </CreateProgramModal>
      </ButtonPrimary>
    </nav>
    <div>
      <section class="w-1/2 pt-4">
        <h3>Operators</h3>
        <div v-if="operators.length">
          <div v-for="operator in operators" :key="operator._id">
            <router-link
              :to="{
                name: 'view-operator',
                params: { operatorId: operator._id }
              }"
            >
              {{ operator.name }}
            </router-link>
          </div>
          <!-- TODO: Stats on operator (date contacted, staffers done) -->
        </div>
        <p v-else>No operators yet.</p>
      </section>

      <section class="w-1/2 pt-4">
        <h3>Users</h3>
        <div v-if="users.length">
          <div v-for="user in users" :key="user._id">
            <router-link
              :to="{
                name: 'view-user',
                params: { userId: user._id }
              }"
            >
              {{ user.name }}
            </router-link>
          </div>
          <!-- TODO: Stats on operator (date contacted, staffers done) -->
        </div>
        <p v-else>No operators yet.</p>
        <!-- <UsersList :users="users" /> -->
      </section>

      <section class="md:w-1/2 pt-4">
        <h3>Lessons</h3>
        <div v-if="lessons.length">
          <div
            v-for="lesson in lessons"
            :key="lesson._id"
            class="flex justify-between mt-1 px-2 py-1 hover:bg-blue-lighter rounded"
          >
            <router-link
              class="no-underline"
              :to="{
                name: 'view-lesson',
                params: { lessonId: lesson._id }
              }"
            >
              {{ lesson.title }}
            </router-link>
            <div class="actions flex justify-between">
              <router-link
                class="no-underline"
                :to="{
                  name: 'edit-lesson',
                  params: { lessonId: lesson._id }
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-6 mr-2 fill-current text-yellow-dark icon-edit"
                >
                  <path
                    class="primary"
                    d="M4 14a1 1 0 0 1 .3-.7l11-11a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-11 11a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-3z"
                  ></path>
                  <rect
                    width="20"
                    height="2"
                    x="2"
                    y="20"
                    class="secondary"
                    rx="1"
                  ></rect>
                </svg>
              </router-link>
              <!-- <button @click="deleteLesson">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 mr-2 fill-current text-red-dark icon-trash">
                  <path class="primary" d="M5 5h14l-.89 15.12a2 2 0 0 1-2 1.88H7.9a2 2 0 0 1-2-1.88L5 5zm5 5a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1z"></path>
                  <path class="secondary" d="M8.59 4l1.7-1.7A1 1 0 0 1 11 2h2a1 1 0 0 1 .7.3L15.42 4H19a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2h3.59z"></path>
                </svg>
              </button> -->
            </div>
          </div>
        </div>
        <p v-else>No lessons yet.</p>
      </section>

      <section class="md:w-1/2 pt-4">
        <h3>Programs</h3>
        <div v-if="programs.length">
          <div
            v-for="program in programs"
            :key="program._id"
            class="flex justify-between mt-1 px-2 py-1 hover:bg-blue-lighter rounded"
          >
            {{ program.name }}
            <div class="actions flex justify-between">
              <button @click="removeProgram(program._id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-6 mr-2 fill-current text-yellow-dark icon-edit"
                >
                  <path
                    class="primary"
                    d="M4 14a1 1 0 0 1 .3-.7l11-11a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-11 11a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-3z"
                  ></path>
                  <rect
                    width="20"
                    height="2"
                    x="2"
                    y="20"
                    class="secondary"
                    rx="1"
                  ></rect>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <p v-else>No programs yet.</p>
      </section>

      <section class="w-1/2 pt-4">
        <h3>Posts</h3>
      </section>

      <section class="w-1/2 pt-4">
        <h3>Events</h3>
      </section>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import Api from '@/services/Api'
import ButtonPrimary from '@/components/BaseUI/ButtonPrimary'
import CreateOperatorModal from '@/components/CreateOperatorModal.vue'
import CreateProgramModal from '@/components/CreateProgramModal.vue'
import ConfirmDeleteShopModal from '@/components/ConfirmDeleteShopModal.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Admin',
  components: {
    CreateOperatorModal,
    CreateProgramModal,
    ButtonPrimary
  },
  data() {
    return {
      createOperatorModalOpen: false,
      createProgramModalOpen: false,
      users: [],
      lessons: [],
      posts: [],
      operators: [],
      programs: []
    }
  },
  async created() {
    const { data: lessons } = await Api.get('/lessons')
    const { data: operators } = await Api.get('/operators')
    const { data: users } = await Api.get('/users')
    const { data: programs } = await Api.get('/programs')
      this.lessons = lessons
      this.operators = operators
      this.users = users
      this.programs = programs
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'token']),
    ...mapGetters('user', ['isAdmin'])
    // ...mapGetters('operator', ['operators'])
  },
  methods: {
    addProgram(e) {
      this.programs.push(e)
    },
    async removeProgram(programId) {
      console.log(programId)
      console.log(this.token)
      const { data } = await Api.delete(`/programs/${programId}`, {
        // headers: {
        //     Authorization: `Bearer: ${this.token}`
        // }
      })
      console.log(data)
      const newProgramsArray = this.programs.filter(program => {
        return program._id !== data._id
      })
      console.log(newProgramsArray)
      this.programs = newProgramsArray
    }
  }
}
</script>
