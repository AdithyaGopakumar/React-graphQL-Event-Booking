const fetchAPI = (body) => {
  fetch("http://localhost:5000/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type":"application/json"
    },
  }).then((res)=>{
    if(res.status !== 200 && res.status !== 200){
      throw new Error("Failed")
    }
    return res.json()
  }).then((data)=>{
    console.log(data)
    return data
  })
  .catch((err)=>{console.log(err);})
}

export default fetchAPI