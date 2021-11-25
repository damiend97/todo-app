import './App.css';

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Todo } from './models';

Amplify.configure(awsconfig);


function App() {
    return (
        <div className="App">
            hello
        </div>
    );
}

export default App;
