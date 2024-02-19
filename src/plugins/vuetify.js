// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import {createVuetify} from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: "theme_light",
    variations: {
      colors: ["primary", "secondary"],
      lighten: 4,
      darken: 4,
    },
    themes: {
      theme_dark: {
        dark: true,
        colors: {
          background: "#000000",
          surface: "#FFFFFF",
          primary: "#6200EE",
          secondary: "#03DAC6",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
          lightbulb: "#fff",
          title: "#FB8C00",
          bgtext: "#212226",
        },
      },
      theme_light: {
        dark: false,
        colors: {
          background: "#F0F2F5",
          surface: "#F0F2F5",
          primary: "#1A73E8",
          secondary: "#03DAC6",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
          lightbulb: "#3a3838",
          title: "#4CAF50",
          bgtext: "#FFFFFF",
        },
      },
    },
  },
});

