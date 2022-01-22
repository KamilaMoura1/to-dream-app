<template>
  <b-row class="vh-100 vw-100 row-login">
    <b-col
      sm="7"
      class="side-login d-flex justify-content-center align-items-center"
    >
      <div class="justify-content-center"><img src="../assets/img/img-register.svg" class="img-register" /></div>
    </b-col>
    <b-col
      sm="5"
      class="d-flex justify-content-center align-items-center right-register"
    >
      <div class="col-8">
      <div class="d-flex justify-content-center align-items-center">  
        <img src="https://i.ibb.co/3FNbgGY/image-6483441-2.jpg" alt="logo" border="0" class="logo">
      </div> 
        <h2 class="text-center mb-5 title-login">Register</h2>
        <b-form>
          <b-form-group label="" label-for="name">
            <b-form-input
              id="name"
              type="text"
              placeholder="Steve Jobs"
              autocomplete="off"
              v-model.trim="$v.form.name.$model"
              :state="getValidation('name')"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="" label-for="email">
            <b-form-input
              id="email"
              type="email"
              placeholder="steve@email.com"
              autocomplete="off"
              v-model.trim="$v.form.email.$model"
              :state="getValidation('email')"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="" label-for="password">
            <b-form-input
              id="password"
              type="password"
              placeholder="Enter your password here"
              v-model.trim="$v.form.password.$model"
              :state="getValidation('password')"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="" label-for="confirmPassword">
            <b-form-input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              v-model.trim="$v.form.confirmPassword.$model"
              :state="getValidation('confirmPassword')"
            ></b-form-input>
          </b-form-group>

          <b-button type="button" variant="primary" block @click="register"
            ><i class="fas fa-sign-in-alt"></i> Register</b-button
          >

          <hr />

          <b-button
            type="button"
            variant="outline-secondary"
            block
            @click="goToLogin"
            ><i class="fas fa-arrow-left"></i> Back</b-button
          >
        </b-form>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import UsersModel from "@/models/UsersModel";
import ToastMixin from "@/mixins/toastMixin.js";

export default {
  mixins: [ToastMixin],

  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },

  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },

      email: {
        required,
        email,
      },

      password: {
        required,
        minLength: minLength(6),
      },

      confirmPassword: { 
        required, 
        sameAsPassword: sameAs('password') 
      }
    },
  },

  methods: {
    register() {
      this.$v.$touch();
      if (this.$v.$error) return;

      const user = new UsersModel(this.form);
      user.save();

      this.showToast("success", "Success!", "User created successfully");
      this.goToLogin();
    },

    getValidation(field) {
      if (this.$v.form.$dirty === false) {
        return null;
      }

      return !this.$v.form[field].$error;
    },

    goToLogin() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
*,
*:after,
*:before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

.logo{
  width: 150px;
  height: 150px;
  text-align: center;
  align-items: center;
}

.row-login {
  margin-left: 0 !important;
}

.img-register {
  width: 20rem;
  height: 20rem;
}

.right-register {
  background-color: #f2f2f2;
}

.title-login {
  font-weight: bold;
}
</style>
