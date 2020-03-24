<template>
  <main class="lesson">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <section class="relative mb-6 pb-3">
        <label 
          for="title" 
          class="block text-blue-800 font-bold text-sm mb-2"
        >
          Lesson Title
        </label>
        <input
          id="title"
          v-model="lesson.title"
          type="text"
          name="title"
          class="shadow appearance-none rounded border-blue-200 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </section>
      <section class="relative mb-6 pb-3">
        <label
          for="description"
          class="block text-blue-800 font-bold text-sm mb-2"
        >
          Short Description
        </label>
        <input
          id="description"
          v-model="lesson.description"
          type="text"
          spellcheck
          name="description"
          class="shadow appearance-none rounded border-blue-200 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </section>
      <section 
        v-if="lesson._id"
        class="relative mb-6 pb-3"
      >
        <div v-for="program in programOptions" :key="program._id">
          <label
            class="block capitalize text-blue-800 font-bold text-sm mb-2"
          >
            <input
              :id="program.name"
              v-model="lesson.programs"
              type="checkbox"
              :value="program"
            />
            {{ program.name }}
          </label>
        </div>
      </section>
    </form>
    <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
      <div class="menubar flex w-full">
        <button
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          Bold
        </button>
        <button
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          Italic
        </button>
        <button
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          Underline
        </button>
        <button @click="showImagePrompt(commands.image)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-4 h-4 fill-current icon-photo"
          >
            <path
              class="primary text-white"
              d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
            ></path>
            <path
              class="secondary text-gray-700"
              d="M15.3 12.3a1 1 0 0 1 1.4 0l2 2a1 1 0 0 1 .3.7v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 .3-.7l4-4a1 1 0 0 1 1.4 0l3.3 3.29 1.3-1.3z"
            ></path>
          </svg>
        </button>
        <button @click="showIframePrompt(commands.iframe)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-4 h-4 fill-current icon-film"
          >
            <path
              class="primary text-white"
              d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm0 2v2h2V5H4zm0 4v2h2V9H4zm0 4v2h2v-2H4zm0 4v2h2v-2H4zM18 5v2h2V5h-2zm0 4v2h2V9h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z"
            ></path>
            <path
              class="secondary text-gray-700"
              d="M9 5h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 8h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"
            ></path>
          </svg>
        </button>
        <button
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>
        <button
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>
      </div>
    </editor-menu-bar>

    <PageHeading>{{ lesson.title }}</PageHeading>
    <editor-content
      class="lesson-content 
        shadow appearance-none rounded border-blue-200 border 
        w-full min-h-full mt-4 mb-2 mx-3 
        focus:outline-none focus:shadow-outline"
      :editor="editor"
    />

    <section class="w-full mx-auto mt-4 border border-red-500 flex justify-around">
      <ButtonPrimary
        :disabled="status === 'pending'"
        @click="createLesson"
      >
        Create
      </ButtonPrimary>
      <ButtonSecondary
        @click="logLesson"
      >
        Log
      </ButtonSecondary>
      <ButtonSecondary
        v-if="lesson._id && !lesson.published"
        @click="publishLesson"
      >
        Publish
      </ButtonSecondary>
      <ButtonDanger
        v-if="lesson._id && lesson.published"
        @click="unpublishLesson"
      >
        Unpublish
      </ButtonDanger>
    </section>
    <section
      v-if="status === 'readyForQuestions'"
      class="flex flex-wrap w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto mt-4"
    >
      <h2 class="w-full">Add Questions</h2>
      <CreateQuestion
        :lesson-id="lesson._id"
        class="w-full"
        @newQuestion="onNewQuestion"
      ></CreateQuestion>
      <div
        v-if="questions && questions.length"
        class="w-full mb-6 px-3 pb-3"
      >
        <!-- Accordion these questions -->
          <Question
            v-for="(question, index) in questions"
            :key="index"
            :question="question"
            :answers="question.answers"
            :review-text="question.theMoreYouKnow"
          >
            <template
              v-slot="{
                question,
                answers,
                reviewText,
              }"
            >
              <div class="question">
                <div class="flex justify-between">
                  <p class="font-bold">{{ question.text }}</p>
                  <button @click="deleteQuestion(question._id)">
                    X
                  </button>
                </div>
                  <div class="text-center text-sm h-16 p-2 m-2 rounded">
                    <p>{{ reviewText }}</p>
                  </div>
                  <div class="answer-choices flex flex-wrap justify-center">
                  <ButtonBase
                    v-for="(answer, index) in answers"
                    :key="index"
                    :class="{ 'bg-green-200': answer.isRight, 'bg-red-200': !answer.isRight }"
                    class="p-2 m-2 border rounded border-blue-800 focus:outline-none cursor-default"
                  >
                    {{ answer.text }}
                  </ButtonBase>
                </div>
              </div>
            </template>
          </Question>
        </div>
        <!-- <ol>
          <li v-for="(question, index) in questions" :key="index">
            <div class="flex">
              <p>{{ question.text }}</p>
            </div>
            <ul>
              <li
                v-for="answer in question.answers"
                :key="answer._id"
                
              >
                <svg
                  v-if="answer.isRight"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-8 mr-4 fill-current icon-check"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    class="text-green-400"
                  ></circle>
                  <path
                    class="text-green-800"
                    d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"
                  ></path>
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-8 mr-4 fill-current icon-close-circle"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    class="text-red-400"
                  ></circle>
                  <path
                    class="text-red-800"
                    d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"
                  ></path>
                </svg>
                <p class="inline">{{ answer.text }}</p>
              </li>
              <p>{{ question.theMoreYouKnow }}</p>
            </ul>
          </li>
        </ol>
      </div> -->
    </section>
    <!-- <TextOnScroll class="min-w-full"> 
        Hello from a new component that may not have a use case!
    </TextOnScroll> -->
    {{ questions }}
    <!-- <CreateQuiz></CreateQuiz> -->
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import Api from '@/services/Api'
// import Modal from '@/components/BaseUI/Modal.vue'
import { PageHeading, ButtonBase, ButtonPrimary, ButtonSecondary, ButtonDanger } from '@/components/BaseUI'
// import ToggleInput from "@/components/ToggleInput/ToggleInput.vue"
// import TextOnScroll from "@/components/TextOnScroll/TextOnScroll.vue"
import CreateQuestion from '@/components/quiz/CreateQuestion'
import Question from '@/components/quiz/Question'
import { Editor, EditorMenuBar, EditorContent } from 'tiptap'
import {
  Bold,
  Italic,
  Underline,
  Blockquote,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Link,
  Strike,
  History
} from 'tiptap-extensions'

