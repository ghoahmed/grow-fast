const pool = require("../config/db");
const bcrypt = require("bcrypt"); // npm install bcrypt

const seed = async () => {
  const client = await pool.connect();

  try {
    console.log("🌱 Seeding Grow Fast database...\n");
    await client.query("BEGIN");

    // ─── Seed users ───────────────────────────────────────────────────────
    const adminHash = await bcrypt.hash("admin123", 10);
    const userHash = await bcrypt.hash("user1234", 10);

    const { rows: users } = await client.query(
      `
      INSERT INTO users (name, email, password_hash, role, plan) VALUES
        ('Super Admin',    'admin@growfast.io',   $1, 'admin', 'agency'),
        ('Alice Martin',   'alice@example.com',   $2, 'user',  'pro'),
        ('Bob Chen',       'bob@startup.io',      $2, 'user',  'agency'),
        ('Sara Williams',  'sara@brand.co',       $2, 'user',  'starter')
      ON CONFLICT (email) DO NOTHING
      RETURNING id, name, email, role
    `,
      [adminHash, userHash],
    );

    console.log("  ✅ users:", users.map((u) => u.email).join(", "));

    if (users.length === 0) {
      console.log("  ⚠️  Users already seeded, skipping rest.");
      await client.query("ROLLBACK");
      return;
    }

    const [admin, alice, bob, sara] = users;

    // ─── Seed brand kits ──────────────────────────────────────────────────
    await client.query(
      `
      INSERT INTO brand_kits (user_id, brand_name, primary_color, tone) VALUES
        ($1, 'GrowFast HQ',    '#f97316', 'bold'),
        ($2, 'Alice Designs',  '#6366f1', 'professional'),
        ($3, 'Bob Tech',       '#10b981', 'casual')
      ON CONFLICT (user_id) DO NOTHING
    `,
      [admin.id, alice.id, bob.id],
    );
    console.log("  ✅ brand_kits");

    // ─── Seed videos ──────────────────────────────────────────────────────
    const { rows: videos } = await client.query(
      `
      INSERT INTO videos (user_id, title, prompt, status, platform, views, likes, shares) VALUES
        ($1, 'Summer Sale — Sneaker Drop',  'Energetic ad for summer sneaker sale targeting Gen Z', 'published', 'tiktok',     12400, 843, 210),
        ($1, 'App Launch Announcement',     'Professional product launch for B2B SaaS tool',        'published', 'instagram',  8210,  521, 98),
        ($1, 'Black Friday Countdown',      '10-second urgency ad with countdown timer',             'draft',     'youtube',    0,     0,   0),
        ($2, 'Brand Intro Video',           'Warm intro to Alice Designs portfolio',                 'published', 'instagram',  3100,  198, 44),
        ($3, 'Q4 Product Demo',             'Demo of Bob Tech main SaaS feature',                   'published', 'linkedin',   5600,  312, 67)
      RETURNING id
    `,
      [alice.id, alice.id, bob.id],
    );
    console.log("  ✅ videos");

    // ─── Seed analytics (last 7 days for first video) ─────────────────────
    const videoId = videos[0].id;
    for (let i = 6; i >= 0; i--) {
      await client.query(
        `
        INSERT INTO analytics (video_id, date, views, likes, clicks, conversions, watch_time_s)
        VALUES ($1, CURRENT_DATE - $2::integer, $3, $4, $5, $6, $7)
        ON CONFLICT (video_id, date) DO NOTHING
      `,
        [
          videoId,
          i,
          Math.floor(Math.random() * 2000) + 500,
          Math.floor(Math.random() * 150) + 20,
          Math.floor(Math.random() * 300) + 50,
          Math.floor(Math.random() * 40) + 5,
          Math.floor(Math.random() * 5000) + 1000,
        ],
      );
    }
    console.log("  ✅ analytics (7 days)\n");

    await client.query("COMMIT");
    console.log("🎉 Seed complete!");
    console.log("\n📋 Test credentials:");
    console.log("   Admin  → admin@growfast.io  / admin123");
    console.log("   User   → alice@example.com  / user1234");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Seed error — rolled back:", err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
    process.exit(0);
  }
};

seed();
