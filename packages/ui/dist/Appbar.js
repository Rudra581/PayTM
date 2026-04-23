"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("./button");
const Appbar = ({ user, onSignin, onSignout }) => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between border-b px-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-lg flex flex-col justify-center", children: "PayTM" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col justify-center pt-2", children: (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: user ? onSignout : onSignin, children: user ? "Logout" : "Login" }) })] }) }));
};
exports.Appbar = Appbar;
