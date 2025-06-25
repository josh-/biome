import { useEffect } from 'react';

// Assume useMyBoolean is defined elsewhere or is a custom hook
// that returns e.g. { value: boolean, toggle: () => void, setTrue: () => void, setFalse: () => void }
// where toggle and setFalse are stable.

// Mocking useMyBoolean for the test runner to understand the binding.
// The actual implementation of useMyBoolean doesn't matter for the lint rule,
// only its configured name and the way its return value's members are accessed.
const useMyBoolean = (initial) => {
    return {
        value: initial,
        toggle: () => {},
        setTrue: () => {},
        setFalse: () => {}
    };
};

function MyComponent() {
  const myBool = useMyBoolean(false); // myBool is { value, toggle, setTrue, setFalse }

  useEffect(() => {
    console.log('Effect using stable toggle');
    myBool.toggle();
  }, []); // toggle is stable via config, so not needed here

  useEffect(() => {
    console.log('Effect using stable setFalse');
    myBool.setFalse();
  }, []); // setFalse is stable via config

  // This usage of a non-stable property should require 'myBool.value' or 'myBool'
  // but this test is focused on the valid cases of stable keys.
  // A separate test will cover when non-stable keys are used.
  return <div>{myBool.value.toString()}</div>;
}

function MyOtherComponent(props) {
  const myBool = props.useMyBoolean(true); // To ensure it handles props too

  useEffect(() => {
    myBool.toggle();
  }, []);

  return <div />;
}
