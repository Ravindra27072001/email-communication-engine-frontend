<template>
    <div>
        <NavBar />
        <div class="container">
            <div class="row rounded">

                <h1 class="mb-3 pb-3 text-center text-white fw-bolder mt-5">Scheduled Emails</h1>

                <div class="d-flex justify-content-center">
                    <div v-show="showSpinner" class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

                <div v-show="showEmails" class="text-center mt-5">
                    <img src="../images/oops.png" alt="no list">
                    <h3 class="text-white mt-5">No scheduled email is there</h3>
                </div>
                <div class="d-flex row justify-content-center ms-1">

                    <div v-for="list in lists" v-bind:key="list._id" class="card col-lg-3 col-md-3 m-2" style="min-width:365px">


                        <div class="card-body ">
                            <h2 class="card-title">{{  list.subject  }}</h2>
                            <hr>
                            <div class="d-flex">
                                <h5 class="text-danger">Meeting Date: </h5>
                                <p class="card-text ms-2">{{  list.meetingDate  }}</p>
                            </div>

                            <div class=" d-flex">
                                <h5 class="text-info">Meeting Time: </h5>
                                <p class="card-text ms-2">{{  list.startTime  }} to {{  list.endTime  }}</p>
                            </div>

                            <div class="d">
                                <h5 class="text-primary">Admin: </h5>
                                <p class="card-text ms-2">{{  list.from  }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import { ScheduledEmails } from '../services/homePage'
export default {
    components: {
        NavBar
    },
    name: "HomePage",
    data() {
        return {
            lists: "",
            members: "",
            showEmails: false,
            showSpinner: true,
            userId: localStorage.getItem("userId")
        };
    },
    methods: {
        viewMember() {
            this.$toasted.show("result.data.message", {
                type: 'error',
            });
        }
    },
    mounted() {

        ScheduledEmails(this.userId).then((result) => {
            console.log(result);

            if (result.data.status === "FAILED") {
                this.showSpinner = false;
                this.showEmails = true;
            } else {
                this.showSpinner = false,
                    this.lists = result.data.data;
                console.log(this.lists);
            }
        });
    },

}
</script>

<style>
    .d{
        display: flex;
    }
    @media(max-width: 550px) {
        .d {
            display: block;
        }
    }
</style>