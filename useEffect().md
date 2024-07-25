# Common use cases:

- Data fetching

- Setting up subscriptions or event listeners

- Manually changing the DOM

- Logging

- Updating document title

  ## Data fetching

```javascript
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
// with cleanup function
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to track mounted state

    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (isMounted) {
          setUsers(data);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };

    fetchUsers();

    // Cleanup function
    return () => {
      isMounted = false; // Set flag to false when component unmounts
    };
  }, []); // Empty dependency array means this effect runs once on mount

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```
### Setting up subscriptions or event listeners

```javascript
import React, { useState, useEffect } from 'react';

function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Function to update state with new window dimensions
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h2>Window Size:</h2>
      <p>Width: {windowSize.width}px</p>
      <p>Height: {windowSize.height}px</p>
    </div>
  );
}
```
### Manually changin the DOM
```javascript
import React, { useState, useEffect, useRef } from 'react';

function AutoFocusInput() {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // Effect for auto-focusing the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Empty dependency array means this runs once on mount

  // Effect for changing the background color based on input content
  useEffect(() => {
    if (inputRef.current) {
      if (inputValue.length > 5) {
        inputRef.current.style.backgroundColor = '#e6ffe6'; // Light green
      } else {
        inputRef.current.style.backgroundColor = 'white';
      }
    }
  }, [inputValue]); // This effect runs whenever inputValue changes

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type here..."
      />
      <p>Character count: {inputValue.length}</p>
    </div>
  );
}
```
