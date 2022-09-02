import useContributionPollSetting from "../../../hooks/useContributionPollSetting"
import useDaoToken from "../../../hooks/useDaoToken"
import { InfoBox } from "../../style/InfoBox"

export default () => {
    const {
        pollId,
        REQUIRED_TOKEN_FOR_VOTE,
        CONTRIBUTOR_ASSIGNMENT_TOKEN,
        SUPPORTER_ASSIGNMENT_TOKEN,
        votingEnabled,
    } = useContributionPollSetting()

    const { yourBalance, tokenSymbol } = useDaoToken()

    const isEgibleToVote = yourBalance >= REQUIRED_TOKEN_FOR_VOTE


    return <div>
        <h3>貢献度投票 第{pollId}回</h3>
        <div style={InfoBox}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ margin: 10, marginRight: 20 }}>
                    <img width={70} src="https://tyoudoii-illust.com/wp-content/uploads/2021/04/event_01_color.png" />
                </div>
                <div>
                    <p>投票: <b>{votingEnabled ? "受付中" : "停止中"}</b></p>
                    <p>投票に必要なトークン保有量: <b>{REQUIRED_TOKEN_FOR_VOTE} {tokenSymbol}</b></p>
                    {isEgibleToVote ? <div /> : <p style={{ color: "red", fontWeight: "bold" }}>投票に必要なトークンを保有していません</p>}
                    <p>貢献者に配布されるトークン総額: <b>{CONTRIBUTOR_ASSIGNMENT_TOKEN} {tokenSymbol}</b></p>
                    <p>投票者に配布されるトークン総額: <b>{SUPPORTER_ASSIGNMENT_TOKEN} {tokenSymbol}</b></p>
                </div>
            </div>
        </div>
    </div>
}