import { ACTIONS } from "./App"

export default function SpanButton({ dispatch, digit }) {
  return (
    <a className="span-two"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </a>
  )
}