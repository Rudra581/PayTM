"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button = ({ onClick, children }) => {
    return ((0, jsx_runtime_1.jsx)("button", { onClick: onClick, type: "button", className: "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2", children: children }));
};
exports.Button = Button;
