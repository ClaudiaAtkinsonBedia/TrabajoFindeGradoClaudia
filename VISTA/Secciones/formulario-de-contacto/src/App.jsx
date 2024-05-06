import { useState } from 'react';
import './App.css';
import FormInput from './components/FormInput';

function App() 
{
    const [username, setUsername] = useState("")
    return (
    <div>
      <form>
        <FormInput placeholder="Username" setUsername={setUsername}/>
        <FormInput placeholder="Email address"/>
        <FormInput placeholder="Message"/>
      </form>
    </div>
  );
}

export default App;