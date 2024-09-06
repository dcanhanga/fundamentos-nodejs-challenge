function validateRequiredFields(body) {
  if (Object.keys(body).length === 0) {
    return 'Os campos name e description são obrigatórios';
  }
  for (const field of ['name', 'description']) {
    if (!body[field]) {
      return `${field} é obrigatório`;
    }
    if (typeof body[field] !== 'string') {
      return `${field} deve ser uma string`;
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

  response = validateRequiredFields(body);
  if (response) return response;

  return null;
}