import { cube } from './math.js';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

function component() {
  var element = document.createElement("pre");

  element.innerHTML = ["Hello webpack!", "5 cubed is equal to " + cube(5)].join("\n\n");

  return element;
}

let element = component(); // Store the element to re-render on print.js changes
document.body.appendChild(element);

const sayMyName = () => console.log("Jordan");

const test = `test`;
const testString = `This is just a ${test}`;

console.log(test);

if (module.hot) {
  module.hot.accept("./print.js", () => {
    console.log("Accepting the updated printMe module!");
    document.body.removeChild(element);
    element = component(); // Re-render the "component" to update the click handler
    document.body.appendChild(element);
  });
}
