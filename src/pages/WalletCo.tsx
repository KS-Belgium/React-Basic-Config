import React, {useEffect} from "react";
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import "../styles/pages/Style-WalletCo.scss";

const WalletCo: React.FC = () => {
    const { isConnected } = useAccount();
    const navigate = useNavigate();

    useEffect(() => {
        isConnected && navigate('/home');
    }, [isConnected, navigate]);


    return (
        <>
            <div id="walletco">
                <h1>Wallet Connection</h1>
                <ConnectButton/>
            </div>
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        </>

    );
};

export default WalletCo;