import app from "../app";
import request from "supertest";

describe("GET /tasks", async () => {
  test("should return 200 OK", async () => {
    const response = await request(app).get("/tasks").send();

    console.log(response);
  });
});
