<template>
  <section class="mt-5">
    <div class="container p-5">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col col-xl-10">
          <div class="card rounded bg-warning">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block bg-warning rounded">
                <img src="../images/email.png" alt="login form" class="img-fluid" style="
                    border-radius: 1rem 0 0 1rem;
                    margin-top: 100px;
                    margin-bottom: 100px;
                  " />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body bg-warning rounded">
                  <form @submit.prevent="submit">

                    <h2 class="mb-3 pb-3">SignUp to your account</h2>

                    <div class="form-outline">
                      <label class="form-label" for="form-control">Name</label>
                      <input type="text" class="form-control" v-model.trim="$v.name.$model" :class="{
                        'is-invalid': $v.name.$error,
                        'is-valid': !$v.name.$invalid,
                      }" name="name" />
                      <div class="valid-feedback">Name is valid</div>
                      <div class="invalid-feedback">
                        <span v-if="!$v.name.required">Name is required</span>
                      </div>
                    </div>

                    <div class="form-outline">
                      <label class="form-label" for="form-control">Email address</label>
                      <input type="email" class="form-control" v-model.trim="$v.email.$model" :class="{
                        'is-invalid': $v.email.$error,
                        'is-valid': !$v.email.$invalid,
                      }" name="email" />
                      <div class="valid-feedback">Your email is valid</div>
                      <div class="invalid-feedback">
                        <span v-if="!$v.email.required">email is required</span>
                        <span v-if="!$v.email.isUnique">This email is wrong</span>
                      </div>
                    </div>

                    <div class="form-outline">
                      <label class="form-label" for="form-control">Password</label>
                      <input type="password" class="form-control" v-model.trim="$v.password.$model" :class="{
                        'is-invalid': $v.password.$error,
                        'is-valid': !$v.password.$invalid,
                      }" name="password" />

                      <div class="valid-feedback">Your password is valid</div>
                      <div class="invalid-feedback">
                        <span v-if="!$v.password.required">password is required</span>
                        <span v-if="!$v.email.validatePassword">Password should contains minimum 8 characters and
                          atleast 1 uppercase, lowercase, and special
                          character</span>
                      </div>
                    </div>

                    <div class="form-outline">
                      <label class="form-label" for="form2Example27">Confirm Password</label>
                      <input type="password" class="form-control" v-model.trim="$v.repeatPassword.$model" :class="{
                        'is-invalid': $v.repeatPassword.$error,
                        'is-valid':
                          password != '' ? !$v.repeatPassword.$invalid : '',
                      }" name="confirmPassword" />
                      <div class="valid-feedback">
                        Your password is identical!
                      </div>
                      <div class="invalid-feedback">
                        <span v-if="!$v.repeatPassword.sameAsPassword">Passwod must be identical.</span>
                      </div>
                    </div>

                    <div v-show="showOTP" class="form-outline">
                      <label class="form-label" for="form-control">Enter the OTP</label>
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
                  <p class="mt-3">
                    Already have an account?
                    <a href="/">Login here</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import { Signup } from "@/services/signup";
import { VerifyOTP } from "@/services/verifyOTP"
// import axios from "axios";
// import config from "@/config";

export default {
  name: "RegisterPage",
  user: "",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      otp: "",
      userId: "",
      response: "",
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
      isUnique(value) {
        if (value === "") return true;

        var email_regex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(email_regex.test(value));
          }, 350 + Math.random() * 300);
        });
      },
    },
    password: {
      required,
      minLength: minLength(8),
      validatePassword(value) {
        if (value === "") return true;

        var password_regex =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(password_regex.test(value));
          }, 350 + Math.random() * 300);
        });
      },
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },

  methods: {
    async submit() {
      this.$v.$touch();
      console.log("object", localStorage.getItem('token'));
      const credentials = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      // console.log("credentials:", credentials);

      if (!this.$v.$invalid) {

        Signup(credentials)
          .then((response) => {
            if (response.data.status == "FAILED") {
              this.$toasted.show(response.data.message);
            } else {
              this.$toasted.show(response.data.message);
            }
            console.log(response.data)
            this.userId = response.data.data.userId
            this.otp = response.data.data.otp
            this.showSubmitButton = false;
            this.showOTPButton = true;
            this.showOTP = true

          })
      }
    },


    verifyOTP() {
      // console.log("userId: ", this.userId);
      // console.log("otp: ", this.otp);
      const credentials = {
        userId: this.userId,
        otp: this.otp,
        email: this.email,
      }
      // console.log("VerifyOtp k credentials",credentials)
      VerifyOTP(credentials)
        .then((response) => {
          // console.log("Ther response is: ", response.data)
          this.$toasted.show(response.data.message);
          if (response.data.status == "VERIFIED") {
            // localStorage.setItem("userId", this.userId)
            this.$router.push({ name: 'login' })
          }
          // console.log(this.otp);
          // console.log(this.userId)
          // console.log("response is: ", response.data.message)
          // this.$toasted.show("OTP verified successfully");
        })
        .catch(() => {
          this.$toasted.show("yha pr error he");
          // console.log("response is: ", error.message)
          // console.log("registration failed");
        });
    }
  },
};
</script>

<style>
</style>