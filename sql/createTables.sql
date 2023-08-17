CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) UNIQUE NOT NULL,
    "password" VARCHAR(120) NOT NULL,
    "admin" BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE IF NOT EXISTS "courses"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT
);

CREATE TABLE IF NOT EXISTS "userCourses" (
    "id" SERIAL PRIMARY KEY,
    "active" BOOLEAN DEFAULT TRUE NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    FOREIGN KEY ("userId")
        REFERENCES "users"("id"),
    FOREIGN KEY ("courseId")
        REFERENCES "courses"("id")
);
