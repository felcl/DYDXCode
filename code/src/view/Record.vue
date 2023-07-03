<script setup>
import {onMounted , ref , watch , computed} from 'vue'
import {useRouter} from 'vue-router'
import {dateFormat,AddrHandle} from "../utils/tool";
import { useStore } from "vuex";
import Axios from '../axios';
const store = useStore();
const router = useRouter()
const RecordList = ref([])
const token = computed(() => {
  return store.state.token;
});
watch(token,(token)=>{
if(token){
    Axios.get(`/dao/drawDetail`).then(res=>{
        RecordList.value = res.data.data
        // console.log(res,"提现记录")
    })
}
},{
    immediate:true
})
function goPath(path){
    router.push(path)
}
</script>

<template>
    <div class="Record">
        <div class="RecordHeader">
            <img src="../assets/Home/back.png" @click="router.go(-1)" alt="">
            <div>{{ $t('Withdrawalsrecord') }}</div>
            <div></div>
        </div>
        <!-- <div class="subTitle">Track your MATIC staking rewards with ARB</div> -->
        <div class="RecordList">
            <template v-if="RecordList.length > 0">
                <div class="RecordItem" v-for="item in RecordList">
                    <div class="address">{{ AddrHandle(item.userAddress,6,6) }}</div>
                    <div class="numTime">
                        <div class="num">{{ item.drawAmount }}</div>
                        <div class="time">{{ dateFormat('YYYY/mm/dd HH:MM:SS',new Date(item.createTime)) }}</div>
                    </div>
                </div>
            </template>
            <el-empty v-else description="description" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.Record{
    // background: linear-gradient(135deg, #2A3D8F 0%, #9037A2 100%);
    padding-top: 10rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    min-height: 100vh;
    @media (max-width:767px) {
        padding-top: 20rem;
    }
    .RecordHeader{
        width: 750px;
        display: flex;
        justify-content: space-between;
        font-size: 30px;
        font-family: OPlusSansRegular;
        font-weight: 900;
        color: #FFFFFF;
        align-items: center;
        @media (max-width:800px) {
            width: calc(100% - 50px);
        }
        img{
            height: 20px;
        }
    }
    .subTitle{
        color: #262626;
        font-size: 14px;text-align: center;
    }
    .RecordList{
        border-radius: 1.25rem;
        padding: 38px 30px;
        box-sizing: border-box;
        // height: 808px;
        box-shadow: 0px 3px 20px 0px rgba(0,0,0,0.1);
        background: #28283B;
        width: 750px;
        margin-top: 20px;
        @media (max-width:800px) {
            width: calc(100% - 50px);
            margin: 20px 25px 0;
        }
        .RecordItem{
            display: flex;
            align-items: center;
            justify-content:space-between;
            .address{
                font-family: PingFang-Regular;
                color: #FFFFFF;
                font-size: 16px;
            }
            .numTime{
                text-align: right;
                .num{
                    font-size: 14px;
                    color: #6966FF;
                    font-family: PingFang-Bold; 
                }
                .time{
                    font-family: PingFang-Regular;
                    font-size: 14px;
                    color: #FFFFFF;
                }
            }
        }
    }
}
</style>