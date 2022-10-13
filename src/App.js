import Header from './components/Header/Header'
import './App.css';
import BlogPage from './containers/BlogPage/BlogPage';
import Footer from './components/Footer/Footer';
import {BrowserRouter, Route, Routes as Switch} from 'react-router-dom';
import {LoginPage} from './containers/LoginPage/LoginPage'


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />

        <main>
          <Switch>
            <Route exact path="/" element={<BlogPage />}/>
            <Route exact path="/login" element={<LoginPage/>}/>
          </Switch>
        </main>
        <Footer />

      </div>
    </BrowserRouter>
    
  );
}

export default App;
