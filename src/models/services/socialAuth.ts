import { ISocialAuth, SocialAuthModel } from "../socialAuth";

export const createSocialAccount = async (info: ISocialAuth) => {
  console.log(info);
  const newSocialAccount = new SocialAuthModel(info);
  const account = await newSocialAccount.save();
  return account;
};

export const getSocialAccountInfo = async (id: string) => {
  const account = await SocialAuthModel.findOne({ id: id });
  if (account) {
    return account;
  }
  return null;
};
