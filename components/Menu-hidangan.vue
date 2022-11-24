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

import { mapState } from 'vuex'

export default ({
  methods: {
    resetSearchByCategory() {
      this.categoryId = false;
    }
  },
  data() {
    return {
      categoryId: false,
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
    },

    // memanggil state data_menu pada store
    ...mapState('menus', {
      data_menu: 'data_menu',
      categories: 'categories'
    })
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

