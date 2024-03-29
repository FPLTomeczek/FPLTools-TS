import { axiosInstance } from "../../../shared/utils/config/axiosConfig";
import { Post } from "../components/NewsList";

export async function getPosts(value?: number): Promise<Post[] | undefined> {
  try {
    const { data } = await axiosInstance.get(
      `/posts${value ? `?count=${value}` : ""}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPost(id: string): Promise<Post | undefined> {
  try {
    const { data } = await axiosInstance.get(`/posts/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
