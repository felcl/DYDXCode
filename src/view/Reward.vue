<script setup>
import {onMounted , ref , watch , computed} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import Axios from '../axios';
import {dateFormat} from "../utils/tool";
import { useStore } from "vuex";
const store = useStore();
const route = useRoute()
const router = useRouter()
const type = ref('dYdX')
const tabVal = ref('Stake')
const RewardList = ref([])
const RewardPage = ref(1)
const StakeList = ref([])
const AwardList = ref([])
const TreasuryList = ref([])
const typeMap = {
    dYdX:1,
    SVIP:2
}
const rewardTypeMap = {
    dYdX:2,
    SVIP:3
}
const token = computed(() => {
  return store.state.token;
});
watch(token,(token)=>{
    if(token){
        Axios.get(`/dao/rewardDetail/${typeMap[type.value]}/${RewardPage.value}/20`).then(res=>{
            RewardList.value = res.data.data
            // console.log(res,"收益记录")
        })
        Axios.get(`/dao/stakeRecord/${typeMap[type.value]}`).then(res=>{
            StakeList.value = res.data.data
            // console.log(res,"质押记录")
        })
        Axios.get(`/dao/reward/${rewardTypeMap[type.value]}`).then(res=>{
            AwardList.value = res.data.data
            // console.log(res,"邀请奖励")
        })
        if(type.value === 'SVIP'){
            Axios.get(`/dao/reward/4`).then(res=>{
                TreasuryList.value = res.data.data
                // console.log(res,"国库奖励")
            })
        }
    }
})
function scrollEvent() {
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
    if(scrollTop+windowHeight>=scrollHeight){   //考虑到滚动的位置一般可能会大于一点可滚动的高度，所以这里不能用等于
        // console.log("到达底部")
    }   
}
onMounted(()=>{
    if(route.query.type){
        type.value = route.query.type
    }
    window.onscroll = scrollEvent
    if(token.value){
        Axios.get(`/dao/rewardDetail/${typeMap[type.value]}`).then(res=>{
            RewardList.value = res.data.data
            // console.log(res,"收益记录")
        })
        Axios.get(`/dao/stakeRecord/${typeMap[type.value]}`).then(res=>{
            StakeList.value = res.data.data
            // console.log(res,"质押记录")
        })
        Axios.get(`/dao/reward/${rewardTypeMap[type.value]}`).then(res=>{
            AwardList.value = res.data.data
            // console.log(res,"邀请奖励")
        })
        if(type.value === 'SVIP'){
            Axios.get(`/dao/reward/4`).then(res=>{
                TreasuryList.value = res.data.data
                // console.log(res,"国库奖励")
            })
        }
    }
    
})
</script>
<!-- 收益记录 -->
<template>
  <div class="Reward">
    <div class="RewardHead">
        <img src="../assets/Home/back.png" @click="router.go(-1)" alt="">
        <div>
            <div class="StakeTitle">{{ type }} {{ $t('rewards') }}</div>
            <!-- <div class="StakeSubTitle">Track your MATIC staking rewards with ARB</div> -->
        </div>
        <div>
        </div>
    </div>

    <div class="Tabs">
      <div
        class="tabItem flexCenter"
        :class="{ active: tabVal === 'Stake' }"
        @click="tabVal = 'Stake'"
      >
        {{ $t('Stake') }}
      </div>
      <div
        class="tabItem flexCenter"
        :class="{ active: tabVal === 'Income' }"
        @click="tabVal = 'Income'"
      >
        {{ $t('Income') }}
      </div>
      <div
        class="tabItem flexCenter"
        :class="{ active: tabVal === 'Award' }"
        @click="tabVal = 'Award'"
      >
        {{ $t('Award') }}
      </div>
      <div
        class="tabItem flexCenter"
        v-if="type === 'SVIP'"
        :class="{ active: tabVal === 'Treasury' }"
        @click="tabVal = 'Treasury'"
      >
        {{ $t('Treasury') }}
      </div>
    </div>
    <div class="RewardBox">
        <template v-if="tabVal === 'Stake'">
            <template v-if="StakeList.length !== 0">
                <div class="RewardRow" v-for="item in StakeList">
                    <span class="num">+{{ item.buyAmount }}</span>
                    <span class="time">{{ dateFormat('YYYY/mm/dd HH:MM:SS',new Date(item.createTime)) }}</span>
                </div>
            </template>
            <el-empty v-else description="description" />
        </template>
        <template v-if="tabVal === 'Income'">
            <template v-if="RewardList.length !== 0">
                <div class="RewardRow" v-for="item in RewardList">
                    <span class="num">+{{ item.rewardArb }}</span>
                    <span class="time">{{ dateFormat('YYYY/mm/dd HH:MM:SS',new Date(item.createTime)) }}</span>
                </div>
            </template>
            <el-empty v-else description="description" />
            <div class="loading" v-if="RewardList.length >=20">loading...</div>
        </template>
        <template v-if="tabVal === 'Award'">
            <template v-if="AwardList.length !== 0">
                <div class="RewardRow" v-for="item in AwardList">
                    <span class="num">+{{ item.refereeUserReward }}</span>
                    <span class="time">{{ dateFormat('YYYY/mm/dd HH:MM:SS',new Date(item.createTime)) }}</span>
                </div>
            </template>
            <el-empty v-else description="description" />
        </template>
        <template v-if="tabVal === 'Treasury' && type === 'SVIP'">
            <template v-if="TreasuryList.length !== 0">
                <div class="RewardRow" v-for="item in TreasuryList">
                    <span class="num">+{{ item.refereeUserReward }}</span>
                    <span class="time">{{ dateFormat('YYYY/mm/dd HH:MM:SS',new Date(item.createTime)) }}</span>
                </div>
            </template>
            <el-empty v-else description="description" />
        </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.Tabs{
        width: 420px;
        height: 64px;
        background: #28283B;
        border-radius: 32px;
        box-sizing: border-box;
        padding: 5px 7px;
        margin-top: 20px;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        // transform: scale(0.7);
        @media (max-width:500px) {
            width: 260px;
            height: 48px;
        }
        .tabItem{
            cursor: pointer;
            width: 118px;
            height: 54px;
            color: #767676;
            font-family: PingFang-Regular;
            font-size: 20px;
            border-radius: 32px;
            @media (max-width:500px) {
                font-size: 14px;
                width:82px;
                height: 38px;
            }
        }
        .active{
            font-family: PingFang-Bold;
            background: #6966FF;
            color: #fff;
        }
    }
