<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import ApiSetting from "./ApiSetting.js";
export default {
  name: "App",
  mounted() {
    // 获取服务token
    this.$http(ApiSetting.GetServerToken, {
      refurl: window.location.origin + '/'
    }).then(
      res => {
        if (res.data.success == true) {
          this.$store.commit("servertoken", res.data.source);
        }
      },
    );

    if (!sessionStorage.message || sessionStorage.message == "") {
      var currentPath = window.location.hash.slice(2);

      var arr = currentPath.split("&");
      let loginId = '';
      if (arr.length > 1) {
        loginId = arr[1].split("=")[1]
      }
      if (loginId == "login" || currentPath == 'yb') {
        this.$router.push({
          name: 'login'
        });
      } else {
        var username = '';
        var password = '';
        var currentPath = window.location.hash.slice(3);
        if (currentPath.indexOf('loging_key_username') > -1) {
          var list = currentPath.split('&');
          username = list[0].split('=')[1];
          password = list[1].split('=')[1];
          this.$router.push({
            name: 'load',
            params: {
              username: username,
              password: password
            }
          });
        } else {
          this.$router.push({
            name: 'login'
          });
        }

      }
    }

    function checkIE() {
      return (
        "-ms-scroll-limit" in document.documentElement.style &&
        "-ms-ime-align" in document.documentElement.style
      );
    }
    if (checkIE()) {
      window.addEventListener("hashchange", () => {
        var currentPath = window.location.hash.slice(1);
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath);
        }
      }, false);
    }
    window.addEventListener("resize", function () {
      document.getElementById("app").style.width = window.innerWidth + "px";
      document.getElementById("app").style.height = window.innerHeight + "px";
    });
  },
  data() {
    return {
      compartment: "鼓楼区"
    };
  },
  beforeDestroy() {
    let session = sessionStorage.message;
    if (session == undefined) {
      this.$router.push({ name: "login" }); //如果缓存中没有值，则跳转到登录页
    } else {
      this.$store.state.user.userinfo = JSON.parse(sessionStorage.message)[0]; //将缓存中的值赋给store
    }
    window.onresize = () => {
      return (() => { })();
    };
  },
  methods: {

  },
  created() {
    let _this = this;
    if (!sessionStorage.message || sessionStorage.message == '') {
    } else {
      try {
        loadScripts(undefined, function (params) {
          _this.$store.commit("Login");
        })
      } catch { }
    }
  }
};
</script>
<style lang="less"></style>
