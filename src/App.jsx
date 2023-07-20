import "bootstrap/dist/css/bootstrap.css"; // Bootstrap CSS
import './App.css';
import { useState, useEffect } from "react";

export default function App() {
    const [input, setInput] = useState(null);
    const [queue, setQueue] = useState([]);
    const [result, setResult] = useState("");

    useEffect(() => {
        if (input) {
            if (input === "AC") {
                setQueue([]);
                return;
            }

            if (input === "=") {
                const r = calculate(queue);
                setResult((typeof r === "number" && isFinite(r)) ? r : "ERROR!");
                return;
            }

            if (input === "Deg" || input === "(" || input === ")") {
                setQueue([]);
                return;
            }

            if (queue.length === 0) {
                setQueue([translate(input)]);
            } else {
                if (!Number.isNaN(Number(queue[queue.length - 1])) && (!Number.isNaN(Number(input)) || input === ".")) setQueue([...queue.slice(0, queue.length - 1), queue[queue.length - 1] + input]);
                else setQueue([...queue, translate(input)]);
            }

            setInput(null);
        }
    }, [input]);

    useEffect(() => {
        if (input === "AC") setResult("");
        else if (input === "Deg" || input === "(" || input === ")") setResult("disabled");
        else setResult(queue.join(" "));
    }, [queue]);

    function factorial(num) {
        let result = 1;
        for (let i = 1; i <= num; i++) result *= i;
        return result;
    }

    const unaryOps = {
        "fact": factorial,
        "sin": Math.sin,
        "ln": Math.log,
        "cos": Math.cos,
        "log": Math.log10,
        "tan": Math.tan,
        "√": Math.sqrt,
        "e^": (num) => Math.pow(Math.E, num)
    };

    const binaryOps = {
        "%": (num1, num2) => (num1 / 100) * num2, // "num1 percent of num2"
        "÷": (num1, num2) => num1 / num2,
        "×": (num1, num2) => num1 * num2,
        "-": (num1, num2) => num1 - num2,
        "^": Math.pow,
        "+": (num1, num2) => num1 + num2
    };

    function calculate(q) {
        console.log(q);
        if (q.length === 0) return 0; // Nothing to calculate
        else if (q.length === 1) return Number(q[0]); // Return number
        else if (Object.keys(unaryOps).includes(q[0])) return calculate([unaryOps[q[0]](Number(q[1])), ...q.slice(2)]); // Perform unary operation and "shrink" list
        else if (Object.keys(binaryOps).includes(q[1])) return calculate([binaryOps[q[1]](Number(q[0]), Number(q[2])), ...q.slice(3)]); // Perform binary operation and "shrink" list
    }

    function translate(value) {
        switch (value) {
            case "x!":
                return "fact";
            case "EXP":
                return "e^";
            case "x^y":
                return "^";
            default:
                return value;
        }
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row g-10">
                    <div className="col-12" id="calc">{result}</div>
                </div>
                <div className="row g-10">
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        Deg
                    </div>
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        x!
                    </div>
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        (
                    </div>
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        )
                    </div>
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        %
                    </div>
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        AC
                    </div>
                </div>
                <div className="row g-10">
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        sin
                    </div>
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        ln
                    </div>
                    <div className="btn col-2 light-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        7
                    </div>
                    <div className="btn col-2 light-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        8
                    </div>
                    <div className="btn col-2 light-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        9
                    </div>
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        &divide;
                    </div>
                </div>
                <div className="row g-10">
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        cos
                    </div>
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        log
                    </div>
                    <div className="btn col-2 light-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        4
                    </div>
                    <div className="btn col-2 light-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        5
                    </div>
                    <div className="btn col-2 light-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        6
                    </div>
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        &times;
                    </div>
                </div>
                <div className="row g-10">
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        tan
                    </div>
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        &radic;
                    </div>
                    <div className="btn col-2 light-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        1
                    </div>
                    <div className="btn col-2 light-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        2
                    </div>
                    <div className="btn col-2 light-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        3
                    </div>
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        -
                    </div>
                </div>
                <div className="row g-10">
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        EXP
                    </div>
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        x^y
                    </div>
                    <div className="btn col-2 light-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        0
                    </div>
                    <div className="btn col-2 light-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        .
                    </div>
                    <div className="btn col-2" id="equals" onClick={(e) => setInput(e.target.innerHTML)}>
                        =
                    </div>
                    <div className="btn col-2 dark-gray" onClick={(e) => setInput(e.target.innerHTML)}>
                        +
                    </div>
                </div>
            </div>
        </div>
    );
}
