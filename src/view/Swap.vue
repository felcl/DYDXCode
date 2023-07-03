<template>
  <div class="Swap">
    <div class="SwapTitle">Swap</div>
    <div class="SwapBox">
      <div class="SwapLabel">You'll pay</div>
      <div class="PutSel">
        <div class="put">
          <input type="text" v-model="FromAmount" Puttarget="FromAmount" @input="changeNumPut">
        </div>
        <el-dropdown trigger="click">
          <div class="sel">
            <div class="tokenIcon"></div>
            <div class="TokenName">{{From}}</div>
            <img src="../assets/Home/arrow.png" alt="">
          </div>
          <template #dropdown>
            <div class="SelList">
              <div class="SelItem" v-for="(item,key) in OPTokenConfig" @click="changeFrom(key)">
                <div class="TokenIcon"></div>
                <div class="TokenName">{{ key }}</div>
              </div>
            </div>
          </template>
        </el-dropdown>
      </div>
      <div class="SwapLabel">You'll receive</div>
      <div class="PutSel">
        <div class="put">
          <input type="text" v-model="ToAmount" Puttarget="ToAmount" @input="changeNumPut">
        </div>
        <el-dropdown trigger="click">
          <div class="sel">
            <div class="tokenIcon"></div>
            <div class="TokenName">{{ To }}</div>
            <img src="../assets/Home/arrow.png" alt="">
          </div>
          <template #dropdown>
            <div class="SelList">
              <div class="SelItem" v-for="(item,key) in OPTokenConfig" @click="changeTo(key)">
                <div class="TokenIcon"></div>
                <div class="TokenName">{{ key }}</div>
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
      <div class="submitBtn Disabled flexCenter" v-if="!FromAmount || !ToAmount">禁用</div>
      <div class="submitBtn Disabled flexCenter" v-else-if="!ifApprove" @click="Approve">授权</div>
      <div class="submitBtn flexCenter" v-else @click="submit">提交</div>
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
import { useStore } from "vuex";
import {OPTokenConfig,contractOpAddress} from '../config'
import {ref, computed, watch,reactive} from 'vue'
import BigNumber from 'big.js'
const From = ref('OP')
const To = ref('ABC')
import {contract} from '../web3'
const store = useStore();
const FromAmount = ref('')
const ToAmount = ref('')
const OPReserve = ref('0')
const ABCReserveOPABC = ref('0')
const ABCReserveABCEFC = ref('0')
const EFCReserve = ref('0')
// const OPToOPABC = ref(new BigNumber(0))
// const ABCToOPABC = ref(new BigNumber(0))
// const ABCToABCEFC = ref(new BigNumber(0))
// const EFCToABCEFC = ref(new BigNumber(0))
const AllowanceMap =reactive({
  OPToOPABC:new BigNumber(0),
  ABCToOPABC:new BigNumber(0),
  ABCToABCEFC:new BigNumber(0),
  EFCToABCEFC:new BigNumber(0),
})
const SwapMap = {
  OPABC:contractOpAddress.OPABC,
  ABCOP:contractOpAddress.OPABC,
  ABCEFC:contractOpAddress.ABCEFC,
  EFCABC:contractOpAddress.ABCEFC,
}
const address = computed(() => {
  return store.state.address;
});
const ifApprove = computed(()=>{
  if(From.value === 'OP' && To.value == 'ABC' && AllowanceMap.OPToOPABC.lt(FromAmount.value || 0)){
    return false
  }
  if(From.value === 'ABC' && To.value == 'OP' && AllowanceMap.ABCToOPABC.lt(FromAmount.value || 0)){
    return false
  }
  return true
})
watch(address,(address)=>{
  if(address){
    getAllowance('OP',contractOpAddress.OPABC,'OPToOPABC')
    getAllowance('ABC',contractOpAddress.OPABC,'ABCToOPABC')
    getAllowance('ABC',contractOpAddress.ABCEFC,'ABCToABCEFC')
    getAllowance('EFC',contractOpAddress.ABCEFC,'EFCToABCEFC')
    contract.OPABC.methods.getReserves().call().then(res=>{
      OPReserve.value = res._reserve0
      ABCReserveOPABC.value = res._reserve1
      console.log(res,"OPABC各自质押量")
    })
    contract.ABCEFC.methods.getReserves().call().then(res=>{
      ABCReserveABCEFC.value = res._reserve0
      EFCReserve.value = res._reserve1
      console.log(res,"ABCEFC各自质押量")
    })
  }
})
const Approve = () => {
  let amount = new BigNumber(FromAmount.value).times(10 ** OPTokenConfig[From.value].decimals).toString()
  contract[From.value].methods.approve(SwapMap[From.value+To.value],amount).send({from:address.value}).then(res=>{
    console.log(res,"授权结果")
  })
}
const getAllowance = (token,toAddress,toValue) => {
  contract[token].methods.allowance(address.value,toAddress).call({from:address.value}).then(res=>{
    AllowanceMap[toValue] =  new BigNumber(res).div(10 ** OPTokenConfig[token].decimals)
    console.log(res,"查询授权-"+toValue)
  })
}
const changeFrom = (TokenName) => {
  From.value = TokenName
}
const changeTo = (TokenName) => {
  To.value = TokenName
}
function changeNumPut(event) {
  let value = event.target.value;
  if (/^\./g.test(value)) {
    value = "0" + value;
  }
  let putVal = value.replace(/[^\d.]/g, "");
  let putArr = putVal.split(".");
  // if (putArr[1] && putArr[1].length > accuracy) {
  //   putArr[1] = putArr[1].slice(0, accuracy);
  // }
  putVal = putArr.join(".");
  if(event.target.attributes.puttarget.value === 'FromAmount'){
    FromAmount.value = putVal
  }
  if(event.target.attributes.puttarget.value === 'ToAmount'){
    ToAmount.value = putVal
  }
  getCorresponding()
  // return putVal;
}
const getCorresponding = () => {
  if(From.value === 'OP'){
    let amount = new BigNumber(FromAmount.value).times(10 ** OPTokenConfig.OP.decimals).toString()
    contract.OPABC.methods.getAmountOut(amount,OPReserve.value,ABCReserveOPABC.value).call().then(res=>{
      ToAmount.value = new BigNumber(res).div(10 ** OPTokenConfig.ABC.decimals).toString()
      console.log(new BigNumber(res).div(10 ** OPTokenConfig.ABC.decimals).toString(),"预计输出量")
    })
  }
  if(From.value === 'ABC' && To.value === 'OP'){
    let amount = new BigNumber(FromAmount.value).times(10 ** OPTokenConfig.ABC.decimals).toString()
    contract.OPABC.methods.getAmountIn(amount,ABCReserveOPABC.value,OPReserve.value).call().then(res=>{
      ToAmount.value = new BigNumber(res).div(10 ** OPTokenConfig.OP.decimals).toString()
      console.log(new BigNumber(res).div(10 ** OPTokenConfig.OP.decimals).toString(),"预计输出量")
    })
  }
  if(From.value === 'ABC' && To.value === 'EFC'){
    let amount = new BigNumber(FromAmount.value).times(10 ** OPTokenConfig.ABC.decimals).toString()
    contract.ABCEFC.methods.getAmountOut(amount,ABCReserveABCEFC.value,EFCReserve.value).call().then(res=>{
      ToAmount.value = new BigNumber(res).div(10 ** OPTokenConfig.EFC.decimals).toString()
      console.log(new BigNumber(res).div(10 ** OPTokenConfig.EFC.decimals).toString(),"预计输出量")
    })
  }
  if(From.value === 'EFC' && To.value === 'ABC'){
    let amount = new BigNumber(FromAmount.value).times(10 ** OPTokenConfig.EFC.decimals).toString()
    contract.ABCEFC.methods.getAmountIn(amount,EFCReserve.value,ABCReserveABCEFC.value).call().then(res=>{
      ToAmount.value = new BigNumber(res).div(10 ** OPTokenConfig.ABC.decimals).toString()
      console.log(new BigNumber(res).div(10 ** OPTokenConfig.ABC.decimals).toString(),"预计输出量")
    })
  }
}
const submit = () => {
  const inAmount = new BigNumber(FromAmount.value).times(10 ** 18).toString()
  const outAmount = new BigNumber(ToAmount.value).times(10 ** 18).toString()
  console.log(inAmount,outAmount)
  contract.OPABC.methods.swapSell(inAmount,outAmount,Date.parse(new Date())/1000+60).send({
      from:address.value
  })
}
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
  .Disabled{
    background: #767676;
    color: #1C1C28;
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