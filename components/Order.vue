<template>
  <v-row>
    <v-col cols="12">
      <h2>ORDER</h2>
      <v-list>
        <v-list-item v-for="(item, index) in cartItems" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ currency(item.price) }} x
              <v-btn x-small color="primary" class="px-0" icon @click="decrement(item.id)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              {{ item.quantity }}
              <v-btn x-small color="primary" class="px-0" icon @click="increment(item.id)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn x-small color="error" class="px-0" icon @click="remove(item.id)">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
            {{ currency(itemTotal(item.price, item.quantity)) }}
          </v-list-item-action>
        </v-list-item>

        <!-- sub total -->
        <v-list-item v-if="cartItems.length" class="text-h6 text-bold primary" dark>
          <v-list-item-content>
            <v-list-item-title>Sub Total</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-title>{{ currency(subTotal) }}</v-list-item-title>
          </v-list-item-action>
        </v-list-item>

        <v-list-group v-if="cartItems.length">
          <template v-slot:activator value="false">
            <v-list-item-content class="text-h6">
              <v-list-item-title>
                Additionals
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <template>
            <v-list-item disabled v-for="(additional, index) in additionals" :key="index">
              <v-list-item-content>
                <v-list-item-title>
                  {{ additional.title }}
                </v-list-item-title>
                <v-list-item-subtitle v-if="additional.mode == 'percentage'">
                  {{ additional.value }}%
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-title v-if="additional.mode == 'fix'">
                  {{ currency(additional.value) }}
                </v-list-item-title>
                <v-list-item-title v-else-if="additional.mode == 'percentage'">
                  {{ currency(calculation(additional.value)) }}
                </v-list-item-title>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list-group>

        <!-- total -->
        <v-list-item v-if="cartItems.length" class="text-h6 text-bold primary" dark>
          <v-list-item-content>
            <v-list-item-title>Total</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-title>{{ currency(total) }}</v-list-item-title>
          </v-list-item-action>
        </v-list-item>

      </v-list>
    </v-col>
  </v-row>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  methods: {
    ...mapActions('carts', {
      increment: 'increment',
      decrement: 'decrement',
      remove: 'remove'
    }),
    currency(value) {
      return Intl.NumberFormat('en-US').format(value);
    }
  },
  computed: {
    ...mapState('carts', {
      items: 'items',
      additionals: 'additionals'
    }),
    ...mapGetters('carts', {
      cartItems: 'cartItems',
      itemTotal: 'itemTotal',
      subTotal: 'subTotal',
      calculation: 'calculation',
      total: 'total'
    })
  }
}


</script>
