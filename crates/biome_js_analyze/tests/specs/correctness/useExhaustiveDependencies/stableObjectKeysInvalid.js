import { useEffect } from 'react';

// Mocking useMyBoolean for the test runner
const useMyBoolean = (initial) => {
    return {
        value: initial,
        toggle: () => {},
        setTrue: () => {}, // setTrue is NOT configured as stable
        setFalse: () => {}
    };
};

function MyComponent() {
  const myBool = useMyBoolean(false);

  useEffect(() => {
    console.log('Effect using non-stable setTrue');
    myBool.setTrue(); // setTrue is not in stableResult.keys
  }, []); // Should warn: myBool.setTrue (or myBool if whole object is considered) is missing

  useEffect(() => {
    console.log('Effect using non-stable value');
    console.log(myBool.value); // myBool.value is not in stableResult.keys
  }, []); // Should warn: myBool.value (or myBool) is missing

  return <div>{myBool.value.toString()}</div>;
}
