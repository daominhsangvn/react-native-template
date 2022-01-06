import React from 'react';
import {ThemeContext} from './context';

const withTheme = (Component, styleFn) => {
  class ThemedComponent extends React.Component {
    render() {
      return (
        <ThemeContext.Consumer>
          {theme => (
            <Component
              {...this.props}
              theme={{
                ...theme,
                styles: styleFn ? styleFn(theme) : null,
              }}
            />
          )}
        </ThemeContext.Consumer>
      );
    }
  }

  return ThemedComponent;
};

export default withTheme;
