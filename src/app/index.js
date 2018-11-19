import React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import App from "./app";

import './index.scss';

class AppContainer extends React.Component {

    render() {
        const head = [<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL('css/__app.css')}></link>];
        return (
            <Frame head={head}>
                <FrameContextConsumer>
                    {
                        ({ document, window }) => (
                            <App document={ document }/>
                        )
                    }
                </FrameContextConsumer>
            </Frame>
        );
    }
}

export default AppContainer;