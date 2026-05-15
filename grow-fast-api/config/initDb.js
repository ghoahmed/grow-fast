const pool = require("../config/db");

const initDb = async () => {
  const client = await pool.connect();

  try {
    console.log("⚙️  Initializing Grow Fast database...\n");

    await client.query("BEGIN");

    // ─── USERS ────────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id            SERIAL PRIMARY KEY,
        name          VARCHAR(100) NOT NULL,
        email         VARCHAR(150) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role          VARCHAR(20) DEFAULT 'user'
                        CHECK (role IN ('admin', 'user')),
        plan          VARCHAR(20) DEFAULT 'starter'
                        CHECK (plan IN ('starter', 'pro', 'agency')),
        avatar_url    TEXT,
        is_active     BOOLEAN DEFAULT TRUE,
        created_at    TIMESTAMP DEFAULT NOW(),
        updated_at    TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("  ✅ users");

    // ─── BRAND KITS ───────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS brand_kits (
        id              SERIAL PRIMARY KEY,
        user_id         INTEGER UNIQUE NOT NULL
                          REFERENCES users(id) ON DELETE CASCADE,
        brand_name      VARCHAR(100),
        logo_url        TEXT,
        primary_color   VARCHAR(7) DEFAULT '#f97316',
        secondary_color VARCHAR(7),
        font            VARCHAR(50),
        tone            VARCHAR(30) DEFAULT 'professional'
                          CHECK (tone IN ('professional','playful','bold','luxury','casual')),
        created_at      TIMESTAMP DEFAULT NOW(),
        updated_at      TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("  ✅ brand_kits");

    // ─── VIDEOS ───────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS videos (
        id            SERIAL PRIMARY KEY,
        user_id       INTEGER NOT NULL
                        REFERENCES users(id) ON DELETE CASCADE,
        title         VARCHAR(200) NOT NULL,
        description   TEXT,
        prompt        TEXT,
        script        TEXT,
        video_url     TEXT,
        thumbnail_url TEXT,
        duration_sec  INTEGER,
        platform      VARCHAR(30)
                        CHECK (platform IN ('tiktok','instagram','youtube','facebook','linkedin', NULL)),
        status        VARCHAR(20) DEFAULT 'draft'
                        CHECK (status IN ('draft','processing','published','failed')),
        views         INTEGER DEFAULT 0,
        likes         INTEGER DEFAULT 0,
        shares        INTEGER DEFAULT 0,
        created_at    TIMESTAMP DEFAULT NOW(),
        updated_at    TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("  ✅ videos");

    // ─── VIDEO VARIANTS (A/B testing) ─────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS video_variants (
        id            SERIAL PRIMARY KEY,
        video_id      INTEGER NOT NULL
                        REFERENCES videos(id) ON DELETE CASCADE,
        label         VARCHAR(10) DEFAULT 'A',
        script        TEXT,
        video_url     TEXT,
        views         INTEGER DEFAULT 0,
        conversions   INTEGER DEFAULT 0,
        created_at    TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("  ✅ video_variants");

    // ─── ANALYTICS ────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS analytics (
        id            SERIAL PRIMARY KEY,
        video_id      INTEGER NOT NULL
                        REFERENCES videos(id) ON DELETE CASCADE,
        date          DATE NOT NULL DEFAULT CURRENT_DATE,
        views         INTEGER DEFAULT 0,
        likes         INTEGER DEFAULT 0,
        shares        INTEGER DEFAULT 0,
        clicks        INTEGER DEFAULT 0,
        conversions   INTEGER DEFAULT 0,
        watch_time_s  INTEGER DEFAULT 0,
        UNIQUE (video_id, date)
      );
    `);
    console.log("  ✅ analytics");

    // ─── SUBSCRIPTIONS ────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id                  SERIAL PRIMARY KEY,
        user_id             INTEGER UNIQUE NOT NULL
                              REFERENCES users(id) ON DELETE CASCADE,
        stripe_customer_id  TEXT,
        stripe_sub_id       TEXT,
        plan                VARCHAR(20) DEFAULT 'starter'
                              CHECK (plan IN ('starter','pro','agency')),
        status              VARCHAR(20) DEFAULT 'active'
                              CHECK (status IN ('active','canceled','past_due','trialing')),
        current_period_end  TIMESTAMP,
        created_at          TIMESTAMP DEFAULT NOW(),
        updated_at          TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("  ✅ subscriptions");

    // ─── INDEXES ──────────────────────────────────────────────────────────
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_videos_user_id   ON videos(user_id);
      CREATE INDEX IF NOT EXISTS idx_videos_status    ON videos(status);
      CREATE INDEX IF NOT EXISTS idx_videos_created   ON videos(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_analytics_video  ON analytics(video_id);
      CREATE INDEX IF NOT EXISTS idx_analytics_date   ON analytics(date DESC);
    `);
    console.log("  ✅ indexes");

    // ─── updated_at TRIGGER ───────────────────────────────────────────────
    await client.query(`
      CREATE OR REPLACE FUNCTION set_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    const tablesWithUpdatedAt = [
      "users",
      "brand_kits",
      "videos",
      "subscriptions",
    ];
    for (const table of tablesWithUpdatedAt) {
      await client.query(`
        DROP TRIGGER IF EXISTS trg_${table}_updated_at ON ${table};
        CREATE TRIGGER trg_${table}_updated_at
          BEFORE UPDATE ON ${table}
          FOR EACH ROW EXECUTE FUNCTION set_updated_at();
      `);
    }
    console.log("  ✅ updated_at triggers\n");

    await client.query("COMMIT");

    console.log("🎉 All tables created successfully!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Init error — rolled back:", err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
    process.exit(0);
  }
};

initDb();
