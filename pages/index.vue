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
          <v-select
            :items="status"
            label="Status"
            v-model="statusType"
          ></v-select>

          <v-select
            :items="contact_channel"
            label="Réseau"
            v-model="statusType"
          ></v-select>
        </v-card-title>

        <v-card-title>
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
          :items="filteredItems"
          :search="search"
        >

          <template slot="headerCell" slot-scope="props">
            <span>
              {{ props.header.text }}
            </span>
          </template>

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
import axios from 'axios';
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },

  computed: {
    filteredItems() {
      return this.mockData.filter((i) => {
        return !this.statusType || i.status === this.statusType || i.contact_channel === this.statusType;
      })
    }
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
      statusType: null,
      status: ['finished', 'inProgress', 'reserved', 'toTreat', 'waiting'],
      contact_channel: ['facebook', 'file', 'form', 'messenger', 'twiter'],
      headers: [
        {
          id: 0,
          text: 'Nom',
          align: 'left',
          value: 'customer.last_name'
        },
        {
          id: 1,
          text: 'Email',
          value: 'customer.email'
        },
        {
          id: 2,
          text: 'Téléphone',
          value: 'customer.phone'
        },
        {
          id: 3,
          text: 'Réseau',
          value: 'contact_channel'
        },
        {
          id: 4,
          text: 'Status',
          value: 'status'
        },
        {
          id: 5,
          text: 'Commentaire',
          value: 'last_comment',
          sortable: false
        }
      ]
    }
  }
}
</script>
