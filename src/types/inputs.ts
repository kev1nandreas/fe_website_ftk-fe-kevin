type LoginInputs = {
  username: string;
  password: string;
};

type ArticleInputs = {
  title: string;
  content: string;
  image: string;
  category: string;
}

type CategoryInputs = {
  name: string;
  id: string;
}

type ForgetPasswordInputs = {
  email: string;
}

type ResetPasswordInputs = {
  password: string;
  confirmPassword: string;
}

export type { LoginInputs, ArticleInputs, CategoryInputs, ForgetPasswordInputs, ResetPasswordInputs };
