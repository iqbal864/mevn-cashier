<template>
  <v-app dark>
    <v-navigation-drawer v-model="sideMenuDrawer" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in sideMenu" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- navbar header -->
    <!-- <v-app-bar :clipped-left="clipped" fixed app>

      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-app-bar> -->

    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- footer -->
    <v-bottom-navigation horizontal height="10vh" fixed color="primary" app>
      <v-app-bar-nav-icon @click.stop="sideMenuDrawer = !sideMenuDrawer" v-ripple="false" plain />
      <v-btn v-for="(item, i) in bottomMenu" :key="i" :to="item.to" v-ripple="false" plain>
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn v-ripple="false" plain icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideMenuDrawer: false,
      sideMenu: [
        {
          icon: 'mdi-account',
          title: 'User',
          to: '/user'
        },
        {
          icon: 'mdi-bell-badge',
          title: 'Notification',
          to: '/notification'
        }
      ],
      bottomMenu: [
        {
          icon: 'mdi-application',
          title: 'App',
          to: '/'
        }
      ],
      // miniVariant: false,
    }
  }
}
</script>
