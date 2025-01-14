<template>
  <nav class="navbar">
    <div class="container-nav">
      <button class="toggle-btn" aria-label="Toggle menu" @click="toggleMenu">
        <i class="fa-solid fa-bars"></i>
      </button>
      <button class="toggle-btn" @click="toggleCards">
        <i class="fa-solid fa-id-card"></i>
      </button>
    </div>
    <transition name="slide-fade">
      <div v-if="showCards" class="cards-container">
        <div v-for="(card, index) in cardsData" :key="index" class="card">
          <div class="card-header" :class="card.headerClass">
            {{ card.title }}
          </div>
          <div class="card-body">
            <div class="card-content">
              <img
                v-if="card.image"
                :src="card.image"
                alt="Card Image"
                class="card-image"
              />
              <p
                v-for="(item, itemIndex) in card.items"
                :key="itemIndex"
                class="card-item"
              >
                <span class="item-label">{{ item.label }}:</span>
                {{ item.value }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
import { cardsData } from "../bd/bd.js";

export default {
  name: "AppNavBar",
  data() {
    return {
      showCards: false,
      cardsData: cardsData,
    };
  },
  methods: {
    toggleMenu() {
      this.$emit("toggle-menu");
    },
    toggleCards() {
      this.showCards = !this.showCards;
    },
  },
};
</script>

<style scoped>
.cards-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #ededed;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  z-index: 1000;
  box-sizing: border-box;
}

.card {
  background-color: white;
  border-radius: 5px;
  width: 32%;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 0px 5px 0px 5px;
  font-weight: bold;
  font-size: 1em;
  border-bottom: 1px solid #e0e0e0;
  color: #333;
}

.card-body {
  padding: 0px 5px 0px 5px;
}

.card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 5px 0px 5px;
  margin: 5px 0;
  background-color: #f5f5f5;
  border-radius: 0px;
}

.card-image {
  width: 100%;
  height: auto;
  margin-top: 5px;
}

.item-label {
  font-weight: bold;
  color: #555;
}

.item-value {
  color: #777;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .cards-container {
    flex-direction: column;
  }

  .card {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
