<script setup>
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
        <div class="HistoryRow">
            <div class="HistoryColumn">2307010001</div>
            <div class="HistoryColumn">9-9</div>
            <div class="HistoryColumn">Win</div>
            <div class="HistoryColumn">$ 13413.2568</div>
            <div class="HistoryColumn">12:22:33</div>
            <div class="HistoryColumn">$ 13413.2568</div>
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
    span{
        color: #6966FF;
    }
}
.LotteryBanner{
    text-align: center;
}
.pool{
    border: 1px solid #28283B;
    background: #1C1C28;
    width: 750px;
    min-height: 200px;
    margin:42px auto 0;
    border-radius: 25px;
    overflow: hidden;
    .poolTab{
        background: #151522;
        display: flex;
        height: 60px;
        margin-bottom: 50px;
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
        input{
            flex: 1;
            border: none;
            outline: none;
            background:transparent;
            height: 100%;
            color: #767676;
            font-size: 30px;
            font-family: PingFang-Regular;
        }
        .Token{
            color: #AAAAAA;
            font-size: 26px;
            font-family: PingFang-Regular;
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
    padding-bottom: 30px;
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
        margin-bottom: 30px;
    }
    .HistoryRow{
        margin: 0 45px 25px;
        display: flex;
        justify-content: space-between;
    }
    .HistoryRow:nth-last-of-type(1){
        margin: 0 45px;
    }
    .HistoryColumn:nth-of-type(1){
        color: #FFFFFF;
        font-family: PingFang-Regular;
    }
    .HistoryColumn:nth-of-type(2){
        color: #6966FF;
        font-family: PingFang-Bold;
    }
    .HistoryColumn:nth-of-type(3){
        color: #1FB51A;
        font-family: PingFang-Bold;
    }
    .HistoryColumn:nth-of-type(4){
        color: #FFFFFF;
        font-family: PingFang-Regular;
    }
    .HistoryColumn:nth-of-type(5){
        color: #FFFFFF;
        font-family: PingFang-Regular;
    }
    .HistoryColumn:nth-of-type(6){
        color: #FFFFFF;
        font-family: PingFang-Regular;
    }
}
</style>