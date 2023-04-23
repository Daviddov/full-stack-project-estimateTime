

export async function fetchData(url, method, data) {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Failed to add task');
  }
  if (response.status === 200) {
    return response.json();

  }else{
  console.log(response.status);
  }
}