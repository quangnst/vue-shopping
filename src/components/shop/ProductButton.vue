<template>
  <div>
    <button v-if="isAdding" class="button" @click="addToCart">
      <i class="fa fa-cart-plus"></i> Add to Cart
    </button>
    <button v-else class="button button-danger" @click="removeFromCart(product.id)">
      <i class="fa fa-trash"></i> Remove from Cart
    </button>
    <!-- <button class="button button-danger rounded-circle ml-2">
      <i class="fa fa-heart"></i>
    </button> -->
  </div>
</template>

<script>
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../store/mutation-types";
export default {
  props: ["product"],
  data() {
    return {
      cart: this.$store.getters.cart
    };
  },
  computed: {
    isAdding() {
      return this.cart.indexOf(this.product) < 0;
    }
  },
  methods: {
    addToCart() {
      this.$store.commit(ADD_TO_CART, this.product);
    },
    removeFromCart(id) {
      this.$store.commit(REMOVE_FROM_CART, id);
    }
  }
};
</script>