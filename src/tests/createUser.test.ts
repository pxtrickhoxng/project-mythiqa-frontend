import { createUser, deleteUser } from '../lib/api';
import { roles } from '@/lib/userRoles';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// api integration test

test('verify create user api', async () => {
  const userPayload = {
    user_id: 'user_test',
    username: 'testUsername',
    email: 'test@gmail.com',
    description: 'this is a description',
    profile_background_img_url: 'https://test.com',
    user_profile_url: 'https://test.com',
    role: roles.user,
  };
  const createRes = await createUser(userPayload);
  expect(createRes).toBe(201);

  const delRes = await deleteUser('user_test');
  expect(delRes).toBe(200);
});
