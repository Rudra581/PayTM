"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TextInput = ({ placeholder, onChange, label, value, disabled, }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "pt-2", children: [(0, jsx_runtime_1.jsx)("label", { className: "block mb-2 text-sm font-medium text-gray-900", children: label }), (0, jsx_runtime_1.jsx)("input", { value: value, disabled: disabled, onChange: (e) => onChange(e.target.value), className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5", placeholder: placeholder })] }));
};
exports.TextInput = TextInput;
