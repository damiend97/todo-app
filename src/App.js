import './App.css';

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig);

import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Todo } from './models';

function App() {
    return (
        <div className="App">
            hello
        </div>
    );
}

export default App;
