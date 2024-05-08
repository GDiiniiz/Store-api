const connection = require('./connection')
const {hash, compare} = require('bcrypt')
const {randomInt} = require('node:crypto')

const getAll = async () => {
  const [users] = await connection.execute('SELECT * FROM users')
  return users
}

const createUser = async (user) => {
  const { name, email, confirmEmail, password, confirmPassword } = user

  const randomSalt = randomInt(10, 16)
  const hashedPassword = await hash(password, randomSalt);

  const hashedConfirmPassword = await hash(confirmPassword, randomSalt);

  const query = 'INSERT INTO users(name, email, confirmEmail, password, confirmPassword) VALUES (?, ?, ?, ?, ?)'
  const [createdUser] = await connection.execute(query, [name, email, confirmEmail, hashedPassword, hashedConfirmPassword])

  return createdUser

}

const signIn = async (user) => {
  const { email, password } = user;

  const query = 'SELECT * FROM users WHERE email = ?';
  const [signInUser] = await connection.execute(query, [email]);

  
  const isValidPassword = await compare(password, signInUser[0].password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  return signInUser;
};

const foods = async () => {
  const [food] = await connection.execute('SELECT * FROM foods')

  return food
}

const getCartById = async (userId) => {
  const query = 
  `SELECT
    c.*, f.name, f.value
  FROM
    cart c
  LEFT JOIN
    foods f
  ON f.id = c.food_id
  WHERE c.user_id = ?
  `;
  
  const [cartDetails] = await connection.execute(query, [userId]);
  return cartDetails;
};


const addCart = async (user) => {
  const {user_id, food_id } = user

    const query = 'INSERT INTO cart (user_id, food_id) VALUES (?, ?)';

    const [addToCart] = await connection.execute(query, [user_id, food_id])

      return addToCart ;


}


module.exports = {
  getAll,
  createUser,
  signIn,
  foods,
  getCartById,
  addCart
}