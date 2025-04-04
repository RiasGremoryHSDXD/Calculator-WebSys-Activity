// Display input
const displayInput = document.getElementById("display-input");
const previosInput = document.getElementById("previous-input")

let pressEqualButton = false

let appendinput = (symbol) => {
    const operators = ["+", "-", "*", "/", "%", "≠"];
    
    if (pressEqualButton && !operators.includes(symbol.trim())) {
        displayInput.textContent = "";
    }
    
    displayInput.textContent += symbol;
    pressEqualButton = false;
}


let clearInput = () => {
    previosInput.textContent = ""
    displayInput.textContent = ""
}

let validateInput = (current_input) => {
    const operators = ["+", "-", "*", "/", "%", "≠"];
    let i = 0;
    let count_operation = 0;
    let number_count = 0;

    while (i < current_input.length) {
        if (operators.includes(current_input[i])) count_operation += 1;
        i += 1;
    }

    i = 0;

    while (i < current_input.length) {
        if ((current_input[i] >= "0" && current_input[i] <= "9") || current_input[i] === ".") {
            let hasDot = false;
            let isValidNumber = false;

            while (i < current_input.length && (
                (current_input[i] >= "0" && current_input[i] <= "9") || 
                (!hasDot && current_input[i] === ".")
            )) {
                if (current_input[i] === ".") hasDot = true;
                isValidNumber = true;
                i += 1;
            }
            if (isValidNumber) number_count += 1;
        } else {
            i += 1;
        }
    }
    if ( number_count <= count_operation || (number_count > count_operation && number_count - count_operation != 1)) {
        return false;
    } else {
        return true;
    }
};

let calculate = () => 
{
    try {
        previosInput.textContent = displayInput.textContent + " = "
        if(validateInput(displayInput.textContent)){
            let result = math.evaluate(displayInput.textContent);
            displayInput.textContent = result;
        }else{
            displayInput.textContent = "Error"
        }
        pressEqualButton = true
    } catch (error) {
        displayInput.textContent = "Error"
    }
}

let backSpaceInput = () =>  {
    if(displayInput.textContent[displayInput.textContent.length - 1] == " "){
        displayInput.textContent = displayInput.textContent.slice(0, -3)
    }else{
        displayInput.textContent = displayInput.textContent.slice(0, -1)
    }
}

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