<script setup>
import { computed ,onMounted} from 'vue'
import { useStore } from 'vuex'
import { AddrHandle } from '../utils/tool'
import {useRouter,useRoute} from 'vue-router'
import Header from '../components/Header.vue';
import HomeActiveIcon from '../assets/Home/HomeActiveIcon.png'
import HomeIcon from '../assets/Home/HomeIcon.png'
import StakeActiveIcon from '../assets/Home/StakeActiveIcon.png'
import StakeIcon from '../assets/Home/StakeIcon.png'
import Rewards from '../assets/Home/RewardsIcon.png'
import RewardsActive from '../assets/Home/RewardsActiveIcon.png'
const store = useStore()
const router = useRouter()
const route = useRoute()
let leftMenu = computed(()=>{
  return store.state.leftMenu
})
let address = computed(()=>{
  return store.state.address
})
let Version = computed(()=>{
  return store.state.Version
})
const goPath=(path)=>{
  router.push(path)
  closeMenuSwitch()
}
const closeMenuSwitch = ()=>{
  store.commit('SETLEFTMENU',false)
}
const Connect=()=>{
  if(!address.value){
    connect((address)=>{
      store.commit('SETADDRESS',address)
    })
  }
}
const changeVersion = ()=>{
  if(Version.value === 1){
    store.commit('SETVERDION',2)
  }else{
    store.commit('SETVERDION',1)
  }
  closeMenuSwitch()
}
</script>

<template>
  <div class="view">
    <Header></Header>
    <router-view></router-view> 
  </div>
  <el-drawer v-model="leftMenu"  @close="closeMenuSwitch" :size="176" :with-header="false">
    <div class="leftMenuTop" v-if="Version === 1">
      <div class="drawerLogo">
        <img src="../assets/Home/MenuIcon.png" alt="">
      </div>
      <div class="MenuItem" @click="goPath('/')">
          <img :src="route.path === '/' ? HomeActiveIcon:HomeIcon" alt="">
          <span>HOME</span>
      </div>
      <div class="MenuItem" @click="goPath('/Dao')">
          <img :src="route.path === '/Dao' ? StakeActiveIcon:StakeIcon" alt="">
          <span>DAO</span>
      </div>
      <div class="MenuItem" @click="goPath('/Rewares')">
          <img :src="route.path === '/Rewares' ? RewardsActive:Rewards" alt="">
          <span>REWARDS</span>
      </div>
    </div>
    <div class="leftMenuTop" v-else>
      <div class="drawerLogo">
        <img src="../assets/Home/MenuIcon.png" alt="">
      </div>
      <div class="MenuItem" @click="goPath('/')">
          <!-- <img :src="route.path === '/' ? HomeActiveIcon:HomeIcon" alt=""> -->
          <span>HOME</span>
      </div>
      <div class="MenuItem" @click="goPath('/Swap')">
          <!-- <img :src="route.path === '/Swap' ? StakeActiveIcon:StakeIcon" alt=""> -->
          <span>Swap</span>
      </div>
      <div class="MenuItem" @click="goPath('/Lottery')">
          <!-- <img :src="route.path === '/Lottery' ? RewardsActive:Rewards" alt=""> -->
          <span>Lottery</span>
      </div>
      <div class="MenuItem" @click="goPath('/Wallet')">
          <!-- <img :src="route.path === '/Lottery' ? RewardsActive:Rewards" alt=""> -->
          <span>Wallet</span>
      </div>
    </div>
    <div class="connect" @click="Connect">
      <div class="content" :class="['content',{Connected:!!address}]">
        {{ address ?  AddrHandle(address):'Connect wallet'}}
      </div>
    </div>
    <div class="Version flexCenter" @click="changeVersion">{{ Version === 2 ? 'Dao':'Lucky Hash' }}</div>
  </el-drawer>
</template>

<style lang="scss">
.view{
  position: relative;
  z-index: 100;
}
.Home{
    // background: url('../assets/Home/bg.png') 0 0 / 100% no-repeat;
    min-height: 100vh;
}
.drawerLogo{
  text-align: center;
  margin-bottom: 38px;
  img{
    width: 51px;
  }
}
.MenuItem{
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  span{
    margin-left: 12px;
    color: #FFFFFF;
    font-weight: 500;
    font-size: 14px;
  }
}
.connect{
  width: 100%;
  height: 37px;
  background:#FFFFFF;
  border-radius: 11px;
  font-size: 0.9rem;
  line-height: 1rem;
  @media (max-width:500px) {
    font-size: 16px;
  }
  .content{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.55rem;
    width: 100%;
    height: 100%;
    color: #6A6CFB;
  }
}
.Version{
  height: 40px;
  padding: 0 20px;
  border-radius: 10px;
  background: #303044;
  color: #fff;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space:nowrap;
}
.el-drawer__body{
  width: 176px;
  padding: 33px 24px;
  box-sizing: border-box;
  background: #28283B;
  display: flex;
  flex-direction: column;
}
</style>
