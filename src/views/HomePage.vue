<template>
  <v-container>
    <v-row style="height: 100px">
      <v-col>
        <v-btn variant="outlined" @click="refreshData" class="ma-2 pa-2">
          Refresh
        </v-btn>
        <v-btn variant="outlined" class="ma-2 pa-2" @click="onAddProduct">
          Add
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters style="min-height: 80%">
      <v-col style="min-height: 80%">
        <v-data-table :headers="headers" :items="datas" class="w-100">
          <template v-slot:item.id="{ item }">
            <v-btn
              icon="mdi-pencil"
              size="small"
              variant="text"
              @click="
                () => {
                  onProductEdit(item);
                }
              "
            ></v-btn>
            <v-btn
              icon="mdi-close"
              size="small"
              variant="text"
              @click="
                () => {
                  onProductDelete(item.id);
                }
              "
            ></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <ProductModal
    :show="productModal"
    :title="dialogTittle"
    :width="'50%'"
    :product="selectedProduct"
    @onSave="onProductSave"
    @onCancel="
      (_) => {
        productModal = false;
      }
    "
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
const { DB_COMMAND, DB_MODEL, Datasource } = window.DB;
import ProductModal from "../components/ProductModal.vue";
import { IntegerDataType } from "sequelize";

export default defineComponent({
  setup() {},
  components: { ProductModal },
  data: () => {
    return {
      datas: <any>[],
      dialogTittle: "",
      productModal: false,
      selectedProduct: <any>null,
      headers: [
        { title: "Nama", align: "start", key: "name" },
        { title: "Barcode", align: "right", key: "barcode" },
        { title: "Harga", align: "end", key: "price" },
        { title: "Quantity", align: "end", key: "qty" },
        { title: "", align: "center", key: "id" },
      ],
    };
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    async refreshData() {
      let { error, result } = await Datasource(
        DB_MODEL.PRODUCT,
        DB_COMMAND.FIND,
        {}
      );
      const datas: any[] = [];
      for (let i = 0; i < result.length; i++) {
        datas[i] = result[i].dataValues;
      }
      this.datas = datas;
      console.log(datas);
    },
    async onAddProduct() {
      this.selectedProduct = null;
      this.productModal = true;
      this.dialogTittle = "New Produk";
      this.selectedProduct = null;
    },
    async onProductSave(res: any) {
      this.productModal = false;
      if (this.selectedProduct) {
        let { error, result } = await Datasource(
          DB_MODEL.PRODUCT,
          DB_COMMAND.UPDATE,
          { data: res }
        );
        if(error){
          alert('error on update product')
        }else this.refreshData()
      } else {
        let { error, result } = await Datasource(
          DB_MODEL.PRODUCT,
          DB_COMMAND.CREATE,
          { data: res }
        );
        if(error){
          alert('error on add product')
        }else this.refreshData()
      }
    },
    onProductEdit(product: any) {
      this.selectedProduct = product;
      this.productModal = true;
    },
    async onProductDelete(id:String){
      let { error, result } = await Datasource(
          DB_MODEL.PRODUCT,
          DB_COMMAND.DELETE,
          { id }
        );
        if(error){
          console.log(error)
        }else{
          this.refreshData()
        }
    }
  },
});
</script>
