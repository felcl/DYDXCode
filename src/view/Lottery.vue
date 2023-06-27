<script setup>
import {ref, onMounted,nextTick } from 'vue'
const TabRows = ref(null)
const Table = ref(null)
const MaxWidth = ref(0)
const WidthArr = ref([])
onMounted(() => {
    nextTick(()=>{
        let widthArr = []
        console.log(Table.value.scrollWidth)
        MaxWidth.value = Table.value.scrollWidth
        TabRows.value.forEach(Dom=>{
            [...Dom.children].forEach((child,index)=>{
                if(!widthArr[index] || widthArr[index] < child.clientWidth){
                    widthArr[index] = child.clientWidth
                }
            })
        })
        WidthArr.value = widthArr
    })
})
</script>

<template>
  <div class="Lottery">
    <div class="countdown">
        Next round in：<span>00:01:59</span>
    </div>
    <div class="LotteryBanner">
        <img src="../assets/Home/LotteryBanner.png" alt="">
    </div>
    <div class="pool">
        <div class="poolTab">
            <div class="TabItem flexCenter ActiveTab">ABC POOL</div>
            <div class="TabItem flexCenter">EFG POOL</div>
        </div>
        <div class="poolRow">
            <div class="poolItem">1</div>
            <div class="poolItem">2</div>
            <div class="poolItem">3</div>
            <div class="poolItem">4</div>
            <div class="poolItem">5</div>
        </div>
        <div class="poolRow">
            <div class="poolItem">6</div>
            <div class="poolItem">7</div>
            <div class="poolItem">8</div>
            <div class="poolItem">9</div>
        </div>
        <div class="PutRow">
            <input type="text">
            <div class="Token">ABC</div>
        </div>
        <div class="Submit flexCenter">Submit</div>
    </div>
    <div class="HistoryTitle">History</div>
    <div class="LotteryHistory">
        <div class="HistoryTop">Round / result / tatus / Quantity / Time / Earn</div>
        <div class="slideBox" ref="Table">
            <div class="HistoryRow" v-for="(item,index) in 10" ref="TabRows">
                <div class="HistoryColumn" :style="{width:WidthArr[0] ? WidthArr[0]+'px' : 'auto'}">2307010001</div>
                <div class="HistoryColumn" :style="{width:WidthArr[1] ? WidthArr[1]+'px' : 'auto'}">9-9</div>
                <div class="HistoryColumn" :style="{width:WidthArr[2] ? WidthArr[2]+'px' : 'auto'}">Win</div>
                <div class="HistoryColumn" :style="{width:WidthArr[3] ? WidthArr[3]+'px' : 'auto'}">$ <span v-for="val in item">12</span></div>
                <div class="HistoryColumn" :style="{width:WidthArr[4] ? WidthArr[4]+'px' : 'auto'}">12:22:33</div>
                <div class="HistoryColumn" :style="{width:WidthArr[5] ? WidthArr[5]+'px' : 'auto'}">$ <span v-for="val in 11-item">12</span></div>
            </div>
        </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.countdown{
    font-family: OPlusSansBold;
    padding-top: 10rem;
    font-weight: 900;
    font-size: 36px;
    color: #FFFFFF;
    text-align: center;
    @media (max-width:767px) {
        padding-top: 20rem;
    }
    @media (max-width:767px) {
        font-size: 22px;
    }
    span{
        color: #6966FF;
    }
}
.LotteryBanner{
    text-align: center;
    img{
        max-width: 100%;
    }
}
.pool{
    border: 1px solid #28283B;
    background: #1C1C28;
    width: 750px;
    min-height: 200px;
    margin:42px auto 0;
    border-radius: 25px;
    overflow: hidden;
    @media (max-width:800px) {
        width: auto;
        margin:42px 25px 0;
    }
    .poolTab{
        background: #151522;
        display: flex;
        height: 60px;
        margin-bottom: 50px;
        @media (max-width:500px) {
            height: 45px;
        }
        .TabItem{
            flex: 1;
            color: #28283B;
        }
        .ActiveTab{
            background: #6966FF;
            box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.2);
            border-radius: 25px 0px 25px 0px;
            color: #FFFFFF;
        }
    }
    .poolRow{
        display: flex;
        justify-content: center;
        margin-bottom: 23px;
        .poolItem{
            width: 72px;
            height: 72px;
            border: 1px solid #767676;
            background: #151522;
            border-radius: 12px;
            margin-right: 35px;
            font-size: 50px;
            color: #767676;
            display: flex;
            align-items: center;
            justify-content: center;
            @media (max-width:600px) {
                width: 50px;
                height: 50px;
                font-size: 36px;
                margin-right: 20px;
            }
            @media (max-width:450px) {
                width: 40px;
                height: 40px;
                font-size: 22px;
                // margin-right: 20px;
            }
            @media (max-width:320px) {
                width: 35px;
                height: 35px;
                font-size: 18px;
                margin-right: 15px;
            }
        }
        .poolItem:nth-last-of-type(1){
            margin-right: 0;
        }
    }
    .PutRow{
        max-width: 550px;
        height: 55px;
        margin:32px auto 0;
        background: #393955;
        border: 0px solid #000000;
        box-sizing: border-box;
        border-radius: 15px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        @media (max-width:600px) {
            margin: 0 25px;
        }
        @media (max-width:500px) {
            height: 40px;
        }
        input{
            flex: 1;
            width: 100%;
            border: none;
            outline: none;
            background:transparent;
            height: 100%;
            color: #767676;
            font-size: 30px;
            font-family: PingFang-Regular;
            @media (max-width:500px) {
                font-size: 22px;
            }
        }
        .Token{
            color: #AAAAAA;
            font-size: 26px;
            font-family: PingFang-Regular;
            @media (max-width:500px) {
                font-size: 18px;
            }
        }
    }
    .Submit{
        width: 250px;
        height: 60px;
        border-radius: 10px;
        margin:50px auto 45px;
        background: #6966FF;
        font-family: PingFang-Bold;
        color: #FFFFFF;
        font-size: 20px;
        @media (max-width:500px) {
            height: 45px;
        }
    }
}
.HistoryTitle{
    color: #FFFFFF;
    text-align: center;
    font-size: 26px;
    font-family: PingFang-Bold;
    margin:  31px 0 10px;
}
.LotteryHistory{
    width: 750px;
    margin:38px auto 0;
    background: #1C1C28;
    border: 1px solid #28283B;
    border-radius: 25px;
    overflow: hidden;
    @media (max-width:800px) {
        width: auto;
        margin:42px 25px 0;
    }
    .HistoryTop{
        height: 60px;
        border-bottom: 1px solid #28283B;
        padding: 0 45px;
        display: flex;
        align-items: center;
        color: #767676;
        font-size: 16px;
        font-family: PingFang-Medium;
        background: #151522;
        overflow-x: auto;
        @media (max-width:500px) {
            font-size: 14px;
            padding: 0 25px;
        }
        @media (max-width:450px) {
            font-size: 12px;
        }
    }
    .slideBox{
        overflow-x: auto;
        padding: 30px 0;
        margin: 0 45px;
        @media (max-width:700px) {
            margin: 0 20px 25px;
        }
    }
    .HistoryRow{
        margin: 0 0 25px;
        display: flex;
        justify-content: space-between;
        @media (max-width:700px) {
            margin: 0 0 25px;
        }
        @media (max-width:600px) {
            // min-width: 120%;
            // width: max-content;
        }
    }
    .HistoryRow:nth-last-of-type(1){
        @media (max-width:700px) {
            margin: 0;
        }
    }
    .HistoryColumn{
        white-space:nowrap;
        margin: 0 15px;
        flex-shrink: 0;
    }
    .HistoryColumn:nth-of-type(1){
        color: #FFFFFF;
        font-family: PingFang-Regular;
        @media (max-width:600px) {
            // width: 80px;
        }

    }
    .HistoryColumn:nth-of-type(2){
        color: #6966FF;
        font-family: PingFang-Bold;
        @media (max-width:600px) {
            // width: 50px;
        }
    }
    .HistoryColumn:nth-of-type(3){
        color: #1FB51A;
        font-family: PingFang-Bold;
        @media (max-width:600px) {
            // width: 50px;
        }
    }
    .HistoryColumn:nth-of-type(4){
        color: #FFFFFF;
        font-family: PingFang-Regular;
        @media (max-width:600px) {
            // flex: 1;
            // margin-right: 20px;
        }
    }
    .HistoryColumn:nth-of-type(5){
        color: #FFFFFF;
        font-family: PingFang-Regular;
        @media (max-width:600px) {
            // width: 80px;
        }
    }
    .HistoryColumn:nth-of-type(6){
        color: #FFFFFF;
        font-family: PingFang-Regular;
        @media (max-width:600px) {
            // flex: 1;
            // margin-left: 20px;
        }
    }
}
</style>