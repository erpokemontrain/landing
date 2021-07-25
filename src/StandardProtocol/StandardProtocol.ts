import { Fetcher, Route, WETH, Token } from '@uniswap/sdk';
import { Configuration } from './config';
import { ContractName, TokenStat, TreasuryAllocationTime } from './types';
import { BigNumber, Contract, ethers, Overrides } from 'ethers';
import { decimalToBalance } from './ether-utils';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getDisplayBalance } from '../utils/formatBalance';
import { getDefaultProvider } from '../utils/provider';
import IUniswapV2PairABI from './IUniswapV2Pair.abi.json';

/**
 * An API module of Standard Protocol contract.
 * All contract-interacting domain logic should be defined in here.
 */
export class StandardProtocol {
  myAccount: string;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };

  stndEth: Contract;
  STND: ERC20;

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(deployment.address, deployment.abi, provider);
    }
    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(address, provider, symbol, decimal); // TODO: add decimal
    }

    this.STND = new ERC20(deployments.STND.address, provider, 'STND');

    // Uniswap V2 Pair
    this.stndEth = new Contract(
      externalTokens['STND_ETH-UNI-LPv2'][0],
      IUniswapV2PairABI,
      provider,
    );

    this.config = cfg;
    this.provider = provider;
  }

  async getLPBalance() {
    try {
      const reserves = await this.stndEth.getReserves();
      const totalSupply = (await this.stndEth.totalSupply()).toString();
      const balance = (
        await this.stndEth.balanceOf('0x75335f60d7d8bb1c72689167242705f6ae55c1f8')
      ).toString();

      const { USDT } = this.config.externalTokens;

      const usdt = new Token(1, USDT[0], USDT[1]);

      const usdtEthPair = await Fetcher.fetchPairData(usdt, WETH[1]);
      const usdtEthRoute = new Route([usdtEthPair], WETH[1]);
      const ethInUsdt = usdtEthRoute.midPrice.toSignificant(6);
      const ethSupply = reserves[1].toString();
      const ethSupplyString =
        ethSupply.substring(0, ethSupply.length - 18) +
        '.' +
        ethSupply.substring(ethSupply.length - 18, ethSupply.length - 15);

      const ethSupplyFloat = parseFloat(ethSupplyString);

      const stnd = new Token(1, '0x9040e237c3bf18347bb00957dc22167d0f2b999d', 18);
      const stndEthPair = await Fetcher.fetchPairData(stnd, WETH[1]);
      const stndEthRoute = new Route([stndEthPair], WETH[1]);
      const stndInEth = stndEthRoute.midPrice.invert().toSignificant(6);
      const stndSupply = reserves[0].toString();
      const stndSupplyString =
        stndSupply.substring(0, stndSupply.length - 18) +
        '.' +
        stndSupply.substring(stndSupply.length - 18, stndSupply.length - 15);

      const stndSupplyFloat = parseFloat(stndSupplyString);

      const uniswapLiquidity =
        ethSupplyFloat * parseFloat(ethInUsdt) +
        stndSupplyFloat * parseFloat(stndInEth) * parseFloat(ethInUsdt);

      const totalSupplyString =
        totalSupply.substring(0, totalSupply.length - 18) +
        '.' +
        totalSupply.substring(totalSupply.length - 18, totalSupply.length - 15);

      const balanceString =
        balance.substring(0, balance.length - 18) +
        '.' +
        balance.substring(balance.length - 18, balance.length - 15);

      const stakedLiquidityRatio = parseFloat(balanceString) / parseFloat(totalSupplyString);

      return [
        uniswapLiquidity,
        stakedLiquidityRatio * uniswapLiquidity,
        parseFloat(stndInEth) * parseFloat(ethInUsdt),
      ];
    } catch (err) {
      console.log('error', err);
      // console.error(`Failed to call balanceOf() on pool ${pool.address}: ${err.stack}`);
      return null;
    }
    // let res = await provider.getBalance('0x75335f60d7d8bb1c72689167242705f6ae55c1f8');
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);

    this.signer = newProvider.getSigner(0);
    this.myAccount = account;

    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    const tokens = [this.STND, ...Object.values(this.externalTokens)];
    for (const token of tokens) {
      token.connect(this.signer);
    }

    //stdneth
    this.stndEth = this.stndEth.connect(this.signer);
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  gasOptions(gas: BigNumber): Overrides {
    const multiplied = Math.floor(gas.toNumber() * this.config.gasLimitMultiplier);
    console.log(`⛽️ Gas multiplied: ${gas} -> ${multiplied}`);
    return {
      gasLimit: BigNumber.from(multiplied),
    };
  }

  /**
   * @returns STND stats from Uniswap.
   */
  async getStndStatFromUniswap(): Promise<TokenStat> {
    const supply = await this.STND.displayedTotalSupply();
    return {
      priceInUSDT: await this.getTokenPriceFromUniswap(this.STND),
      totalSupply: supply,
    };
  }

  async getTokenPriceFromUniswap(tokenContract: ERC20): Promise<string> {
    await this.provider.ready;

    const { chainId } = this.config;
    const { USDT } = this.config.externalTokens;

    const usdt = new Token(1, USDT[0], USDT[1]);
    const stnd = new Token(1, '0x9040e237c3bf18347bb00957dc22167d0f2b999d', 18);

    try {
      const stndEthPair = await Fetcher.fetchPairData(stnd, WETH[1]);
      const stndEthRoute = new Route([stndEthPair], WETH[1]);
      const stndInEth = stndEthRoute.midPrice.invert().toSignificant(6);

      const usdtEthPair = await Fetcher.fetchPairData(usdt, WETH[1]);
      const usdtEthRoute = new Route([usdtEthPair], WETH[1]);
      const ethInUsdt = usdtEthRoute.midPrice.toSignificant(6);

      const usdtInEth = usdtEthRoute.midPrice.invert().toSignificant(6);

      const usdPrice = (parseFloat(stndInEth) / parseFloat(usdtInEth)).toFixed(4);
      return usdtInEth;
    } catch (err) {
      // console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
    }
  }

  async earnedFromBank(poolName: ContractName, account = this.myAccount): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      return await pool.earned(account);
    } catch (err) {
      console.error(`Failed to call earned() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  async stakedBalanceOnBank(
    poolName: ContractName,
    account = this.myAccount,
  ): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      return await pool.balanceOf(account);
    } catch (err) {
      console.error(`Failed to call balanceOf() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  /**
   * Deposits token to given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 STND * 10^18)
   * @returns {string} Transaction hash
   */
  async stake(poolName: ContractName, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.stake(amount);
    return await pool.stake(amount, this.gasOptions(gas));
  }

  /**
   * Withdraws token from given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 STND * 10^18)
   * @returns {string} Transaction hash
   */
  async unstake(poolName: ContractName, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.withdraw(amount);
    return await pool.withdraw(amount, this.gasOptions(gas));
  }

  /**
   * Transfers earned token reward from given pool to my account.
   */
  async harvest(poolName: ContractName): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.getReward();
    return await pool.getReward(this.gasOptions(gas));
  }

  /**
   * Harvests and withdraws deposited tokens from the pool.
   */
  async exit(poolName: ContractName): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.exit();
    return await pool.exit(this.gasOptions(gas));
  }
}
