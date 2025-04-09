import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getTime() {
    const { data } = await axios.get(
      'https://timeapi.io/api/time/current/zone?timeZone=Asia%2FHo_Chi_Minh',
    );
    return data;
  }

  async getTodos() {
    const { data } = await axios.get('https://todo-api.quydx.id.vn/v1/todo');
    return data;
  }

  async createTodo(title: string, content: string) {
    const { data } = await axios.post('https://todo-api.quydx.id.vn/v1/todo', {
      title,
      content,
    });
    return data;
  }

  async updateTodo(
    id: number,
    title: string,
    content: string,
    isDone: boolean,
  ) {
    const { data } = await axios.put(
      `https://todo-api.quydx.id.vn/v1/todo/${id}`,
      {
        title,
        content,
        isDone,
      },
    );
    return data;
  }

  async deleteTodo(id: number) {
    const { data } = await axios.delete(
      `https://todo-api.quydx.id.vn/v1/todo/${id}`,
    );
    return data;
  }
}
