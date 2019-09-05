<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class=" card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>

          <div class="box">
                <GoogleLogin 
                :params="params" 
                :renderParams="renderParams"
                :onSuccess="onSignIn" 
                :onFailure="onFailure">Login
                </GoogleLogin>
          </div>
        </div>
      </div>
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
      },
      renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                }
    };
  },
  components: {
    GoogleLogin
  },
  mounted() {
  },
  beforeMount() {
    this.CheckLogin()
  },
  methods: {
    CheckLogin(){
      let email = localStorage.getItem ('user')
    if (email)
      this.$router.push({ name: "dashboard"})
    },
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
      if (this.email.endsWith("@knewin.com")){
        localStorage.setItem('user', this.email);
        this.$router.push({ name: "dashboard"});
      }
    },
    onFailure(error) {
      console.log("OH NOES", error);
    },
    getMyFkingToken(email){
      localStorage.setItem('user', email);
      return
      // return fetch(`http://localhost:8085/login`, requestOptions)
      //   .then(handleResponse)
      //   .then(user => {
      //       // login successful if there's a jwt token in the response
      //       if (user.token) {
      //           // store user details and jwt token in local storage to keep user logged in between page refreshes
      //           localStorage.setItem('user', JSON.stringify(user));
      //       }
      //       return user;
      //   });
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
.box {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