export default {
  name: 'CreateLesson',
  components: {
    PageHeading,
    EditorContent,
    EditorMenuBar,
    // Modal,
    ButtonBase,
    ButtonPrimary,
    ButtonSecondary,
    ButtonDanger,
    // TextOnScroll,
    // ToggleInput,
    CreateQuestion,
    Question
  },
  data() {
    return {
      status: 'idle', // pending, readyForQuestions, error
      lessonDetailModalOpen: false,
      //   quizModalOpen: false,
      lesson: {
        title: 'New Lesson',
        programs: [],
      },
      questions: [],
      programOptions: [],
      editor: new Editor({
        extensions: [
          new Bold(),
          new Italic(),
          new Underline(),
          new Blockquote(),
          new BulletList(),
          new HardBreak(),
          new Heading({ levels: [2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Strike(),
          new History()
        ],
        content: `Stick some smart stuff in here`
      })
    }
  },
  async beforeRouteEnter(to, from, next) {
    const { data: programs } = await Api.get('/programs')
    next((vm) => {
      // console.log(programs)
      vm.$data.programOptions = programs
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    ...mapActions('notification', ['add']),
    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },
    showIframePrompt(command) {
      const src = prompt('Enter the url of your embed here')
      if (src !== null) {
        command({ src })
      }
    },
    async createLesson() {
      // console.log(this.editor.getJSON())
      try {
        this.status = 'pending'
        const { data: lesson } = await Api.post('/lessons', {
          title: this.lesson.title,
          description: this.lesson.description,
          programs: this.lesson.programs,
          published: this.lesson.published,
          content: this.editor.getJSON()
        })
        this.lesson._id = lesson._id
        this.status = 'readyForQuestions'
        this.add({
          type: 'success',
          text: 'Lesson Created!'
        })
        // this.$router.replace({ name: 'view-lesson', params: { slug: slug }})
      } catch (error) {
        const notification = {
          type: 'error',
          text: `Error creating lesson: ${error.message}`
        }
        this.add(notification)
        this.status = 'idle'
      }
    },
    logLesson() {
      console.log(this.editor.getJSON())
    },
    async publishLesson() {
      try {
        const { data } = await Api.post('/published-lessons', {
          lessonId: this.lesson._id
        })
        console.log(data)
        this.lesson.published = data.published
      } catch (error) {
        console.log(error)
      }
    },
    async unpublishLesson() {
      try {
        const { data } = await Api.delete(
          `/published-lessons/${this.lesson._id}`
        )
        console.log(data)
        this.lesson.published = data.published
      } catch (error) {
        console.log(error)
      }
    },
    onNewQuestion(newQuestion) {
      this.questions.push(newQuestion)
    },
    async deleteQuestion(questionId) {
      try {
        const { data: question } = await Api.delete(
          `/lesson/${this.lesson._id}/questions/${questionId}`
        )
        this.questions = this.questions.filter((q) => q._id !== question._id)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="postcss">
/* Reference: https://github.com/tailwindcss/discuss/issues/243 */
.menubar {
  button:first-child {
    @apply rounded-l;
  }
  button:last-child {
    @apply rounded-r;
  }
  button {
    @apply p-2 text-white bg-gray-700 border border-gray-800;
    &:hover {
      @apply bg-gray-800;
    }
    .is-active {
      @apply bg-gray-400 text-gray-800;
    }
  }
}

.ProseMirror {
  @apply px-2 text-lg text-gray-800 leading-normal;
  > * + *,
  li + li,
  li > p + p {
    @apply mt-4;
  }
}
/* .lesson-content {
  @apply text-lg text-gray-800 leading-normal;
    > * + *, li + li, li > p + p {
        @apply mt-6;
    }
        strong {
        @apply text-gray-900 font-bold;
    }
        a {
        @apply text-gray-900 font-semibold;
    }
        strong a {
        @apply font-bold;
    }
        h2 {
        @apply leading-tight text-xl font-bold text-gray-900 mb-2 mt-10;
    }
        h3 {
        @apply leading-tight text-lg font-bold text-gray-900 mt-8 -mb-2;
    }
        code {
        @apply font-mono text-sm inline bg-gray-200 px-1;
    }
        pre code {
        @apply block bg-gray-900 p-4 rounded;
    }
        blockquote {
        @apply border-l-4 border-gray-400 pl-4 italic;
    }
        ul, ol {
        @apply pl-5;
        @screen sm {
        @apply pl-10;
        }
    }
} */
</style>
