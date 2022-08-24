import Router from "vue-router";
import RegisterPage from '@/components/RegisterPage';
import LoginPage from '@/components/LoginPage';
import VerifyOTP from '@/components/RegisterPage';
import OTPVerification from '@/components/resendOTP'
import MailAccounts from '@/components/MailAccounts'
import AddAccount from '@/components/AddAccount'
import AddList from '@/components/AddList'
import AllLists from '@/components/AllLists'
import AddEmail from '@/components/AddEmail'
import AllUsersEmails from '@/components/AllUsersEmails'
import SendEmail from "@/components/SendEmail"
import PageNotFound from '@/components/PageNotFound'

// import store from "@/store";

// const meta = {
//     authorize: localStorage.getItem('token')
// };

// console.log(meta.authorize);

// const authToken = localStorage.getItem('token');

const router = new Router(
    {
        mode: 'history',
        routes: [
            {
                name: 'register',
                path: '/register',
                component: RegisterPage
            },
            {
                name: 'verifyOTP',
                path: '/VerifyOTP',
                component: VerifyOTP
            },
            {
                name: 'login',
                path: '/',
                component: LoginPage,
            },
            {
                name: 'resendOTP',
                path: '/OTPVerification',
                component: OTPVerification,
            },
            {
                name: 'mailAccounts',
                path: '/MailAccounts',
                component: MailAccounts,
            },
            {
                name: 'addAccount',
                path: '/AddAccount',
                component: AddAccount,
            },
            {
                name: 'allLists',
                path: '/AllLists',
                component: AllLists,
            },
            {
                name: 'addList',
                path: '/AddList',
                component: AddList,
            },
            {
                name: 'addEmail',
                path: '/AddEmail',
                component: AddEmail,
            },
            {
                name: 'allUsersEmails',
                path: '/allUsersEmails',
                component: AllUsersEmails,
            },
            {
                name: 'sendEmail',
                path: '/sendEmail',
                component: SendEmail,
            },
            {
                name: 'pageNotFound',
                path: '/:pageNotFound(.*)*',
                component: PageNotFound
            },
        ]
    },


);

// router.beforeEach((to, from, next) => {
//     console.log("object", to.meta.authToken);
//     if (to.meta.authToken) {
//         next('/');
//     } else {
//         next();
//     }
// })

// router.beforeEach((to, from, next) => {
//     console.log("object", meta.authorize);
//     if (!meta.authorize == null) {
//         next()
//     } else {
//         next();
//     }
// });

export default router;