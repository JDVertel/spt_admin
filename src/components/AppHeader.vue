<template>
  <AppNavBar @toggle-menu="toggleMenu"></AppNavBar>
  <AppMenu :isMenuOpen="isMenuOpen" @close-menu="closeMenu"></AppMenu>
  <router-view></router-view>
</template>

<script>
import AppNavBar from "./AppNavBar.vue";
import AppMenu from "./AppMenu.vue";

export default {
  components: {
    AppMenu,
    AppNavBar,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>
