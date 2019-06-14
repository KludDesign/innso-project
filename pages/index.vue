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
      :statusType="statusType"
      :headers="headers"
      :apiData="mockData"
      :filter1="status"
      :filter2="contact_channel"
    />

    </v-flex>
  </v-layout>
</template>

<script>
import Table from '~/components/Table.vue';
import axios from 'axios';
import draggable from 'vuedraggable';

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
      statusType: null,
      status: ['finished', 'inProgress', 'reserved', 'toTreat', 'waiting'],
      contact_channel: ['facebook', 'file', 'form', 'messenger', 'twiter'],
      headers: [
        {
          text: 'Nom',
          align: 'left',
          value: 'customer.last_name'
        },
        {
          text: 'Email',
          value: 'customer.email'
        },
        {
          text: 'Téléphone',
          value: 'customer.phone'
        },
        {
          text: 'Réseau',
          value: 'contact_channel'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Date de création',
          value: 'interaction_creation_date'
        },
        {
          text: 'Commentaire',
          value: 'last_comment',
          sortable: false
        }
      ]
    }
  }
}
</script>
