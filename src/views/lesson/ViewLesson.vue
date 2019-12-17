<template>
  <article class="lesson">
    <!-- Set useVerticalOffset to "true" -->
    <ScrollProgressBar
      @halfway.once="logThatStuff"
      :useVerticalOffset="true"
      offsetElement="app-nav">
    </ScrollProgressBar>
    <h1 class="border-blue-lighter border-b-4 mb-4">
      {{ lesson.title }}
    </h1>
    <editor-content class="lesson-content" :editor="editor" />
    <Quiz v-if="lesson.questions.length" :questions="lesson.questions" />
  </article>
</template>

<script>
import Api from "@/services/Api";
import ScrollProgressBar from "@/components/ScrollProgressBar/ScrollProgressBar";
import Quiz from "@/components/quiz/Quiz.vue";
import { Editor, EditorContent } from "tiptap";
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
  Image,
} from 'tiptap-extensions';
import Iframe from "@/components/tiptap-extras/Iframe";

export default {
  components: {
    ScrollProgressBar,
    EditorContent,
    Quiz,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      lesson: { },
      // title: '',
      editor: null,
      // quiz: null,
    };
  },
  methods: {
    logThatStuff() {
      console.log('halfway')
    }
  },
  async created() {
    const { data: { content, ...lesson } } = await Api.get(`/lessons/${this.id}`);
    
    this.lesson = { ...lesson };
    this.editor = new Editor({
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
          new Iframe(),
        ],
      editable: false,
      content: content
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="postcss">
.lesson-content > div {
    @apply text-lg text-grey-darkest w-full leading-normal outline-none;
    > * + *, li + li, li > p + p {
        @apply mt-4;
    }

    iframe {
      @apply mx-auto;
    }
}
</style>
