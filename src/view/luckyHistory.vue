<template>
  <div class="luckyHistory">
    <div class="backTitle">
      <img src="../assets/Home/back.png" alt="">
      History
      <span></span>
    </div>
    <div class="HistoryBanner">
      <img src="../assets/Home/HistoryBanner.png" alt="">
    </div>
    <div class="luckyHistoryBox">
      <div class="luckyHistoryItem" v-for="item in 10">
        <div class="issue">2307010010</div>
        <div class="allBall"><div v-for="item in 10" :class="['Ball','flexCenter',{prize:item-1 === 9}]">{{item -1}}</div></div>
        <div class="time">12:22:33</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.backTitle{
  font-family: OPlusSansBold;
  padding-top: 10rem;
  font-weight: 900;
  font-size: 36px;
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 750px;
  margin: auto;
  @media (max-width:800px) {
        width: auto;
        margin:42px 25px;
  }
}
.HistoryBanner{
  display: flex;
  justify-content:center;
  margin-top: 40px;
}
.luckyHistoryBox{
  background: #1C1C28;
  border: 1px solid #28283B;
  border-radius: 25px;
  box-sizing: border-box;
  padding: 35px 45px;
  width: 750px;
  margin:40px auto;
  @media (max-width:800px) {
        width: auto;
        margin:42px 25px;
  }
  .luckyHistoryItem{
    display: flex;
    margin-bottom: 20px;
    .issue{
      color: #FFFFFF;
      font-size: 14px;
      font-family: PingFang-Regular;
    }
    .allBall{
      flex: 1;
      display: flex;
      justify-content: center;
      .Ball{
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #FFFFFF;
        color: #14141E;
        margin-right: 15px;
      }
      .prize{
        color: #FFFFFF;
        background: #6966FF;
      }
      .Ball:nth-last-of-type(1){
        margin-right: 0;
      }
    }
    .time{
      color: #FFFFFF;
      font-size: 14px;
    }
  }
  .luckyHistoryItem:nth-last-of-type(1){
    margin-bottom: 0;
  }
}
</style>