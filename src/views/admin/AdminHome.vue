<template>
  <div class="home">
    <h1>Admin Dashboard</h1>
    <nav>
      Do we need a nav here?
      <!-- <router-link :to="{ name: 'operatorcreate' }">Create Operator</router-link>
      <router-link :to="{ name: 'lessoncreate' }">Create Lesson</router-link>
      <router-link :to="{ name: 'quizcreate' }">Create Quiz</router-link> -->
    </nav>
    <div>
      <section>
        <h3>Operators</h3>
        <CreateOperator />
        <ul v-if="operators.length">
          <li v-for="operator in operators" :key="operator._id">
            <router-link
              :to="{ name: 'operator', params: { slug: operator.slug } }">
                {{ operator.name }}
            </router-link>
            <button @click="confirmDeleteModalOpen = true">
                Delete Shop
                <ConfirmDeleteShopModal 
                :show="confirmDeleteModalOpen" 
                @close="confirmDeleteModalOpen = false"
                :operator="operator">
                </ConfirmDeleteShopModal>
            </button>

          </li>
        </ul>
        <p v-else>No operators yet.</p>
      </section>

      <section>
        <h3>Users</h3>
        <!-- <UsersList :users="users" /> -->
      </section>

      <section>
        <h3>Lessons</h3>
        <!-- <ul v-if="lessons.length">
          <router-link
            v-for="lesson in lessons"
            :key="lesson._id"
            :to="{
              name: 'lesson',
              params: { slug: lesson.slug }
            }"
          >
            {{ lesson.title }}
          </router-link>
        </ul>
        <p v-else>No lessons yet.</p> -->
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
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "../../services/Api";
import UsersList from "@/components/UsersList.vue";
import CreateOperator from "@/components/CreateOperator.vue";
import ConfirmDeleteShopModal from "@/components/ConfirmDeleteShopModal.vue";

export default {
  name: "home",
  components: {
    UsersList,
    CreateOperator,
    ConfirmDeleteShopModal
  },
  data() {
    return {
      confirmDeleteModalOpen: false,
      users: [],
      operators: [],
      lessons: [],
      posts: [],
      quizzes: []
    };
  },
  methods: {},
  async created() {
    const { data } = await Api.get("/operators");
    // const users = await Api.get("/users");
    // const lessons = await Api.get("/lessons");
    // const posts = await Api.get("/posts");
    // const quizzes = await Api.get("/quizzes");
    this.operators = data;
    // this.users = users.data;
    // this.lessons = lessons.data;
    // this.posts = posts.data;
    // this.quizzes = quizzes.data;
    console.log("Admin Home Mounted");
  }
};
</script>
