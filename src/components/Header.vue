<script setup>
import { computed, onMounted,ref,watch } from "vue";
import { useStore } from "vuex";
import { AddrHandle } from "../utils/tool";
import { connect, changeNetwork } from "../web3";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import HomeActiveIcon from "../assets/Home/HomeActiveIcon.png";
import HomeIcon from "../assets/Home/HomeIcon.png";
import blackHomeIcon from "../assets/Home/blackHomeIcon.png";
import StakeActiveIcon from "../assets/Home/StakeActiveIcon.png";
import StakeIcon from "../assets/Home/StakeIcon.png";
import blackStakeIcon from "../assets/Home/blackStakeIcon.png";
import RewardsIcon from "../assets/Home/RewardsIcon.png";
import blackRewardsIcon from "../assets/Home/blackRewardsIcon.png";
import RewardsActiveIcon from "../assets/Home/RewardsActiveIcon.png";
import logo from "../assets/Home/logo.png";
import blackLogo from "../assets/Home/blackLogo.png";
import blackMenu from "../assets/Home/blackMenu.png";
import Menu from "../assets/Home/menu.png";
import Lang from "../assets/Home/lang.png";
import blackLang from "../assets/Home/blackLang.png";
import Lucky from "../assets/Home/Lucky.png";
import changeChain1 from '../assets/Home/changeChain1.png'
import changeChain2 from '../assets/Home/changeChain2.png'
const LevingWebsite = ref(false)
const showPopover = ref(false)
let dialogWidth = ref("595px")
const router = useRouter();
const route = useRoute();
const store = useStore();
const { locale } = useI18n();
let address = computed(() => {
  return store.state.address;
});
let Version = computed(() => {
  return store.state.Version;
});
watch(Version,(newValue,oldValue)=>{
  if(newValue !== oldValue){
    LevingWebsite.value = true
  }
})
const goPath = (path) => {
  router.push(path);
};
let setDialogWidth = (()=>{
  let val = document.body.clientWidth
  const def = 595 // 默认宽度
  if (val < def) {
    dialogWidth.value = '95%'
  } else {
    dialogWidth.value = def + 'px'
  }
})
const changeVersion = ()=>{
  // LevingWebsite.value = true;
  showPopover.value = false;
  goPath('/')
  console.log(Version)
  if(Version.value === 1){
    store.commit('SETVERDION',2)
  }else{
    store.commit('SETVERDION',1)
  }
  // router.addRoute('Lottery',{
  //   path: 'Lottery',
  //   component: {
  //       setup(){
  //           return () => h(
  //               <>
  //                   <div>userinfo</div>
  //               </>
  //           )
  //       }
  //   },
  // })
}
onMounted(()=>{
  setDialogWidth()
  window.onresize = () => {
    setDialogWidth()
  }
})
function IconPath(path, activeIcon, Icon, blackIcon) {
  if (route.path === path) {
    return activeIcon;
  }
  return Icon;
  // if(route.path === '/'){
  //   return Icon
  // }else{
  //   return blackIcon
  // }
}
const Connect = () => {
  if (!address.value) {
    changeNetwork(() => {
      connect((address) => {
        store.commit("SETADDRESS", address);
      });
    });
  }
};
const leftMenuSwitch = () => {
  store.commit("SETLEFTMENU", !store.state.leftMenu);
};
const changeLang = (val) => {
  locale.value = val;
  localStorage.setItem("lang", val);
};
onMounted(() => {
  // console.log(route.path)
});
</script>

