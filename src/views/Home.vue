<script setup>
import { getItems } from '@/Services/itemService';
import { onMounted, reactive } from 'vue';
import Card from '@/components/Card.vue';

const state = reactive({
  items: [],
});

onMounted(async () => {
  const res = await getItems();
  if(res.status !== 200) { return; }
  console.log('res.data:', res.data);
  state.items = res.data;
});
  // const res = await getItems();
  // console.log(res.data);
/*
마운트 될떄 따한번getItems 통신하고 데이터 콘솔에 뿌리기
*/
</script>
<template>
  <div class="home">
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row row-cols-1 row-cols-lg row-cols-xl-3 g-3">
          <div class="col" v-for="item in state.items">
            <card :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>