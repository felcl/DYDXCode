import Token from './ABI/ERC20Token.json';
import Dao from './ABI/Dao.json';
import Swap from './ABI/Swap.json';
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
export const contractOpAddress = {
    "OP": "0x4302d40fDc0807eac23c990a1739f3208438572D",
    "ABC": "0x6F08304f788Ea6BfE91d4C79f865875d9378f492",
    "EFC": "0xA0A875E51EE5Df67ca2267EE2494C217dD4b26bA",
    "OPABC": "0xBf56B360613b08Fbc0B102978c39dEBd32Cf4805",
    "ABCEFC": "0x78c054e96b01a9da7cd53abb62ff0c56ce5fb900",
}
export const ABI  = {
    // "USDT": Token,
    "ARB": Token,
    "Dao": Swap,
}
export const OPABI  = {
    "OP": Token,
    "ABC": Token,
    "EFC": Token,
    "OPABC": Swap,
    "ABCEFC": Swap,
}
export const TokenConfig = {
    USDT:{
        decimals:6
    },
    ARB:{
        decimals:18
    }
}
export const OPTokenConfig = {
    OP:{
        decimals:18
    },
    ABC:{
        decimals:18
    },
    EFC:{
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
export const OpchainConfig = {
    chainId: '0x1a4',
    chainName: 'Optimism Goerli',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: ['https://endpoints.omniatech.io/v1/op/goerli/public'],
    blockExplorerUrls: ['https://goerli-optimism.etherscan.io/'],
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