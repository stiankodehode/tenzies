import React from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Die from "./components/Die";
import { useState, useEffect } from "react";
import {
    StyledButton,
    StyledH1,
    StyledParagraph,
    StyledDiv,
} from "./components/StyledComponents";
import Confetti from "react-confetti";

function App() {
    const buttonText = {
        roll: "Roll Dice",
        restart: "Restart Game",
    };
    // states and useEffects
    const [dice, setDice] = useState(allNewDice(10));
    const [tenzies, setTenzies] = useState(false);
    const [rolls, setRolls] = useState(1);
    const [localHiscore, setLocalHiscore] = useState(getHiscore);

    // This function grabs your hiscore from local storage.
    function getHiscore() {
        const hiscoreFromLocalStorage = localStorage.getItem("hiscore");
        const hiscore = JSON.parse(hiscoreFromLocalStorage);
        return hiscore;
    }

    // This function is ran when you have Tenzies to check if you beat your hiscore.
    function checkHiscore() {
        if (localHiscore > rolls) localStorage.setItem("hiscore", rolls);
    }

    // This useEffect runs every time your dice updates, to check if you have Tenzies
    useEffect(() => {
        const firstValue = dice[0].value;
        const allHeld = dice.every((die) => die.isHeld);
        const allSameValue = dice.every((die) => die.value === firstValue);

        if (allHeld && allSameValue) setTenzies(true);
    }, [dice]);

    //rolling the amount of dice put as a parameter
    function allNewDice(diceAmount) {
        const newDice = [];

        for (let i = 0; i < diceAmount; i++) {
            const dieObject = rollNewDice();
            newDice.push(dieObject);
        }

        return newDice;
    }

    // Roll for one dice at a time.
    function rollNewDice() {
        const newNumber = Math.ceil(Math.random() * 6);
        const dieObject = {
            value: newNumber,
            isHeld: false,
            id: nanoid(),
        };
        return dieObject;
    }

    // Function to let you toggle a die to be held.
    function holdDie(id) {
        setDice((oldDice) =>
            oldDice.map((die) => {
                return id === die.id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    // mapping the array for rendering
    const diceElements = dice.map((die) => {
        return (
            <Die
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                holdDie={() => holdDie(die.id)}
            />
        );
    });

    // Restart game function by rolling out new dice and setting tenzies state to false
    function restartGame() {
        setTenzies(false);
        setDice(allNewDice(10));
    }

    // Rolling the unselected dies, if tenzies is true we run the restart game function instead.
    function rollDice() {
        // I use the same button to roll/restart the game, so if Tenzies is true, a check is made if you have a new hiscore locally.
        if (tenzies) {
            if (localHiscore > rolls) {
                checkHiscore();
                setLocalHiscore(getHiscore);
            }
            restartGame();
            setRolls(0);
            return;
        }
        setRolls((oldRolls) => oldRolls + 1);
        setDice((oldDice) =>
            oldDice.map((die) => {
                return die.isHeld ? die : rollNewDice();
            })
        );
    }

    return (
        <>
            {tenzies && <Confetti />}
            <div className="App">
                <StyledH1>Tenzies</StyledH1>
                <StyledParagraph>
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </StyledParagraph>
                <div className="game-container">{diceElements}</div>
                <StyledDiv>
                    <StyledParagraph>Rolls: {rolls}</StyledParagraph>
                    <StyledButton onClick={rollDice}>
                        {tenzies ? buttonText.restart : buttonText.roll}
                    </StyledButton>
                    <StyledParagraph>Hiscore: {localHiscore} </StyledParagraph>
                </StyledDiv>
            </div>
        </>
    );
}

export default App;
