import { db } from '../db/database';

export const syncOfflineUsers = async () => {
  try {
    // 🔵 STEP 1: Get unsynced users
    const users = db.getAllSync(`
      SELECT * FROM users WHERE synced = 0;
    `);

    if (!users || users.length === 0) {
      console.log('No users to sync');
      return;
    }

    console.log('Syncing users:', users.length);

    // 🔵 STEP 2: Loop users
    for (const user of users) {
      try {
        console.log('SYNCING USER:', user.email);

        const res = await fetch('http://172.16.17.130/backend/api/register.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
          }),
        });

        // 🔥 IMPORTANT: read raw response first
        const text = await res.text();
        console.log('RAW RESPONSE:', text);

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.log('INVALID JSON → skipping user:', user.email);
          continue; // skip this user, try next
        }

        console.log('PARSED RESPONSE:', data);

        // 🔵 STEP 3: Handle response
        if (data.status === 'success' || data.status === 'exists') {
          db.execSync(`
            UPDATE users 
            SET synced = 1 
            WHERE id = ${user.id};
          `);

          console.log('USER SYNCED:', user.email);
        } else {
          console.log('SYNC FAILED FROM SERVER:', user.email);
        }

      } catch (err) {
        console.log('Sync error for user:', user.email, err);
      }
    }

    console.log('SYNC COMPLETE');

  } catch (error) {
    console.log('SYNC ERROR:', error);
  }
};