module.exports = {
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
  extends: [
    "eslint:recommended", // base eslint rules
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended", // disabled ESlint base rules that will conflict with TS
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "prettier", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
  ],
  rules: {
    "no-debugger": "off",
    "react/prop-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "import/no-unresolved": "off",
    "import/namespace": ["error", { allowComputed: true }],
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "prettier/prettier": 0,
    "react/display-name": "off",
  },
};
