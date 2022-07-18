

const validData = {
  name: 'cristiano ronaldo',
  email: "cristiano@gmail.com",
  password: 'realmadrid'
}

const dataWithNameAlreadyUsed = {
  name: 'Fulana Pereira',
  email: "cristiano@gmail.com",
  password: 'realmadrid'
}

const dataWithEmailAlreadyUsed = {
  name: 'Fulana 2 Pereira',
  email: "fulana@deliveryapp.com",
  password: 'fulana123'
}

const dataWithInvalidPassword = {
  name: 'cristiano ronaldo',
  email: "cristiano@gmail.com",
  password: 'real'
}

const dataWithInvalidEmail = {
  name: 'cristiano ronaldo',
  email: "cristianogmail.com",
  password: 'realmadrid123'
}

const dataWithInvalidName = {
  name: 'CR7',
  email: "cristiano@gmail.com",
  password: 'realmadrid123'
}

const dataWithoutEmail = {
  name: 'cristiano ronaldo',
  password: 'realmadrid'
}

const dataWithoutName = {
  email: "cristiano@gmail.com",
  password: 'realmadrid'
}

const dataWithoutPassword = {
  name: 'cristiano ronaldo',
  email: "cristiano@gmail.com",
}

module.exports = {
  validData,
  dataWithEmailAlreadyUsed,
  dataWithNameAlreadyUsed,
  dataWithInvalidEmail,
  dataWithInvalidName,
  dataWithInvalidPassword,
  dataWithoutEmail,
  dataWithoutName,
  dataWithoutPassword,
}