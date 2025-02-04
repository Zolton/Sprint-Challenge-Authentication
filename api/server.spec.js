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

describe("GET request fail", () => {
    it("POST to server.js", () => {
      return request(server)
        .post("/api/auth")
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });

describe("login", () => {
  describe("login agian", () => {
    it("should work", async () => {
      return await request(server)
        .post("/api/auth/register")
        .send({ username: "FinalTest24", password: "FinalTest24" })
        .expect(200)
        .then(res => {
          request(server)
            .post("/api/auth/login")
            .send({ username: "FinalTest24", password: "FinalTest24" })
            .expect(200)
            .then(res => {
              request(server)
                .get("/api/jokes")
                .set({
                  Authorization:
                    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
                      .eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6IkJpbGJvIiwiaWF0IjoxNTY2NTg2MTU1LCJleHAiOjE1NjY2NzI1NTV9
                      .tzzPWj6EmG0L53OFssRYp_zjIl6662pxskzjz5yRgxY
                })
                .expect(200)
            });
        });
    });
  });
});

describe("register request", () => {
  it("register fail for lack of password", () => {
    return request(server)
      .post("/api/auth/register")
      .send({ username: "API 123 Test2" })
      .then(res => {
        expect(res.status).toBe(500);
      });
  });
});

describe("register request", () => {
  it("register fail for lack of password", () => {
    return request(server)
      .post("/api/auth/register")
      .send({ password: "API 123 Test2" })
      .then(res => {
        expect(res.status).toBe(500);
      });
  });
});

// describe("login fail", () => {
//   it("login fail2", () => {
//     return request(server)
//       .post("/api/auth/login")
//       .send({ username: "API 123 Test2", password: "asdfsadf" })
//       .then(res => {
//         expect(res.body).toMatchObject({ Error: "Password fail" });
//       });
//   });
// });

// describe("Gets jokes", () => {
//   it("joke fetch fail", () => {
//     return request(server)
//       .get("/api/jokes")
//       .send({ username: "API 123 Test2", password: "asdfsadf" })
//       .then(res => {
//         expect(res.status).toBe(401);
//       });
//   });
// });
