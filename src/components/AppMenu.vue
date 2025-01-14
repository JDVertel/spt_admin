<template>
  <div :class="['offcanvas', { show: isMenuOpen }]" @click="closeMenu">
    <div class="offcanvas-content" @click.stop>
      <!-- Logo Container -->
      <div class="logo-container">
        <i class="fa-solid fa-hospital-user icon"></i>
        <span class="logo-text">ADMINISTRADOR</span>
      </div>

      <!-- Menu Items Container -->
      <div class="menu-scroll-container">
        <ul class="menu-items">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            :style="{ '--item-index': index }"
          >
            <!-- Items con submenús -->
            <div v-if="item.subitems" class="menu-item-with-submenu">
              <button
                @click="toggleSubmenu(index)"
                class="menu-item-btn"
                :class="{
                  selected: isSelected(index),
                  'current-selected': isCurrentSelected(index),
                }"
              >
                <i :class="item.icon"></i>
                <span class="full-text">{{ item.text }}</span>
                <span class="abbr">{{ item.abbr }}</span>
                <i
                  class="submenu-arrow"
                  :class="[
                    expandedSubmenus.includes(index) ? 'expanded' : '',
                    'fas fa-chevron-down',
                  ]"
                ></i>
              </button>

              <!-- Submenú -->
              <ul
                class="submenu-items"
                :class="{ expanded: expandedSubmenus.includes(index) }"
              >
                <li
                  v-for="(subitem, subindex) in item.subitems"
                  :key="subindex"
                >
                  <router-link :to="subitem.route" custom v-slot="{ navigate }">
                    <button
                      @click="
                        selectComponent(
                          subitem.component,
                          navigate,
                          index,
                          subindex
                        )
                      "
                      class="menu-item-btn submenu-item-btn"
                      :class="{
                        selected: isSelected(index, subindex),
                        'current-selected': isCurrentSelected(index, subindex),
                      }"
                    >
                      <span class="full-text">{{ subitem.text }}</span>
                      <span class="abbr">{{ subitem.abbr }}</span>
                    </button>
                  </router-link>
                </li>
              </ul>
            </div>

            <!-- Items sin submenús -->
            <router-link
              v-else-if="!item.action"
              :to="item.route"
              custom
              v-slot="{ navigate }"
            >
              <button
                @click="selectComponent(item.component, navigate, index)"
                class="menu-item-btn"
                :class="{
                  selected: isSelected(index),
                  'current-selected': isCurrentSelected(index),
                }"
              >
                <i :class="item.icon"></i>
                <span class="full-text">{{ item.text }}</span>
                <span class="abbr">{{ item.abbr }}</span>
              </button>
            </router-link>

            <!-- Items con acción -->
            <button
              v-else
              @click="handleItemClick(item, index)"
              class="menu-item-btn"
              :class="{
                selected: isSelected(index),
                'current-selected': isCurrentSelected(index),
              }"
            >
              <i :class="item.icon"></i>
              <span class="full-text">{{ item.text }}</span>
              <span class="abbr">{{ item.abbr }}</span>
            </button>
          </li>
        </ul>
      </div>

      <!-- Footer -->
      <div class="sidebar-footer">
        <button class="footer-icon-btn">
          <i class="bi bi-gear"></i>
        </button>
        <button class="footer-icon-btn">
          <i class="bi bi-bell"></i>
        </button>
        <button class="footer-icon-btn">
          <i class="bi bi-question-circle"></i>
        </button>
        <button class="footer-icon-btn">
          <i class="bi bi-person"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { menuItems } from "../bd/bd.js";

export default {
  components: {},
  name: "AppMenu",
  props: {
    isMenuOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuItems: menuItems,
      selectedItems: [],
      currentSelectedIndex: null,
      currentSelectedSubIndex: null,
      expandedSubmenus: [],
    };
  },
  mounted() {
    const savedSelectedItems = localStorage.getItem("selectedMenuItems");
    if (savedSelectedItems) {
      this.selectedItems = JSON.parse(savedSelectedItems);
    }
  },
  methods: {
    closeMenu() {
      this.$emit("close-menu");
    },

    toggleSubmenu(index) {
      const position = this.expandedSubmenus.indexOf(index);
      if (position === -1) {
        // Cerrar otros submenús al abrir uno nuevo
        this.expandedSubmenus = [index];
      } else {
        this.expandedSubmenus = [];
      }
    },

    selectComponent(componentName, navigate, index, subindex = null) {
      this.$emit("select-component", componentName);
      navigate();

      // Si es un subítem, asegurarse de que el menú padre esté expandido
      if (subindex !== null && !this.expandedSubmenus.includes(index)) {
        this.expandedSubmenus.push(index);
      }

      this.addSelectedItem(index, subindex);
      this.currentSelectedIndex = index;
      this.currentSelectedSubIndex = subindex;

      // Remover la condición de ancho y cerrar siempre el menú
      this.closeMenu();
    },

    handleItemClick(item, index) {
      if (item.action === "openLoginModal") {
        const loginModal = new bootstrap.Modal(
          document.getElementById("login")
        );
        loginModal.show();
      }
      this.addSelectedItem(index);
      this.currentSelectedIndex = index;
      this.closeMenu();
    },

    addSelectedItem(index, subindex = null) {
      const selectedItem = { index, subindex };
      if (
        !this.selectedItems.some(
          (item) => item.index === index && item.subindex === subindex
        )
      ) {
        this.selectedItems.push(selectedItem);
        localStorage.setItem(
          "selectedMenuItems",
          JSON.stringify(this.selectedItems)
        );
      }
    },

    isSelected(index, subindex = null) {
      return this.selectedItems.some(
        (item) => item.index === index && item.subindex === subindex
      );
    },

    isCurrentSelected(index, subindex = null) {
      return (
        this.currentSelectedIndex === index &&
        this.currentSelectedSubIndex === subindex
      );
    },
  },
};
</script>

<style scoped>
.menu-item-btn.selected {
  color: #1ab89d;
  font-weight: bold;
}

.menu-item-btn.current-selected {
  color: #f0ad4e;
}

.menu-item-btn {
  display: flex;
  transition: all 0.2s ease;
  position: relative;
}

.submenu-item-btn {
  font-size: 14px;
  padding-left: 0px !important;
}

.submenu-arrow {
  position: absolute;
  right: 10px;
  font-size: 15px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
}

.submenu-arrow.expanded {
  transform: translateY(-50%) rotate(180deg);
}

/* Pantallas móviles */
@media screen and (max-width: 576px) {
  .submenu-arrow {
    right: 10px;
    font-size: 10px;
    top: 92%;
    transform: translateY(-50%);
  }
}

.submenu-items {
  list-style-type: none;
  padding-left: 15px;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: all 0.3s ease-out;
}

.submenu-items.expanded {
  max-height: 500px;
  opacity: 1;
}

.submenu-item-btn:hover::before {
  opacity: 1;
}
</style>
