<template>
  <div class="body">
    <!-- <NavBar /> -->
    <NavBar />



    <section>

      <div class="container ">
        <h1 class="text-center m-5 text-white">All Lists</h1>

        <div class="d-flex justify-content-center">
          <div v-show="showSpinner" class="spinner-border" role="status">
            <span class="visually-hidden"></span>
          </div>
        </div>

        <div>
          <div v-show="showListsImage" class="text-center">
            <img src="../images/oops.png" alt="no list">
            <h3 class="mt-5">You don't have any list</h3>
          </div>


          <div v-show="showListsTable" class="text-center">

            <div class="bg-body rounded">

              <table class="table listTable">
                <thead>
                  <tr>
                    <th scope="col">List Name</th>
                    <th scope="col">Users</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="list in lists" :key="list._id">
                    <td data-label="List Name">{{  list.listName  }}</td>
                    <td data-label="Users"> <button @click="userList(list._id)" type="button"
                        class="btn btn-primary btn-sm">Users list</button></td>
                    <td data-label="Description">{{  list.description  }}</td>
                    <td data-label="Action"><button @click="removeList(list._id)" type="button"
                        class="btn btn-danger btn-sm">Delete</button></td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>

          <div class="text-center">
            <button @click="addList()" type="button" class="btn btn-primary m-5">Add List</button>
          </div>
        </div>



        <div>


          <div v-show="showUsersImage" class="text-center">
            <h1 class="text-center text-white m-5">All Users</h1>
            <img src="../images/oops.png" alt="no list">
            <h3 class="mt-5">No email is there</h3>
            <div class="text-center">
              <button @click="addUser()" type="button" class="btn btn-primary m-5 text-white">Add an Email</button>
            </div>
          </div>


          <div v-show="showUsersTable" class="text-center">
            <hr>

            <h1 class="text-center text-white m-5">All Users</h1>

            <div class="bg-body rounded">

              <table class="table userTable">
                <thead>
                  <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in usersEmails" :key="user._id">
                    <td data-label="User Name">{{  user.name  }}</td>
                    <td data-label="Email"> {{  user.email  }}</td>
                    <td data-label="Action"><button @click="removeUser(user._id)" type="button"
                        class="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
            <div class="text-center">
              <button @click="addUser()" type="button" class="btn btn-primary m-5">Add an Email</button>
            </div>
          </div>
        </div>

      </div>


    </section>
  </div>

</template>

<script>
import { SearchList, SearchUserEmail, DeleteList, DeleteMember } from '../services/allLists'
import NavBar from "./NavBar.vue";
export default {
  name: "MailAccount",
  components: {
    NavBar
  },
  data() {
    return {
      lists: "",
      usersEmails: "",
      SearchUserId: "",
      userId: localStorage.getItem('userId'),
      showSpinner: true,
      showListsImage: false,
      showUsersImage: false,
      showListsTable: true,
      showUsersTable: false,
    };
  },
  methods: {
    userList(id) {
      this.SearchUserId = id;
      SearchUserEmail(id).then((result) => {
        console.log("object", id);
        console.log("object", result.data.data);
        this.showUsersTable = true;
        this.showUsersImage = false;
        this.usersEmails = result.data.data
        console.log(this.usersEmails.length);
        if (!this.usersEmails.length) {
          this.showUsersImage = true;
          this.showUsersTable = false;
        }
      }).catch((error) => {
        console.log("objectttttttttttttt", error);
      })
    },

    addUser() {
      this.$router.push({ name: "addEmail" });
    },

    addList() {
      console.log("object", this.listId);

      this.$router.push({ name: "addList" });
      // console.log(this.userId);

    },
    removeList(id) {

      DeleteList(id).then((result) => {

        if (result.data.status == "SUCCESS") {

          SearchList(this.userId).then((response) => {

            if (response.data.status === "FAILED") {
              this.showListsImage = true;
              this.showListsTable = false;
            }
            this.lists = response.data.data;
          });

          this.$toasted.show(result.data.message, {
            type: 'success'
          });
        }
        else {
          this.$toasted.show(result.data.message, {
            type: 'error'
          });
        }
      })
      // SearchList(this.userId)
    },

    removeUser(id) {

      DeleteMember(id).then((result) => {

        if (result.data.message === "No Email is there") {
          this.$toasted.show(result.data.message, {
            type: 'error'
          });
        }
        else {
          this.$toasted.show(result.data.message, {
            type: 'success'
          });
          SearchUserEmail(this.SearchUserId).then((result) => {

            this.usersEmails = result.data.data

            if (!this.usersEmails.length) {
              this.showUsersImage = true;
              this.showUsersTable = false;
            }
          })
        }


      })
    }
  },
  mounted() {

    SearchList(this.userId).then((response) => {
      if (response.data.status === "FAILED") {
        console.log("dataswaz", response.data.message);
        this.showSpinner = true;
        this.showListsImage = true;
        this.showListsTable = false;
      }
      this.showSpinner = false;
      this.lists = response.data.data;
    });
  },

}
</script>

<style>
@media(max-width: 550px) {
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