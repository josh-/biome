import { useEffect } from 'react';

// Mocking useAnotherBoolean for the test runner
const useAnotherBoolean = (initial) => {
    return {
        value: initial,
        toggle: () => {},
        setValue: (_val) => {}
    };
};

function MyComponent() {
  const anotherBool = useAnotherBoolean(true);

  useEffect(() => {
    console.log('Effect using toggle from unconfigured hook');
    anotherBool.toggle(); // useAnotherBoolean is not configured with stable keys
  }, []); // Should warn: anotherBool.toggle (or anotherBool if whole object is considered) is missing

  useEffect(() => {
    console.log(anotherBool.value);
  }, []); // Should warn: anotherBool.value (or anotherBool) is missing

  return <div>{anotherBool.value.toString()}</div>;
}
