

const validateCreateUser = (request, response, next) => {
  const { body } = request

  if (body.name === undefined){
        return response.status(400).json({mensagem: 'The field title is required'})
  }
  if (body.name === ''){
       return response.status(400).json({mensagem: 'The cannot be empty'})
  }
  if (body.email === undefined){
       return response.status(400).json({mensagem: 'The field title is required'})
  }
   if (body.email === ''){
       return response.status(400).json({mensagem: 'The cannot be empty'})
  }
   if (body.confirmEmail === undefined){
       return response.status(400).json({mensagem: 'The field title is required'})
  }
   if (body.confirmEmail === ''){
       return response.status(400).json({mensagem: 'The cannot be empty'})
  }
  if(body.confirmEmail != body.email){
       return response.status(400).json({mensagem: 'emails are different'})
  }
   if (body.password === undefined){
       return response.status(400).json({mensagem: 'The field title is required'})
  }
   if (body.password === ''){
       return response.status(400).json({mensagem: 'The cannot be empty'})
  }
   if (body.confirmPassword === undefined){
       return response.status(400).json({mensagem: 'The field title is required'})
  }
   if (body.confirmPassword === ''){
       return response.status(400).json({mensagem: 'The cannot be empty'})
  }
  if(body.confirmPassword != body.password){
       return response.status(400).json({mensagem: 'password are different'})
  }
  
next()

}

module.exports = {
  validateCreateUser
}