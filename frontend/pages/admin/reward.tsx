import { useState } from "react";
import useTokenSupplySystem from "../../hooks/useTokenSupplySystem";

export default () => {
    const { payAndPayWithNative, unclaimedBalance, mint } = useTokenSupplySystem()
    const [address, setAddress] = useState("")
    const [amount, setAmount] = useState("")
    const [nativeAmount, setNativeAmount] = useState("")
    const [fee, setFee] = useState("")
    const [mintAmount, setMintAmount] = useState("")
    const total = Number(amount) + Number(nativeAmount) + Number(fee)
    const [errorMessaage, setErrorMessage] = useState("")

    const onSend = async () => {
        try {
            if (payAndPayWithNative)
                await payAndPayWithNative(address, Number(amount), Number(nativeAmount), Number(fee))
        } catch (e: any) {
            setErrorMessage(e.message)
        }
    }

    const onMint = async () => {
        try {
            if (mint)
                await mint(Number(mintAmount))
        } catch (e: any) {
            setErrorMessage(e.message)
        }

    }

    return <div>
        <div>
            Unclaimed Balance: {unclaimedBalance}
            <h2>Mint(MintしたいDAOトークンを入力)</h2>
            <input onChange={(e) => setMintAmount(e.target.value)} value={mintAmount}></input>
            <button onClick={onMint}>
                Mint
            </button>
        </div>

        <br />

        <br />
        <h2>Unclaimed Balanceを送金(全てDAOトークンを入力)</h2>
        <input placeholder="address" value={address} onChange={e => setAddress(e.target.value)} />
        <input placeholder="ENG交換" value={amount} onChange={e => setAmount(e.target.value)} />
        <input placeholder="Native交換" value={nativeAmount} onChange={e => setNativeAmount(e.target.value)} />
        <input placeholder="手数料" value={fee} onChange={e => setFee(e.target.value)} />
        <input placeholder="総額" value={total} />
        <button onClick={onSend}>送金</button>

        <div style={{ color: "red" }}>{errorMessaage}</div>
    </div>;
}