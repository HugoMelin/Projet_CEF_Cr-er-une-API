const { json } = require('express');
const { body, validationResult } = require('express-validator');

const User = require('../models/user');

exports.dashboard = async (req, res, next) => {
    try {
        const users = await User.find({})
        return res.render('dashboard', { 
            title: 'Tableau de bord', 
            users: users 
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.body.user;
        let user = await User.findById(userId);

        return res.render('updateUser', {
            title: "Update user",
            user: user
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.update = async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let temp = {
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password
          }

    try {
      const id = req.params.id;
  
      const token = req.cookies.token;

      // Check si présence du token
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing authorization token' });
      }
  
      // Patch request avec token et gestion de l'erreur
      fetch(`http://${process.env.API_URL}:3000/users/${id}`, {
        method: "PATCH",
        headers: {
          'authorization': `Bearer ${token}`, // Inclusion du tekon dans le header
          "Content-Type": "application/json",
        },
        body: JSON.stringify(temp),
      })
        .then(response => {
          if (response.ok) {
            //console.log("Utilisateur modifier ");
            return res.redirect('/tableau-de-bord');
          } else {
            return response.json().then(errorData => {
              return res.status(response.status).json(errorData);
            });
          }
        })
        .catch(error => {
          console.error('Error updating user:', error);
          return res.status(500).json({ message: 'Internal Server Error' });
        });
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.body.user;

        return res.redirect(`/tableau-de-bord/deleteUser/${userId}`);
    } catch (error) {
        return res.status(500).json(error);
    }
}


exports.delete = async (req, res, next) => {
        try {
          const id = req.params.id;
      
          const token = req.cookies.token;

          // Check si présence du token
          if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing authorization token' });
          }
      
          // Delete request avec token et gestion de l'erreur
          fetch(`http://${process.env.API_URL}:3000/users/${id}`, {
            method: "DELETE",
            headers: {
              'authorization': `Bearer ${token}`, // Inclusion du tekon dans le header
            }
          })
            .then(response => {
              if (response.ok) {
                //console.log("Utilisateur supprimé ");
                return res.redirect('/tableau-de-bord');
              } else {
                return response.json().then(errorData => {
                  return res.status(response.status).json(errorData);
                });
              }
            })
            .catch(error => {
              console.error('Error deleting user:', error);
              return res.status(500).json({ message: 'Internal Server Error' });
            });
        } catch (error) {
          console.error('Unexpected error:', error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
      };