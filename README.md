# React - Wagmi Rainbow Viem - Config
Projet vide pré-configuré en utilisant **React + TypeScript + Vite + SCSS**.\
3 modules ont été ajouté pour permettre des connexions de portefeuille (tel que Metamask).

**Modules ajoutés via cette commande**:
```
npm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
```

**Documentation des modules**\
Ici seul les installations manuelles ont été faites et les configurations de bases ont été ajouté.\
Il est recommandé de lire la documentation et de comprendre avant de taper les lignes de commandes (même celles d'installation).
- [Wagmi](https://wagmi.sh/core/getting-started)
- [Rainbow](https://www.rainbowkit.com/docs/installation)
- [Viem](https://viem.sh/docs/getting-started)

*Note*:\
Viem est utilisé par les 2 autres modules, sa documentation est donc moins importante à lire car elle est déjà en partie incluse dans les 2 autres documentations.

### App
Ce qu'est devenu le fichier *App.tsx*: 
```typescript
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
```
*Note*:\
Il est vivement recommandé de garder cette structure de code pour la configuration des modules.\
Pour chaque projet et lors des modification sur un projet en cours il suffit d'aller modifier les configurations des 2 variables *connectors* et *config*.

- Wallets:\
Les wallets sont les différents types de portefeuilles qui peuvent être utilisés pour se connecter (injected, walletConnect, metaMask, safeWallet).\
Le *injectedWallet* est le portefeuille injecté par défaut par le navigateur de l'utilisateur, il est recommandé de le laisser.\
Il est possible aussi de les grouper sous un nom de groupe, ici un seul groupe est créé avec les wallets recommandés.\


- Networks:\
Ajouter des networks se fait en important les réseaux (ici via "wagmi/chains") et en les ajoutant dans le tableau *chains* de la configuration.\
Ne pas oublier d'ensuite d'ajouter leur id dans le tableau *transports* avec le type de transport (ici *http*, attention ce dernier type est un objet provenant de *wagi*).

**ATTENTION**\
Pour l'*appName* et *projectId* il est nécessaire de les remplacer par les valeurs qui vous sont attribuées via ce [site web (walletconnect)](https://cloud.walletconnect.com/sign-in).

### Wallet Connect
On va simplement créer une page de connection de portefeuille, dès qu'un portefeuille est connecté, on redirige vers la page d'accueil.\
On remarque aussi que l'utilisation du provider *WagmiProvider* est nécessaire pour utiliser les hooks de wagmi (ici *useAccount*).
Il nous permet de vérifier avec une simple condition si un portefeuille est connecté ou non afin de le rediriger vers la page d'accueil.

Fichier *WalletCo.tsx*:
```typescript
import React, { useEffect } from "react";
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const WalletCo: React.FC = () => {
    const { isConnected } = useAccount();
    const navigate = useNavigate();

    useEffect(() => {
        isConnected && navigate('/home');
    }, [isConnected, navigate]);

    return (
        <div>
            <h1>Wallet Connection</h1>
    <ConnectButton />
    </div>
);
};

export default WalletCo;
```


### Home
Ce qu'est devenu le fichier *Home.tsx*:
```typescript
// Import components
import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";

// Import the styles
import "../styles/pages/Style-HomePage.scss";

// Import the function from the model
import {displayAlertBoxes} from "../models/display-alert-boxes.ts";
import {useAccount} from "wagmi";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    // Get the connected account and network information
    const { address, isConnected } = useAccount();
    const navigate = useNavigate();

    function displayAlertBox() {
        const checkedRadioButton: HTMLInputElement | null = document.querySelector('input[type="radio"]:checked');
        checkedRadioButton ? displayAlertBoxes(checkedRadioButton.value) : alert('No radio button selected');
    }

    function hideAlertBox() {
        const existingAlertBox = document.getElementById('alert-box');
        if (existingAlertBox) {
            existingAlertBox.remove();
        }
    }

    useEffect(() => {
        !isConnected && navigate('/');
    }, [isConnected, navigate]);

    return (
        <>
            <NavBar/>


        <div className="container">
        <h1 className="title">Home</h1>
            <h3>Wallet Address: {address ? address : 'Not connected'}</h3>
    <div className="content">
    <div className="radio-group">
    <div className="field">
    <input type="radio" id="success" name="alert" value="success"/>
    <label htmlFor="success">Success</label>
        </div>
        <div className="field">
    <input type="radio" id="info" name="alert" value="info"/>
    <label htmlFor="info">Info</label>
        </div>
        <div className="field">
    <input type="radio" id="warning" name="alert" value="warning"/>
    <label htmlFor="warning">Warning</label>
        </div>
        <div className="field">
    <input type="radio" id="danger" name="alert" value="danger"/>
    <label htmlFor="danger">Danger</label>
        </div>
        </div>
        <div className="button-group">
    <button className="button" onClick={displayAlertBox}>Show Alert</button>
    <button className="button" onClick={hideAlertBox}>Hide Alert</button>
    </div>
    </div>
    </div>

    <Footer/>
    </>
);
}

export default Home;
```
*Note*:\
Le *useEffect* permet de rediriger l'utilisateur vers la page de connection de portefeuille si il n'est pas connecté ou décidé de se déconnecter.
Pareillement ici, le hook *useAccount* permet de récupérer les informations de l'utilisateur connecté, ici on va juste vérifier l'état de connection pour rediriger l'utilisateur.
On a également afficher l'adresse du portefeuille connecté via la variable *address*, elle aussi récupérée via le hook *useAccount*.

### NavBar
On va simplement ajouter un bouton de connection de portefeuille dans la barre de navigation et lui ajouter des propriétés pour qu'il s'affiche différemment en fonction de la taille de l'écran.

Ce qu'est devenu le fichier *NavBar.tsx*:
```typescript
import logo from "/logo/vite.svg";
import "../styles/components/Style-NavBar.scss";
import {ConnectButton} from "@rainbow-me/rainbowkit";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>
        <div className="navbar-menu">
          <a href="/" className="navbar-item">
            Home
          </a>
          <a href="/about" className="navbar-item">
            About
          </a>
        
          // Add the ConnectButton for the wallet
          <ConnectButton
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            chainStatus={{
              smallScreen: 'none',
              largeScreen: 'full'
            }}
          />
        </div>
    </nav>
  );
}

export default NavBar;
```