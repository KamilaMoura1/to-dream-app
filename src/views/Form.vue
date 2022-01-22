<template>
  <div class="container mt-2">
    <b-form>
      <b-form-group label="Objective" label-for="subject">
        <b-form-input
          id="subject"
          v-model.trim="$v.form.subject.$model"
          type="text"
          placeholder="Ex: Big travel"
          required
          autocomplete="off"
          :state="getValidation"
          aria-describedby="subject-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="subject-feedback"
          >Required field.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group label="Description" label-for="description">
        <b-form-textarea 
          id="description"
          v-model="form.description"
          type="text"
          placeholder="This year I want to travel to Australia"
          required
          autocomplete="off"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label="Status" label-for="status">
        <b-form-select
          id="status"
          v-model="form.status"
          :options="optionsStatus"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Due date" label-for="dateOverdue">
        <b-form-datepicker
          id="dateOverdue"
          v-model="form.dateOverdue"
          label-no-date-selected="Select a date"
          :min="getToday()"
        ></b-form-datepicker>
      </b-form-group>

      <label for="tagSave">Put TAGS on your goal</label>
        <b-form-tags
          input-id="tagSave"
          v-model="form.tagSave"
          tag-variant="primary"
          tag-pills
          size="lg"
          separator=" "
          placeholder="Enter new tags separated by space"
        ></b-form-tags>

      <b-button type="submit" variant="outline-primary" @click="saveTask">
        <i class="fas fa-save"></i> Save
      </b-button>
    </b-form>
  </div>
</template>

<script>
import ToastMixin from "@/mixins/toastMixin.js";
import { required, minLength } from "vuelidate/lib/validators";
import TasksModel from "@/models/TasksModel";
import Status from "@/valueObjects/status";

export default {
  name: "Form",

  mixins: [ToastMixin],

  data() {
    return {
      form: {
        subject: "",
        description: "",
        status: Status.OPEN,
        dateOverdue: "",
        tagSave: ["Organization", "Place", "Person", "Event"], 
        userId: JSON.parse(localStorage.getItem("authUser")).id,
      },
      methodSave: "new",
      optionsStatus: [
        { value: Status.OPEN, text: "Open" },
        { value: Status.FINISHED, text: "Done" },
        { value: Status.ARCHIVED, text: "Filed" },
      ],
    };
  },

  validations: {
    form: {
      subject: {
        required,
        minLength: minLength(3),
      },
    },
  },

  async created() {
    if (this.$route.params.taskId) {
      this.methodSave = "update";
      this.form = await TasksModel.find(this.$route.params.taskId);
    }
  },

  methods: {
    saveTask() {
      this.$v.$touch();
      if (this.$v.$error) return;

      if (this.methodSave === "update") {
        this.form.save();

        this.showToast("success", "Success!", "Objective successfully updated");
        this.$router.push({ name: "list" });
        return;
      }

      const task = new TasksModel(this.form);
      task.save();

      this.showToast("success", "Success!", "Goal created successfully");
      this.$router.push({ name: "list" });
    },

    getToday() {
      return new Date().toISOString().split("T")[0];
    },
  },

  computed: {
    getValidation() {
      if (this.$v.form.subject.$dirty === false) {
        return null;
      }

      return !this.$v.form.subject.$error;
    },
  },
};
</script>

