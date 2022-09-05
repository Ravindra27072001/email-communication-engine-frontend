<template>
    <section class="mt-5 body">
        <div class="container">
            <div class="row d-flex justify-content-center align-items-center">
                <h1 class="mb-3 pb-3 text-center text-danger fst-italic fw-bolder ">
                    Email Communication Engine
                </h1>
                <div class="col col-xl-10">

                    <div class="card border-0 rounded m-auto" id="newClass">
                        <div class="row g-0">

                            <div class="col-md-6 col-lg-5 d-none d-md-block rounded">
                                <img src="../images/email.png" alt="login form" class="img-fluid"
                                    style="border-radius: 1rem 0 0 1rem; margin-top: 100px; margin-bottom: 100px; padding: 10px;" />
                            </div>


                            <div class="col-md-6 col-lg-7 d-flex align-items-center">


                                <div class="card-body rounded">

                                    <h2 class="mb-3 pb-3 text-center fw-bolder">
                                        Signin to your account
                                    </h2>

                                    <form @submit.prevent="login">



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
                                            Don't have an account? <a href="/register">Register</a>
                                        </p>

                                        <p class="mt-3">
                                            Didn't verify your account? <a href="/OTPVerification">Verify</a>
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

            Signin(credentials).then((response) => {

                if (response.data.status === "FAILED") {
                    this.$toasted.show(response.data.message, {
                        type: 'error'
                    });
                } else {
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