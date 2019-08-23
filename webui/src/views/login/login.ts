/**
 * @module views\login
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component, Watch } from 'vue-property-decorator';
import { IndexObject } from "@/types";

@Component
export default class Login extends Vue {
    [x: string]: any;
    private username = "";
    private password = "";
    private isBusy = false;

    private checkUserInput() {
        if (!this.username || !this.password) {
          return false;
        }
        return true;
    }

    private login() {
      if (!this.checkUserInput()) {
        return;
      }
      
    }

    private forgetPassword() {
        
    }
    private createAccount(){

    }
}
