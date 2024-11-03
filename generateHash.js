import bcrypt from 'bcrypt';

async function generateHash(password) {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("Generated hash:", hash);
  } catch (error) {
    console.error("Error generating hash:", error);
  }
}

// Replace 'yourPasswordHere' with the actual password you want to hash
generateHash('12345678');

