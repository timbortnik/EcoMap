app.factory('msgError', function(toaster) {
  return msgError = {
    'alreadyExist': ' Дане ім’я вже зарезервоване.',
    'alreadyBinded': ' Так як дані вже прив’язані.',
    'incorectData': ' Так як дані невірні.',
    'incorrectPhoto': ' Неправильний формат фото або таке фото вже існує.',
    'couldntDelete': ' Файл не видалено.'
  }
})
