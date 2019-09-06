<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>

          <div class="box">
            <GoogleLogin
              :params="params"
              :renderParams="renderParams"
              :onSuccess="onSignIn"
              :onFailure="onFailure"
            >Login</GoogleLogin>
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
          localStorage.getItem("config").gIDLoginAPI
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
      var profile = googleUser.getBasicProfile();// This is null if the 'email' scope is not present.
      this.IDGoogle = profile.getId();
      this.name = profile.getName();
      this.ImageUrl = profile.getImageUrl();
      this.email = profile.getEmail();
      localStorage.setItem('user', this.email);
      localStorage.setItem('userName', this.name);
      localStorage.setItem('ImageUrl', this.ImageUrl);
      if (this.email.endsWith("@knewin.com")){
        let resp = this.getMyFkingToken(this.email)
                
      }
    },
    onFailure(error) {
      console.log("OH NOES error:", error);
    },
    getMyFkingToken(email){

      this.$http.post(`${this.$config.server}login/DashboardLogin`, {Email: this.email } )
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.data.accessToken) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.data));
                localStorage.setItem('token', user.data.accessToken);
            this.$router.push({ name: "dashboard"});  

            }
        }
        )
        .catch(e => console.log(e));
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
