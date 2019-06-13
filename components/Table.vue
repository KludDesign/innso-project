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
export default {

  props: ['search', 'statusType', 'status', 'contact_channel', 'headers', 'apiData'],

  computed: {
    filteredItems() {
      return this.apiData.filter((i) => {
        return !this.statusType || i.status === this.statusType || i.contact_channel === this.statusType;
      })
    }
  },

}
</script>
