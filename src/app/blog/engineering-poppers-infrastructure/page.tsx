import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

export default function EngineeringInfraPage() {
  return (
    <div className="container max-w-4xl py-12">
      <Link href="/blog">
        <Button variant="ghost" className="mb-8 pl-0 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Button>
      </Link>

      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Engineering Popper&apos;s Infra: Firebase at Scale
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <time dateTime="2023-02-22">February 22, 2023</time>
          <span>•</span>
          <span>7 min read</span>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="lead">
          When I started building Popper, I chose Firebase for speed and
          simplicity. Now with 1,100+ users and 60+ businesses processing
          thousands of transactions weekly, our infrastructure has evolved
          significantly. Here&apos;s how we scaled our Firebase architecture to
          handle our growth.
        </p>

        <h2>The Initial Architecture</h2>

        <p>
          Our MVP was straightforward: Authentication, Firestore for data, and
          Cloud Functions for business logic. This served us well for the first
          few hundred users, but as we grew, we encountered our first scaling
          challenges.
        </p>

        <p>
          The most pressing issue was read/write throughput during peak hours.
          When multiple businesses processed transactions simultaneously, we
          started hitting Firestore&apos;s per-document write limits, causing
          failed transactions and frustrated users.
        </p>

        <h2>Optimizing Firestore for Scale</h2>

        <p>
          Our first major optimization was rethinking our data model. We
          initially structured our database in a relational way, which led to
          inefficient queries as we scaled. The key insight was embracing
          Firestore&apos;s document-oriented nature rather than fighting against
          it.
        </p>

        <p>We implemented three critical changes:</p>

        <h3>1. Denormalization for Query Efficiency</h3>

        <p>
          Instead of joining data across collections, we strategically
          denormalized data to optimize for our most common read patterns. For
          example, we embedded recent transaction summaries directly in user
          documents:
        </p>

        <CodeBlock
          code={`// Before: Separate collections requiring joins
users/{userId}
transactions/{transactionId} // with userId field

// After: Embedded recent transactions
users/{userId} {
  // User data
  recentTransactions: [
    { businessId, amount, points, timestamp }
  ] // Limited to last 5
}`}
          language="javascript"
        />

        <p>
          This reduced our most common query from multiple reads to just one,
          significantly improving app responsiveness.
        </p>

        <h3>2. Sharding for Write-Heavy Collections</h3>

        <p>
          For high-volume writes like transactions, we implemented a sharding
          strategy to distribute writes across multiple documents, avoiding
          Firestore&apos;s per-document write limits:
        </p>

        <CodeBlock
          code={`// Generate a shard ID based on timestamp
const shardId = Math.floor(Date.now() / 1000 / 60) % NUM_SHARDS;
const shardRef = db.collection('transactionShards').doc(\`shard_\${shardId}\`);

// Add transaction to the appropriate shard
await shardRef.collection('transactions').add({
  userId,
  businessId,
  amount,
  timestamp: firebase.firestore.FieldValue.serverTimestamp()
});`}
          language="javascript"
        />

        <p>
          This approach distributed our write load across multiple shards,
          effectively multiplying our write throughput.
        </p>

        <h3>3. Implementing Offline Support</h3>

        <p>
          Many of our users interact with Popper in locations with spotty
          connectivity. We leveraged Firestore&apos;s offline capabilities but
          had to carefully manage the cache size and conflict resolution:
        </p>

        <CodeBlock
          code={`// Enable offline persistence with custom settings
firebase.firestore().enablePersistence({
  synchronizeTabs: true,
  cacheSizeBytes: 5000000 // 5MB cache limit
}).catch(err => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab
    console.log('Offline persistence unavailable: Multiple tabs open');
  } else if (err.code === 'unimplemented') {
    // Client doesn't support persistence
    console.log('Offline persistence not supported by browser');
  }
});`}
          language="javascript"
        />

        <h2>Cloud Functions: From Simple to Sophisticated</h2>

        <p>
          Our Cloud Functions architecture evolved from simple triggers to a
          more sophisticated event-driven system. The key improvements included:
        </p>

        <h3>1. Batched Operations</h3>

        <p>
          For operations affecting multiple documents, we implemented batched
          writes to ensure atomicity:
        </p>

        <CodeBlock
          code={`exports.processTransaction = functions.https.onCall(async (data, context) => {
  const { userId, businessId, amount } = data;
  const db = admin.firestore();
  const batch = db.batch();
  
  // Calculate points based on business rules
  const points = calculatePoints(amount, businessId);
  
  // Update user points
  const userRef = db.collection('users').doc(userId);
  batch.update(userRef, {
    points: admin.firestore.FieldValue.increment(points)
  });
  
  // Create transaction record
  const transactionRef = db.collection('transactions').doc();
  batch.set(transactionRef, {
    userId,
    businessId,
    amount,
    points,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });
  
  // Update business stats
  const businessRef = db.collection('businesses').doc(businessId);
  batch.update(businessRef, {
    totalTransactions: admin.firestore.FieldValue.increment(1),
    totalRevenue: admin.firestore.FieldValue.increment(amount)
  });
  
  // Commit all changes atomically
  await batch.commit();
  
  return { success: true, points };
});`}
          language="javascript"
        />

        <h3>2. Scheduled Aggregations</h3>

        <p>
          To reduce the cost of analytical queries, we implemented scheduled
          functions that pre-compute aggregations:
        </p>

        <CodeBlock
          code={`// Run daily at midnight
exports.calculateDailyStats = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('America/Los_Angeles')
  .onRun(async context => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Query transactions from yesterday
    const snapshot = await admin.firestore()
      .collection('transactions')
      .where('timestamp', '>=', yesterday)
      .get();
    
    // Aggregate by business
    const businessStats = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      if (!businessStats[data.businessId]) {
        businessStats[data.businessId] = {
          transactions: 0,
          revenue: 0
        };
      }
      businessStats[data.businessId].transactions++;
      businessStats[data.businessId].revenue += data.amount;
    });
    
    // Store aggregated results
    const batch = admin.firestore().batch();
    for (const [businessId, stats] of Object.entries(businessStats)) {
      const ref = admin.firestore()
        .collection('businessStats')
        .doc(businessId)
        .collection('daily')
        .doc(yesterday.toISOString().split('T')[0]);
      
      batch.set(ref, stats);
    }
    
    return batch.commit();
  });`}
          language="javascript"
        />

        <h2>Lessons Learned</h2>

        <p>
          Scaling our Firebase infrastructure taught us several valuable
          lessons:
        </p>

        <ol>
          <li>
            <strong>Design for access patterns, not entities:</strong> Structure
            your data based on how it&apos;s accessed, not just what it
            represents.
          </li>
          <li>
            <strong>Monitor before optimizing:</strong> We wasted time
            optimizing parts of our system that weren&apos;t actual bottlenecks.
            Proper monitoring would have directed our efforts more effectively.
          </li>
          <li>
            <strong>Embrace NoSQL thinking:</strong> Success with Firestore
            requires embracing its document-oriented nature rather than trying
            to force relational patterns.
          </li>
          <li>
            <strong>Cost optimization matters:</strong> As we scaled, our
            Firebase bill grew significantly. Implementing proper caching and
            aggregation strategies helped us maintain reasonable costs while
            providing the performance our users expect.
          </li>
        </ol>

        <h2>Looking Forward</h2>

        <p>
          As we continue to grow, we&apos;re exploring additional optimizations
          and architectural improvements. The key is maintaining the balance
          between performance, cost, and development velocity that made Firebase
          attractive in the first place.
        </p>

        <p>
          I&apos;d love to hear about your experiences scaling Firebase or other
          NoSQL databases. Connect with me on{" "}
          <a
            href="https://twitter.com/seoking23"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>{" "}
          to continue the conversation.
        </p>
      </div>
    </div>
  );
}
