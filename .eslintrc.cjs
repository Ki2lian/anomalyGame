module.exports = {
	"settings": {
		"react": {
			"version": "detect"
		}
	},
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/jsx-runtime",
        "prettier",
        "plugin:@typescript-eslint/recommended",
		"plugin:@react-three/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react", "react-refresh", "html", "@typescript-eslint", "@stylistic/ts", "@stylistic/js", "unused-imports", "simple-import-sort"],
	"overrides": [
        {
            "files": ["*.js", "*.jsx", "*.ts", "*.tsx"],
            "rules": {
                "no-unused-vars": "off",
                "unused-imports/no-unused-imports": "error",
                "unused-imports/no-unused-vars": [
                    "warn",
                    {
                        "vars": "all",
                        "varsIgnorePattern": "^_",
                        "args": "after-used",
                        "argsIgnorePattern": "^_"
                    }
                ]
            }
        }
    ],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		"@typescript-eslint/no-unused-vars": "off",
		"react/jsx-key": "off",
		"react/no-unknown-property": "off",
		"@typescript-eslint/consistent-type-definitions": "error",
		"@typescript-eslint/ban-types": [
            "error",
            {
                "types": {
                    "String": true,
                    "Boolean": true,
                    "Number": true,
                    "Symbol": true,
                    "{}": false,
                    "Object": false,
                    "object": false,
                    "Function": false
                },
                "extendDefaults": true
            }
        ],
		"@stylistic/ts/type-annotation-spacing": ["error", { "before": false, "after": true }],
		"@stylistic/js/indent": ["error", 4],
		"@stylistic/js/object-curly-spacing": ["error", "always", { "arraysInObjects": true, "objectsInObjects": false }],
		"@stylistic/js/key-spacing": ["error"],
		"@stylistic/js/keyword-spacing": ["error", { "before": true, "after": true }],
		"@stylistic/js/comma-dangle": ["error", "always-multiline"],
		"@stylistic/js/comma-spacing": "error",
		"@stylistic/js/template-curly-spacing": ["error", "always"],
		"@stylistic/js/array-bracket-spacing": ["error", "always"],
		"@stylistic/js/no-multi-spaces": ["error"],
		"@stylistic/js/arrow-spacing": ["warn", { "before": true, "after": true }],
		"@stylistic/js/comma-style": "error",
		"@stylistic/js/dot-location": ["error", "property"],
		"@stylistic/js/max-statements-per-line": ["error", { "max": 2 }],
		"@stylistic/js/no-floating-decimal": "error",
		"@stylistic/js/no-trailing-spaces": ["error"],
		"@stylistic/js/jsx-quotes": ["error", "prefer-double"],
		"@stylistic/js/quotes": [
			"error",
			"double",
			{
				"avoidEscape": true,
				"allowTemplateLiterals": true
			}
		],
		"@stylistic/js/space-before-blocks": "error",
		"@stylistic/js/space-in-parens": "error",
		"@stylistic/js/space-infix-ops": "error",
		"@stylistic/js/space-unary-ops": "error",
		"@stylistic/js/spaced-comment": "error",
		"@stylistic/js/wrap-regex": "error",
		"curly": ["error", "multi-line", "consistent"],
		"max-nested-callbacks": ["error", { "max": 4 }],
		"no-console": "off",
		"no-empty-function": "error",
		"no-inline-comments": "error",
		"no-lonely-if": "error",
		"no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1, "maxBOF": 0 }],
		"no-shadow": ["error", { "allow": ["err", "resolve", "reject"] }],
		"no-var": "error",
		"prefer-const": "error",
		"semi": ["error", "always"],
		"space-before-function-paren": [
			"error",
			{
				"anonymous": "never",
				"named": "never",
				"asyncArrow": "always"
			}
		],
		"yoda": "error",
		"react/prop-types": ["off"],
		"simple-import-sort/imports": "error",
    	"simple-import-sort/exports": "error",
    },
};
