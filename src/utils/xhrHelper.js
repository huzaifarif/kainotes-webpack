const callAPI = async (url, callback, method = 'GET', data = null) => {
  try {
    const res = await fetch(url, { method, data });
    return await res.json();
  } catch(err) {
    console.warn(err);
    throw new Error("Api call failed: ", err);
  }
};

export default callAPI;