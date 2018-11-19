import React from 'react';
import { DialogContainer, NavigationDrawer, SVGIcon } from 'react-md';

import SVGAsyncLoader from '../helpers/svgAsyncLoader';
import NavListItems from './components/NavigationListItems';

//Loading all SVGs to create sprite svg, webpack config will take care of it.
import '../assets/svg';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderNode: null,
            showModal: false,
            key: NavListItems[0].key,
            page: NavListItems[0].primaryText
        };

        this.navItems = NavListItems.map(item => {
            if (item.divider) {
                return item;
            }

            return {
                ...item,
                onClick: () => this.setPage(item.key, item.primaryText)
            }
        });
    }

    setPage = (key, page) => {
        this.navItems = this.navItems.map(item => {
            if (item.divider) return item;

            return { ...item, active: item.key === key };
        });

        this.setState({ key, page });
    }

    ref = ref => (this.rootContainer = ref)

    componentDidMount() {
        this.setState({
            showModal: true,
            renderNode: this.rootContainer
        });
    }

    componentWillUnmount() {
        this.setState({
            showModal: false,
            renderNode: null
        });
    }

    render() {
        const { showModal, renderNode, page } = this.state;

        return (
            <React.Fragment>
                <SVGAsyncLoader />
                <DialogContainer
                    id="app-main-container"
                    ref={this.ref}
                    visible={showModal}
                    focusOnMount={false}
                    height="70%"
                    width="80%"
                >
                    <NavigationDrawer
                        renderNode={renderNode}
                        navItems={this.navItems}
                        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
                        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
                        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
                        toolbarTitle="Sample Extension"
                        contentClassName="md-grid"
                        temporaryIcon={<SVGIcon use={'#menu'} />}
                    >
                        <h2 className="md-cell md-cell--12">Currently on page: {page}</h2>
                        <section className="md-text-container md-cell md-cell--12">
                            <p>asldjfkljsadlkfjkljaslkdfjlkjaslkdjflk</p>
                            <p>jdskjlksajdfkljlksajfkl alksjfd lkj sflkklajs flkjljsf</p>
                        </section>
                    </NavigationDrawer>
                </DialogContainer>
            </React.Fragment>
        );
    }
}

export default App;