<template>
  <div class="Header">
    <div class="HeaderLeft">
      <img :src="route.path === '/' ? logo : blackLogo" class="Logo" alt="" />
      <el-popover placement="bottom" trigger="click" :teleported="false" v-model:visible="showPopover">
        <template #reference>
          <div class="HeaderLeftVersion">{{ Version === 1 ? 'Dao':'Lucky Hash' }} <img src="../assets/Home/arrow.png" alt=""></div>
        </template>
        <div class="VersionDowm flexCenter" @click="changeVersion">{{ Version === 2 ? 'Dao':'Lucky Hash' }}</div>
      </el-popover>
    </div>

    <div class="HeaderRight">
      <div class="menu" v-if="Version === 1">
        <div
          :class="['menuItem', { ActiveMenuItem: route.path === '/' }]"
          @click="goPath('/')"
        >
          <div>
            <img
              :src="IconPath('/', HomeActiveIcon, HomeIcon, blackHomeIcon)"
              alt=""
            />
            <span>{{ $t("Home") }}</span>
            <div class="ActiveBorder"></div>
          </div>
        </div>
        <div
          :class="['menuItem', { ActiveMenuItem: route.path === '/Dao' }]"
          @click="goPath('/Dao')"
        >
          <div>
            <img
              :src="IconPath('/Dao', StakeActiveIcon, StakeIcon, blackStakeIcon)"
              alt=""
            />
            <span>{{ $t("DAO") }}</span>
            <div class="ActiveBorder"></div>
          </div>
        </div>
        <div
          :class="['menuItem', { ActiveMenuItem: route.path === '/Rewares' }]"
          @click="goPath('/Rewares')"
        >
          <div>
            <img
              :src="
                IconPath(
                  '/Rewares',
                  RewardsActiveIcon,
                  RewardsIcon,
                  blackRewardsIcon
                )
              "
              alt=""
            />
            <span>{{ $t("rewards") }}</span>
            <div class="ActiveBorder"></div>
          </div>
        </div>
      </div>
      <div class="menu" v-else>
        <div
          :class="['menuItem', { ActiveMenuItem: route.path === '/' }]"
          @click="goPath('/')"
        >
          <div>
            <!-- <img
              :src="IconPath('/', HomeActiveIcon, HomeIcon, blackHomeIcon)"
              alt=""
            /> -->
            <span>Home</span>
            <div class="ActiveBorder"></div>
          </div>
        </div>
        <div
          :class="['menuItem', { ActiveMenuItem: route.path === '/Swap' }]"
          @click="goPath('/Swap')"
        >
          <div>
            <!-- <img
              :src="IconPath('/', HomeActiveIcon, HomeIcon, blackHomeIcon)"
              alt=""
            /> -->
            <span>Swap</span>
            <div class="ActiveBorder"></div>
          </div>
        </div>
        <div
          :class="['menuItem', { ActiveMenuItem: route.path === '/Lottery' }]"
          @click="goPath('/Lottery')"
        >
          <div>
            <!-- <img
              :src="IconPath('/Dao', StakeActiveIcon, StakeIcon, blackStakeIcon)"
              alt=""
            /> -->
            <span>Lottery</span>
            <div class="ActiveBorder"></div>
          </div>
        </div>
        <div
          :class="['menuItem', { ActiveMenuItem: route.path === '/Wallet' }]"
          @click="goPath('/Wallet')"
        >
          <div>
            <!-- <img
              :src="
                IconPath(
                  '/Rewares',
                  RewardsActiveIcon,
                  RewardsIcon,
                  blackRewardsIcon
                )
              "
              alt=""
            /> -->
            <span>Wallet</span>
            <div class="ActiveBorder"></div>
          </div>
        </div>
      </div>
      <div class="connect" @click="Connect">
        <div class="content">
          {{ address ? AddrHandle(address) : $t("Connectwallet") }}
        </div>
      </div>
      <el-dropdown trigger="click">
        <img class="lang" :src="route.path === '/' ? Lang : blackLang" alt="" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changeLang('zh')"
              >繁體中文</el-dropdown-item
            >
            <el-dropdown-item @click="changeLang('kr')"
              >한국어</el-dropdown-item
            >
            <el-dropdown-item @click="changeLang('en')"
              >English</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <img class="MenuIcon" @click="leftMenuSwitch" :src="Menu" alt="" />
    </div>
  </div>
  <el-dialog v-model="LevingWebsite" title="Leving website" :width="dialogWidth" custom-class="WithdrawDialog" center :close-on-press-escape="false">
    <div class="dialogContent">
      <img :src="Version === 1 ? changeChain1 : changeChain2" alt="">
      <div class="changeChainText" v-if="Version === 1">
        you will leave the <span>dYdXDAO website</span> now 
        and please <span class="switch">switch</span> to OP wallet  
        when jump to the <span>Lucky hash website</span>
      </div>
      <div class="changeChainText" v-else>
        you will leave the <span>Lucky hash website</span> now
        and please <span class="switch">switch</span> to OP wallet
        when jump to the <span>dYdXDAO website</span>
      </div>
      <div class="ConnectWallet flexCenter">Connect Optimism wallet</div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.Header {
  max-width: 1400px;
  width: 100%;
  // margin: 0 13rem;
  box-sizing: border-box;
  height: 5.5rem;
  position: absolute;
  top: 2.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  @media (max-width: 1450px) {
    padding: 0 5rem;
  }
  @media (max-width: 767px) {
    height: 8.5rem;
  }
  .HeaderLeft {
    display: flex;
    align-items: center;
    .Logo {
      height: 30px;
      @media (max-width: 428px) {
        height: 28px;
      }
    }
    .HeaderLeftVersion{
      width: max-content;
      padding: 0 20px;
      height: 45px;
      background: #303044;
      border-radius: 11px;
      margin-left: 1rem;
      display: flex;
      align-items: center;
      position: relative;
      justify-content: center;
      font-size: 18px;
      color: #FFFFFF;
      @media (max-width: 768px) {
        display: none;
      }
      img{
        margin-left: 5px;
      }
    }
  }
  .HeaderRight {
    display: flex;
    align-items: center;
    .lang {
      cursor: pointer;
      margin-left: 38px;
    }
  }
  .connect {
    width: 9.5rem;
    height: 2.4rem;
    cursor: pointer;
    // background: linear-gradient(360deg, #299FEF 0%, #69C0FA 100%);
    border-radius: 0.55rem;
    margin-left: 1.5rem;
    font-size: 18px;
    line-height: 1rem;
    padding: 1px;
    .content {
      color: #6a6cfb;
      font-family: PingFang-Bold;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.55rem;
      width: 100%;
      height: 100%;
    }
    // .Connected {
    //   background: #27173a;
    // }
    @media (max-width: 1024px) {
      width: 12rem;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
  .Logo {
    height: 100%;
  }
  .MenuIcon {
    display: none;
    @media (max-width: 768px) {
      // width: 6rem;
      display: block;
    }
  }
  .menu {
    margin-left: 3.5rem;
    display: flex;
    @media (max-width: 768px) {
      // margin-left: 2.5rem;
      display: none;
    }
    .menuItem {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 3.75rem;
      font-family: PingFang-Regular;
      cursor: pointer;
      img {
        width: 18px;
        height: 18px;
        @media (max-width: 768px) {
          width: 2rem;
          height: 2rem;
        }
        @media (max-width: 428px) {
          width: 4rem;
          height: 4rem;
        }
      }
      span {
        font-size: 18px;
        line-height: 1;
        color: #ffffff;
        margin-left: 0.6rem;
        @media (max-width: 768px) {
          font-size: 2rem;
        }
        @media (max-width: 428px) {
          font-size: 2.5rem;
        }
      }
    }
    .ActiveMenuItem {
      span {
        color: #6966ff;
        font-family: PingFang-Bold;
      }
      .ActiveBorder {
        border-bottom: 1px solid #6966ff;
        width: 100%;
      }
    }
    .ActiveBorder {
      border: 1px solid transparent;
      width: 0px;
      transition: all 0.3s;
    }
    .blackFont {
      span {
        color: #3d3d3d;
      }
    }
  }
}
.VersionDowm{
      width: max-content;
      white-space:nowrap;
      padding: 0 20px;
      height: 63px;
      border-radius: 11px;
      background: #303044;
      color: #FFFFFF;
      font-size: 24px;
}
.dialogContent{
  display: flex;
  flex-direction: column;
  align-items: center;
  .changeChainText{
    font-family: PingFang-Regular;
    text-align: center;
    color: #FFFFFF;
    font-size: 20px;
    line-height: 2;
    max-width: 400px;
    margin-top: 24px;
    span{
      color: #6966FF;
      font-family: PingFang-Medium;
    }
    .switch{
      color: #FFFFFF;
      font-family: PingFang-Medium;
    }
  }
  .ConnectWallet{
    width: 100%;
    height: 60px;
    background: #6966FF;
    border-radius: 12px;
    color: #FFFFFF;
    font-size: 20px;
    font-family: PingFang-Bold;
    margin-top: 20px;
  }
}
.el-popper{
  z-index: 10 !important;
}
</style>
