const request = require("supertest");
const app = require("../app");

describe("Auth Endpoints", () => {
  const testUser = {
    name: "Test User",
    email: `test${Date.now()}@example.com`,
    password: "TestPassword123",
  };

  let token;

  test("POST /api/auth/register - should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.email).toBe(testUser.email);
    token = response.body.token;
  });

  test("POST /api/auth/login - should login with valid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /api/auth/login - should fail with invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "WrongPassword" });

    expect(response.status).toBe(401);
  });

  test("GET /api/users/me - should get user profile with valid token", async () => {
    const response = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(testUser.email);
  });

  test("GET /api/users/me - should fail without token", async () => {
    const response = await request(app).get("/api/users/me");

    expect(response.status).toBe(401);
  });
});

describe("Mood Endpoints", () => {
  let userId;
  let token;

  beforeAll(async () => {
    const user = {
      name: "Mood Test User",
      email: `mood${Date.now()}@example.com`,
      password: "MoodTest123",
    };

    const registerRes = await request(app)
      .post("/api/auth/register")
      .send(user);

    token = registerRes.body.token;
    userId = registerRes.body.user.id;
  });

  test("POST /api/moods - should create a mood log", async () => {
    const response = await request(app)
      .post("/api/moods")
      .set("Authorization", `Bearer ${token}`)
      .send({ mood: "happy", note: "Feeling great" });

    expect(response.status).toBe(201);
    expect(response.body.log.mood).toBe("happy");
    expect(response.body).toHaveProperty("tip");
  });

  test("GET /api/moods - should get user mood logs", async () => {
    await request(app)
      .post("/api/moods")
      .set("Authorization", `Bearer ${token}`)
      .send({ mood: "calm", note: "Relaxed" });

    const response = await request(app)
      .get("/api/moods")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/moods/weekly - should get weekly insights", async () => {
    const response = await request(app)
      .get("/api/moods/weekly")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("totalEntries");
  });
});

describe("AI Endpoints", () => {
  let token;

  beforeAll(async () => {
    const user = {
      name: "AI Test User",
      email: `ai${Date.now()}@example.com`,
      password: "AITest123",
    };

    const registerRes = await request(app)
      .post("/api/auth/register")
      .send(user);

    token = registerRes.body.token;
  });

  test("POST /api/ai/tone - should analyze message tone", async () => {
    const response = await request(app)
      .post("/api/ai/tone")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "I feel so happy today!" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("tone");
    expect(response.body).toHaveProperty("suggestion");
  });
});
