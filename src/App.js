import React, { useState } from 'react';

const UserMention = () => {
  const [text, setText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mention, setMention] = useState('');
  const [users, setUsers] = useState(['Anurag', 'Ravi', 'Kailash', 'Kavita']); // Replace with your user list

  const handleInputChange = (e) => {
    const value = e.target.value;
    setText(value);

    if (value.charAt(value.length - 1) === '@') {
      setShowSuggestions(true);
    } else if (value.charAt(value.length - 1) === ' ' || value.length === 0) {
      setShowSuggestions(false);
    }
    const val = e.target.value.substring(
      e.target.value.lastIndexOf('@') + 1,
      e.target.selectionEnd
    );
    setMention(val);
  };

  // replace last @mention with selected user and colorize the selected user
  const handleSelectUser = (username) => {
    const lastIndex = text.lastIndexOf(`@${mention}`);
  if (lastIndex !== -1) {
    const newText = text.substring(0, lastIndex) + `@${username}` + text.substring(lastIndex + mention.length + 1);
    setText(newText);
  }
  setShowSuggestions(false);
  document.getElementById('message').focus();
  }

  return (
    <div>
      <textarea
        value={text}
        id="message"
        onChange={handleInputChange}
        placeholder="Type '@' to mention users"
      />
      {showSuggestions && (
        <div>
          <ul>
            {users
              .filter((user) => user.toLowerCase().startsWith(mention.toLowerCase()))
              .map((user, index) => (
                <li key={index} onClick={() => handleSelectUser(user)}>
                  {user}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMention;