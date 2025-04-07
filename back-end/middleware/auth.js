// middleware/auth.js
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
      return next(); // Utilisateur connecté => on continue
    } else {
      return res.redirect('/login'); // Sinon, on le redirige vers /login
      // return res.json({ success: true, redirectUrl: '/' });
    }
  }
  
  module.exports = isAuthenticated;
  