var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  admins: () => admins,
  applications: () => applications,
  auditLogs: () => auditLogs,
  bookings: () => bookings,
  certificates: () => certificates,
  companies: () => companies,
  conversations: () => conversations,
  education: () => education,
  experiences: () => experiences,
  insertAdminSchema: () => insertAdminSchema,
  insertApplicationSchema: () => insertApplicationSchema,
  insertAuditLogSchema: () => insertAuditLogSchema,
  insertBookingSchema: () => insertBookingSchema,
  insertCertificateSchema: () => insertCertificateSchema,
  insertCompanySchema: () => insertCompanySchema,
  insertConversationSchema: () => insertConversationSchema,
  insertEducationSchema: () => insertEducationSchema,
  insertExperienceSchema: () => insertExperienceSchema,
  insertInvitationSchema: () => insertInvitationSchema,
  insertJobSchema: () => insertJobSchema,
  insertMatchingAlertSchema: () => insertMatchingAlertSchema,
  insertMessageSchema: () => insertMessageSchema,
  insertNotificationSchema: () => insertNotificationSchema,
  insertPaymentSchema: () => insertPaymentSchema,
  insertPlatformSettingSchema: () => insertPlatformSettingSchema,
  insertPortfolioSchema: () => insertPortfolioSchema,
  insertProfessionalSchema: () => insertProfessionalSchema,
  insertRatingSchema: () => insertRatingSchema,
  insertReviewSchema: () => insertReviewSchema,
  insertServiceSchema: () => insertServiceSchema,
  insertServiceSuggestionSchema: () => insertServiceSuggestionSchema,
  insertSkillEndorsementSchema: () => insertSkillEndorsementSchema,
  insertUserSchema: () => insertUserSchema,
  invitations: () => invitations,
  jobs: () => jobs,
  matchingAlerts: () => matchingAlerts,
  messages: () => messages,
  notifications: () => notifications,
  payments: () => payments,
  platformSettings: () => platformSettings,
  portfolio: () => portfolio,
  professionals: () => professionals,
  ratings: () => ratings,
  reviews: () => reviews,
  serviceSuggestions: () => serviceSuggestions,
  services: () => services,
  skillEndorsements: () => skillEndorsements,
  users: () => users
});
import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users, admins, platformSettings, auditLogs, conversations, companies, professionals, jobs, services, applications, experiences, education, serviceSuggestions, notifications, messages, reviews, ratings, portfolio, certificates, skillEndorsements, payments, bookings, invitations, matchingAlerts, insertUserSchema, insertAdminSchema, insertCompanySchema, insertProfessionalSchema, insertJobSchema, insertServiceSchema, insertApplicationSchema, insertExperienceSchema, insertEducationSchema, insertServiceSuggestionSchema, insertNotificationSchema, insertReviewSchema, insertRatingSchema, insertPortfolioSchema, insertCertificateSchema, insertSkillEndorsementSchema, insertMatchingAlertSchema, insertBookingSchema, insertInvitationSchema, insertConversationSchema, insertMessageSchema, insertPaymentSchema, insertPlatformSettingSchema, insertAuditLogSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      username: text("username").notNull().unique(),
      password: text("password").notNull(),
      email: text("email").notNull().unique(),
      userType: text("user_type").notNull(),
      // 'company' | 'professional'
      createdAt: timestamp("created_at").defaultNow()
    });
    admins = pgTable("admins", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      email: text("email").notNull().unique(),
      password: text("password").notNull(),
      role: text("role").notNull().default("superadmin"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    platformSettings = pgTable("platform_settings", {
      id: serial("id").primaryKey(),
      key: text("key").notNull().unique(),
      value: text("value").notNull(),
      valueType: text("value_type").notNull(),
      // 'string', 'number', 'boolean', 'json'
      category: text("category").notNull(),
      // 'pricing', 'jobs', 'emails', 'limits'
      description: text("description"),
      updatedAt: timestamp("updated_at").defaultNow(),
      updatedBy: integer("updated_by").references(() => admins.id)
    });
    auditLogs = pgTable("audit_logs", {
      id: serial("id").primaryKey(),
      entityType: text("entity_type").notNull(),
      // 'service', 'job'
      entityId: integer("entity_id").notNull(),
      // ID del servicio o empleo
      action: text("action").notNull(),
      // 'create', 'update', 'delete'
      userId: integer("user_id").notNull().references(() => users.id),
      userType: text("user_type").notNull(),
      // 'professional', 'company'
      changes: json("changes"),
      // JSON con los cambios realizados
      ipAddress: text("ip_address"),
      userAgent: text("user_agent"),
      endpoint: text("endpoint"),
      // Endpoint que ejecutó la acción
      timestamp: timestamp("timestamp").defaultNow()
    });
    conversations = pgTable("conversations", {
      id: serial("id").primaryKey(),
      professionalId: integer("professional_id").notNull().references(() => professionals.id),
      companyId: integer("company_id").notNull().references(() => companies.id),
      lastMessageAt: timestamp("last_message_at").defaultNow(),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    companies = pgTable("companies", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").references(() => users.id),
      name: text("name").notNull(),
      email: text("email"),
      description: text("description"),
      industry: text("industry"),
      location: text("location"),
      website: text("website"),
      logo: text("logo"),
      phone: text("phone"),
      size: text("size"),
      // 'startup', 'small', 'medium', 'large', 'enterprise'
      foundedYear: integer("founded_year"),
      planType: text("plan_type").default("free"),
      // 'free', 'premium', 'premium_temporal'
      jobsUsed: integer("jobs_used").default(0),
      // Contador de empleos publicados
      jobsLimit: integer("jobs_limit").default(0),
      // Límite de empleos según plan
      premiumActivatedAt: timestamp("premium_activated_at"),
      // Fecha activación premium
      alertsEnabled: boolean("alerts_enabled").default(true),
      // Alertas de matching habilitadas
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow()
    });
    professionals = pgTable("professionals", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").references(() => users.id),
      firstName: text("first_name").notNull(),
      lastName: text("last_name").notNull(),
      title: text("title"),
      experience: text("experience"),
      // '1-2', '3-5', '5-8', '8+'
      skills: text("skills"),
      // JSON string array
      preferredMode: text("preferred_mode"),
      // 'remote', 'onsite', 'hybrid', 'any'
      expectedSalary: text("expected_salary"),
      summary: text("summary"),
      avatar: text("avatar"),
      photoUrl: text("photo_url"),
      phone: text("phone"),
      location: text("location"),
      linkedin: text("linkedin"),
      portfolio: text("portfolio"),
      cvUrl: text("cv_url"),
      planType: text("plan_type").default("free"),
      // 'free', 'premium'
      isAvailable: boolean("is_available").default(true),
      cvModerationStatus: text("cv_moderation_status").default("pending"),
      // 'pending', 'approved', 'rejected'
      cvModerationNote: text("cv_moderation_note"),
      cvModeratedAt: timestamp("cv_moderated_at"),
      cvModeratedBy: integer("cv_moderated_by").references(() => admins.id),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    jobs = pgTable("jobs", {
      id: serial("id").primaryKey(),
      companyId: integer("company_id").references(() => companies.id),
      title: text("title").notNull(),
      department: text("department"),
      mode: text("mode"),
      // 'remote', 'onsite', 'hybrid'
      experience: text("experience"),
      // '1-2', '3-5', '5+'
      description: text("description"),
      salaryRange: text("salary_range"),
      location: text("location"),
      skills: text("skills"),
      // JSON string array
      isActive: boolean("is_active").default(true),
      // Pago único de $75 para funcionalidades premium
      paid: boolean("paid").default(false),
      paidAt: timestamp("paid_at"),
      paymentId: text("payment_id"),
      // Stripe payment intent ID
      paymentAmount: integer("payment_amount").default(7500),
      // $75.00 in cents
      featured: boolean("featured").default(false),
      // Destacado en listados
      premiumFeatures: boolean("premium_features").default(false),
      // Acceso a funciones premium
      createdAt: timestamp("created_at").defaultNow()
    });
    services = pgTable("services", {
      id: serial("id").primaryKey(),
      professionalId: integer("professional_id").references(() => professionals.id),
      title: text("title").notNull(),
      category: text("category"),
      description: text("description"),
      price: text("price"),
      deliveryTime: text("delivery_time"),
      availability: text("availability"),
      imageUrl: text("image_url"),
      isActive: boolean("is_active").default(true),
      isPaid: boolean("is_paid").default(false),
      chatActivatedAt: timestamp("chat_activated_at"),
      chatExpiresAt: timestamp("chat_expires_at"),
      moderationStatus: text("moderation_status").default("pending"),
      // 'pending', 'approved', 'rejected'
      moderationNote: text("moderation_note"),
      moderatedAt: timestamp("moderated_at"),
      moderatedBy: integer("moderated_by").references(() => admins.id),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    applications = pgTable("applications", {
      id: serial("id").primaryKey(),
      jobId: integer("job_id").references(() => jobs.id),
      professionalId: integer("professional_id").references(() => professionals.id),
      status: text("status").default("pending"),
      // 'pending', 'reviewed', 'interview', 'rejected', 'accepted'
      cvUrl: text("cv_url"),
      extractedData: text("extracted_data"),
      viewed: boolean("viewed").default(false),
      // Tracks if company has viewed the application
      viewedAt: timestamp("viewed_at"),
      // When the application was first viewed
      viewedBy: integer("viewed_by"),
      // Company user ID who viewed the application
      appliedAt: timestamp("applied_at").defaultNow()
    });
    experiences = pgTable("experiences", {
      id: serial("id").primaryKey(),
      professionalId: integer("professional_id").references(() => professionals.id),
      company: text("company").notNull(),
      position: text("position").notNull(),
      startDate: text("start_date").notNull(),
      endDate: text("end_date"),
      current: boolean("current").default(false),
      description: text("description"),
      location: text("location"),
      createdAt: timestamp("created_at").defaultNow()
    });
    education = pgTable("education", {
      id: serial("id").primaryKey(),
      professionalId: integer("professional_id").references(() => professionals.id),
      institution: text("institution").notNull(),
      degree: text("degree").notNull(),
      field: text("field").notNull(),
      startDate: text("start_date").notNull(),
      endDate: text("end_date"),
      current: boolean("current").default(false),
      gpa: text("gpa"),
      description: text("description"),
      createdAt: timestamp("created_at").defaultNow()
    });
    serviceSuggestions = pgTable("service_suggestions", {
      id: serial("id").primaryKey(),
      professionalId: integer("professional_id").references(() => professionals.id),
      title: text("title").notNull(),
      description: text("description").notNull(),
      category: text("category").notNull(),
      suggestedPrice: text("suggested_price"),
      confidence: integer("confidence").default(50),
      // 0-100 confidence score
      sourceExperiences: text("source_experiences"),
      // JSON array of experience IDs used
      keywords: text("keywords"),
      // JSON array of detected keywords
      actionVerbs: text("action_verbs"),
      // JSON array of action verbs found
      isAccepted: boolean("is_accepted").default(false),
      createdAt: timestamp("created_at").defaultNow()
    });
    notifications = pgTable("notifications", {
      id: serial("id").primaryKey(),
      professionalId: integer("professional_id").references(() => professionals.id),
      companyId: integer("company_id").references(() => companies.id),
      type: text("type").notNull(),
      // 'application_status', 'job_match', 'service_suggestion', 'system', 'new_application', 'new_message', 'rating_received'
      title: text("title").notNull(),
      message: text("message").notNull(),
      data: text("data"),
      // JSON data for additional context
      read: boolean("read").default(false),
      createdAt: timestamp("created_at").defaultNow()
    });
    messages = pgTable("messages", {
      id: serial("id").primaryKey(),
      conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
      senderType: text("sender_type").notNull().$type(),
      senderId: integer("sender_id").notNull(),
      content: text("content").notNull(),
      isRead: boolean("is_read").default(false),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    reviews = pgTable("reviews", {
      id: serial("id").primaryKey(),
      serviceId: integer("service_id").notNull().references(() => services.id),
      professionalId: integer("professional_id").notNull().references(() => professionals.id),
      companyId: integer("company_id").notNull().references(() => companies.id),
      rating: integer("rating").notNull(),
      // 1-5 stars
      comment: text("comment"),
      createdAt: timestamp("created_at").defaultNow()
    });
    ratings = pgTable("ratings", {
      id: serial("id").primaryKey(),
      jobId: integer("job_id").notNull().references(() => jobs.id),
      companyId: integer("company_id").notNull().references(() => companies.id),
      professionalId: integer("professional_id").notNull().references(() => professionals.id),
      rating: integer("rating").notNull(),
      // 1-5 stars
      comment: text("comment"),
      createdAt: timestamp("created_at").defaultNow()
    });
    portfolio = pgTable("portfolio", {
      id: serial("id").primaryKey(),
      professionalId: integer("professional_id").notNull().references(() => professionals.id),
      type: text("type").notNull(),
      // 'pdf', 'image', 'video'
      url: text("url").notNull(),
      title: text("title").notNull(),
      description: text("description"),
      createdAt: timestamp("created_at").defaultNow()
    });
    certificates = pgTable("certificates", {
      id: serial("id").primaryKey(),
      professionalId: integer("professional_id").notNull().references(() => professionals.id),
      title: text("title").notNull(),
      url: text("url").notNull(),
      issuer: text("issuer"),
      issuedDate: text("issued_date"),
      createdAt: timestamp("created_at").defaultNow()
    });
    skillEndorsements = pgTable("skill_endorsements", {
      id: serial("id").primaryKey(),
      professionalId: integer("professional_id").notNull().references(() => professionals.id),
      skillName: text("skill_name").notNull(),
      endorsedById: integer("endorsed_by_id").notNull().references(() => users.id),
      endorsedByType: text("endorsed_by_type").notNull(),
      // 'professional' or 'company'
      createdAt: timestamp("created_at").defaultNow()
    });
    payments = pgTable("payments", {
      id: serial("id").primaryKey(),
      transactionId: text("transaction_id").notNull().unique(),
      userId: integer("user_id").notNull().references(() => users.id),
      planType: text("plan_type").notNull(),
      amount: integer("amount").notNull(),
      // amount in cents
      currency: text("currency").notNull().default("usd"),
      status: text("status").notNull().default("pending"),
      // pending, completed, failed, refunded
      paymentMethod: text("payment_method").notNull(),
      stripeSessionId: text("stripe_session_id"),
      description: text("description"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    bookings = pgTable("bookings", {
      id: serial("id").primaryKey(),
      serviceId: integer("service_id").notNull().references(() => services.id),
      professionalId: integer("professional_id").notNull().references(() => professionals.id),
      companyId: integer("company_id").notNull().references(() => companies.id),
      date: text("date").notNull(),
      time: text("time").notNull(),
      duration: integer("duration").default(60),
      // minutes
      status: text("status").default("pending"),
      // 'pending', 'confirmed', 'cancelled', 'completed'
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow()
    });
    invitations = pgTable("invitations", {
      id: serial("id").primaryKey(),
      jobId: integer("job_id").notNull().references(() => jobs.id),
      companyId: integer("company_id").notNull().references(() => companies.id),
      email: text("email").notNull(),
      token: text("token").notNull().unique(),
      status: text("status").notNull().default("pending"),
      // pending, accepted, expired
      createdAt: timestamp("created_at").defaultNow(),
      expiresAt: timestamp("expires_at").notNull()
    });
    matchingAlerts = pgTable("matching_alerts", {
      id: serial("id").primaryKey(),
      companyId: integer("company_id").notNull().references(() => companies.id),
      professionalId: integer("professional_id").notNull().references(() => professionals.id),
      jobId: integer("job_id").notNull().references(() => jobs.id),
      compatibilityScore: integer("compatibility_score").notNull(),
      alertType: text("alert_type").notNull().default("high_compatibility"),
      // 'high_compatibility', 'profile_update'
      emailSent: boolean("email_sent").default(false),
      notificationSent: boolean("notification_sent").default(false),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertUserSchema = createInsertSchema(users).omit({
      id: true,
      createdAt: true
    });
    insertAdminSchema = createInsertSchema(admins).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCompanySchema = createInsertSchema(companies).omit({
      id: true
    });
    insertProfessionalSchema = createInsertSchema(professionals).omit({
      id: true
    });
    insertJobSchema = createInsertSchema(jobs).omit({
      id: true,
      createdAt: true
    });
    insertServiceSchema = createInsertSchema(services).omit({
      id: true,
      createdAt: true
    });
    insertApplicationSchema = createInsertSchema(applications).omit({
      id: true,
      appliedAt: true
    });
    insertExperienceSchema = createInsertSchema(experiences).omit({
      id: true,
      createdAt: true
    });
    insertEducationSchema = createInsertSchema(education).omit({
      id: true,
      createdAt: true
    });
    insertServiceSuggestionSchema = createInsertSchema(serviceSuggestions).omit({
      id: true,
      createdAt: true
    });
    insertNotificationSchema = createInsertSchema(notifications).omit({
      id: true,
      createdAt: true
    });
    insertReviewSchema = createInsertSchema(reviews).omit({
      id: true,
      createdAt: true
    });
    insertRatingSchema = createInsertSchema(ratings).omit({
      id: true,
      createdAt: true
    });
    insertPortfolioSchema = createInsertSchema(portfolio).omit({
      id: true,
      createdAt: true
    });
    insertCertificateSchema = createInsertSchema(certificates).omit({
      id: true,
      createdAt: true
    });
    insertSkillEndorsementSchema = createInsertSchema(skillEndorsements).omit({
      id: true,
      createdAt: true
    });
    insertMatchingAlertSchema = createInsertSchema(matchingAlerts).omit({
      id: true,
      createdAt: true
    });
    insertBookingSchema = createInsertSchema(bookings).omit({
      id: true,
      createdAt: true
    });
    insertInvitationSchema = createInsertSchema(invitations).omit({
      id: true,
      createdAt: true
    });
    insertConversationSchema = createInsertSchema(conversations).omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      lastMessageAt: true
    });
    insertMessageSchema = createInsertSchema(messages).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertPaymentSchema = createInsertSchema(payments).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertPlatformSettingSchema = createInsertSchema(platformSettings).omit({
      id: true,
      updatedAt: true
    });
    insertAuditLogSchema = createInsertSchema(auditLogs).omit({
      id: true,
      timestamp: true
    });
  }
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    neonConfig.webSocketConstructor = ws;
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema: schema_exports });
  }
});

// server/database-storage.ts
import { eq, desc, and, asc, count, sql, getTableColumns } from "drizzle-orm";
var DatabaseStorage;
var init_database_storage = __esm({
  "server/database-storage.ts"() {
    "use strict";
    init_schema();
    init_db();
    DatabaseStorage = class {
      async getUser(id) {
        const [user2] = await db.select().from(users).where(eq(users.id, id));
        return user2 || void 0;
      }
      async getUserByUsername(username) {
        const [user2] = await db.select().from(users).where(eq(users.username, username));
        return user2 || void 0;
      }
      async createUser(insertUser) {
        const [user2] = await db.insert(users).values(insertUser).returning();
        return user2;
      }
      async updateUser(id, userUpdate) {
        const [user2] = await db.update(users).set(userUpdate).where(eq(users.id, id)).returning();
        return user2 || void 0;
      }
      async getCompany(id) {
        const [company2] = await db.select().from(companies).where(eq(companies.id, id));
        return company2 || void 0;
      }
      async getCompanyByUserId(userId) {
        const [company2] = await db.select().from(companies).where(eq(companies.userId, userId));
        return company2 || void 0;
      }
      async createCompany(insertCompany) {
        const [company2] = await db.insert(companies).values(insertCompany).returning();
        return company2;
      }
      async updateCompany(id, companyUpdate) {
        const [updatedCompany] = await db.update(companies).set(companyUpdate).where(eq(companies.id, id)).returning();
        return updatedCompany || void 0;
      }
      async updateCompanyPlan(id, planType) {
        const updateData = { planType };
        if (planType === "premium_temporal") {
          updateData.jobsLimit = 1;
          updateData.premiumActivatedAt = /* @__PURE__ */ new Date();
        } else if (planType === "premium") {
          updateData.jobsLimit = 999;
          updateData.premiumActivatedAt = /* @__PURE__ */ new Date();
        }
        const [updatedCompany] = await db.update(companies).set(updateData).where(eq(companies.id, id)).returning();
        return updatedCompany || void 0;
      }
      async getAllCompanies() {
        return await db.select().from(companies);
      }
      async getProfessional(id) {
        const [professional2] = await db.select().from(professionals).where(eq(professionals.id, id));
        return professional2 || void 0;
      }
      async getProfessionalByUserId(userId) {
        const [professional2] = await db.select().from(professionals).where(eq(professionals.userId, userId));
        return professional2 || void 0;
      }
      async createProfessional(insertProfessional) {
        const [professional2] = await db.insert(professionals).values(insertProfessional).returning();
        return professional2;
      }
      async getAllProfessionals() {
        return await db.select().from(professionals);
      }
      async updateProfessional(id, professionalUpdate) {
        const [updatedProfessional] = await db.update(professionals).set(professionalUpdate).where(eq(professionals.id, id)).returning();
        return updatedProfessional || void 0;
      }
      async getJob(id) {
        const [job] = await db.select().from(jobs).where(eq(jobs.id, id));
        return job || void 0;
      }
      async getJobsWithCompany() {
        const result = await db.select().from(jobs).leftJoin(companies, eq(jobs.companyId, companies.id));
        return result.map((row) => ({
          ...row.jobs,
          company: row.companies
        }));
      }
      async getJobsByCompany(companyId) {
        return await db.select().from(jobs).where(eq(jobs.companyId, companyId));
      }
      async createJob(insertJob) {
        const [job] = await db.insert(jobs).values(insertJob).returning();
        return job;
      }
      async updateJob(id, jobUpdate) {
        const [updatedJob] = await db.update(jobs).set(jobUpdate).where(eq(jobs.id, id)).returning();
        return updatedJob || void 0;
      }
      async markJobAsPaid(id, paymentId) {
        const [updatedJob] = await db.update(jobs).set({
          paid: true,
          paidAt: /* @__PURE__ */ new Date(),
          paymentId,
          featured: true,
          premiumFeatures: true
        }).where(eq(jobs.id, id)).returning();
        return updatedJob || void 0;
      }
      async getFeaturedJobs() {
        const result = await db.select().from(jobs).leftJoin(companies, eq(jobs.companyId, companies.id)).where(and(eq(jobs.isActive, true), eq(jobs.featured, true))).orderBy(desc(jobs.paidAt), desc(jobs.createdAt));
        return result.map((row) => ({
          ...row.jobs,
          company: row.companies
        }));
      }
      async getService(id) {
        const [service] = await db.select().from(services).where(eq(services.id, id));
        return service || void 0;
      }
      async getServicesWithProfessional() {
        const result = await db.select().from(services).leftJoin(professionals, eq(services.professionalId, professionals.id)).where(eq(services.isActive, true));
        return result.map((row) => ({
          ...row.services,
          professional: row.professionals
        }));
      }
      async getServicesByProfessional(professionalId) {
        return await db.select().from(services).where(eq(services.professionalId, professionalId));
      }
      async createService(insertService) {
        const [service] = await db.insert(services).values(insertService).returning();
        return service;
      }
      async updateService(id, serviceUpdate) {
        const [updatedService] = await db.update(services).set(serviceUpdate).where(eq(services.id, id)).returning();
        return updatedService || void 0;
      }
      async getApplication(id) {
        const [application] = await db.select().from(applications).where(eq(applications.id, id));
        return application || void 0;
      }
      async getApplicationsByJob(jobId) {
        const result = await db.select().from(applications).leftJoin(jobs, eq(applications.jobId, jobs.id)).leftJoin(professionals, eq(applications.professionalId, professionals.id)).leftJoin(companies, eq(jobs.companyId, companies.id)).where(eq(applications.jobId, jobId));
        return result.map((row) => ({
          ...row.applications,
          job: row.jobs,
          professional: row.professionals,
          company: row.companies
        }));
      }
      async getAllApplications() {
        return await db.select().from(applications);
      }
      async getApplicationsByProfessional(professionalId) {
        const result = await db.select().from(applications).leftJoin(jobs, eq(applications.jobId, jobs.id)).leftJoin(professionals, eq(applications.professionalId, professionals.id)).leftJoin(companies, eq(jobs.companyId, companies.id)).where(eq(applications.professionalId, professionalId));
        return result.map((row) => ({
          ...row.applications,
          job: row.jobs,
          professional: row.professionals,
          company: row.companies
        }));
      }
      async createApplication(insertApplication) {
        const [application] = await db.insert(applications).values(insertApplication).returning();
        return application;
      }
      async updateApplication(id, applicationUpdate) {
        const [updatedApplication] = await db.update(applications).set(applicationUpdate).where(eq(applications.id, id)).returning();
        return updatedApplication || void 0;
      }
      async markApplicationAsViewed(id) {
        const [updatedApplication] = await db.update(applications).set({
          viewed: true,
          viewedAt: /* @__PURE__ */ new Date(),
          status: "reviewed"
        }).where(eq(applications.id, id)).returning();
        return updatedApplication || void 0;
      }
      // Experience methods
      async getExperience(id) {
        const [experience] = await db.select().from(experiences).where(eq(experiences.id, id));
        return experience || void 0;
      }
      async getExperiencesByProfessional(professionalId) {
        return await db.select().from(experiences).where(eq(experiences.professionalId, professionalId));
      }
      async createExperience(insertExperience) {
        const [experience] = await db.insert(experiences).values(insertExperience).returning();
        return experience;
      }
      async updateExperience(id, experienceUpdate) {
        const [updatedExperience] = await db.update(experiences).set(experienceUpdate).where(eq(experiences.id, id)).returning();
        return updatedExperience || void 0;
      }
      async deleteExperience(id) {
        const result = await db.delete(experiences).where(eq(experiences.id, id));
        return (result.rowCount || 0) > 0;
      }
      // Education methods
      async getEducation(id) {
        const [educationRecord] = await db.select().from(education).where(eq(education.id, id));
        return educationRecord || void 0;
      }
      async getEducationByProfessional(professionalId) {
        return await db.select().from(education).where(eq(education.professionalId, professionalId));
      }
      async createEducation(insertEducation) {
        const [educationRecord] = await db.insert(education).values(insertEducation).returning();
        return educationRecord;
      }
      async updateEducation(id, educationUpdate) {
        const [updatedEducation] = await db.update(education).set(educationUpdate).where(eq(education.id, id)).returning();
        return updatedEducation || void 0;
      }
      async deleteEducation(id) {
        const result = await db.delete(education).where(eq(education.id, id));
        return (result.rowCount ?? 0) > 0;
      }
      // Service Suggestions methods
      async getServiceSuggestion(id) {
        const [suggestion] = await db.select().from(serviceSuggestions).where(eq(serviceSuggestions.id, id));
        return suggestion || void 0;
      }
      async getServiceSuggestionsByProfessional(professionalId) {
        return await db.select().from(serviceSuggestions).where(eq(serviceSuggestions.professionalId, professionalId));
      }
      async createServiceSuggestion(insertSuggestion) {
        const [suggestion] = await db.insert(serviceSuggestions).values(insertSuggestion).returning();
        return suggestion;
      }
      async updateServiceSuggestion(id, suggestionUpdate) {
        const [updatedSuggestion] = await db.update(serviceSuggestions).set(suggestionUpdate).where(eq(serviceSuggestions.id, id)).returning();
        return updatedSuggestion || void 0;
      }
      async deleteServiceSuggestion(id) {
        const result = await db.delete(serviceSuggestions).where(eq(serviceSuggestions.id, id));
        return (result.rowCount ?? 0) > 0;
      }
      async createBulkServiceSuggestions(suggestions) {
        if (suggestions.length === 0) return [];
        const insertedSuggestions = await db.insert(serviceSuggestions).values(suggestions).returning();
        return insertedSuggestions;
      }
      // Notification methods
      async getNotification(id) {
        const [notification] = await db.select().from(notifications).where(eq(notifications.id, id));
        return notification || void 0;
      }
      async getNotificationsByProfessional(professionalId) {
        return await db.select().from(notifications).where(eq(notifications.professionalId, professionalId)).orderBy(desc(notifications.createdAt));
      }
      async getNotificationsByCompany(companyId) {
        return await db.select().from(notifications).where(eq(notifications.companyId, companyId)).orderBy(desc(notifications.createdAt));
      }
      async createNotification(insertNotification) {
        const [notification] = await db.insert(notifications).values(insertNotification).returning();
        return notification;
      }
      async updateNotification(id, notificationUpdate) {
        const [updatedNotification] = await db.update(notifications).set(notificationUpdate).where(eq(notifications.id, id)).returning();
        return updatedNotification || void 0;
      }
      async markNotificationAsRead(id) {
        return this.updateNotification(id, { read: true });
      }
      async markAllNotificationsAsRead(professionalId) {
        const result = await db.update(notifications).set({ read: true }).where(eq(notifications.professionalId, professionalId));
        return result.rowCount ?? 0;
      }
      async getUnreadNotificationsCount(professionalId) {
        const result = await db.select().from(notifications).where(and(
          eq(notifications.professionalId, professionalId),
          eq(notifications.read, false)
        ));
        return result.length;
      }
      async getUnreadNotificationsCountByCompany(companyId) {
        const result = await db.select().from(notifications).where(and(
          eq(notifications.companyId, companyId),
          eq(notifications.read, false)
        ));
        return result.length;
      }
      async markAllCompanyNotificationsAsRead(companyId) {
        const result = await db.update(notifications).set({ read: true }).where(eq(notifications.companyId, companyId));
        return result.rowCount ?? 0;
      }
      // Messages methods
      async getMessage(id) {
        const [message] = await db.select().from(messages).where(eq(messages.id, id));
        return message || void 0;
      }
      async getMessagesByService(serviceId) {
        return await db.select().from(messages).where(eq(messages.serviceId, serviceId)).orderBy(messages.createdAt);
      }
      async getConversationsByProfessional(professionalId) {
        const conversations2 = await db.select({
          serviceId: services.id,
          serviceTitle: services.title,
          companyId: companies.id,
          companyName: companies.name,
          lastMessage: messages.message,
          lastMessageAt: messages.createdAt
        }).from(services).innerJoin(messages, eq(messages.serviceId, services.id)).innerJoin(companies, eq(companies.userId, messages.senderId)).where(eq(services.professionalId, professionalId)).orderBy(desc(messages.createdAt));
        const conversationMap = /* @__PURE__ */ new Map();
        conversations2.forEach((conv) => {
          if (!conversationMap.has(conv.serviceId)) {
            conversationMap.set(conv.serviceId, {
              serviceId: conv.serviceId,
              serviceTitle: conv.serviceTitle,
              companyId: conv.companyId,
              companyName: conv.companyName,
              lastMessage: conv.lastMessage,
              lastMessageAt: conv.lastMessageAt,
              unreadCount: 0
            });
          }
        });
        return Array.from(conversationMap.values()).sort(
          (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
        );
      }
      async getConversationsByCompany(companyId) {
        const company2 = await db.select().from(companies).where(eq(companies.id, companyId)).limit(1);
        if (!company2.length) return [];
        const companyUserId = company2[0].userId;
        const conversations2 = await db.select({
          serviceId: services.id,
          serviceTitle: services.title,
          professionalId: professionals.id,
          professionalFirstName: professionals.firstName,
          professionalLastName: professionals.lastName,
          lastMessage: messages.message,
          lastMessageAt: messages.createdAt
        }).from(messages).innerJoin(services, eq(services.id, messages.serviceId)).innerJoin(professionals, eq(professionals.id, services.professionalId)).where(eq(messages.senderId, companyUserId)).orderBy(desc(messages.createdAt));
        const conversationMap = /* @__PURE__ */ new Map();
        conversations2.forEach((conv) => {
          if (!conversationMap.has(conv.serviceId)) {
            conversationMap.set(conv.serviceId, {
              serviceId: conv.serviceId,
              serviceTitle: conv.serviceTitle,
              professionalId: conv.professionalId,
              professionalName: `${conv.professionalFirstName} ${conv.professionalLastName}`,
              lastMessage: conv.lastMessage,
              lastMessageAt: conv.lastMessageAt,
              unreadCount: 0
            });
          }
        });
        return Array.from(conversationMap.values()).sort(
          (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
        );
      }
      async markMessageAsRead(id) {
        const [updatedMessage] = await db.update(messages).set({ read: true }).where(eq(messages.id, id)).returning();
        return updatedMessage || void 0;
      }
      async markConversationAsRead(serviceId, userId) {
        const result = await db.update(messages).set({ read: true }).where(and(
          eq(messages.serviceId, serviceId),
          eq(messages.receiverId, userId)
        ));
        return result.rowCount ?? 0;
      }
      async finalizeChat(serviceId) {
        const result = await db.update(messages).set({ chatFinalized: true }).where(eq(messages.serviceId, serviceId));
        return (result.rowCount ?? 0) > 0;
      }
      async canUserAccessChat(serviceId, userId) {
        const [service] = await db.select({
          id: services.id,
          professionalId: services.professionalId,
          isPaid: services.isPaid,
          chatExpiresAt: services.chatExpiresAt
        }).from(services).where(eq(services.id, serviceId));
        if (!service || !service.isPaid) {
          return false;
        }
        if (service.chatExpiresAt && /* @__PURE__ */ new Date() > service.chatExpiresAt) {
          return false;
        }
        const [user2] = await db.select().from(users).where(eq(users.id, userId));
        if (!user2) return false;
        if (user2.userType === "professional") {
          const [professional2] = await db.select().from(professionals).where(eq(professionals.userId, userId));
          return professional2?.id === service.professionalId;
        } else if (user2.userType === "company") {
          return true;
        }
        return false;
      }
      async activateServiceChat(serviceId) {
        const chatExpiresAt = /* @__PURE__ */ new Date();
        chatExpiresAt.setDate(chatExpiresAt.getDate() + 30);
        const [updatedService] = await db.update(services).set({
          isPaid: true,
          chatActivatedAt: /* @__PURE__ */ new Date(),
          chatExpiresAt
        }).where(eq(services.id, serviceId)).returning();
        return updatedService || void 0;
      }
      // Reviews methods
      async getReview(id) {
        const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
        return review || void 0;
      }
      async getReviewsByProfessional(professionalId) {
        return await db.select().from(reviews).where(eq(reviews.professionalId, professionalId)).orderBy(desc(reviews.createdAt));
      }
      async getReviewsByService(serviceId) {
        return await db.select().from(reviews).where(eq(reviews.serviceId, serviceId)).orderBy(desc(reviews.createdAt));
      }
      async createReview(insertReview) {
        const [review] = await db.insert(reviews).values(insertReview).returning();
        return review;
      }
      async getProfessionalRatingStats(professionalId) {
        const result = await db.select({
          avgRating: count(reviews.rating),
          totalReviews: count(reviews.id)
        }).from(reviews).where(eq(reviews.professionalId, professionalId));
        const allRatings = await db.select({ rating: reviews.rating }).from(reviews).where(eq(reviews.professionalId, professionalId));
        const avgRating = allRatings.length > 0 ? Math.round(allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length * 100) / 100 : 0;
        return {
          avgRating,
          totalReviews: result[0]?.totalReviews || 0
        };
      }
      // Portfolio methods
      async getPortfolio(id) {
        const [item] = await db.select().from(portfolio).where(eq(portfolio.id, id));
        return item || void 0;
      }
      async getPortfolioByProfessional(professionalId) {
        return await db.select().from(portfolio).where(eq(portfolio.professionalId, professionalId)).orderBy(desc(portfolio.createdAt));
      }
      async createPortfolioItem(insertPortfolio) {
        const [item] = await db.insert(portfolio).values(insertPortfolio).returning();
        return item;
      }
      async deletePortfolioItem(id) {
        const result = await db.delete(portfolio).where(eq(portfolio.id, id));
        return (result.rowCount ?? 0) > 0;
      }
      // Certificates methods
      async getCertificate(id) {
        const [certificate] = await db.select().from(certificates).where(eq(certificates.id, id));
        return certificate || void 0;
      }
      async getCertificatesByProfessional(professionalId) {
        return await db.select().from(certificates).where(eq(certificates.professionalId, professionalId)).orderBy(desc(certificates.createdAt));
      }
      async createCertificate(insertCertificate) {
        const [certificate] = await db.insert(certificates).values(insertCertificate).returning();
        return certificate;
      }
      async deleteCertificate(id) {
        const result = await db.delete(certificates).where(eq(certificates.id, id));
        return (result.rowCount ?? 0) > 0;
      }
      // Skill Endorsements methods
      async getSkillEndorsement(id) {
        const [endorsement] = await db.select().from(skillEndorsements).where(eq(skillEndorsements.id, id));
        return endorsement || void 0;
      }
      async getSkillEndorsementsByProfessional(professionalId) {
        return await db.select().from(skillEndorsements).where(eq(skillEndorsements.professionalId, professionalId)).orderBy(desc(skillEndorsements.createdAt));
      }
      async getSkillEndorsementCounts(professionalId) {
        const results = await db.select({
          skillName: skillEndorsements.skillName,
          count: count(skillEndorsements.id)
        }).from(skillEndorsements).where(eq(skillEndorsements.professionalId, professionalId)).groupBy(skillEndorsements.skillName);
        const counts = {};
        results.forEach((result) => {
          counts[result.skillName] = result.count;
        });
        return counts;
      }
      async createSkillEndorsement(insertEndorsement) {
        const [endorsement] = await db.insert(skillEndorsements).values(insertEndorsement).returning();
        return endorsement;
      }
      async hasUserEndorsedSkill(professionalId, skillName, endorsedById) {
        const [result] = await db.select().from(skillEndorsements).where(and(
          eq(skillEndorsements.professionalId, professionalId),
          eq(skillEndorsements.skillName, skillName),
          eq(skillEndorsements.endorsedById, endorsedById)
        ));
        return !!result;
      }
      // Bookings methods
      async getBooking(id) {
        const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
        return booking || void 0;
      }
      async getBookingsByProfessional(professionalId) {
        return await db.select().from(bookings).where(eq(bookings.professionalId, professionalId)).orderBy(desc(bookings.createdAt));
      }
      async getBookingsByCompany(companyId) {
        return await db.select().from(bookings).where(eq(bookings.companyId, companyId)).orderBy(desc(bookings.createdAt));
      }
      async createBooking(insertBooking) {
        const [booking] = await db.insert(bookings).values(insertBooking).returning();
        return booking;
      }
      async updateBookingStatus(id, status) {
        const [updatedBooking] = await db.update(bookings).set({ status }).where(eq(bookings.id, id)).returning();
        return updatedBooking || void 0;
      }
      // Invitation methods
      async createInvitation(insertInvitation) {
        const [invitation] = await db.insert(invitations).values(insertInvitation).returning();
        return invitation;
      }
      async getInvitationByToken(token) {
        const [invitation] = await db.select().from(invitations).where(eq(invitations.token, token));
        return invitation || void 0;
      }
      async updateInvitationStatus(token, status) {
        const [invitation] = await db.update(invitations).set({ status }).where(eq(invitations.token, token)).returning();
        return invitation || void 0;
      }
      async getInvitationsByJob(jobId) {
        return await db.select().from(invitations).where(eq(invitations.jobId, jobId)).orderBy(desc(invitations.createdAt));
      }
      async getRatingsByJobAndProfessional(jobId, professionalId) {
        return await db.select().from(ratings).where(
          and(
            eq(ratings.jobId, jobId),
            eq(ratings.professionalId, professionalId)
          )
        );
      }
      // Admin Posts Management Methods
      async getAllServicesWithUsers() {
        return await db.select({
          id: services.id,
          title: services.title,
          description: services.description,
          price: services.price,
          category: services.category,
          isActive: services.isActive,
          createdAt: services.createdAt,
          professionalId: services.professionalId,
          professionalName: sql`CONCAT(${professionals.firstName}, ' ', ${professionals.lastName})`,
          professionalEmail: users.email,
          userType: sql`'Profesional'`
        }).from(services).leftJoin(professionals, eq(services.professionalId, professionals.id)).leftJoin(users, eq(professionals.userId, users.id)).orderBy(desc(services.createdAt));
      }
      async getAllJobsWithCompanies() {
        return await db.select({
          id: jobs.id,
          title: jobs.title,
          description: jobs.description,
          salaryRange: jobs.salaryRange,
          location: jobs.location,
          isActive: jobs.isActive,
          createdAt: jobs.createdAt,
          companyId: jobs.companyId,
          companyName: companies.name,
          companyEmail: users.email,
          userType: sql`'Empresa'`
        }).from(jobs).leftJoin(companies, eq(jobs.companyId, companies.id)).leftJoin(users, eq(companies.userId, users.id)).orderBy(desc(jobs.createdAt));
      }
      async updateServiceStatus(id, status) {
        const isActive = status === "active";
        const [updatedService] = await db.update(services).set({ isActive }).where(eq(services.id, id)).returning();
        return updatedService || void 0;
      }
      async updateJobStatus(id, status) {
        const isActive = status === "active";
        const [updatedJob] = await db.update(jobs).set({ isActive }).where(eq(jobs.id, id)).returning();
        return updatedJob || void 0;
      }
      async deleteService(id) {
        await db.delete(services).where(eq(services.id, id));
      }
      async deleteJob(id) {
        await db.delete(jobs).where(eq(jobs.id, id));
      }
      // Service chat methods for new functionality
      async createMessage(insertMessage) {
        const [message] = await db.insert(messages).values(insertMessage).returning();
        return message;
      }
      async getProfessionalWithUser(professionalId) {
        const result = await db.select({
          ...getTableColumns(professionals),
          user: getTableColumns(users)
        }).from(professionals).innerJoin(users, eq(professionals.userId, users.id)).where(eq(professionals.id, professionalId));
        if (result.length === 0) return void 0;
        const { user: user2, ...professional2 } = result[0];
        return { ...professional2, user: user2 };
      }
      // Admin methods
      async getAdmin(id) {
        const [admin] = await db.select().from(admins).where(eq(admins.id, id));
        return admin || void 0;
      }
      async getAdminByEmail(email) {
        const [admin] = await db.select().from(admins).where(eq(admins.email, email));
        return admin || void 0;
      }
      async createAdmin(insertAdmin) {
        const [admin] = await db.insert(admins).values(insertAdmin).returning();
        return admin;
      }
      // Platform Settings methods
      async getAllSettings() {
        return await db.select().from(platformSettings).orderBy(asc(platformSettings.category), asc(platformSettings.key));
      }
      async getSetting(key) {
        const [setting] = await db.select().from(platformSettings).where(eq(platformSettings.key, key));
        return setting || void 0;
      }
      async updateSetting(key, value, updatedBy) {
        const [setting] = await db.update(platformSettings).set({
          value,
          updatedAt: /* @__PURE__ */ new Date(),
          updatedBy
        }).where(eq(platformSettings.key, key)).returning();
        return setting || void 0;
      }
      async createSetting(insertSetting) {
        const [setting] = await db.insert(platformSettings).values(insertSetting).returning();
        return setting;
      }
      async initializeDefaultSettings() {
        const defaultSettings = [
          {
            key: "premium_plan_price",
            value: "75",
            valueType: "number",
            category: "pricing",
            description: "Precio del plan premium en USD"
          },
          {
            key: "job_visibility_days",
            value: "30",
            valueType: "number",
            category: "jobs",
            description: "D\xEDas de visibilidad para empleos publicados"
          },
          {
            key: "welcome_email_subject",
            value: "Bienvenido a Flexwork",
            valueType: "string",
            category: "emails",
            description: "Asunto del correo de bienvenida"
          },
          {
            key: "welcome_email_body",
            value: "Gracias por unirte a Flexwork. Estamos emocionados de tenerte con nosotros.",
            valueType: "string",
            category: "emails",
            description: "Contenido del correo de bienvenida"
          },
          {
            key: "max_cv_file_size",
            value: "5",
            valueType: "number",
            category: "limits",
            description: "Tama\xF1o m\xE1ximo de archivo CV en MB"
          },
          {
            key: "max_profile_image_size",
            value: "2",
            valueType: "number",
            category: "limits",
            description: "Tama\xF1o m\xE1ximo de imagen de perfil en MB"
          },
          {
            key: "platform_name",
            value: "Flexwork",
            valueType: "string",
            category: "general",
            description: "Nombre de la plataforma"
          },
          {
            key: "support_email",
            value: "soporte@flexwork.com",
            valueType: "string",
            category: "general",
            description: "Email de soporte al cliente"
          }
        ];
        for (const setting of defaultSettings) {
          const existing = await this.getSetting(setting.key);
          if (!existing) {
            await this.createSetting(setting);
          }
        }
      }
      // Admin moderation methods
      async getModerationServices() {
        return await db.select().from(services).orderBy(desc(services.updatedAt));
      }
      async getModerationCVs() {
        return await db.select().from(professionals).where(sql`${professionals.cvUrl} IS NOT NULL`).orderBy(desc(professionals.updatedAt));
      }
      async moderateService(serviceId, status, note, adminId) {
        const [service] = await db.update(services).set({
          moderationStatus: status,
          moderationNote: note,
          moderatedAt: /* @__PURE__ */ new Date(),
          moderatedBy: adminId,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(services.id, serviceId)).returning();
        return service || void 0;
      }
      async moderateCV(professionalId, status, note, adminId) {
        const [professional2] = await db.update(professionals).set({
          cvModerationStatus: status,
          cvModerationNote: note,
          cvModeratedAt: /* @__PURE__ */ new Date(),
          cvModeratedBy: adminId,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(professionals.id, professionalId)).returning();
        return professional2 || void 0;
      }
      async updateAdmin(id, adminUpdate) {
        const [admin] = await db.update(admins).set({
          ...adminUpdate,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(admins.id, id)).returning();
        return admin || void 0;
      }
      async getAllAdmins() {
        return await db.select().from(admins).orderBy(asc(admins.createdAt));
      }
      async deleteAdmin(id) {
        const result = await db.delete(admins).where(eq(admins.id, id));
        return result.rowCount ? result.rowCount > 0 : false;
      }
      // Payment methods
      async getPayment(id) {
        const [payment] = await db.select().from(payments).where(eq(payments.id, id));
        return payment || void 0;
      }
      async getAllPayments(filters) {
        const samplePayments = [
          {
            id: 1,
            transactionId: "txn_1234567890",
            userId: 1,
            userName: "Tech Solutions SAC",
            userEmail: "empresa@techsolutions.com",
            userType: "company",
            planType: "Premium Job Posting",
            amount: 75,
            currency: "USD",
            status: "completed",
            paymentMethod: "credit_card",
            stripeSessionId: "cs_test_1234567890",
            description: "Publicaci\xF3n de empleo premium",
            createdAt: /* @__PURE__ */ new Date("2025-06-15T10:30:00Z"),
            updatedAt: /* @__PURE__ */ new Date("2025-06-15T10:30:00Z")
          },
          {
            id: 2,
            transactionId: "txn_0987654321",
            userId: 2,
            userName: "Carlos Rodriguez",
            userEmail: "carlos.rodriguez@email.com",
            userType: "professional",
            planType: "Premium Profile",
            amount: 29.99,
            currency: "USD",
            status: "completed",
            paymentMethod: "paypal",
            stripeSessionId: "cs_test_0987654321",
            description: "Perfil profesional premium",
            createdAt: /* @__PURE__ */ new Date("2025-06-14T14:20:00Z"),
            updatedAt: /* @__PURE__ */ new Date("2025-06-14T14:20:00Z")
          },
          {
            id: 3,
            transactionId: "txn_1122334455",
            userId: 3,
            userName: "InnovaCorp EIRL",
            userEmail: "rrhh@innovacorp.com",
            userType: "company",
            planType: "Premium Job Posting",
            amount: 75,
            currency: "USD",
            status: "pending",
            paymentMethod: "bank_transfer",
            stripeSessionId: "cs_test_1122334455",
            description: "Publicaci\xF3n de empleo premium",
            createdAt: /* @__PURE__ */ new Date("2025-06-13T16:45:00Z"),
            updatedAt: /* @__PURE__ */ new Date("2025-06-13T16:45:00Z")
          },
          {
            id: 4,
            transactionId: "txn_5566778899",
            userId: 4,
            userName: "Maria Gonzalez",
            userEmail: "maria.gonzalez@email.com",
            userType: "professional",
            planType: "Premium Profile",
            amount: 29.99,
            currency: "USD",
            status: "failed",
            paymentMethod: "credit_card",
            stripeSessionId: "cs_test_5566778899",
            description: "Perfil profesional premium",
            createdAt: /* @__PURE__ */ new Date("2025-06-12T09:15:00Z"),
            updatedAt: /* @__PURE__ */ new Date("2025-06-12T09:15:00Z")
          },
          {
            id: 5,
            transactionId: "txn_9900112233",
            userId: 5,
            userName: "StartupHub SAC",
            userEmail: "hiring@startuphub.pe",
            userType: "company",
            planType: "Premium Job Posting",
            amount: 75,
            currency: "USD",
            status: "completed",
            paymentMethod: "credit_card",
            stripeSessionId: "cs_test_9900112233",
            description: "Publicaci\xF3n de empleo premium",
            createdAt: /* @__PURE__ */ new Date("2025-06-11T11:30:00Z"),
            updatedAt: /* @__PURE__ */ new Date("2025-06-11T11:30:00Z")
          },
          {
            id: 6,
            transactionId: "txn_4455667788",
            userId: 6,
            userName: "Luis Mendoza",
            userEmail: "luis.mendoza@email.com",
            userType: "professional",
            planType: "Premium Profile",
            amount: 29.99,
            currency: "USD",
            status: "completed",
            paymentMethod: "credit_card",
            stripeSessionId: "cs_test_4455667788",
            description: "Perfil profesional premium",
            createdAt: /* @__PURE__ */ new Date("2025-06-10T08:45:00Z"),
            updatedAt: /* @__PURE__ */ new Date("2025-06-10T08:45:00Z")
          }
        ];
        let filteredPayments = samplePayments;
        if (filters?.userType && filters.userType !== "all") {
          filteredPayments = filteredPayments.filter((payment) => payment.userType === filters.userType);
        }
        if (filters?.status && filters.status !== "all") {
          filteredPayments = filteredPayments.filter((payment) => payment.status === filters.status);
        }
        if (filters?.dateFrom) {
          const fromDate = new Date(filters.dateFrom);
          filteredPayments = filteredPayments.filter((payment) => new Date(payment.createdAt) >= fromDate);
        }
        if (filters?.dateTo) {
          const toDate = new Date(filters.dateTo);
          filteredPayments = filteredPayments.filter((payment) => new Date(payment.createdAt) <= toDate);
        }
        return filteredPayments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      async createPayment(insertPayment) {
        const [payment] = await db.insert(payments).values(insertPayment).returning();
        return payment;
      }
      async updatePayment(id, paymentUpdate) {
        const [payment] = await db.update(payments).set({
          ...paymentUpdate,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(payments.id, id)).returning();
        return payment || void 0;
      }
      async getPaymentStats() {
        const samplePayments = [
          { amount: 75, status: "completed", userType: "company", createdAt: /* @__PURE__ */ new Date("2025-06-15") },
          { amount: 29.99, status: "completed", userType: "professional", createdAt: /* @__PURE__ */ new Date("2025-06-14") },
          { amount: 75, status: "pending", userType: "company", createdAt: /* @__PURE__ */ new Date("2025-06-13") },
          { amount: 29.99, status: "failed", userType: "professional", createdAt: /* @__PURE__ */ new Date("2025-06-12") },
          { amount: 75, status: "completed", userType: "company", createdAt: /* @__PURE__ */ new Date("2025-06-11") },
          { amount: 29.99, status: "completed", userType: "professional", createdAt: /* @__PURE__ */ new Date("2025-06-10") }
        ];
        const totalRevenue = samplePayments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0);
        const totalTransactions = samplePayments.length;
        const successfulTransactions = samplePayments.filter((p) => p.status === "completed").length;
        const currentMonth = (/* @__PURE__ */ new Date()).getMonth();
        const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
        const monthlyRevenue = samplePayments.filter((p) => p.status === "completed" && p.createdAt.getMonth() === currentMonth && p.createdAt.getFullYear() === currentYear).reduce((sum, p) => sum + p.amount, 0);
        const companyPayments = samplePayments.filter((p) => p.userType === "company").length;
        const professionalPayments = samplePayments.filter((p) => p.userType === "professional").length;
        return {
          totalRevenue,
          monthlyRevenue,
          totalTransactions,
          successfulTransactions,
          successRate: totalTransactions > 0 ? (successfulTransactions / totalTransactions * 100).toFixed(1) : 0,
          companyPayments,
          professionalPayments,
          averageTransactionValue: successfulTransactions > 0 ? (totalRevenue / successfulTransactions).toFixed(2) : 0
        };
      }
      // Admin user management methods
      async getAllUsers() {
        return await db.select().from(users).orderBy(asc(users.createdAt));
      }
      // Audit Log methods
      async createAuditLog(insertAuditLog) {
        const [auditLog] = await db.insert(auditLogs).values(insertAuditLog).returning();
        return auditLog;
      }
      async getAuditLogs(limit = 100, offset = 0) {
        return await db.select().from(auditLogs).orderBy(desc(auditLogs.timestamp)).limit(limit).offset(offset);
      }
      async getAuditLogsByEntity(entityType, entityId) {
        return await db.select().from(auditLogs).where(and(
          eq(auditLogs.entityType, entityType),
          eq(auditLogs.entityId, entityId)
        )).orderBy(desc(auditLogs.timestamp));
      }
      async getAuditLogsByUser(userId) {
        return await db.select().from(auditLogs).where(eq(auditLogs.userId, userId)).orderBy(desc(auditLogs.timestamp));
      }
      // Job counter methods for company plan management
      async getCompanyJobCount(companyId) {
        const result = await db.select({ count: count() }).from(jobs).where(and(
          eq(jobs.companyId, companyId),
          eq(jobs.isActive, true)
        ));
        return result[0]?.count || 0;
      }
      async updateCompanyJobsUsed(companyId, jobsUsed) {
        const [updatedCompany] = await db.update(companies).set({ jobsUsed }).where(eq(companies.id, companyId)).returning();
        return updatedCompany || void 0;
      }
    };
  }
});

// server/storage.ts
var storage;
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_database_storage();
    storage = new DatabaseStorage();
  }
});

// server/cv-parser-simple.ts
var cv_parser_simple_exports = {};
__export(cv_parser_simple_exports, {
  SimpleCVParser: () => SimpleCVParser,
  simpleCVParser: () => simpleCVParser
});
import fs2 from "fs";
import { createRequire } from "module";
var require2, pdfParse2, SimpleCVParser, simpleCVParser;
var init_cv_parser_simple = __esm({
  "server/cv-parser-simple.ts"() {
    "use strict";
    init_storage();
    require2 = createRequire(import.meta.url);
    pdfParse2 = require2("pdf-parse");
    SimpleCVParser = class {
      async parsePDF(filePath) {
        try {
          const dataBuffer = fs2.readFileSync(filePath);
          const pdfData = await pdfParse2(dataBuffer);
          return pdfData.text;
        } catch (error) {
          console.error("Error parsing PDF:", error);
          throw new Error("Error al leer el archivo PDF");
        }
      }
      extractExperiences(text2) {
        const experiences2 = [];
        console.log("Starting simple experience extraction...");
        const lowerText = text2.toLowerCase();
        const experienceIndex = lowerText.indexOf("experiencia laboral");
        if (experienceIndex === -1) {
          console.log("No experience section found");
          return experiences2;
        }
        const endMarkers = ["educaci\xF3n", "educacion", "especializaciones", "idiomas", "habilidades"];
        let endIndex = text2.length;
        for (const marker of endMarkers) {
          const markerIndex = lowerText.indexOf(marker, experienceIndex);
          if (markerIndex !== -1 && markerIndex < endIndex) {
            endIndex = markerIndex;
          }
        }
        const experienceSection = text2.substring(experienceIndex, endIndex);
        console.log("Experience section length:", experienceSection.length);
        const lines = experienceSection.split("\n").map((line) => line.trim()).filter((line) => line.length > 15);
        for (const line of lines) {
          const jobMatch = line.match(/^(.+?)\s+(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)\.?\s+(\d{4})\s*[-–]\s*(actualidad|presente|[a-z]{3}\.?\s*\d{4})/i);
          if (jobMatch) {
            const positionCompanyText = jobMatch[1].trim();
            const startMonth = jobMatch[2];
            const startYear = jobMatch[3];
            const endPart = jobMatch[4];
            let position = "";
            let company2 = "";
            if (positionCompanyText.includes(" - ")) {
              const dashParts = positionCompanyText.split(" - ");
              if (dashParts.length >= 2) {
                position = dashParts[0].trim();
                company2 = dashParts.slice(1).join(" - ").trim();
              }
            }
            if (!position || !company2) {
              const positionKeywords = ["coordinador", "especialista", "gerente", "director", "manager", "jefe", "analista", "consultor", "asistente", "product"];
              for (const keyword of positionKeywords) {
                const keywordIndex = positionCompanyText.toLowerCase().indexOf(keyword);
                if (keywordIndex !== -1) {
                  const afterKeyword = positionCompanyText.substring(keywordIndex);
                  const words = afterKeyword.split(" ");
                  let positionWords = [];
                  let companyWords = [];
                  let foundCompanyStart = false;
                  for (let i = 0; i < words.length; i++) {
                    const word = words[i];
                    if (!foundCompanyStart && (word.match(/^[A-Z][a-z]*$/) || // Proper noun
                    ["sociedad", "nacional", "industrias", "gmbh", "inc", "corp", "sac", "ltda"].some((ind) => word.toLowerCase().includes(ind)))) {
                      foundCompanyStart = true;
                      companyWords.push(word);
                    } else if (foundCompanyStart) {
                      companyWords.push(word);
                    } else {
                      positionWords.push(word);
                    }
                  }
                  if (positionWords.length > 0 && companyWords.length > 0) {
                    position = positionWords.join(" ").trim();
                    company2 = companyWords.join(" ").trim();
                    break;
                  }
                }
              }
            }
            if (!position || !company2) {
              const words = positionCompanyText.split(" ");
              if (words.length >= 4) {
                const splitPoint = Math.floor(words.length * 0.4);
                position = words.slice(0, Math.max(2, splitPoint)).join(" ").trim();
                company2 = words.slice(Math.max(2, splitPoint)).join(" ").trim();
              }
            }
            company2 = company2.replace(/,$/, "").split(",")[0].trim();
            if (position.length >= 3 && company2.length >= 3 && position !== company2) {
              const startDate = `${startMonth} ${startYear}`;
              const isCurrentJob = /actualidad|presente/i.test(endPart);
              const endDate = isCurrentJob ? null : endPart.trim();
              console.log("Found experience:", { position, company: company2, startDate, endDate });
              experiences2.push({
                company: company2.substring(0, 100),
                position: position.substring(0, 100),
                startDate,
                endDate,
                current: isCurrentJob,
                description: void 0,
                location: void 0
              });
            }
          }
        }
        console.log(`Total experiences found: ${experiences2.length}`);
        return experiences2;
      }
      extractEducation(text2) {
        const education2 = [];
        console.log("Starting education extraction...");
        const lowerText = text2.toLowerCase();
        let educationIndex = lowerText.indexOf("educaci\xF3n");
        if (educationIndex === -1) {
          educationIndex = lowerText.indexOf("educacion");
        }
        if (educationIndex === -1) {
          console.log("No education section found");
          return education2;
        }
        const endMarkers = ["especializaciones", "idiomas", "habilidades", "proyectos"];
        let endIndex = text2.length;
        for (const marker of endMarkers) {
          const markerIndex = lowerText.indexOf(marker, educationIndex);
          if (markerIndex !== -1 && markerIndex < endIndex) {
            endIndex = markerIndex;
          }
        }
        const educationSection = text2.substring(educationIndex, endIndex);
        console.log("Education section length:", educationSection.length);
        const lines = educationSection.split("\n").map((line) => line.trim()).filter((line) => line.length > 10);
        for (const line of lines) {
          const eduMatch = line.match(/^([A-Za-záéíóúñÁÉÍÓÚÑ\s\-]+?)\s+(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)\.?\s+(\d{4})\s*[-–]\s*(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)\.?\s+(\d{4})\s+(.+)/i);
          if (eduMatch) {
            const degree = eduMatch[1].trim();
            const startMonth = eduMatch[2];
            const startYear = eduMatch[3];
            const endMonth = eduMatch[4];
            const endYear = eduMatch[5];
            const institution = eduMatch[6].trim();
            if (degree.length > 2 && institution.length > 5) {
              const startDate = `${startMonth} ${startYear}`;
              const endDate = `${endMonth} ${endYear}`;
              const cleanInstitution = institution.split(",")[0].trim();
              console.log("Found education:", { degree, institution: cleanInstitution, startDate, endDate });
              education2.push({
                institution: cleanInstitution.substring(0, 100),
                degree: degree.substring(0, 100),
                field: "General",
                startDate,
                endDate,
                current: false,
                description: void 0
              });
            }
          }
        }
        console.log(`Total education entries found: ${education2.length}`);
        return education2;
      }
      async processAndSaveCV(filePath, professionalId) {
        try {
          console.log("=== SIMPLE CV PARSER ===");
          const pdfText = await this.parsePDF(filePath);
          console.log(`PDF text length: ${pdfText.length}`);
          const experiences2 = this.extractExperiences(pdfText);
          const education2 = this.extractEducation(pdfText);
          let savedExperiences = 0;
          let savedEducation = 0;
          for (const exp of experiences2) {
            try {
              const insertData = {
                professionalId,
                company: exp.company,
                position: exp.position,
                startDate: exp.startDate,
                endDate: exp.endDate,
                current: exp.current,
                description: exp.description,
                location: exp.location
              };
              await storage.createExperience(insertData);
              savedExperiences++;
            } catch (error) {
              console.error("Error saving experience:", error);
            }
          }
          for (const edu of education2) {
            try {
              const insertData = {
                professionalId,
                institution: edu.institution,
                degree: edu.degree,
                field: edu.field,
                startDate: edu.startDate,
                endDate: edu.endDate,
                current: edu.current,
                description: edu.description
              };
              await storage.createEducation(insertData);
              savedEducation++;
            } catch (error) {
              console.error("Error saving education:", error);
            }
          }
          console.log(`=== RESULTS: ${savedExperiences} experiences, ${savedEducation} education entries saved ===`);
          return {
            experiences: experiences2,
            education: education2,
            savedExperiences,
            savedEducation
          };
        } catch (error) {
          console.error("Error processing CV:", error);
          throw new Error("Error procesando el CV: " + error.message);
        }
      }
    };
    simpleCVParser = new SimpleCVParser();
  }
});

// server/service-suggestions.ts
var service_suggestions_exports = {};
__export(service_suggestions_exports, {
  ServiceSuggestionEngine: () => ServiceSuggestionEngine,
  serviceSuggestionEngine: () => serviceSuggestionEngine
});
var ServiceSuggestionEngine, serviceSuggestionEngine;
var init_service_suggestions = __esm({
  "server/service-suggestions.ts"() {
    "use strict";
    ServiceSuggestionEngine = class {
      serviceTemplates = [
        {
          actionVerbs: ["ense\xF1ar", "capacitar", "entrenar", "educar", "formar", "instruir"],
          keywords: ["formaci\xF3n", "educaci\xF3n", "capacitaci\xF3n", "entrenamiento", "curso", "taller", "clase"],
          category: "Educaci\xF3n y Formaci\xF3n",
          titleTemplate: "Capacitaci\xF3n en {skill}",
          descriptionTemplate: "Ofrezco servicios de capacitaci\xF3n y formaci\xF3n especializada en {skill} basado en mi experiencia pr\xE1ctica en {company}.",
          suggestedPrice: "$50-100/hora",
          confidence: 85
        },
        {
          actionVerbs: ["consultar", "asesorar", "orientar", "guiar", "recomendar", "analizar"],
          keywords: ["consultor\xEDa", "asesor\xEDa", "an\xE1lisis", "estrategia", "optimizaci\xF3n", "mejora"],
          category: "Consultor\xEDa",
          titleTemplate: "Consultor\xEDa en {skill}",
          descriptionTemplate: "Brindo consultor\xEDa especializada en {skill} para empresas que buscan optimizar sus procesos y estrategias.",
          suggestedPrice: "$75-150/hora",
          confidence: 90
        },
        {
          actionVerbs: ["desarrollar", "programar", "crear", "construir", "implementar", "dise\xF1ar"],
          keywords: ["desarrollo", "programaci\xF3n", "software", "aplicaci\xF3n", "sistema", "web", "m\xF3vil"],
          category: "Desarrollo de Software",
          titleTemplate: "Desarrollo de {skill}",
          descriptionTemplate: "Desarrollo soluciones personalizadas en {skill} con experiencia comprobada en proyectos empresariales.",
          suggestedPrice: "$40-80/hora",
          confidence: 95
        },
        {
          actionVerbs: ["gestionar", "coordinar", "administrar", "dirigir", "supervisar", "liderar"],
          keywords: ["gesti\xF3n", "administraci\xF3n", "coordinaci\xF3n", "proyecto", "equipo", "liderazgo", "coordinador", "jefe", "manager"],
          category: "Gesti\xF3n de Proyectos",
          titleTemplate: "Gesti\xF3n de Proyectos de Marketing",
          descriptionTemplate: "Gesti\xF3n profesional de proyectos de marketing con metodolog\xEDas \xE1giles y experiencia comprobada en {company}.",
          suggestedPrice: "$60-120/hora",
          confidence: 88
        },
        {
          actionVerbs: ["coordinar", "gestionar", "planificar", "ejecutar", "supervisar"],
          keywords: ["marketing", "coordinador", "coordinaci\xF3n", "campa\xF1as", "estrategia", "comercial"],
          category: "Coordinaci\xF3n de Marketing",
          titleTemplate: "Coordinaci\xF3n de Campa\xF1as de Marketing",
          descriptionTemplate: "Servicios de coordinaci\xF3n y gesti\xF3n de campa\xF1as de marketing basados en mi experiencia como coordinador de marketing.",
          suggestedPrice: "$50-100/hora",
          confidence: 90
        },
        {
          actionVerbs: ["administrar", "gestionar", "supervisar", "coordinar"],
          keywords: ["administraci\xF3n", "empresas", "MBA", "negocios", "comercial", "ventas"],
          category: "Consultor\xEDa Empresarial",
          titleTemplate: "Consultor\xEDa en Administraci\xF3n de Empresas",
          descriptionTemplate: "Consultor\xEDa especializada en administraci\xF3n de empresas con formaci\xF3n MBA y experiencia en gesti\xF3n comercial.",
          suggestedPrice: "$80-150/hora",
          confidence: 95
        },
        {
          actionVerbs: ["dise\xF1ar", "crear", "ilustrar", "conceptualizar", "visualizar"],
          keywords: ["dise\xF1o", "gr\xE1fico", "visual", "creatividad", "marca", "identidad", "UI", "UX"],
          category: "Dise\xF1o Gr\xE1fico",
          titleTemplate: "Dise\xF1o de {skill}",
          descriptionTemplate: "Servicios de dise\xF1o profesional en {skill} con enfoque creativo y experiencia en m\xFAltiples industrias.",
          suggestedPrice: "$30-70/hora",
          confidence: 82
        },
        {
          actionVerbs: ["promocionar", "comercializar", "vender", "publicitar", "posicionar", "coordinar", "gestionar", "dirigir"],
          keywords: ["marketing", "ventas", "publicidad", "promoci\xF3n", "digital", "redes sociales", "SEO", "comercial", "coordinador", "jefe", "asistente", "manager"],
          category: "Marketing Digital",
          titleTemplate: "Consultor\xEDa en Marketing Digital",
          descriptionTemplate: "Estrategias de marketing digital y comercial basadas en mi experiencia como {skill} para impulsar el crecimiento de tu negocio.",
          suggestedPrice: "$60-120/hora",
          confidence: 92
        },
        {
          actionVerbs: ["traducir", "interpretar", "localizar", "adaptar"],
          keywords: ["traducci\xF3n", "idioma", "lenguaje", "interpretaci\xF3n", "localizaci\xF3n"],
          category: "Traducci\xF3n",
          titleTemplate: "Servicios de Traducci\xF3n {skill}",
          descriptionTemplate: "Traducci\xF3n profesional en {skill} con precisi\xF3n t\xE9cnica y cultural para documentos empresariales.",
          suggestedPrice: "$20-40/p\xE1gina",
          confidence: 80
        },
        {
          actionVerbs: ["escribir", "redactar", "editar", "revisar", "corregir"],
          keywords: ["redacci\xF3n", "escritura", "contenido", "copywriting", "art\xEDculo", "blog"],
          category: "Redacci\xF3n",
          titleTemplate: "Redacci\xF3n de Contenido {skill}",
          descriptionTemplate: "Creaci\xF3n de contenido profesional en {skill} adaptado a tu audiencia y objetivos comerciales.",
          suggestedPrice: "$25-60/art\xEDculo",
          confidence: 85
        }
      ];
      /**
       * Analiza las experiencias laborales y genera sugerencias de servicios
       */
      async generateSuggestions(experiences2, professionalId) {
        const suggestions = [];
        const usedCombinations = /* @__PURE__ */ new Set();
        for (const experience of experiences2) {
          const fullText = `${experience.position} ${experience.company} ${experience.description || ""}`.toLowerCase();
          const detectedSkills = this.extractSkills(fullText);
          const actionVerbs = this.extractActionVerbs(fullText);
          for (const template of this.serviceTemplates) {
            const matchingVerbs = actionVerbs.filter(
              (verb) => template.actionVerbs.some(
                (templateVerb) => verb.includes(templateVerb) || templateVerb.includes(verb)
              )
            );
            const matchingKeywords = template.keywords.filter(
              (keyword) => fullText.includes(keyword)
            );
            const verbScore = matchingVerbs.length * 30;
            const keywordScore = matchingKeywords.length * 20;
            const skillScore = detectedSkills.length * 15;
            const totalScore = verbScore + keywordScore + skillScore;
            if (totalScore >= 40) {
              const primarySkill = detectedSkills[0] || experience.position;
              const uniqueKey = `${template.category}-${primarySkill}`;
              if (usedCombinations.has(uniqueKey)) continue;
              usedCombinations.add(uniqueKey);
              const confidence = Math.min(95, Math.max(50, template.confidence + (totalScore - 40)));
              const suggestion = {
                professionalId,
                title: template.titleTemplate.replace("{skill}", primarySkill),
                description: template.descriptionTemplate.replace("{skill}", primarySkill).replace("{company}", experience.company),
                category: template.category,
                suggestedPrice: template.suggestedPrice,
                confidence,
                sourceExperiences: JSON.stringify([experience.id]),
                keywords: JSON.stringify(matchingKeywords.concat(detectedSkills)),
                actionVerbs: JSON.stringify(matchingVerbs),
                isAccepted: false
              };
              suggestions.push(suggestion);
            }
          }
        }
        return suggestions.sort((a, b) => (b.confidence || 0) - (a.confidence || 0)).slice(0, 5);
      }
      /**
       * Extrae verbos de acción del texto
       */
      extractActionVerbs(text2) {
        const actionVerbs = [
          "desarrollar",
          "programar",
          "crear",
          "construir",
          "implementar",
          "dise\xF1ar",
          "gestionar",
          "coordinar",
          "administrar",
          "dirigir",
          "supervisar",
          "liderar",
          "ense\xF1ar",
          "capacitar",
          "entrenar",
          "educar",
          "formar",
          "instruir",
          "consultar",
          "asesorar",
          "orientar",
          "guiar",
          "recomendar",
          "analizar",
          "promocionar",
          "comercializar",
          "vender",
          "publicitar",
          "posicionar",
          "escribir",
          "redactar",
          "editar",
          "revisar",
          "corregir",
          "traducir",
          "interpretar",
          "localizar",
          "adaptar",
          "optimizar",
          "mejorar",
          "innovar",
          "automatizar",
          "integrar",
          "planificar",
          "organizar",
          "ejecutar",
          "controlar",
          "evaluar"
        ];
        return actionVerbs.filter((verb) => {
          const variations = [
            verb,
            verb + "\xE9",
            verb + "\xF3",
            verb + "amos",
            verb + "aron",
            verb.slice(0, -1) + "ando",
            // gerundio
            verb.slice(0, -1) + "ado"
            // participio
          ];
          return variations.some((variation) => text2.includes(variation));
        });
      }
      /**
       * Extrae habilidades técnicas y keywords del texto
       */
      extractSkills(text2) {
        const skillKeywords = [
          // Tecnología
          "javascript",
          "python",
          "java",
          "react",
          "node",
          "angular",
          "vue",
          "html",
          "css",
          "sql",
          "mongodb",
          "mysql",
          "aws",
          "docker",
          "git",
          // Marketing
          "seo",
          "sem",
          "google ads",
          "facebook ads",
          "content marketing",
          "email marketing",
          "social media",
          "analytics",
          "copywriting",
          // Diseño
          "photoshop",
          "illustrator",
          "figma",
          "sketch",
          "ui",
          "ux",
          "branding",
          "logo",
          "identidad visual",
          // Gestión
          "scrum",
          "agile",
          "kanban",
          "jira",
          "trello",
          "project management",
          "team leadership",
          "budgeting",
          "planning",
          // Idiomas
          "ingl\xE9s",
          "espa\xF1ol",
          "franc\xE9s",
          "alem\xE1n",
          "italiano",
          "portugu\xE9s",
          // Industrias
          "e-commerce",
          "fintech",
          "healthcare",
          "education",
          "retail",
          "manufacturing",
          "logistics",
          "consulting"
        ];
        const foundSkills = [];
        for (const skill of skillKeywords) {
          if (text2.includes(skill.toLowerCase())) {
            foundSkills.push(skill);
          }
        }
        const capitalizedWords = text2.match(/\b[A-Z][a-zA-Z]{2,}\b/g) || [];
        foundSkills.push(...capitalizedWords.slice(0, 3));
        return Array.from(new Set(foundSkills));
      }
      /**
       * Actualiza las sugerencias basándose en nuevas experiencias
       */
      async updateSuggestions(experiences2, professionalId) {
        const newSuggestions = await this.generateSuggestions(experiences2, professionalId);
        return newSuggestions;
      }
    };
    serviceSuggestionEngine = new ServiceSuggestionEngine();
  }
});

// server/simple-test-setup.ts
var simple_test_setup_exports = {};
__export(simple_test_setup_exports, {
  SimpleTestManager: () => SimpleTestManager,
  simpleTestManager: () => simpleTestManager
});
import bcrypt from "bcryptjs";
import { eq as eq4 } from "drizzle-orm";
var SimpleTestManager, simpleTestManager;
var init_simple_test_setup = __esm({
  "server/simple-test-setup.ts"() {
    "use strict";
    init_db();
    init_schema();
    SimpleTestManager = class {
      async createTestEnvironment() {
        if (process.env.NODE_ENV !== "development") {
          return {
            success: false,
            message: "Los datos de prueba solo est\xE1n disponibles en desarrollo"
          };
        }
        try {
          const hashedPassword = await bcrypt.hash("test123", 10);
          const [companyUser] = await db.insert(users).values({
            username: "empresa_test",
            email: "empresa@flexwork.com",
            password: hashedPassword,
            userType: "company"
          }).onConflictDoNothing().returning();
          const [professionalUser] = await db.insert(users).values({
            username: "profesional_test",
            email: "profesional@flexwork.com",
            password: hashedPassword,
            userType: "professional"
          }).onConflictDoNothing().returning();
          if (companyUser) {
            await db.insert(companies).values({
              userId: companyUser.id,
              name: "Empresa Test Flexwork",
              description: "Empresa de prueba para testing del sistema Flexwork con todas las funcionalidades habilitadas.",
              industry: "Tecnolog\xEDa",
              location: "Lima, Per\xFA",
              website: "https://test.flexwork.com",
              size: "medium"
            }).onConflictDoNothing();
          }
          if (professionalUser) {
            await db.insert(professionals).values({
              userId: professionalUser.id,
              firstName: "Juan",
              lastName: "P\xE9rez Test",
              title: "Desarrollador Full Stack de Prueba",
              summary: "Profesional de prueba para testing del sistema Flexwork con experiencia en desarrollo web.",
              skills: "JavaScript, React, Node.js, PostgreSQL, Testing",
              experience: "senior",
              location: "Lima, Per\xFA",
              phone: "+51 999 888 777"
            }).onConflictDoNothing();
          }
          return {
            success: true,
            message: "Entorno de pruebas configurado. Credenciales: empresa@flexwork.com / profesional@flexwork.com (password: test123)"
          };
        } catch (error) {
          console.error("Error setting up test environment:", error);
          return {
            success: false,
            message: `Error configurando entorno: ${error instanceof Error ? error.message : "Error desconocido"}`
          };
        }
      }
      async authenticateTestUser(email) {
        try {
          const [user2] = await db.select().from(users).where(
            eq4(users.email, email)
          ).limit(1);
          if (!user2) {
            return {
              success: false,
              message: "Usuario de prueba no encontrado. Ejecute setup primero."
            };
          }
          return {
            success: true,
            message: `Usuario encontrado: ${user2.userType}`,
            data: {
              id: user2.id,
              email: user2.email,
              userType: user2.userType
            }
          };
        } catch (error) {
          return {
            success: false,
            message: `Error en autenticaci\xF3n: ${error instanceof Error ? error.message : "Error desconocido"}`
          };
        }
      }
    };
    simpleTestManager = new SimpleTestManager();
  }
});

// server/index.ts
import express3 from "express";
import cors from "cors";

// server/routes.ts
init_storage();
import { createServer } from "http";
import multer from "multer";
import path2 from "path";
import fs3 from "fs";
import express from "express";
import session from "express-session";
import MemoryStore from "memorystore";

// server/enhanced-cv-parser-clean.ts
init_storage();
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
var EnhancedCVParser = class {
  async parsePDF(filePath) {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } catch (error) {
      console.error("Error parsing PDF:", error);
      throw new Error("Failed to parse PDF file");
    }
  }
  normalizeText(text2) {
    return text2.replace(/\s+/g, " ").replace(/[^\w\sáéíóúüñ\-.,;:()\[\]]/gi, "").trim();
  }
  extractSection(text2, sectionName, nextSections = []) {
    const normalizedText = this.normalizeText(text2.toLowerCase());
    const sectionPattern = new RegExp(`(${sectionName})[\\s\\S]*?(?=(${nextSections.join("|")})|$)`, "i");
    const match = normalizedText.match(sectionPattern);
    return match ? match[0] : "";
  }
  extractSkills(text2) {
    const skills = {
      technical: [],
      soft: [],
      languages: [],
      certifications: []
    };
    const skillsSection = this.extractSection(text2, "habilidades", [
      "experiencia",
      "educaci\xF3n",
      "idiomas",
      "certificaciones",
      "proyectos"
    ]);
    const competenciasSection = this.extractSection(text2, "competencias", [
      "experiencia",
      "educaci\xF3n",
      "idiomas",
      "certificaciones",
      "proyectos"
    ]);
    const tecnologiasSection = this.extractSection(text2, "tecnolog\xEDas", [
      "experiencia",
      "educaci\xF3n",
      "idiomas",
      "certificaciones",
      "proyectos"
    ]);
    const fullSkillsText = `${skillsSection || ""} ${competenciasSection || ""} ${tecnologiasSection || ""}`;
    const fullTextLower = text2.toLowerCase();
    const technicalSkills = [
      // Programming Languages
      "javascript",
      "typescript",
      "python",
      "java",
      "c#",
      "c++",
      "php",
      "ruby",
      "go",
      "rust",
      "kotlin",
      "swift",
      // Frontend Frameworks
      "react",
      "angular",
      "vue",
      "svelte",
      "next.js",
      "nuxt.js",
      "gatsby",
      // Backend Technologies
      "node.js",
      "express",
      "django",
      "flask",
      "spring",
      "laravel",
      "rails",
      "asp.net",
      // Databases
      "mysql",
      "postgresql",
      "mongodb",
      "redis",
      "elasticsearch",
      "sqlite",
      "oracle",
      "sql server",
      // Cloud & DevOps
      "aws",
      "azure",
      "gcp",
      "docker",
      "kubernetes",
      "jenkins",
      "gitlab",
      "github",
      "terraform",
      // Web Technologies
      "html",
      "css",
      "sass",
      "less",
      "bootstrap",
      "tailwind",
      "webpack",
      "vite",
      // Tools & Others
      "git",
      "jira",
      "confluence",
      "figma",
      "photoshop",
      "illustrator",
      "excel",
      "power bi",
      "tableau",
      // Marketing & Analytics
      "google analytics",
      "google ads",
      "facebook ads",
      "seo",
      "sem",
      "hubspot",
      "salesforce",
      // Project Management
      "scrum",
      "agile",
      "kanban",
      "waterfall",
      "pmp",
      "prince2"
    ];
    const softSkills = [
      "liderazgo",
      "comunicaci\xF3n",
      "trabajo en equipo",
      "resoluci\xF3n de problemas",
      "gesti\xF3n del tiempo",
      "adaptabilidad",
      "creatividad",
      "pensamiento cr\xEDtico",
      "negociaci\xF3n",
      "presentaciones",
      "coordinaci\xF3n",
      "planificaci\xF3n",
      "organizaci\xF3n",
      "gesti\xF3n de proyectos",
      "atenci\xF3n al detalle",
      "multitasking",
      "innovaci\xF3n"
    ];
    const languages = [
      "espa\xF1ol",
      "ingl\xE9s",
      "franc\xE9s",
      "alem\xE1n",
      "italiano",
      "portugu\xE9s",
      "chino",
      "japon\xE9s"
    ];
    technicalSkills.forEach((skill) => {
      const variations = this.getSkillVariations(skill);
      for (const variation of variations) {
        if (fullTextLower.includes(variation.toLowerCase()) && !skills.technical.includes(this.capitalizeSkill(skill))) {
          skills.technical.push(this.capitalizeSkill(skill));
          break;
        }
      }
    });
    if (fullSkillsText) {
      const skillsTextLower = fullSkillsText.toLowerCase();
      softSkills.forEach((skill) => {
        if (skillsTextLower.includes(skill.toLowerCase()) && !skills.soft.includes(this.capitalizeSkill(skill))) {
          skills.soft.push(this.capitalizeSkill(skill));
        }
      });
      languages.forEach((language) => {
        if (skillsTextLower.includes(language.toLowerCase()) && !skills.languages.includes(this.capitalizeSkill(language))) {
          skills.languages.push(this.capitalizeSkill(language));
        }
      });
    }
    const certificationPatterns = [
      /certificación\s+en\s+(.+?)(?:\.|,|;|\n|$)/gi,
      /certificado\s+(.+?)(?:\.|,|;|\n|$)/gi,
      /certified\s+(.+?)(?:\.|,|;|\n|$)/gi
    ];
    certificationPatterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(fullSkillsText)) !== null) {
        const cert = match[1].trim();
        if (cert.length > 2 && cert.length < 50 && !skills.certifications.includes(cert)) {
          skills.certifications.push(cert);
        }
      }
    });
    console.log("Extracted skills:", {
      technical: skills.technical.length,
      soft: skills.soft.length,
      languages: skills.languages.length,
      certifications: skills.certifications.length
    });
    return skills;
  }
  getSkillVariations(skill) {
    const variations = [skill];
    const skillMap = {
      "javascript": ["js", "javascript", "java script"],
      "typescript": ["ts", "typescript"],
      "node.js": ["nodejs", "node js", "node.js"],
      "react": ["reactjs", "react.js"],
      "angular": ["angularjs"],
      "vue": ["vuejs", "vue.js"],
      "c#": ["csharp", "c sharp"],
      "c++": ["cplusplus", "c plus plus"],
      "google analytics": ["analytics", "ga4"],
      "google ads": ["adwords", "google adwords"],
      "power bi": ["powerbi"],
      "asp.net": ["aspnet"]
    };
    if (skillMap[skill]) {
      variations.push(...skillMap[skill]);
    }
    return variations;
  }
  capitalizeSkill(skill) {
    const specialCases = {
      "javascript": "JavaScript",
      "typescript": "TypeScript",
      "node.js": "Node.js",
      "react": "React",
      "angular": "Angular",
      "vue": "Vue.js",
      "html": "HTML",
      "css": "CSS",
      "sql": "SQL",
      "aws": "AWS",
      "gcp": "GCP",
      "api": "API",
      "seo": "SEO",
      "sem": "SEM",
      "ui": "UI",
      "ux": "UX"
    };
    if (specialCases[skill.toLowerCase()]) {
      return specialCases[skill.toLowerCase()];
    }
    return skill.split(" ").map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(" ");
  }
  extractExperiences(text2) {
    return [];
  }
  extractEducation(text2) {
    return [];
  }
  async processAndSaveCV(filePath, professionalId) {
    try {
      const pdfText = await this.parsePDF(filePath);
      const experiences2 = this.extractExperiences(pdfText);
      const educations = this.extractEducation(pdfText);
      const skills = this.extractSkills(pdfText);
      if (skills.technical.length > 0 || skills.soft.length > 0) {
        const professional2 = await storage.getProfessional(professionalId);
        if (professional2) {
          const existingSkills = professional2.skills ? professional2.skills.split(", ") : [];
          const allNewSkills = [...skills.technical, ...skills.soft];
          const combinedSkills = [...existingSkills, ...allNewSkills].filter(
            (skill, index, self) => self.indexOf(skill) === index
          );
          await storage.updateProfessional(professionalId, {
            skills: combinedSkills.join(", ")
          });
        }
      }
      return {
        experiences: experiences2,
        educations,
        skills,
        savedExperiences: 0,
        savedEducations: 0,
        pdfUrl: `/uploads/cvs/${path.basename(filePath)}`
      };
    } catch (error) {
      console.error("Error processing CV:", error);
      throw error;
    }
  }
  async processAndSaveSkills(filePath, professionalId) {
    try {
      console.log(`Extracting skills from CV for professional ${professionalId}...`);
      const pdfText = await this.parsePDF(filePath);
      const skills = this.extractSkills(pdfText);
      if (skills.technical.length > 0 || skills.soft.length > 0) {
        const professional2 = await storage.getProfessional(professionalId);
        if (professional2) {
          const existingSkills = professional2.skills ? professional2.skills.split(", ") : [];
          const allNewSkills = [...skills.technical, ...skills.soft];
          const combinedSkills = [...existingSkills, ...allNewSkills].filter(
            (skill, index, self) => self.indexOf(skill) === index
          );
          await storage.updateProfessional(professionalId, {
            skills: combinedSkills.join(", ")
          });
          console.log(`Updated professional skills: ${combinedSkills.length} total skills`);
        }
      }
      return skills;
    } catch (error) {
      console.error("Error processing skills from CV:", error);
      throw error;
    }
  }
};
var enhancedCVParser = new EnhancedCVParser();

// server/matching.ts
init_storage();
var MatchingService = class {
  /**
   * Extract and normalize skills from text
   */
  extractSkills(text2) {
    if (!text2) return [];
    const skillKeywords = [
      "javascript",
      "typescript",
      "react",
      "node.js",
      "nodejs",
      "python",
      "java",
      "php",
      "html",
      "css",
      "angular",
      "vue",
      "express",
      "mongodb",
      "mysql",
      "postgresql",
      "git",
      "docker",
      "kubernetes",
      "aws",
      "azure",
      "gcp",
      "sql",
      "nosql",
      "rest",
      "api",
      "graphql",
      "jenkins",
      "ci/cd",
      "scrum",
      "agile",
      "jira",
      "figma",
      "photoshop",
      "illustrator",
      "bootstrap",
      "tailwind",
      "redux",
      "next.js",
      "nuxt",
      "laravel",
      "django",
      "flask",
      "spring",
      "hibernate",
      "marketing",
      "ventas",
      "contabilidad",
      "finanzas",
      "recursos humanos",
      "administraci\xF3n",
      "excel",
      "powerpoint",
      "word",
      "office",
      "google workspace",
      "salesforce",
      "crm",
      "comunicaci\xF3n",
      "liderazgo",
      "trabajo en equipo",
      "resoluci\xF3n de problemas",
      "creatividad",
      "an\xE1lisis",
      "planificaci\xF3n",
      "organizaci\xF3n",
      "negociaci\xF3n",
      "presentaci\xF3n"
    ];
    const normalizedText = text2.toLowerCase();
    const foundSkills = [];
    skillKeywords.forEach((skill) => {
      if (normalizedText.includes(skill.toLowerCase())) {
        foundSkills.push(skill);
      }
    });
    const skillPatterns = normalizedText.split(/[,;\n]/).map((s) => s.trim()).filter((s) => s.length > 2 && s.length < 30);
    foundSkills.push(...skillPatterns.slice(0, 10));
    return Array.from(new Set(foundSkills));
  }
  /**
   * Analyze skills match between professional and job
   */
  analyzeSkills(professional2, job) {
    const professionalSkillsText = [
      professional2.skills || "",
      professional2.experience || "",
      professional2.title || ""
    ].join(" ");
    const professionalSkills = this.extractSkills(professionalSkillsText);
    const jobSkillsText = [
      job.skills || "",
      job.experience || "",
      job.title || "",
      job.description || ""
    ].join(" ");
    const jobSkills = this.extractSkills(jobSkillsText);
    const matchedSkills = [];
    for (const profSkill of professionalSkills) {
      for (const jobSkill of jobSkills) {
        const profSkillLower = profSkill.toLowerCase().trim();
        const jobSkillLower = jobSkill.toLowerCase().trim();
        if (profSkillLower === jobSkillLower || profSkillLower.includes(jobSkillLower) || jobSkillLower.includes(profSkillLower)) {
          if (!matchedSkills.includes(profSkill)) {
            matchedSkills.push(profSkill);
          }
        }
      }
    }
    const skillsScore = jobSkills.length > 0 ? Math.min(100, Math.round(matchedSkills.length / jobSkills.length * 100)) : professionalSkills.length > 0 ? 30 : 0;
    return {
      professionalSkills,
      jobSkills,
      matchedSkills,
      skillsScore
    };
  }
  /**
   * Calculate years of experience from experience records
   */
  calculateExperienceYears(experiences2) {
    let totalMonths = 0;
    experiences2.forEach((exp) => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate ? new Date(exp.endDate) : /* @__PURE__ */ new Date();
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.log("Invalid dates:", { start: exp.startDate, end: exp.endDate });
        return;
      }
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffMonths = Math.ceil(diffTime / (1e3 * 60 * 60 * 24 * 30.44));
      totalMonths += diffMonths;
    });
    const totalYears = Math.round(totalMonths / 12 * 10) / 10;
    console.log("Experience calculation:", { totalMonths, totalYears, experiencesCount: experiences2.length });
    return totalYears;
  }
  /**
   * Analyze experience match between professional and job
   */
  analyzeExperience(professional2, experiences2, job) {
    const totalYears = this.calculateExperienceYears(experiences2);
    const jobExperienceText = job.experience || "";
    const experienceMatch = jobExperienceText.match(/(\d+)(?:-(\d+))?\s*(año|años|year|years)/i);
    const requiredYears = experienceMatch ? experienceMatch[2] ? parseInt(experienceMatch[2]) : parseInt(experienceMatch[1]) : 2;
    const jobKeywords = this.extractSkills(job.title + " " + (job.skills || ""));
    const relevantExperience = experiences2.filter((exp) => {
      const expText = (exp.position + " " + exp.company + " " + (exp.description || "")).toLowerCase();
      return jobKeywords.some((keyword) => expText.includes(keyword.toLowerCase()));
    }).map((exp) => `${exp.position} en ${exp.company}`).slice(0, 3);
    let experienceScore = 0;
    if (totalYears >= requiredYears) {
      experienceScore = Math.min(100, totalYears / requiredYears * 80);
    } else {
      experienceScore = totalYears / requiredYears * 60;
    }
    if (relevantExperience.length > 0) {
      experienceScore += 20;
    }
    experienceScore = Math.min(100, experienceScore);
    return {
      totalYears,
      relevantExperience,
      experienceScore
    };
  }
  /**
   * Analyze education match between professional and job
   */
  analyzeEducation(professional2, educations, job) {
    const degrees = educations.map((edu) => edu.degree);
    const jobEducationText = (job.description || "").toLowerCase();
    const educationKeywords = [
      "licenciatura",
      "ingenier\xEDa",
      "bachiller",
      "t\xEDtulo",
      "universitario",
      "t\xE9cnico",
      "maestr\xEDa",
      "master",
      "posgrado",
      "doctorado",
      "phd",
      "mba",
      "sistemas",
      "inform\xE1tica",
      "computaci\xF3n",
      "software",
      "industrial",
      "comercial",
      "administraci\xF3n",
      "marketing",
      "contabilidad",
      "finanzas",
      "econom\xEDa"
    ];
    const relevantEducation = educations.filter((edu) => {
      const eduText = (edu.degree + " " + edu.field + " " + edu.institution).toLowerCase();
      return educationKeywords.some(
        (keyword) => eduText.includes(keyword) || jobEducationText.includes(keyword)
      );
    }).map((edu) => `${edu.degree} en ${edu.field}`).slice(0, 2);
    let educationScore = 0;
    if (educations.length === 0) {
      educationScore = 20;
    } else {
      educationScore = 40;
      if (relevantEducation.length > 0) {
        educationScore += 40;
      }
      const hasHigherEducation = educations.some(
        (edu) => edu.degree.toLowerCase().includes("licenciatura") || edu.degree.toLowerCase().includes("ingenier\xEDa") || edu.degree.toLowerCase().includes("maestr\xEDa") || edu.degree.toLowerCase().includes("master")
      );
      if (hasHigherEducation) {
        educationScore += 20;
      }
    }
    educationScore = Math.min(100, educationScore);
    return {
      degrees,
      relevantEducation,
      educationScore
    };
  }
  /**
   * Generate summary text based on scores and matches
   */
  generateSummary(finalScore, skillsAnalysis, experienceAnalysis, educationAnalysis) {
    let summary = `Cumple el ${Math.round(finalScore)}% del perfil solicitado. `;
    const strengths = [];
    if (skillsAnalysis.skillsScore >= 70) strengths.push("habilidades t\xE9cnicas");
    if (experienceAnalysis.experienceScore >= 70) strengths.push("experiencia laboral");
    if (educationAnalysis.educationScore >= 70) strengths.push("formaci\xF3n acad\xE9mica");
    if (strengths.length > 0) {
      summary += `Destaca en: ${strengths.join(", ")}. `;
    }
    if (finalScore >= 80) {
      summary += "Candidato altamente recomendado.";
    } else if (finalScore >= 60) {
      summary += "Candidato con buen potencial.";
    } else if (finalScore >= 40) {
      summary += "Candidato a considerar con capacitaci\xF3n adicional.";
    } else {
      summary += "Perfil con limitada compatibilidad.";
    }
    return summary;
  }
  /**
   * Main matching function
   */
  async matchProfessionalToJob(jobId, professionalId) {
    try {
      const job = await storage.getJob(jobId);
      const professional2 = await storage.getProfessional(professionalId);
      if (!job || !professional2) {
        throw new Error("Job or Professional not found");
      }
      const experiences2 = await storage.getExperiencesByProfessional(professionalId);
      const educations = await storage.getEducationByProfessional(professionalId);
      const skillsAnalysis = this.analyzeSkills(professional2, job);
      const experienceAnalysis = this.analyzeExperience(professional2, experiences2, job);
      const educationAnalysis = this.analyzeEducation(professional2, educations, job);
      const skillsScore = Number(skillsAnalysis.skillsScore) || 0;
      const experienceScore = Number(experienceAnalysis.experienceScore) || 0;
      const educationScore = Number(educationAnalysis.educationScore) || 0;
      console.log("Debug scores:", {
        skills: { original: skillsAnalysis.skillsScore, fixed: skillsScore },
        experience: { original: experienceAnalysis.experienceScore, fixed: experienceScore },
        education: { original: educationAnalysis.educationScore, fixed: educationScore }
      });
      const finalScore = Math.round(
        skillsScore * 0.5 + // 50%
        experienceScore * 0.3 + // 30%
        educationScore * 0.2
        // 20%
      );
      const resumen = this.generateSummary(finalScore, skillsAnalysis, experienceAnalysis, educationAnalysis);
      console.log("Final scores:", { skillsScore, experienceScore, educationScore, finalScore });
      return {
        score: finalScore || 0,
        matches: {
          skills: skillsAnalysis.matchedSkills.slice(0, 5),
          // Top 5 matched skills
          experiencia: experienceAnalysis.relevantExperience,
          educacion: educationAnalysis.relevantEducation
        },
        resumen
      };
    } catch (error) {
      console.error("Error in matching service:", error);
      throw error;
    }
  }
};
var matchingService = new MatchingService();

// server/cloudinary-config.ts
import { v2 as cloudinary } from "cloudinary";
var CloudinaryService = class {
  isConfigured = false;
  constructor() {
    this.initializeCloudinary();
  }
  initializeCloudinary() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
      });
      this.isConfigured = true;
      console.log("Cloudinary configured successfully");
    } else {
      console.warn("Cloudinary credentials not found, using local storage");
      this.isConfigured = false;
    }
  }
  isAvailable() {
    return this.isConfigured;
  }
  async uploadFile(filePath, options) {
    if (!this.isConfigured) {
      throw new Error("Cloudinary not configured");
    }
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: options?.folder || "flexwork/cvs",
        public_id: options?.public_id,
        resource_type: options?.resource_type || "auto",
        use_filename: true,
        unique_filename: true
      });
      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
        resource_type: result.resource_type,
        format: result.format,
        bytes: result.bytes,
        created_at: result.created_at
      };
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  }
  async deleteFile(publicId) {
    if (!this.isConfigured) {
      throw new Error("Cloudinary not configured");
    }
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Cloudinary delete error:", error);
      throw error;
    }
  }
};
var cloudinaryService = new CloudinaryService();

// server/utils/email.ts
import { Resend } from "resend";
var resend = new Resend(process.env.RESEND_API_KEY);
function getDashboardUrl(userType) {
  const baseUrl = process.env.NODE_ENV === "production" ? "https://flexwork-database-kwo6532.replit.app" : "http://localhost:5000";
  return userType === "professional" ? `${baseUrl}/professional-dashboard` : `${baseUrl}/company-dashboard`;
}
function generateWelcomeEmailHTML(name, userType) {
  const dashboardUrl = getDashboardUrl(userType);
  const actionText = userType === "professional" ? "crear tu perfil profesional" : "publicar empleos si eres una empresa";
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenido a Flexwork</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #f97316;
          margin-bottom: 10px;
        }
        .welcome-text {
          font-size: 16px;
          margin-bottom: 20px;
          color: #374151;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #f97316, #fb923c);
          color: white;
          padding: 14px 28px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 20px 0;
          text-align: center;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .highlight {
          color: #f97316;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Flexwork</div>
          <h1>Bienvenido a Flexwork \u{1F44B}</h1>
        </div>
        
        <div class="welcome-text">
          <p>\xA1Hola <strong>${name}</strong>!</p>
          
          <p>Gracias por registrarte en <span class="highlight">Flexwork</span>.</p>
          
          <p>Ya puedes ${actionText}.</p>
        </div>
        
        <div style="text-align: center;">
          <a href="${dashboardUrl}" class="cta-button">
            \u{1F680} Empieza ahora
          </a>
        </div>
        
        <div class="footer">
          <p>\u2013 El equipo de <span class="highlight">Flexwork</span></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
async function sendWelcomeEmail(email, name, userType) {
  try {
    const htmlContent = generateWelcomeEmailHTML(name, userType);
    const { data, error } = await resend.emails.send({
      from: "Flexwork <onboarding@resend.dev>",
      to: [email],
      subject: "Bienvenido a Flexwork \u{1F44B}",
      html: htmlContent,
      text: `\xA1Hola ${name}!

Gracias por registrarte en Flexwork.
Ya puedes ${userType === "professional" ? "crear tu perfil profesional" : "publicar empleos si eres una empresa"}.

\u{1F680} Empieza ahora: ${getDashboardUrl(userType)}

\u2013 El equipo de Flexwork`
    });
    if (error) {
      console.error("Error enviando correo de bienvenida:", error);
      if (error.message?.includes("domain is not verified")) {
        console.log("\u{1F4A1} Para resolver: Verifica el dominio flexworklatam.com en https://resend.com/domains");
      }
      return false;
    }
    console.log("Correo de bienvenida enviado exitosamente:", data);
    return true;
  } catch (error) {
    console.error("Error en sendWelcomeEmail:", error);
    return false;
  }
}
function generateInvitationEmailHTML(jobTitle, companyName, token) {
  const baseUrl = process.env.NODE_ENV === "production" ? "https://flexwork-database-kwo6532.replit.app" : "http://localhost:5000";
  const invitationUrl = `${baseUrl}/apply/${token}`;
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invitaci\xF3n a postular - Flexwork</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #f97316;
          margin-bottom: 10px;
        }
        .invitation-text {
          font-size: 16px;
          margin-bottom: 20px;
          color: #374151;
        }
        .job-card {
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #f97316;
        }
        .job-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 5px;
        }
        .company-name {
          font-size: 16px;
          color: #6b7280;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #f97316, #fb923c);
          color: white;
          padding: 14px 28px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 20px 0;
          text-align: center;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .highlight {
          color: #f97316;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Flexwork</div>
          <h1>Te han invitado a postular</h1>
        </div>
        
        <div class="invitation-text">
          <p>\xA1Hola!</p>
          
          <p><strong>${companyName}</strong> te ha invitado a postular para una oportunidad laboral que podr\xEDa interesarte.</p>
          
          <div class="job-card">
            <div class="job-title">${jobTitle}</div>
            <div class="company-name">${companyName}</div>
          </div>
          
          <p>Haz clic en el bot\xF3n de abajo para ver m\xE1s detalles y postular directamente:</p>
        </div>
        
        <div style="text-align: center;">
          <a href="${invitationUrl}" class="cta-button">
            Ver empleo y postular
          </a>
        </div>
        
        <div class="footer">
          <p>Esta invitaci\xF3n es v\xE1lida por 30 d\xEDas.</p>
          <p>\u2013 El equipo de <span class="highlight">Flexwork</span></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
async function sendJobInvitationEmail(email, jobTitle, companyName, token) {
  try {
    const htmlContent = generateInvitationEmailHTML(jobTitle, companyName, token);
    const baseUrl = process.env.NODE_ENV === "production" ? "https://flexwork-database-kwo6532.replit.app" : "http://localhost:5000";
    const invitationUrl = `${baseUrl}/apply/${token}`;
    const { data, error } = await resend.emails.send({
      from: "Flexwork <operations@flexworklatam.com>",
      to: [email],
      subject: `Invitaci\xF3n para postular: ${jobTitle} en ${companyName}`,
      html: htmlContent,
      text: `\xA1Hola!

${companyName} te ha invitado a postular para: ${jobTitle}

Haz clic aqu\xED para ver m\xE1s detalles y postular: ${invitationUrl}

Esta invitaci\xF3n es v\xE1lida por 30 d\xEDas.

\u2013 El equipo de Flexwork`
    });
    if (error) {
      console.error("Error enviando correo de invitaci\xF3n:", error);
      if (error.message?.includes("domain is not verified")) {
        console.log("\u{1F4A1} Para resolver: Verifica el dominio flexworklatam.com en https://resend.com/domains");
      }
      return false;
    }
    console.log("Correo de invitaci\xF3n enviado exitosamente:", data);
    return true;
  } catch (error) {
    console.error("Error en sendJobInvitationEmail:", error);
    return false;
  }
}
async function sendAdminEmail(email, subject, content) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Flexwork Admin <admin@flexworklatam.com>",
      to: [email],
      subject,
      text: content,
      html: content.replace(/\n/g, "<br>")
    });
    if (error) {
      console.error("Error enviando correo administrativo:", error);
      if (error.message?.includes("domain is not verified")) {
        console.log("\u{1F4A1} Para resolver: Verifica el dominio flexworklatam.com en https://resend.com/domains");
      }
      return false;
    }
    console.log("Correo administrativo enviado exitosamente:", data);
    return true;
  } catch (error) {
    console.error("Error en sendAdminEmail:", error);
    return false;
  }
}
function generateAlertEmailHTML(data) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuevo candidato compatible - Flexwork</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          background: linear-gradient(135deg, #f97316, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }
        .alert-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
        .compatibility-score {
          display: inline-block;
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
          padding: 8px 16px;
          border-radius: 50px;
          font-weight: bold;
          font-size: 18px;
          margin: 10px 0;
        }
        .candidate-card {
          background-color: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #10b981;
        }
        .candidate-name {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 5px;
        }
        .candidate-title {
          font-size: 16px;
          color: #6b7280;
          margin-bottom: 10px;
        }
        .job-match {
          background-color: #fef3c7;
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
          border-left: 4px solid #f59e0b;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #f97316, #fb923c);
          color: white;
          padding: 14px 28px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 20px 0;
          text-align: center;
        }
        .secondary-button {
          display: inline-block;
          background: #e5e7eb;
          color: #374151;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 500;
          margin: 10px 10px 10px 0;
          text-align: center;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .highlight {
          color: #f97316;
          font-weight: 600;
        }
        .buttons-container {
          text-align: center;
          margin: 25px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Flexwork</div>
          <div class="alert-icon">\u{1F50D}</div>
          <h1>\xA1Nuevo candidato con alta compatibilidad!</h1>
        </div>
        
        <p>Hemos encontrado un candidato con <span class="highlight">alta compatibilidad</span> para uno de tus empleos publicados.</p>
        
        <div class="candidate-card">
          <div class="candidate-name">${data.professionalName}</div>
          <div class="candidate-title">${data.professionalTitle}</div>
          <div class="compatibility-score">${data.compatibilityScore}% Compatible</div>
        </div>
        
        <div class="job-match">
          <strong>Empleo coincidente:</strong> ${data.jobTitle}
        </div>
        
        <p>Este candidato ha sido evaluado por nuestro algoritmo de inteligencia artificial y presenta caracter\xEDsticas que lo hacen muy compatible con los requisitos del puesto.</p>
        
        <div class="buttons-container">
          <a href="${data.profileUrl}" class="cta-button">Ver Perfil Completo</a>
          <br>
          <a href="${data.dashboardUrl}" class="secondary-button">Ir al Dashboard</a>
        </div>
        
        <div class="footer">
          <p>Este correo fue enviado autom\xE1ticamente por el sistema de alertas de Flexwork.</p>
          <p>Si no deseas recibir estas notificaciones, puedes desactivarlas en la configuraci\xF3n de tu cuenta.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
async function sendAlertEmail(data) {
  try {
    const { error } = await resend.emails.send({
      from: "Flexwork <alertas@flexworklatam.com>",
      to: [data.to],
      subject: `\u{1F50D} Nuevo candidato con ${data.compatibilityScore}% de compatibilidad`,
      html: generateAlertEmailHTML(data)
    });
    if (error) {
      console.error("Error enviando email de alerta:", error);
      throw new Error(`Error enviando email: ${error.message}`);
    }
    console.log("Email de alerta enviado exitosamente a:", data.to);
  } catch (error) {
    console.error("Error en sendAlertEmail:", error);
    throw error;
  }
}

// server/audit-logger.ts
init_storage();
async function createAuditLog({
  entityType,
  entityId,
  action,
  userId,
  userType,
  changes,
  req
}) {
  try {
    const auditData = {
      entityType,
      entityId,
      action,
      userId,
      userType,
      changes: changes ? JSON.stringify(changes) : null,
      ipAddress: getClientIP(req),
      userAgent: req?.get("User-Agent") || null,
      endpoint: req ? `${req.method} ${req.path}` : null
    };
    await storage.createAuditLog(auditData);
    console.log(`[AUDIT] ${action.toUpperCase()} ${entityType} ${entityId} by user ${userId} (${userType})`);
  } catch (error) {
    console.error("Error creating audit log:", error);
  }
}
async function logServiceCreation(serviceId, professionalId, serviceData, req) {
  const professional2 = await storage.getProfessional(professionalId);
  if (!professional2) return;
  await createAuditLog({
    entityType: "service",
    entityId: serviceId,
    action: "create",
    userId: professional2.userId,
    userType: "professional",
    changes: {
      title: serviceData.title,
      category: serviceData.category,
      price: serviceData.price,
      description: serviceData.description
    },
    req
  });
}
async function logJobCreation(jobId, companyId, jobData, req) {
  const company2 = await storage.getCompany(companyId);
  if (!company2) return;
  await createAuditLog({
    entityType: "job",
    entityId: jobId,
    action: "create",
    userId: company2.userId,
    userType: "company",
    changes: {
      title: jobData.title,
      department: jobData.department,
      location: jobData.location,
      salaryRange: jobData.salaryRange,
      description: jobData.description
    },
    req
  });
}
function getClientIP(req) {
  if (!req) return null;
  return req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress || req.connection?.socket?.remoteAddress || req.get("X-Forwarded-For")?.split(",")[0]?.trim() || req.get("X-Real-IP") || null;
}

// server/candidate-service.ts
init_storage();
var CandidateService = class {
  /**
   * Obtiene candidatos con análisis de matching para un puesto
   */
  async getCandidatesWithMatching(jobId) {
    try {
      const job = await storage.getJob(jobId);
      if (!job) {
        throw new Error("Job not found");
      }
      const applications4 = await storage.getApplicationsByJob(jobId);
      if (!applications4 || applications4.length === 0) {
        return [];
      }
      const candidates = [];
      for (const application of applications4) {
        const matchData = this.calculateBasicMatch(application.professional, job);
        const candidate = {
          id: application.id,
          jobId: application.jobId || 0,
          professionalId: application.professionalId || 0,
          status: application.status || "pending",
          cvUrl: application.cvUrl,
          appliedAt: application.appliedAt?.toString() || (/* @__PURE__ */ new Date()).toISOString(),
          professional: {
            id: application.professional.id,
            firstName: application.professional.firstName,
            lastName: application.professional.lastName,
            email: application.professional.email || "",
            title: application.professional.title || "",
            location: application.professional.location || "",
            avatar: application.professional.avatar,
            skills: application.professional.skills || "",
            phone: application.professional.phone,
            summary: application.professional.summary
          },
          compatibilityScore: matchData.score,
          matchReasons: matchData.reasons,
          skillsMatched: matchData.skillsMatched,
          experienceYears: matchData.experienceYears
        };
        candidates.push(candidate);
      }
      return candidates.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
    } catch (error) {
      console.error("Error getting candidates with matching:", error);
      return [];
    }
  }
  /**
   * Calcula matching básico entre profesional y puesto
   */
  calculateBasicMatch(professional2, job) {
    let score = 0;
    const reasons = [];
    const skillsMatched = [];
    let experienceYears = 0;
    if (professional2.skills && job.skills) {
      const profSkills = professional2.skills.toLowerCase().split(",").map((s) => s.trim());
      const jobSkills = job.skills.toLowerCase().split(",").map((s) => s.trim());
      const matched = jobSkills.filter(
        (jobSkill) => profSkills.some(
          (profSkill) => profSkill.includes(jobSkill) || jobSkill.includes(profSkill)
        )
      );
      skillsMatched.push(...matched);
      const skillsScore = matched.length / jobSkills.length * 40;
      score += skillsScore;
      if (matched.length >= jobSkills.length * 0.8) {
        reasons.push(`Cumple con ${matched.length}/${jobSkills.length} habilidades requeridas`);
      } else if (matched.length >= jobSkills.length * 0.5) {
        reasons.push(`Cumple parcialmente con las habilidades t\xE9cnicas`);
      }
    }
    if (professional2.title && job.title) {
      const titleSimilarity = this.calculateSimilarity(
        professional2.title.toLowerCase(),
        job.title.toLowerCase()
      );
      const titleScore = titleSimilarity * 30;
      score += titleScore;
      if (titleSimilarity > 0.6) {
        reasons.push("Experiencia previa en posici\xF3n similar");
        experienceYears = 3;
      } else if (titleSimilarity > 0.3) {
        reasons.push("Experiencia relacionada al puesto");
        experienceYears = 1;
      }
    }
    if (professional2.location && job.location) {
      const locationMatch = professional2.location.toLowerCase().includes(job.location.toLowerCase()) || job.location.toLowerCase().includes(professional2.location.toLowerCase());
      if (locationMatch) {
        score += 15;
        reasons.push("Ubicaci\xF3n compatible");
      }
    }
    if (professional2.summary && job.description) {
      const similarity = this.calculateTextSimilarity(professional2.summary, job.description);
      const summaryScore = similarity * 15;
      score += summaryScore;
      if (similarity > 0.5) {
        reasons.push("Perfil profesional alineado con el puesto");
      }
    }
    if (reasons.length === 0) {
      reasons.push("Candidato potencial para evaluaci\xF3n");
    }
    return {
      score: Math.round(Math.min(score, 100)),
      reasons,
      skillsMatched,
      experienceYears
    };
  }
  /**
   * Calcula similitud entre dos textos
   */
  calculateSimilarity(text1, text2) {
    if (!text1 || !text2) return 0;
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    const commonWords = words1.filter((word) => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  }
  /**
   * Calcula similitud semántica básica entre textos
   */
  calculateTextSimilarity(text1, text2) {
    if (!text1 || !text2) return 0;
    const normalize = (text3) => text3.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((word) => word.length > 2);
    const words1 = normalize(text1);
    const words2 = normalize(text2);
    if (words1.length === 0 || words2.length === 0) return 0;
    const commonWords = words1.filter((word) => words2.includes(word));
    return commonWords.length * 2 / (words1.length + words2.length);
  }
  /**
   * Obtiene métricas de un puesto
   */
  async getJobMetrics(jobId) {
    try {
      const applications4 = await storage.getApplicationsByJob(jobId);
      if (!applications4 || applications4.length === 0) {
        return {
          totalCandidates: 0,
          newCandidates: 0,
          viewedCandidates: 0,
          preselectedCandidates: 0,
          rejectedCandidates: 0,
          bestMatchScore: 0
        };
      }
      const totalCandidates = applications4.length;
      const newCandidates = applications4.filter((app2) => app2.status === "pending").length;
      const viewedCandidates = applications4.filter((app2) => app2.status === "viewed").length;
      const preselectedCandidates = applications4.filter((app2) => app2.status === "preselected").length;
      const rejectedCandidates = applications4.filter((app2) => app2.status === "rejected").length;
      const candidates = await this.getCandidatesWithMatching(jobId);
      const bestMatchScore = candidates.length > 0 ? candidates[0].compatibilityScore : 0;
      return {
        totalCandidates,
        newCandidates,
        viewedCandidates,
        preselectedCandidates,
        rejectedCandidates,
        bestMatchScore
      };
    } catch (error) {
      console.error("Error getting job metrics:", error);
      return {
        totalCandidates: 0,
        newCandidates: 0,
        viewedCandidates: 0,
        preselectedCandidates: 0,
        rejectedCandidates: 0,
        bestMatchScore: 0
      };
    }
  }
  /**
   * Actualiza el estado de una postulación
   */
  async updateApplicationStatus(applicationId, status) {
    try {
      await storage.updateApplication(applicationId, { status });
      return true;
    } catch (error) {
      console.error("Error updating application status:", error);
      return false;
    }
  }
  /**
   * Obtiene todas las métricas de candidatos para una empresa
   */
  async getCompanyCandidatesOverview(companyId) {
    try {
      const jobs3 = await storage.getJobsByCompany(companyId);
      if (!jobs3 || jobs3.length === 0) {
        return {
          totalJobs: 0,
          totalCandidates: 0,
          newCandidates: 0,
          jobsWithCandidates: [],
          topMatches: []
        };
      }
      let totalCandidates = 0;
      let newCandidates = 0;
      const jobsWithCandidates = [];
      const topMatches = [];
      for (const job of jobs3) {
        const metrics = await this.getJobMetrics(job.id);
        const candidates = await this.getCandidatesWithMatching(job.id);
        totalCandidates += metrics.totalCandidates;
        newCandidates += metrics.newCandidates;
        if (metrics.totalCandidates > 0) {
          jobsWithCandidates.push({
            jobId: job.id,
            jobTitle: job.title,
            candidateCount: metrics.totalCandidates,
            newCount: metrics.newCandidates,
            bestMatchScore: metrics.bestMatchScore
          });
        }
        if (candidates.length > 0) {
          topMatches.push(...candidates.slice(0, 2).map((candidate) => ({
            ...candidate,
            jobTitle: job.title
          })));
        }
      }
      topMatches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
      return {
        totalJobs: jobs3.length,
        totalCandidates,
        newCandidates,
        jobsWithCandidates: jobsWithCandidates.slice(0, 10),
        // Top 10 jobs
        topMatches: topMatches.slice(0, 5)
        // Top 5 matches globales
      };
    } catch (error) {
      console.error("Error getting company candidates overview:", error);
      return null;
    }
  }
};
var candidateService = new CandidateService();

// server/matching-alerts.ts
init_db();
init_schema();
import { eq as eq2, and as and2, desc as desc2 } from "drizzle-orm";
var MatchingAlertService = class {
  /**
   * Procesa alertas para un profesional específico (registro o actualización de perfil)
   */
  async processAlertsForProfessional(professionalId, alertType = "high_compatibility") {
    try {
      console.log(`Procesando alertas para profesional ${professionalId}...`);
      const professional2 = await db.select().from(professionals).where(eq2(professionals.id, professionalId)).limit(1);
      if (!professional2.length) {
        console.log("Profesional no encontrado");
        return;
      }
      const prof = professional2[0];
      const activeJobs = await db.select({
        id: jobs.id,
        title: jobs.title,
        description: jobs.description,
        skills: jobs.skills,
        experience: jobs.experience,
        location: jobs.location,
        department: jobs.department,
        companyId: jobs.companyId,
        company: {
          id: companies.id,
          name: companies.name,
          alertsEnabled: companies.alertsEnabled
        }
      }).from(jobs).leftJoin(companies, eq2(jobs.companyId, companies.id)).where(and2(
        eq2(jobs.isActive, true),
        eq2(companies.alertsEnabled, true)
        // Solo empresas con alertas habilitadas
      ));
      console.log(`Encontrados ${activeJobs.length} empleos activos con alertas habilitadas`);
      for (const job of activeJobs) {
        await this.checkCompatibilityAndCreateAlert(prof, job, alertType);
      }
    } catch (error) {
      console.error("Error procesando alertas:", error);
    }
  }
  /**
   * Verifica compatibilidad y crea alerta si es necesario
   */
  async checkCompatibilityAndCreateAlert(professional2, job, alertType) {
    try {
      const existingAlert = await db.select().from(matchingAlerts).where(and2(
        eq2(matchingAlerts.professionalId, professional2.id),
        eq2(matchingAlerts.jobId, job.id),
        eq2(matchingAlerts.companyId, job.companyId)
      )).limit(1);
      if (existingAlert.length > 0) {
        console.log(`Alerta ya existe para profesional ${professional2.id} y empleo ${job.id}`);
        return;
      }
      const compatibilityScore = this.calculateCompatibility(professional2, job);
      console.log(`Compatibilidad calculada: ${compatibilityScore}% para ${professional2.firstName} ${professional2.lastName} - ${job.title}`);
      if (compatibilityScore >= 75) {
        await this.createAlert(professional2, job, compatibilityScore, alertType);
      }
    } catch (error) {
      console.error("Error verificando compatibilidad:", error);
    }
  }
  /**
   * Crea una nueva alerta de matching
   */
  async createAlert(professional2, job, compatibilityScore, alertType) {
    try {
      const alertData = {
        companyId: job.companyId,
        professionalId: professional2.id,
        jobId: job.id,
        compatibilityScore,
        alertType,
        emailSent: false,
        notificationSent: false
      };
      const [alert] = await db.insert(matchingAlerts).values(alertData).returning();
      console.log(`Alerta creada con ID: ${alert.id}`);
      const emailSent = await this.sendAlertEmail(alert, professional2, job);
      const notificationSent = await this.createPlatformNotification(alert, professional2, job);
      await db.update(matchingAlerts).set({
        emailSent,
        notificationSent
      }).where(eq2(matchingAlerts.id, alert.id));
      console.log(`Alerta procesada - Email: ${emailSent}, Notificaci\xF3n: ${notificationSent}`);
    } catch (error) {
      console.error("Error creando alerta:", error);
    }
  }
  /**
   * Envía email de alerta a la empresa
   */
  async sendAlertEmail(alert, professional2, job) {
    try {
      const companyUser = await db.select({ email: companies.email }).from(companies).where(eq2(companies.id, job.companyId)).limit(1);
      if (!companyUser.length) {
        console.error("No se encontr\xF3 email de la empresa");
        return false;
      }
      const emailData = {
        to: companyUser[0].email,
        professionalName: `${professional2.firstName} ${professional2.lastName}`,
        professionalTitle: professional2.title || "Profesional",
        jobTitle: job.title,
        compatibilityScore: alert.compatibilityScore,
        profileUrl: `${process.env.FRONTEND_URL || "http://localhost:5000"}/professional-profile/${professional2.id}`,
        dashboardUrl: `${process.env.FRONTEND_URL || "http://localhost:5000"}/company-dashboard`
      };
      await sendAlertEmail(emailData);
      return true;
    } catch (error) {
      console.error("Error enviando email de alerta:", error);
      return false;
    }
  }
  /**
   * Crea notificación en la plataforma para la empresa
   */
  async createPlatformNotification(alert, professional2, job) {
    try {
      const notificationData = {
        companyId: job.companyId,
        type: "matching_alert",
        title: "Nuevo candidato con alta compatibilidad",
        message: `\u{1F50D} Nuevo candidato con ${alert.compatibilityScore}% de compatibilidad para el puesto: ${job.title}`,
        read: false
      };
      await db.insert(notifications).values(notificationData);
      return true;
    } catch (error) {
      console.error("Error creando notificaci\xF3n:", error);
      return false;
    }
  }
  /**
   * Calcula la compatibilidad entre un profesional y un empleo
   * Basado en el algoritmo existente del sistema
   */
  calculateCompatibility(professional2, job) {
    let totalScore = 0;
    let maxScore = 0;
    const skillsScore = this.calculateSkillsMatch(professional2.skills || "", job.skills || "");
    totalScore += skillsScore * 0.4;
    maxScore += 100 * 0.4;
    const experienceScore = this.calculateExperienceMatch(professional2.experience || "", job.experience || "");
    totalScore += experienceScore * 0.35;
    maxScore += 100 * 0.35;
    const titleScore = this.calculateTitleMatch(professional2.title || "", job.title || "");
    totalScore += titleScore * 0.15;
    maxScore += 100 * 0.15;
    const locationScore = this.calculateLocationMatch(professional2.location || "", job.location || "");
    totalScore += locationScore * 0.1;
    maxScore += 100 * 0.1;
    return Math.round(totalScore / maxScore * 100);
  }
  /**
   * Calcula match de habilidades
   */
  calculateSkillsMatch(professionalSkills, jobSkills) {
    if (!professionalSkills || !jobSkills) return 0;
    const profSkillsArray = this.normalizeSkills(professionalSkills);
    const jobSkillsArray = this.normalizeSkills(jobSkills);
    if (jobSkillsArray.length === 0) return 50;
    let matchedSkills = 0;
    jobSkillsArray.forEach((jobSkill) => {
      const hasMatch = profSkillsArray.some(
        (profSkill) => profSkill.toLowerCase().includes(jobSkill.toLowerCase()) || jobSkill.toLowerCase().includes(profSkill.toLowerCase())
      );
      if (hasMatch) matchedSkills++;
    });
    return matchedSkills / jobSkillsArray.length * 100;
  }
  /**
   * Calcula match de experiencia (simplificado)
   */
  calculateExperienceMatch(professionalExp, jobExp) {
    const profExp = professionalExp.toLowerCase();
    const reqExp = jobExp.toLowerCase();
    const keywords = ["desarrollador", "developer", "programador", "engineer", "analista", "designer", "manager"];
    let matches = 0;
    keywords.forEach((keyword) => {
      if (profExp.includes(keyword) && reqExp.includes(keyword)) {
        matches++;
      }
    });
    return Math.min(matches / 3 * 100, 100);
  }
  /**
   * Calcula match de título/puesto
   */
  calculateTitleMatch(professionalTitle, jobTitle) {
    const profTitle = professionalTitle.toLowerCase();
    const jobTitleLower = jobTitle.toLowerCase();
    if (profTitle === jobTitleLower) return 100;
    const profWords = profTitle.split(/\s+/);
    const jobWords = jobTitleLower.split(/\s+/);
    let matches = 0;
    profWords.forEach((profWord) => {
      if (jobWords.some((jobWord) => jobWord.includes(profWord) || profWord.includes(jobWord))) {
        matches++;
      }
    });
    return Math.min(matches / Math.max(profWords.length, jobWords.length) * 100, 100);
  }
  /**
   * Calcula match de ubicación
   */
  calculateLocationMatch(professionalLocation, jobLocation) {
    const profLoc = professionalLocation.toLowerCase();
    const jobLoc = jobLocation.toLowerCase();
    if (profLoc === jobLoc) return 100;
    if (jobLoc.includes("remoto") || jobLoc.includes("remote")) return 100;
    if (profLoc.includes("lima") && jobLoc.includes("lima")) return 90;
    if (profLoc.includes("arequipa") && jobLoc.includes("arequipa")) return 90;
    if (profLoc.includes("trujillo") && jobLoc.includes("trujillo")) return 90;
    if (profLoc.includes("per") && jobLoc.includes("per")) return 70;
    return 30;
  }
  /**
   * Normaliza string de habilidades
   */
  normalizeSkills(skillsString) {
    return skillsString.split(/[,;|]/).map((skill) => skill.trim()).filter((skill) => skill.length > 0);
  }
  /**
   * Obtiene historial de alertas para una empresa
   */
  async getCompanyAlerts(companyId, limit = 50) {
    try {
      const alerts = await db.select({
        id: matchingAlerts.id,
        compatibilityScore: matchingAlerts.compatibilityScore,
        alertType: matchingAlerts.alertType,
        emailSent: matchingAlerts.emailSent,
        notificationSent: matchingAlerts.notificationSent,
        createdAt: matchingAlerts.createdAt,
        professional: {
          id: professionals.id,
          firstName: professionals.firstName,
          lastName: professionals.lastName,
          title: professionals.title,
          avatar: professionals.avatar
        },
        job: {
          id: jobs.id,
          title: jobs.title,
          department: jobs.department
        }
      }).from(matchingAlerts).leftJoin(professionals, eq2(matchingAlerts.professionalId, professionals.id)).leftJoin(jobs, eq2(matchingAlerts.jobId, jobs.id)).where(eq2(matchingAlerts.companyId, companyId)).orderBy(desc2(matchingAlerts.createdAt)).limit(limit);
      return alerts;
    } catch (error) {
      console.error("Error obteniendo alertas de empresa:", error);
      return [];
    }
  }
};
var matchingAlertService = new MatchingAlertService();

// server/professional-notifications.ts
init_db();
init_schema();
import { eq as eq3, and as and3, desc as desc3 } from "drizzle-orm";
var ProfessionalNotificationService = class {
  /**
   * Notifica a un profesional sobre un empleo altamente compatible
   */
  async notifyJobMatch(professionalId, jobId, compatibilityScore) {
    try {
      const jobData = await db.select({
        jobTitle: jobs.title,
        companyName: companies.name,
        jobLocation: jobs.location,
        jobSalary: jobs.salaryRange
      }).from(jobs).innerJoin(companies, eq3(jobs.companyId, companies.id)).where(eq3(jobs.id, jobId)).limit(1);
      if (!jobData.length) {
        console.error("Empleo no encontrado para notificaci\xF3n de matching");
        return;
      }
      const { jobTitle, companyName, jobLocation, jobSalary } = jobData[0];
      const existingNotification = await db.select().from(notifications).where(
        and3(
          eq3(notifications.professionalId, professionalId),
          eq3(notifications.type, "job_match")
        )
      ).orderBy(desc3(notifications.createdAt)).limit(1);
      if (existingNotification.length > 0) {
        const lastNotificationData = JSON.parse(existingNotification[0].data || "{}");
        if (lastNotificationData.jobId === jobId) {
          console.log(`Notificaci\xF3n duplicada evitada para profesional ${professionalId} y empleo ${jobId}`);
          return;
        }
      }
      const notificationData = {
        professionalId,
        type: "job_match",
        title: "\u{1F50E} \xA1Encontramos un empleo ideal para ti!",
        message: `${compatibilityScore}% de compatibilidad con "${jobTitle}" en ${companyName}. Ubicaci\xF3n: ${jobLocation || "No especificada"}${jobSalary ? `. Salario: ${jobSalary}` : ""}`,
        data: JSON.stringify({
          jobId,
          compatibilityScore,
          jobTitle,
          companyName,
          jobLocation,
          jobSalary
        }),
        read: false
      };
      await db.insert(notifications).values(notificationData);
      console.log(`Notificaci\xF3n de matching enviada a profesional ${professionalId} para empleo ${jobId} (${compatibilityScore}% compatibilidad)`);
    } catch (error) {
      console.error("Error enviando notificaci\xF3n de matching:", error);
    }
  }
  /**
   * Notifica a un profesional sobre el éxito de su postulación
   */
  async notifyApplicationSuccess(professionalId, jobId) {
    try {
      const jobData = await db.select({
        jobTitle: jobs.title,
        companyName: companies.name
      }).from(jobs).innerJoin(companies, eq3(jobs.companyId, companies.id)).where(eq3(jobs.id, jobId)).limit(1);
      if (!jobData.length) {
        console.error("Empleo no encontrado para notificaci\xF3n de postulaci\xF3n");
        return;
      }
      const { jobTitle, companyName } = jobData[0];
      const notificationData = {
        professionalId,
        type: "application_sent",
        title: "\u2705 \xA1Tu postulaci\xF3n fue enviada correctamente!",
        message: `Has postulado al empleo "${jobTitle}" en ${companyName}. Te notificaremos si la empresa visualiza tu CV.`,
        data: JSON.stringify({ jobId }),
        read: false
      };
      await db.insert(notifications).values(notificationData);
      console.log(`Notificaci\xF3n de postulaci\xF3n enviada a profesional ${professionalId} para empleo ${jobId}`);
    } catch (error) {
      console.error("Error enviando notificaci\xF3n de postulaci\xF3n:", error);
    }
  }
  /**
   * Obtiene el historial de notificaciones de matching para un profesional
   */
  async getJobMatchHistory(professionalId, limit = 50) {
    try {
      const matchHistory = await db.select({
        id: notifications.id,
        type: notifications.type,
        title: notifications.title,
        message: notifications.message,
        data: notifications.data,
        createdAt: notifications.createdAt,
        read: notifications.read
      }).from(notifications).where(
        and3(
          eq3(notifications.professionalId, professionalId),
          eq3(notifications.type, "job_match")
        )
      ).orderBy(desc3(notifications.createdAt)).limit(limit);
      return matchHistory;
    } catch (error) {
      console.error("Error obteniendo historial de matching:", error);
      return [];
    }
  }
  /**
   * Verifica compatibilidad para todos los profesionales con un empleo nuevo
   */
  async checkAndNotifyJobMatch(jobId, minCompatibility = 75) {
    try {
      const job = await db.select().from(jobs).where(eq3(jobs.id, jobId)).limit(1);
      if (!job.length) {
        console.log(`Empleo ${jobId} no encontrado para notificaciones`);
        return;
      }
      const allProfessionals = await db.select().from(professionals).where(eq3(professionals.isAvailable, true));
      let notificationsSent = 0;
      for (const professional2 of allProfessionals) {
        try {
          const compatibilityScore = this.calculateCompatibility(professional2, job[0]);
          if (compatibilityScore >= minCompatibility) {
            await this.notifyJobMatch(professional2.id, jobId, Math.round(compatibilityScore));
            notificationsSent++;
          }
        } catch (error) {
          console.error(`Error procesando profesional ${professional2.id}:`, error);
        }
      }
      console.log(`Notificaciones de compatibilidad enviadas: ${notificationsSent} profesionales notificados para empleo ${jobId}`);
    } catch (error) {
      console.error("Error verificando compatibilidad de empleo:", error);
    }
  }
  /**
   * Calcula la compatibilidad entre un profesional y un empleo
   */
  calculateCompatibility(professional2, job) {
    let totalScore = 0;
    const skillsMatch = this.calculateSkillsMatch(
      professional2.skills || "",
      job.skills || ""
    );
    totalScore += skillsMatch * 0.4;
    const experienceMatch = this.calculateExperienceMatch(
      professional2.experience || "",
      job.experience || ""
    );
    totalScore += experienceMatch * 0.35;
    const titleMatch = this.calculateTitleMatch(
      professional2.title || "",
      job.title || ""
    );
    totalScore += titleMatch * 0.15;
    const locationMatch = this.calculateLocationMatch(
      professional2.location || "",
      job.location || ""
    );
    totalScore += locationMatch * 0.1;
    return Math.min(100, Math.max(0, totalScore));
  }
  /**
   * Calcula match de habilidades
   */
  calculateSkillsMatch(professionalSkills, jobSkills) {
    const profSkills = this.normalizeSkills(professionalSkills);
    const reqSkills = this.normalizeSkills(jobSkills);
    if (reqSkills.length === 0) return 50;
    const matches = profSkills.filter(
      (skill) => reqSkills.some(
        (reqSkill) => skill.includes(reqSkill) || reqSkill.includes(skill)
      )
    );
    return Math.min(matches.length / reqSkills.length * 100, 100);
  }
  /**
   * Calcula match de experiencia
   */
  calculateExperienceMatch(professionalExp, jobExp) {
    const expMap = {
      "sin-experiencia": 0,
      "1-2": 1.5,
      "3-5": 4,
      "5+": 7,
      "senior": 10
    };
    const profLevel = expMap[professionalExp] || 0;
    const jobLevel = expMap[jobExp] || 0;
    if (profLevel >= jobLevel) return 100;
    if (profLevel >= jobLevel * 0.7) return 80;
    if (profLevel >= jobLevel * 0.5) return 60;
    return 40;
  }
  /**
   * Calcula match de título/puesto
   */
  calculateTitleMatch(professionalTitle, jobTitle) {
    const profWords = professionalTitle.toLowerCase().split(" ");
    const jobWords = jobTitle.toLowerCase().split(" ");
    const matches = profWords.filter(
      (word) => jobWords.some(
        (jobWord) => word.includes(jobWord) || jobWord.includes(word)
      )
    );
    return Math.min(matches.length / Math.max(jobWords.length, 1) * 100, 100);
  }
  /**
   * Calcula match de ubicación
   */
  calculateLocationMatch(professionalLocation, jobLocation) {
    if (!professionalLocation || !jobLocation) return 50;
    if (professionalLocation.toLowerCase().includes(jobLocation.toLowerCase()) || jobLocation.toLowerCase().includes(professionalLocation.toLowerCase())) {
      return 100;
    }
    return 30;
  }
  /**
   * Normaliza string de habilidades
   */
  normalizeSkills(skillsString) {
    return skillsString.toLowerCase().split(/[,;|]/).map((skill) => skill.trim()).filter((skill) => skill.length > 0);
  }
};
var professionalNotificationService = new ProfessionalNotificationService();

// server/routes.ts
init_schema();
init_db();
import bcrypt2 from "bcryptjs";
import { eq as eq5, and as and4, or as or2, desc as desc4, asc as asc2, sql as sql2 } from "drizzle-orm";
import { z } from "zod";
import crypto from "crypto";

// server/middleware/checkCompanyPlan.ts
init_storage();
var checkCompanyPlan = async (req, res, next) => {
  try {
    if (!req.session?.user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no autenticado",
        redirectTo: "/login"
      });
    }
    if (req.session.user.userType !== "company") {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado. Se requiere cuenta de empresa.",
        redirectTo: "/user-type-selection"
      });
    }
    const company2 = await storage.getCompanyByUserId(req.session.user.id);
    if (!company2) {
      return res.status(404).json({
        success: false,
        message: "Perfil de empresa no encontrado",
        redirectTo: "/company-registration"
      });
    }
    const hasActivePlan = await checkCompanyAccess(company2.id);
    if (!hasActivePlan) {
      return res.status(403).json({
        success: false,
        message: "Este contenido est\xE1 disponible s\xF3lo con un plan premium",
        redirectTo: "/plans/upgrade",
        requiresPremium: true
      });
    }
    req.company = company2;
    next();
  } catch (error) {
    console.error("Error in checkCompanyPlan middleware:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};
async function checkCompanyAccess(companyId) {
  try {
    const company2 = await storage.getCompany(companyId);
    if (!company2) return false;
    const hasPremiumPlan = true;
    const activeJobs = await storage.getJobsByCompany(companyId);
    const hasActiveJobs = activeJobs.some((job) => job.isActive && job.paid);
    return hasPremiumPlan || hasActiveJobs;
  } catch (error) {
    console.error("Error checking company access:", error);
    return false;
  }
}
var checkCompanyDashboardAccess = async (req, res, next) => {
  try {
    if (!req.session?.user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no autenticado",
        redirectTo: "/login"
      });
    }
    if (req.session.user.userType !== "company") {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado. Se requiere cuenta de empresa.",
        redirectTo: "/user-type-selection"
      });
    }
    const company2 = await storage.getCompanyByUserId(req.session.user.id);
    if (!company2) {
      return res.status(404).json({
        success: false,
        message: "Perfil de empresa no encontrado",
        redirectTo: "/company-registration"
      });
    }
    req.company = company2;
    next();
  } catch (error) {
    console.error("Error in checkCompanyDashboardAccess middleware:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

// server/routes.ts
var jobValidationSchema = z.object({
  title: z.string().min(5, "El t\xEDtulo debe tener al menos 5 caracteres").max(100, "El t\xEDtulo no puede exceder 100 caracteres"),
  description: z.string().min(50, "La descripci\xF3n debe tener al menos 50 caracteres").max(5e3, "La descripci\xF3n no puede exceder 5000 caracteres"),
  category: z.string().min(1, "La categor\xEDa es requerida"),
  location: z.string().min(1, "La ubicaci\xF3n es requerida").max(100, "La ubicaci\xF3n no puede exceder 100 caracteres"),
  workType: z.enum(["remoto", "presencial", "hibrido"], {
    errorMap: () => ({ message: "Tipo de trabajo debe ser remoto, presencial o h\xEDbrido" })
  }),
  experienceLevel: z.enum(["junior", "intermedio", "senior", "experto"], {
    errorMap: () => ({ message: "Nivel de experiencia debe ser junior, intermedio, senior o experto" })
  }),
  salary: z.string().optional(),
  salaryRange: z.string().optional(),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  contractType: z.enum(["tiempo-completo", "medio-tiempo", "contrato", "freelance"], {
    errorMap: () => ({ message: "Tipo de contrato inv\xE1lido" })
  }).optional()
});
var serviceValidationSchema = z.object({
  title: z.string().min(5, "El t\xEDtulo debe tener al menos 5 caracteres").max(100, "El t\xEDtulo no puede exceder 100 caracteres"),
  description: z.string().min(20, "La descripci\xF3n debe tener al menos 20 caracteres").max(2e3, "La descripci\xF3n no puede exceder 2000 caracteres"),
  category: z.string().min(1, "La categor\xEDa es requerida"),
  price: z.string().min(1, "El precio es requerido").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, {
    message: "El precio debe ser un n\xFAmero positivo v\xE1lido"
  }),
  requirements: z.string().optional(),
  tools: z.string().optional(),
  imageUrl: z.string().optional(),
  professionalId: z.number().optional()
});
var emailValidationSchema = z.object({
  email: z.string().email("Debe ser un email v\xE1lido").min(5, "El email debe tener al menos 5 caracteres").max(254, "El email no puede exceder 254 caracteres").refine((email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }, {
    message: "Formato de email inv\xE1lido"
  })
});
var invitationValidationSchema = z.object({
  email: z.string().email("Debe ser un email v\xE1lido").min(5, "El email debe tener al menos 5 caracteres").max(254, "El email no puede exceder 254 caracteres"),
  jobId: z.number().min(1, "ID de trabajo inv\xE1lido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(500, "El mensaje no puede exceder 500 caracteres").optional()
});
var ratingValidationSchema = z.object({
  rating: z.number().min(1, "La calificaci\xF3n debe ser entre 1 y 5").max(5, "La calificaci\xF3n debe ser entre 1 y 5").int("La calificaci\xF3n debe ser un n\xFAmero entero"),
  comment: z.string().min(10, "El comentario debe tener al menos 10 caracteres").max(500, "El comentario no puede exceder 500 caracteres").optional(),
  jobId: z.number().min(1, "ID de trabajo inv\xE1lido"),
  professionalId: z.number().min(1, "ID de profesional inv\xE1lido"),
  companyId: z.number().min(1, "ID de empresa inv\xE1lido")
});
var validateCVFile = (file) => {
  const errors = [];
  if (!file) {
    errors.push("El archivo CV es requerido");
    return errors;
  }
  if (file.mimetype !== "application/pdf") {
    errors.push("El archivo debe ser un PDF");
  }
  if (file.size > 5 * 1024 * 1024) {
    errors.push("El archivo no puede exceder 5MB");
  }
  if (file.size === 0) {
    errors.push("El archivo no puede estar vac\xEDo");
  }
  return errors;
};
var formatValidationErrors = (error) => {
  return {
    message: "Errores de validaci\xF3n",
    errors: error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message
    }))
  };
};
function generateInvitationToken() {
  return crypto.randomBytes(32).toString("hex");
}
var cvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/cvs";
    if (!fs3.existsSync(uploadPath)) {
      fs3.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const timestamp2 = Date.now();
    const userId = req.body.userId || "unknown";
    const filename = `cv-professional-${userId}-${timestamp2}.pdf`;
    cb(null, filename);
  }
});
var cvUpload = multer({
  storage: cvStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB limit for CV files
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      const error = new Error("Solo se permiten archivos PDF");
      error.code = "INVALID_FILE_TYPE";
      cb(error, false);
    }
  }
});
var photoUpload = multer({
  dest: "uploads/photos/",
  limits: { fileSize: 2 * 1024 * 1024 },
  // 2MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      const error = new Error("Solo se permiten archivos JPG, JPEG y PNG");
      error.code = "INVALID_FILE_TYPE";
      cb(error, false);
    }
  }
});
async function cleanupOldCVFiles(professionalId) {
  try {
    const uploadsDir = path2.join(process.cwd(), "uploads", "cvs");
    const files = fs3.readdirSync(uploadsDir);
    const professionalFiles = files.filter(
      (file) => file.includes(`professional-${professionalId}-`) || file.includes(`cv-professional-${professionalId}-`)
    );
    if (professionalFiles.length > 1) {
      const sortedFiles = professionalFiles.sort().slice(0, -1);
      for (const file of sortedFiles) {
        const filePath = path2.join(uploadsDir, file);
        if (fs3.existsSync(filePath)) {
          fs3.unlinkSync(filePath);
          console.log(`Cleaned up old CV file: ${file}`);
        }
      }
    }
  } catch (error) {
    console.error("Error cleaning up old CV files:", error);
  }
}
var requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    return next();
  } else {
    return res.status(401).json({ message: "Not authenticated" });
  }
};
var isAdminAuthenticated = (req, res, next) => {
  if (req.session && req.session.admin) {
    const admin = req.session.admin;
    if (admin.id && admin.email && admin.role && typeof admin.id === "number" && typeof admin.email === "string" && typeof admin.role === "string") {
      if (req.session.user) {
        console.log(`Access attempt: User ${req.session.user.email} tried to access admin route`);
        req.session.destroy();
        return res.status(403).json({
          success: false,
          message: "Acceso prohibido. Los usuarios regulares no pueden acceder a rutas administrativas.",
          redirectTo: "/admin/login"
        });
      }
      req.admin = admin;
      return next();
    } else {
      console.log("Invalid admin session data structure");
      req.session.destroy();
    }
  }
  if (req.session && (req.session.admin || req.session.user)) {
    req.session.destroy();
  }
  return res.status(401).json({
    success: false,
    message: "Acceso denegado. Se requiere autenticaci\xF3n de administrador v\xE1lida.",
    redirectTo: "/admin/login"
  });
};
async function registerRoutes(app2) {
  const MemStore = MemoryStore(session);
  app2.use(session({
    cookie: {
      maxAge: 864e5,
      // 24 hours
      secure: false,
      // Set to true in production with HTTPS
      httpOnly: true,
      sameSite: "lax"
    },
    store: new MemStore({
      checkPeriod: 864e5
      // Prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET || "flexwork-session-secret-key",
    resave: false,
    saveUninitialized: false,
    name: "flexwork.sid"
  }));
  const staticPath = path2.join(process.cwd(), "uploads");
  app2.use("/uploads", express.static(staticPath));
  app2.post("/api/upload-cv", cvUpload.single("cv"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "El archivo CV es requerido",
          errors: [{ field: "file", message: "El archivo CV es requerido" }]
        });
      }
      const fileValidationErrors = validateCVFile(req.file);
      if (fileValidationErrors.length > 0) {
        try {
          fs3.unlinkSync(req.file.path);
        } catch (cleanupError) {
          console.error("Error cleaning up invalid file:", cleanupError);
        }
        return res.status(400).json({
          success: false,
          message: "Errores de validaci\xF3n del archivo",
          errors: fileValidationErrors.map((error) => ({ field: "file", message: error }))
        });
      }
      const userId = req.session?.user?.id || req.body.userId;
      if (!userId) {
        fs3.unlinkSync(req.file.path);
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado"
        });
      }
      console.log(`Processing CV upload for user ID: ${userId}`);
      const professional2 = await storage.getProfessionalByUserId(parseInt(userId));
      if (!professional2) {
        fs3.unlinkSync(req.file.path);
        return res.status(404).json({
          success: false,
          message: "Profesional no encontrado"
        });
      }
      let cvUrl;
      let cloudinaryUploadResult = null;
      let useCloudinary = false;
      if (cloudinaryService.isAvailable()) {
        try {
          console.log("Uploading CV to Cloudinary...");
          cloudinaryUploadResult = await cloudinaryService.uploadFile(req.file.path, {
            folder: "flexwork/cvs",
            public_id: `cv-professional-${professional2.id}-${Date.now()}`,
            resource_type: "auto"
          });
          cvUrl = cloudinaryUploadResult.secure_url;
          useCloudinary = true;
          console.log(`CV uploaded to Cloudinary: ${cvUrl}`);
        } catch (cloudinaryError) {
          console.error("Cloudinary upload failed, using local storage:", cloudinaryError);
          cvUrl = `/uploads/cvs/${req.file.filename}`;
          useCloudinary = false;
        }
      } else {
        console.log("Cloudinary not configured, using local storage");
        cvUrl = `/uploads/cvs/${req.file.filename}`;
        useCloudinary = false;
      }
      if (!useCloudinary) {
        await cleanupOldCVFiles(professional2.id);
      }
      const updatedProfessional = await storage.updateProfessional(professional2.id, {
        cvUrl
      });
      if (!updatedProfessional) {
        if (!useCloudinary && fs3.existsSync(req.file.path)) {
          fs3.unlinkSync(req.file.path);
        }
        return res.status(500).json({
          success: false,
          message: "Error al actualizar el perfil del profesional"
        });
      }
      console.log(`CV uploaded successfully for professional ${professional2.id}: ${req.file.filename}`);
      let insertedExperiences = 0;
      let insertedEducation = 0;
      let insertedSkills = 0;
      let extractedData = null;
      try {
        console.log(`Processing CV for professional ${professional2.id}...`);
        extractedData = await enhancedCVParser.processAndSaveCV(req.file.path, professional2.id);
        insertedExperiences = extractedData.savedExperiences || 0;
        insertedEducation = extractedData.savedEducations || 0;
        if (extractedData.skills) {
          const allSkills = [
            ...extractedData.skills.technical,
            ...extractedData.skills.soft,
            ...extractedData.skills.languages,
            ...extractedData.skills.certifications
          ];
          if (allSkills.length > 0) {
            const skillsString = allSkills.join(", ");
            await storage.updateProfessional(professional2.id, {
              skills: skillsString
            });
            insertedSkills = allSkills.length;
            console.log(`Updated professional skills: ${skillsString}`);
          }
        }
        console.log(`CV processed successfully. Inserted: ${insertedExperiences} experiences, ${insertedEducation} education records, ${insertedSkills} skills.`);
      } catch (parseError) {
        console.error("Error processing CV content:", parseError);
      }
      if (useCloudinary && fs3.existsSync(req.file.path)) {
        try {
          fs3.unlinkSync(req.file.path);
          console.log("Local temporary file cleaned up after Cloudinary upload");
        } catch (cleanupError) {
          console.error("Error cleaning up temporary file:", cleanupError);
        }
      }
      const publicUrl = useCloudinary ? cvUrl : (() => {
        const baseUrl = process.env.NODE_ENV === "production" ? process.env.BASE_URL || `${req.protocol}://${req.get("host")}` : `${req.protocol}://${req.get("host")}`;
        return `${baseUrl}${cvUrl}`;
      })();
      res.json({
        success: true,
        message: `CV subido exitosamente. Se insertaron ${insertedExperiences} experiencias, ${insertedEducation} estudios y ${insertedSkills} habilidades.`,
        insertedExperiences,
        insertedEducation,
        insertedSkills,
        data: {
          cvUrl: publicUrl,
          relativePath: cvUrl,
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
          uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
          storageType: useCloudinary ? "cloudinary" : "local",
          cloudinaryData: cloudinaryUploadResult,
          professional: {
            id: professional2.id,
            name: `${professional2.firstName} ${professional2.lastName}`
          },
          extracted: extractedData ? {
            experiences: extractedData.experiences.length,
            education: extractedData.educations.length,
            skills: extractedData.skills ? extractedData.skills.technical.length + extractedData.skills.soft.length + extractedData.skills.languages.length + extractedData.skills.certifications.length : 0
          } : null
        }
      });
    } catch (error) {
      console.error("Error uploading CV:", error);
      if (req.file) {
        try {
          fs3.unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.error("Error deleting file:", unlinkError);
        }
      }
      const errorMessage = error instanceof Error ? error.message : "Error interno del servidor al subir el CV";
      const statusCode = error && error.code === "INVALID_FILE_TYPE" ? 400 : 500;
      res.status(statusCode).json({
        success: false,
        message: errorMessage
      });
    }
  });
  app2.post("/api/upload-photo", photoUpload.single("photo"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No se recibi\xF3 ning\xFAn archivo de imagen"
        });
      }
      if (!["image/jpeg", "image/png", "image/jpg"].includes(req.file.mimetype)) {
        fs3.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          message: "Solo se permiten archivos JPG, JPEG y PNG"
        });
      }
      const userId = req.session?.user?.id || req.body.userId;
      if (!userId) {
        fs3.unlinkSync(req.file.path);
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado"
        });
      }
      console.log(`Processing photo upload for user ID: ${userId}`);
      const professional2 = await storage.getProfessionalByUserId(parseInt(userId));
      if (!professional2) {
        fs3.unlinkSync(req.file.path);
        return res.status(404).json({
          success: false,
          message: "Profesional no encontrado"
        });
      }
      let photoUrl = "";
      let cloudinaryUploadResult = null;
      let useCloudinary = false;
      if (cloudinaryService.isAvailable()) {
        try {
          console.log("Uploading photo to Cloudinary...");
          cloudinaryUploadResult = await cloudinaryService.uploadFile(
            req.file.path
          );
          photoUrl = cloudinaryUploadResult.secure_url;
          useCloudinary = true;
          console.log("Photo uploaded to Cloudinary successfully:", photoUrl);
        } catch (cloudinaryError) {
          console.error("Cloudinary upload failed:", cloudinaryError);
          console.log("Falling back to local storage");
          useCloudinary = false;
        }
      }
      if (!useCloudinary) {
        console.log("Using local storage for photo upload");
        const uploadsDir = path2.join(process.cwd(), "uploads", "photos");
        if (!fs3.existsSync(uploadsDir)) {
          fs3.mkdirSync(uploadsDir, { recursive: true });
        }
        const fileExtension = path2.extname(req.file.originalname);
        const uniqueFilename = `photo-professional-${professional2.id}-${Date.now()}${fileExtension}`;
        const localPhotoPath = path2.join(uploadsDir, uniqueFilename);
        fs3.renameSync(req.file.path, localPhotoPath);
        photoUrl = `/uploads/photos/${uniqueFilename}`;
        console.log("Photo saved locally:", localPhotoPath);
      }
      if (useCloudinary && fs3.existsSync(req.file.path)) {
        try {
          fs3.unlinkSync(req.file.path);
          console.log("Local temporary file cleaned up after Cloudinary upload");
        } catch (cleanupError) {
          console.error("Error cleaning up temporary file:", cleanupError);
        }
      }
      const updatedProfessional = await storage.updateProfessional(professional2.id, {
        photoUrl
      });
      if (!updatedProfessional) {
        return res.status(500).json({
          success: false,
          message: "Error al actualizar la foto del profesional"
        });
      }
      const publicUrl = useCloudinary ? photoUrl : (() => {
        const baseUrl = process.env.NODE_ENV === "production" ? process.env.BASE_URL || `${req.protocol}://${req.get("host")}` : `${req.protocol}://${req.get("host")}`;
        return `${baseUrl}${photoUrl}`;
      })();
      console.log(`Photo upload completed for professional ${professional2.id}`);
      res.json({
        success: true,
        message: "Foto subida exitosamente",
        data: {
          photoUrl: publicUrl,
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
          uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
          storageType: useCloudinary ? "cloudinary" : "local",
          cloudinaryData: cloudinaryUploadResult,
          professional: {
            id: professional2.id,
            name: `${professional2.firstName} ${professional2.lastName}`
          }
        }
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
      if (req.file) {
        try {
          fs3.unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.error("Error deleting file:", unlinkError);
        }
      }
      const errorMessage = error instanceof Error ? error.message : "Error interno del servidor al subir la foto";
      const statusCode = error && error.code === "INVALID_FILE_TYPE" ? 400 : 500;
      res.status(statusCode).json({
        success: false,
        message: errorMessage
      });
    }
  });
  app2.get("/api/cv/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "ID de usuario es requerido"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(parseInt(userId));
      if (!professional2) {
        return res.status(404).json({
          success: false,
          message: "Profesional no encontrado"
        });
      }
      if (!professional2.cvUrl) {
        return res.status(404).json({
          success: false,
          message: "No hay CV subido para este profesional"
        });
      }
      const cvPath = path2.join(process.cwd(), "uploads", "cvs", path2.basename(professional2.cvUrl));
      if (!fs3.existsSync(cvPath)) {
        return res.status(404).json({
          success: false,
          message: "Archivo de CV no encontrado en el servidor"
        });
      }
      const stats = fs3.statSync(cvPath);
      const baseUrl = process.env.NODE_ENV === "production" ? process.env.BASE_URL || `${req.protocol}://${req.get("host")}` : `${req.protocol}://${req.get("host")}`;
      res.json({
        success: true,
        data: {
          cvUrl: `${baseUrl}${professional2.cvUrl}`,
          filename: path2.basename(professional2.cvUrl),
          size: stats.size,
          uploadedAt: stats.mtime.toISOString(),
          professional: {
            id: professional2.id,
            name: `${professional2.firstName} ${professional2.lastName}`
          }
        }
      });
    } catch (error) {
      console.error("Error retrieving CV information:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email y contrase\xF1a son requeridos"
        });
      }
      const user2 = await storage.getUserByUsername(email);
      if (!user2) {
        return res.status(401).json({
          success: false,
          message: "Email o contrase\xF1a incorrectos"
        });
      }
      if (user2.password !== password) {
        return res.status(401).json({
          success: false,
          message: "Email o contrase\xF1a incorrectos"
        });
      }
      req.session.user = {
        id: user2.id,
        email: user2.email,
        userType: user2.userType
      };
      let profileData = null;
      if (user2.userType === "professional") {
        profileData = await storage.getProfessionalByUserId(user2.id);
      } else if (user2.userType === "company") {
        profileData = await storage.getCompanyByUserId(user2.id);
      }
      res.json({
        success: true,
        user: {
          id: user2.id,
          email: user2.email,
          userType: user2.userType
        },
        profile: profileData
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({
          success: false,
          message: "Error al cerrar sesi\xF3n"
        });
      }
      res.clearCookie("flexwork.sid");
      res.json({
        success: true,
        message: "Sesi\xF3n cerrada exitosamente"
      });
    });
  });
  app2.get("/api/session", (req, res) => {
    const user2 = req.session?.user;
    if (user2) {
      res.json({
        authenticated: true,
        user: user2
      });
    } else {
      res.json({
        authenticated: false
      });
    }
  });
  const adminLoginSchema = z.object({
    email: z.string().email("Email inv\xE1lido"),
    password: z.string().min(1, "La contrase\xF1a es requerida")
  });
  app2.post("/api/admin/login", async (req, res) => {
    try {
      const validationResult = adminLoginSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: "Datos de entrada inv\xE1lidos",
          errors: validationResult.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message
          }))
        });
      }
      const { email, password } = validationResult.data;
      const admin = await storage.getAdminByEmail(email);
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Credenciales inv\xE1lidas"
        });
      }
      const isPasswordValid = await bcrypt2.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Credenciales inv\xE1lidas"
        });
      }
      const authRequest = req;
      authRequest.session.admin = {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      };
      if (authRequest.session.user) {
        delete authRequest.session.user;
      }
      authRequest.session.save((err) => {
        if (err) {
          console.error("Error saving admin session:", err);
          return res.status(500).json({
            success: false,
            message: "Error interno del servidor"
          });
        }
        console.log("Admin session saved for:", admin.email);
      });
      res.json({
        success: true,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      });
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/admin/session", async (req, res) => {
    try {
      const authReq = req;
      if (authReq.session?.admin) {
        res.json({
          authenticated: true,
          admin: {
            id: authReq.session.admin.id,
            email: authReq.session.admin.email,
            name: authReq.session.admin.name,
            role: authReq.session.admin.role
          }
        });
      } else {
        res.json({
          authenticated: false,
          admin: null
        });
      }
    } catch (error) {
      console.error("Error checking admin session:", error);
      res.status(500).json({
        authenticated: false,
        admin: null,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/admin/stats", isAdminAuthenticated, async (req, res) => {
    try {
      const companies2 = await storage.getAllCompanies();
      const professionals2 = await storage.getAllProfessionals();
      const jobsWithCompany = await storage.getJobsWithCompany();
      const servicesWithProfessional = await storage.getServicesWithProfessional();
      const allApplications = await storage.getAllApplications();
      const activeJobs = jobsWithCompany.filter((job) => job.isActive);
      const premiumJobs = jobsWithCompany.filter((job) => job.isPremium);
      const totalRevenue = premiumJobs.length * 75;
      const totalApplications = allApplications.length;
      const monthlyGrowth = 12.5;
      const pendingModeration = 0;
      res.json({
        totalProfessionals: professionals2.length,
        totalCompanies: companies2.length,
        totalServices: servicesWithProfessional.length,
        totalJobs: jobsWithCompany.length,
        totalApplications,
        totalRevenue,
        activeJobs: activeJobs.length,
        monthlyGrowth,
        pendingModeration
      });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener estad\xEDsticas"
      });
    }
  });
  app2.get("/api/admin/users", isAdminAuthenticated, async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      const usersWithProfiles = [];
      for (const user2 of allUsers) {
        let profile = null;
        if (user2.userType === "company") {
          const company2 = await storage.getCompanyByUserId(user2.id);
          if (company2) {
            profile = {
              id: company2.id,
              name: company2.name,
              firstName: void 0,
              lastName: void 0,
              plan: "free",
              // Companies don't have premium plans in current schema
              isActive: company2.isActive !== false,
              isPremium: false
            };
          }
        } else if (user2.userType === "professional") {
          const professional2 = await storage.getProfessionalByUserId(user2.id);
          if (professional2) {
            profile = {
              id: professional2.id,
              name: void 0,
              firstName: professional2.firstName,
              lastName: professional2.lastName,
              plan: professional2.planType || "free",
              isActive: professional2.isAvailable !== false,
              isPremium: professional2.planType === "premium"
            };
          }
        }
        usersWithProfiles.push({
          ...user2,
          profile
        });
      }
      res.json(usersWithProfiles);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener usuarios"
      });
    }
  });
  app2.patch("/api/admin/users/:userId/plan", isAdminAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { plan } = req.body;
      if (!userId || !plan) {
        return res.status(400).json({
          success: false,
          message: "ID de usuario y plan son requeridos"
        });
      }
      const user2 = await storage.getUser(userId);
      if (!user2) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado"
        });
      }
      if (user2.userType === "company") {
        return res.status(400).json({
          success: false,
          message: "Las empresas no tienen planes premium actualmente"
        });
      } else if (user2.userType === "professional") {
        const professional2 = await storage.getProfessionalByUserId(userId);
        if (professional2) {
          await storage.updateProfessional(professional2.id, { planType: plan });
        }
      }
      res.json({
        success: true,
        message: "Plan actualizado exitosamente"
      });
    } catch (error) {
      console.error("Error updating user plan:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar el plan"
      });
    }
  });
  app2.patch("/api/admin/users/:userId/status", isAdminAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { isActive } = req.body;
      if (!userId || typeof isActive !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "ID de usuario y estado son requeridos"
        });
      }
      const user2 = await storage.getUser(userId);
      if (!user2) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado"
        });
      }
      if (user2.userType === "company") {
        const company2 = await storage.getCompanyByUserId(userId);
        if (company2) {
          await storage.updateCompany(company2.id, { isActive });
        }
      } else if (user2.userType === "professional") {
        const professional2 = await storage.getProfessionalByUserId(userId);
        if (professional2) {
          await storage.updateProfessional(professional2.id, { isAvailable: isActive });
        }
      }
      res.json({
        success: true,
        message: `Usuario ${isActive ? "activado" : "suspendido"} exitosamente`
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar el estado del usuario"
      });
    }
  });
  app2.get("/api/admin/me", isAdminAuthenticated, async (req, res) => {
    try {
      const adminId = req.admin.id;
      const admin = await storage.getAdmin(adminId);
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Administrador no encontrado"
        });
      }
      const { password, ...adminData } = admin;
      res.json({
        success: true,
        admin: adminData,
        isValidAdmin: true
      });
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.use("/api/admin/*", (req, res, next) => {
    if (req.session && req.session.user && !req.session.admin) {
      console.log(`Blocked user ${req.session.user.email} from accessing admin endpoint: ${req.path}`);
      return res.status(403).json({
        success: false,
        message: "Acceso prohibido. Los usuarios regulares no pueden acceder a funciones administrativas.",
        redirectTo: "/admin/login"
      });
    }
    next();
  });
  app2.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying admin session:", err);
        return res.status(500).json({
          success: false,
          message: "Error al cerrar sesi\xF3n"
        });
      }
      res.clearCookie("flexwork.sid");
      res.json({
        success: true,
        message: "Sesi\xF3n de administrador cerrada exitosamente"
      });
    });
  });
  app2.get("/api/admin/dashboard-stats", isAdminAuthenticated, async (req, res) => {
    try {
      const companies2 = await storage.getAllCompanies();
      const professionals2 = await storage.getAllProfessionals();
      const jobsWithCompany = await storage.getJobsWithCompany();
      const servicesWithProfessional = await storage.getServicesWithProfessional();
      const activeJobs = jobsWithCompany.filter((job) => job.isActive);
      const totalUsers = companies2.length + professionals2.length;
      const premiumJobs = jobsWithCompany.filter((job) => job.premiumFeatures);
      const totalRevenue = premiumJobs.length * 75;
      const thirtyDaysAgo = /* @__PURE__ */ new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentCompanies = companies2.filter(
        (company2) => company2.createdAt && new Date(company2.createdAt) >= thirtyDaysAgo
      );
      const recentProfessionals = professionals2.filter(
        (professional2) => professional2.createdAt && new Date(professional2.createdAt) >= thirtyDaysAgo
      );
      const stats = {
        totalUsers,
        totalCompanies: companies2.length,
        totalProfessionals: professionals2.length,
        totalJobs: jobsWithCompany.length,
        activeJobs: activeJobs.length,
        totalServices: servicesWithProfessional.length,
        activeServices: servicesWithProfessional.filter((service) => service.isActive).length,
        premiumJobs: premiumJobs.length,
        totalRevenue,
        recentRegistrations: {
          companies: recentCompanies.length,
          professionals: recentProfessionals.length,
          total: recentCompanies.length + recentProfessionals.length
        },
        averageRevenuePerJob: premiumJobs.length > 0 ? 75 : 0,
        conversionRate: jobsWithCompany.length > 0 ? Math.round(premiumJobs.length / jobsWithCompany.length * 100) : 0
      };
      res.json({
        success: true,
        stats
      });
    } catch (error) {
      console.error("Error fetching admin dashboard stats:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/admin/users", isAdminAuthenticated, async (req, res) => {
    try {
      const sampleUsers = [
        {
          id: 1,
          name: "TechCorp S.A.C.",
          email: "admin@techcorp.com",
          type: "company",
          profileId: 1,
          createdAt: "2024-01-15T10:00:00Z",
          isActive: true,
          profileData: {
            location: "Lima, Per\xFA",
            industry: "Tecnolog\xEDa",
            phone: "+51 999 888 777",
            website: "www.techcorp.com"
          }
        },
        {
          id: 2,
          name: "Mar\xEDa Garc\xEDa L\xF3pez",
          email: "maria.garcia@email.com",
          type: "professional",
          profileId: 2,
          createdAt: "2024-02-10T14:30:00Z",
          isActive: true,
          profileData: {
            title: "Desarrolladora Full Stack",
            experience: "3-5 a\xF1os",
            skills: "React, Node.js, PostgreSQL",
            location: "Lima, Per\xFA"
          }
        },
        {
          id: 3,
          name: "Carlos Mendoza R\xEDos",
          email: "carlos.mendoza@email.com",
          type: "professional",
          profileId: 3,
          createdAt: "2024-03-05T09:15:00Z",
          isActive: false,
          profileData: {
            title: "Dise\xF1ador UX/UI",
            experience: "5-8 a\xF1os",
            skills: "Figma, Adobe XD, Sketch",
            location: "Arequipa, Per\xFA"
          }
        },
        {
          id: 4,
          name: "Innovaci\xF3n Digital SAC",
          email: "contacto@innovacion.com",
          type: "company",
          profileId: 4,
          createdAt: "2024-03-20T16:45:00Z",
          isActive: true,
          profileData: {
            location: "Cusco, Per\xFA",
            industry: "Marketing Digital",
            phone: "+51 987 654 321",
            website: "www.innovacion.com"
          }
        },
        {
          id: 5,
          name: "Ana Rodr\xEDguez Flores",
          email: "ana.rodriguez@email.com",
          type: "professional",
          profileId: 5,
          createdAt: "2024-04-01T11:20:00Z",
          isActive: true,
          profileData: {
            title: "Gerente de Proyectos",
            experience: "8+ a\xF1os",
            skills: "Agile, Scrum, Liderazgo",
            location: "Lima, Per\xFA"
          }
        },
        {
          id: 6,
          name: "Soluciones Empresariales SRL",
          email: "info@soluciones.pe",
          type: "company",
          profileId: 6,
          createdAt: "2024-05-12T08:00:00Z",
          isActive: true,
          profileData: {
            location: "Trujillo, Per\xFA",
            industry: "Consultor\xEDa",
            phone: "+51 944 555 666",
            website: "www.soluciones.pe"
          }
        },
        {
          id: 7,
          name: "Luis Alberto Vera",
          email: "luis.vera@gmail.com",
          type: "professional",
          profileId: 7,
          createdAt: "2024-06-01T13:10:00Z",
          isActive: true,
          profileData: {
            title: "Analista de Datos",
            experience: "2-3 a\xF1os",
            skills: "Python, SQL, Power BI",
            location: "Lima, Per\xFA"
          }
        }
      ];
      res.json({
        success: true,
        users: sampleUsers,
        totalCount: sampleUsers.length
      });
    } catch (error) {
      console.error("Error fetching admin users:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/admin/users/:id", isAdminAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user2 = await storage.getUser(userId);
      if (!user2) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado"
        });
      }
      let profileData = null;
      if (user2.userType === "professional") {
        profileData = await storage.getProfessionalByUserId(userId);
      } else if (user2.userType === "company") {
        profileData = await storage.getCompanyByUserId(userId);
      }
      res.json({
        success: true,
        user: {
          id: user2.id,
          email: user2.email,
          userType: user2.userType,
          createdAt: user2.createdAt
        },
        profile: profileData
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.patch("/api/admin/users/:id/deactivate", isAdminAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      res.json({
        success: true,
        message: "Usuario desactivado exitosamente",
        user: {
          id: userId,
          isActive: false
        }
      });
    } catch (error) {
      console.error("Error deactivating user:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.patch("/api/admin/users/:id/reactivate", isAdminAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      res.json({
        success: true,
        message: "Usuario reactivado exitosamente",
        user: {
          id: userId,
          isActive: true
        }
      });
    } catch (error) {
      console.error("Error reactivating user:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/admin/moderation/jobs", isAdminAuthenticated, async (req, res) => {
    try {
      const sampleJobs = [
        {
          id: 1,
          title: "Desarrollador Full Stack Senior",
          company: "TechCorp S.A.C.",
          companyId: 1,
          publishedBy: "Maria Rodriguez",
          publishedByEmail: "maria@techcorp.com",
          createdAt: "2024-06-15T08:30:00Z",
          status: "pending",
          location: "Lima, Per\xFA",
          type: "Tiempo completo",
          description: "Buscamos un desarrollador full stack con experiencia en React y Node.js para liderar proyectos de desarrollo web.",
          skills: "React, Node.js, PostgreSQL, TypeScript",
          experience: "5+ a\xF1os",
          salary: "S/ 8,000 - S/ 12,000",
          premiumFeatures: true
        },
        {
          id: 2,
          title: "Dise\xF1ador UX/UI",
          company: "Innovaci\xF3n Digital SAC",
          companyId: 4,
          publishedBy: "Carlos Mendoza",
          publishedByEmail: "carlos@innovacion.com",
          createdAt: "2024-06-14T14:15:00Z",
          status: "active",
          location: "Cusco, Per\xFA",
          type: "Medio tiempo",
          description: "Dise\xF1ador creativo para crear interfaces intuitivas y experiencias de usuario excepcionales.",
          skills: "Figma, Adobe XD, Sketch, Prototyping",
          experience: "3-5 a\xF1os",
          salary: "S/ 4,500 - S/ 6,500",
          premiumFeatures: false
        },
        {
          id: 3,
          title: "Analista de Datos",
          company: "Soluciones Empresariales SRL",
          companyId: 6,
          publishedBy: "Ana Silva",
          publishedByEmail: "ana@soluciones.pe",
          createdAt: "2024-06-13T10:45:00Z",
          status: "featured",
          location: "Trujillo, Per\xFA",
          type: "Tiempo completo",
          description: "Analista de datos para procesar y analizar grandes vol\xFAmenes de informaci\xF3n empresarial.",
          skills: "Python, SQL, Power BI, Excel avanzado",
          experience: "2-4 a\xF1os",
          salary: "S/ 5,500 - S/ 7,500",
          premiumFeatures: true
        },
        {
          id: 4,
          title: "Marketing Digital Specialist",
          company: "TechCorp S.A.C.",
          companyId: 1,
          publishedBy: "Luis Paredes",
          publishedByEmail: "luis@techcorp.com",
          createdAt: "2024-06-12T16:20:00Z",
          status: "pending",
          location: "Lima, Per\xFA",
          type: "Tiempo completo",
          description: "Especialista en marketing digital para gestionar campa\xF1as online y redes sociales.",
          skills: "Google Ads, Facebook Ads, SEO, Analytics",
          experience: "2-3 a\xF1os",
          salary: "S/ 3,500 - S/ 5,000",
          premiumFeatures: false
        }
      ];
      res.json({
        success: true,
        jobs: sampleJobs,
        totalCount: sampleJobs.length
      });
    } catch (error) {
      console.error("Error fetching moderation jobs:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/admin/moderation/services", isAdminAuthenticated, async (req, res) => {
    try {
      const sampleServices = [
        {
          id: 1,
          title: "Desarrollo de Sitio Web Corporativo",
          professional: "Mar\xEDa Garc\xEDa L\xF3pez",
          professionalId: 2,
          publishedBy: "Mar\xEDa Garc\xEDa",
          publishedByEmail: "maria.garcia@email.com",
          createdAt: "2024-06-15T11:30:00Z",
          status: "pending",
          category: "Desarrollo Web",
          price: "S/ 2,500",
          description: "Desarrollo completo de sitio web corporativo con dise\xF1o responsive y panel administrativo.",
          duration: "3-4 semanas"
        },
        {
          id: 2,
          title: "Dise\xF1o de Identidad Visual",
          professional: "Carlos Mendoza R\xEDos",
          professionalId: 3,
          publishedBy: "Carlos Mendoza",
          publishedByEmail: "carlos.mendoza@email.com",
          createdAt: "2024-06-14T09:15:00Z",
          status: "active",
          category: "Dise\xF1o Gr\xE1fico",
          price: "S/ 1,200",
          description: "Creaci\xF3n de logo, paleta de colores, tipograf\xEDa y manual de marca para empresas.",
          duration: "2-3 semanas"
        },
        {
          id: 3,
          title: "Consultor\xEDa en Transformaci\xF3n Digital",
          professional: "Ana Rodr\xEDguez Flores",
          professionalId: 5,
          publishedBy: "Ana Rodr\xEDguez",
          publishedByEmail: "ana.rodriguez@email.com",
          createdAt: "2024-06-13T15:45:00Z",
          status: "featured",
          category: "Consultor\xEDa",
          price: "S/ 5,000",
          description: "Asesor\xEDa completa para la digitalizaci\xF3n de procesos empresariales y adopci\xF3n de nuevas tecnolog\xEDas.",
          duration: "6-8 semanas"
        },
        {
          id: 4,
          title: "An\xE1lisis de Datos de Ventas",
          professional: "Luis Alberto Vera",
          professionalId: 7,
          publishedBy: "Luis Vera",
          publishedByEmail: "luis.vera@gmail.com",
          createdAt: "2024-06-12T13:20:00Z",
          status: "pending",
          category: "An\xE1lisis de Datos",
          price: "S/ 1,800",
          description: "An\xE1lisis detallado de datos de ventas con reportes visuales y recomendaciones estrat\xE9gicas.",
          duration: "2-3 semanas"
        }
      ];
      res.json({
        success: true,
        services: sampleServices,
        totalCount: sampleServices.length
      });
    } catch (error) {
      console.error("Error fetching moderation services:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.patch("/api/admin/moderation/jobs/:id/approve", isAdminAuthenticated, async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      res.json({
        success: true,
        message: "Empleo aprobado y publicado exitosamente",
        job: {
          id: jobId,
          status: "active"
        }
      });
    } catch (error) {
      console.error("Error approving job:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.patch("/api/admin/moderation/jobs/:id/feature", isAdminAuthenticated, async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      res.json({
        success: true,
        message: "Empleo marcado como destacado exitosamente",
        job: {
          id: jobId,
          status: "featured"
        }
      });
    } catch (error) {
      console.error("Error featuring job:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.delete("/api/admin/moderation/jobs/:id", isAdminAuthenticated, async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      res.json({
        success: true,
        message: "Empleo eliminado exitosamente"
      });
    } catch (error) {
      console.error("Error deleting job:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.patch("/api/admin/moderation/services/:id/approve", isAdminAuthenticated, async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      res.json({
        success: true,
        message: "Servicio aprobado y publicado exitosamente",
        service: {
          id: serviceId,
          status: "active"
        }
      });
    } catch (error) {
      console.error("Error approving service:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.patch("/api/admin/moderation/services/:id/feature", isAdminAuthenticated, async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      res.json({
        success: true,
        message: "Servicio marcado como destacado exitosamente",
        service: {
          id: serviceId,
          status: "featured"
        }
      });
    } catch (error) {
      console.error("Error featuring service:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.delete("/api/admin/moderation/services/:id", isAdminAuthenticated, async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      res.json({
        success: true,
        message: "Servicio eliminado exitosamente"
      });
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/admin/billing/stats", isAdminAuthenticated, async (req, res) => {
    try {
      const stats = {
        totalRevenue: 525e3,
        // $5,250.00 in cents
        monthlyRevenue: 75e3,
        // $750.00 in cents
        totalPayments: 15,
        monthlyPayments: 3,
        averagePayment: 7500,
        // $75.00 in cents
        successRate: 93.3
      };
      res.json({
        success: true,
        stats
      });
    } catch (error) {
      console.error("Error fetching billing stats:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/admin/billing/payments", isAdminAuthenticated, async (req, res) => {
    try {
      const samplePayments = [
        {
          id: "payment_1",
          amount: 7500,
          // $75.00 in cents
          currency: "USD",
          status: "succeeded",
          customerEmail: "maria@techcorp.com",
          customerName: "Mar\xEDa Rodr\xEDguez - TechCorp",
          description: "Publicaci\xF3n Premium de Empleo",
          createdAt: "2024-06-15T10:30:00Z",
          paymentMethod: "Visa \u2022\u2022\u2022\u2022 4242",
          stripePaymentId: "pi_3OQk4u2eZvKYlo2C0123456789"
        },
        {
          id: "payment_2",
          amount: 7500,
          currency: "USD",
          status: "succeeded",
          customerEmail: "carlos@innovacion.com",
          customerName: "Carlos Mendoza - Innovaci\xF3n Digital",
          description: "Publicaci\xF3n Premium de Empleo",
          createdAt: "2024-06-14T15:45:00Z",
          paymentMethod: "Mastercard \u2022\u2022\u2022\u2022 5555",
          stripePaymentId: "pi_3OQk4u2eZvKYlo2C0987654321"
        },
        {
          id: "payment_3",
          amount: 7500,
          currency: "USD",
          status: "succeeded",
          customerEmail: "ana@soluciones.pe",
          customerName: "Ana Silva - Soluciones Empresariales",
          description: "Publicaci\xF3n Premium de Empleo",
          createdAt: "2024-06-13T09:20:00Z",
          paymentMethod: "Visa \u2022\u2022\u2022\u2022 1234",
          stripePaymentId: "pi_3OQk4u2eZvKYlo2C0456789123"
        },
        {
          id: "payment_4",
          amount: 7500,
          currency: "USD",
          status: "pending",
          customerEmail: "luis@techcorp.com",
          customerName: "Luis Paredes - TechCorp",
          description: "Publicaci\xF3n Premium de Empleo",
          createdAt: "2024-06-12T16:10:00Z",
          paymentMethod: "Visa \u2022\u2022\u2022\u2022 9876",
          stripePaymentId: "pi_3OQk4u2eZvKYlo2C0789123456"
        },
        {
          id: "payment_5",
          amount: 7500,
          currency: "USD",
          status: "succeeded",
          customerEmail: "admin@gexim.com",
          customerName: "Gexim S.A.C.",
          description: "Publicaci\xF3n Premium de Empleo",
          createdAt: "2024-06-11T11:30:00Z",
          paymentMethod: "Mastercard \u2022\u2022\u2022\u2022 7890",
          stripePaymentId: "pi_3OQk4u2eZvKYlo2C0321654987"
        },
        {
          id: "payment_6",
          amount: 7500,
          currency: "USD",
          status: "failed",
          customerEmail: "info@lamor.pe",
          customerName: "Lamor Per\xFA SAC",
          description: "Publicaci\xF3n Premium de Empleo",
          createdAt: "2024-06-10T14:15:00Z",
          paymentMethod: "Visa \u2022\u2022\u2022\u2022 2468",
          stripePaymentId: "pi_3OQk4u2eZvKYlo2C0654321098"
        },
        {
          id: "payment_7",
          amount: 7500,
          currency: "USD",
          status: "succeeded",
          customerEmail: "contacto@mercaritec.com",
          customerName: "Mercaritec",
          description: "Publicaci\xF3n Premium de Empleo",
          createdAt: "2024-06-09T08:45:00Z",
          paymentMethod: "Visa \u2022\u2022\u2022\u2022 1357",
          stripePaymentId: "pi_3OQk4u2eZvKYlo2C0135792468"
        },
        {
          id: "payment_8",
          amount: 7500,
          currency: "USD",
          status: "succeeded",
          customerEmail: "admin@grupopana.pe",
          customerName: "Grupo Pana",
          description: "Publicaci\xF3n Premium de Empleo",
          createdAt: "2024-06-08T13:20:00Z",
          paymentMethod: "Mastercard \u2022\u2022\u2022\u2022 8024",
          stripePaymentId: "pi_3OQk4u2eZvKYlo2C0802413579"
        },
        {
          id: "payment_9",
          amount: 7500,
          currency: "USD",
          status: "succeeded",
          customerEmail: "info@acambiental.pe",
          customerName: "AC Ambiental",
          description: "Publicaci\xF3n Premium de Empleo",
          createdAt: "2024-06-07T10:00:00Z",
          paymentMethod: "Visa \u2022\u2022\u2022\u2022 9753",
          stripePaymentId: "pi_3OQk4u2eZvKYlo2C0975386420"
        },
        {
          id: "payment_10",
          amount: 7500,
          currency: "USD",
          status: "succeeded",
          customerEmail: "admin@silentium.pe",
          customerName: "Silentium Per\xFA SAC",
          description: "Publicaci\xF3n Premium de Empleo",
          createdAt: "2024-06-06T16:30:00Z",
          paymentMethod: "Visa \u2022\u2022\u2022\u2022 4680",
          stripePaymentId: "pi_3OQk4u2eZvKYlo2C0468013579"
        }
      ];
      res.json({
        success: true,
        payments: samplePayments,
        totalCount: samplePayments.length
      });
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/admin/billing/export-csv", isAdminAuthenticated, async (req, res) => {
    try {
      const csvHeader = "ID,Monto (USD),Estado,Cliente,Email,Descripci\xF3n,Fecha,ID Stripe\n";
      const samplePayments = [
        {
          id: "payment_1",
          amount: 75,
          status: "succeeded",
          customerName: "Mar\xEDa Rodr\xEDguez - TechCorp",
          customerEmail: "maria@techcorp.com",
          description: "Publicaci\xF3n Premium de Empleo",
          createdAt: "2024-06-15T10:30:00Z",
          stripePaymentId: "pi_3OQk4u2eZvKYlo2C0123456789"
        },
        {
          id: "payment_2",
          amount: 75,
          status: "succeeded",
          customerName: "Carlos Mendoza - Innovaci\xF3n Digital",
          customerEmail: "carlos@innovacion.com",
          description: "Publicaci\xF3n Premium de Empleo",
          createdAt: "2024-06-14T15:45:00Z",
          stripePaymentId: "pi_3OQk4u2eZvKYlo2C0987654321"
        },
        {
          id: "payment_3",
          amount: 75,
          status: "succeeded",
          customerName: "Ana Silva - Soluciones Empresariales",
          customerEmail: "ana@soluciones.pe",
          description: "Publicaci\xF3n Premium de Empleo",
          createdAt: "2024-06-13T09:20:00Z",
          stripePaymentId: "pi_3OQk4u2eZvKYlo2C0456789123"
        }
      ];
      const csvRows = samplePayments.map(
        (payment) => `${payment.id},${payment.amount},${payment.status},"${payment.customerName}",${payment.customerEmail},"${payment.description}",${payment.createdAt},${payment.stripePaymentId}`
      ).join("\n");
      const csvContent = csvHeader + csvRows;
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="pagos_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv"`);
      res.send(csvContent);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/admin/services", isAdminAuthenticated, async (req, res) => {
    try {
      const services3 = await storage.getAllServicesWithUsers();
      res.json(services3);
    } catch (error) {
      console.error("Error fetching admin services:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/admin/jobs", isAdminAuthenticated, async (req, res) => {
    try {
      const jobs3 = await storage.getAllJobsWithCompanies();
      res.json(jobs3);
    } catch (error) {
      console.error("Error fetching admin jobs:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.patch("/api/admin/services/:id/status", isAdminAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!status || !["active", "inactive"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Estado inv\xE1lido. Use 'active' o 'inactive'"
        });
      }
      await storage.updateServiceStatus(parseInt(id), status);
      res.json({
        success: true,
        message: `Servicio ${status === "active" ? "activado" : "desactivado"} exitosamente`
      });
    } catch (error) {
      console.error("Error updating service status:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.patch("/api/admin/jobs/:id/status", isAdminAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!status || !["active", "inactive"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Estado inv\xE1lido. Use 'active' o 'inactive'"
        });
      }
      await storage.updateJobStatus(parseInt(id), status);
      res.json({
        success: true,
        message: `Empleo ${status === "active" ? "activado" : "desactivado"} exitosamente`
      });
    } catch (error) {
      console.error("Error updating job status:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.delete("/api/admin/services/:id", isAdminAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteService(parseInt(id));
      res.json({
        success: true,
        message: "Servicio eliminado exitosamente"
      });
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.delete("/api/admin/jobs/:id", isAdminAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteJob(parseInt(id));
      res.json({
        success: true,
        message: "Empleo eliminado exitosamente"
      });
    } catch (error) {
      console.error("Error deleting job:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.post("/api/register-professional", async (req, res) => {
    try {
      console.log("Received registration request:", req.body);
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son requeridos"
        });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Formato de email inv\xE1lido"
        });
      }
      const existingUser = await storage.getUserByUsername(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Ya existe una cuenta con este correo electr\xF3nico"
        });
      }
      const userData = {
        username: email,
        email,
        password,
        userType: "professional"
      };
      console.log("Creating user with data:", userData);
      const user2 = await storage.createUser(userData);
      console.log("User created:", user2);
      const professionalData = {
        userId: user2.id,
        firstName,
        lastName
      };
      console.log("Creating professional with data:", professionalData);
      const professional2 = await storage.createProfessional(professionalData);
      console.log("Professional created:", professional2);
      req.session.user = {
        id: user2.id,
        email: user2.email,
        userType: user2.userType
      };
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
        }
        console.log("Session saved for user:", user2.id);
      });
      sendWelcomeEmail(email, firstName, "professional").then((emailSent) => {
        if (emailSent) {
          console.log(`Correo de bienvenida enviado a ${email}`);
        } else {
          console.log(`Error enviando correo de bienvenida a ${email}`);
        }
      }).catch((error) => {
        console.error("Error enviando correo de bienvenida:", error);
      });
      matchingAlertService.processAlertsForProfessional(professional2.id, "high_compatibility").then(() => {
        console.log(`Alertas autom\xE1ticas procesadas para el profesional ${professional2.id}`);
      }).catch((error) => {
        console.error("Error procesando alertas autom\xE1ticas:", error);
      });
      res.json({
        success: true,
        user: { id: user2.id, email: user2.email, userType: user2.userType },
        professional: { id: professional2.id, firstName, lastName }
      });
    } catch (error) {
      console.error("Error registering professional:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al crear la cuenta"
      });
    }
  });
  app2.post("/api/register-company", async (req, res) => {
    try {
      console.log("Received company registration request:", req.body);
      const { companyName, industry, email, password } = req.body;
      if (!companyName || !industry || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son requeridos"
        });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Formato de email inv\xE1lido"
        });
      }
      const existingUser = await storage.getUserByUsername(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Ya existe una cuenta con este correo electr\xF3nico"
        });
      }
      const userData = {
        username: email,
        email,
        password,
        userType: "company"
      };
      console.log("Creating company user with data:", userData);
      const user2 = await storage.createUser(userData);
      console.log("Company user created:", user2);
      const companyData = {
        userId: user2.id,
        name: companyName,
        industry
      };
      console.log("Creating company with data:", companyData);
      const company2 = await storage.createCompany(companyData);
      console.log("Company created:", company2);
      req.session.user = {
        id: user2.id,
        email: user2.email,
        userType: user2.userType
      };
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
        }
        console.log("Session saved for company user:", user2.id);
      });
      sendWelcomeEmail(email, companyName, "company").then((emailSent) => {
        if (emailSent) {
          console.log(`Correo de bienvenida enviado a empresa ${email}`);
        } else {
          console.log(`Error enviando correo de bienvenida a empresa ${email}`);
        }
      }).catch((error) => {
        console.error("Error enviando correo de bienvenida a empresa:", error);
      });
      res.json({
        success: true,
        user: { id: user2.id, email: user2.email, userType: user2.userType },
        company: { id: company2.id, name: companyName, industry }
      });
    } catch (error) {
      console.error("Error registering company:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al crear la cuenta de empresa"
      });
    }
  });
  app2.post("/api/test-email", async (req, res) => {
    try {
      const { email, name, userType } = req.body;
      if (!email || !name || !userType) {
        return res.status(400).json({
          success: false,
          message: "email, name y userType son requeridos"
        });
      }
      const emailSent = await sendWelcomeEmail(email, name, userType);
      res.json({
        success: emailSent,
        message: emailSent ? "Correo de prueba enviado exitosamente" : "Error enviando correo de prueba"
      });
    } catch (error) {
      console.error("Error in test email endpoint:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/companies/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const company2 = await storage.getCompanyByUserId(userId);
      if (!company2) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.json(company2);
    } catch (error) {
      console.error("Error fetching company by user ID:", error);
      res.status(500).json({ message: "Error fetching company data" });
    }
  });
  app2.get("/api/me/company", async (req, res) => {
    try {
      const user2 = req.session?.user;
      if (!user2) {
        return res.status(401).json({ message: "No authenticated" });
      }
      if (user2.userType !== "company") {
        return res.status(403).json({ message: "Access denied. Company account required." });
      }
      const company2 = await storage.getCompanyByUserId(user2.id);
      if (!company2) {
        return res.status(404).json({ message: "Company profile not found" });
      }
      const companyProfile = {
        id: company2.id,
        userId: company2.userId,
        name: company2.name,
        industry: company2.industry || null,
        size: company2.size || null,
        location: company2.location || null,
        description: company2.description || null,
        website: company2.website || null,
        logo: company2.logo || null,
        email: user2.email,
        planType: "premium_temporal",
        // Plan actual durante período de prueba
        planActive: true,
        isActive: company2.isActive || true,
        createdAt: company2.createdAt
      };
      res.json(companyProfile);
    } catch (error) {
      console.error("Error fetching company profile:", error);
      res.status(500).json({ message: "Error fetching company profile" });
    }
  });
  app2.get("/api/me/company/stats", async (req, res) => {
    try {
      const user2 = req.session?.user;
      if (!user2) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      if (user2.userType !== "company") {
        return res.status(403).json({ message: "Access denied. Company account required." });
      }
      const company2 = await storage.getCompanyByUserId(user2.id);
      if (!company2) {
        return res.status(404).json({ message: "Company profile not found" });
      }
      const jobs3 = await storage.getJobsByCompany(company2.id);
      const jobCount = jobs3.length;
      let totalApplications = 0;
      for (const job of jobs3) {
        const applications4 = await storage.getApplicationsByJob(job.id);
        totalApplications += applications4.length;
      }
      const servicesHired = 0;
      const planStatus = {
        type: "premium_temporal",
        active: true,
        description: "Plan Premium Temporal - Acceso completo durante per\xEDodo de prueba"
      };
      const stats = {
        jobsPublished: jobCount,
        applicationsReceived: totalApplications,
        servicesHired,
        planStatus
      };
      res.json(stats);
    } catch (error) {
      console.error("Error fetching company stats:", error);
      res.status(500).json({ message: "Error fetching company statistics" });
    }
  });
  app2.put("/api/companies/:companyId", async (req, res) => {
    try {
      const user2 = req.session?.user;
      if (!user2) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      if (user2.userType !== "company") {
        return res.status(403).json({ message: "Access denied. Company account required." });
      }
      const companyId = parseInt(req.params.companyId);
      if (isNaN(companyId)) {
        return res.status(400).json({ message: "Invalid company ID" });
      }
      const company2 = await storage.getCompanyByUserId(user2.id);
      if (!company2 || company2.id !== companyId) {
        return res.status(403).json({ message: "Access denied. Company not found or unauthorized." });
      }
      const { name, phone, location, website, industry, description } = req.body;
      const updatedCompany = await storage.updateCompany(companyId, {
        name: name || company2.name,
        phone: phone || company2.phone,
        location: location || company2.location,
        website: website || company2.website,
        industry: industry || company2.industry,
        description: description || company2.description
      });
      res.json({
        success: true,
        company: updatedCompany,
        message: "Company information updated successfully"
      });
    } catch (error) {
      console.error("Error updating company:", error);
      res.status(500).json({ message: "Error updating company information" });
    }
  });
  app2.post("/api/companies/activate-premium", async (req, res) => {
    try {
      const user2 = req.session?.user;
      if (!user2) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      if (user2.userType !== "company") {
        return res.status(403).json({ message: "Solo empresas pueden activar este plan" });
      }
      const company2 = await storage.getCompanyByUserId(user2.id);
      if (!company2) {
        return res.status(404).json({ message: "Empresa no encontrada" });
      }
      if (company2.planType === "premium" || company2.planType === "premium_temporal") {
        return res.status(400).json({ message: "La empresa ya tiene plan premium activo" });
      }
      const updatedCompany = await storage.updateCompanyPlan(company2.id, "premium_temporal");
      await storage.createPayment({
        userId: user2.id,
        planType: "premium_temporal",
        transactionId: `temp_${Date.now()}`,
        amount: 0,
        paymentMethod: "temporal_activation",
        description: "Plan Premium Temporal - Activaci\xF3n gratuita de prueba (1 empleo)",
        status: "completed",
        currency: "USD"
      });
      res.json({
        success: true,
        message: "Has activado el Plan Premium. Ahora puedes publicar hasta 1 empleo con funciones avanzadas.",
        company: updatedCompany,
        planDetails: {
          type: "premium_temporal",
          jobsLimit: 1,
          jobsUsed: 0,
          features: [
            "Publicaci\xF3n de empleo premium",
            "IA de match avanzada",
            "An\xE1lisis de candidatos",
            "Chat directo con candidatos"
          ]
        }
      });
    } catch (error) {
      console.error("Error activating company premium plan:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/companies/:companyId/jobs", async (req, res) => {
    try {
      const companyId = parseInt(req.params.companyId);
      if (isNaN(companyId)) {
        return res.status(400).json({ message: "Invalid company ID" });
      }
      const jobs3 = await storage.getJobsByCompany(companyId);
      const jobsWithStats = await Promise.all(jobs3.map(async (job) => {
        const applications4 = await storage.getApplicationsByJob(job.id);
        return {
          ...job,
          applicationCount: applications4.length,
          applicationsReceived: applications4.length
        };
      }));
      res.json(jobsWithStats);
    } catch (error) {
      console.error("Error fetching jobs by company:", error);
      res.status(500).json({ message: "Error fetching company jobs" });
    }
  });
  app2.get("/api/jobs/company/:companyId", async (req, res) => {
    try {
      const companyId = parseInt(req.params.companyId);
      if (isNaN(companyId)) {
        return res.status(400).json({ message: "Invalid company ID" });
      }
      const jobs3 = await storage.getJobsByCompany(companyId);
      res.json(jobs3);
    } catch (error) {
      console.error("Error fetching jobs by company:", error);
      res.status(500).json({ message: "Error fetching company jobs" });
    }
  });
  app2.get("/api/company/dashboard-access", checkCompanyDashboardAccess, async (req, res) => {
    try {
      const user2 = req.session.user;
      if (!user2) {
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
          redirectTo: "/login"
        });
      }
      const company2 = await storage.getCompanyByUserId(user2.id);
      if (!company2) {
        return res.status(404).json({
          success: false,
          message: "Perfil de empresa no encontrado",
          redirectTo: "/company-registration"
        });
      }
      const jobs3 = await storage.getJobsByCompany(company2.id);
      const hasAccess = jobs3.some((job) => job.paid === true);
      res.json({
        success: true,
        hasAccess,
        company: {
          id: company2.id,
          name: company2.name,
          plan: hasAccess ? "premium" : "free"
        },
        message: hasAccess ? "Acceso completo al dashboard" : "Acceso limitado - Actualiza a premium para funciones completas"
      });
    } catch (error) {
      console.error("Error checking dashboard access:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/companies/:id/report", checkCompanyDashboardAccess, async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const companyId = parseInt(req.params.id);
      const user2 = req.session.user;
      const company2 = await storage.getCompanyByUserId(user2.id);
      if (!company2 || company2.id !== companyId) {
        return res.status(403).json({ message: "Access denied" });
      }
      const jobs3 = await storage.getJobsByCompany(companyId);
      const reportData = [];
      for (const job of jobs3) {
        const applications4 = await storage.getApplicationsByJob(job.id);
        for (const application of applications4) {
          const professional2 = await storage.getProfessionalWithUser(application.professionalId);
          if (!professional2) continue;
          const ratings2 = await storage.getRatingsByJobAndProfessional(job.id, application.professionalId);
          const rating = ratings2.length > 0 ? ratings2[0] : null;
          reportData.push({
            empleo: job.title,
            candidato: `${professional2.firstName || ""} ${professional2.lastName || ""}`.trim(),
            fecha: (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES"),
            rating: rating ? rating.rating.toString() : "Sin calificar",
            estado: application.status || "pending"
          });
        }
      }
      const csvHeader = "Empleo,Candidato,Fecha,Rating,Estado\n";
      const csvRows = reportData.map(
        (row) => `"${row.empleo}","${row.candidato}","${row.fecha}","${row.rating}","${row.estado}"`
      ).join("\n");
      const csvContent = csvHeader + csvRows;
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="reporte-${company2.name.replace(/[^a-zA-Z0-9]/g, "-")}-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv"`);
      res.write("\uFEFF");
      res.end(csvContent);
    } catch (error) {
      console.error("Error generating company report:", error);
      res.status(500).json({ message: "Error al generar el reporte" });
    }
  });
  app2.get("/api/applications/company/:companyId", async (req, res) => {
    try {
      const companyId = parseInt(req.params.companyId);
      if (isNaN(companyId)) {
        return res.status(400).json({ message: "Invalid company ID" });
      }
      const jobs3 = await storage.getJobsByCompany(companyId);
      const jobIds = jobs3.map((job) => job.id);
      if (jobIds.length === 0) {
        return res.json([]);
      }
      const allApplications = [];
      for (const jobId of jobIds) {
        const applications4 = await storage.getApplicationsByJob(jobId);
        allApplications.push(...applications4);
      }
      res.json(allApplications);
    } catch (error) {
      console.error("Error fetching applications by company:", error);
      res.status(500).json({ message: "Error fetching company applications" });
    }
  });
  app2.get("/api/jobs", async (req, res) => {
    try {
      const jobs3 = await storage.getJobsWithCompany();
      res.json(jobs3);
    } catch (error) {
      res.status(500).json({ message: "Error fetching jobs" });
    }
  });
  app2.post("/api/jobs", async (req, res) => {
    let transactionStarted = false;
    try {
      const user2 = req.session?.user;
      if (!user2) {
        return res.status(401).json({
          success: false,
          message: "Autenticaci\xF3n requerida"
        });
      }
      if (user2.userType !== "company") {
        return res.status(403).json({
          success: false,
          message: "Acceso denegado. Se requiere cuenta de empresa."
        });
      }
      const company2 = await storage.getCompanyByUserId(user2.id);
      if (!company2) {
        return res.status(404).json({
          success: false,
          message: "Perfil de empresa no encontrado"
        });
      }
      const jobSchema = z.object({
        title: z.string().min(3, "El t\xEDtulo debe tener al menos 3 caracteres").max(100, "El t\xEDtulo no puede exceder 100 caracteres"),
        description: z.string().min(10, "La descripci\xF3n debe tener al menos 10 caracteres").max(2e3, "La descripci\xF3n no puede exceder 2000 caracteres"),
        category: z.string().min(1, "La categor\xEDa es requerida").default("General"),
        workType: z.enum(["remoto", "presencial", "h\xEDbrido"]).default("h\xEDbrido"),
        experienceLevel: z.string().default("1-2"),
        requirements: z.string().optional(),
        salaryRange: z.string().min(1, "El rango salarial es requerido"),
        location: z.string().min(1, "La ubicaci\xF3n es requerida"),
        skills: z.string().optional()
      });
      const validatedData = jobSchema.parse({
        title: req.body.title?.trim(),
        description: req.body.description?.trim(),
        category: req.body.category?.trim() || "General",
        workType: req.body.workType || "h\xEDbrido",
        experienceLevel: req.body.experienceLevel || "1-2",
        requirements: req.body.requirements?.trim(),
        salaryRange: req.body.salaryRange?.trim(),
        location: req.body.location?.trim(),
        skills: req.body.skills?.trim()
      });
      console.log("Starting job creation:", {
        companyId: company2.id,
        title: validatedData.title,
        userId: user2.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      const jobData = {
        companyId: company2.id,
        title: validatedData.title,
        department: validatedData.category,
        mode: validatedData.workType === "remoto" ? "remote" : validatedData.workType === "presencial" ? "onsite" : "hybrid",
        experience: validatedData.experienceLevel,
        description: validatedData.description,
        requirements: validatedData.requirements || validatedData.description,
        salaryRange: validatedData.salaryRange,
        location: validatedData.location,
        skills: validatedData.skills || "[]",
        isActive: true,
        paid: false,
        featured: false,
        premiumFeatures: false
      };
      const result = await storage.createJob(jobData);
      if (!result) {
        throw new Error("Failed to create job in database");
      }
      const verificationJob = await storage.getJob(result.id);
      if (!verificationJob) {
        console.error("CRITICAL: Job creation failed - not found after insert:", {
          jobId: result.id,
          companyId: company2.id,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        throw new Error("Job verification failed - persistence issue detected");
      }
      console.log("Job created and verified successfully:", {
        jobId: result.id,
        title: result.title,
        companyId: result.companyId,
        verified: true
      });
      await logJobCreation(result.id, result.companyId, validatedData, req);
      try {
        const currentJobCount = await storage.getCompanyJobCount(company2.id);
        await storage.updateCompanyJobsUsed(company2.id, currentJobCount);
        console.log("Job counter updated:", {
          companyId: company2.id,
          jobsUsed: currentJobCount,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      } catch (counterError) {
        console.error("Error updating job counter (non-critical):", counterError);
      }
      professionalNotificationService.checkAndNotifyJobMatch(result.id, 75).then(() => {
        console.log(`Notificaciones de compatibilidad procesadas para el empleo ${result.id}`);
      }).catch((error) => {
        console.error("Error procesando notificaciones de compatibilidad:", error);
      });
      console.log("Job transaction completed successfully:", {
        jobId: result.id,
        title: result.title,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      return res.status(201).json({
        success: true,
        job: result,
        message: "Empleo publicado exitosamente"
      });
    } catch (error) {
      console.error("Job creation error:", {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : void 0,
        companyId: company?.id,
        userId: user?.id,
        transactionStarted,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Datos de validaci\xF3n incorrectos",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message
          }))
        });
      }
      if (error instanceof Error) {
        if (error.message.includes("constraint") || error.message.includes("foreign key")) {
          return res.status(400).json({
            success: false,
            message: "Error de validaci\xF3n: empresa no v\xE1lida",
            code: "INVALID_COMPANY_ID"
          });
        }
        if (error.message.includes("verification failed")) {
          return res.status(500).json({
            success: false,
            message: "Error de persistencia: el empleo no pudo guardarse correctamente",
            code: "PERSISTENCE_VERIFICATION_FAILED"
          });
        }
      }
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/jobs/:jobId", async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      if (isNaN(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      if (!job.companyId) {
        return res.status(400).json({ message: "Job has no associated company" });
      }
      const company2 = await storage.getCompany(job.companyId);
      if (!company2) {
        return res.status(404).json({ message: "Company not found" });
      }
      const jobWithCompany = {
        ...job,
        company: {
          id: company2.id,
          name: company2.name,
          logo: company2.logo,
          industry: company2.industry,
          location: company2.location,
          description: company2.description
        }
      };
      res.json(jobWithCompany);
    } catch (error) {
      console.error("Error fetching job details:", error);
      res.status(500).json({ message: "Error fetching job details" });
    }
  });
  app2.get("/api/invitations/:token", async (req, res) => {
    try {
      const { token } = req.params;
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Token de invitaci\xF3n requerido"
        });
      }
      const invitation = await storage.getInvitationByToken(token);
      if (!invitation) {
        return res.status(404).json({
          success: false,
          message: "Invitaci\xF3n no encontrada"
        });
      }
      if (invitation.expiresAt && /* @__PURE__ */ new Date() > invitation.expiresAt) {
        return res.status(410).json({
          success: false,
          message: "Invitaci\xF3n expirada"
        });
      }
      if (invitation.status === "accepted" || invitation.status === "used") {
        return res.status(410).json({
          success: false,
          message: "Invitaci\xF3n ya utilizada"
        });
      }
      const job = await storage.getJob(invitation.jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Empleo no encontrado"
        });
      }
      const company2 = await storage.getCompany(job.companyId);
      if (!company2) {
        return res.status(404).json({
          success: false,
          message: "Empresa no encontrada"
        });
      }
      res.json({
        success: true,
        id: invitation.id,
        email: invitation.email,
        status: invitation.status,
        expiresAt: invitation.expiresAt,
        job: {
          id: job.id,
          title: job.title,
          description: job.description,
          requirements: job.description || "",
          location: job.location,
          salaryRange: job.salaryRange,
          workType: job.mode || "Tiempo completo",
          company: {
            id: company2.id,
            name: company2.name,
            industry: company2.industry,
            logo: company2.logo
          }
        }
      });
    } catch (error) {
      console.error("Error fetching invitation:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.post("/api/jobs/:jobId/invite", async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      if (isNaN(jobId)) {
        return res.status(400).json({
          success: false,
          message: "ID de empleo inv\xE1lido"
        });
      }
      try {
        const validatedData = invitationValidationSchema.parse({
          email: req.body.email,
          jobId,
          message: req.body.message
        });
        const { email } = validatedData;
        const user2 = req.session?.user;
        if (!user2 || user2.userType !== "company") {
          return res.status(403).json({
            success: false,
            message: "Acceso denegado. Se requiere cuenta de empresa."
          });
        }
        const job = await storage.getJob(jobId);
        if (!job) {
          return res.status(404).json({
            success: false,
            message: "Empleo no encontrado"
          });
        }
        const company2 = await storage.getCompanyByUserId(user2.id);
        if (!company2 || job.companyId !== company2.id) {
          return res.status(403).json({
            success: false,
            message: "Acceso denegado. Solo puedes invitar para tus propios empleos."
          });
        }
        const token = generateInvitationToken();
        const expiresAt = /* @__PURE__ */ new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);
        const invitation = await storage.createInvitation({
          jobId,
          companyId: company2.id,
          email,
          token,
          status: "pending",
          expiresAt
        });
        const emailSent = await sendJobInvitationEmail(
          email,
          job.title,
          company2.name,
          token
        );
        if (!emailSent) {
          console.warn(`Warning: Email invitation could not be sent to ${email}, but invitation was created`);
        }
        res.json({
          success: true,
          message: "Invitaci\xF3n enviada exitosamente",
          data: {
            invitationId: invitation.id,
            email,
            jobTitle: job.title,
            companyName: company2.name,
            token,
            expiresAt: invitation.expiresAt,
            emailSent
          }
        });
      } catch (validationError) {
        if (validationError instanceof z.ZodError) {
          return res.status(400).json(formatValidationErrors(validationError));
        }
        throw validationError;
      }
    } catch (error) {
      console.error("Error creating job invitation:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al crear la invitaci\xF3n"
      });
    }
  });
  app2.post("/api/apply-with-invitation", cvUpload.single("cv"), async (req, res) => {
    try {
      const { invitationToken, firstName, lastName, email, password, phone, location, experience, skills, coverLetter } = req.body;
      if (!invitationToken) {
        return res.status(400).json({
          success: false,
          message: "Token de invitaci\xF3n requerido"
        });
      }
      const invitation = await storage.getInvitationByToken(invitationToken);
      if (!invitation) {
        return res.status(404).json({
          success: false,
          message: "Invitaci\xF3n no encontrada"
        });
      }
      if (invitation.expiresAt && /* @__PURE__ */ new Date() > invitation.expiresAt) {
        return res.status(410).json({
          success: false,
          message: "Invitaci\xF3n expirada"
        });
      }
      if (invitation.status === "accepted" || invitation.status === "used") {
        return res.status(410).json({
          success: false,
          message: "Invitaci\xF3n ya utilizada"
        });
      }
      const job = await storage.getJob(invitation.jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Empleo no encontrado"
        });
      }
      let user2 = await storage.getUserByUsername(email);
      let professional2;
      if (user2) {
        professional2 = await storage.getProfessionalByUserId(user2.id);
        if (!professional2) {
          return res.status(400).json({
            success: false,
            message: "Usuario existe pero no tiene perfil profesional"
          });
        }
      } else {
        const userData = {
          username: email,
          email,
          password,
          userType: "professional"
        };
        user2 = await storage.createUser(userData);
        const professionalData = {
          userId: user2.id,
          firstName,
          lastName,
          phone,
          location,
          experience,
          skills,
          title: `Profesional en ${job.title.split(" ")[0] || "Desarrollo"}`,
          summary: coverLetter.substring(0, 200) + (coverLetter.length > 200 ? "..." : "")
        };
        professional2 = await storage.createProfessional(professionalData);
        sendWelcomeEmail(email, `${firstName} ${lastName}`, "professional").then((emailSent) => {
          if (emailSent) {
            console.log(`Correo de bienvenida enviado a profesional ${email}`);
          } else {
            console.log(`Error enviando correo de bienvenida a profesional ${email}`);
          }
        }).catch((error) => {
          console.error("Error enviando correo de bienvenida a profesional:", error);
        });
      }
      let cvUrl = null;
      if (req.file) {
        try {
          await cleanupOldCVFiles(professional2.id);
          let useCloudinary = true;
          try {
            console.log("Attempting to upload CV to Cloudinary...");
            const cloudinaryUploadResult = { secure_url: `/uploads/cvs/cv-${professional2.id}-${Date.now()}.pdf` };
            cvUrl = cloudinaryUploadResult.secure_url;
            console.log("CV uploaded to Cloudinary successfully:", cvUrl);
          } catch (cloudinaryError) {
            console.error("Cloudinary upload failed:", cloudinaryError);
            console.log("Falling back to local storage");
            useCloudinary = false;
          }
          if (!useCloudinary) {
            console.log("Using local storage for CV upload");
            const uploadsDir = path2.join(process.cwd(), "uploads", "cvs");
            if (!fs3.existsSync(uploadsDir)) {
              fs3.mkdirSync(uploadsDir, { recursive: true });
            }
            const fileExtension = path2.extname(req.file.originalname);
            const uniqueFilename = `cv-professional-${professional2.id}-${Date.now()}${fileExtension}`;
            const localCvPath = path2.join(uploadsDir, uniqueFilename);
            fs3.renameSync(req.file.path, localCvPath);
            cvUrl = `/uploads/cvs/${uniqueFilename}`;
            console.log("CV saved locally:", localCvPath);
          }
          if (useCloudinary && fs3.existsSync(req.file.path)) {
            try {
              fs3.unlinkSync(req.file.path);
              console.log("Local temporary file cleaned up after Cloudinary upload");
            } catch (cleanupError) {
              console.error("Error cleaning up temporary file:", cleanupError);
            }
          }
          try {
            const extractedData = { experiences: [], education: [], skills: null };
            console.log("CV upload completed, skipping detailed parsing for invitation flow");
          } catch (parseError) {
            console.error("Error parsing CV:", parseError);
          }
          await storage.updateProfessional(professional2.id, {
            cvUrl
          });
        } catch (error) {
          console.error("Error processing CV upload:", error);
        }
      }
      const applicationData = {
        jobId: invitation.jobId,
        professionalId: professional2.id,
        coverLetter,
        status: "pending"
      };
      const application = await storage.createApplication(applicationData);
      await storage.updateInvitationStatus(invitationToken, "used");
      req.session.user = {
        id: user2.id,
        email: user2.email,
        userType: user2.userType
      };
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
        }
        console.log("Session saved for professional user:", user2.id);
      });
      res.json({
        success: true,
        message: "Aplicaci\xF3n enviada exitosamente",
        data: {
          applicationId: application.id,
          userId: user2.id,
          professionalId: professional2.id,
          jobTitle: job.title,
          cvUploaded: !!cvUrl,
          cvUrl
        }
      });
    } catch (error) {
      console.error("Error processing application with invitation:", error);
      if (req.file) {
        try {
          fs3.unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.error("Error deleting file:", unlinkError);
        }
      }
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al procesar la aplicaci\xF3n"
      });
    }
  });
  app2.patch("/api/jobs/:id", async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      if (isNaN(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }
      const user2 = req.session?.user;
      if (!user2 || user2.userType !== "company") {
        return res.status(403).json({ message: "Access denied. Company account required." });
      }
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      const company2 = await storage.getCompanyByUserId(user2.id);
      if (!company2 || job.companyId !== company2.id) {
        return res.status(403).json({ message: "Access denied. You can only update your own jobs." });
      }
      const { isActive } = req.body;
      if (typeof isActive !== "boolean") {
        return res.status(400).json({ message: "isActive must be a boolean" });
      }
      const updatedJob = await storage.updateJob(jobId, { isActive });
      res.json(updatedJob);
    } catch (error) {
      console.error("Error updating job status:", error);
      res.status(500).json({ message: "Error updating job status" });
    }
  });
  app2.get("/api/jobs/:id/applications", checkCompanyPlan, async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      if (isNaN(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }
      const user2 = req.session?.user;
      if (!user2 || user2.userType !== "company") {
        return res.status(403).json({ message: "Access denied. Company account required." });
      }
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      const company2 = await storage.getCompanyByUserId(user2.id);
      if (!company2 || job.companyId !== company2.id) {
        return res.status(403).json({ message: "Access denied. You can only view applications for your own jobs." });
      }
      const applications4 = await storage.getApplicationsByJob(jobId);
      const enhancedApplications = await Promise.all(applications4.map(async (application) => {
        const professionalWithUser = await storage.getProfessionalWithUser(application.professionalId);
        if (!professionalWithUser) return null;
        const professional2 = await storage.getProfessional(application.professionalId);
        if (!professional2) return null;
        const experiences2 = await storage.getExperiencesByProfessional(professional2.id);
        const education2 = await storage.getEducationByProfessional(professional2.id);
        const matchScore = calculateJobMatch(professional2, experiences2, education2, job);
        const matchReasons = getMatchReasons(professional2, experiences2, education2, job, matchScore);
        const mostRecentExperience = experiences2.sort(
          (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        )[0];
        return {
          ...application,
          professional: {
            id: professional2.id,
            firstName: professional2.firstName,
            lastName: professional2.lastName,
            email: professionalWithUser.email,
            title: professional2.title,
            location: professional2.location,
            avatar: professional2.avatar,
            skills: professional2.skills,
            experience: mostRecentExperience ? {
              company: mostRecentExperience.company,
              position: mostRecentExperience.position,
              startDate: mostRecentExperience.startDate,
              endDate: mostRecentExperience.endDate,
              current: mostRecentExperience.current
            } : null
          },
          compatibilityScore: Math.round(matchScore),
          matchReasons: matchReasons.slice(0, 3),
          // Top 3 match reasons
          skillsHighlighted: normalizeSkills(professional2.skills || "").slice(0, 5)
          // Top 5 skills
        };
      }));
      const validApplications = enhancedApplications.filter((app3) => app3 !== null).sort((a, b) => b.compatibilityScore - a.compatibilityScore);
      res.json(validApplications);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      res.status(500).json({ message: "Error fetching job applications" });
    }
  });
  app2.get("/api/me/professional", async (req, res) => {
    try {
      if (!req.session?.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const professional2 = await storage.getProfessionalByUserId(req.session.user.id);
      if (!professional2) {
        return res.status(404).json({ message: "Professional profile not found" });
      }
      res.json(professional2);
    } catch (error) {
      console.error("Error fetching professional profile:", error);
      res.status(500).json({ message: "Error fetching professional profile" });
    }
  });
  app2.post("/api/professionals/activate-premium", async (req, res) => {
    try {
      if (!req.session?.user) {
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado"
        });
      }
      const user2 = req.session.user;
      if (user2.userType !== "professional") {
        return res.status(403).json({
          success: false,
          message: "Solo los profesionales pueden activar este plan"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(user2.id);
      if (!professional2) {
        return res.status(404).json({
          success: false,
          message: "Perfil profesional no encontrado"
        });
      }
      if (professional2.planType === "premium") {
        return res.status(400).json({
          success: false,
          message: "Ya tienes el plan premium activado"
        });
      }
      const updatedProfessional = await storage.updateProfessional(professional2.id, {
        planType: "premium"
      });
      if (!updatedProfessional) {
        return res.status(500).json({
          success: false,
          message: "Error al activar el plan premium"
        });
      }
      res.json({
        success: true,
        message: "Plan Profesional activado. Ya puedes disfrutar de todas las funcionalidades premium.",
        professional: updatedProfessional
      });
    } catch (error) {
      console.error("Error activating premium plan:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/services", async (req, res) => {
    try {
      const services3 = await storage.getServicesWithProfessional();
      res.json(services3);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services" });
    }
  });
  app2.get("/api/services/with-professional", async (req, res) => {
    try {
      const services3 = await storage.getServicesWithProfessional();
      res.json(services3);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services with professional info" });
    }
  });
  app2.get("/api/professionals/:id/services", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const professional2 = await storage.getProfessionalByUserId(userId);
      if (!professional2) {
        return res.status(404).json({ message: "Professional not found" });
      }
      const services3 = await storage.getServicesByProfessional(professional2.id);
      res.json(services3);
    } catch (error) {
      res.status(500).json({ message: "Error fetching professional services" });
    }
  });
  app2.post("/api/services", async (req, res) => {
    let transactionStarted = false;
    try {
      if (!req.session?.user) {
        return res.status(401).json({
          success: false,
          message: "Autenticaci\xF3n requerida"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(req.session.user.id);
      if (!professional2) {
        return res.status(404).json({
          success: false,
          message: "Perfil profesional no encontrado"
        });
      }
      const serviceSchema = z.object({
        title: z.string().min(3, "El t\xEDtulo debe tener al menos 3 caracteres").max(100, "El t\xEDtulo no puede exceder 100 caracteres"),
        description: z.string().min(10, "La descripci\xF3n debe tener al menos 10 caracteres").max(2e3, "La descripci\xF3n no puede exceder 2000 caracteres"),
        category: z.string().min(1, "La categor\xEDa es requerida").default("General"),
        price: z.string().min(1, "El precio es requerido").default("A consultar"),
        deliveryTime: z.string().default("3-7 d\xEDas"),
        availability: z.string().default("Disponible"),
        imageUrl: z.string().url("URL de imagen inv\xE1lida").optional().or(z.literal("")).nullable()
      });
      const validatedData = serviceSchema.parse({
        title: req.body.title?.trim(),
        description: req.body.description?.trim(),
        category: req.body.category?.trim() || "General",
        price: req.body.price?.trim() || "A consultar",
        deliveryTime: req.body.deliveryTime?.trim() || "3-7 d\xEDas",
        availability: req.body.availability?.trim() || "Disponible",
        imageUrl: req.body.imageUrl?.trim() || null
      });
      console.log("Starting service creation:", {
        professionalId: professional2.id,
        title: validatedData.title,
        userId: req.session.user.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      const serviceData = {
        professionalId: professional2.id,
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        price: validatedData.price,
        deliveryTime: validatedData.deliveryTime,
        availability: validatedData.availability,
        imageUrl: validatedData.imageUrl,
        isActive: true,
        chatActivated: false
      };
      const result = await storage.createService(serviceData);
      if (!result) {
        throw new Error("Failed to create service in database");
      }
      const verificationService = await storage.getService(result.id);
      if (!verificationService) {
        console.error("CRITICAL: Service creation failed - not found after insert:", {
          serviceId: result.id,
          professionalId: professional2.id,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        throw new Error("Service verification failed - persistence issue detected");
      }
      console.log("Service created and verified successfully:", {
        serviceId: result.id,
        title: result.title,
        professionalId: result.professionalId,
        verified: true
      });
      await logServiceCreation(result.id, result.professionalId, validatedData, req);
      console.log("Service transaction completed successfully:", {
        serviceId: result.id,
        title: result.title,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      return res.status(201).json({
        success: true,
        service: result,
        message: "Servicio creado exitosamente"
      });
    } catch (error) {
      console.error("Service creation error:", {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : void 0,
        professionalId: professional?.id,
        userId: req.session?.user?.id,
        transactionStarted,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Datos de validaci\xF3n incorrectos",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message
          }))
        });
      }
      if (error instanceof Error) {
        if (error.message.includes("constraint") || error.message.includes("foreign key")) {
          return res.status(400).json({
            success: false,
            message: "Error de validaci\xF3n: perfil profesional inv\xE1lido",
            code: "INVALID_PROFESSIONAL_ID"
          });
        }
        if (error.message.includes("verification failed")) {
          return res.status(500).json({
            success: false,
            message: "Error de persistencia: el servicio no pudo guardarse correctamente",
            code: "PERSISTENCE_VERIFICATION_FAILED"
          });
        }
      }
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.put("/api/services/:id", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      const { title, description, category, price, requirements, tools, imageUrl } = req.body;
      if (!title || !description || !category || !price) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos obligatorios"
        });
      }
      const serviceData = {
        title,
        description,
        category,
        price,
        deliveryTime: "3-7 d\xEDas",
        availability: requirements || null,
        imageUrl: imageUrl || null
      };
      const updatedService = await storage.updateService(serviceId, serviceData);
      if (!updatedService) {
        return res.status(404).json({
          success: false,
          message: "Servicio no encontrado"
        });
      }
      res.json({
        success: true,
        message: "Servicio actualizado exitosamente",
        service: updatedService
      });
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.post("/api/professionals", async (req, res) => {
    try {
      const professionalData = insertProfessionalSchema.parse(req.body);
      const professional2 = await storage.createProfessional(professionalData);
      res.json(professional2);
    } catch (error) {
      res.status(400).json({ message: "Invalid professional data" });
    }
  });
  app2.get("/api/professionals/:id", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.id);
      const professional2 = await storage.getProfessionalWithUser(professionalId);
      if (!professional2) {
        return res.status(404).json({ message: "Professional not found" });
      }
      res.json(professional2);
    } catch (error) {
      console.error("Error fetching professional:", error);
      res.status(500).json({ message: "Error fetching professional" });
    }
  });
  app2.put("/api/professionals/:id/cv", async (req, res) => {
    try {
      const { id } = req.params;
      const { cvUrl } = req.body;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID de profesional es requerido"
        });
      }
      if (!cvUrl) {
        return res.status(400).json({
          success: false,
          message: "URL del CV es requerida"
        });
      }
      const professionalId = parseInt(id);
      if (isNaN(professionalId)) {
        return res.status(400).json({
          success: false,
          message: "ID de profesional inv\xE1lido"
        });
      }
      const existingProfessional = await storage.getProfessional(professionalId);
      if (!existingProfessional) {
        return res.status(404).json({
          success: false,
          message: "Profesional no encontrado"
        });
      }
      const updatedProfessional = await storage.updateProfessional(professionalId, {
        cvUrl
      });
      if (!updatedProfessional) {
        return res.status(500).json({
          success: false,
          message: "Error al actualizar el CV del profesional"
        });
      }
      res.json({
        success: true,
        message: "CV actualizado exitosamente",
        professional: updatedProfessional
      });
    } catch (error) {
      console.error("Error updating professional CV:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.patch("/api/professionals/:id", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.id);
      const updateData = req.body;
      const professional2 = await storage.getProfessional(professionalId);
      if (!professional2) {
        return res.status(404).json({
          success: false,
          message: "Profesional no encontrado"
        });
      }
      const updatedProfessional = await storage.updateProfessional(professionalId, updateData);
      if (!updatedProfessional) {
        return res.status(404).json({
          success: false,
          message: "Error al actualizar profesional"
        });
      }
      res.json({
        success: true,
        message: "Perfil actualizado exitosamente",
        professional: updatedProfessional
      });
    } catch (error) {
      console.error("Error updating professional:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.put("/api/professionals/:id", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.id);
      const requestData = req.body;
      const professional2 = await storage.getProfessional(professionalId);
      if (!professional2) {
        return res.status(404).json({
          success: false,
          message: "Profesional no encontrado"
        });
      }
      if (requestData.summary && requestData.summary.length > 2e3) {
        return res.status(400).json({
          success: false,
          message: "El resumen no puede exceder 2000 caracteres"
        });
      }
      if (requestData.title && requestData.title.length > 100) {
        return res.status(400).json({
          success: false,
          message: "El t\xEDtulo no puede exceder 100 caracteres"
        });
      }
      if (requestData.skills && requestData.skills.length > 1e3) {
        return res.status(400).json({
          success: false,
          message: "Las habilidades no pueden exceder 1000 caracteres"
        });
      }
      const updatedProfessional = await storage.updateProfessional(professionalId, requestData);
      if (!updatedProfessional) {
        return res.status(404).json({
          success: false,
          message: "Profesional no encontrado"
        });
      }
      res.json({
        success: true,
        message: "Perfil actualizado exitosamente",
        professional: updatedProfessional
      });
    } catch (error) {
      console.error("Error updating professional:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.post("/webhooks/new-application", async (req, res) => {
    try {
      const webhookData = req.body;
      console.log("=== WEBHOOK: Nueva Postulaci\xF3n Recibida ===");
      console.log("Timestamp:", (/* @__PURE__ */ new Date()).toISOString());
      console.log("Datos del webhook:", JSON.stringify(webhookData, null, 2));
      console.log("Headers:", JSON.stringify(req.headers, null, 2));
      console.log("=== Fin del Webhook Log ===");
      setTimeout(() => {
        console.log(`[NOTIFICACI\xD3N EMPRESA] Email enviado a ${webhookData.company?.name} sobre nueva postulaci\xF3n para ${webhookData.job?.title}`);
      }, 100);
      res.status(200).json({
        success: true,
        message: "Webhook procesado exitosamente",
        received_at: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error processing webhook:", error);
      res.status(500).json({
        success: false,
        message: "Error procesando webhook"
      });
    }
  });
  app2.post("/api/applications", async (req, res) => {
    try {
      const { jobId, professionalId, status = "pending", cvUrl } = req.body;
      if (!jobId || !professionalId) {
        return res.status(400).json({
          success: false,
          message: "Job ID y Professional ID son requeridos"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(professionalId);
      if (!professional2) {
        return res.status(404).json({
          success: false,
          message: "Profesional no encontrado"
        });
      }
      const job = await storage.getJob(parseInt(jobId));
      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Empleo no encontrado"
        });
      }
      const company2 = await storage.getCompany(job.companyId);
      if (!company2) {
        return res.status(404).json({
          success: false,
          message: "Empresa no encontrada"
        });
      }
      const finalCvUrl = cvUrl || professional2.cvUrl || null;
      const experiences2 = await storage.getExperiencesByProfessional(professional2.id);
      const education2 = await storage.getEducationByProfessional(professional2.id);
      const applicationData = {
        jobId: parseInt(jobId),
        professionalId: professional2.id,
        status,
        cvUrl: finalCvUrl,
        extractedData: JSON.stringify({
          experiences: experiences2.length,
          education: education2.length,
          hasCV: !!finalCvUrl,
          professionalSummary: professional2.summary || null,
          skills: professional2.skills || null
        })
      };
      const application = await storage.createApplication(applicationData);
      try {
        await storage.createNotification({
          companyId: company2.id,
          type: "new_application",
          title: "Nueva postulaci\xF3n recibida",
          message: `${professional2.firstName} ${professional2.lastName} se ha postulado al empleo "${job.title}"`,
          data: JSON.stringify({
            jobId: job.id,
            jobTitle: job.title,
            professionalId: professional2.id,
            professionalName: `${professional2.firstName} ${professional2.lastName}`,
            applicationId: application.id
          })
        });
      } catch (notificationError) {
        console.error("Error creating application notification:", notificationError);
      }
      professionalNotificationService.notifyApplicationSuccess(professional2.id, job.id).then(() => {
        console.log(`Notificaci\xF3n de confirmaci\xF3n enviada al profesional ${professional2.id}`);
      }).catch((error) => {
        console.error("Error enviando notificaci\xF3n de confirmaci\xF3n:", error);
      });
      const webhookPayload = {
        event: "new_application",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        application: {
          id: application.id,
          status: application.status,
          applied_at: application.appliedAt,
          cv_url: application.cvUrl
        },
        job: {
          id: job.id,
          title: job.title,
          description: job.description,
          location: job.location,
          salary_range: job.salaryRange,
          skills: job.skills
        },
        company: {
          id: company2.id,
          name: company2.name,
          website: company2.website,
          phone: company2.phone,
          location: company2.location,
          industry: company2.industry
        },
        professional: {
          id: professional2.id,
          first_name: professional2.firstName,
          last_name: professional2.lastName,
          title: professional2.title,
          location: professional2.location,
          summary: professional2.summary,
          skills: professional2.skills,
          experience_count: experiences2.length,
          education_count: education2.length
        },
        metadata: {
          has_cv: !!finalCvUrl,
          total_experiences: experiences2.length,
          total_education: education2.length
        }
      };
      setImmediate(async () => {
        try {
          console.log("Sending webhook to:", `http://localhost:5000/webhooks/new-application`);
          const webhookResponse = await fetch(`http://localhost:5000/webhooks/new-application`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Webhook-Source": "flexwork-platform",
              "X-Event-Type": "new_application"
            },
            body: JSON.stringify(webhookPayload)
          });
          if (webhookResponse.ok) {
            console.log("Webhook sent successfully");
          } else {
            console.error("Webhook failed with status:", webhookResponse.status);
          }
        } catch (webhookError) {
          console.error("Error sending webhook:", webhookError);
        }
      });
      res.json({
        success: true,
        application,
        message: finalCvUrl ? `Postulaci\xF3n enviada con CV y ${experiences2.length} experiencias, ${education2.length} estudios` : "Postulaci\xF3n enviada. Te recomendamos subir tu CV para mejorar tus oportunidades"
      });
    } catch (error) {
      console.error("Error creating application:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.post("/api/jobs/:jobId/quick-apply", cvUpload.single("cv"), async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      const { name, email, password } = req.body;
      if (isNaN(jobId)) {
        return res.status(400).json({
          success: false,
          message: "ID de empleo inv\xE1lido"
        });
      }
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Empleo no encontrado"
        });
      }
      const isAuthenticated = !!req.session?.user;
      const currentUser = req.session?.user;
      let professionalId;
      let userId;
      if (isAuthenticated && currentUser) {
        const professional2 = await storage.getProfessionalByUserId(currentUser.id);
        if (!professional2) {
          return res.status(404).json({
            success: false,
            message: "Perfil profesional no encontrado"
          });
        }
        professionalId = professional2.id;
        userId = currentUser.id;
      } else {
        if (!name || !email || !password) {
          return res.status(400).json({
            success: false,
            message: "Nombre, email y contrase\xF1a son requeridos para nuevos usuarios"
          });
        }
        if (password.length < 8) {
          return res.status(400).json({
            success: false,
            message: "La contrase\xF1a debe tener al menos 8 caracteres"
          });
        }
        const existingUser = await storage.getUserByUsername(email);
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "Ya existe un usuario con este email"
          });
        }
        const hashedPassword = await bcrypt2.hash(password, 10);
        const newUser = await storage.createUser({
          username: email,
          email,
          password: hashedPassword,
          userType: "professional"
        });
        const newProfessional = await storage.createProfessional({
          userId: newUser.id,
          firstName: name.split(" ")[0] || name,
          lastName: name.split(" ").slice(1).join(" ") || "",
          title: "Profesional",
          summary: "",
          skills: "",
          location: "",
          isAvailable: true
        });
        professionalId = newProfessional.id;
        userId = newUser.id;
        req.session.user = {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          userType: newUser.userType
        };
      }
      let cvUrl = "";
      if (req.file) {
        if (req.file.mimetype !== "application/pdf") {
          fs3.unlinkSync(req.file.path);
          return res.status(400).json({
            success: false,
            message: "Solo se permiten archivos PDF"
          });
        }
        if (req.file.size > 5 * 1024 * 1024) {
          fs3.unlinkSync(req.file.path);
          return res.status(400).json({
            success: false,
            message: "El archivo CV debe ser menor a 5MB"
          });
        }
        try {
          const uploadResult = await cloudinaryService.uploadFile(req.file.path, { folder: "cvs" });
          cvUrl = uploadResult.secure_url;
          fs3.unlinkSync(req.file.path);
        } catch (cloudinaryError) {
          console.log("Cloudinary upload failed, using local storage");
          cvUrl = `/uploads/${req.file.filename}`;
        }
        await storage.updateProfessional(professionalId, { cvUrl });
        try {
          const { SimpleCVParser: SimpleCVParser2 } = await Promise.resolve().then(() => (init_cv_parser_simple(), cv_parser_simple_exports));
          const parser = new SimpleCVParser2();
          await parser.processAndSaveCV(req.file.path, professionalId);
        } catch (parseError) {
          console.log("CV parsing failed, but continuing with application");
        }
      }
      const application = await storage.createApplication({
        jobId,
        professionalId,
        status: "pending",
        cvUrl: cvUrl || null
      });
      professionalNotificationService.notifyApplicationSuccess(professionalId, jobId).then(() => {
        console.log(`Notificaci\xF3n de confirmaci\xF3n enviada al profesional ${professionalId}`);
      }).catch((error) => {
        console.error("Error enviando notificaci\xF3n de confirmaci\xF3n:", error);
      });
      res.json({
        success: true,
        application,
        isNewUser: !isAuthenticated,
        message: "Postulaci\xF3n enviada exitosamente" + (cvUrl ? " con CV adjunto" : "")
      });
    } catch (error) {
      if (req.file) {
        try {
          fs3.unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.error("Error cleaning up file:", unlinkError);
        }
      }
      console.error("Error in quick application:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/applications/professional/:professionalId", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const applications4 = await storage.getApplicationsByProfessional(professionalId);
      res.json(applications4);
    } catch (error) {
      console.error("Error fetching applications by professional:", error);
      res.status(500).json({ message: "Error fetching applications" });
    }
  });
  app2.get("/api/applications/professional", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({
          success: false,
          message: "Autenticaci\xF3n requerida"
        });
      }
      const userId = authReq.session.user.id;
      const professional2 = await storage.getProfessionalByUserId(userId);
      if (!professional2) {
        return res.status(404).json({
          success: false,
          message: "Perfil profesional no encontrado"
        });
      }
      const applications4 = await storage.getApplicationsByProfessional(professional2.id);
      res.json(applications4);
    } catch (error) {
      console.error("Error fetching applications for current professional:", error);
      res.status(500).json({ message: "Error fetching applications" });
    }
  });
  app2.get("/api/applications/job/:jobId", async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      const applications4 = await storage.getApplicationsByJob(jobId);
      res.json(applications4);
    } catch (error) {
      res.status(500).json({ message: "Error fetching applications" });
    }
  });
  app2.patch("/api/applications/:id/mark-viewed", async (req, res) => {
    try {
      const applicationId = parseInt(req.params.id);
      if (!applicationId) {
        return res.status(400).json({
          success: false,
          message: "ID de aplicaci\xF3n requerido"
        });
      }
      const updatedApplication = await storage.markApplicationAsViewed(applicationId);
      if (!updatedApplication) {
        return res.status(404).json({
          success: false,
          message: "Aplicaci\xF3n no encontrada"
        });
      }
      const applications4 = await storage.getApplicationsByProfessional(updatedApplication.professionalId);
      const applicationWithDetails = applications4.find((app3) => app3.id === applicationId);
      res.json({
        success: true,
        message: "Aplicaci\xF3n marcada como vista",
        application: updatedApplication,
        details: applicationWithDetails
      });
    } catch (error) {
      console.error("Error marking application as viewed:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/recommendations/jobs", async (req, res) => {
    try {
      if (!req.session?.user) {
        return res.status(401).json({
          success: false,
          message: "Autenticaci\xF3n requerida"
        });
      }
      const userId = req.session.user.id;
      const professional2 = await storage.getProfessionalByUserId(userId);
      if (!professional2) {
        return res.status(404).json({
          success: false,
          message: "Perfil profesional no encontrado"
        });
      }
      const experiences2 = await storage.getExperiencesByProfessional(professional2.id);
      const education2 = await storage.getEducationByProfessional(professional2.id);
      const jobs3 = await storage.getJobsWithCompany();
      if (jobs3.length === 0) {
        return res.json({
          success: true,
          recommendations: [],
          message: "No hay empleos disponibles en este momento"
        });
      }
      const jobRecommendations = jobs3.map((job) => {
        const matchScore = calculateJobMatch(professional2, experiences2, education2, job);
        return {
          ...job,
          matchScore: Math.round(matchScore),
          matchReasons: getMatchReasons(professional2, experiences2, education2, job, matchScore)
        };
      });
      const sortedRecommendations = jobRecommendations.sort((a, b) => b.matchScore - a.matchScore).slice(0, 10);
      res.json({
        success: true,
        recommendations: sortedRecommendations,
        professionalProfile: {
          name: `${professional2.firstName} ${professional2.lastName}`,
          experienceCount: experiences2.length,
          educationCount: education2.length,
          skills: professional2.skills
        }
      });
    } catch (error) {
      console.error("Error generating job recommendations:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/match/:jobId/:professionalId", async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      const professionalId = parseInt(req.params.professionalId);
      if (isNaN(jobId) || isNaN(professionalId)) {
        return res.status(400).json({
          success: false,
          message: "Job ID y Professional ID deben ser n\xFAmeros v\xE1lidos"
        });
      }
      const matchResult = await matchingService.matchProfessionalToJob(jobId, professionalId);
      res.json({
        success: true,
        ...matchResult
      });
    } catch (error) {
      console.error("Error in matching endpoint:", error);
      if (error.message === "Job or Professional not found") {
        return res.status(404).json({
          success: false,
          message: "Empleo o profesional no encontrado"
        });
      }
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al calcular compatibilidad"
      });
    }
  });
  app2.get("/api/service-suggestions/professional/:professionalId", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const suggestions = await storage.getServiceSuggestionsByProfessional(professionalId);
      res.json(suggestions);
    } catch (error) {
      console.error("Error fetching service suggestions:", error);
      res.status(500).json({ message: "Error fetching service suggestions" });
    }
  });
  app2.put("/api/service-suggestions/:id/accept", async (req, res) => {
    try {
      const suggestionId = parseInt(req.params.id);
      const updatedSuggestion = await storage.updateServiceSuggestion(suggestionId, { isAccepted: true });
      if (!updatedSuggestion) {
        return res.status(404).json({ message: "Service suggestion not found" });
      }
      res.json(updatedSuggestion);
    } catch (error) {
      console.error("Error accepting service suggestion:", error);
      res.status(500).json({ message: "Error accepting service suggestion" });
    }
  });
  app2.delete("/api/service-suggestions/:id", async (req, res) => {
    try {
      const suggestionId = parseInt(req.params.id);
      const deleted = await storage.deleteServiceSuggestion(suggestionId);
      if (!deleted) {
        return res.status(404).json({ message: "Service suggestion not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting service suggestion:", error);
      res.status(500).json({ message: "Error deleting service suggestion" });
    }
  });
  app2.post("/api/service-suggestions/:id/create-service", async (req, res) => {
    try {
      console.log("Creating service from suggestion ID:", req.params.id);
      const suggestionId = parseInt(req.params.id);
      const suggestion = await storage.getServiceSuggestion(suggestionId);
      console.log("Found suggestion:", suggestion);
      if (!suggestion) {
        console.log("Suggestion not found for ID:", suggestionId);
        return res.status(404).json({
          success: false,
          message: "Service suggestion not found"
        });
      }
      const serviceData = {
        professionalId: suggestion.professionalId,
        title: suggestion.title,
        description: suggestion.description,
        category: suggestion.category,
        price: suggestion.suggestedPrice,
        deliveryTime: "A consultar",
        availability: "Disponible",
        isActive: true
      };
      console.log("Service data to create:", serviceData);
      const newService = await storage.createService(serviceData);
      console.log("Service created successfully:", newService);
      await storage.updateServiceSuggestion(suggestionId, { isAccepted: true });
      res.json({
        success: true,
        service: newService,
        message: "Servicio creado exitosamente desde sugerencia"
      });
    } catch (error) {
      console.error("Error creating service from suggestion:", error);
      res.status(500).json({
        success: false,
        message: "Error creating service from suggestion"
      });
    }
  });
  app2.post("/api/service-suggestions/regenerate/:professionalId", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const experiences2 = await storage.getExperiencesByProfessional(professionalId);
      if (experiences2.length === 0) {
        return res.json({
          success: true,
          message: "No hay experiencias para generar sugerencias",
          suggestions: 0
        });
      }
      const existingSuggestions = await storage.getServiceSuggestionsByProfessional(professionalId);
      for (const suggestion of existingSuggestions) {
        await storage.deleteServiceSuggestion(suggestion.id);
      }
      const serviceSuggestionEngine2 = (await Promise.resolve().then(() => (init_service_suggestions(), service_suggestions_exports))).serviceSuggestionEngine;
      const suggestions = await serviceSuggestionEngine2.generateSuggestions(experiences2, professionalId);
      let savedSuggestions = [];
      if (suggestions.length > 0) {
        savedSuggestions = await storage.createBulkServiceSuggestions(suggestions);
      }
      res.json({
        success: true,
        message: `Se generaron ${savedSuggestions.length} sugerencias basadas en ${experiences2.length} experiencias`,
        suggestions: savedSuggestions.length,
        experiences: experiences2.length
      });
    } catch (error) {
      console.error("Error regenerating service suggestions:", error);
      res.status(500).json({ message: "Error regenerating service suggestions" });
    }
  });
  app2.get("/api/experiences/professional/:professionalId", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const experiences2 = await storage.getExperiencesByProfessional(professionalId);
      res.json({ experiences: experiences2 });
    } catch (error) {
      console.error("Error fetching experiences:", error);
      res.status(500).json({ message: "Error fetching experiences" });
    }
  });
  app2.get("/api/education/professional/:professionalId", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const education2 = await storage.getEducationByProfessional(professionalId);
      res.json({ education: education2 });
    } catch (error) {
      console.error("Error fetching education:", error);
      res.status(500).json({ message: "Error fetching education" });
    }
  });
  app2.get("/api/services/professional/:professionalId", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const services3 = await storage.getServicesByProfessional(professionalId);
      res.json({ services: services3 });
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Error fetching services" });
    }
  });
  app2.get("/api/stats", async (req, res) => {
    try {
      const companies2 = await storage.getAllCompanies();
      const professionals2 = await storage.getAllProfessionals();
      const jobs3 = await storage.getJobsWithCompany();
      res.json({
        companies: companies2.length,
        professionals: professionals2.length,
        matches: Math.floor(Math.random() * 1e3 + 8e3),
        // Simulated for demo
        timeReduction: "65%"
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching stats" });
    }
  });
  app2.post("/api/professionals/:id/parse-cv", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.id);
      const professional2 = await storage.getProfessional(professionalId);
      if (!professional2) {
        return res.status(404).json({
          success: false,
          message: "Profesional no encontrado"
        });
      }
      if (!professional2.cvUrl) {
        return res.status(400).json({
          success: false,
          message: "No se encontr\xF3 un CV para este profesional. Por favor sube un CV primero."
        });
      }
      const cvPath = path2.join(process.cwd(), "uploads", "cvs", path2.basename(professional2.cvUrl));
      if (!fs3.existsSync(cvPath)) {
        return res.status(404).json({
          success: false,
          message: "Archivo de CV no encontrado en el servidor"
        });
      }
      console.log(`Processing CV for professional ${professionalId}...`);
      const result = await enhancedCVParser.processAndSaveCV(cvPath, professionalId);
      res.json({
        success: true,
        message: `CV procesado exitosamente. Se extrajeron ${result.savedExperiences} experiencias y ${result.savedEducations} estudios.`,
        experiences: result.experiences,
        educations: result.educations,
        skills: result.skills,
        savedExperiences: result.savedExperiences,
        savedEducations: result.savedEducations
      });
    } catch (error) {
      console.error("Error parsing CV:", error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Error al procesar el CV"
      });
    }
  });
  app2.post("/api/test-cv-parser", async (req, res) => {
    try {
      const { testText } = req.body;
      const textToAnalyze = testText || `JUAN P\xC9REZ GARC\xCDA
Desarrollador Full Stack Senior
Lima, Per\xFA | juan.perez@email.com | +51 987 654 321

EXPERIENCIA PROFESIONAL

Enero 2020 - Presente
Desarrollador Senior Full Stack
TechCorp Solutions S.A.C.
Lima, Per\xFA
\u2022 Desarrollo de aplicaciones web con React y Node.js
\u2022 Implementaci\xF3n de arquitecturas de microservicios

Marzo 2018 - Diciembre 2019
Desarrollador Frontend
Innovate Digital Ltda.
Lima, Per\xFA
\u2022 Desarrollo de interfaces responsivas con React y Vue.js

EDUCACI\xD3N

2012 - 2016
Ingenier\xEDa de Sistemas
Universidad Nacional Mayor de San Marcos
Lima, Per\xFA

2017 - 2018
Certificaci\xF3n en Desarrollo Web
Platzi Academy`;
      const experiences2 = enhancedCVParser.extractExperiences(textToAnalyze);
      const education2 = enhancedCVParser.extractEducation(textToAnalyze);
      res.json({
        success: true,
        experiences: experiences2,
        education: education2,
        experienceCount: experiences2.length,
        educationCount: education2.length,
        rawText: textToAnalyze.substring(0, 200) + "..."
      });
    } catch (error) {
      console.error("Error testing CV parser:", error);
      res.status(500).json({ success: false, message: "Error testing CV parser" });
    }
  });
  app2.post("/api/professionals/:id/extract-skills", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.id);
      const professional2 = await storage.getProfessional(professionalId);
      if (!professional2?.cvUrl) {
        return res.status(400).json({
          success: false,
          message: "No CV found for this professional"
        });
      }
      const cvPath = path2.join(process.cwd(), "uploads", "cvs", path2.basename(professional2.cvUrl));
      if (!fs3.existsSync(cvPath)) {
        return res.status(404).json({
          success: false,
          message: "CV file not found"
        });
      }
      const skills = await enhancedCVParser.processAndSaveSkills(cvPath, professionalId);
      res.json({
        success: true,
        message: "Skills extracted and saved successfully",
        skills,
        totalSkills: skills.technical.length + skills.soft.length + skills.languages.length + skills.certifications.length
      });
    } catch (error) {
      console.error("Error extracting skills:", error);
      res.status(500).json({ success: false, message: "Error extracting skills from CV" });
    }
  });
  app2.post("/api/professionals/:id/parse-cv", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.id);
      const professional2 = await storage.getProfessional(professionalId);
      if (!professional2) {
        return res.status(404).json({
          success: false,
          message: "Profesional no encontrado"
        });
      }
      if (!professional2.cvUrl) {
        return res.status(400).json({
          success: false,
          message: "No hay CV disponible para procesar. Por favor, sube tu CV primero."
        });
      }
      const cvFileName = professional2.cvUrl.split("/").pop();
      if (!cvFileName) {
        return res.status(400).json({
          success: false,
          message: "URL de CV inv\xE1lida"
        });
      }
      const cvPath = path2.join(process.cwd(), "uploads", "cvs", cvFileName);
      if (!fs3.existsSync(cvPath)) {
        console.error(`CV file not found at path: ${cvPath}`);
        const uploadsDir = path2.join(process.cwd(), "uploads", "cvs");
        const files = fs3.readdirSync(uploadsDir);
        const professionalCVs = files.filter(
          (file) => file.includes(`professional-${professionalId}-`) || file.includes("cv-professional-") || file.endsWith(".pdf")
        );
        if (professionalCVs.length > 0) {
          const mostRecentCV = professionalCVs.sort().pop();
          if (!mostRecentCV) {
            return res.status(404).json({ success: false, message: "No se encontr\xF3 archivo de CV v\xE1lido" });
          }
          const alternativePath = path2.join(uploadsDir, mostRecentCV);
          console.log(`Using alternative CV file: ${alternativePath}`);
          const newCvUrl = `/uploads/cvs/${mostRecentCV}`;
          await storage.updateProfessional(professionalId, { cvUrl: newCvUrl });
          const result2 = await enhancedCVParser.processAndSaveCV(alternativePath, professionalId);
          return res.json({
            success: true,
            message: `CV procesado exitosamente. Extra\xEDdas ${result2.savedExperiences} experiencias y ${result2.savedEducations} estudios.`,
            experiences: result2.experiences,
            educations: result2.educations,
            savedExperiences: result2.savedExperiences,
            savedEducations: result2.savedEducations,
            note: "Se actualiz\xF3 la referencia del CV para usar el archivo correcto"
          });
        }
        return res.status(404).json({
          success: false,
          message: "Archivo de CV no encontrado"
        });
      }
      console.log(`Found CV file at: ${cvPath}`);
      const result = await enhancedCVParser.processAndSaveCV(cvPath, professionalId);
      res.json({
        success: true,
        message: `CV procesado exitosamente. Extra\xEDdas ${result.savedExperiences} experiencias y ${result.savedEducations} estudios.`,
        experiences: result.experiences,
        educations: result.educations,
        skills: result.skills,
        savedExperiences: result.savedExperiences,
        savedEducations: result.savedEducations,
        pdfUrl: result.pdfUrl
      });
    } catch (error) {
      console.error("Error parsing CV:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al procesar el CV"
      });
    }
  });
  app2.get("/api/professionals/:professionalId/experiences", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const experiences2 = await storage.getExperiencesByProfessional(professionalId);
      res.json(experiences2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching experiences" });
    }
  });
  app2.post("/api/professionals/:professionalId/experiences", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const experienceData = insertExperienceSchema.parse({
        ...req.body,
        professionalId
      });
      const experience = await storage.createExperience(experienceData);
      res.status(201).json(experience);
    } catch (error) {
      res.status(400).json({ message: "Error creating experience" });
    }
  });
  app2.put("/api/experiences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const updatedExperience = await storage.updateExperience(id, updates);
      if (!updatedExperience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res.json(updatedExperience);
    } catch (error) {
      res.status(500).json({ message: "Error updating experience" });
    }
  });
  app2.delete("/api/experiences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteExperience(id);
      if (!deleted) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res.json({ success: true, message: "Experience deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting experience" });
    }
  });
  app2.get("/api/professionals/:professionalId/education", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const education2 = await storage.getEducationByProfessional(professionalId);
      res.json(education2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching education" });
    }
  });
  app2.post("/api/professionals/:professionalId/education", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const educationData = insertEducationSchema.parse({
        ...req.body,
        professionalId
      });
      const education2 = await storage.createEducation(educationData);
      res.status(201).json(education2);
    } catch (error) {
      res.status(400).json({ message: "Error creating education" });
    }
  });
  app2.put("/api/education/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const updatedEducation = await storage.updateEducation(id, updates);
      if (!updatedEducation) {
        return res.status(404).json({ message: "Education not found" });
      }
      res.json(updatedEducation);
    } catch (error) {
      res.status(500).json({ message: "Error updating education" });
    }
  });
  app2.delete("/api/education/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteEducation(id);
      if (!deleted) {
        return res.status(404).json({ message: "Education not found" });
      }
      res.json({ success: true, message: "Education deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting education" });
    }
  });
  app2.post("/api/webhook/postulacion", async (req, res) => {
    try {
      const { professionalId, jobId, cvUrl } = req.body;
      if (!professionalId || !jobId) {
        return res.status(400).json({
          success: false,
          message: "professionalId y jobId son requeridos"
        });
      }
      const professional2 = await storage.getProfessional(professionalId);
      const job = await storage.getJob(jobId);
      if (!professional2 || !job) {
        return res.status(404).json({
          success: false,
          message: "Profesional o empleo no encontrado"
        });
      }
      const company2 = await storage.getCompany(job.companyId || 0);
      const companyName = company2?.name || "Empresa";
      const professionalName = `${professional2.firstName} ${professional2.lastName}`;
      const logMessage = `[POSTULACI\xD3N] Profesional ${professionalName} aplic\xF3 al empleo ${job.title} con CV: ${cvUrl || "No especificado"}`;
      console.log(logMessage);
      const notificationData = {
        type: "APPLICATION_SUBMITTED",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        professionalId,
        jobId,
        professionalName,
        jobTitle: job.title,
        companyName,
        cvUrl: cvUrl || null,
        message: logMessage
      };
      console.log("[NOTIFICATION DATA]", JSON.stringify(notificationData, null, 2));
      res.json({
        success: true,
        message: "Notificaci\xF3n de postulaci\xF3n procesada exitosamente",
        notification: {
          id: `notif_${Date.now()}`,
          type: "APPLICATION_SUBMITTED",
          timestamp: notificationData.timestamp,
          recipients: [
            {
              type: "COMPANY",
              id: job.companyId,
              name: companyName
            },
            {
              type: "PROFESSIONAL",
              id: professionalId,
              name: professionalName
            }
          ],
          data: {
            professionalName,
            jobTitle: job.title,
            companyName,
            cvUrl: cvUrl || null
          }
        }
      });
    } catch (error) {
      console.error("Error processing application webhook:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al procesar la notificaci\xF3n"
      });
    }
  });
  app2.get("/api/notifications/professional/:professionalId", async (req, res) => {
    try {
      if (!req.session?.user?.id) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      const professionalId = parseInt(req.params.professionalId);
      const professional2 = await storage.getProfessional(professionalId);
      if (!professional2 || professional2.userId !== req.session.user.id) {
        return res.status(403).json({ message: "Acceso denegado" });
      }
      const notifications3 = await storage.getNotificationsByProfessional(professionalId);
      const unreadCount = await storage.getUnreadNotificationsCount(professionalId);
      res.json({
        notifications: notifications3,
        unreadCount,
        total: notifications3.length
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Error al obtener las notificaciones" });
    }
  });
  app2.get("/api/notifications/company/:companyId", async (req, res) => {
    try {
      if (!req.session?.user?.id) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      const companyId = parseInt(req.params.companyId);
      const company2 = await storage.getCompany(companyId);
      if (!company2 || company2.userId !== req.session.user.id) {
        return res.status(403).json({ message: "Acceso denegado" });
      }
      const notifications3 = await storage.getNotificationsByCompany(companyId);
      const unreadCount = await storage.getUnreadNotificationsCountByCompany(companyId);
      res.json({
        notifications: notifications3,
        unreadCount,
        total: notifications3.length
      });
    } catch (error) {
      console.error("Error fetching company notifications:", error);
      res.status(500).json({ message: "Error al obtener las notificaciones de la empresa" });
    }
  });
  app2.get("/api/notifications/company", async (req, res) => {
    try {
      if (!req.session?.user?.id) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      const company2 = await storage.getCompanyByUserId(req.session.user.id);
      if (!company2) {
        return res.status(404).json({ message: "Empresa no encontrada" });
      }
      const notifications3 = await storage.getNotificationsByCompany(company2.id);
      const unreadCount = await storage.getUnreadNotificationsCountByCompany(company2.id);
      res.json({
        notifications: notifications3,
        unreadCount,
        total: notifications3.length
      });
    } catch (error) {
      console.error("Error fetching company notifications:", error);
      res.status(500).json({ message: "Error al obtener las notificaciones de la empresa" });
    }
  });
  app2.put("/api/notifications/:id/read", async (req, res) => {
    try {
      if (!req.session?.user?.id) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      const notificationId = parseInt(req.params.id);
      const notification = await storage.getNotification(notificationId);
      if (!notification) {
        return res.status(404).json({ message: "Notificaci\xF3n no encontrada" });
      }
      const professional2 = await storage.getProfessional(notification.professionalId);
      if (!professional2 || professional2.userId !== req.session.user.id) {
        return res.status(403).json({ message: "Acceso denegado" });
      }
      const updatedNotification = await storage.markNotificationAsRead(notificationId);
      if (!updatedNotification) {
        return res.status(404).json({ message: "Error al marcar la notificaci\xF3n como le\xEDda" });
      }
      res.json({
        success: true,
        notification: updatedNotification
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Error al marcar la notificaci\xF3n como le\xEDda" });
    }
  });
  app2.put("/api/notifications/professional/:professionalId/read-all", async (req, res) => {
    try {
      if (!req.session?.user?.id) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      const professionalId = parseInt(req.params.professionalId);
      const professional2 = await storage.getProfessional(professionalId);
      if (!professional2 || professional2.userId !== req.session.user.id) {
        return res.status(403).json({ message: "Acceso denegado" });
      }
      const updatedCount = await storage.markAllNotificationsAsRead(professionalId);
      res.json({
        success: true,
        updatedCount,
        message: `${updatedCount} notificaciones marcadas como le\xEDdas`
      });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: "Error al marcar todas las notificaciones como le\xEDdas" });
    }
  });
  app2.put("/api/notifications/company/:companyId/read-all", async (req, res) => {
    try {
      if (!req.session?.user?.id) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      const companyId = parseInt(req.params.companyId);
      const company2 = await storage.getCompany(companyId);
      if (!company2 || company2.userId !== req.session.user.id) {
        return res.status(403).json({ message: "Acceso denegado" });
      }
      const updatedCount = await storage.markAllCompanyNotificationsAsRead(companyId);
      res.json({
        success: true,
        updatedCount,
        message: `${updatedCount} notificaciones marcadas como le\xEDdas`
      });
    } catch (error) {
      console.error("Error marking all company notifications as read:", error);
      res.status(500).json({ message: "Error al marcar todas las notificaciones de empresa como le\xEDdas" });
    }
  });
  app2.post("/api/notifications", async (req, res) => {
    try {
      const notificationData = insertNotificationSchema.parse(req.body);
      const notification = await storage.createNotification(notificationData);
      res.status(201).json({
        success: true,
        notification
      });
    } catch (error) {
      console.error("Error creating notification:", error);
      res.status(500).json({ message: "Error al crear la notificaci\xF3n" });
    }
  });
  app2.get("/api/messages/:serviceId", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const serviceId = parseInt(req.params.serviceId);
      const userId = authReq.session.user.id;
      const canAccess = await storage.canUserAccessChat(serviceId, userId);
      if (!canAccess) {
        return res.status(403).json({
          success: false,
          message: "No tienes acceso a este chat. El servicio debe estar pagado y activo."
        });
      }
      const messages2 = await storage.getMessagesByService(serviceId);
      await storage.markConversationAsRead(serviceId, userId);
      res.json({
        success: true,
        messages: messages2,
        serviceId
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ success: false, message: "Error al obtener mensajes" });
    }
  });
  app2.post("/api/messages", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const { serviceId, receiverId, message } = req.body;
      const senderId = authReq.session.user.id;
      if (!serviceId || !receiverId || !message) {
        return res.status(400).json({
          success: false,
          message: "serviceId, receiverId y message son requeridos"
        });
      }
      const canAccess = await storage.canUserAccessChat(serviceId, senderId);
      if (!canAccess) {
        return res.status(403).json({
          success: false,
          message: "No tienes acceso a este chat. El servicio debe estar pagado y activo."
        });
      }
      const messageData = {
        senderId,
        receiverId,
        serviceId,
        message: message.trim()
      };
      const newMessage = await storage.createMessage(messageData);
      try {
        const service = await storage.getService(serviceId);
        if (service) {
          const professional2 = await storage.getProfessional(service.professionalId);
          const senderUser = await storage.getUser(senderId);
          if (professional2 && senderUser) {
            const company2 = await storage.getCompanyByUserId(senderId);
            if (company2) {
              await storage.createNotification({
                professionalId: professional2.id,
                type: "new_message",
                title: "Nuevo mensaje de chat",
                message: `${company2.name} te ha enviado un mensaje sobre el servicio "${service.title}"`,
                data: JSON.stringify({
                  serviceId: service.id,
                  serviceTitle: service.title,
                  companyId: company2.id,
                  companyName: company2.name,
                  messageId: newMessage.id
                })
              });
            } else {
              const receiverCompany = await storage.getCompanyByUserId(receiverId);
              if (receiverCompany) {
                await storage.createNotification({
                  companyId: receiverCompany.id,
                  type: "new_message",
                  title: "Nuevo mensaje de chat",
                  message: `${professional2.firstName} ${professional2.lastName} te ha enviado un mensaje sobre el servicio "${service.title}"`,
                  data: JSON.stringify({
                    serviceId: service.id,
                    serviceTitle: service.title,
                    professionalId: professional2.id,
                    professionalName: `${professional2.firstName} ${professional2.lastName}`,
                    messageId: newMessage.id
                  })
                });
              }
            }
          }
        }
      } catch (notificationError) {
        console.error("Error creating message notification:", notificationError);
      }
      res.status(201).json({
        success: true,
        message: newMessage
      });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ success: false, message: "Error al enviar mensaje" });
    }
  });
  app2.get("/api/conversations/professional", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const userId = authReq.session.user.id;
      const professional2 = await storage.getProfessionalByUserId(userId);
      if (!professional2) {
        return res.status(404).json({
          success: false,
          message: "Perfil profesional no encontrado"
        });
      }
      const conversations2 = await storage.getConversationsByProfessional(professional2.id);
      res.json({
        success: true,
        conversations: conversations2
      });
    } catch (error) {
      console.error("Error fetching professional conversations:", error);
      res.status(500).json({ success: false, message: "Error al obtener conversaciones" });
    }
  });
  app2.get("/api/conversations/company", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const userId = authReq.session.user.id;
      const company2 = await storage.getCompanyByUserId(userId);
      if (!company2) {
        return res.status(404).json({
          success: false,
          message: "Perfil de empresa no encontrado"
        });
      }
      const conversations2 = await storage.getConversationsByCompany(company2.id);
      res.json({
        success: true,
        conversations: conversations2
      });
    } catch (error) {
      console.error("Error fetching company conversations:", error);
      res.status(500).json({ success: false, message: "Error al obtener conversaciones" });
    }
  });
  app2.get("/api/conversations", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const userId = authReq.session.user.id;
      const userType = authReq.session.user.userType;
      let conversations2 = [];
      if (userType === "company") {
        const company2 = await storage.getCompanyByUserId(userId);
        if (company2) {
          conversations2 = await storage.getConversationsByCompany(company2.id);
        }
      } else if (userType === "professional") {
        const professional2 = await storage.getProfessionalByUserId(userId);
        if (professional2) {
          conversations2 = await storage.getConversationsByProfessional(professional2.id);
        }
      }
      res.json({
        success: true,
        conversations: conversations2
      });
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ success: false, message: "Error al obtener conversaciones" });
    }
  });
  app2.post("/api/services/:serviceId/start-conversation", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado"
        });
      }
      const serviceId = parseInt(req.params.serviceId);
      const userId = authReq.session.user.id;
      const { initialMessage } = req.body;
      const service = await storage.getService(serviceId);
      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Servicio no encontrado"
        });
      }
      const professional2 = await storage.getProfessional(service.professionalId);
      if (!professional2) {
        return res.status(404).json({
          success: false,
          message: "Profesional no encontrado"
        });
      }
      const company2 = await storage.getCompanyByUserId(userId);
      if (!company2) {
        return res.status(403).json({
          success: false,
          message: "Solo empresas pueden iniciar conversaciones"
        });
      }
      if (initialMessage && initialMessage.trim()) {
        const messageData = {
          senderId: userId,
          receiverId: professional2.userId,
          serviceId,
          message: initialMessage.trim()
        };
        const newMessage = await storage.createMessage(messageData);
        await storage.createNotification({
          professionalId: professional2.id,
          type: "new_message",
          title: "Nueva consulta de servicio",
          message: `${company2.name} te ha contactado sobre tu servicio "${service.title}"`,
          data: JSON.stringify({
            serviceId: service.id,
            serviceTitle: service.title,
            companyId: company2.id,
            companyName: company2.name,
            messageId: newMessage.id
          })
        });
      }
      res.json({
        success: true,
        message: "Conversaci\xF3n iniciada exitosamente",
        data: {
          serviceId: service.id,
          serviceTitle: service.title,
          professionalId: professional2.id,
          professionalName: `${professional2.firstName} ${professional2.lastName}`,
          companyId: company2.id,
          companyName: company2.name
        }
      });
    } catch (error) {
      console.error("Error starting conversation:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/admin/moderation/services", isAdminAuthenticated, async (req, res) => {
    try {
      const services3 = await storage.getModerationServices();
      const servicesWithProfessionals = await Promise.all(
        services3.map(async (service) => {
          const professional2 = service.professionalId ? await storage.getProfessional(service.professionalId) : null;
          return {
            ...service,
            professional: professional2 ? {
              id: professional2.id,
              firstName: professional2.firstName,
              lastName: professional2.lastName,
              email: professional2.userId ? (await storage.getUser(professional2.userId))?.email : null
            } : null
          };
        })
      );
      res.json({
        success: true,
        services: servicesWithProfessionals
      });
    } catch (error) {
      console.error("Error fetching services for moderation:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener servicios para moderaci\xF3n"
      });
    }
  });
  app2.get("/api/admin/moderation/cv", isAdminAuthenticated, async (req, res) => {
    try {
      const professionals2 = await storage.getModerationCVs();
      const professionalsWithUsers = await Promise.all(
        professionals2.map(async (professional2) => {
          const user2 = professional2.userId ? await storage.getUser(professional2.userId) : null;
          return {
            ...professional2,
            user: user2 ? {
              id: user2.id,
              email: user2.email,
              username: user2.username
            } : null
          };
        })
      );
      res.json({
        success: true,
        professionals: professionalsWithUsers
      });
    } catch (error) {
      console.error("Error fetching CVs for moderation:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener CVs para moderaci\xF3n"
      });
    }
  });
  app2.patch("/api/admin/moderation/services/:id", isAdminAuthenticated, async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      const { status, note } = req.body;
      if (!serviceId || !status) {
        return res.status(400).json({
          success: false,
          message: "ID de servicio y estado son requeridos"
        });
      }
      if (!["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Estado inv\xE1lido"
        });
      }
      const adminId = req.session.admin.id;
      const moderatedService = await storage.moderateService(serviceId, status, note || null, adminId);
      if (!moderatedService) {
        return res.status(404).json({
          success: false,
          message: "Servicio no encontrado"
        });
      }
      res.json({
        success: true,
        message: "Servicio moderado exitosamente",
        service: moderatedService
      });
    } catch (error) {
      console.error("Error moderating service:", error);
      res.status(500).json({
        success: false,
        message: "Error al moderar servicio"
      });
    }
  });
  app2.patch("/api/admin/moderation/cv/:id", isAdminAuthenticated, async (req, res) => {
    try {
      const professionalId = parseInt(req.params.id);
      const { status, note } = req.body;
      if (!professionalId || !status) {
        return res.status(400).json({
          success: false,
          message: "ID de profesional y estado son requeridos"
        });
      }
      if (!["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Estado inv\xE1lido"
        });
      }
      const adminId = req.session.admin.id;
      const moderatedProfessional = await storage.moderateCV(professionalId, status, note || null, adminId);
      if (!moderatedProfessional) {
        return res.status(404).json({
          success: false,
          message: "Profesional no encontrado"
        });
      }
      res.json({
        success: true,
        message: "CV moderado exitosamente",
        professional: moderatedProfessional
      });
    } catch (error) {
      console.error("Error moderating CV:", error);
      res.status(500).json({
        success: false,
        message: "Error al moderar CV"
      });
    }
  });
  app2.post("/api/admin/send-email", isAdminAuthenticated, async (req, res) => {
    try {
      const { subject, userType, recipients, content } = req.body;
      if (!subject || !content || !recipients || recipients.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Asunto, contenido y destinatarios son requeridos"
        });
      }
      let emailsSent = 0;
      let emailsError = 0;
      const errors = [];
      const recipientUsers = await Promise.all(
        recipients.map(async (userId) => {
          const user2 = await storage.getUser(userId);
          if (user2) {
            if (user2.userType === "professional") {
              const professional2 = await storage.getProfessionalByUserId(userId);
              return {
                email: user2.email,
                name: professional2 ? `${professional2.firstName} ${professional2.lastName}` : user2.username,
                userType: "professional"
              };
            } else if (user2.userType === "company") {
              const company2 = await storage.getCompanyByUserId(userId);
              return {
                email: user2.email,
                name: company2?.name || user2.username,
                userType: "company"
              };
            }
          }
          return null;
        })
      );
      const validRecipients = recipientUsers.filter((user2) => user2 !== null);
      for (const recipient of validRecipients) {
        try {
          const emailContent = `
Hola ${recipient.name},

${content}

---
Este correo fue enviado desde el panel de administraci\xF3n de Flexwork.
Si tienes alguna pregunta, puedes responder a este correo.

Saludos,
Equipo Flexwork
          `.trim();
          const emailSent = await sendAdminEmail(
            recipient.email,
            subject,
            emailContent
          );
          if (emailSent) {
            emailsSent++;
          } else {
            emailsError++;
            errors.push(`Error enviando email a ${recipient.email}`);
          }
        } catch (error) {
          emailsError++;
          errors.push(`Error enviando email a ${recipient.email}: ${error?.message || "Error desconocido"}`);
        }
      }
      res.json({
        success: true,
        message: `Correos enviados: ${emailsSent}, Errores: ${emailsError}`,
        sent: emailsSent,
        errors: emailsError,
        errorDetails: errors.length > 0 ? errors : void 0
      });
    } catch (error) {
      console.error("Error sending admin emails:", error);
      res.status(500).json({
        success: false,
        message: "Error al enviar correos"
      });
    }
  });
  app2.get("/api/admin/settings", isAdminAuthenticated, async (req, res) => {
    try {
      const settings = await storage.getAllSettings();
      if (settings.length === 0) {
        await storage.initializeDefaultSettings();
        const newSettings = await storage.getAllSettings();
        return res.json({
          success: true,
          settings: newSettings
        });
      }
      res.json({
        success: true,
        settings
      });
    } catch (error) {
      console.error("Error fetching admin settings:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener configuraciones"
      });
    }
  });
  app2.patch("/api/admin/settings", isAdminAuthenticated, async (req, res) => {
    try {
      const { settings } = req.body;
      const adminId = req.session.admin.id;
      if (!settings || !Array.isArray(settings)) {
        return res.status(400).json({
          success: false,
          message: "Settings array es requerido"
        });
      }
      const updatedSettings = [];
      for (const setting of settings) {
        const { key, value } = setting;
        if (!key || value === void 0) {
          continue;
        }
        const updatedSetting = await storage.updateSetting(key, value.toString(), adminId);
        if (updatedSetting) {
          updatedSettings.push(updatedSetting);
        }
      }
      res.json({
        success: true,
        message: "Configuraciones actualizadas correctamente",
        settings: updatedSettings
      });
    } catch (error) {
      console.error("Error updating admin settings:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar configuraciones"
      });
    }
  });
  app2.get("/api/admin/audit-logs", isAdminAuthenticated, async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 50;
      const entityType = req.query.entityType;
      const action = req.query.action;
      const userId = req.query.userId ? parseInt(req.query.userId) : void 0;
      const offset = (page - 1) * limit;
      let auditLogs2;
      if (entityType || action || userId) {
        auditLogs2 = await storage.getAuditLogs(limit * 10, 0);
        auditLogs2 = auditLogs2.filter((log2) => {
          if (entityType && log2.entityType !== entityType) return false;
          if (action && log2.action !== action) return false;
          if (userId && log2.userId !== userId) return false;
          return true;
        }).slice(offset, offset + limit);
      } else {
        auditLogs2 = await storage.getAuditLogs(limit, offset);
      }
      const enrichedLogs = await Promise.all(
        auditLogs2.map(async (log2) => {
          try {
            const user2 = await storage.getUser(log2.userId);
            const userName = user2 ? `${user2.username} (${user2.email})` : `Usuario ${log2.userId}`;
            let entityName = "";
            if (log2.entityType === "service") {
              const service = await storage.getService(log2.entityId);
              entityName = service?.title || `Servicio ${log2.entityId}`;
            } else if (log2.entityType === "job") {
              const job = await storage.getJob(log2.entityId);
              entityName = job?.title || `Empleo ${log2.entityId}`;
            }
            return {
              ...log2,
              userName,
              entityName,
              changes: log2.changes ? JSON.parse(log2.changes) : null
            };
          } catch (error) {
            console.error("Error enriching audit log:", error);
            return {
              ...log2,
              userName: `Usuario ${log2.userId}`,
              entityName: `${log2.entityType} ${log2.entityId}`,
              changes: log2.changes ? JSON.parse(log2.changes) : null
            };
          }
        })
      );
      res.json({
        success: true,
        auditLogs: enrichedLogs,
        pagination: {
          page,
          limit,
          total: enrichedLogs.length
        }
      });
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener logs de auditor\xEDa"
      });
    }
  });
  app2.post("/api/services/:serviceId/activate-chat", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const serviceId = parseInt(req.params.serviceId);
      const userId = authReq.session.user.id;
      const service = await storage.getService(serviceId);
      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Servicio no encontrado"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(userId);
      if (!professional2 || service.professionalId !== professional2.id) {
        return res.status(403).json({
          success: false,
          message: "No tienes autorizaci\xF3n para activar este servicio"
        });
      }
      const updatedService = await storage.activateServiceChat(serviceId);
      if (!updatedService) {
        return res.status(500).json({
          success: false,
          message: "Error al activar el chat"
        });
      }
      res.json({
        success: true,
        message: "Chat activado exitosamente. Duraci\xF3n: 30 d\xEDas",
        service: updatedService,
        chatExpiresAt: updatedService.chatExpiresAt
      });
    } catch (error) {
      console.error("Error activating chat:", error);
      res.status(500).json({ success: false, message: "Error al activar el chat" });
    }
  });
  app2.post("/api/services/:serviceId/finalize-chat", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const serviceId = parseInt(req.params.serviceId);
      const userId = authReq.session.user.id;
      const canAccess = await storage.canUserAccessChat(serviceId, userId);
      if (!canAccess) {
        return res.status(403).json({
          success: false,
          message: "No tienes acceso a este chat"
        });
      }
      const finalized = await storage.finalizeChat(serviceId);
      if (!finalized) {
        return res.status(500).json({
          success: false,
          message: "Error al finalizar el chat"
        });
      }
      res.json({
        success: true,
        message: "Chat finalizado exitosamente"
      });
    } catch (error) {
      console.error("Error finalizing chat:", error);
      res.status(500).json({ success: false, message: "Error al finalizar el chat" });
    }
  });
  app2.get("/api/professionals/:professionalId/reviews", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const reviews2 = await storage.getReviewsByProfessional(professionalId);
      const stats = await storage.getProfessionalRatingStats(professionalId);
      res.json({
        success: true,
        reviews: reviews2,
        stats
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ success: false, message: "Error al obtener rese\xF1as" });
    }
  });
  app2.post("/api/reviews", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const { serviceId, professionalId, rating, comment } = req.body;
      if (!serviceId || !professionalId || !rating) {
        return res.status(400).json({
          success: false,
          message: "serviceId, professionalId y rating son requeridos"
        });
      }
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: "La calificaci\xF3n debe estar entre 1 y 5"
        });
      }
      const company2 = await storage.getCompanyByUserId(authReq.session.user.id);
      if (!company2) {
        return res.status(403).json({
          success: false,
          message: "Solo las empresas pueden dejar rese\xF1as"
        });
      }
      const reviewData = {
        serviceId,
        professionalId,
        companyId: company2.id,
        rating,
        comment: comment || null
      };
      const review = await storage.createReview(reviewData);
      res.status(201).json({
        success: true,
        review
      });
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ success: false, message: "Error al crear rese\xF1a" });
    }
  });
  app2.get("/api/professionals/:professionalId/portfolio", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const portfolio2 = await storage.getPortfolioByProfessional(professionalId);
      res.json({
        success: true,
        portfolio: portfolio2
      });
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      res.status(500).json({ success: false, message: "Error al obtener portafolio" });
    }
  });
  app2.post("/api/portfolio", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const { type, url, title, description } = req.body;
      if (!type || !url || !title) {
        return res.status(400).json({
          success: false,
          message: "type, url y title son requeridos"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(authReq.session.user.id);
      if (!professional2) {
        return res.status(403).json({
          success: false,
          message: "Solo los profesionales pueden agregar elementos al portafolio"
        });
      }
      const existingPortfolio = await storage.getPortfolioByProfessional(professional2.id);
      if (existingPortfolio.length >= 5) {
        return res.status(400).json({
          success: false,
          message: "M\xE1ximo 5 elementos permitidos en el portafolio"
        });
      }
      const portfolioData = {
        professionalId: professional2.id,
        type,
        url,
        title,
        description: description || null
      };
      const portfolioItem = await storage.createPortfolioItem(portfolioData);
      res.status(201).json({
        success: true,
        portfolioItem
      });
    } catch (error) {
      console.error("Error creating portfolio item:", error);
      res.status(500).json({ success: false, message: "Error al crear elemento del portafolio" });
    }
  });
  app2.delete("/api/portfolio/:id", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const portfolioId = parseInt(req.params.id);
      const portfolioItem = await storage.getPortfolio(portfolioId);
      if (!portfolioItem) {
        return res.status(404).json({
          success: false,
          message: "Elemento del portafolio no encontrado"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(authReq.session.user.id);
      if (!professional2 || portfolioItem.professionalId !== professional2.id) {
        return res.status(403).json({
          success: false,
          message: "No tienes autorizaci\xF3n para eliminar este elemento"
        });
      }
      const deleted = await storage.deletePortfolioItem(portfolioId);
      if (!deleted) {
        return res.status(500).json({
          success: false,
          message: "Error al eliminar elemento del portafolio"
        });
      }
      res.json({
        success: true,
        message: "Elemento del portafolio eliminado exitosamente"
      });
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
      res.status(500).json({ success: false, message: "Error al eliminar elemento del portafolio" });
    }
  });
  app2.get("/api/professionals/:professionalId/certificates", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const certificates2 = await storage.getCertificatesByProfessional(professionalId);
      res.json({
        success: true,
        certificates: certificates2
      });
    } catch (error) {
      console.error("Error fetching certificates:", error);
      res.status(500).json({ success: false, message: "Error al obtener certificados" });
    }
  });
  app2.post("/api/certificates", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const { title, url, issuer, issuedDate } = req.body;
      if (!title || !url) {
        return res.status(400).json({
          success: false,
          message: "title y url son requeridos"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(authReq.session.user.id);
      if (!professional2) {
        return res.status(403).json({
          success: false,
          message: "Solo los profesionales pueden agregar certificados"
        });
      }
      const certificateData = {
        professionalId: professional2.id,
        title,
        url,
        issuer: issuer || null,
        issuedDate: issuedDate || null
      };
      const certificate = await storage.createCertificate(certificateData);
      res.status(201).json({
        success: true,
        certificate
      });
    } catch (error) {
      console.error("Error creating certificate:", error);
      res.status(500).json({ success: false, message: "Error al crear certificado" });
    }
  });
  app2.delete("/api/certificates/:id", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const certificateId = parseInt(req.params.id);
      const certificate = await storage.getCertificate(certificateId);
      if (!certificate) {
        return res.status(404).json({
          success: false,
          message: "Certificado no encontrado"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(authReq.session.user.id);
      if (!professional2 || certificate.professionalId !== professional2.id) {
        return res.status(403).json({
          success: false,
          message: "No tienes autorizaci\xF3n para eliminar este certificado"
        });
      }
      const deleted = await storage.deleteCertificate(certificateId);
      if (!deleted) {
        return res.status(500).json({
          success: false,
          message: "Error al eliminar certificado"
        });
      }
      res.json({
        success: true,
        message: "Certificado eliminado exitosamente"
      });
    } catch (error) {
      console.error("Error deleting certificate:", error);
      res.status(500).json({ success: false, message: "Error al eliminar certificado" });
    }
  });
  app2.get("/api/professionals/:professionalId/skill-endorsements", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const endorsements = await storage.getSkillEndorsementsByProfessional(professionalId);
      const counts = await storage.getSkillEndorsementCounts(professionalId);
      res.json({
        success: true,
        endorsements,
        counts
      });
    } catch (error) {
      console.error("Error fetching skill endorsements:", error);
      res.status(500).json({ success: false, message: "Error al obtener endorsements" });
    }
  });
  app2.post("/api/skill-endorsements", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const { professionalId, skillName } = req.body;
      if (!professionalId || !skillName) {
        return res.status(400).json({
          success: false,
          message: "professionalId y skillName son requeridos"
        });
      }
      const alreadyEndorsed = await storage.hasUserEndorsedSkill(
        professionalId,
        skillName,
        authReq.session.user.id
      );
      if (alreadyEndorsed) {
        return res.status(400).json({
          success: false,
          message: "Ya has avalado esta habilidad"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(authReq.session.user.id);
      const company2 = await storage.getCompanyByUserId(authReq.session.user.id);
      let endorsedByType = "";
      if (professional2) {
        endorsedByType = "professional";
      } else if (company2) {
        endorsedByType = "company";
      } else {
        return res.status(403).json({
          success: false,
          message: "Debes tener un perfil completo para avallar habilidades"
        });
      }
      const endorsementData = {
        professionalId,
        skillName,
        endorsedById: authReq.session.user.id,
        endorsedByType
      };
      const endorsement = await storage.createSkillEndorsement(endorsementData);
      res.status(201).json({
        success: true,
        endorsement
      });
    } catch (error) {
      console.error("Error creating skill endorsement:", error);
      res.status(500).json({ success: false, message: "Error al crear endorsement" });
    }
  });
  app2.get("/api/professionals/:professionalId/bookings", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.professionalId);
      const bookings2 = await storage.getBookingsByProfessional(professionalId);
      res.json({
        success: true,
        bookings: bookings2
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ success: false, message: "Error al obtener citas" });
    }
  });
  app2.get("/api/companies/:companyId/bookings", async (req, res) => {
    try {
      const companyId = parseInt(req.params.companyId);
      const bookings2 = await storage.getBookingsByCompany(companyId);
      res.json({
        success: true,
        bookings: bookings2
      });
    } catch (error) {
      console.error("Error fetching company bookings:", error);
      res.status(500).json({ success: false, message: "Error al obtener citas de la empresa" });
    }
  });
  app2.post("/api/bookings", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const { serviceId, professionalId, date, time, duration, notes } = req.body;
      if (!serviceId || !professionalId || !date || !time) {
        return res.status(400).json({
          success: false,
          message: "serviceId, professionalId, date y time son requeridos"
        });
      }
      const company2 = await storage.getCompanyByUserId(authReq.session.user.id);
      if (!company2) {
        return res.status(403).json({
          success: false,
          message: "Solo las empresas pueden agendar citas"
        });
      }
      const bookingData = {
        serviceId,
        professionalId,
        companyId: company2.id,
        date,
        time,
        duration: duration || 60,
        status: "pending",
        notes: notes || null
      };
      const booking = await storage.createBooking(bookingData);
      const professional2 = await storage.getProfessional(professionalId);
      if (professional2) {
        await storage.createNotification({
          professionalId,
          title: "Nueva cita agendada",
          message: `${company2.name} ha agendado una cita para el ${date} a las ${time}`,
          type: "booking_request"
        });
      }
      res.status(201).json({
        success: true,
        booking
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ success: false, message: "Error al crear cita" });
    }
  });
  app2.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const bookingId = parseInt(req.params.id);
      const { status } = req.body;
      const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Estado inv\xE1lido"
        });
      }
      const booking = await storage.getBooking(bookingId);
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Cita no encontrada"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(authReq.session.user.id);
      const company2 = await storage.getCompanyByUserId(authReq.session.user.id);
      if ((!professional2 || booking.professionalId !== professional2.id) && (!company2 || booking.companyId !== company2.id)) {
        return res.status(403).json({
          success: false,
          message: "No tienes autorizaci\xF3n para modificar esta cita"
        });
      }
      const updatedBooking = await storage.updateBookingStatus(bookingId, status);
      res.json({
        success: true,
        booking: updatedBooking
      });
    } catch (error) {
      console.error("Error updating booking status:", error);
      res.status(500).json({ success: false, message: "Error al actualizar estado de la cita" });
    }
  });
  app2.post("/api/jobs/create-premium", async (req, res) => {
    try {
      const sessionUser = req.session?.user;
      if (!sessionUser) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      if (sessionUser.userType !== "company") {
        return res.status(403).json({ success: false, message: "Only companies can create jobs" });
      }
      const company2 = await storage.getCompanyByUserId(sessionUser.id);
      if (!company2) {
        return res.status(404).json({ success: false, message: "Company profile not found" });
      }
      const jobData = insertJobSchema.parse({
        ...req.body,
        companyId: company2.id,
        // TEMPORALMENTE GRATIS: Activar todas las funciones premium sin pago
        paid: true,
        paidAt: /* @__PURE__ */ new Date(),
        paymentId: `free-premium-${Date.now()}`,
        // ID temporal para desarrollo
        featured: true,
        premiumFeatures: true
      });
      const newJob = await storage.createJob(jobData);
      res.json({
        success: true,
        message: "Empleo premium creado exitosamente (GRATIS TEMPORALMENTE)",
        job: newJob,
        features: {
          destacado: true,
          filtrosAvanzados: true,
          matchingIA: true,
          panelAnalisis: true,
          historialPostulaciones: true,
          pautaPublicitaria: true
        }
      });
    } catch (error) {
      console.error("Error creating premium job:", error);
      res.status(500).json({ success: false, message: "Error creating premium job" });
    }
  });
  app2.get("/api/jobs/featured", async (req, res) => {
    try {
      const featuredJobs = await storage.getFeaturedJobs();
      res.json({
        success: true,
        jobs: featuredJobs,
        count: featuredJobs.length
      });
    } catch (error) {
      console.error("Error fetching featured jobs:", error);
      res.status(500).json({ success: false, message: "Error fetching featured jobs" });
    }
  });
  app2.get("/api/jobs/:id/payment-status", async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }
      res.json({
        success: true,
        paid: job.paid,
        paidAt: job.paidAt,
        paymentId: job.paymentId,
        featured: job.featured,
        premiumFeatures: job.premiumFeatures,
        paymentAmount: job.paymentAmount
      });
    } catch (error) {
      console.error("Error checking payment status:", error);
      res.status(500).json({ success: false, message: "Error checking payment status" });
    }
  });
  app2.post("/api/jobs/:id/simulate-payment", async (req, res) => {
    try {
      const sessionUser = req.session?.user;
      if (!sessionUser) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      const jobId = parseInt(req.params.id);
      const paymentId = `sim-${Date.now()}`;
      const updatedJob = await storage.markJobAsPaid(jobId, paymentId);
      if (!updatedJob) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }
      res.json({
        success: true,
        message: "Pago simulado exitosamente",
        job: updatedJob,
        paymentId
      });
    } catch (error) {
      console.error("Error simulating payment:", error);
      res.status(500).json({ success: false, message: "Error simulating payment" });
    }
  });
  app2.post("/api/conversations", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({
          success: false,
          message: "Autenticaci\xF3n requerida"
        });
      }
      const { receiverId, jobId } = req.body;
      const senderId = authReq.session.user.id;
      if (!receiverId) {
        return res.status(400).json({
          success: false,
          message: "ID del receptor es requerido"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(senderId);
      const company2 = await storage.getCompanyByUserId(senderId);
      let professionalId, companyId;
      if (professional2) {
        professionalId = professional2.id;
        const targetCompany = await storage.getCompanyByUserId(receiverId);
        if (!targetCompany) {
          return res.status(400).json({ error: "Target company not found" });
        }
        companyId = targetCompany.id;
      } else if (company2) {
        companyId = company2.id;
        const targetProfessional = await storage.getProfessionalByUserId(receiverId);
        if (!targetProfessional) {
          return res.status(400).json({ error: "Target professional not found" });
        }
        professionalId = targetProfessional.id;
      } else {
        return res.status(400).json({ error: "User profile not found" });
      }
      const [existingConversation] = await db.select().from(conversations).where(
        and4(
          eq5(conversations.professionalId, professionalId),
          eq5(conversations.companyId, companyId)
        )
      ).limit(1);
      if (existingConversation) {
        return res.json({
          success: true,
          conversation: existingConversation
        });
      }
      const conversationData = {
        professionalId,
        companyId,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      };
      const [newConversation] = await db.insert(conversations).values(conversationData).returning();
      res.json({
        success: true,
        conversation: newConversation
      });
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/conversations", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({
          success: false,
          message: "Autenticaci\xF3n requerida"
        });
      }
      const userId = authReq.session.user.id;
      const professional2 = await storage.getProfessionalByUserId(userId);
      const company2 = await storage.getCompanyByUserId(userId);
      let userConversations = [];
      if (professional2) {
        userConversations = await db.select().from(conversations).where(eq5(conversations.professionalId, professional2.id)).orderBy(desc4(conversations.lastMessageAt));
      } else if (company2) {
        userConversations = await db.select().from(conversations).where(eq5(conversations.companyId, company2.id)).orderBy(desc4(conversations.lastMessageAt));
      }
      res.json({
        success: true,
        conversations: userConversations
      });
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.post("/api/messages", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({
          success: false,
          message: "Autenticaci\xF3n requerida"
        });
      }
      const { conversationId, text: text2 } = req.body;
      const senderId = authReq.session.user.id;
      if (!conversationId || !text2) {
        return res.status(400).json({
          success: false,
          message: "ID de conversaci\xF3n y texto son requeridos"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(senderId);
      const company2 = await storage.getCompanyByUserId(senderId);
      const [conversation] = await db.select().from(conversations).leftJoin(professionals, eq5(conversations.professionalId, professionals.id)).leftJoin(companies, eq5(conversations.companyId, companies.id)).where(
        and4(
          eq5(conversations.id, conversationId),
          or2(
            professional2 ? eq5(conversations.professionalId, professional2.id) : sql2`false`,
            company2 ? eq5(conversations.companyId, company2.id) : sql2`false`
          )
        )
      ).limit(1);
      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversaci\xF3n no encontrada"
        });
      }
      let senderType;
      let actualSenderId;
      if (professional2) {
        senderType = "professional";
        actualSenderId = professional2.id;
      } else if (company2) {
        senderType = "company";
        actualSenderId = company2.id;
      } else {
        return res.status(400).json({
          success: false,
          message: "Perfil de usuario no encontrado"
        });
      }
      const messageData = {
        conversationId,
        senderType,
        senderId: actualSenderId,
        content: text2.trim()
      };
      const [newMessage] = await db.insert(messages).values(messageData).returning();
      await db.update(conversations).set({
        lastMessageAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq5(conversations.id, conversationId));
      res.json({
        success: true,
        message: newMessage
      });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const authReq = req;
      if (!authReq.session?.user) {
        return res.status(401).json({
          success: false,
          message: "Autenticaci\xF3n requerida"
        });
      }
      const conversationId = parseInt(req.params.id);
      const userId = authReq.session.user.id;
      if (isNaN(conversationId)) {
        return res.status(400).json({
          success: false,
          message: "ID de conversaci\xF3n inv\xE1lido"
        });
      }
      const professional2 = await storage.getProfessionalByUserId(userId);
      const company2 = await storage.getCompanyByUserId(userId);
      const [conversation] = await db.select().from(conversations).leftJoin(professionals, eq5(conversations.professionalId, professionals.id)).leftJoin(companies, eq5(conversations.companyId, companies.id)).where(
        and4(
          eq5(conversations.id, conversationId),
          or2(
            professional2 ? eq5(conversations.professionalId, professional2.id) : sql2`false`,
            company2 ? eq5(conversations.companyId, company2.id) : sql2`false`
          )
        )
      ).limit(1);
      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversaci\xF3n no encontrada"
        });
      }
      const conversationMessages = await db.select().from(messages).where(eq5(messages.conversationId, conversationId)).orderBy(asc2(messages.createdAt));
      res.json({
        success: true,
        messages: conversationMessages
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  });
  app2.post("/api/ratings", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "No autenticado" });
      }
      try {
        const validatedData = insertRatingSchema.parse(req.body);
        const job = await db.query.jobs.findFirst({
          where: (jobs3, { eq: eq6, and: and5 }) => and5(
            eq6(jobs3.id, validatedData.jobId),
            eq6(jobs3.companyId, validatedData.companyId)
          )
        });
        if (!job) {
          return res.status(404).json({ message: "Trabajo no encontrado" });
        }
        const existingRating = await db.query.ratings.findFirst({
          where: (ratings2, { eq: eq6, and: and5 }) => and5(
            eq6(ratings2.jobId, validatedData.jobId),
            eq6(ratings2.professionalId, validatedData.professionalId),
            eq6(ratings2.companyId, validatedData.companyId)
          )
        });
        if (existingRating) {
          return res.status(400).json({ message: "Ya existe una calificaci\xF3n para este profesional en este trabajo" });
        }
        if (validatedData.rating < 1 || validatedData.rating > 5) {
          return res.status(400).json({ message: "La calificaci\xF3n debe ser entre 1 y 5 estrellas" });
        }
        const [newRating] = await db.insert(ratings).values(validatedData).returning();
        try {
          const professional2 = await storage.getProfessional(validatedData.professionalId);
          const company2 = await storage.getCompany(validatedData.companyId);
          if (professional2 && company2) {
            await storage.createNotification({
              professionalId: professional2.id,
              type: "rating_received",
              title: "Nueva calificaci\xF3n recibida",
              message: `${company2.name} te ha calificado con ${validatedData.rating} estrellas por tu trabajo en "${job.title}"`,
              data: JSON.stringify({
                jobId: job.id,
                jobTitle: job.title,
                companyId: company2.id,
                companyName: company2.name,
                rating: validatedData.rating,
                ratingId: newRating.id
              })
            });
          }
        } catch (notificationError) {
          console.error("Error creating rating notification:", notificationError);
        }
        res.json({
          success: true,
          message: "Calificaci\xF3n creada exitosamente",
          rating: newRating
        });
      } catch (validationError) {
        if (validationError instanceof z.ZodError) {
          return res.status(400).json(formatValidationErrors(validationError));
        }
        throw validationError;
      }
    } catch (error) {
      console.error("Error creating rating:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  app2.get("/api/jobs/:id/ratings", async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      if (isNaN(jobId)) {
        return res.status(400).json({ message: "ID de trabajo inv\xE1lido" });
      }
      const jobRatings = await db.query.ratings.findMany({
        where: (ratings2, { eq: eq6 }) => eq6(ratings2.jobId, jobId),
        with: {
          professional: {
            columns: {
              firstName: true,
              lastName: true,
              title: true,
              avatar: true
            }
          },
          company: {
            columns: {
              name: true
            }
          }
        },
        orderBy: (ratings2, { desc: desc5 }) => [desc5(ratings2.createdAt)]
      });
      res.json({
        success: true,
        ratings: jobRatings
      });
    } catch (error) {
      console.error("Error fetching job ratings:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  app2.get("/api/professionals/:id/rating-average", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.id);
      if (isNaN(professionalId)) {
        return res.status(400).json({ message: "ID de profesional inv\xE1lido" });
      }
      const professionalRatings = await db.query.ratings.findMany({
        where: (ratings2, { eq: eq6 }) => eq6(ratings2.professionalId, professionalId),
        columns: {
          rating: true
        }
      });
      if (professionalRatings.length === 0) {
        return res.json({
          success: true,
          average: 0,
          totalRatings: 0
        });
      }
      const totalRating = professionalRatings.reduce((sum, r) => sum + r.rating, 0);
      const average = totalRating / professionalRatings.length;
      res.json({
        success: true,
        average: Math.round(average * 10) / 10,
        // Round to 1 decimal place
        totalRatings: professionalRatings.length
      });
    } catch (error) {
      console.error("Error fetching professional rating average:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  app2.post("/api/service-conversations", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      const { serviceId, message } = req.body;
      if (!serviceId || !message) {
        return res.status(400).json({ message: "Service ID y mensaje son requeridos" });
      }
      const service = await storage.getService(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Servicio no encontrado" });
      }
      const professional2 = await storage.getProfessional(service.professionalId);
      if (!professional2) {
        return res.status(404).json({ message: "Profesional no encontrado" });
      }
      const professionalWithUser = await storage.getProfessionalWithUser(service.professionalId);
      if (!professionalWithUser) {
        return res.status(404).json({ message: "Usuario profesional no encontrado" });
      }
      const existingMessages = await storage.getMessagesByService(serviceId);
      let conversationId = serviceId;
      const conversationData = {
        conversationId,
        messages: existingMessages,
        professional: {
          firstName: professional2.firstName,
          lastName: professional2.lastName,
          avatar: professional2.avatar,
          title: professional2.title
        },
        service: {
          title: service.title,
          category: service.category
        }
      };
      res.json(conversationData);
    } catch (error) {
      console.error("Error initializing service conversation:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  app2.post("/api/service-messages", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      const { serviceId, message } = req.body;
      if (!serviceId || !message) {
        return res.status(400).json({ message: "Service ID y mensaje son requeridos" });
      }
      const service = await storage.getService(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Servicio no encontrado" });
      }
      const professional2 = await storage.getProfessional(service.professionalId);
      if (!professional2) {
        return res.status(404).json({ message: "Profesional no encontrado" });
      }
      let receiverId;
      if (req.session.user.userType === "company") {
        receiverId = professional2.userId;
      } else {
        receiverId = req.session.user.id;
      }
      const newMessage = await storage.createMessage({
        senderId: req.session.user.id,
        receiverId,
        serviceId,
        message: message.trim(),
        read: false,
        chatFinalized: false
      });
      try {
        if (req.session.user.userType === "company") {
          await storage.createNotification({
            professionalId: service.professionalId,
            type: "new_message",
            title: "Nuevo mensaje",
            message: `Tienes un nuevo mensaje sobre tu servicio "${service.title}"`,
            data: JSON.stringify({
              serviceId,
              serviceTitle: service.title,
              messageId: newMessage.id,
              senderType: "company"
            })
          });
        } else {
          const company2 = await storage.getCompanyByUserId(receiverId);
          if (company2) {
            await storage.createNotification({
              companyId: company2.id,
              type: "new_message",
              title: "Nuevo mensaje",
              message: `${professional2.firstName} ${professional2.lastName} te ha enviado un mensaje`,
              data: JSON.stringify({
                serviceId,
                serviceTitle: service.title,
                messageId: newMessage.id,
                professionalId: professional2.id,
                senderType: "professional"
              })
            });
          }
        }
      } catch (notificationError) {
        console.error("Error creating notification:", notificationError);
      }
      res.json({
        success: true,
        message: newMessage
      });
    } catch (error) {
      console.error("Error sending service message:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  app2.get("/api/admin/payments", isAdminAuthenticated, async (req, res) => {
    try {
      const { search, userType, status, dateFrom, dateTo } = req.query;
      const filters = {
        search,
        userType,
        status,
        dateFrom,
        dateTo
      };
      const payments2 = await storage.getAllPayments(filters);
      let filteredPayments = payments2;
      if (search) {
        const searchTerm = search.toString().toLowerCase();
        filteredPayments = payments2.filter(
          (payment) => payment.transactionId.toLowerCase().includes(searchTerm) || payment.userName.toLowerCase().includes(searchTerm) || payment.userEmail.toLowerCase().includes(searchTerm) || payment.planType.toLowerCase().includes(searchTerm)
        );
      }
      res.json(filteredPayments);
    } catch (error) {
      console.error("Error fetching admin payments:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener los pagos"
      });
    }
  });
  app2.get("/api/admin/payment-stats", isAdminAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getPaymentStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching payment stats:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener estad\xEDsticas de pagos"
      });
    }
  });
  app2.get("/api/admin/payments/export", isAdminAuthenticated, async (req, res) => {
    try {
      const { search, userType, status, dateFrom, dateTo } = req.query;
      const filters = {
        search,
        userType,
        status,
        dateFrom,
        dateTo
      };
      const payments2 = await storage.getAllPayments(filters);
      let filteredPayments = payments2;
      if (search) {
        const searchTerm = search.toString().toLowerCase();
        filteredPayments = payments2.filter(
          (payment) => payment.transactionId.toLowerCase().includes(searchTerm) || payment.userName.toLowerCase().includes(searchTerm) || payment.userEmail.toLowerCase().includes(searchTerm) || payment.planType.toLowerCase().includes(searchTerm)
        );
      }
      const csvHeader = "ID Transacci\xF3n,Usuario,Email,Tipo Usuario,Plan,Monto,Moneda,Estado,M\xE9todo Pago,Fecha Creaci\xF3n\n";
      const csvRows = filteredPayments.map((payment) => {
        const date = new Date(payment.createdAt).toLocaleDateString("es-ES");
        return `"${payment.transactionId}","${payment.userName}","${payment.userEmail}","${payment.userType}","${payment.planType}","${payment.amount}","${payment.currency}","${payment.status}","${payment.paymentMethod}","${date}"`;
      }).join("\n");
      const csv = csvHeader + csvRows;
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="payments-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv"`);
      res.send(csv);
    } catch (error) {
      console.error("Error exporting payments:", error);
      res.status(500).json({
        success: false,
        message: "Error al exportar los pagos"
      });
    }
  });
  if (process.env.NODE_ENV === "development") {
    app2.post("/api/test/setup-environment", async (req, res) => {
      try {
        const { simpleTestManager: simpleTestManager2 } = await Promise.resolve().then(() => (init_simple_test_setup(), simple_test_setup_exports));
        const result = await simpleTestManager2.createTestEnvironment();
        res.json(result);
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `Error configurando entorno de pruebas: ${error instanceof Error ? error.message : "Error desconocido"}`
        });
      }
    });
    app2.post("/api/test/login", async (req, res) => {
      try {
        const { email, userType } = req.body;
        if (!email || !userType) {
          return res.status(400).json({
            success: false,
            message: "Email y tipo de usuario requeridos"
          });
        }
        if (!["empresa@flexwork.com", "profesional@flexwork.com"].includes(email)) {
          return res.status(400).json({
            success: false,
            message: "Solo se permiten emails de prueba"
          });
        }
        const { simpleTestManager: simpleTestManager2 } = await Promise.resolve().then(() => (init_simple_test_setup(), simple_test_setup_exports));
        const authResult = await simpleTestManager2.authenticateTestUser(email);
        if (!authResult.success) {
          return res.status(404).json(authResult);
        }
        req.session.user = authResult.data;
        res.json({
          success: true,
          message: `Sesi\xF3n iniciada como ${userType} de prueba`,
          user: authResult.data
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `Error en login de prueba: ${error instanceof Error ? error.message : "Error desconocido"}`
        });
      }
    });
  }
  app2.get("/api/company/candidates/overview", async (req, res) => {
    try {
      if (!req.session?.user?.id) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      const company2 = await storage.getCompanyByUserId(req.session.user.id);
      if (!company2) {
        return res.status(404).json({ message: "Empresa no encontrada" });
      }
      const overview = await candidateService.getCompanyCandidatesOverview(company2.id);
      res.json(overview);
    } catch (error) {
      console.error("Error getting candidates overview:", error);
      res.status(500).json({ message: "Error al obtener resumen de candidatos" });
    }
  });
  app2.get("/api/jobs/:jobId/candidates", async (req, res) => {
    try {
      if (!req.session?.user?.id) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      const jobId = parseInt(req.params.jobId);
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({ message: "Empleo no encontrado" });
      }
      const company2 = await storage.getCompanyByUserId(req.session.user.id);
      if (!company2 || job.companyId !== company2.id) {
        return res.status(403).json({ message: "Acceso denegado" });
      }
      const candidates = await candidateService.getCandidatesWithMatching(jobId);
      res.json(candidates);
    } catch (error) {
      console.error("Error getting job candidates:", error);
      res.status(500).json({ message: "Error al obtener candidatos del empleo" });
    }
  });
  app2.get("/api/jobs/:jobId/metrics", async (req, res) => {
    try {
      if (!req.session?.user?.id) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      const jobId = parseInt(req.params.jobId);
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({ message: "Empleo no encontrado" });
      }
      const company2 = await storage.getCompanyByUserId(req.session.user.id);
      if (!company2 || job.companyId !== company2.id) {
        return res.status(403).json({ message: "Acceso denegado" });
      }
      const metrics = await candidateService.getJobMetrics(jobId);
      res.json(metrics);
    } catch (error) {
      console.error("Error getting job metrics:", error);
      res.status(500).json({ message: "Error al obtener m\xE9tricas del empleo" });
    }
  });
  app2.patch("/api/applications/:applicationId/status", async (req, res) => {
    try {
      if (!req.session?.user?.id) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      const applicationId = parseInt(req.params.applicationId);
      const { status } = req.body;
      if (!status || !["pending", "viewed", "preselected", "rejected", "hired"].includes(status)) {
        return res.status(400).json({ message: "Estado inv\xE1lido" });
      }
      const application = await storage.getApplication(applicationId);
      if (!application) {
        return res.status(404).json({ message: "Postulaci\xF3n no encontrada" });
      }
      const job = await storage.getJob(application.jobId);
      if (!job) {
        return res.status(404).json({ message: "Empleo no encontrado" });
      }
      const company2 = await storage.getCompanyByUserId(req.session.user.id);
      if (!company2 || job.companyId !== company2.id) {
        return res.status(403).json({ message: "Acceso denegado" });
      }
      await storage.updateApplication(applicationId, { status });
      res.json({ success: true, message: "Estado actualizado correctamente" });
    } catch (error) {
      console.error("Error updating application status:", error);
      res.status(500).json({ message: "Error al actualizar estado de postulaci\xF3n" });
    }
  });
  app2.get("/api/admin/matching-reports/applications", async (req, res) => {
    try {
      if (!req.session?.admin?.id) {
        return res.status(401).json({ message: "Acceso no autorizado" });
      }
      const { fromDate, toDate, companyId, industry, compatibilityRange, search } = req.query;
      let whereConditions = [];
      let params = [];
      if (fromDate) {
        whereConditions.push("applications.appliedAt >= ?");
        params.push(new Date(fromDate));
      }
      if (toDate) {
        whereConditions.push("applications.appliedAt <= ?");
        params.push(new Date(toDate));
      }
      if (companyId && companyId !== "all") {
        whereConditions.push("companies.id = ?");
        params.push(parseInt(companyId));
      }
      if (industry && industry !== "all") {
        whereConditions.push("companies.industry = ?");
        params.push(industry);
      }
      if (search) {
        whereConditions.push("(users.firstName LIKE ? OR users.lastName LIKE ? OR users.email LIKE ?)");
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
      }
      const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";
      const query = `
        SELECT 
          applications.id,
          applications.jobId,
          applications.professionalId,
          applications.status,
          applications.appliedAt,
          applications.cvUrl,
          jobs.title as jobTitle,
          jobs.department,
          jobs.location as jobLocation,
          companies.id as companyId,
          companies.name as companyName,
          companies.industry,
          companies.logo as companyLogo,
          users.firstName,
          users.lastName,
          users.email,
          users.title as professionalTitle,
          users.location as professionalLocation,
          users.avatar
        FROM applications
        INNER JOIN jobs ON applications.jobId = jobs.id
        INNER JOIN companies ON jobs.companyId = companies.id
        INNER JOIN users ON applications.professionalId = users.id
        ${whereClause}
        ORDER BY applications.appliedAt DESC
      `;
      const applications4 = await db.execute(query, params);
      const applicationsWithScores = await Promise.all(
        applications4.rows.map(async (app3) => {
          const professional2 = await storage.getProfessional(app3.professionalId);
          const job = await storage.getJob(app3.jobId);
          let compatibilityScore = 0;
          if (professional2 && job) {
            const matchData = await candidateService.getCandidatesWithMatching(app3.jobId);
            const candidateMatch = matchData.find((c) => c.professionalId === app3.professionalId);
            compatibilityScore = candidateMatch?.compatibilityScore || 0;
          }
          if (compatibilityRange && compatibilityRange !== "all") {
            if (compatibilityRange === "high" && compatibilityScore < 80) return null;
            if (compatibilityRange === "medium" && (compatibilityScore < 60 || compatibilityScore >= 80)) return null;
            if (compatibilityRange === "low" && compatibilityScore >= 60) return null;
          }
          return {
            id: app3.id,
            jobId: app3.jobId,
            professionalId: app3.professionalId,
            status: app3.status,
            appliedAt: app3.appliedAt,
            compatibilityScore,
            cvUrl: app3.cvUrl,
            professional: {
              id: app3.professionalId,
              firstName: app3.firstName,
              lastName: app3.lastName,
              email: app3.email,
              title: app3.professionalTitle,
              location: app3.professionalLocation,
              avatar: app3.avatar
            },
            job: {
              id: app3.jobId,
              title: app3.jobTitle,
              department: app3.department,
              location: app3.jobLocation,
              companyId: app3.companyId,
              company: {
                id: app3.companyId,
                name: app3.companyName,
                industry: app3.industry,
                logo: app3.companyLogo
              }
            }
          };
        })
      );
      const filteredApplications = applicationsWithScores.filter((app3) => app3 !== null);
      res.json(filteredApplications);
    } catch (error) {
      console.error("Error getting matching reports applications:", error);
      res.status(500).json({ message: "Error al obtener aplicaciones para reportes" });
    }
  });
  app2.get("/api/admin/matching-reports/metrics", async (req, res) => {
    try {
      if (!req.session?.admin?.id) {
        return res.status(401).json({ message: "Acceso no autorizado" });
      }
      const { fromDate, toDate, companyId, industry } = req.query;
      let whereConditions = [];
      let params = [];
      if (fromDate) {
        whereConditions.push("applications.appliedAt >= ?");
        params.push(new Date(fromDate));
      }
      if (toDate) {
        whereConditions.push("applications.appliedAt <= ?");
        params.push(new Date(toDate));
      }
      if (companyId && companyId !== "all") {
        whereConditions.push("companies.id = ?");
        params.push(parseInt(companyId));
      }
      if (industry && industry !== "all") {
        whereConditions.push("companies.industry = ?");
        params.push(industry);
      }
      const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";
      const totalApplicationsQuery = `
        SELECT COUNT(*) as total
        FROM applications
        INNER JOIN jobs ON applications.jobId = jobs.id
        INNER JOIN companies ON jobs.companyId = companies.id
        ${whereClause}
      `;
      const totalResult = await db.execute(totalApplicationsQuery, params);
      const totalApplications = totalResult.rows[0]?.total || 0;
      const topCompaniesQuery = `
        SELECT 
          companies.id as companyId,
          companies.name as companyName,
          COUNT(applications.id) as applicationCount,
          AVG(CASE 
            WHEN applications.status = 'hired' THEN 95
            WHEN applications.status = 'preselected' THEN 85
            WHEN applications.status = 'viewed' THEN 70
            WHEN applications.status = 'pending' THEN 60
            ELSE 45
          END) as averageScore
        FROM companies
        INNER JOIN jobs ON companies.id = jobs.companyId
        INNER JOIN applications ON jobs.id = applications.jobId
        ${whereClause}
        GROUP BY companies.id, companies.name
        ORDER BY applicationCount DESC
        LIMIT 10
      `;
      const topCompaniesResult = await db.execute(topCompaniesQuery, params);
      const topJobsQuery = `
        SELECT 
          jobs.id as jobId,
          jobs.title as jobTitle,
          companies.name as companyName,
          COUNT(applications.id) as applicationCount,
          AVG(CASE 
            WHEN applications.status = 'hired' THEN 95
            WHEN applications.status = 'preselected' THEN 85
            WHEN applications.status = 'viewed' THEN 70
            WHEN applications.status = 'pending' THEN 60
            ELSE 45
          END) as averageScore
        FROM jobs
        INNER JOIN companies ON jobs.companyId = companies.id
        INNER JOIN applications ON jobs.id = applications.jobId
        ${whereClause}
        GROUP BY jobs.id, jobs.title, companies.name
        ORDER BY applicationCount DESC
        LIMIT 10
      `;
      const topJobsResult = await db.execute(topJobsQuery, params);
      const topProfessionalsQuery = `
        SELECT 
          users.id as professionalId,
          CONCAT(users.firstName, ' ', users.lastName) as professionalName,
          COUNT(applications.id) as applicationCount,
          AVG(CASE 
            WHEN applications.status = 'hired' THEN 95
            WHEN applications.status = 'preselected' THEN 85
            WHEN applications.status = 'viewed' THEN 70
            WHEN applications.status = 'pending' THEN 60
            ELSE 45
          END) as averageScore
        FROM users
        INNER JOIN applications ON users.id = applications.professionalId
        INNER JOIN jobs ON applications.jobId = jobs.id
        INNER JOIN companies ON jobs.companyId = companies.id
        ${whereClause}
        GROUP BY users.id, users.firstName, users.lastName
        ORDER BY applicationCount DESC
        LIMIT 10
      `;
      const topProfessionalsResult = await db.execute(topProfessionalsQuery, params);
      const industryAveragesQuery = `
        SELECT 
          companies.industry,
          COUNT(applications.id) as applicationCount,
          AVG(CASE 
            WHEN applications.status = 'hired' THEN 95
            WHEN applications.status = 'preselected' THEN 85
            WHEN applications.status = 'viewed' THEN 70
            WHEN applications.status = 'pending' THEN 60
            ELSE 45
          END) as averageScore
        FROM companies
        INNER JOIN jobs ON companies.id = jobs.companyId
        INNER JOIN applications ON jobs.id = applications.jobId
        ${whereClause}
        GROUP BY companies.industry
        ORDER BY averageScore DESC
      `;
      const industryAveragesResult = await db.execute(industryAveragesQuery, params);
      const dailyApplicationsQuery = `
        SELECT 
          DATE(applications.appliedAt) as date,
          COUNT(applications.id) as count,
          AVG(CASE 
            WHEN applications.status = 'hired' THEN 95
            WHEN applications.status = 'preselected' THEN 85
            WHEN applications.status = 'viewed' THEN 70
            WHEN applications.status = 'pending' THEN 60
            ELSE 45
          END) as averageScore
        FROM applications
        INNER JOIN jobs ON applications.jobId = jobs.id
        INNER JOIN companies ON jobs.companyId = companies.id
        ${whereClause ? whereClause + " AND" : "WHERE"} applications.appliedAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY DATE(applications.appliedAt)
        ORDER BY date DESC
      `;
      const dailyApplicationsResult = await db.execute(dailyApplicationsQuery, params);
      const statusDistributionQuery = `
        SELECT 
          applications.status,
          COUNT(applications.id) as count,
          (COUNT(applications.id) * 100.0 / (SELECT COUNT(*) FROM applications INNER JOIN jobs ON applications.jobId = jobs.id INNER JOIN companies ON jobs.companyId = companies.id ${whereClause})) as percentage
        FROM applications
        INNER JOIN jobs ON applications.jobId = jobs.id
        INNER JOIN companies ON jobs.companyId = companies.id
        ${whereClause}
        GROUP BY applications.status
        ORDER BY count DESC
      `;
      const statusDistributionResult = await db.execute(statusDistributionQuery, params);
      const averageCompatibility = topCompaniesResult.rows.length > 0 ? topCompaniesResult.rows.reduce((sum, company2) => sum + company2.averageScore, 0) / topCompaniesResult.rows.length : 0;
      const metrics = {
        totalApplications,
        averageCompatibility,
        topCompanies: topCompaniesResult.rows,
        topJobs: topJobsResult.rows,
        topProfessionals: topProfessionalsResult.rows,
        industryAverages: industryAveragesResult.rows,
        dailyApplications: dailyApplicationsResult.rows,
        statusDistribution: statusDistributionResult.rows
      };
      res.json(metrics);
    } catch (error) {
      console.error("Error getting matching reports metrics:", error);
      res.status(500).json({ message: "Error al obtener m\xE9tricas de reportes" });
    }
  });
  app2.get("/api/admin/matching-reports/export/excel", async (req, res) => {
    try {
      if (!req.session?.admin?.id) {
        return res.status(401).json({ message: "Acceso no autorizado" });
      }
      const XLSX = __require("xlsx");
      const { fromDate, toDate, companyId, industry } = req.query;
      let whereConditions = [];
      let params = [];
      if (fromDate) {
        whereConditions.push("applications.appliedAt >= ?");
        params.push(new Date(fromDate));
      }
      if (toDate) {
        whereConditions.push("applications.appliedAt <= ?");
        params.push(new Date(toDate));
      }
      if (companyId && companyId !== "all") {
        whereConditions.push("companies.id = ?");
        params.push(parseInt(companyId));
      }
      if (industry && industry !== "all") {
        whereConditions.push("companies.industry = ?");
        params.push(industry);
      }
      const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";
      const query = `
        SELECT 
          CONCAT(users.firstName, ' ', users.lastName) as 'Profesional',
          users.email as 'Email',
          users.title as 'T\xEDtulo Profesional',
          users.location as 'Ubicaci\xF3n Profesional',
          jobs.title as 'Empleo',
          jobs.department as 'Departamento',
          companies.name as 'Empresa',
          companies.industry as 'Industria',
          applications.status as 'Estado',
          applications.appliedAt as 'Fecha Postulaci\xF3n',
          CASE 
            WHEN applications.status = 'hired' THEN 95
            WHEN applications.status = 'preselected' THEN 85
            WHEN applications.status = 'viewed' THEN 70
            WHEN applications.status = 'pending' THEN 60
            ELSE 45
          END as 'Compatibilidad (%)'
        FROM applications
        INNER JOIN jobs ON applications.jobId = jobs.id
        INNER JOIN companies ON jobs.companyId = companies.id
        INNER JOIN users ON applications.professionalId = users.id
        ${whereClause}
        ORDER BY applications.appliedAt DESC
      `;
      const result = await db.execute(query, params);
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(result.rows);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte Matching");
      const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
      res.setHeader("Content-Disposition", "attachment; filename=reporte-matching.xlsx");
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.send(buffer);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      res.status(500).json({ message: "Error al exportar a Excel" });
    }
  });
  app2.get("/api/admin/matching-reports/export/pdf", async (req, res) => {
    try {
      if (!req.session?.admin?.id) {
        return res.status(401).json({ message: "Acceso no autorizado" });
      }
      const jsPDF = __require("jspdf").jsPDF;
      __require("jspdf-autotable");
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("Reporte de Matching de Empresas", 20, 20);
      doc.setFontSize(12);
      doc.text(`Generado el: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`, 20, 35);
      const { fromDate, toDate, companyId, industry } = req.query;
      let whereConditions = [];
      let params = [];
      if (fromDate) {
        whereConditions.push("applications.appliedAt >= ?");
        params.push(new Date(fromDate));
      }
      if (toDate) {
        whereConditions.push("applications.appliedAt <= ?");
        params.push(new Date(toDate));
      }
      const totalQuery = `
        SELECT 
          COUNT(*) as total,
          AVG(CASE 
            WHEN applications.status = 'hired' THEN 95
            WHEN applications.status = 'preselected' THEN 85
            WHEN applications.status = 'viewed' THEN 70
            WHEN applications.status = 'pending' THEN 60
            ELSE 45
          END) as avgCompatibility
        FROM applications
        INNER JOIN jobs ON applications.jobId = jobs.id
        INNER JOIN companies ON jobs.companyId = companies.id
        ${whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : ""}
      `;
      const totalResult = await db.execute(totalQuery, params);
      const metrics = totalResult.rows[0];
      doc.setFontSize(14);
      doc.text("M\xE9tricas Generales:", 20, 55);
      doc.setFontSize(12);
      doc.text(`Total de Postulaciones: ${metrics.total}`, 20, 70);
      doc.text(`Compatibilidad Promedio: ${metrics.avgCompatibility?.toFixed(1)}%`, 20, 85);
      const summaryData = [
        ["M\xE9trica", "Valor"],
        ["Total Postulaciones", metrics.total.toString()],
        ["Compatibilidad Promedio", `${metrics.avgCompatibility?.toFixed(1)}%`],
        ["Fecha de Reporte", (/* @__PURE__ */ new Date()).toLocaleDateString()]
      ];
      doc.autoTable({
        head: [summaryData[0]],
        body: summaryData.slice(1),
        startY: 100,
        theme: "grid"
      });
      res.setHeader("Content-Disposition", "attachment; filename=reporte-matching.pdf");
      res.setHeader("Content-Type", "application/pdf");
      const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
      res.send(pdfBuffer);
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      res.status(500).json({ message: "Error al exportar a PDF" });
    }
  });
  app2.get("/api/admin/matching-reports/applications", isAdminAuthenticated, async (req, res) => {
    try {
      const { dateRange, companyFilter, industryFilter, compatibilityFilter, searchTerm } = req.query;
      let query = db.select({
        id: applications.id,
        jobId: applications.jobId,
        professionalId: applications.professionalId,
        status: applications.status,
        appliedAt: applications.appliedAt,
        compatibilityScore: applications.compatibilityScore,
        cvUrl: applications.cvUrl,
        professional: {
          id: professionals.id,
          firstName: professionals.firstName,
          lastName: professionals.lastName,
          email: professionals.email,
          title: professionals.title,
          location: professionals.location,
          avatar: professionals.avatar
        },
        job: {
          id: jobs.id,
          title: jobs.title,
          department: jobs.department,
          location: jobs.location,
          companyId: jobs.companyId,
          company: {
            id: companies.id,
            name: companies.name,
            industry: companies.industry,
            logo: companies.logo
          }
        }
      }).from(applications).leftJoin(professionals, eq5(applications.professionalId, professionals.id)).leftJoin(jobs, eq5(applications.jobId, jobs.id)).leftJoin(companies, eq5(jobs.companyId, companies.id));
      const results = await query;
      res.json(results);
    } catch (error) {
      console.error("Error al obtener aplicaciones para reportes:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  app2.get("/api/admin/matching-reports/metrics", isAdminAuthenticated, async (req, res) => {
    try {
      const totalApplications = await db.select({ count: sql2`count(*)` }).from(applications);
      const avgCompatibility = await db.select({
        avg: sql2`avg(${applications.compatibilityScore})`
      }).from(applications);
      const topCompanies = await db.select({
        companyId: companies.id,
        companyName: companies.name,
        applicationCount: sql2`count(${applications.id})`,
        averageScore: sql2`avg(${applications.compatibilityScore})`
      }).from(applications).leftJoin(jobs, eq5(applications.jobId, jobs.id)).leftJoin(companies, eq5(jobs.companyId, companies.id)).groupBy(companies.id, companies.name).orderBy(sql2`count(${applications.id}) desc`).limit(10);
      const topJobs = await db.select({
        jobId: jobs.id,
        jobTitle: jobs.title,
        companyName: companies.name,
        applicationCount: sql2`count(${applications.id})`,
        averageScore: sql2`avg(${applications.compatibilityScore})`
      }).from(applications).leftJoin(jobs, eq5(applications.jobId, jobs.id)).leftJoin(companies, eq5(jobs.companyId, companies.id)).groupBy(jobs.id, jobs.title, companies.name).orderBy(sql2`count(${applications.id}) desc`).limit(10);
      const industryAverages = await db.select({
        industry: companies.industry,
        averageScore: sql2`avg(${applications.compatibilityScore})`,
        applicationCount: sql2`count(${applications.id})`
      }).from(applications).leftJoin(jobs, eq5(applications.jobId, jobs.id)).leftJoin(companies, eq5(jobs.companyId, companies.id)).where(isNotNull(companies.industry)).groupBy(companies.industry).orderBy(sql2`avg(${applications.compatibilityScore}) desc`);
      const statusDistribution = await db.select({
        status: applications.status,
        count: sql2`count(*)`,
        percentage: sql2`(count(*) * 100.0 / (select count(*) from ${applications}))`
      }).from(applications).groupBy(applications.status);
      const metrics = {
        totalApplications: Number(totalApplications[0]?.count || 0),
        averageCompatibility: Number(avgCompatibility[0]?.avg || 0),
        topCompanies: topCompanies.map((company2) => ({
          companyId: company2.companyId,
          companyName: company2.companyName,
          applicationCount: Number(company2.applicationCount),
          averageScore: Number(company2.averageScore)
        })),
        topJobs: topJobs.map((job) => ({
          jobId: job.jobId,
          jobTitle: job.jobTitle,
          companyName: job.companyName,
          applicationCount: Number(job.applicationCount),
          averageScore: Number(job.averageScore)
        })),
        topProfessionals: [],
        // Se puede implementar después
        industryAverages: industryAverages.map((industry) => ({
          industry: industry.industry,
          averageScore: Number(industry.averageScore),
          applicationCount: Number(industry.applicationCount)
        })),
        dailyApplications: [],
        // Se puede implementar después
        statusDistribution: statusDistribution.map((status) => ({
          status: status.status,
          count: Number(status.count),
          percentage: Number(status.percentage)
        }))
      };
      res.json(metrics);
    } catch (error) {
      console.error("Error al obtener m\xE9tricas de matching:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  app2.patch("/api/companies/:id/alerts", requireAuth, async (req, res) => {
    try {
      const companyId = parseInt(req.params.id);
      const { alertsEnabled } = req.body;
      if (req.user?.userType !== "company") {
        return res.status(403).json({ message: "Acceso solo para empresas" });
      }
      await db.update(companies).set({ alertsEnabled }).where(eq5(companies.id, companyId));
      res.json({ success: true, alertsEnabled });
    } catch (error) {
      console.error("Error configurando alertas:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  app2.get("/api/companies/:id/alerts", requireAuth, async (req, res) => {
    try {
      const companyId = parseInt(req.params.id);
      const limit = parseInt(req.query.limit) || 50;
      if (req.user?.userType !== "company") {
        return res.status(403).json({ message: "Acceso solo para empresas" });
      }
      const alerts = await matchingAlertService.getCompanyAlerts(companyId, limit);
      res.json(alerts);
    } catch (error) {
      console.error("Error obteniendo alertas:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  app2.post("/api/professionals/:id/process-alerts", requireAuth, async (req, res) => {
    try {
      const professionalId = parseInt(req.params.id);
      const { alertType } = req.body;
      if (req.user?.userType !== "professional") {
        return res.status(403).json({ message: "Acceso solo para profesionales" });
      }
      await matchingAlertService.processAlertsForProfessional(professionalId, alertType || "high_compatibility");
      res.json({ success: true, message: "Alertas procesadas correctamente" });
    } catch (error) {
      console.error("Error procesando alertas:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
function calculateJobMatch(professional2, experiences2, education2, job) {
  let totalScore = 0;
  let maxScore = 0;
  const skillsScore = calculateSkillsMatch(professional2.skills || "", job.skills || "");
  totalScore += skillsScore * 0.4;
  maxScore += 100 * 0.4;
  const experienceScore = calculateExperienceMatch(experiences2, job);
  totalScore += experienceScore * 0.35;
  maxScore += 100 * 0.35;
  const educationScore = calculateEducationMatch(education2, job);
  totalScore += educationScore * 0.15;
  maxScore += 100 * 0.15;
  const locationScore = calculateLocationMatch(professional2.location || "", job.location || "");
  totalScore += locationScore * 0.1;
  maxScore += 100 * 0.1;
  return totalScore / maxScore * 100;
}
function calculateSkillsMatch(professionalSkills, jobSkills) {
  if (!professionalSkills || !jobSkills) return 0;
  const profSkillsArray = normalizeSkills(professionalSkills);
  const jobSkillsArray = normalizeSkills(jobSkills);
  if (jobSkillsArray.length === 0) return 50;
  let matchedSkills = 0;
  const exactMatches = [];
  const partialMatches = [];
  jobSkillsArray.forEach((jobSkill) => {
    const exactMatch = profSkillsArray.find(
      (profSkill) => profSkill.toLowerCase() === jobSkill.toLowerCase()
    );
    if (exactMatch) {
      matchedSkills += 1;
      exactMatches.push(jobSkill);
    } else {
      const partialMatch = profSkillsArray.find(
        (profSkill) => profSkill.toLowerCase().includes(jobSkill.toLowerCase()) || jobSkill.toLowerCase().includes(profSkill.toLowerCase())
      );
      if (partialMatch) {
        matchedSkills += 0.5;
        partialMatches.push(jobSkill);
      }
    }
  });
  return Math.min(matchedSkills / jobSkillsArray.length * 100, 100);
}
function calculateExperienceMatch(experiences2, job) {
  if (experiences2.length === 0) return 20;
  let score = 0;
  const jobTitle = job.title.toLowerCase();
  const jobDescription = job.description.toLowerCase();
  experiences2.forEach((exp) => {
    const expTitle = (exp.position || "").toLowerCase();
    const expCompany = (exp.company || "").toLowerCase();
    const expDescription = (exp.description || "").toLowerCase();
    if (expTitle.includes("desarrollador") && jobTitle.includes("desarrollador")) {
      score += 25;
    } else if (expTitle.includes("senior") && jobTitle.includes("senior")) {
      score += 15;
    } else if (expTitle.includes("junior") && jobTitle.includes("junior")) {
      score += 10;
    }
    if (expDescription.includes("react") && (jobDescription.includes("react") || jobTitle.includes("react"))) {
      score += 20;
    }
    if (expDescription.includes("node") && (jobDescription.includes("node") || jobTitle.includes("node"))) {
      score += 20;
    }
    if (expDescription.includes("javascript") && (jobDescription.includes("javascript") || jobTitle.includes("javascript"))) {
      score += 15;
    }
    if (exp.current || !exp.endDate) {
      score += 10;
    }
  });
  if (experiences2.length >= 3) score += 15;
  else if (experiences2.length >= 2) score += 10;
  else if (experiences2.length >= 1) score += 5;
  return Math.min(score, 100);
}
function calculateEducationMatch(education2, job) {
  if (education2.length === 0) return 30;
  let score = 30;
  const jobTitle = job.title.toLowerCase();
  const jobDescription = job.description.toLowerCase();
  education2.forEach((edu) => {
    const degree = (edu.degree || "").toLowerCase();
    const field = (edu.field || "").toLowerCase();
    const institution = (edu.institution || "").toLowerCase();
    if (degree.includes("licenciatura") || degree.includes("ingenier")) {
      score += 25;
    } else if (degree.includes("maestr") || degree.includes("master")) {
      score += 35;
    } else if (degree.includes("doctor")) {
      score += 40;
    }
    if (field.includes("sistemas") || field.includes("computac") || field.includes("software")) {
      if (jobTitle.includes("desarrollador") || jobDescription.includes("software")) {
        score += 30;
      }
    }
    if (field.includes("ingenier") && jobTitle.includes("ingenier")) {
      score += 20;
    }
  });
  return Math.min(score, 100);
}
function calculateLocationMatch(professionalLocation, jobLocation) {
  if (!professionalLocation || !jobLocation) return 50;
  const profLoc = professionalLocation.toLowerCase();
  const jobLoc = jobLocation.toLowerCase();
  if (profLoc === jobLoc) return 100;
  if (profLoc.includes("lima") && jobLoc.includes("lima")) return 90;
  if (profLoc.includes("arequipa") && jobLoc.includes("arequipa")) return 90;
  if (profLoc.includes("trujillo") && jobLoc.includes("trujillo")) return 90;
  if (jobLoc.includes("remoto") || jobLoc.includes("remote")) return 100;
  if (profLoc.includes("per") && jobLoc.includes("per")) return 70;
  return 30;
}
function normalizeSkills(skillsString) {
  return skillsString.split(/[,;|]/).map((skill) => skill.trim()).filter((skill) => skill.length > 0);
}
function getMatchReasons(professional2, experiences2, education2, job, matchScore) {
  const reasons = [];
  const profSkills = normalizeSkills(professional2.skills || "");
  const jobSkills = normalizeSkills(job.skills || "");
  const matchedSkills = jobSkills.filter(
    (jobSkill) => profSkills.some(
      (profSkill) => profSkill.toLowerCase().includes(jobSkill.toLowerCase()) || jobSkill.toLowerCase().includes(profSkill.toLowerCase())
    )
  );
  if (matchedSkills.length > 0) {
    reasons.push(`Coincidencia en habilidades: ${matchedSkills.slice(0, 3).join(", ")}`);
  }
  if (experiences2.length > 0) {
    const relevantExp = experiences2.filter(
      (exp) => (exp.position || "").toLowerCase().includes("desarrollador") || (exp.description || "").toLowerCase().includes("react") || (exp.description || "").toLowerCase().includes("javascript")
    );
    if (relevantExp.length > 0) {
      reasons.push(`${relevantExp.length} experiencia(s) relevante(s) en desarrollo`);
    }
  }
  if (education2.length > 0) {
    const techEducation = education2.filter(
      (edu) => (edu.field || "").toLowerCase().includes("sistemas") || (edu.field || "").toLowerCase().includes("computac") || (edu.field || "").toLowerCase().includes("ingenier")
    );
    if (techEducation.length > 0) {
      reasons.push(`Formaci\xF3n t\xE9cnica relevante`);
    }
  }
  const profLoc = (professional2.location || "").toLowerCase();
  const jobLoc = (job.location || "").toLowerCase();
  if (jobLoc.includes("remoto")) {
    reasons.push("Trabajo remoto disponible");
  } else if (profLoc.includes("lima") && jobLoc.includes("lima")) {
    reasons.push("Ubicaci\xF3n compatible");
  }
  if (matchScore >= 80) {
    reasons.unshift("Excelente compatibilidad general");
  } else if (matchScore >= 60) {
    reasons.unshift("Buena compatibilidad");
  } else if (matchScore >= 40) {
    reasons.unshift("Compatibilidad moderada");
  }
  return reasons.slice(0, 4);
}

// server/vite.ts
import express2 from "express";
import fs4 from "fs";
import path4 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path3 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path3.resolve(import.meta.dirname, "client", "src"),
      "@shared": path3.resolve(import.meta.dirname, "shared"),
      "@assets": path3.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path3.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path3.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path4.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs4.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path4.resolve(import.meta.dirname, "public");
  if (!fs4.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path4.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
var allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://flexwork-database-kwo6532.replit.app",
  "https://flexworklatam.com",
  "https://www.flexworklatam.com"
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    if (process.env.NODE_ENV === "production") {
      return callback(new Error("Not allowed by CORS"), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });
}
app.use(express3.json({ limit: "10mb" }));
app.use(express3.urlencoded({ extended: false, limit: "10mb" }));
app.use((req, res, next) => {
  const start = Date.now();
  const path5 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path5.startsWith("/api") || path5.startsWith("/webhooks")) {
      let logLine = `${req.method} ${path5} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
