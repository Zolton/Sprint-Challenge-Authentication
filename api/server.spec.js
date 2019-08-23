const db = require("../database/dbConfig");
const server = require("./server");
const request = require("supertest");

describe("GET request", () => {
  it("GET server.js", () => {
    return request(server)
      .get("/api/auth")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.type).toMatch(/json/);
      });
  });
});

describe("register request", () => {
  it.skip("register success", () => {
    return request(server)
      .post("/api/auth/register")
      .send({ username: "API2", password: "password2" })
      .then(res => {
        expect(res.type).toMatch(/json/);
        expect(res.status).toBe(200);
      });
  });
  it("register fail", () => {
    return (
      request(server)
        .post("/api/auth/register")
        // no password - should return 500
        .send({ username: "API 123 Test2" })
        .then(res => {
          expect(res.status).toBe(500);
        })
    );
  });
});

describe.skip("login success", () => {
  it("login success", () => {
    return request(server)
      .post("/api/auth/login")
      .set({'Content-Type': 'application/json'})
      .send({
        username: "Bilbo",
        password: "Bilbo"
      })
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});
//.set({ 'API-Key': 'foobar', Accept: 'application/json' })
describe.skip("Gets jokes", ()=>{
    it("joke fetch succeed", ()=>{
        return request(server).get("/api/jokes")
        .set({'Content-Type': 'application/json', "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6IkJpbGJvIiwiaWF0IjoxNTY2NTc5NzgyLCJleHAiOjE1NjY2NjYxODJ9.LysMyEKvBZpKF4QyHn-iqhVOfkQXsllAhMlzI_TdAkU"})
        .then(res=>{
            expect(res.status).toBe(200)
        })
    })
})