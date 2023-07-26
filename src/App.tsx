import Routes from './Routes';

import './App.scss';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h2 className="visually-hidden">header</h2>
            </header>
            <main className="App-main">
                <h2 className="visually-hidden">main</h2>
                <Routes />
            </main>
            <footer className="App-footer">
                <h2 className="visually-hidden">footer</h2>
            </footer>
        </div>
    );
}

export default App;
