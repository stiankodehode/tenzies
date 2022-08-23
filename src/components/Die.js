const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
        cursor: "pointer",
    };
    return (
        <div style={styles} className="die" onClick={props.holdDie}>
            <h1>{props.value}</h1>
        </div>
    );
};

export default Die;
