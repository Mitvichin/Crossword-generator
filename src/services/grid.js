export const saveGrid = async (grid, words) => {
  let body = JSON.stringify({ grid });

  return fetch(`${process.env.REACT_APP_ENDPOINT_URL}/grid`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    }

    let data = await res.json();
    throw new Error(data.message);
  });
};
