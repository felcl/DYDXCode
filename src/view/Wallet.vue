<template>
  <div class="Wallet">
    <div class="WalletTitle">Wallet</div>
    <div class="Balance">
      <div class="BalanceLabel">Balance</div>
      <div class="amount">$ 22222222</div>
      <div class="btnRow">
        <div class="btn flexCenter" style="{'background':'#6966FF'}">Withdraw</div>
        <div class="btn flexCenter">Recharge</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

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
  background: url(../assets//Home/WalletBg.png);
  margin: 40px auto 0;
  border-radius: 25px;
  overflow: hidden;
  .BalanceLabel{
    color: #767676;
    font-size: 18px;
    font-family: PingFang-Regular;
    line-height: 1;
  }
  .amount{
    line-height: 1;
    color: #6966FF;
    font-size: 35px;
    font-family: PingFang-Bold;
    margin-top: 23px;
  }
  .btnRow{
    display: flex;
    .btn{
      width: 130px;
      height: 40px;
      border-radius: 30px;
      background: #fff;
      margin-right: 13px;
      color: #6966FF;
    }
  }
}
</style>