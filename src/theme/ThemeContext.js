import React from 'react';
import myTheme from './theme.json';
import _ from 'lodash';

export const themeContextDefaults = {
    themeMode: 'light-theme',
    changeThemeMode: () => { }
};

export { myTheme as Theme };

export const ThemeContext = React.createContext(themeContextDefaults);

/**
 * Helper function to set a new theme
 *
 * @param {string} theme The name of the theme to be set
 *
 * @return {void}
 */
export const applyTheme = (theme) => {
    const themeVariables = mapTheme(theme);

    if (!themeVariables) return;

    const root = document.documentElement;
    Object.keys(themeVariables).forEach((property) => {
        if (property === 'name') {
            return;
        }
        root?.style.setProperty(property, themeVariables[property]);
    });
};

export const mapTheme = (variables) => {
    let themeVariables = {};

    if (variables) {
        Object.keys(variables).map((key) => {
            return _.assign(themeVariables, { [`--${key}`]: variables[key] });

        })
    }

    return themeVariables;
};