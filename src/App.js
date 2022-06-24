import './App.css';

import { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Contact from './components/Contact'
import Portfolio from './components/Portfolio'
import Resume from './components/Resume'
import About from './components/About'


function App() {

  const [links] = useState([
    {
      name: `About`,
      description: `About Me`
    },
    {
      name: `Portfolio`,
      description: ``
    },
    {
      name: `Resume`,
      description: ``
    },
    {
      name: `Contact`,
      description: ``
    },
  ])

  const [currentLink, setCurrentLink] = useState(links[0])

  // add conditional logic for page rendering
  const renderPage = () => {
    if (currentLink === 'Contact') {
      return <Contact />;
    }
    if (currentLink === 'Portfolio') {
      return <Portfolio />;
    }
    if (currentLink === 'Resume') {
      return <Resume />;
    }
    return <About />;
  };

  // handler using useState() setter to page handler function
  const handlePageChange = (page) => setCurrentLink(page);

  useState(() => {
    handlePageChange('About')
  })




  return (
    <>
      <main className=''>
        <Header handlePageChange={handlePageChange} currentLink={currentLink} setCurrentLink={setCurrentLink} >
        </Header>
        <div className="container" style={{ backgroundColor: '#14213d' }}>
          {renderPage()}
        </div>
      </main>
      <div class="divider"></div>

      <Footer></Footer>
    </>
  );
}

export default App;
