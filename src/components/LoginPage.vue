<template>
    <section class="body mt-5">
        <div class="container p-5">
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col col-xl-10">
                    <div class="card rounded">
                        <div class="row g-0">
                            <div class="col-md-6 col-lg-5 d-none d-md-block rounded">
                                <img src="../images/email.png" alt="login form" class="img-fluid"
                                    style="border-radius: 1rem 0 0 1rem; margin-top: 100px; margin-bottom: 100px;" />
                            </div>
                            <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                <div class="card-body rounded">
                                    <form @submit.prevent="login">
                                        <div class="d-flex align-items-center mb-3 pb-1">
                                            <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219"></i>
                                        </div>

                                        <h1 class="mb-3 pb-3 text-center">
                                            Sign into your account
                                        </h1>

                                        <div class="form-outline">
                                            <label class="form-label" for="form-control">Email address</label>
                                            <input type="email" class="form-control" v-model.trim="$v.email.$model"
                                                name="email">
                                            <div class="invalid-feedback">
                                                <span v-if="!$v.email.required">email is required</span>
                                            </div>
                                        </div>

                                        <div class="form-outline ">
                                            <label class="form-label" for="form-control">Password</label>
                                            <input type="password" v-model="password" class="form-control"
                                                name="password">
                                        </div>

                                        <div class="mt-3">
                                            <button class="btn btn-danger btn-lg btn-block" :disabled="$v.$invalid">
                                                Login
                                            </button>
                                        </div>

                                        <p class="mt-5">
                                            Don't have an account? <a href="/register">Register here</a>
                                        </p>

                                        <p class="mt-3">
                                            Didn't verify your account? <a href="/OTPVerification">Verify here</a>
                                        </p>

                                    </form>
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
import { required, email } from 'vuelidate/lib/validators'
import { Signin } from '@/services/signin'
// import store from '../store/modules/auth'
// import Vue from 'vue'
// import axios from 'axios'
// import { response } from 'express'
export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    validations: {
        email: {
            required,
            email,
        },
    },
    methods: {
        async login() {
            this.$v.$touch()
            const credentials = {
                email: this.email,
                password: this.password
            }
            // console.log("credentials:", credentials);
            Signin(credentials).then((response) => {
                if (response.data.status === "FAILED") {
                    this.$toasted.show(response.data.message, {
                        type: 'error'
                    });
                } else {
                    console.log("object", response);
                    const { authToken, email, userId } = response.data;
                    localStorage.setItem('token', authToken);
                    localStorage.setItem('email', email);
                    localStorage.setItem('userId', userId);
                    this.$toasted.show(response.data.message, {
                        type: 'success'
                    });
                    this.$router.push({ name: 'home' })
                }
            })
        }
    }
}
</script>

<style>
</style>