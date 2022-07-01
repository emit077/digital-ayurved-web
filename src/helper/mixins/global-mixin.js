import Vue from "vue";
import axios from "axios";
import axios_instance from "@/helper/axios-helper";
import {mapGetters} from "vuex";

let CancelToken = axios.CancelToken;
let source = CancelToken.source();

Vue.mixin({
    computed: mapGetters({
        getUser: 'user/getUser'
    }),
    methods: {
        showSnakeBar(type, text) {
            console.log("type,text")
            console.log(type, text)
            this.$store.dispatch('snackbar/setSnackbar', {
                flag: true,
                text,
                color: type
            })
        },
        // toggle_loading(){
        // 	this.$store.dispatch('setPageLoader', !this.$store.state.page_loader )
        // },
        handle401(status_code) {
            console.log(status_code)
            if (status_code === 401) {
                // console.log("Invalid Access token");
                this.showSnakeBar("error", "Invalid Access token")
            }
        },
        handle440(status_code) {
            if (status_code === 440) {
                console.log("Session Expired");
                this.showSnakeBar("error", "Session Expired")
            }
        },
        handle403(status_code) {
            if (status_code === 403) {
                console.log("Invalid token");
                this.showSnakeBar("error", "Invalid token")
            }
        },
        handle404(status_code) {
            if (status_code === 404) {
                this.showSnakeBar("error", "Invalid request")
            }
        },
        handle400(response) {
            if (response.status === 400) {
                console.log("Invalid token");
                this.showSnakeBar("error", response.data.message)
            }
        },
        /* handel 500 error*/
        handle500(status_code) {
            console.log(status_code)
            if (status_code === 500) {
                console.log("Internal server error")
                this.showSnakeBar("error", "Internal server error")
            }
        },
        /* handel 500 error*/
        handleNoInternetConnection() {
            console.log("No Internet")
            this.showSnakeBar("error", "Please check your internet connection")
        },

        /* common  function  for GET API call */
        request_GET: (self, url, params, fnSuccessResponse = null, headers = null, fnFailureResponse = null, finallyHandler = null, is_cancel = false) => {
            if (is_cancel) {
                source.cancel();
                source = axios.CancelToken.source();
            }

            if (headers == null) {
                headers = {
                    'token': localStorage.getItem("token"),
                }
            }

            axios_instance.get(url, {
                params: params,
                headers: headers,
                cancelToken: is_cancel ? source.token : ''
            })
                .then(function (response) {
                    // console.log("response")
                    if (fnSuccessResponse != null) {
                        if (response.data.success == false)
                            self.showSnakeBar("error", response.data.message)

                        fnSuccessResponse(response);
                    }
                })
                .catch(function (error) {
                    console.log(error.response)
                    if (axios.isCancel(error)) {
                        console.log('Request canceled', error.message);
                        return false
                    }

                    if (error.response) {
                        self.handle401(error.response.status);
                        self.handle440(error.response.status);
                        self.handle403(error.response.status);
                        self.handle400(error.response.status);
                        self.handle500(error.response.status);
                        self.handle404(error.response.status);
                    } else {
                        if (fnFailureResponse != null) {
                            fnFailureResponse();
                        } else {
                            // self.handleNoInternetConnection()
                        }
                    }
                }).finally(function (res) {
                if (finallyHandler !== null) {
                    finallyHandler()
                }
            });
        },
        /* common function for the POST API Call */
        request_POST(self, url, params, fnSuccessResponse = null, headers = null, fnFailureResponse = null, finallyHandler = null) {
            console.log("post")
            if (headers == null) {
                let token = ""
                if (localStorage.getItem("token"))
                    token = localStorage.getItem("token")

                headers = {
                    'token': token,
                }
            }
            axios_instance.post(url, params, {
                headers: headers,
            })
                .then(function (response) {
                    console.log("response.data.success=" + response.data.success)
                    if (fnSuccessResponse != null) {
                        if (response.data.success == false) {
                            console.log("response.data.success==", response.data.success)
                            self.showSnakeBar("red", response.data.message)
                        }
                        console.log("log1.1")
                        fnSuccessResponse(response);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    if (!error.response) {
                        console.log(error)
                    } else {
                        console.log(error.response.data.status_code)
                        self.handle400(error.response.status);
                        self.handle401(error.response.status);
                        self.handle440(error.response.status);
                        self.handle403(error.response.status);
                        self.handle500(error.response.status);
                        self.handle404(error.response.status);
                        if (fnFailureResponse != null) {
                            fnFailureResponse();
                        } else {
                            // self.handleNoInternetConnection()
                        }
                    }
                }).finally(function (res) {
                if (finallyHandler !== null) {
                    finallyHandler()
                }
            });
        },

        /*perform encription for Rout params */
        encrypt: function (text) {
            return this.CryptoJS.AES.encrypt(text.toString(), "tutor-factory").toString()
        },
        /*perform decription for Rout params*/
        decrypt: function (text) {
            return this.CryptoJS.AES.decrypt(text, "tutor-factory").toString(this.CryptoJS.enc.Utf8)
        },


        /* city auto complete */
        cityAutoComplete() {
            const self = this
            let params = {
                "search_query": self.city_serch_query,
            };
            self.city_loading = true;
            const successHandler = (response) => {
                self.city_list = response.data.city_list

            };
            const finallyHandler = () => {
                self.city_loading = false
            };
            self.request_GET(self, self.$urls.CITY_LIST, params, successHandler, null, null, finallyHandler)
        },


    }
});