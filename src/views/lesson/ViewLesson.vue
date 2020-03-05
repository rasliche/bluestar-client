<template>
  <article class="lesson">
    <!-- Set useVerticalOffset to "true" -->
    <ScrollProgressBar
      :use-vertical-offset="true"
      offset-element="app-nav"
      @halfway.once="logThatStuff"
    >
    </ScrollProgressBar>
    <header>
      <!-- Add Parallax here eventually -->
      <img
        class="h-48 w-full rounded overflow-hidden object-cover object-center opacity-75"
        :src="lesson.coverPhoto.location"
        :alt="lesson.coverPhoto.altDescription"
      />
      <div>
        <PageHeading>
          {{ lesson.title }}
        </PageHeading>
        <p v-if="wordCount" class="w-full text-center text-gray-600">Reading Time: {{ readingTimeString }}</p>
      </div>
    </header>
    <editor-content class="lesson-content" :editor="editor" />
    <Quiz
      v-if="questions.length > 0"
      :questions="questions"
      @quiz-finished="handleFinishedQuiz($event)"
      class="m-4"
    />
  </article>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Api from '@/services/Api'
import ScrollProgressBar from '@/components/ScrollProgressBar/ScrollProgressBar'
import { PageHeading } from '@/components/BaseUI'
import Quiz from '@/components/quiz/Quiz.vue'
import { Editor, EditorContent } from 'tiptap'
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
  History,
  Image
} from 'tiptap-extensions'
import Iframe from '@/tiptap-extras/Iframe'

export default {
  name: 'ViewLesson',
  components: {
    ScrollProgressBar,
    EditorContent,
    Quiz,
    PageHeading
  },
  props: {
    lessonId: {
      required: true,
      type: String,
    }
  },
  data() {
    return {
      lesson: {},
      questions: [],
      // title: '',
      editor: null
      // quiz: null,
    }
  },
  computed: {
    ...mapGetters('user', ['userId', 'lessonScores']),
    wordCount() {
      if (!this.editor) {
        return 0
      }
      return this.editor.getHTML().split(' ').length
    },
    readingTimeMinutes() {
      // 265 words per minute reading speed
      return Math.ceil(this.wordCount / 265)
    },
    readingTimeString() {
      const hours = Math.floor(this.readingTimeMinutes / 60)
      const minutes = this.readingTimeMinutes % 60
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
  },
  async created() {
    const { data: { content, ...lesson } } = await Api.get(`/lessons/${this.lessonId}`)
    const { data: questions } = await Api.get(`/lesson/${this.lessonId}/questions`)

    this.lesson = lesson
    this.questions = questions
    this.editor = new Editor({
      editable: false,
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
        new History(),
        new Image(),
        // custom extensions tests
        new Iframe()
      ],
      content: content
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    ...mapActions('user', ['setUserScoreData']),
    logThatStuff() {
      console.log('halfway')
    },
    async handleFinishedQuiz(score) {
      try {
        let response
        // check if lesson has been done
        const lessonHasBeenDone = this.lessonScores.find(r => r.lesson._id === this.lessonId)
        // Check if lesson has been doneCheck if current score is greater than finished score
        if (lessonHasBeenDone && score > lessonHasBeenDone.score) {
          console.log("In IF")
          response = await Api.put(`/user/${this.userId}/scores/${this.lessonId}`, {
            score: score
          })
        } 
        if (!lessonHasBeenDone) {
          console.log("In ELSE")
          console.log(lessonHasBeenDone)
          console.log(score)
          response = await Api.post(`/user/${this.userId}/scores`, {
            lessonId: this.lessonId,
            score: score
          })
        }
        // handle response
        if (response.status === 201 || response.status === 200) {
          console.log(response)
          this.setUserScoreData(response.data)
          // navigate away
          this.$router.push({ name: 'me' })
        }
      } catch (error) {
        // handle errors
        if (error.status === 404) {
          console.log(error)
        }
        if (error.status === 500) {
          console.log(error)
        }
        if (error.status === 400) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style lang="postcss">
/* Reference: https://github.com/tailwindcss/discuss/issues/243 */
/* .lesson-content > div { */
.ProseMirror {
  @apply px-2 text-lg leading-normal outline-none mx-auto;
  > * + *,
  li + li,
  li > p + p {
    @apply mt-4;
  }
  h2 {
    @apply text-xl font-semibold;
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
