import React from 'react';
import NavigationBar from "./NavigationBar";
import FlashMessagesList from './flash/FlashMessagesList';
import 'bootstrap/dist/css/bootstrap.css';
import '../theme/default/css/App.css';

class App extends React.Component{
    render() {
        return(

            <div className="container">
                <NavigationBar />
                <FlashMessagesList />
                {this.props.children}
            </div>
        )
    }
}
export default App;
