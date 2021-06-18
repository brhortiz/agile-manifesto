<template>
  <v-card
    class="pa-1 mb-2"
    outlined
  >
    <v-form
      ref="form"
      v-model="valid"
      class="d-flex"
      lazy-validation
    >
      <v-text-field
        class="ma-1"
        placeholder="Write something..."
        dense
        hide-details
        :value="this.fieldObj.field_value"
        :outlined="showOutline"
        :readonly="readonly"
        :rules="[rules.required]"
        @input="updateValue('field_value', $event)"
      >
      </v-text-field>
      <v-btn
        v-if="showEditBtn"
        class="mx-1 align-self-center"
        text
        icon
        color="blue darken-3"
        @click="this.edit"
      >
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <v-btn
        v-if="showSaveBtn"
        class="mx-1 align-self-center"
        text
        icon
        color="green accent-4"
        @click="this.save"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn
        v-if="showSaveEditBtn"
        class="mx-1 align-self-center"
        text
        icon
        color="green accent-4"
        @click="this.saveEdit"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn
        v-if="showDeleteBtn"
        class="mx-1 align-self-center"
        text
        icon
        color="red darken-4"
        @click="this.delete"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PrinciplesTextFields',
  props: {
    fieldObj: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    readonly: true,
    showOutline: false,
    showEditBtn: true,
    showDeleteBtn: true,
    showSaveBtn: false,
    showSaveEditBtn: false,
    valid: true,
    rules: {
      required: value => !!value || 'Required.',
    }
  }),
  mounted: function() {
    this.isNewField()
  },
  methods: {
    save: function() {
      const apiUrl = process.env.API_URL
      this.$refs.form.validate()
      if (this.$refs.form.value) {
        axios({
          method: 'post',
          url: `${apiUrl}principle/create/`,
          data: {
            field_value: this.fieldObj.field_value,
          }
        })
          .then((response) => {
            this.readonly = true
            this.showOutline = false
            this.showEditBtn = true
            this.showDeleteBtn = true
            this.showSaveBtn = false

            this.$emit('add-principle', response.data)
          });
      }
    },
    edit: function() {
      this.readonly = false
      this.showOutline = true
      this.showEditBtn = false
      this.showDeleteBtn = false
      this.showSaveBtn = false
      this.showSaveEditBtn = true
    },
    saveEdit: function() {
      const apiUrl = process.env.API_URL
      this.$refs.form.validate()
      if (this.$refs.form.value) {
        axios({
          method: 'put',
          url: `${apiUrl}principle/${this.fieldObj.id}/edit`,
          data: {
            field_value: this.fieldObj.field_value,
          }
        })
          .then(() => {
            this.readonly = true
            this.showOutline = false
            this.showEditBtn = true
            this.showDeleteBtn = true
            this.showSaveBtn = false
            this.showSaveEditBtn = false
          });
      }
    },
    delete: function() {
      const apiUrl = process.env.API_URL
      axios({
        method: 'delete',
        url: `${apiUrl}principle/${this.fieldObj.id}/delete`,
      })
        .then(() => {
          this.$emit('delete-principle', this.fieldObj.id)
        });
    },
    updateValue: function(key, value) {
      this.$emit('input', { ...this.fieldObj, [key]: value });
    },
    isNewField: function() {
      if (this.fieldObj.field_value === '') {
        this.readonly = false
        this.showOutline = true
        this.showEditBtn = false
        this.showDeleteBtn = false
        this.showSaveBtn = true
      }
    },
  }
}
</script>