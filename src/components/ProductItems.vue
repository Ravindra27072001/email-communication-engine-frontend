<template>
  <div>
    hiiiiiii
    <ul class="products-listing">
    <li v-for="product in allProducts" :key="product.id">
      {{ product._id }}  {{ product.companyName }}
    </li>
  </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ProductsItems",
  data() {
    return {
      id: localStorage.getItem("userId")
    }
  },
  methods: {
    ...mapActions(["getProducts"])
  },
  computed: mapGetters(["allProducts"]),
  created() {
    this.getProducts(this.id);
    console.log("object", this.id);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.products-listing li {
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.products-listing li button {
  background: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #000;
  font-size: 16px;
  cursor: pointer;
}
</style>