.Reward{
    // background: #14141E;
    padding-top: 10rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    min-height: 100vh;
    @media (max-width:767px) {
        padding-top: 20rem;
    }
    .RewardHead{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 750px;
        margin:0 auto 42px;
        img{
            height: 20px;
        }
        @media (max-width:768px) {
            width: 95%;
        }
    }
    .StakeTitle{
        font-size: 2rem;
        line-height: 1;
        font-family: OPlusSansRegular;
        font-weight: 900;
        color: #fff;
        text-align: center;
        
        @media (max-width:1024px) {
            font-size: 3rem;
        }
        @media (max-width:428px) {
            font-size: 5rem;
        }
    }
    .StakeSubTitle{
        font-size: 14px;
        line-height: 1;
        color: #282828;
        text-align: center;
        margin: 8px 0 18px;
        @media (max-width:428px) {
            font-size: 12px;
        }
    }
    .RewardBox{
        width: 750px;
        // margin: auto;
        background: #28283B;
        box-shadow: 0px 3px 20px 0px rgba(0,0,0,0.1);
        border-radius: 1.25rem;
        padding:24px 50px;
        box-sizing: border-box;
        position: relative;
        @media (max-width:768px) {
            width: 95%;
            padding: 20px;
        }
        .RewardRow{
            display: flex;
            justify-content: space-between;
            margin-bottom: 17px;
            .num{
                color: #49DE3D;
                font-size: 14px;
                font-family: PingFang-Medium;
            }
            .time{
                color: #fff;
                font-size: 14px;
                font-family: PingFang-Medium;
            }
        }
        .RewardRow:nth-last-child(1){
            margin-bottom: 0;
        }
        .loading{
            color: #fff;
            text-align: center;
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}

</style>