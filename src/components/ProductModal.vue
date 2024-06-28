<template>
  <v-dialog v-model="show" :width="width">
    <v-card :title="title">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="8" sm="6">
            <v-text-field label="Nama" v-model="name" required></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field v-model="barcode" label="Barcode"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" sm="6">
            <v-text-field v-model="price" label="Harga"></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field label="Quantiti" v-model="qty"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="onSave">Save</v-btn>
        <v-btn @click="onCancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { integerValidation } from "../helper";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "80%",
    },
    title: {
      type: String,
      default: "Produk",
    },
    product: {
      type: Object,
      default: null,
    },
  },
  emits: ["onSave", "onCancel"],
  data: () => {
    return {
      integerValidation,
      id: 0,
      name: "",
      barcode: "",
      price: 0,
      qty: 0,
    };
  },
  methods: {
    onSave(e: Event) {
      e.stopPropagation();
      const { id, name, barcode, price, qty } = this;
      this.$emit("onSave", { id, name, barcode, price, qty });
    },
    onCancel(e: any) {
      this.$emit("onCancel", {
        reason: "Cancel click",
      });
    },
  },
  watch: {
    show(a) {
      if (!a) return;
      if (this.product === null) {
        this.name = "";
        this.barcode = "";
        this.price = 0;
        this.qty = 0;
        this.id = 0;
        return;
      }
      this.name = this.product.name;
      this.barcode = this.product.barcode;
      this.price = this.product.price;
      this.qty = this.product.qty;
      this.id = this.product.id;
    },
  },
  mounted() {
    console.log("mounted", this.product);
  },
});
</script>
