import { useQuery } from "@apollo/react-hooks";
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import { JsonRpcProvider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";

import { Body, Button, Header, Image, Link } from "./components";
import logo from "./ethereumLogo.png";
import useWeb3Modal from "./hooks/useWeb3Modal";

import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "./graphql/subgraph";

const avax_rpc = "https://api.avax.network/ext/bc/C/rpc";
const avax_chainid = 43114;
const moralis_speedynode_avax = "https://speedy-nodes-nyc.moralis.io/4ac9fd2d990c578ba5a063f8/avalanche/mainnet";

async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  //const defaultProvider = getDefaultProvider();
  const defaultProvider = new JsonRpcProvider(moralis_speedynode_avax);
  // Create an instance of an ethers.js Contract
  // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
  //const ceaErc20 = new Contract(addresses.ceaErc20, abis.erc20, defaultProvider);
  const ceaErc20 = new Contract(addresses.ceaErc20, abis.whiterabbit, defaultProvider);
  // A pre-defined address that owns some CEAERC20 tokens
  //const tokenBalance = await ceaErc20.balanceOf("0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C");
  const tokenBalance = await ceaErc20.balanceOf("0xa25a9b7c73158b3b34215925796ce6aa8100c13a");
  console.log({ tokenBalance: tokenBalance.toString() });
  const dividendsInfo = await ceaErc20.getAccountDividendsInfo("0xa25a9b7c73158b3b34215925796ce6aa8100c13a");
  console.log({ dividendsInfo: dividendsInfo.toString() });
}

/*
function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  const [account, setAccount] = useState("");
  const [rendered, setRendered] = useState("");

  useEffect(() => {
    async function fetchAccount() {
      try {
        if (!provider) {
          return;
        }

        // Load the user's accounts.
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);

        // Resolve the ENS name for the first account.
        const name = await provider.lookupAddress(accounts[0]);

        // Render either the ENS name or the shortened account address.
        if (name) {
          setRendered(name);
        } else {
          setRendered(account.substring(0, 6) + "..." + account.substring(36));
        }
      } catch (err) {
        setAccount("");
        setRendered("");
        console.error(err);
      }
    }
    fetchAccount();
  }, [account, provider, setAccount, setRendered]);

  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button>
  );
}
*/

function App() {
//  const { loading, error, data } = useQuery(GET_TRANSFERS);
//  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

//  React.useEffect(() => {
//    if (!loading && !error && data && data.transfers) {
//      console.log({ transfers: data.transfers });
//    }
//  }, [loading, error, data]);

//        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
    //
//        <Link href="https://ethereum.org/developers/#getting-started" style={{ marginTop: "8px" }}>
//          Learn Ethereum
//        </Link>
//        <Link href="https://reactjs.org">Learn React</Link>
//        <Link href="https://thegraph.com/docs/quick-start">Learn The Graph</Link>
  return (
    <div>
      <Header>
      </Header>
      <Body>
        <Image src={logo} alt="react-logo" />
        <p>
          Edit <code>packages/react-app/src/App.js</code> and save to reload.
        </p>
        {/* Remove the "hidden" prop and open the JavaScript console in the browser to see what this function does */}
        <Button onClick={() => readOnChainData()}>
          Read On-Chain Balance
        </Button>
      </Body>
    </div>
  );
}

export default App;
