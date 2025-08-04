<script setup>
import { reactive, onMounted, computed } from 'vue';
import { getItems, removeItem, removeAll } from '../Services/cartService';

// 반응형 상태
const state = reactive({
    items: []
});

// 장바구니 상품 조회
const load = async () => {
    const res = await getItems();
    console.log("상태: ", res.status);
    if (res === undefined || res.status !== 200) {
        return;
    }
    state.items = res.data;
}

// 장바구니 상품 삭제
const remove = async cart_id => {
    const res = await removeItem(cart_id);
    if(res === undefined || res.status !== 200) {
        return;
    }
        load();
    // 다시 리로딩 or 방금 삭제한 객체만 state.items에서 삭제
}

const totalQuantity = computed(() => {
    return state.items.reduce((sum, item) => sum + (item.quantity ?? 1), 0);
});

// ✅ 총 금액 계산 (할인 포함)
const totalPrice = computed(() => {
    return state.items.reduce((sum, item) => {
        const discounted = item.price - (item.price * item.discountPer / 100);
        return sum + discounted * (item.quantity ?? 1);
    }, 0);
});

const clear = async cart_id => {
    const confirmed = confirm("장바구니의 아이템을 삭제하시겠습니까?");
    if(!confirmed) return;

    const res = await removeAll();
    if(res === undefined || res.status !== 200) {
    }
        alert("장바구니의 아이템이 모두 삭제되었습니다.")
        state.items = [];
};

onMounted( () => {
    load();
});
</script>

<template>
    <div class="cart">
        <div class="container">
            <template v-if="state.items.length">
                <ul class="items">
                    <li v-for="item in state.items">
                        <img :alt="`상품 사진(${item.name})`" :src="`/pic/item/${item.imgPath}`" />
                        <b class="name">{{ item.name }}</b>
                        <span class="price">
                            {{ (item.price - item.price * item.discountPer / 100).toLocaleString() }}원
                        </span>
                        <span class="remove float-end" @click="remove(item.id)" title="삭제">&times;</span>
                    </li>
                </ul>
                <div class="summary text-end mt-4">
                    <div>총 수량: {{ totalQuantity }}개</div>
                    <div>총 합계: {{ totalPrice.toLocaleString() }}원</div>
                </div>
                <div class="act d-flex justify-contents-between gap-5">
                    <button @click="clear" class="btn bg-black btn-danger mb-3" style="border: none;">장바구니 비우기</button>
                    <router-link to="/order" class="btn bg-black btn-primary mb-3" style="border: none;">주문하기</router-link>
                </div>
            </template>
            <template v-else>
                <div class="text-center py-5">장바구니가 비어있습니다.</div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cart {
    li { border: 1px solid black; margin-top: 25px; margin-bottom: 25px; }
    img { width: 150px; height: 150px; }

    .items { list-style: none; margin: 0; padding: 0; }
    .name { margin-left: 25px; }
    .price { margin-left: 25px; }
    .remove { cursor: pointer; font-size: 30px; padding: 5px 15px; }    
}

.act .btn { width: 300px; display: block; padding: 20px 50px; font-size: 20px; }

.summary {
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  font-display: flex;

  div {
    margin-bottom: 5px;
    padding: 10px;
  }
}
</style>