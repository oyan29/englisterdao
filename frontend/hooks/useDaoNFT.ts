import { useState, useEffect } from "react";
import useMetaMask, { getContract, getContractWithSigner } from "./useMetaMask";
import artifact from "../src/abi/DAONFT.json";
import { DAONFT } from "../types/ethers-contracts/DAONFT";

export type NftMetaData = {
    name: string;
    description: string;
    image: string;
}

export default () => {
    const { address } = useMetaMask()
    const [owned, setOwned] = useState(false)
    const [metadata, setMetadata] = useState<NftMetaData>()

    const contractAddress = process.env.NEXT_PUBLIC_DAONFT_CONTRACT_ADDRESS as string
    const contract = getContract(contractAddress, artifact.abi) as DAONFT
    const contractWithSigner = getContractWithSigner(contractAddress, artifact.abi) as DAONFT

    useEffect(() => {
        contract.functions.balanceOf(address).then(t => setOwned(t[0].toNumber() > 0))
        contract.functions.tokenURI(0).then(t => {
            console.log({ url: t[0] })
            fetch(t[0]).then(res => res.json()).then(t => setMetadata(t))
        })
    }, [address]);

    return {
        owned,
        contractAddress,
        metadata
    };
}