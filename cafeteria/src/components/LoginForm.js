import React, { useState } from 'react';
   
   function LoginForm({ onLogin }) {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
   
     const handleSubmit = (event) => {
       event.preventDefault();
       onLogin(username, password); // Llama a la función de "autenticación"
     };
   
     return (
       <form onSubmit={handleSubmit}>
         <div>
           <label>Usuario:</label>
           <input
             type="text"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
           />
         </div>
         <div>
           <label>Contraseña:</label>
           <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
         </div>
         <button type="submit">Iniciar Sesión</button>
       </form>
     );
   }
   
   export default LoginForm;