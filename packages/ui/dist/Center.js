"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Center = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Center = ({ children }) => {
    return (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center flex-col h-full", children: (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: children }) });
};
exports.Center = Center;
