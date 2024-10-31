// server/actions.ts
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { createHandler } from '@solidjs/router';
import type { APIEvent } from 'solid-start';
import { redirect } from 'solid-start/server';
import { authenticateUser } from './auth'; // You'll need to implement this

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export const createInvoiceAction = async (event: APIEvent) => {
  const formData = await event.request.formData();
  
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    
    // In SolidStart, we use the redirect utility
    throw redirect('/dashboard/invoices');
  } catch (error) {
    if (error instanceof Error && 'location' in error) throw error; // Rethrow redirect
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
};

export const updateInvoiceAction = async (event: APIEvent) => {
  const formData = await event.request.formData();
  const id = formData.get('id') as string;
  
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
    
    throw redirect('/dashboard/invoices');
  } catch (error) {
    if (error instanceof Error && 'location' in error) throw error;
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
};

export const deleteInvoiceAction = async (event: APIEvent) => {
  const formData = await event.request.formData();
  const id = formData.get('id') as string;

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    throw redirect('/dashboard/invoices');
  } catch (error) {
    if (error instanceof Error && 'location' in error) throw error;
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
};

export const authenticateAction = async (event: APIEvent) => {
  const formData = await event.request.formData();
  
  try {
    const result = await authenticateUser(formData);
    if (!result.success) {
      return 'Invalid credentials.';
    }
    throw redirect('/dashboard');
  } catch (error) {
    if (error instanceof Error && 'location' in error) throw error;
    return 'Something went wrong.';
  }
};

// Create API routes for each action
export const createInvoiceHandler = createHandler(async (event) => {
  return await createInvoiceAction(event);
});

export const updateInvoiceHandler = createHandler(async (event) => {
  return await updateInvoiceAction(event);
});

export const deleteInvoiceHandler = createHandler(async (event) => {
  return await deleteInvoiceAction(event);
});

export const authenticateHandler = createHandler(async (event) => {
  return await authenticateAction(event);
});