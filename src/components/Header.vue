<script setup>
import { useAccountStore } from "@/stores/account";
import { logout } from "@/services/accountService";
import { ref, onMounted, onUnmounted, computed } from 'vue';

const account = useAccountStore(); // 먼저 선언

const userName = computed(() => account.state.signedUser?.name || "사용자"); // 반응형으로 상태를 계속 바라봄

const isBlink = ref(true);
let intervalId;

onMounted(() => {
  intervalId = setInterval(() => {
    isBlink.value = !isBlink.value; // 1초마다 토글
  }, 1000);
  console.log("✅ signedUser:", account.state.signedUser);

});

onUnmounted(() => {
  clearInterval(intervalId);
});

// 로그아웃
const logoutAccount = async () => {
  if (!confirm("로그아웃 하시겠습니까?")) return;

  try {
    const res = await logout();
    if (res?.status >= 200 && res?.status < 300) {
      account.logout();
      alert("로그아웃 되었습니다.");
    } else {
      alert("로그아웃 실패: 서버 오류");
    }
  } catch (err) {
    console.error("로그아웃 중 오류 발생:", err);
    alert("로그아웃 실패: 네트워크 오류");
  }
};
</script>

<template>
  <header>
    <div class="navbar custom-navbar text-white shadow-sm">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <strong>Atelier Works</strong>
        </router-link>
        <div v-if="account.state.isSigned">
          <span :class="['welcome-text', { dimmed: !isBlink }]">{{ account.state.signedUser?.name }}님 환영합니다.</span>
        </div>
        <div class="menus d-flex gap-3">
          <template v-if="account.state.isSigned">
            <a @click="logoutAccount">로그아웃</a>
            <router-link to="/orders">주문 내역</router-link>
            <router-link to="/cart">장바구니</router-link>
          </template>
          <template v-else>
            <router-link to="/login">로그인</router-link>
            <router-link to="/join">회원가입</router-link>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.welcome-text {
  color: gray;
  transition: opacity 0.5s ease;
  opacity: 1;
}

.welcome-text.dimmed {
  opacity: 0;
}

strong {
  color: #ffcbcd;
}

.custom-navbar {
  background-color: #313131; /* 원하는 색상 (보라색 예시) */
  color: #fff;
}

header {
  .menus {
    a {
      cursor: pointer;
      color: white;
      text-decoration: none;

      &:hover {
        color: yellow;
      }
    }
  }
}
</style>
