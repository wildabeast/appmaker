var Domain = {}

Domain.validate = function (domain) {
  
  if (!domain)
    return 'No domain provided'
  
  if (domain.match(/[^0-9a-z\-\.]/i))
    return 'Invalid character in domain'

  if (domain.length > 32)
    return 'Domain too long'
  
  return false
}

Domain.format = function (domain) {
  return domain.toLowerCase().replace(/ /g, '')
}

// If Node.js, export as a module.
if (typeof exports != 'undefined')
  module.exports = Domain;
