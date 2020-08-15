import React, { Component } from 'react';

// function App() {
//   return <div><h1>Hello world!</h1></div>;
// }


// class App extends Component {
//   render() {
//     return <div>Hello world!</div>;
//   }
// }

// JSXはアプリの内部でトランスファイルという処理が施されて、
// 以下のようなJavaScriptのコード(React.cerateElement())に変換される。

// class App extends Component {
//   render() {
//     return React.createElement(
//       "div",
//       null,
//       "Hello world!!"
//     );
//   }
// }


// class App extends Component {
//   render() {
//     const greeting = "Hi, Tom!";
//     const dom = <h1 className="foo">{greeting}</h1>;
//     return dom;
//   }
// }

// class App extends Component {
//   render() {
//     return <input type="text" onClick={() => {console.log("I am clicked!")}} />;
//   }
// }

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <label htmlFor="bar">bar</label>
        <input type="text" onChange={() => {console.log("I am changed!")}} />
      </React.Fragment>
    )
  }
}

export default App;
