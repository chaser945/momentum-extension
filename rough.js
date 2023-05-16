fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((data) => {
    if (data.errors) {
      throw Error;
    }
  })

  .catch((error) => {
    console.log("Sorry! Data was not found");
  });
