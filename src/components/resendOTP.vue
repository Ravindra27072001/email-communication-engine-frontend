<template>
    <section class="mt-5 body">
        <div class="container">
            <div class="row d-flex justify-content-center align-items-center">

                <h1 class="mb-3 pb-3 text-center text-danger fst-italic fw-bolder ">
                    Email Communication Engine
                </h1>
                <div class="col col-xl-10">
                    <div class="card rounded m-auto" id="newClass">
                        <div class="row g-0">

                            <div class="col-md-6 col-lg-5 d-none d-md-block rounded">
                                <img src="../images/verifyEmail.png" alt="login form" class="img-fluid"
                                    style="border-radius: 1rem 0 0 1rem; margin-top: 50px; margin-bottom: 40px; margin-left: 30px;" />
                            </div>

                            <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                <div class="card-body rounded">

                                    <form @submit.prevent="sendOTP">
                                        <h1 class="mb-3 pb-3">
                                            Verify your account
                                        </h1>

                                        <div class="form-outline">
                                            <label class="form-label" for="form-control">Email address</label>
                                            <input type="email" class="form-control" v-model.trim="$v.email.$model"
                                                name="email">
                                            <div class="invalid-feedback">
                                                <span v-if="!$v.email.required">email is required</span>
                                            </div>
                                        </div>

                                        <div v-show="showOTP" class="form-outline">
                                            <label class="form-label" for="form-control">Enter the OTP</label>
                                            <input v-model="otp" type="text" class="form-control" name="otp" />
                                        </div>

                                        <div class="mt-3">
                                            <button v-show="showSendButton" class="btn btn-danger">
                                                Send OTP
                                            </button>
                                        </div>

                                        <div v-show="showSpinner" class="spinner-border" role="status">
                                            <span class="sr-only"></span>
                                        </div>
                                    </form>

                                    <div class="mt-3">
                                        <button @click="verifyOTP()" v-show="showOTPButton" class="btn btn-info"
                                            :disabled="$v.$invalid">
                                            Verify OTP
                                        </button>
                                    </div>
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
import { ResendOTPVerification } from "@/services/resendOTPVerification"
import { VerifyOTP } from "@/services/verifyOTP"

export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            otp: '',
            userId: '',
            showSpinner: false,
            showOTP: false,
            showOTPButton: false,
            showSendButton: true,
        }
    },
    validations: {
        email: {
            required,
            email,
        },
    },
    methods: {
        async sendOTP() {
            this.$v.$touch()
            this.showSpinner = true;
            this.showSendButton = false;
            const credentials = {
                email: this.email,
            }

            ResendOTPVerification(credentials)
                .then((result) => {

                    if (result.data.status === "PENDING") {
                        this.$toasted.show(result.data.message, {
                            type: 'success'
                        });
                        this.showSpinner = false;
                        this.showOTPButton = true;
                        this.showOTP = true;
                        this.showSendButton = false;
                    }
                    else {
                        this.showSpinner = false;
                        this.showSendButton = true;
                        this.$toasted.show(result.data.message, {
                            type: 'error'
                        });
                    }
                    this.userId = result.data.data.userId
                })
        },
        verifyOTP() {

            const credentials = {
                userId: this.userId,
                otp: this.otp,
            }

            VerifyOTP(credentials)
                .then((response) => {
                    if (response.data.status == "VERIFIED") {
                        this.$toasted.show(response.data.message, {
                            type: 'success'
                        });
                        this.$router.push({ name: 'login' })
                    }
                    else {
                        this.$toasted.show(response.data.message, {
                            type: 'error'
                        });
                    }
                })
                .catch(() => {
                    this.$toasted.show('Something went wrong', {
                        type: 'error'
                    });
                });
        }
    }
}
</script>

<style>
</style>