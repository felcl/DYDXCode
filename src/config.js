import Token from './ABI/ERC20Token.json';
import Dao from './ABI/Dao.json';
export const contractAddress = {
    //正式
    "USDT": "0x3D7995A37EB34617F6312F7E9BdF2B0e24d5051e",
    "ARB": "0xbbF9D054A92f0c224DAF4bD10b5AEAc241544863",
    "Dao": "0xDc4918EDb70c957DDefb751551381dC8631bBE79",
}
export const ABI  = {
    "USDT": Token,
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
    chainId: '0x5',
    chainName: 'Goerli Testnet',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io'],
}