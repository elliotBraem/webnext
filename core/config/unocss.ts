export const config = {
  preflight: true,
  content: ["./**/*.{rs,html,css}", "./**/dist/**/*.html"],
  theme: {},
  plugins: ['require("@tailwindcss/typography")', 'require("daisyui")'],

  daisyui: {
    darkTheme: "akaia",

    themes: [
      {
        akaia: {
          // ...require("daisyui/src/colors/themes")["[data-theme=night]"],

          primary: "#750075",
          secondary: "#29132e",
          accent: "#F471B5",
          neutral: "#00000000",
          "base-100": "#00000000",
          info: "#AA008A",
          success: "#2E7D32",
          warning: "#E43414",
          error: "#aa0035",

          /** border radius rounded-box utility class, used in card and other large boxes */
          "--rounded-box": "0.375rem",
          /** border radius rounded-btn utility class, used in buttons and similar element */
          "--rounded-btn": "0.375rem",
          /** border radius rounded-badge utility class, used in badges and similar */
          "--rounded-badge": "1.9rem",
          /** duration of animation when you click on button */
          "--animation-btn": "0.25s",
          /** duration of animation for inputs like checkbox, toggle, radio, etc */
          "--animation-input": "0.2s",
          /** set default text transform for buttons */
          "--btn-text-case": "uppercase",
          /** scale transform of button when you focus on it */
          "--btn-focus-scale": "0.95",
          /** border width of buttons */
          "--border-btn": "1px",
          /** border width of tabs */
          "--tab-border": "1px",
          /** border radius of tabs */
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
};
