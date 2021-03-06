# Migration `20200918050348-base`

This migration has been generated by Jovanny Rch <jovannyrch@gmail.com> at 9/18/2020, 12:03:48 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `bell_db`.`enroll` (
`id` int  NOT NULL  AUTO_INCREMENT,
`userId` int  NOT NULL ,
`createdAt` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`type` ENUM('FREE_TO_PREMIUM', 'PREMIUM_TO_FREE')  NOT NULL DEFAULT 'FREE_TO_PREMIUM',
`method` ENUM('NONE', 'CARD', 'PAYPAL')  NOT NULL DEFAULT 'NONE',
Index `userId`(`userId`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `bell_db`.`group` (
`id` int  NOT NULL  AUTO_INCREMENT,
`createdAt` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`updatedAt` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`creatorId` int  NOT NULL ,
`name` varchar(191)  NOT NULL ,
Index `creatorId`(`creatorId`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `bell_db`.`code` (
`id` int  NOT NULL  AUTO_INCREMENT,
`createdAt` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`status` ENUM('ACCEPTED', 'DECLINED', 'WAITING')  NOT NULL DEFAULT 'WAITING',
`groupId` int  NOT NULL ,
`code` int  NOT NULL ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `bell_db`.`user` (
`id` int  NOT NULL  AUTO_INCREMENT,
`createdAt` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`email` varchar(191)  NOT NULL ,
`name` varchar(191)  NOT NULL ,
`password` varchar(191)  NOT NULL ,
`isPremium` boolean  NOT NULL DEFAULT false,
`role` ENUM('USER', 'LEAD', 'ADMIN')  NOT NULL DEFAULT 'USER',
`registration` ENUM('EMAIL', 'GOOGLE', 'LINKEDIN', 'FACEBOOK')  NOT NULL DEFAULT 'EMAIL',
UNIQUE Index `user.email_unique`(`email`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `bell_db`.`deal` (
`id` int  NOT NULL  AUTO_INCREMENT,
`createdAt` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`creatorId` int  NOT NULL ,
`title` varchar(191)  NOT NULL ,
`groupId` int  NOT NULL ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `bell_db`.`usersongroups` (
`userId` int  NOT NULL ,
`groupId` int  NOT NULL ,
`createdAt` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`role` ENUM('ADMIN', 'NORMAL')  NOT NULL DEFAULT 'NORMAL',
Index `groupId`(`groupId`),
PRIMARY KEY (`userId`,`groupId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `bell_db`.`enroll` ADD FOREIGN KEY (`userId`) REFERENCES `bell_db`.`user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `bell_db`.`group` ADD FOREIGN KEY (`creatorId`) REFERENCES `bell_db`.`user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `bell_db`.`code` ADD FOREIGN KEY (`groupId`) REFERENCES `bell_db`.`group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `bell_db`.`deal` ADD FOREIGN KEY (`creatorId`) REFERENCES `bell_db`.`user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `bell_db`.`deal` ADD FOREIGN KEY (`groupId`) REFERENCES `bell_db`.`group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `bell_db`.`usersongroups` ADD FOREIGN KEY (`groupId`) REFERENCES `bell_db`.`group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `bell_db`.`usersongroups` ADD FOREIGN KEY (`userId`) REFERENCES `bell_db`.`user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

DROP TABLE `bell_db`.`_migration`
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200918050348-base
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,115 @@
+generator client {
+    provider = "prisma-client-js"
+}
+
+datasource db {
+    provider = "mysql"
+    url = "***"
+}
+
+model enroll {
+    id        Int           @default(autoincrement()) @id
+    userId    Int
+    createdAt DateTime      @default(now())
+    type      enroll_type   @default(FREE_TO_PREMIUM)
+    method    enroll_method @default(NONE)
+    user      user          @relation(fields: [userId], references: [id])
+
+    @@index([userId], name: "userId")
+}
+
+model group {
+    id            Int             @default(autoincrement()) @id
+    createdAt     DateTime        @default(now())
+    updatedAt     DateTime        @default(now())
+    creatorId     Int
+    name          String
+    user          user            @relation(fields: [creatorId], references: [id])
+    usersongroups usersongroups[]
+
+    @@index([creatorId], name: "creatorId")
+
+    deal deal[]
+    code code[]
+}
+
+model code {
+    id        Int               @default(autoincrement()) @id
+    createdAt DateTime          @default(now())
+    status    invitation_status @default(WAITING)
+    groupId   Int
+    group     group             @relation(fields: [groupId], references: [id])
+    code      Int
+}
+
+model user {
+    id            Int               @default(autoincrement()) @id
+    createdAt     DateTime          @default(now())
+    email         String            @unique
+    name          String
+    password      String
+    isPremium     Boolean           @default(false)
+    role          user_role         @default(USER)
+    registration  user_registration @default(EMAIL)
+    enroll        enroll[]
+    group         group[]
+    usersongroups usersongroups[]
+    deal          deal[]
+}
+
+model deal {
+    id        Int      @default(autoincrement()) @id
+    createdAt DateTime @default(now())
+    creatorId Int
+    title     String
+    user      user     @relation(fields: [creatorId], references: [id])
+    groupId   Int
+    group     group    @relation(fields: [groupId], references: [id])
+}
+
+model usersongroups {
+    userId    Int
+    groupId   Int
+    createdAt DateTime           @default(now())
+    role      usersongroups_role @default(NORMAL)
+    group     group              @relation(fields: [groupId], references: [id])
+    user      user               @relation(fields: [userId], references: [id])
+
+    @@id([userId, groupId])
+    @@index([groupId], name: "groupId")
+}
+
+enum enroll_type {
+    FREE_TO_PREMIUM
+    PREMIUM_TO_FREE
+}
+
+enum enroll_method {
+    NONE
+    CARD
+    PAYPAL
+}
+
+enum invitation_status {
+    ACCEPTED
+    DECLINED
+    WAITING
+}
+
+enum user_role {
+    USER
+    LEAD
+    ADMIN
+}
+
+enum user_registration {
+    EMAIL
+    GOOGLE
+    LINKEDIN
+    FACEBOOK
+}
+
+enum usersongroups_role {
+    ADMIN
+    NORMAL
+}
```


