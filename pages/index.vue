<template>
  <v-layout
    column
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title>
          Nutrition
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="mockData"
          :search="search"
        >
          <template v-slot:items="props">
            <td>{{ props.item.customer.last_name }} {{ props.item.customer.first_name }}</td>
            <td class="text-xs-left">{{ props.item.customer.email }}</td>
            <td class="text-xs-left">{{ props.item.customer.phone }}</td>
            <td class="text-xs-left">{{ props.item.contact_channel }}</td>
            <td class="text-xs-left">{{ props.item.status }}</td>
            <td class="text-xs-left">{{ props.item.last_comment }}</td>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Table from '~/components/Table.vue';
import axios from 'axios';

export default {
  components: {
  },

  asyncData ({ params, error }) {
    return axios.get('https://api.myjson.com/bins/6muxh')
      .then ((res) => {
        return {
          mockData: res.data
        }
      })
      .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
  },

  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Nom',
          align: 'left',
          value: 'customer.last_name'
        },
        { text: 'Email', value: 'customer.email' },
        { text: 'Téléphone', value: 'customer.phone' },
        { text: 'Réseau', value: 'contact_channel' },
        { text: 'Status', value: 'status' },
        { text: 'Commentaire', value: 'last_comment', sortable: false }
      ]
    }
  }
}
</script>
