<template>
  <div class="container mt-5">
    <div class="row d-flex justify-content-center align-items-center">

      <h1 class="mb-3 pb-3 text-center text-danger fst-italic fw-bolder ">
        Email Communication Engine
      </h1>

      <div class="col col-xl-10 m-3">

        <div class="m-auto p-3" id="newClass">
          <div class="row d-flex justify-content-center align-items-center">

            <div class="col col-lg-5 col-md-6 d-none d-md-block">
              <img src="../images/email.png" alt="login form" class="img-fluid" />
            </div>

            <div class="col col-lg-6 col-md-6">
              <div class="card-body">

                <h2 class="mb-3 pb-3 text-white text-center fw-bolder">SignUp to your account</h2>

                <form @submit.prevent="submit">

                  <div class="form-outline">
                    <label class="form-label text-white" for="form-control">Name</label>
                    <input type="text" class="form-control" v-model.trim="$v.name.$model" :class="{
                      'is-invalid': $v.name.$error,
                      'is-valid': !$v.name.$invalid,
                    }" name="name" />
                    <div class="invalid-feedback">
                      <span v-if="!$v.name.required">Name is required</span>
                    </div>
                  </div>

                  <div class="form-outline">
                    <label class="form-label text-white" for="form-control">Email address</label>
                    <input type="email" class="form-control" v-model.trim="$v.email.$model" :class="{
                      'is-invalid': $v.email.$error,
                      'is-valid': !$v.email.$invalid,
                    }" name="email" />
                    <div class="valid-feedback">Your email is valid</div>
                    <div class="invalid-feedback">
                      <span v-if="!$v.email.required">email is required</span>
                      <span v-if="!$v.email.email">This email is not valid</span>
                    </div>
                  </div>

                  <div class="form-outline">
                    <label class="form-label text-white" for="form-control">Password</label>
                    <input type="password" class="form-control" v-model.trim="$v.password.$model" :class="{
                      'is-invalid': $v.password.$error,
                      'is-valid': !$v.password.$invalid,
                    }" name="password" />

                    <div class="valid-feedback">Your password is valid</div>
                    <div class="invalid-feedback">
                      <span v-if="!$v.password.required">Password is required</span>
                      <span v-else-if="!$v.password.lowerCase">password should contains atleast one lowerCase
                        letter</span>
                      <span v-else-if="!$v.password.upperCase">Password should contains atleast one upperCase
                        letter</span>
                      <span v-else-if="!$v.password.specialCharecter">password should contains atleast one special
                        character</span>
                      <span v-else-if="!$v.password.integer">Password should contains atleast one number</span>
                      <span v-else-if="!$v.password.minLength">Password should contains atleast 8 character</span>
                    </div>
                  </div>

                  <div class="form-outline">
                    <label class="form-label text-white" for="form2Example27">Confirm Password</label>
                    <input type="password" class="form-control" v-model.trim="$v.repeatPassword.$model" :class="{
                      'is-invalid': $v.repeatPassword.$error,
                      'is-valid': password != '' ? !$v.repeatPassword.$invalid : '',
                    }" name="confirmPassword" />
                    <div class="valid-feedback">
                      Your password is identical!
                    </div>
                    <div class="invalid-feedback">
                      <span v-if="!$v.repeatPassword.sameAsPassword">Passwod must be identical.</span>
                    </div>
                  </div>

                  <div v-show="showOTP" class="form-outline">
                    <label class="form-label text-white" for="form-control">Enter the OTP</label>
                    <input v-model="otp" type="text" class="form-control" name="otp" />
                  </div>

                  <div class="mt-3">
                    <button v-show="showSubmitButton" class="btn btn-danger btn-lg btn-block" :disabled="$v.$invalid">
                      Register
                    </button>
                  </div>
                </form>

                <div class="mt-3">
                  <button @click="verifyOTP()" v-show="showOTPButton" class="btn btn-info btn-lg btn-block"
                    :disabled="$v.$invalid">
                    Verify OTP
                  </button>
                </div>

                <div v-show="showSpinner" class="spinner-border text-light" role="status">
                  <span class="sr-only"></span>
                </div>

                <p class="mt-3 text-white">
                  Already have an account?
                  <a class="text-decoration-none text-info" href="/">Login</a>
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>

import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import { Signup } from "@/services/signup";
import { VerifyOTP } from "@/services/verifyOTP"

export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      otp: "",
      userId: "",
      response: "",
      showSpinner: false,
      showOTP: false,
      showOTPButton: false,
      showSubmitButton: true,
    };
  },
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
      integer(value) {
        return /([0-9])/.test(value)
      },
      specialCharecter(value) {
        return /([!@#$%^&*])/.test(value)
      },
      upperCase(value) {
        return (/[A-Z]/).test(value);
      },
      lowerCase(value) {
        return (/[a-z]/).test(value);
      },
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },

  methods: {
    async submit() {

      const credentials = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      this.showSpinner = true;
      this.showSubmitButton = false;

      try {
        let response = await Signup(credentials)

        this.$toasted.show(response.data.message, {
          type: 'success'
        });
        this.userId = response.data.data.userId
        this.otp = response.data.data.otp
        this.showSpinner = false;
        this.showOTPButton = true;
        this.showOTP = true

      } catch (error) {
        this.showSpinner = false;
        this.showSubmitButton = true;
        console.log(error);
        this.$toasted.show(error.response.data.message, {
          type: 'error'
        });
      }
    },

    async verifyOTP() {

      const credentials = {
        userId: this.userId,
        otp: this.otp,
        email: this.email,
      }


      try {
        const response = await VerifyOTP(credentials);

        this.$toasted.show(response.data.message, {
          type: 'success'
        });
        this.$router.push({ name: 'login' })

      } catch (error) {

        this.$toasted.show(error.response.data.message, {
          type: 'error'
        });
      }
    }
  },
};
</script>
  
<style scoped>
#newClass {
  box-shadow: 17px 10px 20px 6px black;
  background-color: #303E48;
  width: 90%;
}
</style>