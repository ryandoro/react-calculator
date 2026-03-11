import {
  useState,
  useRef,
  useLayoutEffect
} from "react"; 
import "./App.css";

function App() { 
  const inputRef = useRef(null); 
  const resultRef = useRef(null); 
  const resultTextRef = useRef(null);
  const [result, setResult] = useState(0); 
  const isResultMessage = typeof result === "string";

  useLayoutEffect(() => {
    const resultNode = resultRef.current;
    const resultTextNode = resultTextRef.current;

    if (!resultNode || !resultTextNode) {
      return;
    }

    const fitResultText = () => {
      const rootFontSize =
        Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
      const maxRem = isResultMessage ? 1.35 : 1.95;
      const minRem = isResultMessage ? 0.9 : 0.45;
      const maxPx = maxRem * rootFontSize;
      const minPx = minRem * rootFontSize;
      const resultNodeStyles = window.getComputedStyle(resultNode);
      const horizontalPadding =
        Number.parseFloat(resultNodeStyles.paddingLeft) +
        Number.parseFloat(resultNodeStyles.paddingRight);
      const availableWidth = resultNode.clientWidth - horizontalPadding;
      let lowPx = minPx;
      let highPx = maxPx;
      let bestPx = minPx;

      resultTextNode.style.fontSize = `${maxPx}px`;

      for (let i = 0; i < 14; i += 1) {
        const midPx = (lowPx + highPx) / 2;
        resultTextNode.style.fontSize = `${midPx}px`;

        if (resultTextNode.scrollWidth <= availableWidth) {
          bestPx = midPx;
          lowPx = midPx;
        } else {
          highPx = midPx;
        }
      }

      resultTextNode.style.fontSize = `${bestPx}px`;
    };

    fitResultText();
    window.addEventListener("resize", fitResultText);

    return () => {
      window.removeEventListener("resize", fitResultText);
    };
  }, [result, isResultMessage]);
 
  function plus(e) { 
    e.preventDefault(); 
    setResult((result) => result + Number(inputRef.current.value)); 
  }; 
 
  function minus(e) { 
  	// Add the code for the minus function 
    e.preventDefault(); 
    setResult((result) => result - Number(inputRef.current.value)); 
  };
 
  function times(e) { 
    // Add the code for the plus function 
    e.preventDefault(); 
    setResult((result) => result * Number(inputRef.current.value)); 
  }; 
 
  function divide(e) {
    e.preventDefault();
    const dividingNum = Number(inputRef.current.value);

    if (dividingNum === 0) {
      setResult("Cannot divide by zero!");
    } else {
      setResult(result / dividingNum);
    }
  }

 
  function resetInput(e) { 
    // Add the code for the resetInput function 
    e.preventDefault(); 
    inputRef.current.value = "Type a number";
  }; 
 
  function resetResult(e) { 
  	// Add the code for the resetResult function 
    e.preventDefault(); 
    setResult((result) => result = 0);
  }; 
 
  return ( 
    <div className="App"> 
      <div className="calculator-shell"> 
        <h1 className="calculator-title">React Calculator</h1> 
        <form className="calculator-form"> 
          <div className="display-panel">
            <p className={`result-display${isResultMessage ? " result-display--message" : ""}`} ref={resultRef}> 
              <span className="result-text" ref={resultTextRef}>{result}</span> 
            </p> 
            <input
              className="number-input"
              pattern="[0-9]" 
              ref={inputRef} 
              type="number" 
              placeholder="Type a number" 
            /> 
          </div>
          <div className="keypad">
            <button className="btn btn-utility btn-wide" onClick={resetInput}>Reset Input</button>
            <button className="btn btn-utility btn-wide" onClick={resetResult}>Reset Result</button>
            <button className="btn btn-operator" onClick={plus}>Add</button>
            <button className="btn btn-operator" onClick={minus}>Subtract</button>
            <button className="btn btn-operator" onClick={times}>Multiply</button>
            <button className="btn btn-operator" onClick={divide}>Divide</button>
          </div>
        </form> 
      </div>
    </div> 
  ); 
} 
 
export default App; 
