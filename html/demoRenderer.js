const React = require(`react`);
const ReactDOM = require(`react-dom`);

module.exports = mountNode => {
    ReactDOM.render(
        React.createElement(require('./Demo.jsx'), {}), mountNode
    );
};
