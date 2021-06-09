import React, { useEffect, useContext } from 'react';
import { ThemeContext } from '../../theme/ThemeContext';

function Header() {
    const theme = useContext(ThemeContext);

    useEffect(() => {
        let crescent = document.getElementById('crescent');
        let toggle = document.getElementById('toggle');
        if (theme.themeMode === 'dark-theme') {
            crescent.style.transform = `scale(0.6)`;
            toggle.style.transform = `translateX(85%)`;
        }
    }, [theme]);

    const toggleAction = (themeMode, changeThemeMode) => {
        let crescent = document.getElementById('crescent');
        let toggle = document.getElementById('toggle');
        let isActive = (themeMode === 'light-theme') ? true : false;
        let xPosition = isActive ? '85%' : '0';
        let scale = isActive ? '0.6' : '0';
        changeThemeMode(isActive);
        crescent.style.transform = `scale(${scale})`;
        toggle.style.transform = `translateX(${xPosition})`;
    }
    return (
        <ThemeContext.Consumer>
            {({ themeMode, changeThemeMode }) => (
                <header className={'app-header'}>
                    <h1><b>Aspect Ratio Calculator</b></h1>
                    <div className={'toggle-switch-container'}>
                        <input
                            type="checkbox"
                            id="switch"
                            checked={(themeMode === 'light-theme') ? true : false}
                            onChange={() => toggleAction(themeMode, changeThemeMode)}
                        />
                        <label htmlFor="switch">
                            <div id={'toggle'} className="toggle"></div>
                            <div className="names">
                                <p className="light">Light</p>
                                <p className="dark">Dark</p>
                            </div>
                        </label>
                    </div>
                </header>
            )}
        </ThemeContext.Consumer>
    )
}

export default Header
