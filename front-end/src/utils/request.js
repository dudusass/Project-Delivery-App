const request = (url, method, headers, body) => {
  const myRequest = new Request(url, {
    headers,
    method,
    body,
  });

  return fetch(myRequest)
    .then((response) => response.json())
    .then((response) => response);
};

module.exports = request;
