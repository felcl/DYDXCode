<script setup>
import { ref, onMounted } from "vue";
let dialogWidth = ref("680px")
const WithdrawVisible = ref(false)
const RechargeVisible = ref(false)
const inWithdraw = ref(false)
const inRecharge = ref(false)
onMounted(()=>{
  setDialogWidth()
  window.onresize = () => {
    setDialogWidth()
  }
})
let setDialogWidth = (()=>{
  let val = document.body.clientWidth
  const def = 680 // 默认宽度
  if (val < def) {
    dialogWidth.value = '95%'
  } else {
    dialogWidth.value = def + 'px'
  }
})
const tableData = [
  {},
  {},
  {},
  {},
  {},
  {},
]
</script>

<template>
  <div class="Wallet">
    <div class="WalletTitle">Wallet</div>
    <div class="Balance">
      <div class="BalanceLabel">Balance</div>
      <div class="amount">$ 22222222</div>
      <div class="btnRow">
        <div class="btn flexCenter" :style="{'background':'#6966FF',color:'#fff'}" @click="WithdrawVisible = true">Withdraw</div>
        <div class="btn flexCenter" @click="RechargeVisible = true">Recharge</div>
      </div>
    </div>
    <div class="HistoryTitle">History</div>
    <div class="LotteryHistory">
        <div class="HistoryTop">Token / Status / Quantity / Time</div>
        <!-- <div class="slideBox">
          <div class="HistoryRow" v-for="item in 10">
              <div class="HistoryColumn">
                <div class="TokenIcon"></div>
                OP
              </div>
              <div class="HistoryColumn">Withdraw</div>
              <div class="HistoryColumn">$ 13413.2568</div>
              <div class="HistoryColumn">2022/02/22 12:22:33</div>
          </div>
        </div> -->
        <el-table :data="tableData" style="width: 100%" :show-header="false">
          <el-table-column width="120">
            <template #default>
              <div class="flexCenter">
                <div class="TokenIcon"></div>
                OP
              </div>
            </template>
          </el-table-column>
          <el-table-column width="100">
            <template #default>
              Withdraw
            </template>
          </el-table-column>
          <el-table-column width="170">
            <template #default>
              $ 13413.2568
            </template>
          </el-table-column>
          <el-table-column width="170">
            <template #default>
              2022/02/22 12:22:33
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
  <el-dialog v-model="WithdrawVisible" :title="$t('Withdraw')" :width="dialogWidth" custom-class="WithdrawDialog" center :close-on-press-escape="false">
      <div class="balanceLabel">{{$t('Balance')}}：$ 100</div>
      <div class="putSel">
        <div class="put">
          <input type="text" placeholder="Enter the withdrawal amount">
          <span>MAX</span>
        </div>
        <el-dropdown trigger="click">
          <div class="sel">
            <div class="TokenIcon"></div>
            <div class="TokenName">OP</div>
            <img src="../assets/Home/arrow.png" alt="">
          </div>
          <template #dropdown>
            <div class="SelList">
              <div class="SelItem">
                <div class="TokenIcon"></div>
                <div class="TokenName">ABC</div>
              </div>
            </div>
          </template>
        </el-dropdown>
      </div>
      <div class="enter Disabled" @click="Withdraw">
        <svg viewBox="25 25 50 50" v-if="inWithdraw">
            <circle cx="50" cy="50" r="20"></circle>
        </svg>
        {{ $t('Confirm') }}</div>
  </el-dialog>
  <el-dialog v-model="RechargeVisible" title="Recharge" :width="dialogWidth" custom-class="WithdrawDialog" center :close-on-press-escape="false">
      <div class="balanceLabel">{{$t('Balance')}}：$ 100</div>
      <div class="putSel">
        <div class="put">
          <input type="text" placeholder="Enter the recharge amount">
          <span>MAX</span>
        </div>
        <el-dropdown trigger="click">
          <div class="sel">
            <div class="TokenIcon"></div>
            <div class="TokenName">OP</div>
            <img src="../assets/Home/arrow.png" alt="">
          </div>
          <template #dropdown>
            <div class="SelList">
              <div class="SelItem">
                <div class="TokenIcon"></div>
                <div class="TokenName">ABC</div>
              </div>
            </div>
          </template>
        </el-dropdown>
      </div>
      <div class="enter Disabled" @click="Recharge">
        <svg viewBox="25 25 50 50" v-if="inRecharge">
            <circle cx="50" cy="50" r="20"></circle>
        </svg>
        {{ $t('Confirm') }}</div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.WalletTitle{
  font-family: OPlusSansBold;
  padding-top: 10rem;
  font-weight: 900;
  font-size: 36px;
  color: #FFFFFF;
  text-align: center;
  @media (max-width:767px) {
      padding-top: 20rem;
  }
}
.Balance{
  width: 750px;
  padding: 45px;
  box-sizing: border-box;
  background: url(../assets//Home/WalletBg.png) no-repeat center center;
  margin: 40px auto 0;
  border-radius: 25px;
  overflow: hidden;
  @media (max-width:800px) {
    width: auto;
    margin: 40px 25px 0;
  }
  @media (max-width:500px) {
    padding: 25px;
  }
  .BalanceLabel{
    color: #767676;
    font-size: 18px;
    font-family: PingFang-Regular;
    line-height: 1;
    @media (max-width:500px) {
      font-size: 16px;
    }
  }
  .amount{
    line-height: 1;
    color: #6966FF;
    font-size: 35px;
    font-family: PingFang-Bold;
    margin-top: 23px;
    @media (max-width:500px) {
      font-size: 22px;
    }
  }
  .btnRow{
    display: flex;
    margin-top: 40px;
    .btn{
      width: 130px;
      height: 40px;
      border-radius: 30px;
      background: #fff;
      margin-right: 13px;
      font-size: 18px;
      color: #6966FF;
      @media (max-width:500px) {
        width: auto;
        padding:0 20px;
        height: 36px;
        font-size: 16px;
      }
      @media (max-width:350px) {
        padding:0 15px;
        font-size: 12px;
        height: 30px;
      }
    }
  }
}
.HistoryTitle{
  color: #FFFFFF;
  font-size: 26px;
  font-family: PingFang-Bold;
  text-align: center;
  margin: 30px 0 20px;
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
      margin: 40px 25px 0;
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
    }
    .HistoryRow{
        margin: 0 45px 25px;
        display: flex;
        width: 100%;
        justify-content: space-between;
        @media (max-width:650px) {
          margin: 0 25px 25px;
        }
    }
    .HistoryRow:nth-last-of-type(1){
        margin: 0 45px;
        @media (max-width:650px) {
          margin: 0 25px;
        }
    }
    .HistoryColumn{
      display: flex;
      align-items: center;
      white-space:nowrap;
      @media (max-width:650px) {
        margin: 0 15px;
      }
    }
    .HistoryColumn:nth-of-type(1){
        color: #FFFFFF;
        font-family: PingFang-Regular;  
        @media (max-width:600px) {
          width: 80px;
        }
    }
    .HistoryColumn:nth-of-type(2){
      color: #1FB51A;
      font-size: 15px;
      font-family: PingFang-Bold;
      @media (max-width:600px) {
          width: 80px;
      }
    }
    .HistoryColumn:nth-of-type(3){
        color: #1FB51A;
        font-size: 15px;
        font-family: PingFang-Bold;
        @media (max-width:600px) {
          min-width: 120px;
        }
    }
    .HistoryColumn:nth-of-type(4){
        color: #FFFFFF;
        font-size: 15px;
        font-family: PingFang-Regular;
        @media (max-width:600px) {
          min-width: 120px;
        }
    }
    .TokenIcon{
      width: 20px;
      height: 20px;
      background: #F64742;
      border-radius: 50%;
      margin-right: 5px;
    }
}
.WithdrawDialog{
    .el-dialog__title{
        --el-dialog-title-font-size:36px;
        font-family: PingFang-Bold; 
    }
    .el-dialog__header{
        --el-dialog-padding-primary:47px;
    }
    .el-dialog__body{
        padding-top: 45px !important;
    }
}
.balanceLabel{
    color: #6966FF;
    font-size: 20px;
    margin-bottom: 12px;
    font-family: PingFang-Bold;
    padding: 0 16px;
}
.putSel{
  display: flex;
  .put{
    border: 1px solid #767676;
    background: #14141E;
    height: 65px;
    flex: 1;
    border-radius: 14px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    input{
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      height: 100%;
      width: 100%;
      color: #FFFFFF;
      font-size: 28px;
      font-family: PingFang-Bold;
    }
    input::placeholder{
      color: #B3B3B3;
      font-family: PingFang-Regular;
      font-size: 18px;
    }
    span{
      color: #FFFFFF;
      font-family: PingFang-Regular;
      text-decoration: underline;
      font-size: 18px;
      cursor: pointer;
    }
  }
  .sel{
    display: flex;
    align-items: center;
    width: 110px;
    height: 65px;
    background: #181823;
    border-radius: 15px;
    margin-left: 12px;
    padding: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
    .TokenIcon{
      width: 30px;
      height: 30px;
      background: #F64742;
      border-radius: 50%;
    }
    .TokenName{
      flex: 1;
      font-family: PingFang-Bold;
      font-size: 22px;
      color: #D8D8D8;
      text-align: center;
    }
  }
}
.enter{
  margin: auto;
  height: 60px;
  background: #6966FF;
  border-radius: 12px;
  margin-top: 32px;
  color: #FFFFFF;
  font-size: 20px;
  font-family: PingFang-Bold; 
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.Disabled{
  background: #767676;
  color: #303044;
}
svg {
  width: 1.5em;
  transform-origin: center;
  animation: rotate 2s linear infinite;
  margin-right: 10px;
}

circle {
  fill: none;
  stroke: #fc2f70;
  stroke-width: 5;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
}

.SelList{
  width: 110px;
  background: #393955;
  border-radius: 15px;
  padding: 25px 10px;
  box-sizing: border-box;
  .SelItem{
    display: flex;
    align-items: center;
    .TokenIcon{
      width: 30px;
      height: 30px;
      background: #6966FF;
      border-radius: 50%;
    }
    .TokenName{
      flex: 1;
      text-align: center;
      color: #D8D8D8;
      font-size: 22px;
      font-family: PingFang-Bold;
    }
  }
}
</style>