<template>
  <section>
    <v-row align="center">
      <v-col cols="10">
        <v-autocomplete label="Menu" placeholder="Search" :search-input.sync="search" :loading="isLoading"
          :items="itemSearch" item-text="title" item-value="id" v-model="selectedSearch" return-object hide-no-data>
        </v-autocomplete>
      </v-col>
      <v-col cols="2" align="right">
        <v-menu>
          <template v-slot:activator="{ on: category }">
            <v-btn v-on="category" color="primary">
              Category
            </v-btn>
          </template>

          <v-list>
            <v-list-item-group v-model="categoryId">
              <v-list-item v-for="(category, index) in categories" :key="index" :value="category.id"
                :disabled="category.id == categoryId">
                <v-list-item-title>
                  {{ category.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>

        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-col lg="2" md="3" sm="4" xs="6" v-for="(menu, index) in filteredMenus" :key="index">
        <v-tooltip top open-delay="500">
          <template v-slot:activator="{ on, attrs }">
            <v-card :ripple="true" class="menu_card" v-bind="attrs" v-on="on">
              <v-card-actions>
                <v-img :src="require(`@/assets/images/menu/convert/${menu.thumbnail}`)"></v-img>
              </v-card-actions>
              <v-card-text align="center" class="menu_title">
                {{ menu.title }}
              </v-card-text>
            </v-card>
          </template>
          <span> {{ menu.title }} </span>
        </v-tooltip>
      </v-col>
    </v-row>
  </section>
</template>

<script>

export default ({
  methods: {
    resetSearchByCategory() {
      this.categoryId = false;
    }
  },
  data() {
    return {
      categoryId: false,
      categories: [
        { id: false, title: "All" },
        { id: 1, title: "Makanan" },
        { id: 2, title: "Minuman" }
      ],
      data_menu: [
        { id: 1, title: "Bakso", thumbnail: "bakso.jpg", price: 10000, categoryId: 1 },
        { id: 2, title: "Bakso Super", thumbnail: "bakso-super.jpg", price: 20000, categoryId: 1 },
        { id: 3, title: "Mie Bakso", thumbnail: "mie-bakso.jpg", price: 15000, categoryId: 1 },
        { id: 4, title: "Mie Ayam", thumbnail: "mie-ayam.jpg", price: 15000, categoryId: 1 },
        { id: 5, title: "Soto Ayam", thumbnail: "soto-ayam.jpg", price: 18000, categoryId: 1 },
        { id: 6, title: "Nasi Goreng", thumbnail: "nasi-goreng.jpg", price: 13000, categoryId: 1 },
        { id: 7, title: "Nasi Goreng Spesial", thumbnail: "nasi-goreng-spesial.jpg", price: 18000, categoryId: 1 },
        { id: 8, title: "Nasi Ayam", thumbnail: "nasi-ayam.jpg", price: 17000, categoryId: 1 },
        { id: 9, title: "Ayam Geprek", thumbnail: "ayam-geprek.jpg", price: 15000, categoryId: 1 },
        { id: 10, title: "Gado gado", thumbnail: "gado-gado.jpg", price: 12000, categoryId: 1 },
        { id: 11, title: "Es Teh", thumbnail: "es-teh.jpg", price: 5000, categoryId: 2 },
        { id: 12, title: "Teh Panas", thumbnail: "teh-panas.jpg", price: 5000, categoryId: 2 },
        { id: 13, title: "Nutrisari", thumbnail: "nutrisari.jpg", price: 5000, categoryId: 2 },
        { id: 14, title: "Nutrisari Susu", thumbnail: "nutrisari-susu.jpg", price: 8000, categoryId: 2 },
        { id: 15, title: "Fanta Susu", thumbnail: "fanta-susu.jpg", price: 8000, categoryId: 2 },
        { id: 16, title: "Air Mineral", thumbnail: "air-mineral.jpg", price: 3000, categoryId: 2 }
      ],
      search: null,
      isLoading: false,
      itemSearch: [],
      selectedSearch: null
    }
  },
  computed: {
    filteredMenus() {
      if (this.categoryId) {
        return this.data_menu.filter(search => search.categoryId == this.categoryId);
      } else if (this.selectedSearch) {
        return this.data_menu.filter(search => search.title == this.selectedSearch.title);
      } else {
        return this.data_menu;
      }
    }
  },
  watch: {
    search(value) {
      // console.log(value);
      this.isLoading = true;
      setTimeout(() => {
        this.itemSearch = this.data_menu.filter(item => {
          this.isLoading = false;
          this.resetSearchByCategory();
          return item.title;
        });
      }, 1000)
    }
  }
})

</script>


<!-- style disini -->
<style scoped>
.menu_title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu_card {
  cursor: pointer;
}
</style>

