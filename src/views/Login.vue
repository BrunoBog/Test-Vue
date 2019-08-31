<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>

          <div class="btn btn-neutral btn-icon btn-wrapper text-center">
                <GoogleLogin 
                :params="params" 
                :onSuccess="onSignIn" 
                :onFailure="onFailure">Login
                </GoogleLogin>
            <!--<div id="google-signin-button"  ></div> -->
            <!--  <a href="#" v-on:click="onSignIn" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
            </a>-->
          </div>
        </div>
      </div>
      <!-- <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light">
            <small>Forgot password?</small>
          </a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light">
            <small>Create new account</small>
          </router-link>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import GoogleLogin from 'vue-google-login';
export default {
  name: "login",
  data() {
    return {
      model: {
        email: "",
        nome: "",
        IDGoogle: "",
        ImageUrl: ""
      },
      params: {
        client_id:
          "383624888075-094vd5gmnriro2kg67073tt5pi0rrm5o.apps.googleusercontent.com"
      }
    };
  },
  components: {
    GoogleLogin
  },
  mounted() {
  },
  methods: {
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
      this.IDGoogle = profile.getId();
      this.name = profile.getName();
      this.ImageUrl = profile.getImageUrl();
      this.email = profile.getEmail();
    },
    onFailure(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    }
  }
};
</script>


<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
