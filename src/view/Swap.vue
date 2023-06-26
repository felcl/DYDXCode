<template>
  <div class="Swap">
    <div class="SwapTitle">Swap</div>
    <div class="SwapBox">
      <div class="SwapLabel">You'll pay</div>
      <div class="PutSel">
        <div class="put">
          <input type="text">
        </div>
        <el-dropdown trigger="click">
          <div class="sel">
            <div class="tokenIcon"></div>
            <div class="TokenName">ABC</div>
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
      <div class="SwapLabel">You'll receive</div>
      <div class="PutSel">
        <div class="put">
          <input type="text">
        </div>
        <el-dropdown trigger="click">
          <div class="sel">
            <div class="tokenIcon"></div>
            <div class="TokenName">ABC</div>
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
      <div class="SwapInfoRow">
        <div class="label">Reference price</div>
        <div class="value">1 OP = 113 ABC</div>
      </div>
      <div class="SwapInfoRow">
        <div class="label">Fee</div>
        <div class="value">1%</div>
      </div>
      <div class="SwapInfoRow">
        <div class="label">Slippage Tolerance</div>
        <div class="value">1.20%</div>
      </div>
      <div class="SwapInfoRow">
        <div class="label">Estimated amount</div>
        <div class="value">226</div>
      </div>
      <div class="submitBtn flexCenter">Submit</div>
    </div>
    <div class="historyTitle">Swap History</div>
    <div class="historyBox">
      <div class="historyItem">
        <div class="from">
          <div class="Token">
            <div class="TokenImg"></div>
            <div class="TokenName">OP</div>
          </div>
          <div class="amount">20.000000</div>
        </div>
        <img class="goTo" src="../assets/Home/goTo.png" alt="">
        <div class="to">
          <div class="Token">
            <div class="TokenImg"></div>
            <div class="TokenName">OP</div>
          </div>
          <div class="amount">20.000000</div>
        </div>
        <div class="StatusTime">
          <div class="success">Success</div>
          <div class="Time">2023-06-08 22:29</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.SwapTitle{
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
.SwapBox{
  width: 750px;
  margin:35px auto;
  border-radius: 25px;
  background: #1C1C28;
  padding: 47px 32px 30px;
  box-sizing: border-box;
  @media (max-width:800px) {
    width: auto;
    margin: 35px 25px;
  }
  @media (max-width:600px) {
    margin: 35px 15px;
    padding: 47px 20px 30px;
  }
  .SwapLabel{
    color: #AAAAAA;
    font-size: 20px;
    line-height: 1.5;
    font-family: PingFang-Bold;
  }
  .PutSel{
    display: flex;
    margin: 5px 0 35px;
    .put{
      flex: 1;
      height: 85px;
      background: #393955;
      padding: 0 13px;
      border-radius: 15px;
      @media (max-width:500px) {
        height: 60px;
      }
      input{
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        background: transparent;
        font-size: 30px;
        color: #FFFFFF;
        font-family: PingFang-Bold;
      }
    }
    .sel{
      background: #181823;
      border-radius: 15px;
      height: 85px;
      width: 130px;
      margin-left: 13px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
      @media (max-width:500px) {
        height: 60px;
        width: 100px;
        margin-left: 6px;
      }
      .tokenIcon{
        width: 30px;
        height: 30px;
        background: #F64742;
        border-radius: 50%;
        @media (max-width:500px) {
          width: 20px;
          height: 20px;
        }
      }
      .TokenName{
        color: #D8D8D8;
        font-size: 22px;
        font-family: PingFang-Bold;
        flex: 1;
        margin: 0 10px;
        @media (max-width:500px) {
          font-size: 16px;
        }
      }
      img{
        @media (max-width:500px) {
          width: 8px;
        }
      }
    }
  }
  .SwapInfoRow{
    display: flex;
    justify-content:space-between;
    margin-bottom: 11px;
    .label,.value{
      color: #D8D8D8;
      font-size: 14px;
      font-family: PingFang-Regular;
    }
  }
  .submitBtn{
    height: 60px;
    background: #6966FF;
    border-radius: 10px;
    margin-top: 17px;
    color: #FFFFFF;
    font-size: 20px;
    font-family: PingFang-Bold;
    cursor: pointer;
  }
}
.historyTitle{
  color: #FFFFFF;
  text-align: center;
  font-size: 26px;
  font-family: PingFang-Bold;
}
.historyBox{
  background: #1C1C28;
  border: 1px solid #28283B;
  border-radius: 25px;
  width: 750px;
  box-sizing: border-box;
  margin: 16px auto 60px;
  padding: 35px 45px 68px;
  @media (max-width:800px) {
    width: auto;
    margin: 16px 25px 60px;
  }
  @media (max-width:600px) {
    overflow-x: auto;
    padding: 35px 15px 68px;
    margin: 16px 15px 60px;
  }
  .historyItem{
    padding-bottom: 20px;
    border-bottom: 1px solid #28283B;
    display: flex;
    align-items: center;
    @media (max-width:600px) {
    //  width: 600px;
    }
  }
  .from,.to{
    // width: 165px;
    flex: 1;
    .Token{
      display: flex;
      .TokenImg{
        width: 28px;
        height: 28px;
        background: #F64742;
        border-radius: 50%;
      }
      .TokenName{
        color: #FFFFFF;
        font-size: 20px;
        font-family: PingFang-Bold;
        margin-left: 5px;
      }
    }
    .amount{
      color: #FFFFFF;
      font-size: 16px;
      font-family: PingFang-Medium;
      line-height: 1;
      margin-top: 10px;
    }
  }
  .to{
    .Token{
      justify-content: flex-end;
    }
    .amount{
      text-align: right;
    }
  }
  .goTo{
    margin:0 20px;
  }
  .StatusTime{
    margin-left: 20px;
    .success{
      font-family: PingFang-Bold;
      text-align: right;
      font-size: 18px;
      color: #1FB51A;
    }
    .Time{
      color: #FFFFFF;
      text-align: right;
      font-size: 14px;
      font-family: PingFang-Regular;
    }
  }
}
.SelList{
  width: 130px;
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