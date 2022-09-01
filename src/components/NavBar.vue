<template>
    <div class="body">

        <div id="nav">
            <nav class="navbar navbar-expand-lg navbar-light tables">
                <div class="container-fluid">
                    <a class="navbar-brand p-2" href="/home">Email Engine</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">

                            <router-link to="/mailAccounts" class="text-decoration-none">
                                <span class="nav-link text-dark">Accounts</span>
                            </router-link>

                            <router-link to="/sendEmail" class="text-decoration-none">
                                <span class="nav-link text-dark ms-2">Send Email</span>
                            </router-link>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-dark ms-2" href="#" id="navbarDropdownMenuLink"
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Features
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <router-link to="/allLists" class="text-decoration-none">
                                        <span class="dropdown-item">Lists</span>
                                    </router-link>
                                    <router-link to="/addEmail" class="text-decoration-none">
                                        <span class="dropdown-item">Add Member</span>
                                    </router-link>
                                    <router-link to="/addAccount" class="text-decoration-none">
                                        <span class="dropdown-item">Add Account</span>
                                    </router-link>

                                </ul>
                            </li>




                        </ul>

                        <div class="ms-auto text-primary email ">Hello- {{ email }} </div>
                        <router-link to="/" class="text-decoration-none">
                            <span class="nav-link text-dark ms-2 p-2" @click="logout()">Logout</span>
                        </router-link>

                    </div>
                </div>


            </nav>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: localStorage.getItem('email')
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
        },
    },
}
</script>

<style>
.body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
}

.tables {
    background-color: lightblue;
}



/* .navbar-brand:hover,
.nav-link:hover {
    background-color: rgba(128, 128, 128, 0.5);
    border-radius: 5px;
} */



/* #nav a.router-link-exact-active {
  color: #42b983;
} */

#nav a:hover {
    /* padding: 20px; */
    /* text-align: center; */
    background-color: lightgrey;
    border-radius: 5px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}



@media(max-width: 990px) {
    .email {
        display: none;
    }

    .nav-link {
        text-align: center;
    }
}
</style>