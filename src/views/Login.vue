<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../Services/accountService";
import { useAccountStore } from "@/stores/account";

const account = useAccountStore();
const username = ref('');
const password = ref('');

const router = useRouter();

const state = reactive({
  form: {
    loginId: "",
    loginPw: "",
  },
});

const submit = async () => {
  const res = await login(state.form);
  console.log("로그인 응답:", res.data);

  switch (res.status) {
    case 200:
    const name = res.data.name || res.data.user?.name || "사용자";
    account.setLoggedIn(true);
    account.setName(name);
    
    alert(`${name}님 로그인 되었습니다.`);
    await router.push("/");
      break;
    case 404:
      alert("아이디/비밀번호를 확인해 주세요.");
      break;
    default:
      alert("로그인 중 오류가 발생했습니다.");
      console.error(res);
  }
};

//   if (res.status === 200) {
//     alert("로그인이 완료되었습니다.");
//     await router.push("/");
//   } else {
//     alert("아이디/비밀번호를 확인해 주세요.");
//   }
// };
</script>

<template>
  <div class="login">
    <div class="container">
      <form class="py-5 d-flex flex-column gap-3" @submit.prevent="submit">
        <h1 class="h5 mb-3">로그인</h1>

        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="loginId"
            placeholder="이메일"
            v-model="state.form.loginId"
          />
          <label for="loginId">이메일</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="loginPw"
            placeholder="패스워드"
            v-model="state.form.loginPw"
            autocomplete="off"
          />
          <label for="loginPw">패스워드</label>
        </div>
        <button class="w-100 h6 btn py-3 bg-black btn-primary" style="border: none;">로그인</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 576px;
}
</style>
