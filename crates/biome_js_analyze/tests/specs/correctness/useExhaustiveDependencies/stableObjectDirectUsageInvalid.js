import { useEffect } from 'react';

const useMyBoolean = (initial) => {
    return {
        value: initial,
        toggle: () => {},
        anotherFunc: () => {}
    };
};

function MyComponent() {
  const myBool = useMyBoolean(false); // Only 'toggle' is stable via config

  useEffect(() => {
    console.log(myBool); // Direct usage of myBool object
  }, []); // Should warn: myBool is missing

  useEffect(() => {
    // This is fine, toggle is configured as a stable key
    myBool.toggle();
  }, []);

  useEffect(() => {
    console.log(myBool.value); // Usage of a non-stable property (value)
  }, []); // Should warn: myBool.value (or myBool) is missing

  useEffect(() => {
    myBool.anotherFunc(); // Usage of a non-stable method
  }, []); // Should warn: myBool.anotherFunc (or myBool) is missing
}
