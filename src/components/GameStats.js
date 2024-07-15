const GameStats = (props) => {
    return (
        <div>
            <p>Count: { props?.count?? 0 }</p>
            <p>Time: { (parseInt(props.time/60) + ":" + props.time%60)?? '00:00' }</p>
        </div>
    )
}
export default GameStats;