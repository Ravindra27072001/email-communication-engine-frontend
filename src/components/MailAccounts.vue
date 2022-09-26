<template>
  <div>
    <NavBar />

    <div class="container">

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-body">
                Do you really want to delete the Account ?
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                @click="removeAccount()">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 class="mb-3 pb-3 text-center text-dark fw-bolder m-5">All Accounts</h1>

        <div class="d-flex justify-content-center">
          <div v-show="showSpinner" class="spinner-border" role="status">
            <span class="visually-hidden"></span>
          </div>
        </div>

        <div v-show="showImage" class="text-center">
          <div id="main">
            <div class="fof">
              <h1>OOPS</h1>
              <p class="mt-3">You don't have any account</p>
            </div>
          </div>
        </div>

        <div v-show="showTable" class="mt-5">

          <table class="table text-white accountTable m-auto" id="newClass">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Email</th>
                <th scope="col">Company Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="account, i in accounts" :key="account._id">

                <td data-label="S.No.">{{ ++i }}</td>
                <td data-label="Email">{{ account.email }}</td>
                <td data-label="Company Name">{{ account.companyName }}</td>
                <td data-label="Action">
                  <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" @click="getAccountId(account._id)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="text-center">
          <button @click="addAccount()" type="button" class="btn btn-primary m-5">Add Account</button>
        </div>

      </div>
    </div>
  </div>

</template>
  
<script>

import { SearchAccounts, DeleteAccount } from '../services/mailAccounts'
import NavBar from "./NavBar.vue";

export default {
  name: "MailAccount",
  components: { NavBar },

  data() {
    return {
      accounts: "",
      userId: "",
      accountId: "",
      showSpinner: true,
      showImage: false,
      showTable: true,
    };
  },

  methods: {

    addAccount() {
      this.$router.push({ name: "addAccount" });
    },

    getAccountId(_id) {
      this.accountId = _id;
    },

    async removeAccount() {

      try {
        const result = await DeleteAccount(this.accountId);

        this.$toasted.show(result.data.message, {
          type: 'success'
        });

        let response = await SearchAccounts(this.userId);
        this.accounts = response.data.data;
      } catch (error) {
        this.showImage = true;
        this.showTable = false;
      }
    }
  },

  async mounted() {

    this.userId = localStorage.getItem("userId");

    try {
      let response = await SearchAccounts(this.userId);
      this.showSpinner = false;
      this.accounts = response.data.data;

    } catch (error) {
      this.showSpinner = false;
      this.showImage = true;
      this.showTable = false;
    }

    // SearchAccounts(this.userId).then((response) => {

    //   if (response.data.message === "No account is there") {
    //     this.showSpinner = false;
    //     this.showImage = true;
    //     this.showTable = false;
    //   }
    //   this.showSpinner = false;
    //   this.accounts = response.data.data;
    // });
  },
}
</script>
  
<style scoped>
#main {
  display: inline;
  width: 100%;
  text-align: center;
  margin-top: 100px;
}

.fof {
  display: inline;
}

.fof p {
  font-size: 25px;
}

.fof h1 {
  font-size: 100px;
  display: inline-block;
  padding-right: 12px;
  animation: type .5s alternate infinite;
}

@keyframes type {

  from {
    box-shadow: inset 5px 5px 5px grey
  }

  to {
    box-shadow: inset -5px -5px 5px transparent;
  }

}

.table thead {
  background-color: #0c1c25d1;
  color: white;
}

#newClass {
  box-shadow: 17px 10px 20px 6px black;
  background-color: #303E48;
  width: 90%;
}

@media(max-width: 775px) {

  .accountTable td::before {
    content: attr(data-label);
    position: absolute;
    left: 5%;
    font-size: 15px;
    font-weight: bold;
  }

  .table thead {
    display: none;
  }

  .table .table tbody,
  .table tr,
  .table td {
    display: block;
    width: 100%;
  }

  .table tr {
    margin-bottom: 15px;
  }

  .table td {
    text-align: right;
    /* padding-left: 50px; */
    position: relative;
  }

  .listTable td::before {
    content: attr(data-label);
    position: absolute;
    left: 5%;
    /* width: 50%; */
    /* padding-left: 15px; */
    font-size: 15px;
    font-weight: bold;
  }

  .userTable td::before {
    content: attr(data-label);
    position: absolute;
    left: 5%;
    /* width: 50%; */
    /* padding-left: 15px; */
    font-size: 15px;
    font-weight: bold;
  }
}
</style>