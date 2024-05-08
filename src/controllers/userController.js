const usersModel = require('../model/usersModel')

const getAll = async(_request, response) => {
  const users = await usersModel.getAll()
  return response.status(200).json(users)
}

const createUser = async (request, response) => {
  try {
    const createdUser = await usersModel.createUser(request.body);
    return response.status(201).json(createdUser);
  } catch (error) {
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}

const signIn = async(request, response) => {
  try{
    const singInUser = await usersModel.signIn(request.body)
     

    return response.status(201).json(singInUser)
   
  }catch(error){

    return response.status(500).json({ error: 'Internal Server Error' });

  }
}
// fim do login

const foods = async (request, response) => {
  const food = await usersModel.foods()
    return response.status(200).json(food)

}

const getCartById = async (request, response) => {
  try {
    const { id } = request.params;
    const cart = await usersModel.getCartById(id);

     response.status(200).json(cart);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
};

const addCart = async (request, response) => {
   try{
    const addToCart = await usersModel.addCart(request.body)

    return response.status(201).json(addToCart)
   
  }catch(error){

    return response.status(500).json({ error: 'Internal Server Error' });

  }
}



module.exports = {
  getAll,
  createUser,
  signIn,
  foods,
  getCartById,
  addCart
}