import React, { useState, useEffect, useMemo } from 'react';
import ErrorBoundary from './shared/ErrorBoundary';
import { ThemeContext, themeContextDefaults, Theme, applyTheme } from './theme/ThemeContext';
import Header from './components/Header';
import RatioCalculator from './components/RatioCalculator';

function App() {
  const [themeMode, setThemeMode] = useState(themeContextDefaults.themeMode);

  const themeContext = useMemo(
    () => ({
      ...themeContextDefaults,
      changeThemeMode: (checked) => {
        let mode = checked ? 'dark-theme' : 'light-theme';
        setThemeMode(mode);
        applyTheme(Theme[mode]);
      },
      themeMode
    }),
    [themeMode],
  );

  useEffect(() => {
    applyTheme(Theme[themeMode]);
  });


  return (
    <ThemeContext.Provider value={themeContext}>
      <ErrorBoundary>
        <div className="app-container">
          {/* <div class="main-circle" /> */}
          <div class="circle">
            <div id={'crescent'} class="crescent"></div>
          </div>
          <Header />
          <main>
            <RatioCalculator />
          </main>
          <div class="mark" />
          <footer class="text-center mt-4 mb-4">
              Copyright &copy; 2021. All rights reserved.
          </footer>
        </div>
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
}

export default App;