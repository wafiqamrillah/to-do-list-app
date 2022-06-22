import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="fixed w-full top-0 z-30">
                <div className=" border border-gray-400 bg-gradient-to-b from-gray-100 to-gray-400 shadow-lg">
                    <div className="p-3 font-bold leading-5">
                        { this.props.title }
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;