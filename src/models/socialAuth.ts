import { model, Schema } from "mongoose";

export interface ISocialAuth {
  id: String;
  provider: String;
  firstName: String;
  lastName: String;
  email: String;
}

const SocialAuth = new Schema<ISocialAuth>({
  provider: String,
  id: String,
  firstName: String,
  lastName: String,
  email: String,
});

export const SocialAuthModel = model<ISocialAuth>("socialauth", SocialAuth);
