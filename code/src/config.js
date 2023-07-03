import Token from './ABI/ERC20Token.json';
import Dao from './ABI/Dao.json';
export const baseURL = 'https://dydxdao.link'
// export const baseURL = 'http://54.179.208.138:8999/'
export const contractAddress = {
    //测试
    // "USDT": "0x3D7995A37EB34617F6312F7E9BdF2B0e24d5051e",
    // "ARB": "0xbbF9D054A92f0c224DAF4bD10b5AEAc241544863",
    // "Dao": "0xDc4918EDb70c957DDefb751551381dC8631bBE79",
    //正式
    // "USDT": "0x3D7995A37EB34617F6312F7E9BdF2B0e24d5051e",
    "ARB": "0x92D6C1e31e14520e676a687F0a93788B716BEff5",
    "Dao": "0xfD475d4C2d98ef40F02ECCCb7Fe89Ec2287Fd74E",
}
export const ABI  = {
    // "USDT": Token,
    "ARB": Token,
    "Dao": Dao,
}
export const TokenConfig = {
    USDT:{
        decimals:6
    },
    ARB:{
        decimals:18
    }
}
export const chainConfig = {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io'],
}
// export const chainConfig = {
//     chainId: '0x5',
//     chainName: 'Goerli',
//     nativeCurrency: {
//         name: 'ETH',
//         symbol: 'ETH',
//         decimals: 18,
//     },
//     rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
//     blockExplorerUrls: ['https://goerli.etherscan.io'],
// }