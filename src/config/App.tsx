import AppRouter from "./AppRouter.tsx";
import {connectorsForWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createConfig, http, WagmiProvider} from "wagmi";
import {celo, celoAlfajores, rootstockTestnet, zircuitTestnet} from "wagmi/chains";
import {injectedWallet, metaMaskWallet, safeWallet, walletConnectWallet} from "@rainbow-me/rainbowkit/wallets";


const connectors = connectorsForWallets(
    [
      {
        groupName: "Suggested",
        wallets: [injectedWallet, walletConnectWallet, metaMaskWallet, safeWallet],
      },
    ],
    {
      appName: "NAME",
      projectId: "ID",
    },
);

const config = createConfig({
  connectors,
  chains: [celo, celoAlfajores, rootstockTestnet, zircuitTestnet],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
    [rootstockTestnet.id]: http(),
    [zircuitTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

function App() {
  return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <AppRouter/>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
  )
}

export default App
