<template>
  <b-row class="vh-100 vw-100 row-login">
    <b-col sm="5" class="side-login d-flex justify-content-center align-items-center">
      <img src="../assets/img/img-login.svg" class="img-login" />
    </b-col>

    <b-col sm="7" class="d-flex justify-content-center align-items-center left-login">

      <div class="col-8">
       <div class="d-flex justify-content-center align-items-center">
        <img src="https://i.ibb.co/3FNbgGY/image-6483441-2.jpg" alt="logo" border="0" class="logo ext-center mb-5 title-login">
       </div>
        <h2 class="text-center mb-5 title-login">Login</h2>
      <b-form>
      <b-form-group
        label=""
        label-for="email"
      >
        <b-form-input
          id="email"
          type="email"
          placeholder="joaosilva@email.com"
          autocomplete="off"
          v-model.trim="$v.form.email.$model"
          :state="getValidation('email')"
        ></b-form-input>
      </b-form-group>

      <b-form-group label-for="password">
        <label class="d-flex justify-content-between">
      
        </label>
        <b-form-input
          id="password"
          type="password"
          placeholder="Enter your password here"
          v-model.trim="$v.form.password.$model"
          :state="getValidation('password')"
        ></b-form-input>
      </b-form-group>

      <b-button 
        type="button" 
        variant="primary"  
        block
        @click="login"
        ><i class="fas fa-sign-in-alt"></i> Sign in</b-button>

      <hr>

      <b-button 
        type="button" 
        variant="outline-secondary"  
        block
        @click="goToRegister"
        ><i class="fas fa-user-plus"></i> Not a ToDream! Member? Sing up</b-button>

        <small><a href="#">Forgot your password?</a></small>
    </b-form>
    </div>

    </b-col>
  </b-row>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import UsersModel from "@/models/UsersModel";
import ToastMixin from "@/mixins/toastMixin.js";

export default {
  mixins: [ToastMixin],

  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },

  validations: {
    form: {
      email: {
        required, 
        email
      },

      password: {
        required,
        minLength: minLength(6),
      },
    },
  },

  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$error) return;

      let user = await UsersModel.params({email: this.form.email}).get();

      if(!user || !user[0] || !user[0].email) {
        this.showToast("danger", "Error!", "Incorrect username and/or passwords");
        this.clearForm();
        return;
      }

      user = user[0];
      if(user.password !== this.form.password) {
        this.showToast("danger", "Error!", "Incorrect username and/or password");
        this.clearForm();
        return;
      }

      localStorage.setItem('authUser', JSON.stringify(user));
      this.$router.push({name: "list"});
    },

    clearForm() {
      this.form = {
        email: "",
        password: ""
      }
    },

    getValidation(field) {
      if (this.$v.form.$dirty === false) {
        return null;
      }

      return !this.$v.form[field].$error;
    },

    goToRegister() {
      this.$router.push({ name: "register" });
    }
  },
}
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

.img-login {
  width: 20rem;
  height: 20rem;
}

.left-login {
  background-color: #f2f2f2;
}

.title-login {
  font-weight: bold;
}
</style>

