<template>
  <article class="lesson">
    <h1 class="border-blue-lighter border-b-4 mb-4">{{ title }}</h1>
    <editor-content class="lesson-content" :editor="editor" />
  </article>
</template>

<script>
import Api from "@/services/Api";
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
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      title: "",
      editor: null
    };
  },
  async created() {
    const { data } = await Api.get(`/lessons/${this.slug}`);
    this.title = data.title;
    this.editor = new Editor({
      extensions: [
          new Bold(),
          new Italic(),
          new Underline(),
          new Blockquote(),
          new BulletList(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Strike(),
          new History(),
        ],
      editable: false,
      content: data.content
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style>
</style>