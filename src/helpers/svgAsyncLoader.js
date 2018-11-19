import React from 'react';

class SVGAsyncLoader extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    ref = ref => (this.svgResource = ref)

    componentDidMount() {
        const ajax = new XMLHttpRequest();
        ajax.open("GET", chrome.runtime.getURL('assets/icon-sprites.svg'), true);
        ajax.send();
        ajax.onload = e => {
            this.svgResource.innerHTML = ajax.responseText;
        }
    }

    render() {
        return(
            <div className='svg-resource-container' ref={this.ref}></div>
        );
    }
}

export default SVGAsyncLoader;
