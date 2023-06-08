<template>
  <div class="Team">
    <div class="TeamHeader">
      <img src="../assets/Home/back.png" @click="router.go(-1)" alt="" />
      <div>{{ $t('team') }}</div>
      <div></div>
    </div>
    <div class="TeamInfo">
      <div class="totalNumperformance">
        <div class="TeamInfoItem">
          <div class="totalLabel">{{ $t('Totalpeople') }}</div>
          <div class="totalNum">{{ invitelist.length }}</div>
        </div>
        <div class="TeamInfoItem">
          <div class="totalLabel">{{ $t('Efficient') }}</div>
          <div class="totalNum">${{ InvitationrecordInfo ? InvitationrecordInfo.teamAmount : 0 }}</div>
        </div>
        <div class="TeamInfoItem">
          <div class="totalLabel">{{ $t('Allteam') }}</div>
          <div class="totalNum">${{ InvitationrecordInfo ? InvitationrecordInfo.allTeamAmount : 0 }}</div>
        </div>
      </div>
      <div class="InviteUrl">
        {{AddrHandle(inviteUrl , 11 , 11)}}
        <img src="../assets/Home/copy.png" alt="" />
      </div>
      <div class="recordList">
        <div class="recordLabel">{{ $t('Invitationrecord') }}</div>
        <div class="recordItem superior" >
          <span class="address">{{InvitationrecordInfo ? AddrHandle(InvitationrecordInfo.refereeUserAddress,6,6)+'（'+$t('InvitePeople')+'）' : ''}}</span>
          <span>{{InvitationrecordInfo ? dateFormat('YYYY/mm/dd HH:MM:SS',new Date(InvitationrecordInfo.bindTime)) : ''}}</span>
        </div>
        <div class="recordItem" v-for="item in invitelist">
          <span class="address">{{AddrHandle(item.userAddress,6,6)}} <img src="../assets/Home/Rj.png" v-if="item.isPledge === 1" alt=""></span>
          <span>{{dateFormat('YYYY/mm/dd HH:MM:SS',new Date(item.createTime))}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import Axios from '../axios'
import {useRouter} from 'vue-router'
import { ref, computed, watch } from "vue";
import {AddrHandle , dateFormat} from '../utils/tool'
const router = useRouter()
const store = useStore();
const invitelist = ref([])
const inviteUrl = ref('')
const InvitationrecordInfo = ref(null)
const token = computed(() => {
  return store.state.token;
});
const address = computed(() => {
  return store.state.address;
});
watch(address,(address)=>{
    // console.log(location)
    inviteUrl.value = location.origin+location.pathname+'#/?address='+address
},{
    immediate:true
})
watch(
  token,
  (token) => {
    if (token) {
      Axios.get("/dao/userReferee").then((res) => {
        if (res.data.code === 200) {
          invitelist.value = res.data.data;
        }
        // console.log(res, "用户邀请记录");
      });
      Axios.get("/uUser/teamAndReferee").then((res) => {
        if (res.data.code === 200) {
          InvitationrecordInfo.value = res.data.data;
        }
        // console.log(res, "用户上级");
      });
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.Team {
  background: linear-gradient(135deg, #2A3D8F 0%, #9037A2 100%);
  padding-top: 10rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  min-height: 100vh;
  @media (max-width: 767px) {
    padding-top: 20rem;
  }
  .TeamHeader {
    width: 750px;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    color: #fff;
    align-items: center;
    @media (max-width:750px) {
      width: 95%;
    }
    img {
      height: 20px;
    }
  }
  .TeamInfo {
    width: 750px;
    overflow: hidden;
    margin-top: 50px;
    border-radius: 50px;
    background: url(../assets/Home/DaoBg.png) no-repeat center 0 / 100%;
    text-align: center;
    @media (max-width:750px) {
      width: 95%;
    }
    .totalNumperformance{
      display: flex;
      justify-content: center;
      .TeamInfoItem{
        width: 30%;
      }
    }
    .totalLabel {
      font-size: 14px;
      color: #ffffff;
      margin-top: 25px;
    }
    .totalNum {
      font-size: 40px;
      font-weight: 500;
      color: #ffffff;
      margin-top: 7px;
      @media (max-width:768px) {
        font-size: 30px;
      }
      @media (max-width:500px) {
        font-size: 20px;
      }
    }
    .InviteUrl {
      font-weight: 500;
      color: #ffffff;
      font-size: 18px;
      margin-top: 8px;
      margin-bottom: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 20px;
        margin-left: 20px;
      }
    }
    .recordList {
      width: 100%;
      min-height: 500px;
      overflow:auto;
      border-radius: 50px;
      background: #3E2470;
      padding: 35px 30px;
      box-sizing: border-box;
      .recordLabel {
        font-weight: 400;
        color: #fff;
        font-size: 14px;
        text-align: left;
      }
      .recordItem {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
        span {
          font-weight: 400;
          color: #fff;
          font-size: 14px;
        }
        .address {
          color: #fff;
          font-size: 16px;
          img{
            margin-left: 16px;
          }
        }
      }
      .superior{
        margin-bottom: 26px;
      }
    }
  }
}
</style>
