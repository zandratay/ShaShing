<template>
    <div class="nav-container">

        <div class="profile-information">
            <img id="duck-ui" src="https://content.instructables.com/FS1/ETHN/LGC9WODA/FS1ETHNLGC9WODA.png?auto=webp&fit=bounds&frame=1" alt="Duck UI">
            <strong> Duck UI </strong>
        </div>

        <nav class="left-nav">
            <ul>
                <li><router-link to="/"> Overview </router-link></li>
                <li><router-link to="/repository"> Financial Reports </router-link></li>
                <li><router-link to="/newspage" >Financial News</router-link></li>
                <li><button @click="handleSignOut" v-if="isLoggedIn"> Sign out</button></li>
            </ul>
            <button class="signOutBtn" @click="handleSignOut" v-if="isLoggedIn"> Sign out</button>
            <router-view />
        </nav>
    
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;
        }
    })
})
const handleSignOut= () => {
    signOut(auth).then(() => {
        router.push('/login')
    })
}


</script>