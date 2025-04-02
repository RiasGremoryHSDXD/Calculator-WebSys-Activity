// Display input
const displayInput = document.getElementById("display-input");
const previosInput = document.getElementById("previous-input")

let pressEqualButton = false

let appendinput = (symbol) => {
    if(!pressEqualButton){
        displayInput.textContent += symbol
    }else{
        displayInput.textContent = ""
        displayInput.textContent += symbol
        pressEqualButton = false
    }
}

let clearInput = () => {
    previosInput.textContent = ""
    displayInput.textContent = ""
}

let calculate = () => 
{
    try {
        previosInput.textContent = displayInput.textContent
        let result = eval(displayInput.textContent);
        displayInput.textContent = result;
        pressEqualButton = true
    } catch (error) {
        displayInput.textContent = "Error"
    }
}

let backSpaceInput = () =>  displayInput.textContent = displayInput.textContent.slice(0, -1)

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if ((key >= "0" && key <= "9") || (e.code.startsWith("Numpad") && key >= "0" && key <= "9")) {
        appendinput(key);
    }
    else if (key === ".") {
        appendinput(".");
    }
    else if (key === "+") {
        appendinput(" + ");
    }
    else if (key === "-") {
        appendinput(" - ");
    }
    else if (key === "*") {
        appendinput(" * ");
    }
    else if (key === "/") {
        appendinput(" / ");
    }
    else if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculate();
    }
    else if (key === "Escape") {
        clearInput();
    }
    else if (key === "Backspace") {
        backSpaceInput();
    }
});