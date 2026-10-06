const diceCount = document.getElementById("diceCount");
const rollButton = document.getElementById("rollButton");
const diceContainer = document.getElementById("diceContainer");
const totalDisplay = document.getElementById("total");
const historyContainer = document.getElementById("history");
const frequencyContainer = document.getElementById("frequency");

let history = [];
let frequency = {};

const dicePositions = {
    1: [[2, 2]],

    2: [[1, 1], [3, 3]],

    3: [[1, 1], [2, 2], [3, 3]],

    4: [[1, 1], [1, 3], [3, 1], [3, 3]],

    5: [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3]],

    6: [[1, 1], [1, 3], [2, 1], [2, 3], [3, 1], [3, 3]]
};

function createDie(value) {
    const die = document.createElement("div");
    die.className = "die rolling";

    dicePositions[value].forEach(position => {
        const dot = document.createElement("div");

        dot.className = "dot";
        dot.style.gridRow = position[0];
        dot.style.gridColumn = position[1];

        die.appendChild(dot);
    });

    return die;
}

function rollDice() {
    const numberOfDice = Number(diceCount.value);

    diceContainer.innerHTML = "";

    let results = [];
    let total = 0;

    for (let i = 0; i < numberOfDice; i++) {
        const value = Math.floor(Math.random() * 6) + 1;

        results.push(value);
        total += value;

        const die = createDie(value);
        diceContainer.appendChild(die);
    }

    totalDisplay.textContent = total;

    addToHistory(results, total);
    updateFrequency(total);
}

function addToHistory(results, total) {
    history.unshift({
        results: results,
        total: total
    });

    if (history.length > 5) {
        history.pop();
    }

    renderHistory();
}

function renderHistory() {
    historyContainer.innerHTML = "";

    history.forEach(roll => {
        const item = document.createElement("div");

        item.className = "history-item";

        item.innerHTML = `
            <span>${roll.results.join(" + ")}</span>
            <strong>= ${roll.total}</strong>
        `;

        historyContainer.appendChild(item);
    });
}

function updateFrequency(total) {
    frequency[total] = (frequency[total] || 0) + 1;

    renderFrequency();
}

function renderFrequency() {
    frequencyContainer.innerHTML = "";

    const totals = Object.keys(frequency)
        .sort((a, b) => Number(a) - Number(b));

    totals.forEach(total => {
        const item = document.createElement("div");

        item.className = "frequency-item";

        item.innerHTML = `
            <span>Total ${total}</span>
            <strong>${frequency[total]} time${frequency[total] === 1 ? "" : "s"}</strong>
        `;

        frequencyContainer.appendChild(item);
    });
}

rollButton.addEventListener("click", rollDice);

// Initial roll
rollDice();