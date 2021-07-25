import { ChainId } from '@uniswap/sdk';
import { Configuration } from './StandardProtocol/config';
import { BankInfo } from './StandardProtocol';
import { formatUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

const configurations: { [env: string]: Configuration } = {
  development: {
    // chainId: ChainId.MAINNET,
    // etherscanUrl: 'https://etherscan.io',
    // defaultProvider: 'https://mainnet.infura.io/v3/dfe6dbc75d7c4e8e892234d69ac14f45',
    chainId: ChainId.KOVAN,
    etherscanUrl: 'https://kovan.etherscan.io',
    defaultProvider: 'https://kovan.infura.io/v3/dfe6dbc75d7c4e8e892234d69ac14f45',
    deployments: require('./StandardProtocol/deployments/deployments.mainnet.json'),
    externalTokens: {
      USDT: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6],
      STND: ['0x9040e237c3bf18347bb00957dc22167d0f2b999d', 18],
      'STND_ETH-UNI-LPv2': ['0xe94272661fd46362e5dd247221e0fc018a298d09', 18],
    },
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: process.env.REACT_APP_MAINNET_NODE,
    deployments: require('./StandardProtocol/deployments/deployments.mainnet.json'),
    externalTokens: {
      USDT: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6],
      STND: ['0x9040e237c3bf18347bb00957dc22167d0f2b999d', 18],
      'STND_ETH-UNI-LPv2': ['0xe94272661fd46362e5dd247221e0fc018a298d09', 18],
    },
    refreshInterval: 30000,
    gasLimitMultiplier: 1.7,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  STNDETHLPTokenSharePool: {
    name: 'Earn STND by STND-ETH-LP',
    contract: 'STNDETHLPTokenSharePool',
    depositTokenName: 'STND_ETH-UNI-LPv2',
    pairToken1: 'STND',
    pairToken2: 'ETH',
    earnTokenName: 'STND',
    finished: false,
    sort: 1,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
