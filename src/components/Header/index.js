import React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';

function Header() {
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
                    <h1>Aspect Ratio Calculator</h1>
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
