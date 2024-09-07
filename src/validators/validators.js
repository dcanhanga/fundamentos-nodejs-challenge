function validateRequiredFields(body, fields) {

  if (Object.keys(body).length === 0) {
    return `Os campos ${['title', 'description'].toString()} são obrigatórios`;
  }
  for (const field of fields) {
    if (!body[field]) {
      return `${field} é obrigatório`;
    }
    if (typeof body[field] !== 'string') {
      return `${field} deve ser uma string`;
    }
      if (body[field].length <= 4) {
      return `${field}, deve ter no mínimo quatro caracteres`;
    }
  }
  return null;
}

function validateOptionalFields(body, fields) {

  if (Object.keys(body).length === 0) {
    return `Deve fornecer um dos seguintes campos: ${['title', 'description'].toString()} para atualizar a tarefa`;
  }
  for (const field of fields) {
    if (body[field] && typeof body[field] !== 'string') {
      return `${field} deve ser uma string`;
    }

      if (body[field] && body[field].length <= 4) {
      return `${field}, deve ter no mínimo quatro caracteres`;
    }
  }
  return null;
}

function validateBodyNotEmpty(body) {
  if (body === null || body === undefined) {
    return 'O Corpo da requisição está vazio';
  }
  return null;
}

function validateBodyIsObject(body) {
  if (typeof body !== 'object' || Array.isArray(body)) {
    return 'O Corpo da requisição deve ser um objeto válido';
  }
  return null;
}

export function validateCreateTaskPayload(body) {
  let response = validateBodyNotEmpty(body);
  if (response) return response;
  response = validateBodyIsObject(body);
  if (response) return response;
  response = validateRequiredFields(body,['title', 'description']);
  if (response) return response;
  return null;
}

export function validateUpdateTaskPayload(body) {
  let response = validateBodyNotEmpty(body);
  if (response) return response;
  response = validateBodyIsObject(body);
  if (response) return response;
  response = validateOptionalFields(body, ['title', 'description'])
  if(response) return response;
  return null;
}