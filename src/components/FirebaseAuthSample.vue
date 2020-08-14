<template>
  <v-container fluid>
    <!-- 機能紹介・お知らせ -->
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="12" md="6">
        <v-alert border="left" colored-border type="info" elevation="2" dismissible>
          <div>このコンポーネントでは以下のFirebase Authenticationを利用した機能を使えます。</div>
          <div class="d-flex justify-center">
            <ul class="text-left">
              <li>アップロード</li>
              <li>ダウンロード</li>
              <li>Storage上のファイルのリスト表示</li>
            </ul>
          </div>
          <div>
            サンプルコード以外の機能については
            <a
              href="https://firebase.google.com/docs/storage/web/start"
              target="_blank"
            >
              こちら
              <v-icon small color="primary">mdi-open-in-new</v-icon>
            </a>
          </div>
        </v-alert>
      </v-col>
    </v-row>
    <!-- ログイン -->
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-text-field v-model="mailAddress" label="メールアドレス" />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          v-model="password"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          label="パスワード"
          :type="passwordShow ? 'text' : 'password'"
          @click:append="passwordShow = !passwordShow"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="2">
        <v-btn color="primary" @click="login">ログイン</v-btn>
      </v-col>
    </v-row>
    <v-alert
      v-if="isSuccessLogin == false"
      border="left"
      colored-border
      type="error"
      elevation="2"
      dismissible
    >
      <div>ログインに失敗しました</div>
    </v-alert>
    <div v-else-if="isSuccessLogin == true">
      <v-alert border="left" colored-border type="info" elevation="2" dismissible>
        <div>ログインに成功しました</div>
        <div>ユーザーIDは{{loginedUserId}}です。</div>
      </v-alert>
      <v-text-field v-model="savedStr" label="DBに保存する文字列" />
      <v-btn color="primary" @click="firebaseDatabaseSample">保存</v-btn>
      <v-snackbar v-model="saveSuccessSnackbar">
        保存に成功しました
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="saveSuccessSnackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
      <v-snackbar v-model="saveFailedSnackbar">
        保存に成功しました
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="saveFailedSnackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>
<script>
import { FirebaseService } from "../firebase/FirebaseService";
import { FirebaseAuthenticationService } from "../firebase/FirebaseAuthenticationService";

export default {
  data: () => ({
    mailAddress: "",
    password: "",
    passwordShow: false,
    isSuccessLogin: null,
    loginedUserId: null,
    savedStr: "",
    authenticationService: null,
    saveSuccessSnackbar: false,
    saveFailedSnackbar: false,
  }),
  props: {},
  methods: {
    login: async function(event) {
      console.log(this.mailAddress + " - " + this.password);
      this.authenticationService = await this.firebaseAuthSample(
        this.mailAddress,
        this.password
      );
    },
    // 認証機能のサンプル
    firebaseAuthSample: async function(mailAddress, password) {
      const firebaseService = new FirebaseService();
      const authenticationService = new FirebaseAuthenticationService(
        firebaseService
      );

      try {
        await authenticationService.signInWithEMailAndPassword(
          mailAddress,
          password
        );
        this.isSuccessLogin = true;
        this.loginedUserId = authenticationService.currentUserId();
        console.log(`success to login (${mailAddress})`);
      } catch (error) {
        this.isSuccessLogin = false;
        console.log(`fail to login (${mailAddress})`);
      }
      return authenticationService;
    },
    // 認証機能とデータベースを連携させてユーザー固有の情報をFirebase Databaseに保存させる処理のサンプル
    firebaseDatabaseSample: async function() {
      const firebaseService = new FirebaseService();
      try {
        await firebaseService.database
          .ref(`users/${this.authenticationService.currentUserId()}`)
          .set({ query: this.savedStr });
        this.saveSuccessSnackbar = true;
      } catch (error) {
        this.saveFailedSnackbar = true;
      }
    },
  },
};
</script>
