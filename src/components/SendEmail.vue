<template>
    <section>
        <NavBar />

        <div class="container p-5">
            <h1 class="mb-3 pb-3 text-center">Write an Email</h1>
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col col-xl-8">
                    <div class="card rounded bg-warning">
                        <!-- <div class="col-md-6 col-lg-5 d-none d-md-block bg-warning rounded">
                                <img src="../images/sendEmail.png" alt="login form" class="img-fluid"
                                    style="border-radius: 1rem 0 0 1rem;margin-left: 10px; margin-top: 150px; padding: 20px;" />
                            </div> -->
                            <form class="p-3" @submit.prevent="submit">

                                <div class="form-outline mt-2">
                                    <label class="form-label" for="form-control">Subject</label>
                                    <input type="text" class="form-control" v-model.trim="$v.subject.$model"
                                        name="name" />
                                </div>



                                <div class="form-outline mt-2">
                                    <label class="form-label" for="form-control">From</label>
                                    <select v-model.trim="$v.from.$model" class="form-select form-outline"
                                        aria-label="Default select example" name="from">
                                        <option v-for="account in accounts" :key="account._id">{{ account.email
                                        }}</option>
                                    </select>
                                </div>

                                <div class="form-outline mt-2">
                                    <label class="form-label" for="form-control">To</label>
                                    <select v-model.trim="$v.to.$model" class="form-select form-outline"
                                        aria-label="Default select example" name="to">
                                        <option v-for="list in lists" :key="list._id">{{ list.listName }}
                                        </option>
                                    </select>
                                    <div class="invalid-feedback">
                                        <span v-if="!$v.to.required">Required</span>
                                    </div>
                                </div>

                                <div class="form-outline mt-2">
                                    <label class="form-label" for="form-control">Start time (hh:mm)</label>
                                    <input type="time" class="form-control" v-model.trim="startTime" name="startTime" />
                                </div>

                                <div class="form-outline mt-2">
                                    <label class="form-label" for="form-control">End time (hh:mm)</label>
                                    <input type="time" class="form-control" v-model.trim="endTime" name="endTime" />
                                </div>

                                <!-- <div class="meeting-form-item">
                                            <label for="time">Start time (hh:mm)</label>
                                            <input v-model="startTime" type="time" name="start_time" id="start_time" required />
                                        </div> -->

                                <!-- <div class="form-outline">
                                            <div>
                                                <label class="form-label" for="time">End time (hh:mm)</label>
                                            </div>
                                            <div class="end_time">
                                                <input v-model="endTime" type="time" name="end_time" id="end_time"
                                                    required />
                                            </div>
                                        </div> -->


                                <div class="form-outline mt-2">
                                    <label class="form-label" for="form-control">Description</label>
                                    <textarea type="text" class="form-control" v-model.trim="$v.description.$model"
                                        name="description" rows="5"></textarea>
                                </div>

                                <div class="mt-3">
                                    <button class="btn btn-danger btn-lg btn-block" :disabled="$v.$invalid">
                                        Send
                                    </button>
                                </div>

                            </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import NavBar from './NavBar.vue';
import { required } from "vuelidate/lib/validators";
import { SearchList } from '../services/allLists'
import { SearchAccounts } from '../services/mailAccounts'
import { SendEmail } from '../services/sendEmail'
export default {
    name: "AddAccount",
    components: { NavBar },
    data() {
        return {
            lists: '',
            accounts: '',
            subject: '',
            description: ``,
            from: '',
            to: '',
            startTime: '',
            endTime: '',
            userId: localStorage.getItem('userId'),
        }
    },
    validations: {
        description: {
            required,
        },
        subject: {
            required,
        },
        from: {
            required,
        },
        to: {
            required,
        }

    },

    methods: {
        async submit() {
            this.$v.$touch()
            console.log("touched");

            const getHour = (time) => {
                return time[0] + time[1];
            };
            const getMin = (time) => {
                return time[3] + time[4];
            };
            const startTimeHour = getHour(this.startTime);
            const startTimeMin = getMin(this.startTime);

            const endTimeHour = getHour(this.endTime);
            const endTimeMin = getMin(this.endTime);

            const startTimeObj = {
                hours: startTimeHour,
                minutes: startTimeMin,
            };

            const endTimeObj = {
                hours: endTimeHour,
                minutes: endTimeMin,
            };

            const credentials = {
                subject: this.subject,
                from: this.from,
                to: this.to,
                description: this.description,
                startTime: startTimeObj,
                endTime: endTimeObj,
            }
            console.log("object", credentials);

            SendEmail(credentials).then((result) => {
                console.log("result", result);
                this.$toasted.show(result.data.message);
                // this.$router.push({ name: 'mailAccounts' })
            }).catch((error) => {
                console.log("error", error);
            })
        }
    },
    mounted() {
        SearchList(this.userId).then((response) => {
            this.lists = response.data.data;
        });
        SearchAccounts(this.userId).then((response) => {
            this.accounts = response.data.data;
        });
    },
}
</script>

<style>
</style>