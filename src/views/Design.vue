<template>
  <main>
    <PageHeading>
      Design
    </PageHeading>
    <section class="mt-4">
      <h2>Tokens</h2>
      <p class="leading-normal">
        Use this area to describe design tokens: colors, font weights, spacing, tone.
      </p>
    </section>
    <section class="mt-4">
      <h2>Page Headings</h2>
      <p class="leading-normal">
        The top-level heading above uses a <pre class="inline-block">PageHeading</pre> Vue component that combines
        tailwind css classes in the <pre class="inline-block">App.vue</pre> style section. This is
        used as the main heading for a view, that is, a top level route component.
      </p>
    </section>
    <section class="mt-4">
      <h2>Subheading for Sections</h2>
      <p class="leading-normal">
        The text above is wrapped in a section with no styling, as are all the following
        sections of the document.
      </p>
    </section>
    <section class="mt-4">
      <h2>Buttons</h2>
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
      <h2>Cards</h2>
      <p class="leading-normal">
        The <pre class="inline-block">CardBase</pre> component is a very unopinionated wrapper that simply gives a white 
        background, 1px border, large rounded corners, and hides overflow to keep content within.
      </p>
      <div class="flex justify-around">
        <CardBase>Primary</CardBase>
      </div>
    </section>
    <section class="mt-4">
      <h2>Loaders</h2>
      <p class="leading-normal">
        There are several loader components available.
      </p>
      <div class="flex justify-around">
        <div class="text-center">
          <p>SimpleSpinner</p>
          <SimpleSpinner></SimpleSpinner>
        </div>
      </div>
    </section>
    <section class="mt-4">
      <h2>Test Editor</h2>
      <BSEditor />
    </section>
  </main>
</template>

<script>
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
    SimpleSpinner
  },
}
</script>