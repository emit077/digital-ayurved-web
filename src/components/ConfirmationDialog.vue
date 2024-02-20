<template>
  <div>

    <v-dialog
        v-model="flag"
        width="400px"
       >
      <v-card class="border-rounded-10">
        <v-card-text>
          <div class="text-center">
            <v-icon color="red" size="80">mdi-delete-empty</v-icon>
            <p class="text-h5 text-red my-3">Are you sure want to delete?</p>
          </div>
        </v-card-text>
        <div class="text-center my-4">
          <v-btn color="primary mr-3" @click="$emit('yes')">Continue</v-btn>
          <v-btn color="primary" variant="outlined" @click="flag=false">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<style lang="scss" scoped></style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfirmationDialog",
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data: () => ({
    flag: false,
  }),
  methods: {},
});
</script>
