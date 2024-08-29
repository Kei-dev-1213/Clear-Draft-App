import { useState } from "react";
import { ArticleFormType } from "../domain/articleTypes";

export const useArticleForm = (initialState: ArticleFormType) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return { formData, setFormData, handleChange };
};
