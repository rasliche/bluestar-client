<template>
  <main>
    <PageHeading>
      Design
    </PageHeading>
    <section class="mt-4">
      <h2 class="text-xl font-semibold">Tokens</h2>
      <p class="leading-normal">
        Use this area to describe design tokens: colors, font weights, spacing, tone.
      </p>
    </section>
    <section class="mt-4">
      <h2 class="text-xl font-semibold">Page Headings</h2>
      <p class="leading-normal">
        The top-level heading above uses a <pre class="inline-block">PageHeading</pre> Vue component that combines
        tailwind css classes in the <pre class="inline-block">App.vue</pre> style section. This is
        used as the main heading for a view, that is, a top level route component.
      </p>
    </section>
    <section class="mt-4">
      <h2 class="text-xl font-semibold">Subheading for Sections</h2>
      <p class="leading-normal">
        The text above is wrapped in a section with no styling, as are all the following
        sections of the document.
      </p>
    </section>
    <section class="mt-4">
      <h2 class="text-xl font-semibold">Buttons</h2>
      <p class="leading-normal">
        Buttons can come in several different flavors. Primary, Secondary, Info, and Danger are the main ones.
      </p>
      <div class="flex justify-around">
        <ButtonBase>Base Button</ButtonBase>
        <ButtonPrimary>Primary</ButtonPrimary>
        <ButtonInfo>Info</ButtonInfo>
        <ButtonDanger>Danger</ButtonDanger>
        <ButtonSecondary>Secondary</ButtonSecondary>
      </div>
    </section>
    <section class="mt-4">
      <h2 class="text-xl font-semibold">Cards</h2>
      <p class="leading-normal">
        The <pre class="inline-block">CardBase</pre> component is a very unopinionated wrapper that simply gives a white 
        background, 1px border, large rounded corners, and hides overflow to keep content within.
      </p>
      <div class="flex justify-around">
        <CardBase>Primary</CardBase>
      </div>
    </section>
    <section class="mt-4">
      <h2 class="text-xl font-semibold">Loaders</h2>
      <p class="leading-normal">
        There are several loader components available.
      </p>
      <div class="flex justify-around">
        <div class="text-center">
          <h3 class="text-lg font-semibold">SimpleSpinner</h3>
          <SimpleSpinner></SimpleSpinner>
        </div>
      </div>
    </section>
    <section class="mt-4">
      <h2 class="text-xl font-semibold">Search Select</h2>
      <div class="max-w-lg border rounded-md">
        <label>Choose a Program</label>
        <SearchSelect :options="programNames"></SearchSelect>
      </div>
    </section>
    <section class="mt-4">
      <h2 class="text-xl font-semibold">Parallax</h2>
    </section>
    <section class="mt-4">
      <h2 class="text-xl font-semibold">Test Editor</h2>
      <BSEditor />
    </section>
  </main>
</template>

<script>
import Api from '@/services/Api.js'
import { 
  ButtonBase, 
  ButtonPrimary, 
  ButtonSecondary, 
  ButtonInfo, 
  ButtonDanger, 
  CardBase, 
  PageHeading,
  SimpleSpinner
  } from '@/components/BaseUI'
import { SearchSelect } from '@/components/BaseComponents'
import BSEditor from '@/components/BSEditor.vue'

export default {
  name: 'Design',
  components: {
    PageHeading,
    ButtonBase,
    ButtonPrimary,
    ButtonSecondary,
    ButtonInfo,
    ButtonDanger,
    CardBase,
    BSEditor,
    SimpleSpinner,
    SearchSelect,
  },
  data() {
    return {
      programs: []
    }
  },
  computed: {
    programNames() {
      return this.programs.map(p => p.name)
    }
  },
  async created() {
    try {
      const { data } = await Api.get('/programs')
      console.log(data)
      this.programs = data
    } catch (error) {
      console.log(error)
    }
  }
}
</script>