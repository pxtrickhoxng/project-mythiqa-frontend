import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';
import { createUser, updateUser, deleteUser } from '@/lib/api';
import { clerkClient, auth } from '@clerk/nextjs/server';
import { roles } from '@/lib/userRoles';

const token = process.env.CLERK_SECRET_KEY!;

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    if (evt.type === 'user.created') {
      const userPayload = {
        userId: evt.data.id,
        username: evt.data.username,
        email: evt.data.email_addresses[0].email_address,
        description: null,
        userBackgroundImgUrl: null,
        userProfileImgUrl: evt.data.image_url,
        role: roles.user,
      };

      await createUser(userPayload);
    }

    // handles deletion via clerk dashboard
    if (evt.type === 'user.deleted') {
      const idToDelete = evt.data.id;
      if (idToDelete) {
        await deleteUser(idToDelete, token);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}

// handles deletion via user input in app
export async function DELETE() {
  const { userId } = await auth();
  if (userId) {
    try {
      const client = await clerkClient();
      await client.users.deleteUser(userId);
      return Response.json({ message: 'User deleted' });
    } catch (error) {
      console.log(error);
      return Response.json({ error: 'Error deleting user' });
    }
  }
}
