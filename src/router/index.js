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
// import AllUsersEmails from '@/components/AllUsersEmails'
import SendEmail from "@/components/SendEmail"
import PageNotFound from '@/components/PageNotFound'
import HomePage from '@/components/HomePage'

// import store from "@/store";

// const require = `${localStorage.getItem('token')}`

// console.log("des,cjhx",require);

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
                name: 'home',
                path: '/home',
                component: HomePage,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'mailAccounts',
                path: '/MailAccounts',
                component: MailAccounts,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'addAccount',
                path: '/AddAccount',
                component: AddAccount,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'allLists',
                path: '/AllLists',
                component: AllLists,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'addList',
                path: '/AddList',
                component: AddList,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'addEmail',
                path: '/AddEmail',
                component: AddEmail,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'sendEmail',
                path: '/sendEmail',
                component: SendEmail,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'pageNotFound',
                path: '/:pageNotFound(.*)*',
                component: PageNotFound
            },
        ]
    },


);

router.beforeEach((to,from,next) => {
    console.log(to.matched)
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(localStorage.getItem('token')){
            next();
        } else{
            next('/')
        }
    }
    else{
        next();
    }
})



export default router;