export const getTodoSchema = {
  params: {
    type: 'object',
    properties: {
      id: {type: 'integer'}
    }
  }
}

export const createTodoSchema = {
  body: {
    type: 'object',
    properties: {
      title: {type: 'string'},
      description: {type: 'string'}
    },
    required: ['title'] 
  }
}

export const patchTodoSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer'}
    }
  },
  body: {
    type: 'object',
    properties: {
      title: {type: 'string'},
      description: {type: 'string'},
      completed: {type: 'boolean'}
    }
  }
}

export const deleteTodoSchema = {
  params: {
    type: 'object',
    properties: {
      id: {type: 'integer'}
    },
    required: ['id']
  }
}