<template>
    <div class="container">
      <App-form></App-form>
  
      <br />
  
      <AppAccordion></AppAccordion>
      <App-modal></App-modal>
    </div>
  </template>
  
  <script>
  import AppAccordion from "../Sections/AppAccordion.vue";
  import AppForm from "../Sections/AppForm.vue";
  import AppModal from "../Sections/AppModal.vue";
  
  export default {
    components: {
      AppForm,
      AppAccordion,
      AppModal,
    },
  };
  </script>