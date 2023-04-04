import './App.css';
import { useReducer } from "react"
import DigitButton from "./DigitButton"
import OperationButton from "./OperationButton"
import SpanButton from './SpanButton';

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  INVERT: "invert",
  EVALUATE: "evaluate",
  PERCENT: "percent",
}
function reducer(state, { type, payload }) {
switch (type) {
  case ACTIONS.ADD_DIGIT:
      if(payload.digit == "." && state.currentOperand.includes(".")) return state;
      
      if (state.overwrite){
        return{
          ...state,
          currentOperand:payload.digit,
          overwrite:false,
        }
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    
  case ACTIONS.CHOOSE_OPERATION:
    if(state.previousOperand == null && state.currentOperand == null){
      return state;
    }
    if(state.previousOperand == null){
      return{
        ...state,
        operation:payload.operation,
        previousOperand:state.currentOperand,
        currentOperand:null,
      }
    }
    if(state.currentOperand == null){
      return{
        ...state,
        operation:payload.operation,
      }
    }
    return{
      ...state,
      operation:payload.operation,
      previousOperand:evaluate(state.previousOperand,state.currentOperand,state.operation),
      currentOperand:null,
    }  

  case ACTIONS.EVALUATE:
  state.overwrite = true;
    if(state.previousOperand==null || state.currentOperand==null || state.operation == null){
      return state;
    }  
    return{
      ...state,
      currentOperand:evaluate(state.previousOperand,state.currentOperand,state.operation),
      previousOperand:null,
      operation:null,
    }

  case ACTIONS.INVERT:
    if(state.previousOperand==null && state.currentOperand==null && state.operation == null){
      return state;
    }  
    return{
      ...state,
      currentOperand: state.currentOperand * -1,
    }

  case ACTIONS.PERCENT:
    if(state.previousOperand==null && state.currentOperand==null && state.operation == null){
      return state;
    }  
    return {
      ...state,
      currentOperand: state.currentOperand / 100,
    }
  case ACTIONS.CLEAR:
    return{};


  }
}
function evaluate(previousOperand,currentOperand,operation){
  let res = null;
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  switch(operation){
    case '+':
      res = previous + current;
      return res;
    case '-':
      res = previous - current;
      return res;
    case 'X':
      res = previous * current;
      return res;
    default:
      res= previous / current;   
      return res;     
  }
}
function App() {
  const[{currentOperand,previousOperand,operation}, dispatch] = useReducer(reducer,{})
  return (
    <div className='calculator-grid'>

      <div className='result'>
      <div className='previous-operand'> {previousOperand} {operation}</div>
      <div className='current-operand'>  {currentOperand}</div>
      </div>

      <button className='grey'         onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button className='grey'onClick={() => dispatch({ type: ACTIONS.INVERT })}>+/-</button>
      <button className='grey' onClick={() => dispatch({ type: ACTIONS.PERCENT })}>%</button>

      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="X" dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />

      <SpanButton digit="0" dispatch={dispatch} />
      
      <DigitButton digit="." dispatch={dispatch} />
      <button className='equal' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}> = </button>

    </div>
  );
}

export default App;
