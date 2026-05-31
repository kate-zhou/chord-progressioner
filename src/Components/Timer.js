function Timer({ timeLeft, isRunning }) {
    return (
        <div>
            {isRunning && <p>Time left: {timeLeft}</p>}
        </div>
    );
}

export default Timer;