let number = document.getElementById('display');
let count = 0;

function inputOperand(operand) {
    count = 0;
    number.value += operand;
}
function inputNumber(num) {
    restart();
    document.getElementById('display').value += `${num}`;
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 48 || event.keyCode == 96) {
        inputNumber(0);
    }
    else if (event.keyCode == 49 || event.keyCode == 97) {
        inputNumber(1);
    }
    else if (event.keyCode == 50 || event.keyCode == 98) {
        inputNumber(2);
    }
    else if (event.keyCode == 51 || event.keyCode == 99) {
        inputNumber(3);
    }
    else if (event.keyCode == 52 || event.keyCode == 100) {
        inputNumber(4);
    }
    else if (event.keyCode == 53 || event.keyCode == 101) {
        inputNumber(5);
    }
    else if (event.keyCode == 54 || event.keyCode == 102) {
        inputNumber(6);
    }
    else if (event.keyCode == 55 || event.keyCode == 103) {
        inputNumber(7);
    }
    else if (event.keyCode == 56 || event.keyCode == 104) {
        inputNumber(8);
    }
    else if (event.keyCode == 57 || event.keyCode == 105) {
        inputNumber(9);
    }
    else if (event.keyCode == 13) {
        displayResult();
    } else if (event.keyCode == 107) {
        inputOperand('+');
    }
    else if (event.keyCode == 109) {
        inputOperand('-')
    } else if (event.keyCode == 106) {
        inputOperand('*')
    } else if (event.keyCode == 111) {
        inputOperand('/')
    }

});

function displayResult() {
    if (number.value != "") {
        let text = `${number.value}`;
        try {
            let display = eval(number.value);
            document.getElementById('display').value = display;
            console.log(`${text} = ${display}`);

            updateHistory(text, display);
        }
        catch (errorMessage) {
            alert("Please try again, Thank you!");
            console.log(`${errorMessage}: '${text}'\nPlease try again, Thank you!`);
            clearResult();
        }
    }
    return display;
}
function updateHistory(text, display) {
    let history = `<p>${text} = ${display}</p>`;
    document.getElementById('histry').innerHTML += history;

    // Get a reference to the div you want to auto-scroll.
    var someElement = document.querySelector('#histry');
    // Create an observer and pass it a callback.
    var observer = new MutationObserver(scrollToBottom);
    // Tell it to look for new children that will change the height.
    var config = { childList: true };
    observer.observe(someElement, config);
    function animateScroll(duration) {
        var start = someElement.scrollTop;
        var end = someElement.scrollHeight;
        var change = end - start;
        var increment = 20;
        function easeInOut(currentTime, start, change, duration) {
            // by Robert Penner
            currentTime /= duration / 2;
            if (currentTime < 1) {
                return change / 2 * currentTime * currentTime + start;
            }
            currentTime -= 1;
            return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
        }
        function animate(elapsedTime) {
            elapsedTime += increment;
            var position = easeInOut(elapsedTime, start, change, duration);
            someElement.scrollTop = position;
            if (elapsedTime < duration) {
                setTimeout(function () {
                    animate(elapsedTime);
                }, increment)
            }
        }
        animate(0);
    }
    // Here's our main callback function we passed to the observer
    function scrollToBottom() {
        var duration = 300 // Or however many milliseconds you want to scroll to last
        animateScroll(duration);
    }

    count++;
}

function restart(){
    if (count > 0) {
        clearResult();
    }
    count = 0;
}

function clearResult() {
    document.getElementById('display').value = "";
}
function clearHistory() {
    if (confirm("Are you sure you want to clear your history?")) {
        document.getElementById('histry').innerHTML = "";
    }
}
