import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { check } from "@/Services/accountService";

export const useAccountStore = defineStore("account", () => {
  const state = reactive({
    checked: false,
    loggedIn: false,
    name: "", // 사용자 이름
  });

  const setChecked = (val) => (state.checked = val);
  const setLoggedIn = (val) => (state.loggedIn = val);
  const setName = (val) => (state.name = val);

  // 서버에 로그인 상태 확인 요청
  const checkLogin = async () => {
    const res = await check();
    if (res?.status === 200 && res.data?.name) {
      state.checked = true;
      state.loggedIn = true;
      state.name = res.data.name;
    } else {
      state.checked = true;
      state.loggedIn = false;
      state.name = "";
    }
  };

  return {
    state,
    setChecked,
    setLoggedIn,
    setName,
    checkLogin,
  };
});