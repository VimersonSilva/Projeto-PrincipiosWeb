import Joi from 'joi';
export const cartItemSchema = Joi.object({
  productId: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'O ID do produto deve ser um número',
      'number.integer': 'O ID do produto deve ser um inteiro',
      'number.positive': 'O ID do produto deve ser positivo',
      'any.required': 'O ID do produto é obrigatório'
    }),
    
  quantity: Joi.number().integer().min(1).required()
    .messages({
      'number.base': 'A quantidade deve ser um número',
      'number.integer': 'A quantidade deve ser um inteiro',
      'number.min': 'A quantidade mínima é 1',
      'any.required': 'A quantidade é obrigatória'
    })
});

export const updateQuantitySchema = Joi.object({
  quantity: Joi.number().integer().min(0).required()
    .messages({
      'number.base': 'A quantidade deve ser um número',
      'number.integer': 'A quantidade deve ser um inteiro',
      'number.min': 'A quantidade não pode ser negativa',
      'any.required': 'A quantidade é obrigatória'
    })
});

export const checkoutSchema = Joi.object({
  paymentMethod: Joi.string().valid('credit_card', 'debit_card', 'pix', 'boleto').required()
    .messages({
      'string.base': 'O método de pagamento deve ser texto',
      'any.only': 'Método de pagamento inválido',
      'any.required': 'O método de pagamento é obrigatório'
    }),
    
  shippingAddress: Joi.object({
    street: Joi.string().required(),
    number: Joi.string().required(),
    complement: Joi.string().allow(''),
    neighborhood: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().length(2).required(),
    zipCode: Joi.string().pattern(/^\d{5}-\d{3}$/).required()
  }).required()
});

export const productIdParamSchema = Joi.object({
  productId: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'O ID do produto deve ser um número',
      'number.integer': 'O ID do produto deve ser um inteiro',
      'number.positive': 'O ID do produto deve ser positivo',
      'any.required': 'O ID do produto é obrigatório'
    })
});