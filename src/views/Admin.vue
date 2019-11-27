<template>
  <main class="home">
    <h1>Admin Dashboard</h1>
    <nav>
      Do we need a nav here?
      <!-- <router-link :to="{ name: 'operatorcreate' }">Create Operator</router-link>
      <router-link :to="{ name: 'lessoncreate' }">Create Lesson</router-link>
      <router-link :to="{ name: 'quizcreate' }">Create Quiz</router-link> -->
    </nav>
    <div>
      <section >
        <h3>Operators</h3>
        <button 
          @click="createOperatorModalOpen = true"
          >
          Add a new operator
          <CreateOperatorModal 
            :show="createOperatorModalOpen" 
            @close="createOperatorModalOpen = false"
          >
          </CreateOperatorModal>
        </button>
        <div v-if="operators.length">
          <div v-for="operator in operators" :key="operator._id">
            <router-link
              :to="{ 
                name: 'operator', 
                params: { slug: operator.slug } 
                }">
                {{ operator.name }}
            </router-link>
          </div>
          <!-- TODO: Stats on operator (date contacted, staffers done) -->
        </div>
        <p v-else>No operators yet.</p>
      </section>

      <section>
        <h3>Users</h3>
        <!-- <UsersList :users="users" /> -->
      </section>

      <section>
        <h3>Lessons</h3>
        <router-link v-if="isAuthenticated && isAdmin" :to="{ name: 'create-lesson' }">Create a Lesson</router-link>
        <div v-if="lessons.length">
          <div 
            v-for="lesson in lessons" 
            :key="lesson._id"
            class="flex">
            <router-link
              :to="{
                name: 'view-lesson',
                params: { slug: lesson.slug }
              }">
              {{ lesson.title }}
            </router-link>
            <router-link :to="{ name: 'edit-lesson', params: { slug: lesson.slug } }">Edit</router-link>
          </div>
        </div>
        <p v-else>No lessons yet.</p>
      </section>

      <section>
        <h3>Quizzes</h3>
        <!-- <ul v-if="quizzes.length">
          <li v-for="quiz in quizzes" :key="quiz._id">{{ quiz.title }}</li>
        </ul>
        <p v-else>No quizzes yet.</p> -->
      </section>

      <section>
        <h3>Posts</h3>
      </section>

      <section>
        <h3>Events</h3>
      </section>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import Api from "@/services/Api";
// import UsersList from "@/components/UsersList.vue";
import CreateOperatorModal from "@/components/CreateOperatorModal.vue";
import ConfirmDeleteShopModal from "@/components/ConfirmDeleteShopModal.vue";
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "admin",
  components: {
    CreateOperatorModal,
    // UsersList,
  },
  data() {
    return {
      createOperatorModalOpen: false,
      users: [],
      lessons: [],
      posts: [],
      quizzes: [],
      operators: [],
    };
  },
  async beforeRouteEnter (to, from, next) {
    const { data: lessons } = await Api.get('/lessons');
    const { data: operators } = await Api.get('/operators');
    next(vm => {
      // access to component instance via `vm`
      vm.$data.lessons = lessons
      vm.$data.operators = operators
    })
  },
  computed: {
    ...mapGetters('auth', {
      isAuthenticated: "isAuthenticated",
    }),
    ...mapGetters('user', { 
      isAdmin: "isAdmin",
    }),
    // ...mapGetters('operator', ['operators'])
  },
  // methods: {
  //   ...mapActions('operator', ['getOperators'])
  // },
};
</script>
