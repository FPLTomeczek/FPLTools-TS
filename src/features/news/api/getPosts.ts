import { axiosInstance } from "../../../shared/utils/config/axiosConfig";

export async function getPosts(value?: number) {
  try {
    const { data } = await axiosInstance.get(
      `/posts${value ? `?count=${value}` : ""}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPost(id: string) {
  try {
    const { data } = await axiosInstance.get(`/posts/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
