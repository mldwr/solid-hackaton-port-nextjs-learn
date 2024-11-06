import { createSignal, createResource } from 'solid-js';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '~/lib/definitions';

// Create auth store
const [user, setUser] = createSignal<User | null>(null);
const [isAuthenticated, setIsAuthenticated] = createSignal(false);

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function signIn(credentials: { email: string; password: string }) {
  try {
    const parsedCredentials = z
      .object({ email: z.string().email(), password: z.string().min(6) })
      .safeParse(credentials);

    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;

      const foundUser = await getUser(email);
      
      if (!foundUser) return null;

      const passwordsMatch = await bcrypt.compare(password, foundUser.password);
      console.log('signIn passwordsMatch',passwordsMatch,foundUser);
      
      if (passwordsMatch) {
        setUser(foundUser);
        setIsAuthenticated(true);
        return foundUser;
      }
    }

    console.log('Invalid credentials');
    return null;
  } catch (error) {
    console.error('Sign in error:', error);
    return null;
  }
}

export async function signOut() {
  try {
    setUser(null);
    setIsAuthenticated(false);
    return true;
  } catch (error) {
    console.error('Error during sign out:', error);
    return false;
  }
}

export const auth = {
  user,
  isAuthenticated,
  signIn,
  signOut,
};