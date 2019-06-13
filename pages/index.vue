<template>
  <v-layout
    column
  >
    <v-flex
      xs12
      sm8
      md6
    >

    <Table
      :search="search"
      :statusType="statusType"
      :status="status"
      :contact_channel="contact_channel"
      :headers="headers"
      :apiData="mockData"
    />

    </v-flex>
  </v-layout>
</template>

<script>
import Table from '~/components/Table.vue';
import axios from 'axios';
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
    Table
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
