const validateRegisterInput = (username, email, password) => {
    const errors = {};
  
    if (!username || username.trim() === '') {
      errors.username = 'Username is required';
    }
  
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Valid email is required';
    }
  
    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
  
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };
  
  const validatePostInput = (stockSymbol, title, description) => {
    const errors = {};
  
    if (!stockSymbol || stockSymbol.trim() === '') {
      errors.stockSymbol = 'Stock symbol is required';
    }
  
    if (!title || title.trim() === '') {
      errors.title = 'Title is required';
    }
  
    if (!description || description.trim() === '') {
      errors.description = 'Description is required';
    }
  
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };
  
  module.exports = {
    validateRegisterInput,
    validatePostInput,
  };
  