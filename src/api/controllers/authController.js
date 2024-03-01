const express = require('express');
const axios = require('axios');
const config = require('../../../config/appConfig');

class AuthController {
  // Handles callback from GitHub after user authentication
  static async handleGithubCallback(req, res) {
    const { code } = req.query;

    try {
      // Exchanges authorization code for an access token
      const { data } = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: config.github.clientId,
          client_secret: config.github.clientSecret,
          code
        },
        {
          headers: {
            accept: 'application/json'
          }
        }
      );

      const { access_token: accessToken } = data;

      // Sets a secure, HTTP-only cookie with the access token
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: 'none',
        secure: true
      });
      // Redirects user back to the frontend of the application
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static signOutFromGithub(req, res) {
    try {
      res.cookie('accessToken', '', {
        maxAge: 0
      });
      res.status(200).json({ message: 'User signed out' });
    } catch (error) {
      res.send(error);
    }
  }

  static verifyUser(req, res, next) {
    // Prevent caching of response
    res.set('Cache-Control', 'no-store');

    console.log('Cookies:', req.cookies);

    // Extract the access token from the cookie
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      res.status(403).send('Unauthorized: No access token provided');
      return;
    }

    AuthController.getCurrentUser(req, res, next, false);
  }

  static getCurrentUser(req, res, next, endpoint = true) {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(403).send('Unauthorized: Session expired');
    }

    // Use the access token to fetch the user's GitHub profile
    axios
      .get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${accessToken}`
        }
      })
      .then(response => {
        const user = response.data;
        if (endpoint) {
          res.status(200).json(user);
        } else {
          // Attach the user's GitHub profile to the request object
          req.user = user;
          next();
        }
      })
      .catch(error => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          res.status(401).send('Unauthorized: Invalid or expired token');
        } else {
          res.status(500).json({ error: 'Internal server error' });
        }
      });
  }
}

module.exports = AuthController;
