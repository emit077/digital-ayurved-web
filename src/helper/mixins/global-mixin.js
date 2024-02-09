import axios from "axios";
import axios_instance from "@/helper/axios-helper";

let CancelToken = axios.CancelToken;
let source = CancelToken.source();

export default {
  methods: {
    showSnakeBar(type = "success", text) {
      this.$store.dispatch("snackbar/setSnackbar", {
        flag: true,
        text,
        color: type,
      });
    },
    // toggle_loading(){
    // 	this.$store.dispatch('setPageLoader', !this.$store.state.page_loader )
    // },
    errorHandler(response) {
      switch (response.status) {
        case 400:
          this.showSnakeBar("error", response.data.message);
          break;
        case 401:
          this.showSnakeBar("error", "Invalid Access token");
          break;
        case 403:
          this.showSnakeBar("error", "Invalid token");
          break;
        case 404:
          this.showSnakeBar("error", "Request not found");
          break;
        case 440:
          this.showSnakeBar("error", "Session Expired");
          break;
        case 500:
          this.showSnakeBar("error", "Internal server error");
          break;
        default:
          this.showSnakeBar("error", "Something went wrong");
          break;
      }
    },
    /* common  function  for GET API call */
    request_GET: (
      self,
      url,
      params,
      fnSuccessResponse = null,
      headers = null,
      fnFailureResponse = null,
      finallyHandler = null,
      is_cancel = false
    ) => {
      if (is_cancel) {
        source.cancel();
        source = axios.CancelToken.source();
      }
      if (!headers) headers = { token: localStorage.getItem("token") || "" };

      axios_instance
        .get(url, {
          params: params,
          headers: headers,
          cancelToken: is_cancel ? source.token : "",
        })
        .then(function (response) {
          if (fnSuccessResponse != null) {
            if (response.data.success == false)
              self.showSnakeBar("error", response.data.message);
            fnSuccessResponse(response);
          }
        })
        .catch(function (error) {
          if (axios.isCancel(error)) return false;
          if (error.response) {
            self.errorHandler(error.response);
            if (fnFailureResponse != null) fnFailureResponse();
          }
        })
        .finally(function (res) {
          if (finallyHandler !== null) finallyHandler();
        });
    },

    /* common function for the POST API Call */
    request_POST(
      self,
      url,
      params,
      fnSuccessResponse = null,
      headers = null,
      fnFailureResponse = null,
      finallyHandler = null
    ) {
      if (!headers) headers = { token: localStorage.getItem("token") || "" };
      axios_instance
        .post(url, params, {
          headers: headers,
        })
        .then(function (response) {
          if (fnSuccessResponse != null) {
            if (response.data.success == false)
              self.showSnakeBar("red", response.data.message);
            fnSuccessResponse(response);
          }
        })
        .catch(function (error) {
          if (error.response) {
            self.errorHandler(error.response);
            if (fnFailureResponse != null) fnFailureResponse();
          }
        })
        .finally(function (res) {
          if (finallyHandler !== null) finallyHandler();
        });
    },

    /*perform encription for Rout params */
    encrypt: function (text) {
      return this.CryptoJS.AES.encrypt(
        text.toString(),
        "tutor-factory"
      ).toString();
    },
    /*perform decription for Rout params*/
    decrypt: function (text) {
      return this.CryptoJS.AES.decrypt(text, "tutor-factory").toString(
        this.CryptoJS.enc.Utf8
      );
    },
    formateAmount(x) {
      x = x.toString();
      let dec = "00";
      if (x.split(".").length === 2) {
        dec = x.split(".")[1].slice(0, 2);
        dec = dec.length == 1 ? dec + "0" : dec;
        x = x.split(".")[0];
      }
      var lastThree = x.substring(x.length - 3);
      var otherNumbers = x.substring(0, x.length - 3);
      if (otherNumbers != "") lastThree = "," + lastThree;
      var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      return "₹" + res + (dec ? "." + dec : "");
    },
  },
};
