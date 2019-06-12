<template>
  <v-layout
    column
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <Table />
    </v-flex>
  </v-layout>
</template>

<script>
import Table from '~/components/Table.vue';
import axios from 'axios';

export default {
  components: {
    Table
  },

  asyncData ({ params, error }) {
    return axios.get('https://api.myjson.com/bins/6muxh')
      .then ((res) => {
        return {
          mocks: res.data.slice(0, 10)
        }
      })
      .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
  }
}
</script>
