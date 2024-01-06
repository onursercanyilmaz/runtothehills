import React from 'react';
import Router from './components/Router';
import Navbar from './components/Navbar';
import { ThemeProvider } from '@fluentui/react/lib/Theme';
import { FluentProvider, webDarkTheme, Theme } from '@fluentui/react-components';
import { PageProvider, usePage } from './contexts/PageContext';

const myTheme = {
  palette: {
    themePrimary: '#2b88d8',
    themeLighterAlt: '#020509',
    themeLighter: '#071623',
    themeLight: '#0d2941',
    themeTertiary: '#1a5182',
    themeSecondary: '#2678bf',
    themeDarkAlt: '#3e92dd',
    themeDark: '#59a2e2',
    themeDarker: '#81b9ea',
    neutralLighterAlt: '#323130',
    neutralLighter: '#31302f',
    neutralLight: '#2f2e2d',
    neutralQuaternaryAlt: '#2c2b2a',
    neutralQuaternary: '#2a2928',
    neutralTertiaryAlt: '#282726',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#ffffff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#323130',
  }
};

function App() {
const page = usePage();
  // Apply a style to the body to set the background color
  document.body.style.backgroundColor = webDarkTheme.colorNeutralBackground1;

  
//#082338 - dark blue
//#1f1f1f - dark grey
  return (
   
      <ThemeProvider theme={myTheme}>
        <FluentProvider theme={webDarkTheme as Partial<Theme>}>
          {page.pageName!=="Login" && <Navbar />}
          <Router />
        </FluentProvider>
        
      </ThemeProvider>
  );
}

export default App;
