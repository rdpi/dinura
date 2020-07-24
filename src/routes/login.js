// in src/routes/login.js
import fetch from 'node-fetch';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export async function post(req, res) {
  try {
    const { identifier, password } = req.body;
    const result = await fetch(`http://localhost:1337/auth/local`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ identifier, password }),
    })

    const parsed = await result.json();

    if (typeof parsed.error !== 'undefined') {
      throw new Error(parsed.error);
    }
    
    req.session.token = parsed.jwt;
    req.session.user = parsed.user;
    res.end(JSON.stringify({ token: parsed.jwt, user: parsed.user }));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}