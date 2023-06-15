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
        <div class="separate"></div>
        <div class="TeamInfoItem">
          <div class="totalLabel">{{ $t('Efficient') }}</div>
          <div class="totalNum">${{ InvitationrecordInfo ? InvitationrecordInfo.teamAmount : 0 }}</div>
        </div>
        <div class="separate"></div>
        <div class="TeamInfoItem">
          <div class="totalLabel">{{ $t('Allteam') }}</div>
          <div class="totalNum">${{ InvitationrecordInfo ? InvitationrecordInfo.allTeamAmount : 0 }}</div>
        </div>
      </div>
      <div class="InviteUrl">
        <div class="whoMe">
          <div class="label">who invited me：</div>
          <div class="value">{{ InvitationrecordInfo ? AddrHandle(InvitationrecordInfo.refereeUserAddress,6,6):'' }}</div>
        </div>
        <div class="whoMe whoMejf">
          <div class="whoMeLeft">
            <div class="label">My invitation link：</div>
            <div class="value">{{ AddrHandle(inviteUrl,11,11) }}<img src="../assets/Home/copy.png" alt="" /></div>
          </div>
          <div class="Invite">Invite</div>
        </div>
      </div>
    </div>
    <div class="recordLable">Invitation record</div>
    <div class="recordList">
      <!-- <div class="recordLabel">{{ $t('Invitationrecord') }}</div>
      <div class="recordItem superior" >
        <span class="address">{{InvitationrecordInfo ? AddrHandle(InvitationrecordInfo.refereeUserAddress,6,6)+'（'+$t('InvitePeople')+'）' : ''}}</span>
        <span>{{InvitationrecordInfo ? dateFormat('YYYY/mm/dd HH:MM:SS',new Date(InvitationrecordInfo.bindTime)) : ''}}</span>
      </div> -->
      <template v-if="invitelist.length !==0">
        <div class="recordItem" v-for="item in invitelist">
          <span class="address">{{AddrHandle(item.userAddress,6,6)}} <img src="../assets/Home/Rj.png" v-if="item.isPledge === 1" alt=""></span>
          <span>{{dateFormat('YYYY/mm/dd HH:MM:SS',new Date(item.createTime))}}</span>
        </div>
      </template>
      <el-empty v-else description="description" />
     
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
  // background: #14141E;
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
    font-size: 35px;
    color: #fff;
    align-items: center;
    font-family: OPlusSansRegular;
    font-weight: 900;
    @media (max-width:750px) {
      width: 95%;
      font-size: 30px;
    }
    img {
      height: 20px;
    }
  }
  .TeamInfo {
    width: 750px;
    overflow: hidden;
    margin-top: 50px;
    border-radius: 1.25rem;
    // background: url(../assets/Home/DaoBg.png) no-repeat center 0 / 100%;
    background: #151522;
    border: 1px solid #28283B;
    text-align: center;
    @media (max-width:750px) {
      width: 95%;
    }
    .totalNumperformance{
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #28283B;
      margin: 0 25px;
      padding: 0 20px;
      @media (max-width:600px) {
        margin: 0 15px;
        padding: 0 10px;
      }
      .separate{
        height: 65px;
        border-left: 1px solid #28283B;
        margin: 0 25px;
        @media (max-width:600px) {
          margin: 0 15px;
        }
      }
      .TeamInfoItem{
        flex: 1;
      }
    }
    .totalLabel {
      font-size: 16px;
      color: #767676;
      margin-top: 38px;
      font-family: PingFang-Regular;
      text-align: left;
    }
    .totalNum {
      font-size: 35px;
      font-family: PingFang-Bold;
      color: #6966FF;
      text-align: left;
      line-height: 1;
      margin: 13px 0 34px;
      @media (max-width:768px) {
        font-size: 30px;
      }
      @media (max-width:500px) {
        font-size: 20px;
      }
    }
    .InviteUrl {
      font-weight: 500;
      margin: 0 25px;
      padding: 0 20px;
      color: #ffffff;
      font-size: 18px;
      // margin-top: 8px;
      // margin-bottom: 50px;
      height: 130px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      @media (max-width:700px) {
        margin: 0 15px;
        padding: 0 10px;
      }
      @media (max-width:500px) {
        margin: 0 10px;
        padding: 0 5px;
      }
      .whoMejf{
        justify-content: space-between;
      }
      .whoMe{
        display: flex;
        align-items: center;
        .whoMeLeft{
          display: flex;
          align-items: center;
          @media (max-width:600px) {
            flex-direction: column;
            align-items:flex-start;
          }
        }
        .label{
          color: #767676;
          font-size: 16px;
          text-align: left;
          font-family: PingFang-Heavy;
        }
        .value{
          display: flex;
          font-family: PingFang-Regular;
          align-items: center;
        }
        .Invite{
          font-size: 20px;
          font-family: PingFang-Bold;
          border-radius: 12px;
          padding: 8px 50px;
          background: #6966FF;
          @media (max-width:700px) {
            padding: 8px 20px;
            font-size: 16px;
            border-radius: 8px;
          }
          @media (max-width:500px) {
            padding: 5px 10px;
          }
        }
      }
      .whoMe:nth-child(1){
        margin-bottom: 25px;
      }
      img {
        width: 20px;
        margin-left: 20px;
      }
    }
  }
  .recordLable{
    width: 750px;
    margin:22px auto 16px;
    color: #FFFFFF;
    font-size: 26px;
    font-family: PingFang-Bold;
    @media (max-width:750px) {
      width: 95%;
    }
  }
  .recordList {
      width: 750px;
      overflow:auto;
      border-radius: 50px;
      background: #1C1C28;
      padding: 35px 30px;
      box-sizing: border-box;
      border: 1px solid #28283B;
      border-radius: 1.25rem;
      margin:0 auto 100px;
      @media (max-width:750px) {
        width: 95%;
      }
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
          font-family: PingFang-Regular;
          font-size: 14px;
        }
        .address {
          color: #fff;
          font-family: PingFang-Regular;
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
</style>
