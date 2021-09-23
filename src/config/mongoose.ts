import mongoose from "mongoose";

const mongoURI =
  "mongodb+srv://bakuryukhanh:khanhkhanh1@cluster0.mpgum.mongodb.net/allbirds";

mongoose.connect(mongoURI, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("DB connect success");
});
